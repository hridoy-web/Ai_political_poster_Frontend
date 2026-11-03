import React, { Suspense } from "react";
import { AdminStatsCards } from "@/modules/admin/server/admin-stats-cards";
import { AdminOverviewCharts } from "@/modules/admin/client/admin-overview-charts";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "অ্যাডমিন ওভারভিউ - PosterAI Admin",
};

export const instant = false;

function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-24 w-full rounded-2xl" />
      ))}
    </div>
  );
}

function ChartsSkeleton() {
  return <Skeleton className="h-[380px] w-full rounded-2xl" />;
}

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">অ্যাডমিন ওভারভিউ</h1>
        <p className="text-sm text-muted-foreground">
          প্ল্যাটফর্মের সার্বিক পরিসংখ্যান, ইউজার গ্রোথ ও রেভিনিউ রিপোর্ট।
        </p>
      </div>

      <Suspense fallback={<StatsCardsSkeleton />}>
        <AdminStatsCards />
      </Suspense>

      <Suspense fallback={<ChartsSkeleton />}>
        <AdminOverviewCharts />
      </Suspense>
    </div>
  );
}
