import React, { Suspense } from "react";
import { AdminTemplatesContent } from "@/modules/admin/server/admin-templates-content";
import { TemplateUploadModal } from "@/modules/admin/client/template-upload-modal";

export const metadata = {
  title: "টেমপ্লেট ম্যানেজার - PosterAI Admin",
};

interface AdminTemplatesPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default function AdminTemplatesPage({ searchParams }: AdminTemplatesPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">টেমপ্লেট ম্যানেজার</h1>
          <p className="text-sm text-muted-foreground">
            নতুন কাস্টম টেমপ্লেট আপলোড, ফিল্টার ও পরিচালনা করুন।
          </p>
        </div>
        <TemplateUploadModal />
      </div>

      <Suspense fallback={<div className="p-8 text-center text-sm text-muted-foreground">টেমপ্লেট ডাটা লোড হচ্ছে...</div>}>
        <AdminTemplatesContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}