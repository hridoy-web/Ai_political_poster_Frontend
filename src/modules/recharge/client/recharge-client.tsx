"use client";

import React, { useState, useId, useMemo, useCallback } from "react";
import { Zap, Flame, Info, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "cn";

import type { PackagePlan } from "../types";
import {
  toBengaliNumber,
  toEnglishNumber,
  calculatePosterBenefits,
  getUpsellTip,
} from "../utils";
import { PAYMENT_GATEWAYS } from "../data/recharge.data";
import { PackageCard } from "./package-card";
import { RechargeSummary } from "./recharge-summary";
import { PaymentGatewaySelector } from "./payment-gateway-selector";

// Re-export types and utilities for 100% backward compatibility
export type { PackagePlan } from "../types";
export { toBengaliNumber, toEnglishNumber } from "../utils";

interface RechargeClientProps {
  presetPackages: PackagePlan[];
  quickAmounts: number[];
}

export function RechargeClient({ presetPackages, quickAmounts }: RechargeClientProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<string>("campaign");
  const [displayAmount, setDisplayAmount] = useState<string>("৫০");
  const [selectedPayment, setSelectedPayment] = useState<string>("bkash");
  const inputId = useId();

  // Numeric amount in English for calculations
  const currentAmount = useMemo(
    () => parseInt(toEnglishNumber(displayAmount), 10) || 0,
    [displayAmount]
  );
  const isMinimumValid = currentAmount >= 20;

  // Memoized benefits & upsell recommendations
  const benefits = useMemo(
    () => calculatePosterBenefits(currentAmount),
    [currentAmount]
  );
  const upsellTip = useMemo(
    () => getUpsellTip(currentAmount),
    [currentAmount]
  );

  const selectedPlanTitle = useMemo(() => {
    const matched = presetPackages.find((p) => p.id === selectedPlanId);
    return matched?.nameBangla || "কাস্টম রিচার্জ";
  }, [presetPackages, selectedPlanId]);

  // Handlers memoized with useCallback
  const handleSelectPlan = useCallback((plan: PackagePlan) => {
    setSelectedPlanId(plan.id);
    setDisplayAmount(toBengaliNumber(plan.amount));
  }, []);

  const handleAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    [presetPackages]
  );

  const handleQuickAmountSelect = useCallback(
    (amt: number) => {
      setDisplayAmount(toBengaliNumber(amt));
      const matched = presetPackages.find((p) => p.amount === amt);
      setSelectedPlanId(matched ? matched.id : "custom");
    },
    [presetPackages]
  );

  const handlePaymentSelect = useCallback((gatewayId: string) => {
    setSelectedPayment(gatewayId);
  }, []);

  return (
    <div className="space-y-12">
      {/* 3 Distinct Preset Packages */}
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

            {/* Quick Amount Selector Chips */}
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
                      onClick={() => handleQuickAmountSelect(amt)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer",
                        isActive
                          ? "bg-gradient-brand shadow-md scale-105"
                          : "bg-muted text-foreground border-border hover:border-primary/60 hover:bg-accent/40 hover:-translate-y-0.5"
                      )}
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

            {/* Payment Gateways */}
            <PaymentGatewaySelector
              gateways={PAYMENT_GATEWAYS}
              selectedPayment={selectedPayment}
              onSelectPayment={handlePaymentSelect}
            />
          </div>

          {/* Right Column: Live Summary Order Card */}
          <RechargeSummary
            selectedPlanTitle={selectedPlanTitle}
            currentAmount={currentAmount}
            benefits={benefits}
            isMinimumValid={isMinimumValid}
          />
        </div>
      </section>
    </div>
  );
}
