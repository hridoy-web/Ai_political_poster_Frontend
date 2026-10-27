"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  LogIn,
  UserPlus,
  Sparkles,
  Zap,
  Lock,
  ArrowRight,
} from "lucide-react";
import { toBengaliNumber } from "../utils";

interface GuestAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  planTitle?: string;
  amount?: number;
}

export function GuestAuthModal({
  isOpen,
  onClose,
  planTitle,
  amount,
}: GuestAuthModalProps) {
  const router = useRouter();

  const handleLogin = () => {
    onClose();
    router.push("/login?redirect=/recharge");
  };

  const handleRegister = () => {
    onClose();
    router.push("/register?redirect=/recharge");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-border/80 bg-card/95 backdrop-blur-xl shadow-2xl rounded-3xl">
        {/* Decorative Top Accent Glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary/25 rounded-full blur-3xl -z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 right-4 w-40 h-28 bg-secondary/20 rounded-full blur-2xl -z-10"
        />

        <div className="p-6 sm:p-7 space-y-6">
          {/* Header Icon + Titles */}
          <DialogHeader className="text-center space-y-3 items-center">
            <div className="relative mx-auto size-16 rounded-2xl bg-gradient-to-br from-primary/15 via-accent/30 to-secondary/15 flex items-center justify-center border border-primary/25 shadow-inner">
              <div className="size-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white shadow-md">
                <Lock className="size-5" />
              </div>
              <span className="absolute -bottom-1 -right-1 size-5 rounded-full bg-secondary text-white flex items-center justify-center text-[10px] ring-2 ring-card shadow-xs">
                <Sparkles className="size-3" />
              </span>
            </div>

            <DialogTitle className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
              অ্যাকাউন্টে লগইন{" "}
              <span className="text-gradient-brand">প্রয়োজন</span>
            </DialogTitle>

            <DialogDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
              গেস্ট ইউজার হিসেবে ওয়ালেট ব্যালেন্স বা প্যাকেজ সংরক্ষণ করা সম্ভব নয়।
              নিরাপদ পেমেন্ট ও আজীবন পোস্টার ক্রেডিট ব্যবহারের জন্য অনুগ্রহ করে লগইন করুন।
            </DialogDescription>

            {/* Selected Intent Highlight */}
            {amount && amount > 0 && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-muted/80 border border-border text-xs font-semibold text-foreground shadow-xs">
                <Zap className="size-3.5 text-secondary shrink-0" />
                <span>
                  আপনার নির্বাচিত রিচার্জ:{" "}
                  <strong className="text-primary font-bold">
                    ৳{toBengaliNumber(amount)}
                  </strong>
                  {planTitle ? ` (${planTitle})` : ""}
                </span>
              </div>
            )}
          </DialogHeader>

          {/* Benefits Bullet Grid */}
          <div className="space-y-2.5 rounded-2xl bg-muted/40 border border-border/70 p-3.5 text-xs">
            <div className="flex items-start gap-2.5 text-foreground/90">
              <ShieldCheck className="size-4 text-secondary shrink-0 mt-0.5" />
              <span className="leading-snug">
                <strong>আজীবন ব্যালেন্স সংরক্ষণ:</strong> রিচার্জকৃত টাকা ও পোস্টার ক্রেডিট সরাসরি আপনার অ্যাকাউন্টে সুরক্ষিত থাকবে।
              </span>
            </div>
            <div className="flex items-start gap-2.5 text-foreground/90">
              <Sparkles className="size-4 text-primary shrink-0 mt-0.5" />
              <span className="leading-snug">
                <strong>ডিজাইন হিস্ট্রি ও আনলিমিটেড ডাউনলোড:</strong> যেকোনো সময় আগের তৈরি পোস্টার এডিট এবং ফুল HD রেজল্যুশনে ডাউনলোড করতে পারবেন।
              </span>
            </div>
            <div className="flex items-start gap-2.5 text-foreground/90">
              <Zap className="size-4 text-amber-500 shrink-0 mt-0.5" />
              <span className="leading-snug">
                <strong>তাৎক্ষণিক অ্যাক্টিভেশন:</strong> বিকাশ, নগদ বা কার্ডে পেমেন্ট সফল হওয়ার সাথে সাথে সেকেন্ডের মধ্যে ক্রেডিট যোগ হয়ে যাবে।
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-1">
            <Button
              type="button"
              onClick={handleLogin}
              className="w-full bg-gradient-brand hover:opacity-95 text-white font-bold h-11 text-sm rounded-xl cursor-pointer flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
            >
              <LogIn className="size-4" />
              <span>লগইন করে এগিয়ে যান</span>
              <ArrowRight className="size-4 ml-0.5" />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleRegister}
              className="w-full border-border/80 hover:bg-accent/40 font-semibold h-10 text-xs rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-colors text-foreground"
            >
              <UserPlus className="size-3.5 text-secondary" />
              <span>অ্যাকাউন্ট নেই? নতুন অ্যাকাউন্ট খুলুন</span>
            </Button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-1.5 text-center text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              এখন নয়, পরে করব
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
