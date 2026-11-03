"use client";

import { useState } from "react";
import { BannerTheme, CandidateInfo } from "../generator.types";
import {Crop,Edit3,ImageIcon, RotateCcw,UploadCloud,User,Wand2,RefreshCw,Undo2,Eye, Move,} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useBackgroundRemoval } from "@/modules/background-removal";
import { AiSloganSection } from "./ai-slogan-section";

interface StudioInputPanelProps {
  candidate: CandidateInfo;
  onCandidateChange: (field: keyof CandidateInfo, value: string) => void;
  theme: BannerTheme;
  onThemeChange: (theme: BannerTheme) => void;
  photoUrl?: string;
  onPhotoChange?: (newUrl: string) => void;
  onPhotoUpload: (file: File) => void;
  onOpenCropModal: () => void;
  onReset: () => void;
  imageScale?: number;
  onImageScaleChange?: (scale: number) => void;
  imageOffsetX?: number;
  imageOffsetY?: number;
  onImageOffsetChange?: (x: number, y: number) => void;
  onCompareStart?: (originalUrl: string) => void;
  onCompareEnd?: () => void;
}

export function StudioInputPanel({
  candidate,
  onCandidateChange,
  theme,
  onThemeChange,
  photoUrl,
  onPhotoChange,
  onPhotoUpload,
  onOpenCropModal,
  onReset,
  imageScale = 100,
  onImageScaleChange,
  imageOffsetX = 0,
  imageOffsetY = 0,
  onImageOffsetChange,
  onCompareStart,
  onCompareEnd,
}: StudioInputPanelProps) {
  const [activeTab, setActiveTab] = useState<"candidate" | "photo">("candidate");


  // Background removal hook
  const {
    removeBg,
    isProcessing: isRemovingBg,
    progressPercent: bgProgressPercent,
    progressText: bgProgressText,
    revertToOriginal,
    originalPhotoUrl,
    hasOriginal,
  } = useBackgroundRemoval();

  const handleRemoveBackground = async () => {
    if (!photoUrl) {
      alert("অনুগ্রহ করে প্রথমে প্রার্থীর একটি ছবি আপলোড করুন।");
      return;
    }
    try {
      const transparentUrl = await removeBg(photoUrl);
      if (transparentUrl && onPhotoChange) {
        onPhotoChange(transparentUrl);
      }
    } catch (err) {
      console.error("Background removal error:", err);
      alert("ব্যাকগ্রাউন্ড রিমুভ করতে সমস্যা হয়েছে। অন্য ছবি দিয়ে চেষ্টা করুন।");
    }
  };

  const handleRevertBackground = () => {
    const original = revertToOriginal();
    if (original && onPhotoChange) {
      onPhotoChange(original);
    }
  };

  // Drag-and-drop file upload handle
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onPhotoUpload(e.target.files[0]);
    }
  };

  return (
    <section className="w-full rounded-3xl p-6 sm:p-7 border border-border bg-card flex flex-col gap-5 shadow-sm transition-all">
      {/* Panel header and reset button */}
      <div className="flex items-center justify-between pb-3.5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <span className="size-9 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold shadow-2xs">
            <Edit3 className="size-5" />
          </span>
          <div>
            <h2 className="font-black text-base sm:text-lg text-foreground tracking-tight">
              ইনপুট প্যানেল
            </h2>
            <span className="text-xs text-muted-foreground font-semibold">
              ডিজিটাল পোস্টার ইনফরমেশন ও কাস্টমাইজেশন
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="text-xs sm:text-sm font-semibold text-muted-foreground hover:text-brand-primary flex items-center gap-1.5 transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-muted"
        >
          <RotateCcw className="size-4" />
          <span>রিসেট</span>
        </button>
      </div>

         {/* Tabs Navigation (2 Tabs) */}
      <div className="grid grid-cols-2 gap-2 p-1.5 bg-muted/60 rounded-2xl border border-border">
        <button
          type="button"
          onClick={() => setActiveTab("candidate")}
          className={`py-2.5 sm:py-3 px-3 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "candidate"
              ? "bg-card text-emerald-600 shadow-sm border border-emerald-500/30 ring-1 ring-emerald-500/20"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <User className="size-4 text-emerald-600 shrink-0" />
          <span>প্রার্থীর তথ্য</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("photo")}
          className={`py-2.5 sm:py-3 px-3 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "photo"
              ? "bg-card text-emerald-600 shadow-sm border border-emerald-500/30 ring-1 ring-emerald-500/20"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ImageIcon className="size-4 text-muted-foreground shrink-0" />
          <span>ছবি ও থিম</span>
        </button>
      </div>

      {/* Tab 1: Candidate Information (Bigger text & inputs) */}
      {activeTab === "candidate" && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-foreground mb-1.5">
                প্রার্থীর নাম (বাংলায়)
              </label>
              <Input
                type="text"
                value={candidate.name}
                onChange={(e) => onCandidateChange("name", e.target.value)}
                placeholder="যেমন: জনাব মোঃ আরিফুল ইসলাম"
                className="h-11 sm:h-12 text-sm sm:text-base font-bold rounded-xl border-border px-3.5 focus-visible:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-foreground mb-1.5">
                পদবী ও রাজনৈতিক পরিচয়
              </label>
              <Input
                type="text"
                value={candidate.designation}
                onChange={(e) => onCandidateChange("designation", e.target.value)}
                placeholder="যেমন: সাধারণ সম্পাদক পদপ্রার্থী"
                className="h-11 sm:h-12 text-sm sm:text-base font-semibold rounded-xl border-border px-3.5 focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-foreground mb-1.5">
                নির্বাচনী এলাকা / আসন
              </label>
              <Input
                type="text"
                value={candidate.area}
                onChange={(e) => onCandidateChange("area", e.target.value)}
                placeholder="যেমন: ঢাকা-১০ সংসদীয় আসন"
                className="h-11 sm:h-12 text-sm sm:text-base font-semibold rounded-xl border-border px-3.5 focus-visible:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-foreground mb-1.5">
                ব্যানার বার্তা / হেডলাইন
              </label>
              <Input
                type="text"
                value={candidate.bannerTitle}
                onChange={(e) => onCandidateChange("bannerTitle", e.target.value)}
                placeholder="যেমন: গণতন্ত্র ও ইনসাফের পক্ষে"
                className="h-11 sm:h-12 text-sm sm:text-base font-semibold rounded-xl border-border px-3.5 focus-visible:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-bold text-foreground mb-1.5">
              সৌজন্যে ও প্রচারে (নিচের অংশ)
            </label>
            <Input
              type="text"
              value={candidate.courtesy}
              onChange={(e) => onCandidateChange("courtesy", e.target.value)}
              placeholder="যেমন: এলাকাবাসী ও দলীয় সর্বস্তরের কর্মী-সমর্থক"
              className="h-11 sm:h-12 text-sm sm:text-base font-semibold rounded-xl border-border px-3.5 focus-visible:ring-primary"
            />
          </div>
          <AiSloganSection
            candidate={candidate}
            onCandidateChange={onCandidateChange}
          />
        </div>
      )}

      {/* Tab 2: Image Upload, Hold-to-Compare, Reposition & Background Theme */}
      {activeTab === "photo" && (
        <div className="p-4 sm:p-5 rounded-2xl bg-muted/30 border border-border flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-foreground flex items-center gap-2">
              <ImageIcon className="size-4 text-brand-green" />
              <span>ছবি আপলোড ও ব্যাকগ্রাউন্ড</span>
            </span>
          </div>

          {/* Drag-and-drop file upload */}
          <label className="border-2 border-dashed border-border hover:border-brand-primary/60 rounded-2xl p-4 text-center cursor-pointer transition-all bg-card flex items-center justify-center gap-3.5 group">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <UploadCloud className="size-5" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-foreground">
                নতুন ছবি ড্র্যাগ করুন অথবা{" "}
                <span className="text-brand-primary underline">ব্রাউজ করুন</span>
              </div>
              <span className="block text-xs text-muted-foreground font-normal mt-0.5">
                PNG, JPG, WEBP যেকোনো ছবি (সর্বোচ্চ ১০ মেগাবাইট)
              </span>
            </div>
          </label>

          {/* Background Remover & Hold-to-Compare Buttons */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                disabled={isRemovingBg}
                onClick={handleRemoveBackground}
                className="flex-1 py-2.5 px-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 shadow-xs"
              >
                {isRemovingBg ? (
                  <>
                    <RefreshCw className="size-4 animate-spin" />
                    <span>
                      {bgProgressText || "রিমুভ হচ্ছে..."} ({bgProgressPercent}%)
                    </span>
                  </>
                ) : (
                  <>
                    <Wand2 className="size-4" />
                    <span>AI Background Remover (১-ক্লিকে রিমুভ)</span>
                  </>
                )}
              </button>

              {/* Hold-to-Compare and Undo Buttons when original exists */}
              {hasOriginal && (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onMouseDown={() => {
                      if (originalPhotoUrl) onCompareStart?.(originalPhotoUrl);
                    }}
                    onMouseUp={() => onCompareEnd?.()}
                    onMouseLeave={() => onCompareEnd?.()}
                    onTouchStart={() => {
                      if (originalPhotoUrl) onCompareStart?.(originalPhotoUrl);
                    }}
                    onTouchEnd={() => onCompareEnd?.()}
                    className="py-2.5 px-3.5 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all select-none cursor-pointer active:scale-95 shadow-xs"
                    title="চেপে ধরে রাখুন মূল ছবির সাথে তুলনা করতে"
                  >
                    <Eye className="size-4 text-amber-500" />
                    <span>তুলনা (ধরে রাখুন)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRevertBackground}
                    className="py-2.5 px-3 rounded-xl border border-border bg-card hover:bg-muted text-foreground text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                    title="মূল ছবিতে ফিরে যান (Undo)"
                  >
                    <Undo2 className="size-4" />
                    <span>মূল ছবি</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Image Reposition & Scale Control Section (30% area allowance) */}
          <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5">
                <Move className="size-4 text-brand-primary" />
                <span>ছবির অবস্থান ও স্কেলিং</span>
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                (সর্বোচ্চ ৩০% পর্যন্ত মুভ)
              </span>
            </div>

            {/* Position Controls: Direct Nudge Buttons & Reset */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onImageOffsetChange?.(imageOffsetX - 20, imageOffsetY)
                  }
                  className="h-8 w-8 p-0 rounded-lg text-sm font-bold hover:bg-muted"
                  title="বামে সরান"
                >
                  ←
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onImageOffsetChange?.(imageOffsetX, imageOffsetY - 20)
                  }
                  className="h-8 w-8 p-0 rounded-lg text-sm font-bold hover:bg-muted"
                  title="উপরে সরান"
                >
                  ↑
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onImageOffsetChange?.(imageOffsetX, imageOffsetY + 20)
                  }
                  className="h-8 w-8 p-0 rounded-lg text-sm font-bold hover:bg-muted"
                  title="নিচে সরান"
                >
                  ↓
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onImageOffsetChange?.(imageOffsetX + 20, imageOffsetY)
                  }
                  className="h-8 w-8 p-0 rounded-lg text-sm font-bold hover:bg-muted"
                  title="ডানে সরান"
                >
                  →
                </Button>
              </div>

              {(imageOffsetX !== 0 || imageOffsetY !== 0) && (
                <button
                  type="button"
                  onClick={() => onImageOffsetChange?.(0, 0)}
                  className="text-xs text-brand-primary font-bold hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="size-3.5" />
                  <span>সেন্টার রিসেট</span>
                </button>
              )}
            </div>
          </div>
       </div>
       )}
   </section>
  );
 }


   