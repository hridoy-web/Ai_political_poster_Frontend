"use client";

import { useEffect, useState } from "react";
import { WalletStatCards } from "@/modules/dashboard/server/wallet-stat-cards";
import { DashboardHeader } from "@/modules/dashboard/client/dashboard-header";
import { DashboardService, type DashboardOverview } from "@/modules/dashboard/dashboard.service";
import { Loader2 } from "lucide-react";

export default function DashboardOverviewPage() {
  const [stats, setStats] = useState<DashboardOverview>({
    balance: 0,
    credits: 0,
    currency: "BDT",
    totalPosters: 0,
    bookmarkedTemplates: 0,
    activeSubscription: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const liveStats = await DashboardService.getDashboardOverviewStats();
        setStats(liveStats);
      } catch (err) {
        console.error("Failed to load dashboard live stats:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <DashboardHeader />

      {/* Real Database Wallet & Stats Section */}
      {loading ? (
        <div className="flex items-center justify-center p-12 text-muted-foreground gap-2 rounded-2xl border border-dashed border-border/70 bg-card/40">
          <Loader2 className="size-5 animate-spin text-brand-primary" />
          <span className="text-sm font-medium">ওয়ালেট ব্যালেন্স ও পোস্টার হিস্ট্রি লোড হচ্ছে...</span>
        </div>
      ) : (
        <WalletStatCards stats={stats} />
      )}
    </div>
  );
}
