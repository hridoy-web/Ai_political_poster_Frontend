"use client";

import { useAuth } from "@/hooks/get-user-data";

export function DashboardHeader() {
  const { user } = useAuth();
  const displayName = user?.name || "সম্মানিত ব্যবহারকারী";

  return (
    <div className="space-y-1 pt-6 lg:pt-0">
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
        স্বাগতম, <span className="text-gradient-brand">{displayName}</span> 👋
      </h1>
      <p className="text-sm text-muted-foreground">
        আপনার অ্যাকাউন্ট ওয়ালেট ব্যালেন্স ও পোস্টার তৈরির সামারি একনজরে দেখে নিন।
      </p>
    </div>
  );
}
