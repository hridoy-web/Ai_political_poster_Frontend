"use client";

import { useState } from "react";
import { BannerTheme, CandidateInfo, GeneratedSloganItem } from "../generator.types";
import { PosterGeneratorService, SLOGAN_TOPICS } from "../generator.service";
import { Crop, Edit3, ImageIcon, Loader2, RotateCcw, Sparkles, UploadCloud, User, Wand2, RefreshCw, Undo2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useBackgroundRemoval } from "@/modules/background-removal";

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
}: StudioInputPanelProps) {
  const [activeTab, setActiveTab] = useState<"candidate" | "photo" | "slogan">("candidate");
  const [sloganTopic, setSloganTopic] = useState("তারুণ্য ও কর্মসংস্থান");
  const [isGeneratingSlogans, setIsGeneratingSlogans] = useState(false);
  const [suggestedSlogans, setSuggestedSlogans] = useState<GeneratedSloganItem[]>(() =>
    PosterGeneratorService.getSlogansByTopic("তারুণ্য ও কর্মসংস্থান").map((s) => ({
      slogan: s,
      subText: "আসন্ন নির্বাচনে আপনার মূল্যবান ভোট ও দোয়া প্রার্থনা করছি।",
    }))
  );

  // Live Handler for AI slogans connecting to backend
  const handleGenerateSlogans = async (topicTouse?: string) => {
    const topic = topicTouse || sloganTopic;
    setIsGeneratingSlogans(true);
    try {
      const results = await PosterGeneratorService.generateAiSlogans({
        topic,
        candidateName: candidate.name,
        designation: candidate.designation,
        area: candidate.area,
        partyOrIdeology: candidate.courtesy?.includes("বিএনপি")
          ? "বিএনপি"
          : candidate.courtesy?.includes("জামায়াত")
          ? "জামায়াতে ইসলামী"
          : "স্বতন্ত্র / সর্বদলীয়",
        count: 4,
      });
      setSuggestedSlogans(results);
    } catch (err) {
      console.error("AI Slogan generation error:", err);
      const fallback = PosterGeneratorService.getSlogansByTopic(topic).map((s) => ({
        slogan: s,
        subText: "আসন্ন নির্বাচনে আপনার মূল্যবান ভোট ও দোয়া প্রার্থনা করছি।",
      }));
      setSuggestedSlogans(fallback);
    } finally {
      setIsGeneratingSlogans(false);
    }
  };

  // Background removal hook
  const {
    removeBg,
    isProcessing: isRemovingBg,
    progressPercent: bgProgressPercent,
    progressText: bgProgressText,
    revertToOriginal,
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
    <section className="w-full rounded-2xl  p-4 sm:p-5 border border-border bg-card flex flex-col gap-4 shadow-xs">
      
      {/*  Panel header and reset button */}
      <div className="flex items-center justify-between pb-2.5 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold">
            <Edit3 className="size-4" />
          </span>
          <div>
            <h2 className="font-bold text-sm text-foreground">ইনপুট প্যানেল</h2>
            <span className="text-[10px] text-muted-foreground font-semibold">১৩০০ × ১৮০০ ডিজিটাল পোস্টার এডিটর</span>
          </div>
        </div>
        
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-muted-foreground hover:text-brand-primary flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="size-3.5" />
          <span>রিসেট</span>
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-muted/60 rounded-xl border border-border">
        <button
          type="button"
          onClick={() => setActiveTab("candidate")}
          className={`py-1.5 px-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === "candidate"
              ? "bg-card text-emerald-600 shadow-xs border border-emerald-500/30"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <User className="size-3.5 text-emerald-600" />
          <span>প্রার্থীর তথ্য</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("photo")}
          className={`py-1.5 px-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === "photo"
              ? "bg-card text-emerald-600 shadow-xs border border-emerald-500/30"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ImageIcon className="size-3.5 text-muted-foreground" />
          <span>ছবি ও থিম</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("slogan")}
          className={`py-1.5 px-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === "slogan"
              ? "bg-card text-emerald-600 shadow-xs border border-emerald-500/30"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Sparkles className="size-3.5 text-amber-500" />
          <span>এআই স্লোগান</span>
        </button>
      </div>

      {/* Tab 1: Candidate Information */}
      {activeTab === "candidate" && (
        <div className="flex flex-col gap-2.5">
          {/* Input fields for candidate information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Candidate's Name */}
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground mb-0.5">প্রার্থীর নাম (বাংলায়)</label>
              <Input
                type="text"
                value={candidate.name}
                onChange={(e) => onCandidateChange("name", e.target.value)}
                placeholder="যেমন: জনাব মোঃ আরিফুল ইসলাম"
                className="h-8 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground mb-0.5">পদবী ও রাজনৈতিক পরিচয়</label>
              <Input
                type="text"
                value={candidate.designation}
                onChange={(e) => onCandidateChange("designation", e.target.value)}
                placeholder="যেমন: সাধারণ সম্পাদক পদপ্রার্থী"
                className="h-8 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground mb-0.5">নির্বাচনী এলাকা / আসন</label>
              <Input
                type="text"
                value={candidate.area}
                onChange={(e) => onCandidateChange("area", e.target.value)}
                placeholder="যেমন: ঢাকা-১০ সংসদীয় আসন"
                className="h-8 text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground mb-0.5">ব্যানার বার্তা / হেডলাইন</label>
              <Input
                type="text"
                value={candidate.bannerTitle}
                onChange={(e) => onCandidateChange("bannerTitle", e.target.value)}
                placeholder="যেমন: গণতন্ত্র ও ইনসাফের পক্ষে"
                className="h-8 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-muted-foreground mb-0.5">সৌজন্যে ও প্রচারে (নিচের অংশ)</label>
            <Input
              type="text"
              value={candidate.courtesy}
              onChange={(e) => onCandidateChange("courtesy", e.target.value)}
              placeholder="যেমন: এলাকাবাসী ও ভক্তবৃন্দ"
              className="h-8 text-xs"
            />
          </div>
        </div>
      )}

      {/* Tab 2: Image Upload and Background Theme */}
      {activeTab === "photo" && (
        <div className="p-3 rounded-xl bg-muted/40 border border-border flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <ImageIcon className="size-3.5 text-brand-green" />
              <span>ছবি আপলোড ও ব্যাকগ্রাউন্ড</span>
            </span>
            {/* Crop button */}
            <button
              type="button"
              onClick={onOpenCropModal}
              className="text-[11px] font-bold text-brand-secondary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Crop className="size-3" />
              <span>ক্রপ ও সাইজ</span>
            </button>
          </div>

          {/* Drag-and-drop file upload */}
          <label className="border-2 border-dashed border-border hover:border-brand-primary/60 rounded-xl p-2.5 text-center cursor-pointer transition-all bg-card flex items-center justify-center gap-2.5">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="w-7 h-7 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
              <UploadCloud className="size-3.5" />
            </div>
            <div className="text-xs font-semibold text-foreground text-left">
              ছবি ড্র্যাগ করুন অথবা <span className="text-brand-primary underline">ব্রাউজ করুন</span>
              <span className="block text-[10px] text-muted-foreground font-normal">PNG, JPG, WEBP যেকোনো ছবি</span>
            </div>
          </label>

          {/* Background Remover Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isRemovingBg}
              onClick={handleRemoveBackground}
              className="flex-1 py-1.5 px-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60"
            >
              {isRemovingBg ? (
                <>
                  <RefreshCw className="size-3.5 animate-spin" />
                  <span>{bgProgressText || "রিমুভ হচ্ছে..."} ({bgProgressPercent}%)</span>
                </>
              ) : (
                <>
                  <Wand2 className="size-3.5" />
                  <span>AI Background Remover (১-ক্লিকে রিমুভ)</span>
                </>
              )}
            </button>

            {hasOriginal && (
              <button
                type="button"
                onClick={handleRevertBackground}
                className="py-1.5 px-2.5 rounded-lg border border-border bg-card hover:bg-muted text-foreground text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                title="মূল ছবিতে ফিরে যান"
              >
                <Undo2 className="size-3.5" />
                <span>মূল ছবি</span>
              </button>
            )}
          </div>

          <div className="pt-1.5 border-t border-border/60">
            <label className="block text-[11px] font-semibold text-muted-foreground mb-1.5">
              ব্যানারের সলিড কালার থিম:
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: "emerald", label: "সবুজ", color: "bg-[#063923]" },
                { id: "crimson", label: "লাল", color: "bg-[#881337]" },
                { id: "navy", label: "নেভি ব্লু", color: "bg-[#0f172a]" },
                { id: "charcoal", label: "চারকোল", color: "bg-[#18181b]" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onThemeChange(t.id as BannerTheme)}
                  className={`py-1 px-2 rounded-lg border text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    theme === t.id
                      ? "border-2 border-brand-primary bg-brand-primary/5 shadow-xs"
                      : "border-border hover:border-brand-primary/40 bg-card"
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${t.color} shrink-0 border border-white`} />
                  <span className="text-[10px] font-bold text-foreground">{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Slogan Generator */}
      {activeTab === "slogan" && (
        <div className="p-3 rounded-xl bg-muted/30 border border-border flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-emerald-600" />
              <span>লাইভ স্লোগান জেনারেটর</span>
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold text-muted-foreground flex items-center justify-between">
              <span>স্লোগানের বিষয় বা থিম লিখুন:</span>
              <span className="text-[10px] text-muted-foreground/80">বিষয় লিখলে এআই সাজেস্ট করবে</span>
            </label>
            <div className="flex gap-1.5">
              <Input
                type="text"
                value={sloganTopic}
                onChange={(e) => setSloganTopic(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerateSlogans()}
                placeholder="যেমন: তারুণ্য, উন্নয়ন, সুশাসন..."
                className="h-8 text-xs flex-1"
              />
              {/* Slogan button */}
              <Button
                type="button"
                size="sm"
                onClick={() => handleGenerateSlogans()}
                disabled={isGeneratingSlogans}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8 px-3 rounded-lg gap-1.5 cursor-pointer shrink-0"
              >
                {isGeneratingSlogans ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Sparkles className="size-3.5" />
                )}
                <span>স্লোগান তৈরি</span>
              </Button>
            </div>

            {/* Quick Topic Chips Button */}
            <div className="flex flex-wrap gap-1 mt-0.5">
              {SLOGAN_TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => {
                    setSloganTopic(topic.label);
                    handleGenerateSlogans(topic.label);
                  }}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-card border border-border text-foreground hover:bg-muted transition-colors font-medium cursor-pointer"
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5 pt-1.5 border-t border-border">
            <span className="text-[10px] font-bold text-muted-foreground">
              এআই সাজেস্টেড স্লোগান (ক্লিক করলেই ব্যানারে বসবে):
            </span>
            <div className="flex flex-col gap-1.5">
              {suggestedSlogans.map((item, idx) => {
                const text = typeof item === "string" ? item : item.slogan;
                const sub = typeof item === "object" ? item.subText : undefined;
                const isActive = candidate.slogan === text;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      onCandidateChange("slogan", text);
                      if (sub && !candidate.bannerTitle) {
                        onCandidateChange("bannerTitle", sub);
                      }
                    }}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col gap-1 text-[11px] leading-snug ${
                      isActive
                        ? "bg-emerald-500/10 border-emerald-500 text-foreground font-bold shadow-xs ring-1 ring-emerald-500/30"
                        : "bg-card border-border hover:border-emerald-500/50 hover:bg-muted/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-1.5 flex-1">
                        <span className="text-emerald-600 font-bold mt-0.5 shrink-0">#{idx + 1}</span>
                        <span className="text-foreground font-semibold">&ldquo;{text}&rdquo;</span>
                      </div>
                      <span
                        className={`shrink-0 text-[9px] px-2 py-0.5 rounded font-semibold ${
                          isActive
                            ? "bg-emerald-600 text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isActive ? "✓ সক্রিয়" : "বসাতে ক্লিক"}
                      </span>
                    </div>
                    {sub && (
                      <p className="text-[10px] text-muted-foreground pl-4 font-normal italic">
                        {sub}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-1.5 border-t border-border flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-muted-foreground flex items-center justify-between">
              <span>ক্যাম্পেইন স্লোগান (ট্যাগলাইন):</span>
              <span className="text-[10px] text-emerald-600 font-medium">ক্যানভাসে লাইভ রিয়েল-টাইম</span>
            </label>
            <Input
              type="text"
              value={candidate.slogan}
              onChange={(e) => onCandidateChange("slogan", e.target.value)}
              className="h-8 text-xs font-semibold border-emerald-400 bg-emerald-500/5"
            />
          </div>
        </div>
      )}

    </section>
  );
}
