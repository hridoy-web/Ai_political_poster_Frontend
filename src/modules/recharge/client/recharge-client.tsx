"use client";

import React, { useState, useId, useMemo, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Zap,
  Flame,
  Info,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  X,
  AlertTriangle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "cn";
import { useAuth } from "@/hooks/get-user-data";
import {
  initiateRechargePayment,
  fetchPackagesFromApi,
  purchasePackageFromWallet,
  fetchWalletBalance,
} from "../recharge.service";

import type { PackagePlan } from "../types";
import {
  toBengaliNumber,
  toEnglishNumber,
  calculatePosterBenefits,
  getUpsellTip,
} from "../utils";
import { TRUST_BADGES } from "../data/recharge.data";
import { PackageCard } from "./package-card";
import { RechargeSummary } from "./recharge-summary";
import { WalletBalanceCard } from "./wallet-balance-card";
import { GuestAuthModal } from "./guest-auth-modal";
import { toast } from "sonner";
import type { TrustBadgeItem } from "../types";

export type { PackagePlan } from "../types";
export { toBengaliNumber, toEnglishNumber } from "../utils";

interface RechargeClientProps {
  presetPackages: PackagePlan[];
  quickAmounts: number[];
  trustBadges?: TrustBadgeItem[];
}

/** Modal shown when the user has insufficient wallet balance to buy a package. */
function InsufficientFundsModal({
  isOpen,
  onClose,
  required,
  available,
  packageName,
}: {
  isOpen: boolean;
  onClose: () => void;
  required: number;
  available: number;
  packageName: string;
}) {
  const shortfall = Math.max(0, required - available);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card border border-border rounded-3xl shadow-2xl p-6 max-w-sm w-full space-y-4 animate-in fade-in zoom-in-95">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="বন্ধ করুন"
        >
          <X className="size-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="size-12 rounded-2xl bg-amber-500/15 flex items-center justify-center">
            <AlertTriangle className="size-6 text-amber-500" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">অপর্যাপ্ত ব্যালেন্স</h3>
            <p className="text-xs text-muted-foreground">
              এই প্যাকেজটি কিনতে পারবেন না
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-muted/50 border border-border p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">প্যাকেজ</span>
            <span className="font-semibold">{packageName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">প্যাকেজের মূল্য</span>
            <span className="font-bold text-foreground">৳{required.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">আপনার ব্যালেন্স</span>
            <span className="font-bold text-destructive">৳{available.toFixed(2)}</span>
          </div>
          <hr className="border-border" />
          <div className="flex justify-between">
            <span className="font-semibold text-foreground">আরও রিচার্জ করুন</span>
            <span className="font-black text-amber-500">
              ৳{shortfall.toFixed(2)}
            </span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          নিচের কাস্টম রিচার্জ বক্সে কমপক্ষে{" "}
          <strong className="text-foreground">৳{shortfall.toFixed(2)}</strong>{" "}
          রিচার্জ করুন তারপর প্যাকেজটি কিনুন।
        </p>

        <Button
          onClick={onClose}
          className="w-full bg-gradient-brand text-white font-bold rounded-xl"
        >
          ঠিক আছে, রিচার্জ করব
        </Button>
      </div>
    </div>
  );
}

export function RechargeClient({
  presetPackages,
  quickAmounts,
  trustBadges,
}: RechargeClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const inputId = useId();

  const [packages, setPackages] = useState<PackagePlan[]>(presetPackages);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("campaign");
  const [displayAmount, setDisplayAmount] = useState<string>("৫০");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [insufficientFundsModal, setInsufficientFundsModal] = useState<{
    open: boolean;
    required: number;
    available: number;
    packageName: string;
  }>({ open: false, required: 0, available: 0, packageName: "" });
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [balanceRefreshKey, setBalanceRefreshKey] = useState(0);

  const paymentStatus = searchParams?.get("status");
  const [isStatusDismissed, setIsStatusDismissed] = useState(false);
  const statusBanner = isStatusDismissed ? null : paymentStatus;

  // Fetch live packages
  useEffect(() => {
    let isMounted = true;
    fetchPackagesFromApi().then((live) => {
      if (isMounted && live && live.length > 0) setPackages(live);
    });
    return () => { isMounted = false; };
  }, []);

  // Fetch wallet balance for package affordability check
  useEffect(() => {
    if (!user) return;
    fetchWalletBalance().then((data) => {
      if (data) setWalletBalance(data.moneyBalance);
    });
  }, [user, balanceRefreshKey]);

  // Clean URL status param
  useEffect(() => {
    if (paymentStatus) {
      try {
        const url = new URL(window.location.href);
        url.searchParams.delete("status");
        window.history.replaceState(null, "", url.pathname + (url.search || ""));
      } catch (err) {
        console.error("Failed to clean up URL query status:", err);
      }
    }
  }, [paymentStatus]);

  const currentAmount = useMemo(
    () => parseInt(toEnglishNumber(displayAmount), 10) || 0,
    [displayAmount]
  );
  const isMinimumValid = currentAmount >= 20;

  const benefits = useMemo(() => calculatePosterBenefits(currentAmount), [currentAmount]);
  const upsellTip = useMemo(() => getUpsellTip(currentAmount), [currentAmount]);

  const selectedPlanTitle = useMemo(() => {
    const matched = packages.find((p) => p.id === selectedPlanId);
    return matched?.nameBangla || "কাস্টম রিচার্জ";
  }, [packages, selectedPlanId]);

  const handleSelectPlan = useCallback((plan: PackagePlan) => {
    setSelectedPlanId(plan.id);
    setDisplayAmount(toBengaliNumber(plan.amount));
  }, []);

  const handleAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const cleaned = e.target.value.replace(/[^0-9০-৯]/g, "");
      if (!cleaned) { setDisplayAmount(""); setSelectedPlanId(""); return; }
      const bengali = toBengaliNumber(cleaned);
      setDisplayAmount(bengali);
      const num = parseInt(toEnglishNumber(bengali), 10);
      if (!isNaN(num)) {
        const matched = packages.find((p) => p.amount === num);
        setSelectedPlanId(matched ? matched.id : "custom");
      }
    },
    [packages]
  );

  const handleQuickAmountSelect = useCallback(
    (amt: number) => {
      setDisplayAmount(toBengaliNumber(amt));
      const matched = packages.find((p) => p.amount === amt);
      setSelectedPlanId(matched ? matched.id : "custom");
    },
    [packages]
  );

  /** Handles custom recharge via SSLCommerz payment gateway */
  const handleProceedToPayment = useCallback(async () => {
    if (!user) { setIsAuthModalOpen(true); return; }
    if (!isMinimumValid || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      const response = await initiateRechargePayment({
        customAmount: currentAmount,
        packageId:
          selectedPlanId && selectedPlanId !== "custom" ? selectedPlanId : undefined,
      });

      if (response.success && response.data?.GatewayPageURL) {
        window.location.href = response.data.GatewayPageURL;
      } else {
        const msg = response.message || "পেমেন্ট গেটওয়েতে সংযোগ করতে সমস্যা হচ্ছে।";
        setErrorMessage(msg);
        toast.error(msg);
      }
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } }; message?: string };
      const msg = errorObj.response?.data?.message || errorObj.message || "পেমেন্ট সেশন শুরু করতে সমস্যা হয়েছে।";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  }, [isMinimumValid, isSubmitting, user, currentAmount, selectedPlanId]);

  /** Handles package purchase by deducting from wallet balance */
  const handleBuyPackage = useCallback(
    async (plan: PackagePlan) => {
      setSelectedPlanId(plan.id);
      setDisplayAmount(toBengaliNumber(plan.amount));

      if (!user) { setIsAuthModalOpen(true); return; }

      // Check if user has sufficient balance
      if (walletBalance < plan.amount) {
        setInsufficientFundsModal({
          open: true,
          required: plan.amount,
          available: walletBalance,
          packageName: plan.nameBangla,
        });
        return;
      }

      try {
        setIsSubmitting(true);
        setErrorMessage(null);
        const response = await purchasePackageFromWallet(plan.id);

        if (response.success) {
          toast.success(`${plan.nameBangla} সফলভাবে কেনা হয়েছে! ${response.data.creditsGranted}টি পোস্টার ক্রেডিট যোগ হয়েছে।`);
          setBalanceRefreshKey((k) => k + 1);
        } else {
          const msg = response.message || "প্যাকেজ কিনতে সমস্যা হয়েছে।";
          setErrorMessage(msg);
          toast.error(msg);
        }
      } catch (err: unknown) {
        const errorObj = err as { response?: { data?: { message?: string } }; message?: string };
        const msg = errorObj.response?.data?.message || errorObj.message || "প্যাকেজ কিনতে সমস্যা হয়েছে।";
        setErrorMessage(msg);
        toast.error(msg);
      } finally {
        setIsSubmitting(false);
      }
    },
    [user, walletBalance]
  );

  return (
    <div className="space-y-12">
      {/* Live Wallet Balance Card */}
      <WalletBalanceCard
        trustBadges={trustBadges || TRUST_BADGES}
        refreshTrigger={`${paymentStatus || statusBanner}-${balanceRefreshKey}`}
      />

      {/* Payment Feedback Banners */}
      {statusBanner === "success" && (
        <div className="rounded-2xl bg-emerald-500/15 border border-emerald-500/30 p-4 text-sm text-foreground flex items-center justify-between gap-3 shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="size-5 text-emerald-500 shrink-0" />
            <div>
              <div className="font-bold text-emerald-600 dark:text-emerald-400">অভিনন্দন! আপনার রিচার্জ সফল হয়েছে।</div>
              <div className="text-xs text-muted-foreground mt-0.5">আপনার ওয়ালেটে ক্রেডিট যোগ করা হয়েছে।</div>
            </div>
          </div>
          <button type="button" onClick={() => setIsStatusDismissed(true)} className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg transition-colors shrink-0" aria-label="বন্ধ করুন">
            <X className="size-4" />
          </button>
        </div>
      )}

      {statusBanner === "failed" && (
        <div className="rounded-2xl bg-destructive/15 border border-destructive/30 p-4 text-sm text-foreground flex items-center justify-between gap-3 shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <AlertCircle className="size-5 text-destructive shrink-0" />
            <div>
              <div className="font-bold text-destructive">পেমেন্ট সম্পন্ন হতে ব্যর্থ হয়েছে।</div>
              <div className="text-xs text-muted-foreground mt-0.5">অনুগ্রহ করে আবার চেষ্টা করুন।</div>
            </div>
          </div>
          <button type="button" onClick={() => setIsStatusDismissed(true)} className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg transition-colors shrink-0" aria-label="বন্ধ করুন">
            <X className="size-4" />
          </button>
        </div>
      )}

      {statusBanner === "cancelled" && (
        <div className="rounded-2xl bg-amber-500/15 border border-amber-500/30 p-4 text-sm text-foreground flex items-center justify-between gap-3 shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <Info className="size-5 text-amber-500 shrink-0" />
            <div>
              <div className="font-bold text-amber-600 dark:text-amber-400">পেমেন্ট প্রক্রিয়াটি বাতিল করা হয়েছে।</div>
              <div className="text-xs text-muted-foreground mt-0.5">আপনি চাইলে যেকোনো সময় পুনরায় রিচার্জ করতে পারেন।</div>
            </div>
          </div>
          <button type="button" onClick={() => setIsStatusDismissed(true)} className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg transition-colors shrink-0" aria-label="বন্ধ করুন">
            <X className="size-4" />
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="rounded-2xl bg-destructive/15 border border-destructive/30 p-4 text-sm text-destructive flex items-center gap-3 shadow-sm">
          <AlertCircle className="size-5 shrink-0" />
          <span className="font-semibold">{errorMessage}</span>
        </div>
      )}

      {/* Preset Packages */}
      <section aria-labelledby="pricing-plans-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border pb-4">
          <div>
            <h2 id="pricing-plans-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              জনপ্রিয় প্রি-সেট প্ল্যানসমূহ
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              প্যাকেজ কিনতে প্রথমে ওয়ালেটে রিচার্জ করুন, তারপর পছন্দের প্যাক নির্বাচন করুন
            </p>
          </div>
          <Badge
            variant="secondary"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-semibold self-start sm:self-auto shadow-xs border border-secondary/25 h-auto"
          >
            <Flame className="size-3.5 text-secondary" />
            <span>বড় প্যাকে অতিরিক্ত ফ্রি পোস্টার অন্তর্ভুক্ত</span>
          </Badge>
        </div>

        <div
          role="radiogroup"
          aria-label="জনপ্রিয় প্রি-সেট প্ল্যানসমূহ"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 items-stretch"
        >
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              plan={pkg}
              isSelected={selectedPlanId === pkg.id}
              onSelect={() => handleSelectPlan(pkg)}
              onBuy={() => handleBuyPackage(pkg)}
            />
          ))}
        </div>
      </section>

      {/* Custom Recharge Section */}
      <section
        aria-labelledby="custom-recharge-heading"
        className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-9 shadow-lg transition-all"
      >
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
            যেকোনো পরিমাণ টাকা (ন্যূনতম ২০ টাকা) ওয়ালেটে রিচার্জ করুন, তারপর প্যাকেজ কিনুন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <label
                htmlFor={inputId}
                className="text-xs sm:text-sm font-bold text-foreground flex items-center justify-between"
              >
                <span>রিচার্জের পরিমাণ লিখুন (টাকা)</span>
                <span className="text-xs font-semibold text-secondary">ন্যূনতম: ৳২০</span>
              </label>

              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 font-extrabold text-xl text-primary pointer-events-none select-none">
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

            {upsellTip && (
              <div className="rounded-2xl bg-secondary/15 border border-secondary/30 p-3.5 text-xs text-foreground flex items-center gap-2.5 shadow-xs">
                <TrendingUp className="size-4 text-secondary shrink-0" />
                <span className="font-semibold leading-relaxed">{upsellTip}</span>
              </div>
            )}
          </div>

          <RechargeSummary
            selectedPlanTitle={selectedPlanTitle}
            currentAmount={currentAmount}
            benefits={benefits}
            isMinimumValid={isMinimumValid}
            onProceed={handleProceedToPayment}
            isLoading={isSubmitting}
          />
        </div>
      </section>

      {/* Guest Registration Guard Modal */}
      <GuestAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        planTitle={selectedPlanTitle}
        amount={currentAmount}
      />

      {/* Insufficient Funds Modal */}
      <InsufficientFundsModal
        isOpen={insufficientFundsModal.open}
        onClose={() => setInsufficientFundsModal((s) => ({ ...s, open: false }))}
        required={insufficientFundsModal.required}
        available={insufficientFundsModal.available}
        packageName={insufficientFundsModal.packageName}
      />
    </div>
  );
}
