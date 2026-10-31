"use client";

import { useEffect, useState } from "react";
import { BookmarkedTemplatesGrid } from "@/modules/dashboard/server/bookmarked-templates-grid";
import { Template } from "@/modules/dashboard/dashboard.types";
import { DashboardService } from "@/modules/dashboard/dashboard.service";
import { Bookmark, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SavedTemplatesPage() {
  const [savedTemplates, setSavedTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBookmarks() {
      try {
        const bookmarks = await DashboardService.getMyBookmarks();
        setSavedTemplates(bookmarks);
      } catch (err) {
        console.error("Failed to load saved templates from DB:", err);
      } finally {
        setLoading(false);
      }
    }
    loadBookmarks();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">সংরক্ষিত টেমপ্লেট</h1>
          <p className="text-sm text-muted-foreground">
            আপনার সংরক্ষিত পছন্দের ফ্রেমগুলো থেকে এক ক্লিকে নতুন পোস্টার তৈরি শুরু করুন।
          </p>
        </div>
        <Button
          asChild
          variant="outline"
          className="text-xs h-9 px-4 rounded-xl gap-2 self-start sm:self-auto"
        >
          <Link href="/templates">
            <Sparkles className="size-3.5 text-brand-primary" />
            <span>সকল টেমপ্লেট এক্সপ্লোর করুন</span>
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-16 text-muted-foreground gap-2 rounded-3xl border border-dashed border-border/80 bg-card/40">
          <Loader2 className="size-5 animate-spin text-brand-primary" />
          <span className="text-sm font-medium">আপনার সংরক্ষিত টেমপ্লেটগুলো লোড হচ্ছে...</span>
        </div>
      ) : savedTemplates.length > 0 ? (
        <BookmarkedTemplatesGrid templates={savedTemplates} />
      ) : (
        <div className="flex flex-col items-center justify-center p-14 text-center rounded-3xl border border-dashed border-border/80 bg-card/40 space-y-3">
          <div className="size-14 rounded-2xl bg-muted/60 flex items-center justify-center text-muted-foreground">
            <Bookmark className="size-7 text-brand-mint" />
          </div>
          <h3 className="text-base font-semibold text-foreground">কোনো টেমপ্লেট বুকমার্ক করা নেই</h3>
          <p className="text-xs text-muted-foreground max-w-sm">
            টেমপ্লেট গ্যালারিতে গিয়ে আপনার পছন্দের রাজনৈতিক পোস্টার বা ব্যানার ফ্রেমগুলোর হার্ট আইকনে ক্লিক করে সহজেই এখানে সংরক্ষণ করুন।
          </p>
          <Button asChild size="sm" className="bg-gradient-brand text-white font-semibold text-xs rounded-xl">
            <Link href="/templates">টেমপ্লেট গ্যালারি দেখুন</Link>
          </Button>
        </div>
      )}
    </div>
  );
}