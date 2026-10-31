"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { PosterGeneratorService } from "../generator.service";
import { BannerTheme, CandidateInfo, PublishedTemplate } from "../generator.types";
import { Download, Loader2, MapPin, ShieldCheck, Sparkles, Move, RotateCcw, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { renderTemplateCanvas } from "@/modules/template-studio/utils/canvas-renderer";

interface StudioCanvasProps {
  candidate: CandidateInfo;
  photoUrl: string;
  theme: BannerTheme;
  imageScale: number;
  imageOffsetX?: number;
  imageOffsetY?: number;
  onImageOffsetChange?: (x: number, y: number) => void;
  template?: PublishedTemplate | null;
  onCreatePoster: () => void;
  onStartNewPoster?: () => void;
  isCreating: boolean;
  isCreated: boolean;
  onDownload: () => void;
  isDownloading?: boolean;
  isComparing?: boolean;
  canvasRef?: React.RefObject<HTMLCanvasElement | null>;
}

export function StudioCanvas({
  candidate,
  photoUrl,
  theme,
  imageScale,
  imageOffsetX = 0,
  imageOffsetY = 0,
  onImageOffsetChange,
  template,
  onCreatePoster,
  onStartNewPoster,
  isCreating,
  isCreated,
  onDownload,
  isDownloading = false,
  isComparing = false,
  canvasRef: externalCanvasRef,
}: StudioCanvasProps) {
  const localCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRef = externalCanvasRef || localCanvasRef;
  const [isRendering, setIsRendering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);

  const dragStartRef = useRef<{
    clientX: number;
    clientY: number;
    startOffsetX: number;
    startOffsetY: number;
  }>({ clientX: 0, clientY: 0, startOffsetX: 0, startOffsetY: 0 });

  const hasCanvasConfig = Boolean(
    template?.config &&
    (template.config.blankTemplateUrl || template.config.type === "canvas")
  );

  const canvasWidth = template?.width || template?.config?.width || 1080;
  const canvasHeight = template?.height || template?.config?.height || 1350;

  // Primary photo slot for drag calculations
  const primarySlot = template?.config?.photoSlots?.[0];
  const maxOffsetX = primarySlot ? Math.round(primarySlot.width * 0.30) : 100;
  const maxOffsetY = primarySlot ? Math.round(primarySlot.height * 0.30) : 100;

  // Re-render HTML5 canvas whenever inputs, template, photo scale, or offset changes
  useEffect(() => {
    let isCancelled = false;

    async function drawCanvas() {
      if (!hasCanvasConfig || !canvasRef.current || !template?.config) return;

      setIsRendering(true);
      try {
        await renderTemplateCanvas({
          canvas: canvasRef.current,
          width: canvasWidth,
          height: canvasHeight,
          blankTemplateUrl: template.config.blankTemplateUrl,
          photoSlots: (template.config.photoSlots || []) as any,
          textSlots: (template.config.textSlots || []) as any,
          selectedSlotId: null,
          selectedSlotType: null,
          isTestPreviewMode: true,
          sampleCandidate: {
            name: candidate.name,
            designation: candidate.designation,
            area: candidate.area,
            bannerTitle: candidate.bannerTitle,
            slogan: candidate.slogan,
            courtesy: candidate.courtesy,
            symbol:
              theme === "emerald"
                ? "ধানের শীষ"
                : theme === "crimson"
                ? "নৌকা"
                : "দাঁড়িপাল্লা",
            photoUrl,
            imageScale,
            imageOffsetX,
            imageOffsetY,
          },
        });
      } catch (err) {
        console.error("Canvas rendering failed:", err);
      } finally {
        if (!isCancelled) {
          setIsRendering(false);
        }
      }
    }

    drawCanvas();

    return () => {
      isCancelled = true;
    };
  }, [
    candidate,
    photoUrl,
    theme,
    imageScale,
    imageOffsetX,
    imageOffsetY,
    template,
    hasCanvasConfig,
    canvasWidth,
    canvasHeight,
  ]);

  // Pointer drag event handlers for direct image repositioning
  const getCanvasCoords = useCallback(
    (clientX: number, clientY: number) => {
      if (!canvasRef.current) return { x: 0, y: 0, scaleRatio: 1 };
      const rect = canvasRef.current.getBoundingClientRect();
      const scaleX = canvasWidth / rect.width;
      const scaleY = canvasHeight / rect.height;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
        scaleRatio: scaleX,
      };
    },
    [canvasWidth, canvasHeight]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!primarySlot || !onImageOffsetChange) return;

    const coords = getCanvasCoords(e.clientX, e.clientY);
    // Hit test with 30% margin allowance
    const hitBox = {
      x1: primarySlot.x - maxOffsetX,
      y1: primarySlot.y - maxOffsetY,
      x2: primarySlot.x + primarySlot.width + maxOffsetX,
      y2: primarySlot.y + primarySlot.height + maxOffsetY,
    };

    if (
      coords.x >= hitBox.x1 &&
      coords.x <= hitBox.x2 &&
      coords.y >= hitBox.y1 &&
      coords.y <= hitBox.y2
    ) {
      e.currentTarget.setPointerCapture(e.pointerId);
      setIsDragging(true);
      dragStartRef.current = {
        clientX: e.clientX,
        clientY: e.clientY,
        startOffsetX: imageOffsetX,
        startOffsetY: imageOffsetY,
      };
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!primarySlot) return;

    if (isDragging && onImageOffsetChange) {
      const coords = getCanvasCoords(e.clientX, e.clientY);
      const dx = (e.clientX - dragStartRef.current.clientX) * coords.scaleRatio;
      const dy = (e.clientY - dragStartRef.current.clientY) * coords.scaleRatio;

      const newX = Math.round(
        Math.max(-maxOffsetX, Math.min(maxOffsetX, dragStartRef.current.startOffsetX + dx))
      );
      const newY = Math.round(
        Math.max(-maxOffsetY, Math.min(maxOffsetY, dragStartRef.current.startOffsetY + dy))
      );

      onImageOffsetChange(newX, newY);
    } else {
      // Hover detection
      const coords = getCanvasCoords(e.clientX, e.clientY);
      const isOver =
        coords.x >= primarySlot.x - maxOffsetX &&
        coords.x <= primarySlot.x + primarySlot.width + maxOffsetX &&
        coords.y >= primarySlot.y - maxOffsetY &&
        coords.y <= primarySlot.y + primarySlot.height + maxOffsetY;
      setIsHoveringPhoto(isOver);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // safe fallback
      }
    }
  };

  const handleDownloadClick = () => {
    // If canvas is rendered, download instant high-res PNG
    if (hasCanvasConfig && canvasRef.current) {
      try {
        const dataUrl = canvasRef.current.toDataURL("image/png");
        const a = document.createElement("a");
        const safeName = (candidate.name || "political_poster").replace(
          /[^a-zA-Z0-9_\u0980-\u09FF]/g,
          "_"
        );
        a.href = dataUrl;
        a.download = `${safeName}_${template?.title || "poster"}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (err) {
        console.warn("Direct canvas export failed, proceeding with server download:", err);
      }
    }
    onDownload();
  };

  const bgGradientClass = PosterGeneratorService.getThemeGradientClass(theme);

  return (
    <section className="flex flex-col gap-3.5 items-center w-full">
      {/* Template Badge Indicator */}
      {template && (
        <div className="w-full flex items-center justify-between px-3.5 py-2 rounded-2xl bg-card border border-border text-xs sm:text-sm shadow-2xs">
          <span className="font-semibold text-foreground flex items-center gap-1.5">
            <Sparkles className="size-4 text-brand-primary" />
            <span>সিলেক্টেড টেমপ্লেট:</span>
            <span className="text-brand-primary font-bold">{template.title}</span>
          </span>
          <span className="text-muted-foreground font-mono text-xs">
            {canvasWidth} × {canvasHeight} ({template.aspectRatio || "৪:৫"})
          </span>
        </div>
      )}

      {/* Main Preview Container */}
      <div className="w-full max-w-[620px] mx-auto flex flex-col items-center justify-center p-3 sm:p-4 rounded-3xl bg-muted/40 border border-border min-h-[460px] relative">
        {/* Compare Mode Banner Overlay */}
        {isComparing && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 rounded-full bg-amber-500 text-slate-950 font-black text-xs shadow-xl flex items-center gap-2 border border-amber-300 animate-in fade-in zoom-in-95 duration-150">
            <Eye className="size-4 shrink-0" />
            <span>মূল ছবি (তুলনা প্রিভিউ)</span>
          </div>
        )}

        {hasCanvasConfig ? (
          <div className="relative flex items-center justify-center max-w-full">
            <canvas
              ref={canvasRef}
              width={canvasWidth}
              height={canvasHeight}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              style={{
                cursor: isDragging
                  ? "grabbing"
                  : isHoveringPhoto
                  ? "grab"
                  : "default",
                touchAction: "none",
              }}
              className="w-auto h-auto max-h-[min(560px,calc(100vh-220px))] max-w-full rounded-2xl shadow-2xl border border-white/20 object-contain select-none transition-all duration-150"
            />

            {isRendering && (
              <div className="absolute inset-0 bg-background/40 backdrop-blur-2xs rounded-2xl flex items-center justify-center pointer-events-none">
                <Loader2 className="size-8 text-brand-primary animate-spin" />
              </div>
            )}
          </div>
        ) : (
          /* Fallback HTML Banner Preview (if template has no canvas background) */
          <div
            className={`aspect-[1300/1800] h-[min(450px,calc(100vh-200px))] w-auto max-w-full rounded-2xl text-white transition-all duration-300 select-none shadow-2xl flex flex-col justify-between overflow-hidden relative border text-center ${bgGradientClass}`}
          >
            <div className="relative z-10 w-full px-3 pt-2 flex items-center justify-between border-b border-white/15 pb-1.5 shrink-0">
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-emerald-100 font-semibold border border-white/20">
                জাতীয় সংসদ নির্বাচন ২০২৬
              </span>
              <Badge className="bg-rose-600 hover:bg-rose-600 text-white font-bold text-[9px] px-2 py-0.5 shadow-xs border-none">
                মার্কা: ধানের শীষ
              </Badge>
            </div>

            <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center gap-1.5 sm:gap-2 px-3 py-1">
              <p className="text-[10px] sm:text-[11px] font-bold text-amber-300 drop-shadow flex items-center justify-center gap-1">
                <span className="text-amber-400">★</span>
                <span>{candidate.bannerTitle || "গণতন্ত্র ও জনগণের অধিকার আদায়ে"}</span>
              </p>

              <div className="w-32 sm:w-36 h-36 sm:h-40 rounded-2xl overflow-hidden flex items-center justify-center relative shadow-md bg-slate-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoUrl}
                  alt={candidate.name}
                  style={{
                    transform: `translate(${imageOffsetX}px, ${imageOffsetY}px) scale(${imageScale / 100})`,
                  }}
                  className="w-full h-full object-cover object-top transition-transform duration-200"
                />
              </div>

              <h1 className="text-lg sm:text-xl font-black tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] leading-tight text-center">
                {candidate.name || "জনাব মোঃ আরিফুল ইসলাম"}
              </h1>

              <div className="flex items-center justify-center gap-1.5 flex-wrap">
                <span className="bg-gradient-brand text-white font-bold text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-full shadow-xs border border-rose-300/30">
                  {candidate.designation || "সাধারণ সম্পাদক পদপ্রার্থী"}
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-100 flex items-center gap-0.5">
                  <MapPin className="size-2.5 text-emerald-300" />
                  <span>{candidate.area || "ঢাকা-১০ সংসদীয় আসন"}</span>
                </span>
              </div>

              <div className="px-2.5 py-1 sm:py-1.5 rounded-lg bg-black/45 border border-white/15 max-w-[260px] w-full text-center shadow-xs">
                <p className="text-[8.5px] sm:text-[9.5px] font-medium text-slate-100 italic leading-snug">
                  &ldquo;{candidate.slogan || "জনগণের সেবায় নিবেদিতপ্রাণ, দুর্নীতির বিরুদ্ধে আপোষহীন কণ্ঠস্বর"}&rdquo;
                </p>
              </div>
            </div>

            <div className="relative z-10 w-full px-2 py-1.5 bg-black/70 border-t border-white/15 flex items-center justify-center text-center shrink-0">
              <div className="flex items-center justify-center gap-1 text-[8.5px] sm:text-[9.5px] text-slate-200">
                <span className="text-amber-400 font-bold">সৌজন্যে ও প্রচারে:</span>
                <span className="font-bold text-white truncate max-w-[180px]">
                  {candidate.courtesy || "এলাকাবাসী ও দলীয় সর্বস্তরের কর্মী-সমর্থক"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Drag Guidance & Position Reset Bar */}
        <div className="w-full mt-3 pt-2.5 border-t border-border/70 flex items-center justify-between text-xs text-muted-foreground flex-wrap gap-2">
          <span className="flex items-center gap-1.5 text-foreground/80 font-medium">
            <Move className="size-3.5 text-brand-primary" />
            <span>ছবির উপর ক্লিক করে টেনে ৩০% পর্যন্ত অবস্থান বদলাতে পারেন</span>
          </span>

          {(imageOffsetX !== 0 || imageOffsetY !== 0) && (
            <button
              type="button"
              onClick={() => onImageOffsetChange?.(0, 0)}
              className="text-brand-primary hover:underline font-bold flex items-center gap-1 cursor-pointer bg-brand-primary/10 px-2.5 py-1 rounded-lg"
            >
              <RotateCcw className="size-3" />
              <span>পজিশন রিসেট ({imageOffsetX}px, {imageOffsetY}px)</span>
            </button>
          )}
        </div>
      </div>

      {/* Action Section at Bottom of Poster */}
      <div className="w-full rounded-2xl p-4 border border-border bg-card flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex flex-col text-center sm:text-left">
          <span className="text-sm font-bold text-foreground flex items-center justify-center sm:justify-start gap-1.5">
            <ShieldCheck className="size-4 text-brand-green" />
            <span>
              {canvasWidth} × {canvasHeight} ডিজিটাল ক্যানভাস
            </span>
          </span>
          <span className="text-xs text-muted-foreground mt-0.5">
            {template?.title ? `টেমপ্লেট: ${template.title}` : "প্রফেশনাল ডিজিটাল পোস্টার"}
          </span>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {!isCreated ? (
            <Button
              type="button"
              onClick={onCreatePoster}
              disabled={isCreating || isRendering}
              className="w-full sm:w-auto bg-gradient-brand text-white font-bold text-sm h-11 px-7 rounded-xl shadow-md gap-2 cursor-pointer hover:opacity-95"
            >
              {isCreating ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>পোস্টার তৈরি হচ্ছে...</span>
                </>
              ) : (
                <>
                  <Sparkles className="size-4" />
                  <span>পোস্টার তৈরি করুন</span>
                </>
              )}
            </Button>
          ) : (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                onClick={onStartNewPoster || onCreatePoster}
                disabled={isCreating || isRendering}
                className="w-full sm:w-auto text-xs font-semibold h-11 px-4 rounded-xl border-border hover:bg-accent cursor-pointer gap-1.5"
              >
                <Sparkles className="size-3.5 text-brand-primary" />
                <span>নতুন পোস্টার তৈরি করুন</span>
              </Button>
              <Button
                type="button"
                onClick={onDownload}
                disabled={isDownloading || isRendering}
                className="w-full sm:w-auto bg-gradient-brand text-white font-bold text-sm h-11 px-6 rounded-xl shadow-md gap-2 cursor-pointer hover:opacity-95"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>ডাউনলোড হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <Download className="size-4" />
                    <span>পোস্টার ডাউনলোড করুন</span>
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
