import { Sparkles } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2.5 group cursor-pointer select-none">
      {/* Brand Icon Box with Crimson Red Gradient Fill & Sparkle */}
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-md shadow-brand-primary/20 transition-transform duration-300 group-hover:scale-105 shrink-0">
        <Sparkles className="h-5 w-5 text-white" />
        
        {/* Animated Pulse Badge (Primary & Secondary Crimson Accent) */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-primary"></span>
        </span>
      </div>

      {/* Brand Title with Gradient Typography */}
      <div className="flex flex-col">
        <span className="text-xl font-black tracking-tight text-foreground leading-none">
          Poster<span className="text-gradient-brand">AI</span>
        </span>
        <span className="text-[10px] text-muted-foreground font-bold tracking-wider uppercase mt-1">
          পলিটিক্যাল পোস্টার মেকার
        </span>
      </div>
    </div>
  );
}