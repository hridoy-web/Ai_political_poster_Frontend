"use client";

import React, { memo } from "react";
import { Gift, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PosterBenefits } from "../types";
import { toBengaliNumber } from "../utils";

interface RechargeSummaryProps {
  selectedPlanTitle: string;
  currentAmount: number;
  benefits: PosterBenefits;
  isMinimumValid: boolean;
  onProceed?: () => void;
  isLoading?: boolean;
}

export const RechargeSummary = memo(function RechargeSummary({
  selectedPlanTitle,
  currentAmount,
  benefits,
  isMinimumValid,
  onProceed,
  isLoading = false,
}: RechargeSummaryProps) {
  return (
    <div
      aria-live="polite"
      className="lg:col-span-5 rounded-2xl border border-border bg-muted/40 p-6 space-y-5 shadow-sm backdrop-blur-xs"
    >
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="font-bold text-sm tracking-wide uppercase text-foreground">
          রিচার্জ বিবরণী (Live Summary)
        </h4>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary font-semibold border border-secondary/20">
          লাইভ ক্যালকুলেশন
        </span>
      </div>

      <div className="space-y-3 text-xs sm:text-sm">
        <div className="flex justify-between items-center text-muted-foreground">
          <span>নির্বাচিত প্ল্যান</span>
          <span className="font-bold text-foreground">{selectedPlanTitle}</span>
        </div>

        <div className="flex justify-between items-center text-muted-foreground">
          <span>রিচার্জ অ্যামাউন্ট</span>
          <span className="font-extrabold text-base text-foreground">
            ৳{toBengaliNumber(currentAmount || 0)}
          </span>
        </div>

        <div className="flex justify-between items-center text-muted-foreground">
          <span>বেসিক পোস্টার ক্রেডিট</span>
          <span className="font-semibold text-foreground">
            {toBengaliNumber(benefits.base)}টি (প্রতিটি ১ টাকা)
          </span>
        </div>

        {benefits.bonus > 0 && (
          <div className="flex justify-between items-center text-secondary bg-secondary/15 rounded-xl p-2.5 font-bold shadow-xs border border-secondary/25">
            <span className="flex items-center gap-1.5">
              <Gift className="size-4 shrink-0" /> সম্পূর্ণ ফ্রি বোনাস
            </span>
            <span>+{toBengaliNumber(benefits.bonus)}টি পোস্টার</span>
          </div>
        )}

        <div className="border-t border-border pt-3.5 flex justify-between items-baseline">
          <div>
            <div className="text-xs text-muted-foreground font-medium">সর্বমোট পোস্টার সংখ্যা</div>
            <div className="text-sm font-bold text-foreground">তৈরির সুযোগ পাবেন</div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gradient-brand">
            {toBengaliNumber(benefits.total)} টি
          </div>
        </div>
      </div>

      {/* Action CTA Button */}
      <div className="pt-2 space-y-2.5">
        <Button
          type="button"
          disabled={!isMinimumValid || isLoading}
          onClick={onProceed}
          className="bg-gradient-brand w-full h-12 text-sm sm:text-base font-black rounded-xl shadow-md gap-2 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer group"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" />
              পেমেন্ট গেটওয়েতে নিয়ে যাওয়া হচ্ছে...
            </span>
          ) : (
            <>
              <span>৳{toBengaliNumber(currentAmount || 0)} রিচার্জ সম্পন্ন করুন</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
        <p className="text-[11px] text-center text-muted-foreground leading-relaxed font-medium">
          🔒 SSLCommerz নিরাপদ পেমেন্টের মাধ্যমে তাৎক্ষণিক ক্রেডিট যোগ হবে।
        </p>
      </div>
    </div>
  );
});
