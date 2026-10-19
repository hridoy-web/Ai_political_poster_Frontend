"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function Copyright() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full flex items-center justify-between gap-4">
      {/* Left — copyright */}
      <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">
        &copy; {year} <span className="font-semibold text-foreground">PosterAI</span> {" — "}সর্বস্বত্ব সংরক্ষিত।
      </p>

      {/* Right — unique scroll-to-top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="পৃষ্ঠার শুরুতে যান"
        className="group flex items-center gap-2 text-[11px] text-muted-foreground/60 hover:text-foreground transition-colors duration-200 cursor-pointer shrink-0"
      >
        <span className="hidden sm:inline font-medium tracking-wide">উপরে যান</span>
        <span className="relative flex size-7 items-center justify-center rounded-full border border-border/60 bg-muted/30 group-hover:bg-brand-green/10 dark:group-hover:bg-brand-mint/10 group-hover:border-brand-green/40 dark:group-hover:border-brand-mint/40 transition-all duration-300">
          <ArrowUp className="size-3.5 text-muted-foreground group-hover:text-brand-green dark:group-hover:text-brand-mint transition-all duration-300 group-hover:-translate-y-0.5" />
        </span>
      </button>
    </div>
  );
}