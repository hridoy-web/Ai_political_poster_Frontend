import { Wallet, Image as ImageIcon, Bookmark, ArrowUpRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WalletSummary } from "../dashboard.types";

interface WalletStatCardsProps {
  stats: WalletSummary & { credits?: number };
}

export function WalletStatCards({ stats }: WalletStatCardsProps) {
  const credits = stats.credits ?? 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
      {/* 1. Wallet Balance Card */}
      <Card className="border-none bg-gradient-brand text-white shadow-xl shadow-brand-primary/10 relative overflow-hidden">
        <div className="absolute right-[-10%] top-[-20%] w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <CardContent className="p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
              ওয়ালেট ব্যালেন্স
            </span>
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
              <Wallet className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold">৳ {stats.balance.toFixed(2)}</h3>
            <p className="text-xs text-white/80 mt-1">ব্যবহারযোগ্য ওয়ালেট ব্যালেন্স</p>
          </div>
          <Link href="/recharge" className="w-full">
            <Button size="sm" className="w-full bg-white text-brand-primary hover:bg-white/90 font-bold border-none shadow-sm cursor-pointer">
              টপ-আপ করুন <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* 2. Poster Credit Card (1 Credit = 1 Poster Creation Ability) */}
      <Card className="border border-border/80 bg-card/60 backdrop-blur-md relative overflow-hidden">
        <div className="absolute right-[-10%] top-[-15%] w-24 h-24 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
        <CardContent className="p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              পোস্টার ক্রেডিট
            </span>
            <div className="p-2 rounded-xl bg-secondary/15 text-secondary">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-foreground">
              {credits} <span className="text-lg font-bold text-muted-foreground">টি</span>
            </h3>
            <p className="text-xs font-semibold text-secondary mt-1">
              ১ ক্রেডিট = ১টি পোস্টার তৈরির সুযোগ
            </p>
          </div>
          <Link href="/recharge" className="w-full">
            <Button variant="outline" size="sm" className="w-full border-border hover:bg-accent cursor-pointer">
              ক্রেডিট প্যাক দেখুন
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* 3. Generated Posters Counter Card */}
      <Card className="border border-border/80 bg-card/60 backdrop-blur-md">
        <CardContent className="p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              মোট তৈরি পোস্টার
            </span>
            <div className="p-2 rounded-xl bg-accent text-brand-primary">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-foreground">{stats.totalPosters} টি</h3>
            <p className="text-xs text-muted-foreground mt-1">আপনার তৈরি মোট পোস্টার</p>
          </div>
          <Link href="/dashboard/posters" className="w-full">
            <Button variant="outline" size="sm" className="w-full border-border hover:bg-accent cursor-pointer">
              সব পোস্টার দেখুন
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* 4. Bookmarked Templates Card */}
      <Card className="border border-border/80 bg-card/60 backdrop-blur-md">
        <CardContent className="p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              সংরক্ষিত টেমপ্লেট
            </span>
            <div className="p-2 rounded-xl bg-brand-green/10 text-brand-mint">
              <Bookmark className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-foreground">{stats.bookmarkedTemplates} টি</h3>
            <p className="text-xs text-muted-foreground mt-1">কুইক এডিটের জন্য সংরক্ষিত</p>
          </div>
          <Link href="/dashboard/saved" className="w-full">
            <Button variant="outline" size="sm" className="w-full border-border hover:bg-accent cursor-pointer">
              গ্যালারিতে যান
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
