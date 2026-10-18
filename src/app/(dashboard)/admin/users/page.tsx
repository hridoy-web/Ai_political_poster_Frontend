import React, { Suspense } from "react";
import { AdminUsersContent } from "@/modules/admin/server/admin-users-content";

export const metadata = {
  title: "ইউজার লিস্ট - PosterAI Admin",
};

interface AdminUsersPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default function AdminUsersPage({ searchParams }: AdminUsersPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">ইউজার ম্যানেজমেন্ট</h1>
        <p className="text-sm text-muted-foreground">
          নিবন্ধিত সকল ইউজারের তালিকা, ব্যালেন্স ট্র্যাকিং ও মডারেশন।
        </p>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-sm text-muted-foreground">ইউজার ডাটা লোড হচ্ছে...</div>}>
        <AdminUsersContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}