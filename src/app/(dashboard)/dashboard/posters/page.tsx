"use client";

import { useEffect, useState } from "react";
import { UserPosterGrid } from "@/modules/dashboard/server/user-poster-grid";
import { UserPoster } from "@/modules/dashboard/dashboard.types";
import { DashboardService } from "@/modules/dashboard/dashboard.service";
import { Loader2, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MyPostersPage() {
  const [posters, setPosters] = useState<UserPoster[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserPosters() {
      try {
        const livePosters = await DashboardService.getMyPosters(1, 50);
        setPosters(livePosters);
      } catch (err) {
        console.error("Failed to load user posters from DB:", err);
      } finally {
        setLoading(false);
      }
    }
    loadUserPosters();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">মাই পোস্টার্স</h1>
          <p className="text-sm text-muted-foreground">
            আপনার পূর্বে তৈরি করা সমস্ত পোস্টার একনজরে দেখুন, পুনরায় এডিট বা ডাউনলোড করুন।
          </p>
        </div>
        <Button
          asChild
          className="bg-gradient-brand text-white font-semibold text-xs h-9 px-4 rounded-xl gap-2 shadow-sm self-start sm:self-auto"
        >
          <Link href="/create-poster">
            <Plus className="size-4" />
            <span>নতুন পোস্টার তৈরি</span>
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-16 text-muted-foreground gap-2 rounded-3xl border border-dashed border-border/80 bg-card/40">
          <Loader2 className="size-5 animate-spin text-brand-primary" />
          <span className="text-sm font-medium">আপনার তৈরি করা পোস্টারগুলো ডাটাবেজ থেকে লোড হচ্ছে...</span>
        </div>
      ) : posters.length > 0 ? (
        <UserPosterGrid posters={posters} />
      ) : (
        <div className="flex flex-col items-center justify-center p-14 text-center rounded-3xl border border-dashed border-border/80 bg-card/40 space-y-3">
          <div className="size-14 rounded-2xl bg-muted/60 flex items-center justify-center text-muted-foreground">
            <Sparkles className="size-7 text-brand-primary" />
          </div>
          <h3 className="text-base font-semibold text-foreground">এখনো কোনো পোস্টার তৈরি করা হয়নি</h3>
          <p className="text-xs text-muted-foreground max-w-sm">
            পোস্টার ক্রিয়েটর স্টুডিওতে যান এবং এআই স্লোগান ও ব্যাকগ্রাউন্ড রিমুভার ব্যবহার করে আকর্ষণীয় রাজনৈতিক পোস্টার তৈরি করুন।
          </p>
          <Button asChild size="sm" className="bg-gradient-brand text-white font-semibold text-xs rounded-xl">
            <Link href="/create-poster">পোস্টার তৈরি শুরু করুন</Link>
          </Button>
        </div>
      )}
    </div>
  );
}