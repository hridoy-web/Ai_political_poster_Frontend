"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CandidateInfo, GeneratedSloganItem } from "../generator.types";
import { PosterGeneratorService, SLOGAN_TOPICS } from "../generator.service";

interface AiSloganSectionProps {
  candidate: CandidateInfo;
  onCandidateChange: (field: keyof CandidateInfo, value: string) => void;
}

export function AiSloganSection({ candidate, onCandidateChange }: AiSloganSectionProps) {
  const [sloganTopic, setSloganTopic] = useState("তারুণ্য ও কর্মসংস্থান");
  const [isGeneratingSlogans, setIsGeneratingSlogans] = useState(false);
  const [suggestedSlogans, setSuggestedSlogans] = useState<GeneratedSloganItem[]>(() =>
    PosterGeneratorService.getSlogansByTopic("তারুণ্য ও কর্মসংস্থান").map((s) => ({
      slogan: s,
      subText: "আসন্ন নির্বাচনে আপনার মূল্যবান ভোট ও দোয়া প্রার্থনা করছি।",
    }))
  );

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

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-muted/30 border border-border flex flex-col gap-4 mt-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-foreground flex items-center gap-2">
          <Sparkles className="size-4 text-amber-500" />
          <span>স্মার্ট এআই স্লোগান জেনারেটর</span>
        </span>
        <span className="text-xs text-muted-foreground font-semibold">
          ক্লিক করলেই ব্যানারে বসবে
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            value={sloganTopic}
            onChange={(e) => setSloganTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerateSlogans()}
            placeholder="যেমন: তারুণ্য, উন্নয়ন, সুশাসন..."
            className="h-11 text-sm rounded-xl px-4 flex-1 border-border bg-card"
          />
          <Button
            type="button"
            onClick={() => handleGenerateSlogans()}
            disabled={isGeneratingSlogans}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold h-11 px-4 rounded-xl gap-2 cursor-pointer shrink-0 shadow-sm"
          >
            {isGeneratingSlogans ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )}
            <span>স্লোগান তৈরি</span>
          </Button>
        </div>

        {/* Quick Topic Chips */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {SLOGAN_TOPICS.map((topic) => (
            <button
              key={topic.id}
              type="button"
              onClick={() => {
                setSloganTopic(topic.label);
                handleGenerateSlogans(topic.label);
              }}
              className="text-xs px-2.5 py-1 rounded-lg bg-card border border-border text-foreground hover:bg-muted transition-colors font-medium cursor-pointer"
            >
              {topic.label}
            </button>
          ))}
        </div>
      </div>

      {/* Suggested Slogans */}
      <div className="flex flex-col gap-2 pt-2 border-t border-border">
        <div className="flex flex-col gap-2">
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
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col gap-1 text-xs sm:text-sm leading-snug ${
                  isActive
                    ? "bg-emerald-500/10 border-emerald-500 text-foreground font-bold shadow-xs ring-1 ring-emerald-500/30"
                    : "bg-card border-border hover:border-emerald-500/50 hover:bg-muted/40"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 flex-1">
                    <span className="text-emerald-600 font-bold mt-0.5 shrink-0">
                      #{idx + 1}
                    </span>
                    <span className="text-foreground font-semibold">
                      &ldquo;{text}&rdquo;
                    </span>
                  </div>
                  <span
                    className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? "bg-emerald-600 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isActive ? "✓ সক্রিয়" : "বসাতে ক্লিক"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Slogan Input Field */}
      <div className="pt-2 border-t border-border flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-bold text-foreground flex items-center justify-between">
          <span>ক্যাম্পেইন স্লোগান (ট্যাগলাইন):</span>
          <span className="text-xs text-emerald-600 font-semibold">ক্যানভাসে লাইভ</span>
        </label>
        <Input
          type="text"
          value={candidate.slogan}
          onChange={(e) => onCandidateChange("slogan", e.target.value)}
          placeholder="যেমন: জনগণের সেবায় নিবেদিতপ্রাণ..."
          className="h-11 text-sm font-semibold border-emerald-400 bg-emerald-500/5 rounded-xl px-4"
        />
      </div>
    </div>
  );
}
