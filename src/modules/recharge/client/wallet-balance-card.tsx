"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Wallet, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/get-user-data";
import { fetchWalletBalance, type WalletBalanceData } from "../recharge.service";
import { toBengaliNumber } from "../utils";
import { TRUST_BADGES } from "../data/recharge.data";
import type { TrustBadgeItem } from "../types";

interface WalletBalanceCardProps {
  trustBadges?: TrustBadgeItem[];
  refreshTrigger?: number | string | null;
  onRechargeClick?: () => void;
}

export function WalletBalanceCard({
  trustBadges = TRUST_BADGES,
  refreshTrigger,
  onRechargeClick,
}: WalletBalanceCardProps) {
  const { user, loading: authLoading } = useAuth();
  const [balance, setBalance] = useState<WalletBalanceData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRechargeAction = useCallback(() => {
    if (onRechargeClick) {
      onRechargeClick();
      return;
    }
    const inputElem = document.querySelector<HTMLInputElement>(
      'input[inputmode="numeric"]'
    );
    if (inputElem) {
      inputElem.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => inputElem.focus(), 300);
    } else {
      const section = document.getElementById("custom-recharge-heading");
      section?.scrollIntoView({ behavior: "smooth" });
    }
  }, [onRechargeClick]);

  const loadBalance = useCallback(async () => {
    if (!user) return;
    try {
      setIsRefreshing(true);
      const data = await fetchWalletBalance();
      if (data) {
        setBalance(data);
      }
    } catch (err) {
      console.error("Error loading wallet balance:", err);
    } finally {
      setIsRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    let active = true;
    if (!authLoading && user) {
      fetchWalletBalance()
        .then((data) => {
          if (active && data) {
            setBalance(data);
          }
        })
        .catch((err) => {
          console.error("Error fetching balance:", err);
        });
    }
    return () => {
      active = false;
    };
  }, [authLoading, user, refreshTrigger]);

  const loading = authLoading || (Boolean(user) && balance === null);

  return (
    <Card
      aria-label="Wallet balance and security"
      className="rounded-2xl sm:rounded-3xl border-border bg-card p-4 sm:p-6 shadow-sm flex flex-row items-center justify-between gap-3 sm:gap-6 w-full"
    >
      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
        <div className="size-11 sm:size-14 rounded-xl sm:rounded-2xl bg-secondary/15 flex items-center justify-center text-secondary shadow-inner shrink-0 border border-secondary/20">
          <Wallet className="size-5 sm:size-7 shrink-0" />
        </div>
        <div className="min-w-0">
          <div className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-muted-foreground truncate">
            <span>বর্তমান ওয়ালেট ব্যালেন্স</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="text-xl sm:text-3xl font-black text-secondary whitespace-nowrap tracking-tight">
              {loading ? (
                <span className="text-muted-foreground animate-pulse text-base sm:text-lg font-medium">
                  লোড হচ্ছে...
                </span>
              ) : user ? (
                <span>
                  ৳ {toBengaliNumber((balance?.moneyBalance ?? 0).toFixed(2))}
                </span>
              ) : (
                <span>৳ ০.০০</span>
              )}
            </div>
            {user && (
              <button
                type="button"
                onClick={loadBalance}
                title="ব্যালেন্স রিফ্রেশ করুন"
                aria-label="ব্যালেন্স রিফ্রেশ করুন"
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors shrink-0 cursor-pointer"
              >
                <RefreshCw
                  className={`size-3.5 sm:size-4 ${isRefreshing ? "animate-spin text-secondary" : ""}`}
                />
              </button>
            )}
          </div>
          <div className="text-xs sm:text-sm font-semibold text-muted-foreground mt-0.5 truncate">
            {user ? (
              <span className="text-foreground/90 font-bold">
                ({toBengaliNumber(balance?.credits ?? 0)}টি পোস্টার ক্রেডিট)
              </span>
            ) : (
              <span className="text-xs font-semibold text-muted-foreground">
                (লগইন করুন)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Only: Compact "রিচার্জ করুন" Button (No Plus Icon, Green Gradient) */}
      <button
        type="button"
        onClick={handleRechargeAction}
        title="কাস্টম রিচার্জে যান"
        aria-label="কাস্টম রিচার্জে যান"
        className="md:hidden inline-flex items-center justify-center px-3.5 py-2 rounded-xl bg-gradient-green text-white text-xs font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer whitespace-nowrap"
      >
        <span>রিচার্জ করুন</span>
      </button>

      {/* Desktop Only: Trust Badges (No Button on Desktop) */}
      <div className="hidden md:flex items-center gap-2.5 shrink-0">
        {trustBadges.map((badge) => {
          const Icon = badge.icon;
          return (
            <Badge
              key={badge.id}
              variant="outline"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted text-xs font-semibold text-foreground border-border/60"
            >
              <Icon className={`size-3.5 ${badge.iconColor} shrink-0`} />
              <span>{badge.label}</span>
            </Badge>
          );
        })}
      </div>
    </Card>
  );
}
