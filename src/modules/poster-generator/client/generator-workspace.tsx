"use client";

import { useEffect, useState } from "react";
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
import { Check, Layers, Loader2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  const [isDownloading, setIsDownloading] = useState(false);

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

  // Handler to switch template from switcher UI
  const handleSelectTemplate = async (tmpl: PublishedTemplate) => {
    if (activeTemplate?.id === tmpl.id) return;

    // If template doesn't have full blankTemplateUrl, fetch full details
    if (!tmpl.config?.blankTemplateUrl) {
      const detailed = await PosterGeneratorService.getTemplateById(tmpl.id);
      setActiveTemplate(detailed || tmpl);
    } else {
      setActiveTemplate(tmpl);
    }

    // Update URL query parameter smoothly
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("templateId", tmpl.id);
      window.history.replaceState({}, "", url.toString());
    } catch {
      // Ignore if SSR/history is unavailable
    }

    toast.success(`টেমপ্লেট সিলেক্ট করা হয়েছে: ${tmpl.title}`);
  };

  // 2. Logic to update the canvas instantly when input changes
  const handleCandidateChange = (field: keyof CandidateInfo, value: string) => {
    setCandidate((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePhotoUpload = (file: File) => {
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
    setCandidate(initialCandidate);
    setTheme("emerald");
    setImageScale(100);
    toast.info("ইনপুট তথ্য রিসেট করা হয়েছে।");
  };

  // Full real database pipeline: Save Draft -> Trigger Render -> Poll Completion -> Download
  const handleDownload = async () => {
    const currentTemplateId = activeTemplate?.id || "4c8057b1-35fb-4dad-83a3-32ecd314a0a3";
    setIsDownloading(true);
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
        },
      });

      toast.info("রেন্ডারিং ইঞ্জিন প্রসেসিং করছে...");

      // 2. Trigger asynchronous render job
      await PosterGeneratorService.triggerPosterRender(draft.id);

      // 3. Poll render status
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

      toast.success("পোস্টার সফলভাবে তৈরি হয়েছে এবং ডাটাবেজে সংরক্ষিত হয়েছে!");

      // 4. Download file
      const downloadTarget = completedStatus?.outputUrl || completedStatus?.previewUrl || photoUrl;
      if (downloadTarget) {
        const link = document.createElement("a");
        link.href = downloadTarget;
        link.download = `poster-${candidate.name.replace(/\s+/g, "-") || "candidate"}.png`;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err: any) {
      console.error("Poster render pipeline error:", err);
      const errMsg =
        err.response?.data?.message || err.message || "পোস্টার প্রসেস করতে সমস্যা হয়েছে।";
      toast.error(errMsg);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Template Switcher Bar */}
      <div className="w-full rounded-2xl border border-border bg-card p-3 sm:p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-border/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
              <Layers className="size-4" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5">
                <span>পোস্টার টেমপ্লেট নির্বাচন করুন</span>
                {isLoadingTemplates && <Loader2 className="size-3 animate-spin text-muted-foreground" />}
              </h2>
              <p className="text-[11px] text-muted-foreground">
                টেমপ্লেট ম্যানেজারদের তৈরি ডিজাইন সিলেক্ট করুন
              </p>
            </div>
          </div>

          {activeTemplate && (
            <Badge
              variant="outline"
              className="w-fit text-xs border-brand-primary/30 bg-brand-primary/10 text-brand-primary font-bold px-2.5 py-1 flex items-center gap-1.5"
            >
              <Sparkles className="size-3" />
              <span>বর্তমান: {activeTemplate.title}</span>
            </Badge>
          )}
        </div>

        {/* Templates quick selector chips / cards */}
        {isLoadingTemplates ? (
          <div className="py-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="size-4 animate-spin text-brand-primary" />
            <span>টেমপ্লেট তালিকা লোড হচ্ছে...</span>
          </div>
        ) : templates.length === 0 ? (
          <div className="py-3 text-xs text-muted-foreground text-center">
            কোনো পাবলিশ করা টেমপ্লেট পাওয়া যায়নি।
          </div>
        ) : (
          <div className="flex items-center gap-2.5 overflow-x-auto pt-3 pb-1 scrollbar-none">
            {templates.map((tmpl) => {
              const isSelected = activeTemplate?.id === tmpl.id;
              const hasCanvas = Boolean(tmpl.config?.blankTemplateUrl);
              return (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => handleSelectTemplate(tmpl)}
                  className={`group relative flex items-center gap-2.5 px-3 py-2 rounded-xl border text-left shrink-0 transition-all cursor-pointer ${
                    isSelected
                      ? "border-brand-primary bg-brand-primary/5 shadow-xs ring-2 ring-brand-primary/20"
                      : "border-border hover:border-brand-primary/40 bg-muted/30 hover:bg-muted/60"
                  }`}
                >
                  <div
                    className={`w-7 h-9 rounded-md overflow-hidden bg-slate-900 border flex items-center justify-center shrink-0 relative ${
                      isSelected ? "border-brand-primary" : "border-border"
                    }`}
                  >
                    {tmpl.config?.previewUrl || tmpl.config?.blankTemplateUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={tmpl.config.previewUrl || tmpl.config.blankTemplateUrl}
                        alt={tmpl.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Layers className="size-3 text-muted-foreground" />
                    )}
                    {isSelected && (
                      <div className="absolute inset-0 bg-brand-primary/30 backdrop-blur-xs flex items-center justify-center">
                        <Check className="size-3 text-white stroke-[3]" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground group-hover:text-brand-primary transition-colors line-clamp-1">
                      {tmpl.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {tmpl.aspectRatio || "৪:৫"} {hasCanvas ? "• ডিজিটাল ক্যানভাস" : ""}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left side: Input panel */}
        <div className="lg:col-span-6 w-full">
          <StudioInputPanel
            candidate={candidate}
            onCandidateChange={handleCandidateChange}
            theme={theme}
            onThemeChange={setTheme}
            photoUrl={photoUrl}
            onPhotoChange={setPhotoUrl}
            onPhotoUpload={handlePhotoUpload}
            onOpenCropModal={() =>
              toast.info("ছবি ক্যানভাসে স্বয়ংক্রিয়ভাবে সেন্টার ও স্কেল করা রয়েছে।")
            }
            onReset={handleReset}
          />
        </div>

        {/* Right side: Live banner with dynamic template */}
        <div className="lg:col-span-6 w-full sticky top-6">
          <StudioCanvas
            candidate={candidate}
            photoUrl={photoUrl}
            theme={theme}
            imageScale={imageScale}
            template={activeTemplate}
            onDownload={handleDownload}
            isDownloading={isDownloading}
          />
        </div>
      </div>
    </div>
  );
}
