"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function TemplateUploadModal() {
  return (
    <Button
      asChild
      className="bg-gradient-brand text-white font-semibold rounded-2xl h-11 px-5 shadow-lg shadow-brand-primary/20 hover:opacity-90 gap-2 text-xs sm:text-sm"
    >
      <Link href="/admin/templates/create">
        <Plus className="size-4" /> নতুন ক্যানভাস টেমপ্লেট ডিজাইন করুন
      </Link>
    </Button>
  );
}