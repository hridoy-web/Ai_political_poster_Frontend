"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/get-user-data";
import { ShieldAlert, ArrowLeft, Loader2, Sparkles, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminRoleGuardProps {
  children: React.ReactNode;
}

export function AdminRoleGuard({ children }: AdminRoleGuardProps) {
  const { user, loading, isTemplateManager, isAdmin } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect Template Managers away from super-admin-only sections (like users or transactions)
  useEffect(() => {
    if (!loading && user && isTemplateManager && !isAdmin) {
      if (
        pathname === "/admin" ||
        pathname.startsWith("/admin/users") ||
        pathname.startsWith("/admin/transactions") ||
        pathname.startsWith("/admin/posters")
      ) {
        router.replace("/admin/templates");
      }
    }
  }, [loading, user, isTemplateManager, isAdmin, pathname, router]);

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
          <p className="text-base font-bold text-foreground">অ্যাক্সেস পারমিশন যাচাই করা হচ্ছে...</p>
          <p className="text-xs text-muted-foreground">অনুগ্রহ করে কয়েক সেকেন্ড অপেক্ষা করুন</p>
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
            <ShieldAlert className="size-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              লগইন প্রয়োজন
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              টেমপ্লেট ম্যানেজার বা অ্যাডমিন প্যানেলে প্রবেশ করার জন্য আপনাকে অনুমোদিত অ্যাকাউন্টে লগইন করতে হবে।
            </p>
          </div>
          <div className="flex flex-col gap-2.5 pt-2">
            <Button
              asChild
              className="bg-gradient-brand text-white font-semibold rounded-2xl h-11 shadow-lg shadow-brand-primary/20 hover:opacity-90 gap-2"
            >
              <Link href={`/login?redirect=${encodeURIComponent(pathname)}`}>
                <LogIn className="size-4" /> লগইন পেজে যান
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-2xl h-10 text-xs">
              <Link href="/">
                <ArrowLeft className="size-3.5 mr-1" /> মূল ওয়েবসাইটে ফিরে যান
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // If user does not have TEMPLATE_MANAGER or ADMIN role
  if (!isTemplateManager) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-card/90 backdrop-blur-xl border border-destructive/20 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl">
          <div className="size-16 rounded-3xl bg-destructive/10 border border-destructive/20 text-destructive flex items-center justify-center mx-auto shadow-inner">
            <ShieldAlert className="size-8" />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
              অননুমোদিত অ্যাক্সেস (403 Forbidden)
            </span>
            <h2 className="text-xl font-bold tracking-tight text-foreground pt-1">
              শুধুমাত্র টেমপ্লেট ম্যানেজার ও অ্যাডমিনদের জন্য
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
              আপনার বর্তমান অ্যাকাউন্ট (<span className="text-foreground font-semibold">{user.email}</span>)-এ টেমপ্লেট ম্যানেজার বা সিস্টেম অ্যাডমিন রোল সক্রিয় নেই।
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Button asChild variant="outline" className="rounded-2xl h-10 text-xs gap-1.5 px-5">
              <Link href="/">
                <ArrowLeft className="size-3.5" /> হোমপেজে ফিরে যান
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Authorized: Render the children
  return <>{children}</>;
}
