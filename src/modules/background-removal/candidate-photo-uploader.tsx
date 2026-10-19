"use client";

import React, { useState, useRef, useCallback } from "react";
import { UploadCloud, Sparkles, Undo2, Check, RefreshCw, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useBackgroundRemoval } from "./use-bg-removal";

interface CandidatePhotoUploaderProps {
  /** Callback fired when background removal completes or image is finalized */
  onImageReady?: (transparentImageUrl: string) => void;
  /** Optional title for the uploader box */
  title?: string;
  /** Custom container class */
  className?: string;
}

export function CandidatePhotoUploader({
  onImageReady,
  title = "নেতা / প্রার্থীর ছবি আপলোড",
  className,
}: CandidatePhotoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isRemoved, setIsRemoved] = useState<boolean>(false);

  const {
    removeBg,
    isProcessing,
    progressText,
    progressPercent,
    revertToOriginal,
    hasOriginal,
    resetBgState,
  } = useBackgroundRemoval();

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setIsRemoved(false);
      resetBgState();
    },
    [resetBgState]
  );

  const handleTriggerRemoveBg = useCallback(async () => {
    if (!previewUrl) return;

    const transparentResult = await removeBg(previewUrl);
    if (transparentResult) {
      setPreviewUrl(transparentResult);
      setIsRemoved(true);
      onImageReady?.(transparentResult);
    }
  }, [previewUrl, removeBg, onImageReady]);

  const handleRevert = useCallback(() => {
    const original = revertToOriginal();
    if (original) {
      setPreviewUrl(original);
      setIsRemoved(false);
    }
  }, [revertToOriginal]);

  const handleReset = useCallback(() => {
    setPreviewUrl(null);
    setIsRemoved(false);
    resetBgState();
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [resetBgState]);

  return (
    <Card
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-sm space-y-5 transition-all overflow-hidden",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            <ImageIcon className="size-4" />
          </div>
          <h3 className="font-bold text-base text-foreground tracking-tight">
            {title}
          </h3>
        </div>

        {isRemoved && (
          <Badge
            variant="outline"
            className="bg-secondary/15 text-secondary border-secondary/30 flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-bold"
          >
            <Check className="size-3.5 stroke-[3]" />
            <span>স্বচ্ছ ব্যাকগ্রাউন্ড রেডি</span>
          </Badge>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload Drop Zone / Preview Box */}
      {!previewUrl ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
          }}
          className="border-2 border-dashed border-border rounded-2xl p-8 text-center cursor-pointer transition-all hover:border-primary/60 hover:bg-muted/40 flex flex-col items-center justify-center gap-3 group"
        >
          <div className="size-14 rounded-2xl bg-muted group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary transition-all flex items-center justify-center">
            <UploadCloud className="size-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">
              নেতার স্পষ্ট পোর্ট্রেট ছবি নির্বাচন করুন
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              JPG, PNG বা WEBP (সর্বোচ্চ ১০ মেগাবাইট)
            </p>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="rounded-xl font-bold mt-1"
          >
            ছবি আপলোড করুন
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Preview Box with Checkerboard pattern for transparent visibility */}
          <div className="relative rounded-2xl overflow-hidden border border-border h-64 sm:h-72 flex items-center justify-center bg-[linear-gradient(45deg,#f0f0f0_25%,transparent_25%),linear-gradient(-45deg,#f0f0f0_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f0f0f0_75%),linear-gradient(-45deg,transparent_75%,#f0f0f0_75%)] bg-[size:20px_20px] dark:bg-[linear-gradient(45deg,#1f1f1f_25%,transparent_25%),linear-gradient(-45deg,#1f1f1f_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#1f1f1f_75%),linear-gradient(-45deg,transparent_75%,#1f1f1f_75%)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Candidate preview"
              decoding="async"
              className="max-h-full max-w-full object-contain drop-shadow-md transition-all duration-300"
            />

            {/* In-processing Overlay */}
            {isProcessing && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-xs flex flex-col items-center justify-center gap-3 p-4 text-center animate-in fade-in duration-200">
                <RefreshCw className="size-8 text-primary animate-spin" />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-foreground">
                    {progressText || "প্রসেসিং হচ্ছে..."}
                  </p>
                  <p className="text-xs font-semibold text-primary">
                    {progressPercent}%
                  </p>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-48 h-2 rounded-full bg-muted overflow-hidden border border-border">
                  <div
                    className="h-full bg-gradient-brand transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Button Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              {!isRemoved ? (
                <Button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleTriggerRemoveBg}
                  className="bg-gradient-brand rounded-xl font-bold shadow-md gap-2 cursor-pointer h-10 px-4"
                >
                  <Sparkles className="size-4" />
                  <span>এআই দিয়ে ব্যাকগ্রাউন্ড রিমুভ করুন</span>
                </Button>
              ) : (
                hasOriginal && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleRevert}
                    className="rounded-xl font-bold gap-2 cursor-pointer h-10"
                  >
                    <Undo2 className="size-4" />
                    <span>মূল ছবিতে ফিরে যান</span>
                  </Button>
                )
              )}
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-xs text-muted-foreground hover:text-destructive cursor-pointer"
            >
              নতুন ছবি আপলোড
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
