import React, { Suspense } from "react";
import { AdminStatsCards } from "@/modules/admin/server/admin-stats-cards";
import { AdminOverviewCharts } from "@/modules/admin/client/admin-overview-charts";

export const metadata = {
  title: "অ্যাডমিন ওভারভিউ - PosterAI Admin",
};

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">অ্যাডমিন ওভারভিউ</h1>
        <p className="text-sm text-muted-foreground">
          প্ল্যাটফর্মের সার্বিক পরিসংখ্যান, ইউজার গ্রোথ ও রেভিনিউ রিপোর্ট।
        </p>
      </div>

      <Suspense fallback={<div className="p-4 text-xs text-muted-foreground">লোডিং...</div>}>
        <AdminStatsCards />
      </Suspense>

      <Suspense fallback={<div className="p-4 text-xs text-muted-foreground">চার্ট লোড হচ্ছে...</div>}>
        <AdminOverviewCharts />
      </Suspense>
    </div>
  );
}