"use client"
import { Button } from "@/components/ui/button";
import { PosterGeneratorService } from "../generator.service";
import { BannerTheme, CandidateInfo } from "../generator.types";
import { Download, Loader2, MapPin, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";


interface StudioCanvasProps {
    candidate: CandidateInfo;
    photoUrl:string;
    theme:BannerTheme;
    imageScale:number;
    onDownload:() => void;
    isDownloading:boolean;
}

export function StudioCanvas ({
    candidate,
  photoUrl,
  theme,
  imageScale,
  onDownload,
  isDownloading,
}: StudioCanvasProps){
    const bgGradientClass = PosterGeneratorService.getThemeGradientClass(theme);
    return(
         <section className="flex flex-col gap-4 items-center w-full">
      <div className="w-full flex items-center justify-center p-3 sm:p-4 rounded-2xl bg-muted/40 border border-border">
        <div
          className={`aspect-[16/9] w-full rounded-2xl text-white transition-all duration-300 select-none shadow-2xl flex flex-col justify-between overflow-hidden relative border ${bgGradientClass}`}
        >
          <div className="relative z-10 w-full px-5 pt-3 flex items-center justify-end border-b border-white/15 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/10 text-white font-semibold border border-white/20">
                জাতীয় সংসদ নির্বাচন ২০২৬
              </span>
              <Badge className="bg-rose-600 hover:bg-rose-600 text-white font-bold text-[10px] px-2.5 py-0.5 shadow-sm border-none">
                মার্কা: ধানের শীষ 
              </Badge>
            </div>
          </div>
          <div className="relative z-10 w-full flex-1 px-5 flex items-center justify-between gap-4 overflow-hidden py-2">
            
            
            <div className="w-[64%] flex flex-col justify-center gap-1.5">
              <p className="text-xs sm:text-sm font-bold text-amber-300 drop-shadow flex items-center gap-1.5">
                <span className="text-amber-400">★</span>
                <span>{candidate.bannerTitle || "গণতন্ত্র ও জনগণের অধিকার আদায়ে"}</span>
              </p>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] leading-tight">
                {candidate.name || "প্রার্থীর পূর্ণ নাম"}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-0.5">
                <span className="bg-gradient-brand text-white font-bold text-[11px] sm:text-xs px-3 py-0.5 rounded-full shadow-md border border-rose-300/30">
                  {candidate.designation || "পদবী ও পরিচয়"}
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-100 flex items-center gap-1">
                  <MapPin className="size-3 text-emerald-300" />
                  <span>{candidate.area || "নির্বাচনী এলাকা"}</span>
                </span>
              </div>
              <div className="mt-1 p-2 rounded-xl bg-black/35 border border-white/15 max-w-md">
                <p className="text-[10px] sm:text-[11px] font-medium text-slate-100 italic leading-snug">
                  &ldquo;{candidate.slogan || "ক্যাম্পেইন স্লোগান"}&rdquo;
                </p>
              </div>
            </div>
            <div className="relative w-[36%] h-full flex items-center justify-center">
              <div className="w-32 sm:w-40 md:w-44 h-36 sm:h-44 md:h-48 rounded-2xl overflow-hidden flex items-center justify-center relative border-[3px] border-white/90 shadow-2xl bg-slate-900 ring-1 ring-amber-400/60">
                <img
                  src={photoUrl}
                  alt={candidate.name}
                  style={{ transform: `scale(${imageScale / 100})` }}
                  className="w-full h-full object-cover object-top transition-transform duration-200"
                />
              </div>
            </div>
          </div>
          <div className="relative z-10 w-full px-5 py-2 bg-black/60 border-t border-white/15 flex items-center text-xs">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-200">
              <span className="text-amber-400 font-bold">সৌজন্যে ও প্রচারে:</span>
              <span className="font-bold text-white">
                {candidate.courtesy || "এলাকাবাসী ও দলীয় সর্বস্তরের কর্মী-সমর্থক"}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/*Download & Save Section*/}
      <div className="w-full rounded-2xl p-4 border border-border bg-card flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-brand-green" />
            <span>১৬:৯ ব্যানার ডাউনলোড ও সেভ (১৯২০ x ১০৮০ px)</span>
          </span>
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Button
            type="button"
            onClick={onDownload}
            disabled={isDownloading}
            className="flex-1 sm:flex-initial bg-gradient-brand text-white font-bold text-xs h-10 px-6 rounded-xl shadow-lg gap-2 cursor-pointer"
          >
            {isDownloading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>তৈরি হচ্ছে...</span>
              </>
            ) : (
              <>
                <Download className="size-4" />
                <span>Download 1920x1080 Banner (HD)</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
    )
}