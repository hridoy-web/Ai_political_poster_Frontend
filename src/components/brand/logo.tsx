import { Sparkles } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer select-none">
      {/* 🔴 BRAND ICON BOX: Responsive sizing for Mobile (h-8 w-8) & Desktop (sm:h-10 sm:w-10) */}
      <div className="relative flex size-8 sm:size-9 md:size-10 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-brand text-white shadow-md shadow-brand-primary/20 transition-transform duration-300 group-hover:scale-105 shrink-0">
        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        
        {/* Animated Pulse Badge */}
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-brand-primary"></span>
        </span>
      </div>

      {/* 🔴 BRAND TYPOGRAPHY: Scale-up text and subtitle progressively for larger screens */}
      <div className="flex flex-col">
        {/* Title: Text size scales from lg (Mobile) to xl (Laptop) to 2xl (Desktop) */}
        <span className="text-base sm:text-xl lg:text-2xl font-black tracking-tight text-foreground leading-none">
          Poster<span className="text-gradient-brand">AI</span>
        </span>
        
        {/* Subtitle: Hidden on very small screens if needed, otherwise scales smoothly */}
        <span className="text-[9px] sm:text-[10px] text-muted-foreground font-bold tracking-wider uppercase mt-0.5 sm:mt-1 whitespace-nowrap">
          পলিটিক্যাল পোস্টার মেকার
        </span>
      </div>
    </div>
  );
}