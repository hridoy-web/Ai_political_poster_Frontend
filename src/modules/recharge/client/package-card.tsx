"use client";

import React, { memo } from "react";
import { Sparkles, Zap, Crown, CheckCircle2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "cn";
import type { PackagePlan } from "../types";
import { toBengaliNumber } from "../utils";

interface PackageCardProps {
  plan: PackagePlan;
  isSelected: boolean;
  onSelect: () => void;
  onBuy?: () => void;
}

export const PackageCard = memo(function PackageCard({
  plan,
  isSelected,
  onSelect,
  onBuy,
}: PackageCardProps) {
  const isRedHero = plan.isPopular;
  const isGreenHero = plan.isBestValue;

  // Compute distinct card border & elevation styles cleanly
  const cardBorderClasses = isSelected
    ? isGreenHero
      ? "border-2 border-secondary bg-card ring-2 ring-secondary/40 shadow-2xl shadow-secondary/20 scale-[1.02] -translate-y-2"
      : "border-2 border-primary bg-card ring-2 ring-primary/40 shadow-2xl shadow-primary/20 scale-[1.02] -translate-y-2"
    : isGreenHero
    ? "border-x border-b border-border border-t-4 !border-t-secondary bg-card hover:shadow-2xl hover:shadow-secondary/20 hover:-translate-y-2.5"
    : isRedHero
    ? "border-x border-b border-border border-t-4 !border-t-primary bg-card hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2.5 md:-translate-y-1.5"
    : "border border-border bg-card hover:border-primary/50 hover:shadow-xl hover:-translate-y-2";

  return (
    <Card
      tabIndex={0}
      role="radio"
      aria-checked={isSelected}
      aria-label={`${plan.nameBangla}, পরিমাণ ৳${toBengaliNumber(plan.amount)}, মোট ${toBengaliNumber(plan.totalPosters)}টি পোস্টার`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={cn(
        "group relative rounded-3xl p-6 sm:p-7 transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between overflow-visible ring-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        cardBorderClasses
      )}
    >
      {/* Top Floating Badge */}
      {plan.tag && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-black tracking-wide shadow-md transition-transform group-hover:scale-105",
              isRedHero
                ? "bg-primary text-primary-foreground"
                : isGreenHero
                ? "bg-secondary text-secondary-foreground"
                : "bg-muted text-foreground border border-border"
            )}
          >
            {isRedHero && <Sparkles className="size-3.5 shrink-0" />}
            {isGreenHero && <Crown className="size-3.5 shrink-0" />}
            <span>{plan.tag}</span>
          </span>
        </div>
      )}

      {/* Card Content Top */}
      <div className="space-y-4 pt-1">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="font-black text-xl text-foreground tracking-tight">
              {plan.nameBangla}
            </h3>
            <p className="text-xs text-muted-foreground font-medium mt-0.5">
              {plan.nameEnglish}
            </p>
          </div>

          <div
            className={cn(
              "size-6 rounded-full border flex items-center justify-center transition-all",
              isSelected
                ? isGreenHero
                  ? "border-secondary bg-secondary text-secondary-foreground shadow-sm scale-110"
                  : "border-primary bg-primary text-primary-foreground shadow-sm scale-110"
                : "border-muted-foreground/30 bg-muted/30 group-hover:border-primary/60"
            )}
          >
            {isSelected && <Check className="size-3.5 stroke-[3]" />}
          </div>
        </div>

        {/* Pricing Area */}
        <div className="py-3.5 border-y border-border space-y-1">
          <div className="flex items-baseline gap-1.5">
            <span
              className={cn(
                "text-3xl sm:text-4xl font-black tracking-tight",
                isRedHero ? "text-primary" : isGreenHero ? "text-secondary" : "text-foreground"
              )}
            >
              ৳{toBengaliNumber(plan.amount)}
            </span>
            <span className="text-xs text-muted-foreground font-medium">/ এককালীন</span>
          </div>
          <div
            className={cn(
              "text-xs font-bold flex items-center gap-1.5 pt-0.5",
              isGreenHero ? "text-secondary" : isRedHero ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Zap className="size-3.5 shrink-0" />
            <span>মোট {toBengaliNumber(plan.totalPosters)}টি পোস্টার তৈরির সুযোগ</span>
          </div>
        </div>

        {/* Tier Specific Highlights */}
        {isGreenHero && (
          <div className="rounded-xl bg-secondary/10 border border-secondary/25 px-3 py-1.5 text-xs font-bold text-secondary flex items-center gap-1.5">
            <span>⚡ সেরা ডিল: প্রতি পোস্টার খরচ মাত্র ৮০ পয়সা!</span>
          </div>
        )}

        {/* Bonus Highlight Box */}
        {plan.bonusText && (
          <div
            className={cn(
              "rounded-xl border p-2.5 text-xs flex items-center gap-2 shadow-2xs font-bold",
              isGreenHero
                ? "bg-secondary/15 border-secondary/30 text-secondary"
                : isRedHero
                ? "bg-accent border-primary/20 text-accent-foreground"
                : "bg-muted border-border text-foreground"
            )}
          >
            <GiftIcon className="size-4 shrink-0" />
            <span className="leading-tight">{plan.bonusText}</span>
          </div>
        )}

        {/* Features Checklist */}
        <ul className="space-y-2.5 text-xs sm:text-sm pt-1">
          {plan.features.map((feat, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <CheckCircle2
                className={cn(
                  "size-4 shrink-0 mt-0.5",
                  isGreenHero ? "text-secondary" : "text-primary"
                )}
              />
              <span className="leading-snug text-foreground font-semibold">{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card Action Button */}
      <div className="pt-6 mt-4 border-t border-border">
        <Button
          variant={isSelected ? "default" : "outline"}
          className={cn(
            "w-full font-bold rounded-xl transition-all h-10 cursor-pointer",
            isSelected
              ? isGreenHero
                ? "bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/90"
                : "bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
              : "hover:border-primary/60 hover:bg-accent/40"
          )}
          onClick={(e) => {
            e.stopPropagation();
            if (onBuy) {
              onBuy();
            } else {
              onSelect();
            }
          }}
        >
          {isSelected ? "প্যাকেজটি কিনুন" : "প্যাকেজটি বেছে নিন"}
        </Button>
      </div>
    </Card>
  );
});

// Clean internal icon helper to avoid extra Lucide import if not needed
function GiftIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </svg>
  );
}
