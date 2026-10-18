import React, { Suspense } from "react";
import { AdminRevenueContent } from "@/modules/admin/server/admin-revenue-content";

export const metadata = {
  title: "ট্রানজেকশনসমূহ - PosterAI Admin",
};

interface TransactionPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default function AdminTransactionPage({ searchParams }: TransactionPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">ট্রানজেকশনসমূহ ও রিচার্জ হিস্ট্রি</h1>
        <p className="text-sm text-muted-foreground">
          সমগ্র সিস্টেমের ওয়ালেট রিচার্জ ও পেমেন্টের বিবরণ ফিল্টার ও সার্চ করুন।
        </p>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-sm text-muted-foreground">ট্রানজেকশন ডাটা লোড হচ্ছে...</div>}>
        <AdminRevenueContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}