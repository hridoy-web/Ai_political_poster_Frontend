import React, { Suspense } from "react";
import { TransactionHistoryContent } from "@/modules/dashboard/server/transaction-history-content";

export const metadata = {
  title: "ট্রানজেকশন হিস্ট্রি - PosterAI",
};

interface HistoryPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default function HistoryPage({ searchParams }: HistoryPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          ট্রানজেকশন ও রিচার্জ হিস্ট্রি
        </h1>
        <p className="text-sm text-muted-foreground">
          আপনার ওয়ালেট টপ-আপ এবং পেমেন্টের সমস্ত বিবরণ ফিল্টার ও সার্চ করুন।
        </p>
      </div>

      <Suspense
        fallback={
          <div className="p-8 text-center text-sm text-muted-foreground">
            ট্রানজেকশন তথ্য লোড হচ্ছে...
          </div>
        }
      >
        <TransactionHistoryContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}