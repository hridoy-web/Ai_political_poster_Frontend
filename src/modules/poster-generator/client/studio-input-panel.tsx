"use client"

import { useState } from "react";
import { BannerTheme, CandidateInfo } from "../generator.types";
import { PosterGeneratorService, SLOGAN_TOPICS } from "../generator.service";
import { Crop, Edit3, ImageIcon, Loader2, RotateCcw, Sparkles, UploadCloud, User, Wand2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface StudioInputPanelProps {
    candidate: CandidateInfo;
    onCandidateChange:(field:keyof CandidateInfo , value:string ) => void;
    theme:BannerTheme;
    onThemeChange:(theme:BannerTheme) => void;
    onPhotoUpload:(file:File)=> void;
    onOpenCropModal:()=> void;
    onReset:()=>void;
}
export function StudioInputPanel({
    candidate,
   onCandidateChange,
  theme,
  onThemeChange,
  onPhotoUpload,
  onOpenCropModal,
  onReset,
}: StudioInputPanelProps){
    const [sloganTopic,setSloganTopic] = useState("তারুণ্য ও কর্মসংস্থান");
    const [isGeneratingSlogans, setIsGeneratingSlogans] = useState(false);
    const [suggestedSlogans, setSuggestedSlogans] = useState<string[]>(()=>
    PosterGeneratorService.getSlogansByTopic("তারুণ্য ও কর্মসংস্থান")
    );

    // Handler for AI slogans
    const handleGenerateSlogans = (topicTouse?: string) => {
        const topic = topicTouse || sloganTopic;
         setIsGeneratingSlogans(true);
         setTimeout(() => {
            const results = PosterGeneratorService.getSlogansByTopic(topic);
            setSuggestedSlogans(results);
            setIsGeneratingSlogans(false);
         },700);
         };
         // Drag-and-drop file upload handle
           const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onPhotoUpload(e.target.files[0]);
    }
  };

    return (
    <section className="w-full rounded-2xl p-4 sm:p-5 border border-border bg-card flex flex-col gap-4 shadow-xs">
      
      {/*  Panel header and reset button */}
      <div className="flex items-center justify-between pb-2.5 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold">
            <Edit3 className="size-4" />
          </span>
          <div>
            <h2 className="font-bold text-sm text-foreground">ইনপুট প্যানেল</h2>
            <span className="text-[10px] text-muted-foreground font-semibold">১৬:৯ ডিজিটাল ব্যানার এডিটর</span>
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

      {/* Image Upload and Background Theme */}
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

        {/* Background Remover Button */}
        <button
          type="button"
          //onClick={() => alert("AI Background Remover খুব শীঘ্রই ক্লাউড এপিআইর সাথে যুক্ত হচ্ছে!")}
          className="w-full py-1.5 px-3 rounded-lg border border-brand-green/30 bg-brand-green/10 hover:bg-brand-green/20 text-brand-green text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Wand2 className="size-3.5" />
          <span>AI Background Remover (এক ক্লিকে রিমুভ)</span>
        </button>

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

      {/* Input fields for candidate information */}
      <div className="flex flex-col gap-2.5">
        <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
          <User className="size-3.5 text-brand-primary" />
          <span>প্রার্থীর তথ্য ও ব্যানার কনটেন্ট</span>
        </span>

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

        
        <div className="p-3 rounded-xl bg-muted/30 border border-border flex flex-col gap-2.5 mt-1">
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
              {suggestedSlogans.map((slogan, idx) => {
                const isActive = candidate.slogan === slogan;
                return (
                  <div
                    key={idx}
                    onClick={() => onCandidateChange("slogan", slogan)}
                    className={`p-2 rounded-lg border text-left cursor-pointer transition-all flex items-start justify-between gap-2 text-[11px] leading-snug ${
                      isActive
                        ? "bg-emerald-500/10 border-emerald-500 text-foreground font-bold shadow-xs"
                        : "bg-card border-border hover:border-emerald-500/50 hover:bg-muted/40"
                    }`}
                  >
                    <div className="flex items-start gap-1.5 flex-1">
                      <span className="text-emerald-600 font-bold mt-0.5">#{idx + 1}</span>
                      <span>&ldquo;{slogan}&rdquo;</span>
                    </div>
                    <span
                      className={`shrink-0 text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                        isActive
                          ? "bg-emerald-600 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isActive ? "✓ সক্রিয়" : "বসাতে ক্লিক"}
                    </span>
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
    </section>
  );
} 

         

