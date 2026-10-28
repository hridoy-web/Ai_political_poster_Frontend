import React, { Suspense } from "react";
import { AdminTemplatesContent } from "@/modules/admin/server/admin-templates-content";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles, Layers } from "lucide-react";

export const metadata = {
  title: "টেমপ্লেট ম্যানেজার - PosterAI",
};

export const instant = false;

interface AdminTemplatesPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default function AdminTemplatesPage({ searchParams }: AdminTemplatesPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Layers className="size-6 text-brand-primary" />
            <span>টেমপ্লেট ম্যানেজার</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            HTML5 Canvas 2D কাস্টম পোস্টার ফ্রেম ও স্লট পরিচালনা করুন।
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button
            asChild
            className="bg-gradient-brand text-white font-semibold rounded-2xl h-11 px-5 shadow-lg shadow-brand-primary/20 hover:opacity-90 gap-2 text-xs sm:text-sm"
          >
            <Link href="/admin/templates/create">
              <Plus className="size-4" /> নতুন ক্যানভাস টেমপ্লেট ডিজাইন করুন
            </Link>
          </Button>
        </div>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-sm text-muted-foreground">টেমপ্লেট ডাটা লোড হচ্ছে...</div>}>
        <AdminTemplatesContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}