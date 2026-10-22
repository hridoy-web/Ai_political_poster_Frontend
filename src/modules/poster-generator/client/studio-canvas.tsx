"use client";

import { Button } from "@/components/ui/button";
import { PosterGeneratorService } from "../generator.service";
import { BannerTheme, CandidateInfo } from "../generator.types";
import { Download, Loader2, MapPin, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StudioCanvasProps {
  candidate: CandidateInfo;
  photoUrl: string;
  theme: BannerTheme;
  imageScale: number;
  onDownload: () => void;
  isDownloading: boolean;
}

export function StudioCanvas({
  candidate,
  photoUrl,
  theme,
  imageScale,
  onDownload,
  isDownloading,
}: StudioCanvasProps) {
  const bgGradientClass = PosterGeneratorService.getThemeGradientClass(theme);

  return (
    <section className="flex flex-col gap-3 items-center w-full">
      <div className="w-full max-w-[600px] mx-auto flex items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-muted/40 border border-border">
        <div
          className={`aspect-[1300/1800] h-[min(450px,calc(100vh-200px))] w-auto max-w-full rounded-2xl text-white transition-all duration-300 select-none shadow-2xl flex flex-col justify-between overflow-hidden relative border text-center ${bgGradientClass}`}
        >
          <div className="relative z-10 w-full px-3 pt-2 flex items-center justify-between border-b border-white/15 pb-1.5 shrink-0">
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-emerald-100 font-semibold border border-white/20">
              জাতীয় সংসদ নির্বাচন ২০২৬
            </span>
            <Badge className="bg-rose-600 hover:bg-rose-600 text-white font-bold text-[9px] px-2 py-0.5 shadow-xs border-none">
              মার্কা: ধানের শীষ
            </Badge>
          </div>

          <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center gap-1.5 sm:gap-2 px-3 py-1">
            <p className="text-[10px] sm:text-[11px] font-bold text-amber-300 drop-shadow flex items-center justify-center gap-1">
              <span className="text-amber-400">★</span>
              <span>{candidate.bannerTitle || "গণতন্ত্র ও জনগণের অধিকার আদায়ে"}</span>
            </p>

            <div className="w-32 sm:w-36 h-36 sm:h-40 rounded-2xl overflow-hidden flex items-center justify-center relative border-2 border-amber-300/80 shadow-md bg-slate-900 ring-1 ring-amber-400/50">
              <img
                src={photoUrl}
                alt={candidate.name}
                style={{ transform: `scale(${imageScale / 100})` }}
                className="w-full h-full object-cover object-top transition-transform duration-200"
              />
            </div>

            <h1 className="text-lg sm:text-xl font-black tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] leading-tight text-center">
              {candidate.name || "জনাব মোঃ আরিফুল ইসলাম"}
            </h1>

            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              <span className="bg-gradient-brand text-white font-bold text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-full shadow-xs border border-rose-300/30">
                {candidate.designation || "সাধারণ সম্পাদক পদপ্রার্থী"}
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-100 flex items-center gap-0.5">
                <MapPin className="size-2.5 text-emerald-300" />
                <span>{candidate.area || "ঢাকা-১০ সংসদীয় আসন"}</span>
              </span>
            </div>

            <div className="px-2.5 py-1 sm:py-1.5 rounded-lg bg-black/45 border border-white/15 max-w-[260px] w-full text-center shadow-xs">
              <p className="text-[8.5px] sm:text-[9.5px] font-medium text-slate-100 italic leading-snug">
                &ldquo;{candidate.slogan || "জনগণের সেবায় নিবেদিতপ্রাণ, দুর্নীতির বিরুদ্ধে আপোষহীন কণ্ঠস্বর"}&rdquo;
              </p>
            </div>
          </div>

          <div className="relative z-10 w-full px-2 py-1.5 bg-black/70 border-t border-white/15 flex items-center justify-center text-center shrink-0">
            <div className="flex items-center justify-center gap-1 text-[8.5px] sm:text-[9.5px] text-slate-200">
              <span className="text-amber-400 font-bold">সৌজন্যে ও প্রচারে:</span>
              <span className="font-bold text-white truncate max-w-[180px]">
                {candidate.courtesy || "এলাকাবাসী ও দলীয় সর্বস্তরের কর্মী-সমর্থক"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/*Download & Save Section*/}
      <div className="w-full rounded-2xl p-3 border border-border bg-card flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex flex-col text-center sm:text-left">
          <span className="text-xs font-bold text-foreground flex items-center justify-center sm:justify-start gap-1.5">
            <ShieldCheck className="size-4 text-brand-green" />
            <span>১৩০০ × ১৮০০ পোস্টার ডাউনলোড (HD Download)</span>
          </span>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            type="button"
            onClick={onDownload}
            disabled={isDownloading}
            className="w-full sm:w-auto bg-gradient-brand text-white font-bold text-xs h-9 px-5 rounded-xl shadow-md gap-2 cursor-pointer"
          >
            {isDownloading ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                <span>তৈরি হচ্ছে...</span>
              </>
            ) : (
              <>
                <Download className="size-3.5" />
                <span>Download Poster (1300×1800)</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
