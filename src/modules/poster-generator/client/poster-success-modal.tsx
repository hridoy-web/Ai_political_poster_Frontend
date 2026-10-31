"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Download, ArrowRight, X, Sparkles, LayoutDashboard, PlusCircle, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PosterSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  posterImageUrl?: string | null;
  candidateName: string;
  onDownload: () => void;
  creditsLeft?: number | null;
  onStartNewPoster?: () => void;
}

export function PosterSuccessModal({
  isOpen,
  onClose,
  posterImageUrl,
  candidateName,
  onDownload,
  creditsLeft,
  onStartNewPoster,
}: PosterSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-card border border-border/80 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col items-center text-center space-y-4 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="বন্ধ করুন"
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1.5 rounded-full hover:bg-muted transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Icon */}
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-inner">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
            পোস্টার সফলভাবে তৈরি হয়েছে!
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            <strong className="text-foreground">{candidateName || "প্রার্থী"}</strong>-এর নির্বাচনী পোস্টার প্রস্তুত। আপনি এখনই এটি এইচডি রেজোলিউশনে ডাউনলোড করতে পারেন।
          </p>
        </div>

        {/* Live Remaining Credits Badge */}
        {creditsLeft !== undefined && creditsLeft !== null && (
          <div className="w-full py-2 px-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-between text-xs font-semibold text-amber-800 dark:text-amber-300 shadow-2xs">
            <div className="flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-amber-500 shrink-0" />
              <span>অবশিষ্ট পোস্টার তৈরির সুযোগ:</span>
            </div>
            <span className="font-extrabold text-sm text-foreground bg-background/80 px-2.5 py-0.5 rounded-lg border border-border/60">
              {creditsLeft}টি
            </span>
          </div>
        )}

        {/* Poster Image Preview */}
        {posterImageUrl ? (
          <div className="relative w-48 aspect-[4/5] rounded-2xl overflow-hidden border border-border/80 shadow-md bg-muted/20 flex items-center justify-center p-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={posterImageUrl}
              alt="Generated Poster Preview"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
        ) : null}

        {/* Action Buttons */}
        <div className="w-full space-y-2.5 pt-1">
          {/* Download Button */}
          <Button
            type="button"
            onClick={onDownload}
            className="w-full bg-gradient-brand text-white font-bold h-11 rounded-xl shadow-md gap-2 cursor-pointer hover:opacity-95 text-sm"
          >
            <Download className="w-4 h-4" />
            <span>এইচডি পোস্টার ডাউনলোড করুন</span>
          </Button>

          {/* Start New Poster / Reset Session Button */}
          {onStartNewPoster && (
            <Button
              type="button"
              onClick={onStartNewPoster}
              variant="default"
              className="w-full bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary border border-brand-primary/30 font-bold h-10 rounded-xl shadow-2xs gap-2 cursor-pointer text-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>নতুন পোস্টার তৈরি করুন (নতুন সেশন)</span>
            </Button>
          )}

          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl border-border hover:bg-accent text-xs font-semibold h-10 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-secondary" />
              <span>এডিটর-এ থাকুন</span>
            </Button>

            <Link href="/dashboard" className="w-full">
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-xl border-border hover:bg-accent text-xs font-semibold h-10 gap-1 cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>ড্যাশবোর্ড</span>
                <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
