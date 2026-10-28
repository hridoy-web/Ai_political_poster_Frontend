"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BannerTheme, CandidateInfo, SloganTopicOption } from "../generator.types";
import { PosterGeneratorService } from "../generator.service";
import { StudioInputPanel } from "./studio-input-panel";
import { StudioCanvas } from "./studio-canvas";

// Type of data coming from the server component
interface GeneratorWorkspaceProps {
  initialCandidate: CandidateInfo;
  sloganTopics: SloganTopicOption[];
}

export function GeneratorWorkspace({
  initialCandidate,
}: GeneratorWorkspaceProps) {
  // 1. Core central states
  const [candidate, setCandidate] = useState<CandidateInfo>(initialCandidate);
  const [theme, setTheme] = useState<BannerTheme>("emerald");
  const [photoUrl, setPhotoUrl] = useState(
    "https://hr.bup.edu.bd/upload/picture/17581.JPG"
  );
  const [imageScale, setImageScale] = useState(100);
  const [isDownloading, setIsDownloading] = useState(false);
  const [templateId, setTemplateId] = useState<string>("447130b7-5eea-41d9-b6cf-ae5f3145ac66");

  // Ensure guest session and fetch live published templates on load
  useEffect(() => {
    async function initWorkspace() {
      await PosterGeneratorService.ensureGuestSession();
      try {
        const templates = await PosterGeneratorService.fetchPublishedTemplates();
        if (templates.length > 0 && templates[0].id) {
          setTemplateId(templates[0].id);
        }
      } catch (e) {
        console.warn("Failed to load initial template ID:", e);
      }
    }
    initWorkspace();
  }, []);

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
    setIsDownloading(true);
    try {
      toast.info("ডাটাবেজে পোস্টার ড্রাফট সেভ হচ্ছে...");

      // 1. Create poster draft in PostgreSQL
      const draft = await PosterGeneratorService.createPosterDraft({
        templateId,
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
      const errMsg = err.response?.data?.message || err.message || "পোস্টার প্রসেস করতে সমস্যা হয়েছে।";
      toast.error(errMsg);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full">
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
            onOpenCropModal={() => toast.info("ছবি ক্যানভাসে স্বয়ংক্রিয়ভাবে সেন্টার ও স্কেল করা রয়েছে।")}
            onReset={handleReset}
          />
        </div>

        {/* Right side: Live banner */}
        <div className="lg:col-span-6 w-full sticky top-6">
          <StudioCanvas
            candidate={candidate}
            photoUrl={photoUrl}
            theme={theme}
            imageScale={imageScale}
            onDownload={handleDownload}
            isDownloading={isDownloading}
          />
        </div>
      </div>
    </div>
  );
}
