"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { TransactionHistoryTable } from "@/modules/dashboard/server/transaction-history-table";
import { TransactionHistory } from "@/modules/dashboard/dashboard.types";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, CalendarDays, TrendingUp, DollarSign, Loader2 } from "lucide-react";
import { AdminService, OverviewAnalyticsData } from "../admin.service";

interface AdminRevenueContentProps {
  searchParams?: Promise<{
    page?: string;
    search?: string;
  }>;
}

export function AdminRevenueContent({}: AdminRevenueContentProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get("page")) || 1;
  const searchTerm = searchParams?.get("search") || "";
  const itemsPerPage = 10;

  const [overview, setOverview] = useState<OverviewAnalyticsData | null>(null);
  const [transactions, setTransactions] = useState<TransactionHistory[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    AdminService.getOverviewAnalytics()
      .then((res) => {
        if (isMounted && res) setOverview(res);
      })
      .catch((err) => console.warn("Failed to load revenue overview:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    AdminService.getTransactions(currentPage, itemsPerPage, searchTerm)
      .then((data) => {
        if (isMounted) {
          setTransactions(data.transactions);
          setTotalCount(data.totalCount);
          setTotalPages(data.totalPages);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load admin transactions:", err);
        if (isMounted) {
          setTransactions([]);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [currentPage, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Timeframe Revenue Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Today's Income */}
        <Card className="border border-brand-primary/30 bg-card/80 backdrop-blur-xl rounded-3xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/10 rounded-full blur-2xl pointer-events-none" />
          <CardContent className="p-0 space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">
                আজকের আয় (Today)
              </span>
              <div className="p-2.5 rounded-2xl bg-brand-primary/10 text-brand-primary">
                <CalendarDays className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                ৳ {(overview?.todayRevenue || 0).toFixed(2)}
              </h3>
              <p className="text-[11px] text-brand-mint font-semibold mt-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> আজ সংগৃহীত ওয়ালেট টপ-আপ
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Current Month Income */}
        <Card className="border border-border/80 bg-card/80 backdrop-blur-xl rounded-3xl p-5 shadow-xs">
          <CardContent className="p-0 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">
                চলতি মাসের আয় (Monthly)
              </span>
              <div className="p-2.5 rounded-2xl bg-brand-mint/10 text-brand-mint">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                ৳ {(overview?.monthRevenue || 0).toFixed(2)}
              </h3>
              <p className="text-[11px] text-muted-foreground font-medium mt-1">
                এই মাসের মোট জমা
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Lifetime Total Income */}
        <Card className="border border-border/80 bg-card/80 backdrop-blur-xl rounded-3xl p-5 shadow-xs">
          <CardContent className="p-0 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">
                সর্বমোট আয় (Lifetime)
              </span>
              <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-500">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                ৳ {(overview?.totalRevenue || 0).toFixed(2)}
              </h3>
              <p className="text-[11px] text-muted-foreground font-medium mt-1">
                প্ল্যাটফর্মের শুরু থেকে
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Ledger Table */}
      {loading ? (
        <div className="p-16 text-center flex flex-col items-center justify-center gap-3 bg-card/50 rounded-2xl border border-dashed border-border">
          <Loader2 className="w-6 h-6 animate-spin text-brand-primary" />
          <p className="text-xs text-muted-foreground">ট্রানজেকশন তালিকা লোড হচ্ছে...</p>
        </div>
      ) : (
        <TransactionHistoryTable
          transactions={transactions}
          totalCount={totalCount}
          currentPage={currentPage}
          totalPages={totalPages}
          searchTerm={searchTerm}
        />
      )}
    </div>
  );
}