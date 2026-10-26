"use client";

import { BannerTheme, CandidateInfo, SloganTopicOption } from "../generator.types";
import { StudioInputPanel } from "./studio-input-panel";
import { StudioCanvas } from "./studio-canvas";
import { useState } from "react";

// Type of data coming from the server component
interface GeneratorWorkspaceProps {
  initialCandidate: CandidateInfo;
  sloganTopics: SloganTopicOption[];
}

export function GeneratorWorkspace({
  initialCandidate,
}: GeneratorWorkspaceProps) {
  // 1. Core central states (to ensure the canvas on the right updates when input is provided on the left)
  const [candidate, setCandidate] = useState<CandidateInfo>(initialCandidate);
  const [theme, setTheme] = useState<BannerTheme>("emerald");
  const [photoUrl, setPhotoUrl] = useState(
    "https://hr.bup.edu.bd/upload/picture/17581.JPG"
  );
  const [imageScale, setImageScale] = useState(100);
  const [isDownloading, setIsDownloading] = useState(false);

  // 2. Logic to update the canvas instantly when something is typed into the input on the left
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
      }
    };
    reader.readAsDataURL(file);
  };

  
  const handleReset = () => {
    setCandidate(initialCandidate);
    setTheme("emerald");
    setImageScale(100);
  };

  // Download Logic
  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      //alert("ব্যানার সফলভাবে তৈরি হয়েছে।");
    }, 1000);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/*Left side: Input panel */}
        <div className="lg:col-span-6 w-full">
          <StudioInputPanel
            candidate={candidate}
            onCandidateChange={handleCandidateChange}
            theme={theme}
            onThemeChange={setTheme}
            photoUrl={photoUrl}
            onPhotoChange={setPhotoUrl}
            onPhotoUpload={handlePhotoUpload}
            onOpenCropModal={() => alert("ক্রপ ডায়ালগ খুব শীঘ্রই ওপেন হবে!")}
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
