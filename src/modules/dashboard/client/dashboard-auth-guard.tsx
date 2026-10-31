"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/get-user-data";
import { Lock, ArrowLeft, Loader2, Sparkles, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardAuthGuardProps {
  children: React.ReactNode;
}

export function DashboardAuthGuard({ children }: DashboardAuthGuardProps) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to login if unauthenticated after auth check finishes
  useEffect(() => {
    if (mounted && !loading && !user) {
      const timer = setTimeout(() => {
        router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [mounted, loading, user, pathname, router]);

  if (!mounted || loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
        <div className="relative">
          <div className="size-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary animate-pulse">
            <Sparkles className="size-7" />
          </div>
          <Loader2 className="size-5 text-brand-primary animate-spin absolute -bottom-1 -right-1" />
        </div>
        <div className="space-y-1">
          <p className="text-base font-bold text-foreground">ব্যবহারকারী তথ্য যাচাই করা হচ্ছে...</p>
          <p className="text-xs text-muted-foreground">অনুগ্রহ করে কয়েক সেকেন্ড অপেক্ষা করুন</p>
        </div>
      </div>
    );
  }

  // If user is not logged in
  if (!user) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card/90 backdrop-blur-xl border border-border/80 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="size-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="size-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-foreground font-heading">
              লগইন প্রয়োজন
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              ড্যাশবোর্ড ও আপনার অ্যাকাউন্ট সেটিংস দেখতে অনুগ্রহ করে আপনার অ্যাকাউন্টে লগইন করুন। আপনাকে স্বয়ংক্রিয়ভাবে লগইন পেইজে নিয়ে যাওয়া হচ্ছে...
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              className="flex-1 bg-gradient-brand hover:opacity-90 text-white rounded-xl h-11 font-medium shadow-md transition-all cursor-pointer"
            >
              <Link href={`/login?redirect=${encodeURIComponent(pathname)}`}>
                <LogIn className="size-4 mr-2" /> লগইন করুন
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-xl h-11 border-border/80 hover:bg-muted/50 cursor-pointer"
            >
              <Link href="/">
                <ArrowLeft className="size-4 mr-2" /> হোম পেজ
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
