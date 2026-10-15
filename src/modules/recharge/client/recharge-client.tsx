"use client";

import React, { useState, useId } from "react";
import {
  Sparkles,
  Zap,
  Crown,
  CheckCircle2,
  ArrowRight,
  Info,
  Gift,
  Flame,
  Check,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "cn";

export interface PackagePlan {
  id: string;
  nameBangla: string;
  nameEnglish: string;
  amount: number;
  posters: number;
  freePosters: number;
  totalPosters: number;
  tag?: string;
  isPopular?: boolean;
  isBestValue?: boolean;
  features: string[];
  bonusText?: string;
}

interface RechargeClientProps {
  presetPackages: PackagePlan[];
  quickAmounts: number[];
}

// Convert English numbers/digits to Bengali digits
export const toBengaliNumber = (val: number | string): string => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(val).replace(/[0-9]/g, (d) => bnDigits[parseInt(d, 10)]);
};

// Convert Bengali digits to English digits for arithmetic
export const toEnglishNumber = (val: string): string => {
  const bnMap: Record<string, string> = {
    "০": "0",
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
  };
  return val.replace(/[০-৯]/g, (char) => bnMap[char] || char);
};

export function RechargeClient({ presetPackages, quickAmounts }: RechargeClientProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<string>("campaign");
  const [displayAmount, setDisplayAmount] = useState<string>("৫০");
  const [selectedPayment, setSelectedPayment] = useState<string>("bkash");
  const inputId = useId();

  // Numeric amount in English for calculations
  const currentAmount = parseInt(toEnglishNumber(displayAmount), 10) || 0;
  const isMinimumValid = currentAmount >= 20;

  const handleSelectPlan = (plan: PackagePlan) => {
    setSelectedPlanId(plan.id);
    setDisplayAmount(toBengaliNumber(plan.amount));
  };

  // Convert any English digits to Bengali digits
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const cleaned = rawVal.replace(/[^0-9০-৯]/g, "");

    if (cleaned === "") {
      setDisplayAmount("");
      setSelectedPlanId("");
      return;
    }

    const bengaliConverted = toBengaliNumber(cleaned);
    setDisplayAmount(bengaliConverted);

    const num = parseInt(toEnglishNumber(bengaliConverted), 10);
    if (!isNaN(num)) {
      const matched = presetPackages.find((p) => p.amount === num);
      setSelectedPlanId(matched ? matched.id : "custom");
    }
  };

  // Calculate bonus & total posters
  const calculatePosterBenefits = (amount: number) => {
    if (amount <= 0) return { base: 0, bonus: 0, total: 0 };
    const base = amount;

    if (amount === 50) {
      return { base: 50, bonus: 10, total: 60 };
    }

    if (amount === 100) {
      return { base: 100, bonus: 25, total: 125 };
    }

    if (amount >= 100) {
      const bonus = Math.floor(amount * 0.25);
      return { base, bonus, total: base + bonus };
    }

    if (amount >= 50) {
      const bonus = Math.floor(amount * 0.2);
      return { base, bonus, total: base + bonus };
    }

    return { base, bonus: 0, total: base };
  };

  const benefits = calculatePosterBenefits(currentAmount);

  // Motivational Upsell Tip
  const getUpsellTip = () => {
    if (currentAmount >= 20 && currentAmount < 50) {
      const diff = 50 - currentAmount;
      return `টিপ: আর মাত্র ৳${toBengaliNumber(diff)} যোগ করলেই পাবেন ১০টি ফ্রি বোনাস পোস্টার (মোট ৬০টি) ও প্রিমিয়াম এআই আনলিমিটেড অ্যাক্সেস!`;
    }
    if (currentAmount >= 50 && currentAmount < 100) {
      const diff = 100 - currentAmount;
      return `টিপ: আর মাত্র ৳${toBengaliNumber(diff)} যোগ করলেই পাবেন ২৫টি ফ্রি বোনাস পোস্টার (মোট ১২৫টি)!`;
    }
    return null;
  };

  const upsellTip = getUpsellTip();

  return (
    <div className="space-y-12">
      {/* 3 Distinct Preset Packages with High Contrast & Visual Differentiation */}
      <section aria-labelledby="pricing-plans-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border pb-4">
          <div>
            <h2 id="pricing-plans-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              জনপ্রিয় প্রি-সেট প্ল্যানসমূহ
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              এক ক্লিকে পছন্দের প্যাক নির্বাচন করুন অথবা নিচে ইচ্ছামতো রিচার্জ করুন
            </p>
          </div>
          <Badge
            variant="secondary"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-semibold self-start sm:self-auto shadow-xs border border-secondary/25 h-auto"
          >
            <Flame className="size-3.5 text-secondary" />
            <span>বড় প্যাকে অতিরিক্ত ফ্রি পোস্টার অন্তর্ভুক্ত</span>
          </Badge>
        </div>

        <div
          role="radiogroup"
          aria-label="জনপ্রিয় প্রি-সেট প্ল্যানসমূহ"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 items-stretch"
        >
          {presetPackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              plan={pkg}
              isSelected={selectedPlanId === pkg.id}
              onSelect={() => handleSelectPlan(pkg)}
            />
          ))}
        </div>
      </section>

      {/* Interactive Custom Amount Box & Checkout Card */}
      <section
        aria-labelledby="custom-recharge-heading"
        className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-9 shadow-lg transition-all"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="pointer-events-none absolute -top-20 -right-20 size-72 rounded-full bg-primary/10 blur-3xl opacity-60" />

        <div className="border-b border-border pb-5 mb-8">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-accent flex items-center justify-center text-primary shadow-xs border border-border">
              <Zap className="size-5" />
            </div>
            <h3 id="custom-recharge-heading" className="text-xl sm:text-2xl font-bold tracking-tight">
              কাস্টম রিচার্জ ও পেমেন্ট
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1.5">
            ব্যবহারকারী যেন নিজের ইচ্ছমতো যেকোনো পরিমাণ টাকা (ন্যূনতম ২০ টাকা) রিচার্জ করতে পারেন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input + Quick Preset Buttons + Gateways */}
          <div className="lg:col-span-7 space-y-6">
            {/* Custom Input */}
            <div className="space-y-2">
              <label
                htmlFor={inputId}
                className="text-xs sm:text-sm font-bold text-foreground flex items-center justify-between"
              >
                <span>রিচার্জের পরিমাণ লিখুন (টাকা)</span>
                <span className="text-xs font-semibold text-secondary">
                  ন্যূনতম: ৳২০ | প্রতিটি ১ টাকা
                </span>
              </label>

              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 font-extrabold text-xl text-primary pointer-events-none select-none transition-transform group-focus-within:scale-110">
                  ৳
                </div>
                <Input
                  id={inputId}
                  type="text"
                  inputMode="numeric"
                  value={displayAmount}
                  onChange={handleAmountChange}
                  placeholder="টাকার পরিমাণ লিখুন (ন্যূনতম ২০ টাকা)"
                  className="pl-10 h-14 text-xl font-black rounded-2xl border-border bg-background focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary transition-all shadow-inner"
                />
              </div>

              {!isMinimumValid && currentAmount > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-destructive font-semibold pt-1 animate-pulse">
                  <Info className="size-3.5 shrink-0" />
                  <span>ন্যূনতম রিচার্জের পরিমাণ ২০ টাকা হতে হবে।</span>
                </div>
              )}
            </div>

            {/* Quick Amount Selector Chips with Accessible radiogroup */}
            <div className="space-y-2.5">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                কুইক সিলেক্ট বাটন:
              </div>
              <div role="radiogroup" aria-label="কুইক সিলেক্ট বাটন" className="flex flex-wrap gap-2.5">
                {quickAmounts.map((amt) => {
                  const isActive = currentAmount === amt;
                  return (
                    <button
                      key={amt}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      onClick={() => {
                        setDisplayAmount(toBengaliNumber(amt));
                        const matched = presetPackages.find((p) => p.amount === amt);
                        setSelectedPlanId(matched ? matched.id : "custom");
                      }}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        isActive
                          ? "bg-gradient-brand shadow-md scale-105"
                          : "bg-muted text-foreground border-border hover:border-primary/60 hover:bg-accent/40 hover:-translate-y-0.5"
                      }`}
                    >
                      +৳{toBengaliNumber(amt)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Motivational Upsell Box */}
            {upsellTip && (
              <div className="rounded-2xl bg-secondary/15 border border-secondary/30 p-3.5 text-xs text-foreground flex items-center gap-2.5 shadow-xs transition-all">
                <TrendingUp className="size-4 text-secondary shrink-0" />
                <span className="font-semibold leading-relaxed">{upsellTip}</span>
              </div>
            )}

            {/* Payment Gateways with Accessible radiogroup */}
            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                পেমেন্ট মাধ্যম বেছে নিন:
              </div>
              <div role="radiogroup" aria-label="পেমেন্ট মাধ্যম বেছে নিন" className="grid grid-cols-3 gap-3">
                {[
                  { id: "bkash", name: "বিকাশ (bKash)", badge: "তাৎক্ষণিক" },
                  { id: "nagad", name: "নগদ (Nagad)", badge: "তাৎক্ষণিক" },
                  { id: "card", name: "কার্ড / অন্যান্য", badge: "অনলাইন" },
                ].map((gateway) => {
                  const isChecked = selectedPayment === gateway.id;
                  return (
                    <button
                      key={gateway.id}
                      type="button"
                      role="radio"
                      aria-checked={isChecked}
                      onClick={() => setSelectedPayment(gateway.id)}
                      className={`p-3.5 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-1 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        isChecked
                          ? "border-primary bg-accent text-accent-foreground ring-2 ring-primary/30 shadow-md scale-[1.02]"
                          : "border-border bg-background text-muted-foreground hover:bg-muted hover:border-primary/40 hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-bold text-foreground">
                        {gateway.name}
                      </div>
                      <span className="text-[10px] text-muted-foreground font-medium">
                        {gateway.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Summary Order Card */}
          <div aria-live="polite" className="lg:col-span-5 rounded-2xl border border-border bg-muted/40 p-6 space-y-5 shadow-sm backdrop-blur-xs">
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
                <span className="font-bold text-foreground">
                  {presetPackages.find((p) => p.id === selectedPlanId)?.nameBangla || "কাস্টম রিচার্জ"}
                </span>
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
                    <Gift className="size-4" /> সম্পূর্ণ ফ্রি বোনাস
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
                disabled={!isMinimumValid}
                className="bg-gradient-brand w-full h-12 text-sm sm:text-base font-black rounded-xl shadow-md gap-2 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <span>৳{toBengaliNumber(currentAmount || 0)} রিচার্জ সম্পন্ন করুন</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <p className="text-[11px] text-center text-muted-foreground leading-relaxed font-medium">
                🔒 ১০০% নিরাপদ পেমেন্টের মাধ্যমে তাৎক্ষণিক ব্যালেন্স যোগ হবে।
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Distinct, High-Contrast Package Card Component (DRY Architecture)
// ---------------------------------------------------------------------------
interface PackageCardProps {
  plan: PackagePlan;
  isSelected: boolean;
  onSelect: () => void;
}

function PackageCard({ plan, isSelected, onSelect }: PackageCardProps) {
  const isRedHero = plan.isPopular; // 50 TK Campaign Booster
  const isGreenHero = plan.isBestValue; // 100 TK Pro Political

  // Distinct Card Border & Styling per Tier
  let cardBorderClasses = "border border-border bg-card hover:border-primary/50 hover:shadow-xl hover:-translate-y-2";
  if (isSelected) {
    if (isRedHero) {
      cardBorderClasses = "border-2 border-primary bg-card ring-2 ring-primary/40 shadow-2xl shadow-primary/20 scale-[1.02] -translate-y-2";
    } else if (isGreenHero) {
      cardBorderClasses = "border-2 border-secondary bg-card ring-2 ring-secondary/40 shadow-2xl shadow-secondary/20 scale-[1.02] -translate-y-2";
    } else {
      cardBorderClasses = "border-2 border-primary bg-card ring-2 ring-primary/30 shadow-xl scale-[1.02] -translate-y-2";
    }
  } else {
    if (isRedHero) {
      cardBorderClasses = "border-x border-b border-border border-t-4 !border-t-primary bg-card hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2.5 md:-translate-y-1.5";
    } else if (isGreenHero) {
      cardBorderClasses = "border-x border-b border-border border-t-4 !border-t-secondary bg-card hover:shadow-2xl hover:shadow-secondary/20 hover:-translate-y-2.5";
    }
  }

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
      {/* Top Floating Badge with Solid High Contrast Backgrounds */}
      {plan.tag && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <span
            className={`inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-black tracking-wide shadow-md transition-transform group-hover:scale-105 ${
              isRedHero
                ? "bg-primary text-primary-foreground"
                : isGreenHero
                ? "bg-secondary text-secondary-foreground"
                : "bg-muted text-foreground border border-border"
            }`}
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
            {/* Title stays 100% crisp and readable under any state */}
            <h3 className="font-black text-xl text-foreground tracking-tight">
              {plan.nameBangla}
            </h3>
            <p className="text-xs text-muted-foreground font-medium mt-0.5">
              {plan.nameEnglish}
            </p>
          </div>

          <div
            className={`size-6 rounded-full border flex items-center justify-center transition-all ${
              isSelected
                ? isGreenHero
                  ? "border-secondary bg-secondary text-secondary-foreground shadow-sm scale-110"
                  : "border-primary bg-primary text-primary-foreground shadow-sm scale-110"
                : "border-muted-foreground/30 bg-muted/30 group-hover:border-primary/60"
            }`}
          >
            {isSelected && <Check className="size-3.5 stroke-[3]" />}
          </div>
        </div>

        {/* Pricing Area with Solid, Clear Colors */}
        <div className="py-3.5 border-y border-border space-y-1">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`text-3xl sm:text-4xl font-black tracking-tight ${
                isRedHero
                  ? "text-primary"
                  : isGreenHero
                  ? "text-secondary"
                  : "text-foreground"
              }`}
            >
              ৳{toBengaliNumber(plan.amount)}
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              / এককালীন
            </span>
          </div>
          <div
            className={`text-xs font-bold flex items-center gap-1.5 pt-0.5 ${
              isGreenHero ? "text-secondary" : isRedHero ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Zap className="size-3.5 shrink-0" />
            <span>মোট {toBengaliNumber(plan.totalPosters)}টি পোস্টার তৈরির সুযোগ</span>
          </div>
        </div>

        {/* Distinct Tier Highlights */}
        {isGreenHero && (
          <div className="rounded-xl bg-secondary/10 border border-secondary/25 px-3 py-1.5 text-xs font-bold text-secondary flex items-center gap-1.5">
            <span>⚡ সেরা ডিল: প্রতি পোস্টার খরচ মাত্র ৮০ পয়সা!</span>
          </div>
        )}

        {/* Bonus Highlight Box with High Contrast */}
        {plan.bonusText && (
          <div
            className={`rounded-xl border p-2.5 text-xs flex items-center gap-2 shadow-2xs font-bold ${
              isGreenHero
                ? "bg-secondary/15 border-secondary/30 text-secondary"
                : isRedHero
                ? "bg-accent border-primary/20 text-accent-foreground"
                : "bg-muted border-border text-foreground"
            }`}
          >
            <Gift className="size-4 shrink-0" />
            <span className="leading-tight">{plan.bonusText}</span>
          </div>
        )}

        {/* Features Checklist with High-Contrast Text */}
        <ul className="space-y-2.5 text-xs sm:text-sm pt-1">
          {plan.features.map((feat, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <CheckCircle2
                className={`size-4 shrink-0 mt-0.5 ${
                  isGreenHero ? "text-secondary" : "text-primary"
                }`}
              />
              <span className="leading-snug text-foreground font-semibold">{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card Action Bottom */}
      <div className="pt-6 mt-4 border-t border-border">
        {isSelected ? (
          <Button
            className={`w-full font-bold rounded-xl transition-all h-10 shadow-md ${
              isGreenHero ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          >
            প্যাকেজটি নির্বাচিত
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full font-bold rounded-xl transition-all h-10 hover:border-primary/60 hover:bg-accent/40"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          >
            প্যাকেজটি বেছে নিন
          </Button>
        )}
      </div>
    </Card>
  );
}
