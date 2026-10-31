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
  UserPlus,
  ArrowRight,
  LogIn,
  Zap,
  ShieldCheck,
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

  const handleRegister = () => {
    onClose();
    router.push("/register?redirect=/recharge");
  };

  const handleLogin = () => {
    onClose();
    router.push("/login?redirect=/recharge");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[420px] p-6 sm:p-7 border-border bg-card/95 backdrop-blur-xl shadow-2xl rounded-3xl">
        {/* Header Icon + Titles */}
        <DialogHeader className="text-center space-y-3 items-center">
          <div className="size-14 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shadow-xs">
            <UserPlus className="size-6 text-primary" />
          </div>

          <DialogTitle className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
            রেজিস্ট্রেশন প্রয়োজন
          </DialogTitle>

          <DialogDescription className="text-xs sm:text-sm text-muted-foreground leading-normal max-w-xs mx-auto">
            প্যাকেজটি কিনতে ও রিচার্জ সম্পন্ন করতে একটি ফ্রি অ্যাকাউন্ট তৈরি করুন
          </DialogDescription>

          {/* Selected Plan Badge */}
          {amount && amount > 0 && (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-xs font-bold text-primary shadow-2xs">
              <Zap className="size-3.5 shrink-0" />
              <span>
                প্যাকেজ: ৳{toBengaliNumber(amount)}
                {planTitle ? ` • ${planTitle}` : ""}
              </span>
            </div>
          )}
        </DialogHeader>

        {/* Informative Note Card */}
        <div className="p-3.5 rounded-2xl bg-muted/50 border border-border/80 flex items-center gap-3 text-xs sm:text-sm text-foreground/90 my-1">
          <ShieldCheck className="size-5 text-secondary shrink-0" />
          <span className="leading-snug">
            গেস্ট হিসেবে ওয়ালেট সংরক্ষণ সম্ভব নয়। একটি ফ্রি অ্যাকাউন্ট খুলে ব্যালেন্স ও পোস্টার ক্রেডিট সুরক্ষিত রাখুন।
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          {/* Main CTA: Register */}
          <Button
            type="button"
            onClick={handleRegister}
            className="w-full bg-gradient-brand hover:opacity-95 text-white font-bold h-12 text-sm sm:text-base rounded-xl cursor-pointer flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
          >
            <UserPlus className="size-4" />
            <span>নতুন অ্যাকাউন্ট খুলুন (রেজিস্ট্রেশন)</span>
            <ArrowRight className="size-4 ml-0.5" />
          </Button>

          {/* Already have an account? Login */}
          <div className="text-center pt-1">
            <p className="text-xs sm:text-sm text-muted-foreground">
              ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
              <button
                type="button"
                onClick={handleLogin}
                className="font-bold text-primary hover:underline cursor-pointer inline-flex items-center gap-1"
              >
                <LogIn className="size-3.5 inline" />
                <span>লগইন করুন</span>
              </button>
            </p>
          </div>

          {/* Dismiss */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-1 text-center text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            এখন নয়, পরে করব
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
