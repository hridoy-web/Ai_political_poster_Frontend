"use client";

import React, { useRef, useState } from "react";
import {
  UploadCloud,
  FileImage,
  CheckCircle2,
  Trash2,
  RefreshCw,
  ExternalLink,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DeviceImageUploaderProps {
  label: string;
  badgeText: string;
  description: string;
  accent: "primary" | "emerald";
  currentImageUrl: string;
  onImageSelected: (dataUrl: string, file: File) => void;
  onClear: () => void;
}

export function DeviceImageUploader({
  label,
  badgeText,
  description,
  accent,
  currentImageUrl,
  onImageSelected,
  onClear,
}: DeviceImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileMeta, setFileMeta] = useState<{ name: string; size: string } | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [tempUrl, setTempUrl] = useState("");

  const isPrimary = accent === "primary";

  const [isOptimizing, setIsOptimizing] = useState(false);

  const compressImage = (file: File, maxDim = 1920, quality = 0.82): Promise<{ dataUrl: string; sizeKb: number }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const raw = e.target?.result as string;
        if (!raw) {
          resolve({ dataUrl: "", sizeKb: 0 });
          return;
        }
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          if (width > maxDim || height > maxDim) {
            const ratio = Math.min(maxDim / width, maxDim / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve({ dataUrl: raw, sizeKb: Math.round(file.size / 1024) });
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          try {
            const webpUrl = canvas.toDataURL("image/webp", quality);
            const sizeKb = Math.round((webpUrl.length * 3) / 4 / 1024);
            resolve({ dataUrl: webpUrl, sizeKb });
          } catch {
            const jpegUrl = canvas.toDataURL("image/jpeg", quality);
            const sizeKb = Math.round((jpegUrl.length * 3) / 4 / 1024);
            resolve({ dataUrl: jpegUrl, sizeKb });
          }
        };
        img.onerror = () => resolve({ dataUrl: raw, sizeKb: Math.round(file.size / 1024) });
        img.src = raw;
      };
      reader.onerror = () => resolve({ dataUrl: "", sizeKb: 0 });
      reader.readAsDataURL(file);
    });
  };

  const handleFileProcess = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("অনুগ্রহ করে একটি ইমেজ ফাইল নির্বাচন করুন (JPEG, PNG, WebP)");
      return;
    }

    try {
      setIsOptimizing(true);
      const originalMb = (file.size / (1024 * 1024)).toFixed(2);
      const { dataUrl, sizeKb } = await compressImage(file);
      
      const formattedSize = sizeKb > 1024 
        ? `${(sizeKb / 1024).toFixed(2)} MB (অপ্টিমাইজড)`
        : `${sizeKb} KB (অপ্টিমাইজড)`;

      setFileMeta({
        name: file.name,
        size: `${formattedSize} — মূল সাইজ: ${originalMb} MB`,
      });

      if (dataUrl) {
        onImageSelected(dataUrl, file);
      }
    } catch (err) {
      console.error("Compression error:", err);
      // Fallback to uncompressed dataUrl
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageSelected(e.target.result as string, file);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempUrl.trim()) {
      setFileMeta({
        name: "অনলাইন ইমেজ লিংক",
        size: "External URL",
      });
      // We pass an empty file mock
      const mockFile = new File([], "external-image.jpg", { type: "image/jpeg" });
      onImageSelected(tempUrl.trim(), mockFile);
      setShowUrlInput(false);
    }
  };

  return (
    <div className="space-y-2 p-4 rounded-3xl bg-card/90 backdrop-blur-xl border border-border/80 shadow-xs flex flex-col justify-between">
      {/* Header Info */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={`size-7 rounded-xl flex items-center justify-center shrink-0 ${
              isPrimary
                ? "bg-brand-primary/10 text-brand-primary"
                : "bg-emerald-500/10 text-emerald-500"
            }`}
          >
            <FileImage className="size-4" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-foreground truncate">
            {label}
          </span>
        </div>
        <span
          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shrink-0 ${
            isPrimary
              ? "bg-brand-primary/10 text-brand-primary border-brand-primary/20"
              : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
          }`}
        >
          {badgeText}
        </span>
      </div>

      <p className="text-[11px] text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Main Upload / Preview Area */}
      {currentImageUrl ? (
        <div className="relative group rounded-2xl overflow-hidden border border-border/80 bg-background/80 p-3 flex items-center gap-3 shadow-inner">
          {/* Thumbnail */}
          <div className="size-20 sm:size-24 rounded-xl overflow-hidden bg-slate-900 border border-border shrink-0 relative flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentImageUrl}
              alt={label}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Meta & Controls */}
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
              <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
              <span className="truncate">{fileMeta?.name || "ছবি সংযুক্ত আছে"}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">
              {fileMeta?.size || "সফলভাবে ক্যানভাসে লোড হয়েছে"}
            </p>

            <div className="flex items-center gap-2 pt-1.5 flex-wrap">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="h-7 px-2.5 rounded-xl text-[11px] gap-1 hover:bg-muted"
              >
                <RefreshCw className="size-3 text-muted-foreground" />
                <span>পরিবর্তন করুন</span>
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFileMeta(null);
                  onClear();
                }}
                className="h-7 px-2 rounded-xl text-[11px] text-destructive hover:bg-destructive/10 gap-1"
              >
                <Trash2 className="size-3" />
                <span>মুছুন</span>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Dropzone for Device File Selection */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isOptimizing && fileInputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 p-6 flex flex-col items-center justify-center text-center gap-2.5 ${
            isOptimizing
              ? "border-amber-500/50 bg-amber-500/5 cursor-wait"
              : isDragging
              ? isPrimary
                ? "border-brand-primary bg-brand-primary/10 scale-[1.01]"
                : "border-emerald-500 bg-emerald-500/10 scale-[1.01]"
              : "border-border/80 bg-background/50 hover:bg-background/90 hover:border-border"
          }`}
        >
          {isOptimizing ? (
            <>
              <div className="size-12 rounded-2xl flex items-center justify-center shadow-xs bg-amber-500/15 text-amber-500">
                <Loader2 className="size-6 animate-spin" />
              </div>

              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  ছবি অপ্টিমাইজ হচ্ছে...
                </p>
                <p className="text-[11px] text-muted-foreground">
                  দ্রুত পাবলিশ ও ক্যানভাস পারফরম্যান্সের জন্য ছবি কম্প্রেস করা হচ্ছে
                </p>
              </div>
            </>
          ) : (
            <>
              <div
                className={`size-12 rounded-2xl flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-105 ${
                  isPrimary
                    ? "bg-brand-primary/15 text-brand-primary"
                    : "bg-emerald-500/15 text-emerald-500"
                }`}
              >
                <UploadCloud className="size-6 animate-pulse" />
              </div>

              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  ডিভাইস থেকে ছবি আপলোড করুন
                </p>
                <p className="text-[11px] text-muted-foreground">
                  ফাইল সিলেক্ট করতে এখানে ক্লিক করুন বা ড্র্যাগ করে ড্রপ করুন
                </p>
                <p className="text-[10px] text-muted-foreground/70">
                  (PNG, JPG, WebP — সর্বোচ্চ 10MB)
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Hidden Native File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Optional URL Toggle */}
      <div className="pt-1 flex items-center justify-between text-[11px]">
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        >
          <ExternalLink className="size-3" />
          <span>{showUrlInput ? "URL ইনপুট বন্ধ করুন" : "বা অনলাইন ইমেজ লিংক (URL) দিন"}</span>
        </button>
      </div>

      {showUrlInput && (
        <form onSubmit={handleUrlSubmit} className="flex gap-1.5 pt-1">
          <Input
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
            placeholder="https://example.com/image.png"
            className="h-8 text-xs rounded-xl bg-background"
          />
          <Button
            type="submit"
            size="sm"
            className="h-8 px-3 rounded-xl text-xs bg-muted hover:bg-accent text-foreground"
          >
            সেট করুন
          </Button>
        </form>
      )}
    </div>
  );
}
