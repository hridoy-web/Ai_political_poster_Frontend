"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Copyright() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full flex items-center justify-between gap-4">
      <p className="text-xs text-muted-foreground">
        &copy; {year} <span className="font-semibold text-foreground">PosterAI</span> — সর্বস্বত্ব সংরক্ষিত।
      </p>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={scrollToTop}
        aria-label="পৃষ্ঠার শুরুতে যান"
        className="group h-8 gap-2 px-2.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
      >
        <span className="hidden sm:inline font-medium">উপরে যান</span>
        <ArrowUp className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
      </Button>
    </div>
  );
}