"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { PosterGeneratorService } from "../generator.service";
import { BannerTheme, CandidateInfo, PublishedTemplate } from "../generator.types";
import { Download, Loader2, MapPin, ShieldCheck, Sparkles, Move, RotateCcw, Eye, ZoomIn } from "lucide-react";
import { renderTemplateCanvas } from "@/modules/template-studio/utils/canvas-renderer";
import { PhotoSlot } from "./photo-slot";

interface StudioCanvasProps {
  candidate: CandidateInfo;
  photoUrl: string;
  theme: BannerTheme;
  imageScale: number;
  onImageScaleChange?: (scale: number) => void;
  imageOffsetX?: number;
  imageOffsetY?: number;
  onImageOffsetChange?: (x: number, y: number) => void;
  onPhotoChange?: (url: string) => void;
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
  onImageScaleChange,
  imageOffsetX = 0,
  imageOffsetY = 0,
  onImageOffsetChange,
  onPhotoChange,
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
      
      {/* Main Preview Container */}
      <div className="w-full max-w-[620px] mx-auto flex flex-col items-center justify-center p-3 sm:p-4 rounded-3xl bg-muted/40 border border-border min-h-[460px] relative">
        {/* Compare Mode Banner Overlay */}
        {isComparing && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 rounded-full bg-amber-500 text-slate-950 font-black text-xs shadow-xl flex items-center gap-2 border border-amber-300 animate-in fade-in zoom-in-95 duration-150">
            <Eye className="size-4 shrink-0" />
            <span>মূল ছবি (তুলনা প্রিভিউ)</span>
          </div>
        )}

        
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
             {
              primarySlot && (
                           <div
              style={{
                position: "absolute",
                left: `${(primarySlot.x / canvasWidth) * 100}%`,
                top: `${(primarySlot.y / canvasHeight) * 100}%`,
                width: `${(primarySlot.width / canvasWidth) * 100}%`,
                height: `${(primarySlot.height / canvasHeight) * 100}%`,
                pointerEvents: photoUrl ? "none" : "auto",
              }}
             >

                 <PhotoSlot
                  photoUrl={photoUrl}
                  onPhotoChange={(newUrl) => {onPhotoChange?.(newUrl);onImageOffsetChange?.(0, 0);}}
                   imageScale={imageScale}
                   imageOffsetX={imageOffsetX}
                   imageOffsetY={imageOffsetY}
                  />
               </div>
              )
             }
            {isRendering && (
              <div className="absolute inset-0 bg-background/40 backdrop-blur-2xs rounded-2xl flex items-center justify-center pointer-events-none">
                <Loader2 className="size-8 text-brand-primary animate-spin" />
              </div>
            )}
          </div>

               {/* Drag Guidance & Scale Slider Bar */}
        <div className="w-full mt-3 pt-2.5 border-t border-border/70 flex flex-col gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 text-foreground/80 font-medium">
            <Move className="size-3.5 text-brand-primary shrink-0" />
            <span>ছবির উপর ক্লিক করে টেনে ৩০% পর্যন্ত অবস্থান বদলাতে পারেন</span>
          </span>
          <span className="flex items-center gap-1.5 text-foreground/80 font-medium">
            <ZoomIn className="size-3.5 text-brand-primary shrink-0" />
            <span>নিচের স্কেল স্লাইডারটি ডানে-বামে টেনে ছবির আকার ছোট বা বড় করতে পারবেন</span>
          </span>

          {/* Scale Slider  */}
          {photoUrl && onImageScaleChange && (
            <div className="flex items-center justify-between gap-3 pt-1 border-t border-border/40">
              <span className="font-semibold text-foreground/90 whitespace-nowrap">
                ছবির আকার (Scale): <span className="text-brand-primary font-bold">{imageScale}%</span>
              </span>
              <input
                type="range"
                min="50"
                max="120"
                value={imageScale}
                onChange={(e) => onImageScaleChange(Number(e.target.value))}
                className="w-48 sm:w-64 accent-primary h-2 bg-muted rounded-lg cursor-pointer"
              />
            </div>
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
