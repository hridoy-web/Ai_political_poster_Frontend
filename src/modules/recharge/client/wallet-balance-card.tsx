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
  onBalanceLoaded?: (balance: WalletBalanceData) => void;
}

export function WalletBalanceCard({
  trustBadges = TRUST_BADGES,
  refreshTrigger,
}: WalletBalanceCardProps) {
  const { user, loading: authLoading } = useAuth();
  const [balance, setBalance] = useState<WalletBalanceData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

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
      className="rounded-3xl border-border bg-card p-6 sm:p-7 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
    >
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="size-14 rounded-2xl bg-secondary/15 flex items-center justify-center text-secondary shadow-inner shrink-0 border border-secondary/20">
          <Wallet className="size-7" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground flex items-center gap-2">
            <span>বর্তমান ওয়ালেট ব্যালেন্স</span>
            {user && (
              <button
                type="button"
                onClick={loadBalance}
                title="ব্যালেন্স রিফ্রেশ করুন"
                aria-label="ব্যালেন্স রিফ্রেশ করুন"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <RefreshCw
                  className={`size-3.5 ${isRefreshing ? "animate-spin text-secondary" : ""}`}
                />
              </button>
            )}
          </div>
          <div className="text-2xl sm:text-3xl font-black text-foreground flex items-baseline gap-2">
            {loading ? (
              <span className="text-muted-foreground animate-pulse text-lg font-medium">
                লোড হচ্ছে...
              </span>
            ) : user ? (
              <>
                <span className="text-secondary font-black">
                  ৳ {toBengaliNumber((balance?.moneyBalance ?? 0).toFixed(2))}
                </span>
                <span className="text-xs sm:text-sm font-bold text-foreground">
                  ({toBengaliNumber(balance?.credits ?? 0)}টি পোস্টার ক্রেডিট)
                </span>
              </>
            ) : (
              <>
                <span className="text-secondary font-black">৳ ০.০০</span>
                <span className="text-xs font-semibold text-muted-foreground">
                  (লগইন করুন)
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* DRY Trust Badges using shadcn Badge */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-border">
        {trustBadges.map((badge) => {
          const Icon = badge.icon;
          return (
            <Badge
              key={badge.id}
              variant="outline"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-muted text-xs font-semibold text-foreground border-border/60"
            >
              <Icon className={`size-4 ${badge.iconColor} shrink-0`} />
              <span>{badge.label}</span>
            </Badge>
          );
        })}
      </div>
    </Card>
  );
}
