import React, { Suspense } from "react";
import { AdminPostersContent } from "@/modules/admin/server/admin-posters-content";

export const metadata = {
  title: "পোস্টার মডারেশন - PosterAI Admin",
};

interface AdminPostersPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default function AdminPostersPage({ searchParams }: AdminPostersPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">পোস্টার মডারেশন</h1>
        <p className="text-sm text-muted-foreground">
          ইউজারদের লাইভ পোস্টার মনিটরিং, ফিল্টারিং ও প্রিভিউ করুন।
        </p>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-sm text-muted-foreground">পোস্টার ডাটা লোড হচ্ছে...</div>}>
        <AdminPostersContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}