import type { Metadata } from "next";
import { Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RechargeClient } from "@/modules/recharge/client/recharge-client";
import {
  PRESET_PACKAGES,
  QUICK_AMOUNTS,
  TRUST_BADGES,
  rechargeMetadata,
} from "@/modules/recharge/data/recharge.data";

export const metadata: Metadata = rechargeMetadata;

export default function WalletPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300">
      {/* Decorative Ambient Background Dual Glows (Crimson Red & Emerald Green from globals.css) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 w-96 sm:w-[500px] h-80 sm:h-[350px] bg-primary/10 rounded-full blur-3xl -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/4 w-96 sm:w-[500px] h-80 sm:h-[350px] bg-secondary/10 rounded-full blur-3xl -z-10"
      />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Page Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="px-4 py-1.5 rounded-full bg-accent border-border text-accent-foreground text-xs font-bold tracking-wider uppercase shadow-xs inline-flex items-center gap-2"
          >
            <span>কুইক ওয়ালেট রিচার্জ ও ক্রেডিট সিস্টেম</span>
          </Badge>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            সহজেই রিচার্জ করুন{" "}
            <span className="text-gradient-brand">পোস্টার ওয়ালেট</span>
          </h1>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            ব্যবহারকারী যেন নিজের ইচ্ছমতো যেকোনো পরিমাণ টাকা (ন্যূনতম ২০ টাকা) রিচার্জ করতে পারেন,
            তার জন্য কাস্টম অ্যামাউন্ট বক্সের পাশাপাশি রয়েছে জনপ্রিয় প্রি-সেট প্ল্যানসমূহ।
          </p>
        </header>

        {/* Current Balance & Trust Stats Bar using shadcn Card & Badge */}
        <Card
          aria-label="Wallet balance and security"
          className="rounded-3xl border-border bg-card p-6 sm:p-7 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="size-14 rounded-2xl bg-secondary/15 flex items-center justify-center text-secondary shadow-inner shrink-0 border border-secondary/20">
              <Wallet className="size-7" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                বর্তমান ওয়ালেট ব্যালেন্স
              </div>
              <div className="text-2xl sm:text-3xl font-black text-foreground flex items-baseline gap-2">
                <span className="text-secondary font-black">৳ ০.০০</span>
                <span className="text-xs font-semibold text-muted-foreground">
                  (০টি পোস্টার ক্রেডিট)
                </span>
              </div>
            </div>
          </div>

          {/* DRY Trust Badges using shadcn Badge */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-border">
            {TRUST_BADGES.map((badge) => {
              const Icon = badge.icon;
              return (
                <Badge
                  key={badge.id}
                  variant="outline"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-muted text-xs font-semibold text-foreground border-border/60"
                >
                  <Icon className={`size-4 ${badge.iconColor} shrink-0`} />
                  <span>{badge.label}</span>
                </Badge>
              );
            })}
          </div>
        </Card>

        {/* Client Interactive Section (Preset Packages + Custom Box + Calculation) */}
        <RechargeClient
          presetPackages={PRESET_PACKAGES}
          quickAmounts={QUICK_AMOUNTS}
        />
      </div>
    </div>
  );
}
