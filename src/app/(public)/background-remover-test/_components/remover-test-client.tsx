"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  UploadCloud,
  Sparkles,
  Undo2,
  Download,
  Image as ImageIcon,
  CheckCircle2,
  RefreshCw,
  Info,
  Maximize2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// =========================================================================
// ১ লাইনে মডিউল থেকে হুক ইমপোর্ট
// =========================================================================
import { useBackgroundRemoval } from "@/modules/background-removal";

export function RemoverTestClient() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // লোকাল ভিউ স্টেট (প্রিভিউ, ভিউ মোড ও ডায়মেনশন মেটাডাটা)
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isTransparent, setIsTransparent] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"transparent" | "original">("transparent");
  const [imageMeta, setImageMeta] = useState<{ width: number; height: number; sizeKb?: number } | null>(null);

  // অবজেক্ট ইউআরএল মেমরি লিক রোধে ট্র্যাকিং রেফ
  const localBlobUrlRef = useRef<string | null>(null);

  // মেমরি পরিষ্কারের হেল্পার
  const revokeLocalBlobUrl = useCallback(() => {
    if (localBlobUrlRef.current && typeof window !== "undefined") {
      try {
        URL.revokeObjectURL(localBlobUrlRef.current);
      } catch {
        // Safe fallback
      }
      localBlobUrlRef.current = null;
    }
  }, []);

  // কম্পোনেন্ট আনমাউন্টে মেমরি ক্লিনআপ
  useEffect(() => {
    return () => {
      revokeLocalBlobUrl();
    };
  }, [revokeLocalBlobUrl]);

  // =========================================================================
  // আল্ট্রা-অপ্টিমাইজড ব্যাকগ্রাউন্ড রিমুভাল হুক
  // =========================================================================
  const {
    removeBg,
    isProcessing,
    progressText,
    progressPercent,
    originalPhotoUrl,
    hasOriginal,
    revertToOriginal,
    resetBgState,
  } = useBackgroundRemoval();

  // ইউজার ফাইল নির্বাচন করলে মেমরি-সেফ লোডিং ও মেটাডাটা এক্সট্রাকশন
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      revokeLocalBlobUrl();
      const url = URL.createObjectURL(file);
      localBlobUrlRef.current = url;

      // মেটাডাটা পড়া (সাইজ ও ডায়মেনশন)
      const sizeInKb = Math.round(file.size / 1024);
      const img = new Image();
      img.onload = () => {
        setImageMeta({
          width: img.naturalWidth || img.width,
          height: img.naturalHeight || img.height,
          sizeKb: sizeInKb,
        });
      };
      img.src = url;

      setCurrentImage(url);
      setIsTransparent(false);
      setViewMode("original");
      resetBgState();
    },
    [resetBgState, revokeLocalBlobUrl]
  );

  // ড্র্যাগ অ্যান্ড ড্রপ সাপোর্ট
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const file = e.dataTransfer.files?.[0];
      if (!file || !file.type.startsWith("image/")) return;

      revokeLocalBlobUrl();
      const url = URL.createObjectURL(file);
      localBlobUrlRef.current = url;

      const sizeInKb = Math.round(file.size / 1024);
      const img = new Image();
      img.onload = () => {
        setImageMeta({
          width: img.naturalWidth || img.width,
          height: img.naturalHeight || img.height,
          sizeKb: sizeInKb,
        });
      };
      img.src = url;

      setCurrentImage(url);
      setIsTransparent(false);
      setViewMode("original");
      resetBgState();
    },
    [resetBgState, revokeLocalBlobUrl]
  );

  // ব্যাকগ্রাউন্ড রিমুভ ট্রিগার
  const handleRemoveBackground = useCallback(async () => {
    if (!currentImage || isProcessing) return;

    const transparentDataUrl = await removeBg(currentImage);

    if (transparentDataUrl) {
      setCurrentImage(transparentDataUrl);
      setIsTransparent(true);
      setViewMode("transparent");
    }
  }, [currentImage, isProcessing, removeBg]);

  // পূর্বের ছবিতে ফেরত যাওয়া (Undo)
  const handleRevert = useCallback(() => {
    const original = revertToOriginal();
    if (original) {
      setCurrentImage(original);
      setIsTransparent(false);
      setViewMode("original");
    }
  }, [revertToOriginal]);

  // সম্পূর্ণ ফ্রি নেটিভ HTML5 ডাউনলোড (কোনো এক্সটার্নাল প্যাকেজ ছাড়া $০ খরচ)
  const handleDownload = useCallback(() => {
    if (!currentImage) return;
    const link = document.createElement("a");
    link.href = currentImage;
    link.download = isTransparent
      ? "candidate-photo-transparent.png"
      : "candidate-photo-original.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [currentImage, isTransparent]);

  // রিসেট করে নতুন ছবি আপলোড
  const handleReset = useCallback(() => {
    revokeLocalBlobUrl();
    setCurrentImage(null);
    setIsTransparent(false);
    setImageMeta(null);
    resetBgState();
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [resetBgState, revokeLocalBlobUrl]);

  return (
    <div className="space-y-8">
      {/* Hidden Native File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Interactive 2-Column Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN: UPLOAD & CONTROLS ================= */}
        <div className="lg:col-span-6 space-y-5">
          <Card className="rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <ImageIcon className="size-5" />
                </div>
                <div>
                  <h2 className="font-bold text-base text-foreground">১. ছবি নির্বাচন ও এআই কাটিং</h2>
                  <p className="text-xs text-muted-foreground">নেতার ছবি নির্বাচন করে এক ক্লিকে ব্যাকগ্রাউন্ড সরান</p>
                </div>
              </div>

              {isTransparent && (
                <Badge className="bg-secondary/15 text-secondary border-secondary/30 text-xs px-2.5 py-0.5 rounded-full font-bold">
                  স্বচ্ছ ব্যাকগ্রাউন্ড রেডি
                </Badge>
              )}
            </div>

            {!currentImage ? (
              /* Dropzone Area with Drag & Drop */
              <div
                role="button"
                tabIndex={0}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={handleDrop}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
                }}
                className="border-2 border-dashed border-border rounded-2xl p-10 text-center cursor-pointer transition-all hover:border-primary/60 hover:bg-muted/40 flex flex-col items-center justify-center gap-3.5 group"
              >
                <div className="size-16 rounded-2xl bg-muted group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary transition-all flex items-center justify-center">
                  <UploadCloud className="size-8" />
                </div>
                <div>
                  <p className="text-base font-bold text-foreground">
                    নেতার ছবি এখানে ড্রপ করুন অথবা ব্রাউজ করুন
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG বা WEBP (অনুমোদিত সর্বোচ্চ ১০ মেগাবাইট)
                  </p>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  className="rounded-xl font-bold mt-1 cursor-pointer pointer-events-none"
                >
                  ফাইল পছন্দ করুন
                </Button>
              </div>
            ) : (
              /* Uploaded View & Actions */
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-border h-64 sm:h-72 flex items-center justify-center bg-muted/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={viewMode === "original" && originalPhotoUrl ? originalPhotoUrl : currentImage}
                    alt="Uploaded candidate"
                    decoding="async"
                    className="max-h-full max-w-full object-contain drop-shadow-sm transition-all duration-300"
                  />

                  {/* Dimension Tag */}
                  {imageMeta && (
                    <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-xs text-[11px] font-medium text-muted-foreground px-2 py-0.5 rounded-md border border-border flex items-center gap-1">
                      <Maximize2 className="size-3" />
                      <span>
                        {imageMeta.width} × {imageMeta.height} px ({imageMeta.sizeKb} KB)
                      </span>
                    </div>
                  )}

                  {/* Progress Bar Overlay with Spinner */}
                  {isProcessing && (
                    <div className="absolute inset-0 bg-background/85 backdrop-blur-xs flex flex-col items-center justify-center gap-3 p-4 text-center animate-in fade-in duration-200">
                      <RefreshCw className="size-8 text-primary animate-spin" />
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-foreground">
                          {progressText || "এআই মডেল লোড হচ্ছে..."}
                        </p>
                        <p className="text-xs font-semibold text-primary">
                          {progressPercent}%
                        </p>
                      </div>
                      <div className="w-52 h-2.5 rounded-full bg-muted overflow-hidden border border-border">
                        <div
                          className="h-full bg-gradient-brand transition-all duration-300 rounded-full"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    {!isTransparent ? (
                      <Button
                        type="button"
                        disabled={isProcessing}
                        onClick={handleRemoveBackground}
                        className="bg-gradient-brand rounded-xl font-bold shadow-md gap-2 cursor-pointer h-11 px-5 hover:opacity-90 active:scale-[0.98] transition-all"
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
                          className="rounded-xl font-bold gap-2 cursor-pointer h-11"
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
                    অন্য ছবি নির্বাচন করুন
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Architecture Tip Alert */}
          <div className="rounded-2xl border border-secondary/30 bg-secondary/10 p-4 text-xs space-y-1.5 text-foreground flex items-start gap-3">
            <Info className="size-4 text-secondary shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-secondary">টিম আর্কিটেকচার নোট:</p>
              <p className="text-muted-foreground leading-relaxed">
                এই পুরো প্রসেসটিতে কোনো পেইড ক্লাউড API কল করা হয় না। ব্রাউজারের নিজস্ব
                WebAssembly মেমোরিতে সম্পূর্ণ কাজটি সম্পন্ন হয়, যার ফলে সার্ভার কস্ট $০ ডলার।
              </p>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: RESULT & DOWNLOAD ================= */}
        <div className="lg:col-span-6 space-y-5">
          <Card className="rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h2 className="font-bold text-base text-foreground">২. স্বচ্ছ প্রিভিউ ও ডাউনলোড</h2>
                <p className="text-xs text-muted-foreground">স্বচ্ছ ব্যাকগ্রাউন্ড যাচাই ও সরাসরি ডাউনলোড জোন</p>
              </div>

              {isTransparent && (
                <div className="flex items-center gap-1.5 p-1 bg-muted rounded-xl text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setViewMode("transparent")}
                    className={cn(
                      "px-2.5 py-1 rounded-lg transition-all cursor-pointer",
                      viewMode === "transparent"
                        ? "bg-background text-foreground shadow-xs font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    স্বচ্ছ ভিউ
                  </button>
                  {hasOriginal && (
                    <button
                      type="button"
                      onClick={() => setViewMode("original")}
                      className={cn(
                        "px-2.5 py-1 rounded-lg transition-all cursor-pointer",
                        viewMode === "original"
                          ? "bg-background text-foreground shadow-xs font-bold"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      আসল ছবি
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Checkerboard Container for Transparency Inspection */}
            <div className="relative rounded-2xl overflow-hidden border border-border h-64 sm:h-72 flex items-center justify-center bg-[linear-gradient(45deg,#e5e7eb_25%,transparent_25%),linear-gradient(-45deg,#e5e7eb_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#e5e7eb_75%),linear-gradient(-45deg,transparent_75%,#e5e7eb_75%)] bg-[size:20px_20px] dark:bg-[linear-gradient(45deg,#1f2937_25%,transparent_25%),linear-gradient(-45deg,#1f2937_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#1f2937_75%),linear-gradient(-45deg,transparent_75%,#1f2937_75%)]">
              {currentImage ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={viewMode === "original" && originalPhotoUrl ? originalPhotoUrl : currentImage}
                  alt="Result candidate transparent"
                  decoding="async"
                  className="max-h-full max-w-full object-contain drop-shadow-xl transition-all duration-300"
                />
              ) : (
                <div className="text-center p-6 text-muted-foreground space-y-2">
                  <div className="size-12 rounded-2xl bg-muted mx-auto flex items-center justify-center text-muted-foreground/60">
                    <ImageIcon className="size-6" />
                  </div>
                  <p className="text-sm font-semibold">বামপাশে ছবি আপলোড করলে এখানে রেজাল্ট প্রদর্শিত হবে</p>
                </div>
              )}

              {isTransparent && (
                <div className="absolute top-2 right-2 bg-background/85 backdrop-blur-xs text-[11px] font-bold text-secondary px-2.5 py-0.5 rounded-full border border-secondary/30 flex items-center gap-1">
                  <CheckCircle2 className="size-3 text-secondary" />
                  <span>আলফা চ্যানেল সক্রিয়</span>
                </div>
              )}
            </div>

            {/* Native HTML5 Download Controls */}
            <div className="space-y-3 pt-1">
              <Button
                type="button"
                disabled={!currentImage || isProcessing}
                onClick={handleDownload}
                className="w-full bg-gradient-brand h-12 rounded-xl font-bold shadow-md gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <Download className="size-4" />
                <span>
                  {isTransparent
                    ? "স্বচ্ছ ছবি ডাউনলোড করুন (PNG)"
                    : "বর্তমান ছবি ডাউনলোড করুন"}
                </span>
              </Button>
              <p className="text-[11px] text-center text-muted-foreground">
                🔒 ব্রাউজার থেকেই সরাসরি হাই-রেজোলিউশন ট্রান্সপারেন্ট PNG ফাইলে ডাউনলোড হবে (কোনো এক্সটার্নাল প্যাকেজ ছাড়া)।
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
