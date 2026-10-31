"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  BannerTheme,
  CandidateInfo,
  PublishedTemplate,
  SloganTopicOption,
} from "../generator.types";
import { PosterGeneratorService } from "../generator.service";
import { StudioInputPanel } from "./studio-input-panel";
import { StudioCanvas } from "./studio-canvas";
import { PosterSuccessModal } from "./poster-success-modal";
import { Check, Layers, Loader2, Sparkles, ArrowLeft, Wand2, Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchWalletBalance } from "@/modules/recharge/recharge.service";

// Type of data coming from the server component
interface GeneratorWorkspaceProps {
  initialCandidate: CandidateInfo;
  sloganTopics: SloganTopicOption[];
  initialTemplateId?: string;
}

export function GeneratorWorkspace({
  initialCandidate,
  initialTemplateId,
}: GeneratorWorkspaceProps) {
  const searchParams = useSearchParams();
  const queryTemplateId = searchParams?.get("templateId") || initialTemplateId;

  // 1. Core central states
  const [candidate, setCandidate] = useState<CandidateInfo>(initialCandidate);
  const [theme, setTheme] = useState<BannerTheme>("emerald");
  const [photoUrl, setPhotoUrl] = useState(
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
  );
  const [imageScale, setImageScale] = useState(100);
  const [imageOffsetX, setImageOffsetX] = useState(0);
  const [imageOffsetY, setImageOffsetY] = useState(0);
  const [isComparing, setIsComparing] = useState(false);
  const [comparePhotoUrl, setComparePhotoUrl] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [createdPosterUrl, setCreatedPosterUrl] = useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Load user credit balance (or guest 3-poster quota)
  useEffect(() => {
    let isCancelled = false;

    async function loadCredits() {
      try {
        const wallet = await fetchWalletBalance();
        if (isCancelled) return;
        if (wallet && typeof wallet.credits === "number") {
          setCredits(wallet.credits);
          setIsGuest(false);
          return;
        }
      } catch {
        // Guest or unauthenticated session
      }

      if (!isCancelled) {
        setIsGuest(true);
        const usedStr = typeof window !== "undefined" ? localStorage.getItem("guest_posters_created") : null;
        const used = usedStr ? parseInt(usedStr, 10) : 0;
        setCredits(Math.max(0, 3 - used));
      }
    }

    loadCredits();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Template selection flow state:
  // If user visits /create-poster without templateId, show template picker first
  const [isSelectingTemplate, setIsSelectingTemplate] = useState(!queryTemplateId);

  // Template states
  const [templates, setTemplates] = useState<PublishedTemplate[]>([]);
  const [activeTemplate, setActiveTemplate] = useState<PublishedTemplate | null>(null);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);

  // Load published templates and select the active template
  useEffect(() => {
    let isCancelled = false;

    async function initWorkspace() {
      setIsLoadingTemplates(true);
      await PosterGeneratorService.ensureGuestSession();

      try {
        const fetchedTemplates = await PosterGeneratorService.fetchPublishedTemplates();
        if (isCancelled) return;
        setTemplates(fetchedTemplates);

        const targetId = queryTemplateId;
        let chosen: PublishedTemplate | null = null;

        // 1. Look for user's specified templateId
        if (targetId) {
          const found = fetchedTemplates.find((t) => t.id === targetId);
          if (found?.config?.blankTemplateUrl) {
            chosen = found;
          } else {
            // Fetch detailed template config from DB
            const detailed = await PosterGeneratorService.getTemplateById(targetId);
            if (detailed) chosen = detailed;
          }
        }

        // 2. Fallback to latest published template with canvas config, or first template
        if (!chosen && fetchedTemplates.length > 0) {
          const withCanvas = fetchedTemplates.find((t) => t.config?.blankTemplateUrl);
          const candidateTmpl = withCanvas || fetchedTemplates[0];

          if (candidateTmpl?.config?.blankTemplateUrl) {
            chosen = candidateTmpl;
          } else {
            const detailed = await PosterGeneratorService.getTemplateById(candidateTmpl.id);
            chosen = detailed || candidateTmpl;
          }
        }

        if (chosen && !isCancelled) {
          setActiveTemplate(chosen);
        }
      } catch (e) {
        console.warn("Failed to load templates:", e);
      } finally {
        if (!isCancelled) {
          setIsLoadingTemplates(false);
        }
      }
    }

    initWorkspace();

    return () => {
      isCancelled = true;
    };
  }, [queryTemplateId]);

  // Handler to switch template from switcher UI or template picker
  const handleSelectTemplate = async (tmpl: PublishedTemplate) => {
    // If template doesn't have full blankTemplateUrl, fetch full details
    if (!tmpl.config?.blankTemplateUrl) {
      const detailed = await PosterGeneratorService.getTemplateById(tmpl.id);
      setActiveTemplate(detailed || tmpl);
    } else {
      setActiveTemplate(tmpl);
    }

    // Smoothly transition from template picker to editor studio
    setIsSelectingTemplate(false);

    // Update URL query parameter smoothly
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("templateId", tmpl.id);
      window.history.replaceState({}, "", url.toString());
    } catch {
      // Ignore if SSR/history is unavailable
    }

    toast.success(`টেমপ্লেট সিলেক্ট করা হয়েছে: ${tmpl.title}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Start a fresh poster creation session without page reload
  const handleStartNewPoster = () => {
    setIsCreated(false);
    setCreatedPosterUrl(null);
    setIsSuccessModalOpen(false);
    toast.info("নতুন পোস্টার তৈরির সেশন প্রস্তুত করা হয়েছে।");
  };

  // 2. Logic to update the canvas instantly when input changes & auto-reset session on edit
  const handleCandidateChange = (field: keyof CandidateInfo, value: string) => {
    if (isCreated) {
      setIsCreated(false);
      setCreatedPosterUrl(null);
    }
    setCandidate((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePhotoUpload = (file: File) => {
    if (isCreated) {
      setIsCreated(false);
      setCreatedPosterUrl(null);
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPhotoUrl(event.target.result as string);
        toast.success("প্রার্থীর ছবি সফলভাবে আপলোড হয়েছে!");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setIsCreated(false);
    setCreatedPosterUrl(null);
    setIsSuccessModalOpen(false);
    setCandidate(initialCandidate);
    setTheme("emerald");
    setImageScale(100);
    setImageOffsetX(0);
    setImageOffsetY(0);
    setIsComparing(false);
    setComparePhotoUrl(null);
    toast.info("ইনপুট তথ্য ও সেশন রিসেট করা হয়েছে।");
  };

  // Full real database pipeline: Validate -> Save Draft -> Trigger Render -> Poll Completion -> Show Success Modal
  const handleCreatePoster = async () => {
    // 1. Validation check
    if (!candidate.name?.trim()) {
      toast.error("অনুগ্রহ করে প্রার্থীর নাম লিখুন।");
      return;
    }
    if (!candidate.designation?.trim()) {
      toast.error("অনুগ্রহ করে প্রার্থীর পদবি বা নির্বাচনী এলাকা লিখুন।");
      return;
    }

    // 2. Credits check
    if (credits !== null && credits <= 0) {
      toast.error(
        isGuest
          ? "ফ্রি ৩টি পোস্টার তৈরির কোটা শেষ হয়ে গেছে! পরবর্তী পোস্টার তৈরি করতে অনুগ্রহ করে সাইন-আপ বা লগইন করুন।"
          : "আপনার অ্যাকাউন্টে কোনো পোস্টার ক্রেডিট অবশিষ্ট নেই। অনুগ্রহ করে রিচার্জ করুন।"
      );
      return;
    }

    const currentTemplateId = activeTemplate?.id || "4c8057b1-35fb-4dad-83a3-32ecd314a0a3";

    // Pre-capture high-res canvas image directly before async operations
    let canvasDataUrl = "";
    if (canvasRef.current) {
      try {
        canvasDataUrl = canvasRef.current.toDataURL("image/png");
      } catch (e) {
        console.warn("Pre-capture canvas toDataURL error:", e);
      }
    }

    // Reset previous modal/created state for clean session execution
    setIsSuccessModalOpen(false);
    setIsCreated(false);
    setCreatedPosterUrl(null);
    setIsCreating(true);

    try {
      toast.info("ডাটাবেজে পোস্টার ড্রাফট সেভ হচ্ছে...");

      // 1. Create poster draft in PostgreSQL
      const draft = await PosterGeneratorService.createPosterDraft({
        templateId: currentTemplateId,
        inputData: {
          candidateName: candidate.name,
          designation: candidate.designation,
          area: candidate.area,
          bannerTitle: candidate.bannerTitle,
          slogan: candidate.slogan,
          courtesy: candidate.courtesy,
          theme,
          photoUrl,
          imageScale,
          imageOffsetX,
          imageOffsetY,
        },
      });

      toast.info("রেন্ডারিং ইঞ্জিন প্রসেসিং করছে...");

      // 2. Trigger asynchronous render job (backend debits 1 credit)
      await PosterGeneratorService.triggerPosterRender(draft.id);

      // 3. Poll render status until completed
      let attempts = 0;
      let completedStatus = null;
      while (attempts < 12) {
        await new Promise((r) => setTimeout(r, 1000));
        const statusRes = await PosterGeneratorService.pollPosterStatus(draft.id);

        if (statusRes.status === "COMPLETED") {
          completedStatus = statusRes;
          break;
        } else if (statusRes.status === "FAILED") {
          throw new Error(statusRes.errorMessage || "রেন্ডার ব্যর্থ হয়েছে।");
        }
        attempts++;
      }

      // Re-capture fresh canvas if available
      if (canvasRef.current) {
        try {
          const fresh = canvasRef.current.toDataURL("image/png");
          if (fresh) canvasDataUrl = fresh;
        } catch {
          // ignore
        }
      }

      // Prioritize the real rendered canvas image so the preview in modal displays the actual poster cleanly
      const finalUrl =
        canvasDataUrl ||
        completedStatus?.outputUrl ||
        completedStatus?.previewUrl ||
        photoUrl;

      // Real-time credit deduction
      if (isGuest) {
        const nextUsed = parseInt(localStorage.getItem("guest_posters_created") || "0", 10) + 1;
        localStorage.setItem("guest_posters_created", nextUsed.toString());
        setCredits(Math.max(0, 3 - nextUsed));
      } else {
        setCredits((prev) => (prev !== null ? Math.max(0, prev - 1) : null));
        fetchWalletBalance().then((bal) => {
          if (bal && typeof bal.credits === "number") {
            setCredits(bal.credits);
          }
        });
      }

      setCreatedPosterUrl(finalUrl);
      setIsCreated(true);
      setIsSuccessModalOpen(true);
      toast.success("পোস্টার সফলভাবে তৈরি হয়েছে এবং ডাটাবেজে সংরক্ষিত হয়েছে!");
    } catch (err: any) {
      console.error("Poster render pipeline error:", err);
      const errMsg =
        err.response?.data?.message || err.message || "পোস্টার প্রসেস করতে সমস্যা হয়েছে।";
      toast.error(errMsg);
    } finally {
      setIsCreating(false);
    }
  };

  // Download high-resolution poster file
  const handleDownloadFile = () => {
    setIsDownloading(true);
    try {
      let downloadTarget = createdPosterUrl;
      if (!downloadTarget && canvasRef.current) {
        try {
          downloadTarget = canvasRef.current.toDataURL("image/png");
        } catch {
          // ignore
        }
      }

      if (!downloadTarget) {
        toast.error("পোস্টার ফাইল পাওয়া যায়নি। অনুগ্রহ করে পুনরায় তৈরি করুন।");
        return;
      }

      const safeName = (candidate.name || "candidate_poster").replace(/\s+/g, "_");
      const link = document.createElement("a");
      link.href = downloadTarget;
      link.download = `poster-${safeName}.png`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("পোস্টার সফলভাবে ডাউনলোড হয়েছে!");
    } catch (err: any) {
      toast.error("ডাউনলোড করতে সমস্যা হয়েছে।");
    } finally {
      setIsDownloading(false);
    }
  };

  // STEP 1: If user hasn't selected a template, show the template picker first
  if (isSelectingTemplate) {
    return (
      <div className="w-full space-y-8 py-2">
        {/* Step Progress Indicator */}
        <div className="flex items-center justify-center gap-2 max-w-lg mx-auto">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold shadow-2xs">
            <span className="w-5 h-5 rounded-full bg-brand-primary text-white flex items-center justify-center text-[11px]">১</span>
            <span>টেমপ্লেট নির্বাচন</span>
          </div>
          <div className="w-8 h-0.5 bg-border" />
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-muted/60 text-muted-foreground text-xs font-medium">
            <span className="w-5 h-5 rounded-full bg-muted-foreground/20 text-muted-foreground flex items-center justify-center text-[11px]">২</span>
            <span>তথ্য ও কাস্টমাইজেশন</span>
          </div>
          <div className="w-8 h-0.5 bg-border" />
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-muted/60 text-muted-foreground text-xs font-medium">
            <span className="w-5 h-5 rounded-full bg-muted-foreground/20 text-muted-foreground flex items-center justify-center text-[11px]">৩</span>
            <span>ডাউনলোড</span>
          </div>
        </div>

        {/* Hero Header Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            পছন্দের রাজনৈতিক <span className="text-gradient-brand">পোস্টার টেমপ্লেট</span> বেছে নিন
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            প্রথমে একটি আকর্ষণীয় ডিজাইন ফ্রেম বা টেমপ্লেট নির্বাচন করুন। এরপর আপনার নাম, পদবি, স্লোগান ও ছবি বসিয়ে লাইভ পোস্টার তৈরি করুন।
          </p>
        </div>

        {/* Templates Grid */}
        {isLoadingTemplates ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
            <p className="text-sm font-semibold">টেমপ্লেট লোড হচ্ছে...</p>
          </div>
        ) : templates.length === 0 ? (
          <div className="py-20 text-center rounded-3xl border border-dashed border-border p-8 max-w-md mx-auto bg-card/40">
            <Layers className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-base font-bold text-foreground">কোনো টেমপ্লেট পাওয়া যায়নি</p>
            <p className="text-xs text-muted-foreground mt-1">
              টেমপ্লেট ম্যানেজার কর্তৃক নতুন ফ্রেম পাবলিশ হওয়া পর্যন্ত অপেক্ষা করুন।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {templates.map((tmpl) => {
              const previewImg =
                tmpl.config?.previewUrl ||
                tmpl.config?.blankTemplateUrl ||
                "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=600&q=80";

              return (
                <div
                  key={tmpl.id}
                  className="group relative flex flex-col rounded-3xl border border-border/80 bg-card/80 backdrop-blur-xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:border-brand-primary/50 flex-1"
                >
                  <div className="relative aspect-3/4 w-full bg-muted/60 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewImg}
                      alt={tmpl.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-background/90 backdrop-blur-md text-foreground border border-border/60 shadow-xs">
                        {tmpl.aspectRatio || "৪:৫"} • ডিজিটাল ক্যানভাস
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-bold text-foreground text-sm line-clamp-1 group-hover:text-brand-primary transition-colors">
                        {tmpl.title}
                      </h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                        {tmpl.description || "রাজনৈতিক নির্বাচনী ও সাংগঠনিক পোস্টার ফ্রেম"}
                      </p>
                    </div>

                    <Button
                      type="button"
                      onClick={() => handleSelectTemplate(tmpl)}
                      className="w-full bg-gradient-brand text-white font-bold text-xs h-10 rounded-2xl shadow-md gap-2 cursor-pointer transition-transform active:scale-95"
                    >
                      <Wand2 className="w-3.5 h-3.5" />
                      <span>এই টেমপ্লেট দিয়ে তৈরি করুন</span>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // STEP 2: Main Studio Editor (User has picked a template)
  return (
    <div className="w-full space-y-4">
      {/* Header bar with Active Template info & Change Template button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-xl shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
            <Layers className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-muted-foreground">সিলেক্টেড টেমপ্লেট:</span>
              <span className="text-sm font-bold text-foreground">{activeTemplate?.title || "ডিজিটাল ক্যানভাস"}</span>
              <Badge variant="outline" className="border-brand-primary/30 bg-brand-primary/10 text-brand-primary font-bold text-[10.5px] px-2 py-0.5">
                {activeTemplate?.aspectRatio || "৪:৫"}
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              বামপাশের ইনপুটে তথ্য ও ছবি পরিবর্তন করলে ক্যানভাসে রিয়েল-টাইম প্রিভিউ দেখতে পাবেন
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Live Remaining Credits Badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs font-semibold text-amber-800 dark:text-amber-300 shadow-2xs">
            <Coins className="size-4 text-amber-500 shrink-0" />
            <span className="hidden sm:inline">অবশিষ্ট পোস্টার তৈরির সুযোগ:</span>
            <span className="sm:hidden">বাকি ক্রেডিট:</span>
            <span className="font-extrabold text-sm text-foreground bg-background/80 px-2.5 py-0.5 rounded-lg border border-border/60">
              {credits !== null ? `${credits}টি` : "..."}
            </span>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsSelectingTemplate(true)}
            className="rounded-xl border-border/80 hover:bg-brand-primary/10 hover:text-brand-primary hover:border-brand-primary/30 font-semibold text-xs gap-1.5 cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>অন্য টেমপ্লেট বেছে নিন</span>
          </Button>
        </div>
      </div>

      {/* Main Studio Grid - Input Panel is wider & bigger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left side: Bigger input panel */}
        <div className="lg:col-span-7 w-full">
          <StudioInputPanel
            candidate={candidate}
            onCandidateChange={handleCandidateChange}
            theme={theme}
            onThemeChange={setTheme}
            photoUrl={photoUrl}
            onPhotoChange={(url) => {
              setPhotoUrl(url);
              setComparePhotoUrl(null);
              setIsComparing(false);
            }}
            onPhotoUpload={handlePhotoUpload}
            onOpenCropModal={() =>
              toast.info("ছবি ক্যানভাসে ড্র্যাগ করে ৩০% পর্যন্ত পজিশন পরিবর্তন করতে পারেন।")
            }
            onReset={handleReset}
            imageScale={imageScale}
            onImageScaleChange={setImageScale}
            imageOffsetX={imageOffsetX}
            imageOffsetY={imageOffsetY}
            onImageOffsetChange={(x, y) => {
              setImageOffsetX(x);
              setImageOffsetY(y);
            }}
            onCompareStart={(originalUrl) => {
              setComparePhotoUrl(originalUrl);
              setIsComparing(true);
            }}
            onCompareEnd={() => {
              setIsComparing(false);
            }}
          />
        </div>

        {/* Right side: Live banner with dynamic template */}
        <div className="lg:col-span-5 w-full sticky top-6">
          <StudioCanvas
            candidate={candidate}
            photoUrl={isComparing && comparePhotoUrl ? comparePhotoUrl : photoUrl}
            theme={theme}
            imageScale={imageScale}
            imageOffsetX={imageOffsetX}
            imageOffsetY={imageOffsetY}
            onImageOffsetChange={(x, y) => {
              setImageOffsetX(x);
              setImageOffsetY(y);
            }}
            template={activeTemplate}
            onCreatePoster={handleCreatePoster}
            onStartNewPoster={handleStartNewPoster}
            isCreating={isCreating}
            isCreated={isCreated}
            onDownload={handleDownloadFile}
            isDownloading={isDownloading}
            isComparing={isComparing}
            canvasRef={canvasRef}
          />
        </div>
      </div>

      {/* Poster Generation Success & Download Modal */}
      <PosterSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          setIsCreated(false);
          setCreatedPosterUrl(null);
        }}
        posterImageUrl={createdPosterUrl}
        candidateName={candidate.name}
        onDownload={handleDownloadFile}
        creditsLeft={credits}
        onStartNewPoster={handleStartNewPoster}
      />
    </div>
  );
}
