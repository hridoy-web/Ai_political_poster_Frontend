"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  PhotoSlot,
  TextSlot,
  SampleCandidateData,
} from "../types";
import { renderTemplateCanvas } from "../utils/canvas-renderer";
import { ZoomIn, ZoomOut, Maximize2, Move, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TemplateCanvasEditorProps {
  width: number;
  height: number;
  blankTemplateUrl?: string;
  photoSlots: PhotoSlot[];
  textSlots: TextSlot[];
  selectedSlotId: string | null;
  selectedSlotType: "photo" | "text" | null;
  isTestPreviewMode: boolean;
  sampleCandidate: SampleCandidateData;
  onSelectSlot: (id: string | null, type: "photo" | "text" | null) => void;
  onUpdatePhotoSlot: (slot: PhotoSlot) => void;
  onUpdateTextSlot: (slot: TextSlot) => void;
}

type DragMode = "none" | "move" | "resize-se" | "resize-sw" | "resize-ne" | "resize-nw";

export function TemplateCanvasEditor({
  width,
  height,
  blankTemplateUrl,
  photoSlots,
  textSlots,
  selectedSlotId,
  selectedSlotType,
  isTestPreviewMode,
  sampleCandidate,
  onSelectSlot,
  onUpdatePhotoSlot,
  onUpdateTextSlot,
}: TemplateCanvasEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Zoom scale state for workspace navigation
  const [zoom, setZoom] = useState<number>(1);
  const [dragMode, setDragMode] = useState<DragMode>("none");
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [initialSlotState, setInitialSlotState] = useState<any>(null);

  // Re-render canvas whenever any data changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    renderTemplateCanvas({
      canvas,
      width,
      height,
      blankTemplateUrl,
      photoSlots,
      textSlots,
      selectedSlotId,
      selectedSlotType,
      isTestPreviewMode,
      sampleCandidate,
    });
  }, [
    width,
    height,
    blankTemplateUrl,
    photoSlots,
    textSlots,
    selectedSlotId,
    selectedSlotType,
    isTestPreviewMode,
    sampleCandidate,
  ]);

  // Convert client viewport coordinates to canvas 2D space (1080x1350)
  const getCanvasCoordinates = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      const scaleX = width / rect.width;
      const scaleY = height / rect.height;
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    },
    [width, height]
  );

  // Pointer Down (Slot Selection & Start Drag/Resize)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isTestPreviewMode) return;
    const { x, y } = getCanvasCoordinates(e);

    // 1. Check if clicking on Selected Slot's Resize Handles first
    if (selectedSlotId && selectedSlotType === "photo") {
      const slot = photoSlots.find((p) => p.id === selectedSlotId);
      if (slot) {
        const handleRadius = 20;
        // Bottom-Right handle
        if (Math.hypot(x - (slot.x + slot.width), y - (slot.y + slot.height)) < handleRadius) {
          setDragMode("resize-se");
          setDragStart({ x, y });
          setInitialSlotState({ ...slot });
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          return;
        }
      }
    }

    // 2. Check Hit on Photo Slots (bounding box check)
    for (let i = photoSlots.length - 1; i >= 0; i--) {
      const slot = photoSlots[i];
      if (x >= slot.x && x <= slot.x + slot.width && y >= slot.y && y <= slot.y + slot.height) {
        onSelectSlot(slot.id, "photo");
        setDragMode("move");
        setDragStart({ x, y });
        setInitialSlotState({ ...slot });
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        return;
      }
    }

    // 3. Check Hit on Text Slots (approximate box)
    for (let i = textSlots.length - 1; i >= 0; i--) {
      const slot = textSlots[i];
      const boxW = slot.maxWidth || 300;
      const boxH = slot.fontSize * 2;
      const boxX = slot.align === "left" ? slot.x : slot.align === "right" ? slot.x - boxW : slot.x - boxW / 2;
      const boxY = slot.y - boxH / 2;

      if (x >= boxX && x <= boxX + boxW && y >= boxY && y <= boxY + boxH) {
        onSelectSlot(slot.id, "text");
        setDragMode("move");
        setDragStart({ x, y });
        setInitialSlotState({ ...slot });
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        return;
      }
    }

    // 4. Clicked empty space
    onSelectSlot(null, null);
    setDragMode("none");
  };

  // Pointer Move (Dragging & Resizing)
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isTestPreviewMode || dragMode === "none" || !dragStart || !initialSlotState) return;
    const { x, y } = getCanvasCoordinates(e);
    const dx = x - dragStart.x;
    const dy = y - dragStart.y;

    if (selectedSlotType === "photo") {
      const slot = photoSlots.find((p) => p.id === selectedSlotId);
      if (!slot) return;

      if (dragMode === "move") {
        onUpdatePhotoSlot({
          ...slot,
          x: Math.round(Math.max(0, Math.min(width - slot.width, initialSlotState.x + dx))),
          y: Math.round(Math.max(0, Math.min(height - slot.height, initialSlotState.y + dy))),
        });
      } else if (dragMode === "resize-se") {
        onUpdatePhotoSlot({
          ...slot,
          width: Math.round(Math.max(60, initialSlotState.width + dx)),
          height: Math.round(Math.max(60, initialSlotState.height + dy)),
        });
      }
    } else if (selectedSlotType === "text") {
      const slot = textSlots.find((t) => t.id === selectedSlotId);
      if (!slot) return;

      if (dragMode === "move") {
        onUpdateTextSlot({
          ...slot,
          x: Math.round(Math.max(20, Math.min(width - 20, initialSlotState.x + dx))),
          y: Math.round(Math.max(20, Math.min(height - 20, initialSlotState.y + dy))),
        });
      }
    }
  };

  // Pointer Up
  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (dragMode !== "none") {
      setDragMode("none");
      setDragStart(null);
      setInitialSlotState(null);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full select-none">
      {/* Canvas Top Control Bar */}
      <div className="w-full flex items-center justify-between px-3 py-2 bg-card/80 backdrop-blur-md border border-border/80 rounded-2xl mb-3 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <span className="flex items-center gap-1 text-foreground">
            <Move className="size-3.5 text-brand-primary" />
            <span>ক্যানভাস সাইজ:</span>
            <strong className="text-brand-primary">{width} × {height} px</strong>
          </span>
          <span className="hidden sm:inline-block text-border">|</span>
          <span className="hidden sm:inline-block text-[11px]">
            {isTestPreviewMode ? (
              <span className="text-emerald-500 font-bold flex items-center gap-1">
                <Sparkles className="size-3" /> লাইভ প্রিভিউ সক্রিয়
              </span>
            ) : (
              "স্লট ক্লিক করে ড্র্যাগ ও ড্রপ করুন"
            )}
          </span>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setZoom((z) => Math.max(0.5, Number((z - 0.1).toFixed(1))))}
            className="size-7 rounded-lg"
            title="জুম আউট"
          >
            <ZoomOut className="size-3.5" />
          </Button>
          <span className="text-[11px] font-bold text-foreground w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setZoom((z) => Math.min(1.8, Number((z + 0.1).toFixed(1))))}
            className="size-7 rounded-lg"
            title="জুম ইন"
          >
            <ZoomIn className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setZoom(1)}
            className="size-7 rounded-lg text-muted-foreground hover:text-foreground"
            title="রিসেট জুম"
          >
            <Maximize2 className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* Main Interactive Canvas Display Box */}
      <div
        ref={containerRef}
        className="w-full overflow-auto max-h-[calc(100vh-220px)] p-4 sm:p-6 rounded-3xl bg-slate-950/40 border border-border/80 flex items-center justify-center shadow-inner relative"
        style={{ minHeight: "520px" }}
      >
        <div
          className="transition-transform duration-100 ease-out flex items-center justify-center relative shadow-2xl rounded-2xl overflow-hidden ring-1 ring-border/50"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "center center",
          }}
        >
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className={`max-w-full h-auto cursor-crosshair touch-none ${
              dragMode === "move"
                ? "cursor-grabbing"
                : dragMode.startsWith("resize")
                ? "cursor-nwse-resize"
                : "cursor-crosshair"
            }`}
            style={{
              maxHeight: "min(680px, calc(100vh - 250px))",
              width: "auto",
              aspectRatio: `${width} / ${height}`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
