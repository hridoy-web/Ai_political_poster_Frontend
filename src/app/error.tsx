"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, Headset } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // কনসোলে এরর লগ করে রাখার জন্য
    console.error("Application Error Logged:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-12 max-w-2xl mx-auto space-y-6 relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-destructive/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Warning Badge */}
      <Badge
        variant="outline"
        className="px-3.5 py-1 gap-1.5 rounded-full bg-destructive/10 border-destructive/20 text-destructive text-xs font-semibold"
      >
        <AlertTriangle className="w-3.5 h-3.5" />
        <span>সাময়িক সমস্যা দেখা দিয়েছে</span>
      </Badge>

      {/* Main Heading & Description */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          কিছু একটা ভুল হয়েছে!
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md mx-auto">
          আমরা আন্তরিকভাবে দুঃখিত। তথ্য লোড করতে বা প্রসেস করতে সমস্যা হচ্ছে। দয়া করে আবার চেষ্টা করুন।
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full sm:w-auto">
        {/* Reset / Try Again Button */}
        <Button
          onClick={() => reset()}
          size="lg"
          className="w-full sm:w-auto rounded-xl font-bold bg-gradient-brand text-white shadow-md hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          <span>আবার চেষ্টা করুন</span>
        </Button>

        {/* Home Link Button */}
        <Button
          asChild
          variant="outline"
          size="lg"
          className="w-full sm:w-auto rounded-xl font-bold bg-background/50 border-border/80 hover:bg-accent text-foreground shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm"
        >
          <Link href="/">
            <Home className="w-4 h-4 mr-2" />
            <span>হোমপেজে যান</span>
          </Link>
        </Button>
      </div>

      {/* Support Footer Link */}
      <p className="pt-6 text-xs text-muted-foreground flex items-center justify-center gap-1.5">
        <Headset className="w-3.5 h-3.5 text-secondary" />
        <span>সমস্যা সমাধান না হলে</span>
        <Link
          href="/contact"
          className="text-primary hover:underline font-semibold ml-0.5"
        >
          আমাদের সাথে কথা বলুন
        </Link>
      </p>
    </div>
  );
}