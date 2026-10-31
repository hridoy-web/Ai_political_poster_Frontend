"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Download, ArrowRight, X, Sparkles, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PosterSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  posterImageUrl?: string | null;
  candidateName: string;
  onDownload: () => void;
}

export function PosterSuccessModal({
  isOpen,
  onClose,
  posterImageUrl,
  candidateName,
  onDownload,
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

        {/* Poster Image Preview */}
        {posterImageUrl && (
          <div className="relative w-44 aspect-3/4 rounded-2xl overflow-hidden border border-border/80 shadow-md bg-muted/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={posterImageUrl}
              alt="Generated Poster Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="w-full space-y-2.5 pt-2">
          {/* Download Button */}
          <Button
            type="button"
            onClick={onDownload}
            className="w-full bg-gradient-brand text-white font-bold h-12 rounded-xl shadow-md gap-2 cursor-pointer hover:opacity-95 text-sm"
          >
            <Download className="w-4 h-4" />
            <span>এইচডি পোস্টার ডাউনলোড করুন</span>
          </Button>

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

