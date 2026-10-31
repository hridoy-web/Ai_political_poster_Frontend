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

type DragMode =
  | "none"
  | "move"
  | "resize-nw"
  | "resize-ne"
  | "resize-se"
  | "resize-sw"
  | "resize-n"
  | "resize-s"
  | "resize-w"
  | "resize-e";

// Check hit on any of 8 resize handles
function getHitHandle(
  x: number,
  y: number,
  boxX: number,
  boxY: number,
  boxW: number,
  boxH: number,
  handleRadius = 24
): DragMode {
  // Corners
  if (Math.hypot(x - boxX, y - boxY) < handleRadius) return "resize-nw";
  if (Math.hypot(x - (boxX + boxW), y - boxY) < handleRadius) return "resize-ne";
  if (Math.hypot(x - boxX, y - (boxY + boxH)) < handleRadius) return "resize-sw";
  if (Math.hypot(x - (boxX + boxW), y - (boxY + boxH)) < handleRadius) return "resize-se";

  // Mid-edges
  if (Math.hypot(x - (boxX + boxW / 2), y - boxY) < handleRadius) return "resize-n";
  if (Math.hypot(x - (boxX + boxW / 2), y - (boxY + boxH)) < handleRadius) return "resize-s";
  if (Math.hypot(x - boxX, y - (boxY + boxH / 2)) < handleRadius) return "resize-w";
  if (Math.hypot(x - (boxX + boxW), y - (boxY + boxH / 2)) < handleRadius) return "resize-e";

  return "none";
}

function getCursorForMode(mode: DragMode): string {
  switch (mode) {
    case "resize-nw":
    case "resize-se":
      return "nwse-resize";
    case "resize-ne":
    case "resize-sw":
      return "nesw-resize";
    case "resize-n":
    case "resize-s":
      return "ns-resize";
    case "resize-w":
    case "resize-e":
      return "ew-resize";
    case "move":
      return "grab";
    default:
      return "default";
  }
}

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
  const [hoverCursor, setHoverCursor] = useState<string>("crosshair");

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

  // Convert client viewport coordinates to canvas 2D space (e.g. 1080x1350)
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

  // Helper to get text bounding box
  const getTextSlotBoundingBox = (slot: TextSlot) => {
    const boxW = slot.width || slot.maxWidth || 300;
    const boxH = slot.height || Math.max(slot.fontSize * 2 + 10, 50);
    const boxX =
      slot.align === "left"
        ? slot.x
        : slot.align === "right"
        ? slot.x - boxW
        : slot.x - boxW / 2;
    const boxY = slot.y - boxH / 2;
    return { boxX, boxY, boxW, boxH };
  };

  // Pointer Down (Slot Selection & Start Drag/Resize from ANY corner/edge)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isTestPreviewMode) return;
    const { x, y } = getCanvasCoordinates(e);

    // 1. Check if clicking on Selected Photo Slot's 8 Resize Handles first
    if (selectedSlotId && selectedSlotType === "photo") {
      const slot = photoSlots.find((p) => p.id === selectedSlotId);
      if (slot) {
        const handle = getHitHandle(x, y, slot.x, slot.y, slot.width, slot.height, 28);
        if (handle !== "none") {
          setDragMode(handle);
          setDragStart({ x, y });
          setInitialSlotState({ ...slot });
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          return;
        }
      }
    }

    // 2. Check if clicking on Selected Text Slot's 8 Resize Handles
    if (selectedSlotId && selectedSlotType === "text") {
      const slot = textSlots.find((t) => t.id === selectedSlotId);
      if (slot) {
        const { boxX, boxY, boxW, boxH } = getTextSlotBoundingBox(slot);
        const handle = getHitHandle(x, y, boxX, boxY, boxW, boxH, 28);
        if (handle !== "none") {
          setDragMode(handle);
          setDragStart({ x, y });
          setInitialSlotState({ ...slot, boxX, boxY, boxW, boxH });
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          return;
        }
      }
    }

    // 3. Check Hit on Photo Slots (for repositioning / selection)
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

    // 4. Check Hit on Text Slots (for repositioning / selection)
    for (let i = textSlots.length - 1; i >= 0; i--) {
      const slot = textSlots[i];
      const { boxX, boxY, boxW, boxH } = getTextSlotBoundingBox(slot);

      if (x >= boxX && x <= boxX + boxW && y >= boxY && y <= boxY + boxH) {
        onSelectSlot(slot.id, "text");
        setDragMode("move");
        setDragStart({ x, y });
        setInitialSlotState({ ...slot, boxX, boxY, boxW, boxH });
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        return;
      }
    }

    // 5. Clicked on empty space: deselect
    onSelectSlot(null, null);
    setDragMode("none");
  };

  // Pointer Move (Dragging, Resizing & Dynamic Cursor Updates)
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isTestPreviewMode) return;
    const { x, y } = getCanvasCoordinates(e);

    // If currently dragging or resizing
    if (dragMode !== "none" && dragStart && initialSlotState) {
      const dx = x - dragStart.x;
      const dy = y - dragStart.y;
      const minSize = 40;

      // Handle Photo Slot resizing and moving
      if (selectedSlotType === "photo") {
        const slot = photoSlots.find((p) => p.id === selectedSlotId);
        if (!slot) return;

        if (dragMode === "move") {
          // Reposition anywhere on canvas
          onUpdatePhotoSlot({
            ...slot,
            x: Math.round(initialSlotState.x + dx),
            y: Math.round(initialSlotState.y + dy),
          });
        } else if (dragMode === "resize-se") {
          // Bottom-Right Corner
          onUpdatePhotoSlot({
            ...slot,
            width: Math.round(Math.max(minSize, initialSlotState.width + dx)),
            height: Math.round(Math.max(minSize, initialSlotState.height + dy)),
          });
        } else if (dragMode === "resize-sw") {
          // Bottom-Left Corner
          const newW = Math.round(Math.max(minSize, initialSlotState.width - dx));
          const newX = Math.round(initialSlotState.x + (initialSlotState.width - newW));
          const newH = Math.round(Math.max(minSize, initialSlotState.height + dy));
          onUpdatePhotoSlot({
            ...slot,
            x: newX,
            width: newW,
            height: newH,
          });
        } else if (dragMode === "resize-ne") {
          // Top-Right Corner
          const newW = Math.round(Math.max(minSize, initialSlotState.width + dx));
          const newH = Math.round(Math.max(minSize, initialSlotState.height - dy));
          const newY = Math.round(initialSlotState.y + (initialSlotState.height - newH));
          onUpdatePhotoSlot({
            ...slot,
            y: newY,
            width: newW,
            height: newH,
          });
        } else if (dragMode === "resize-nw") {
          // Top-Left Corner
          const newW = Math.round(Math.max(minSize, initialSlotState.width - dx));
          const newX = Math.round(initialSlotState.x + (initialSlotState.width - newW));
          const newH = Math.round(Math.max(minSize, initialSlotState.height - dy));
          const newY = Math.round(initialSlotState.y + (initialSlotState.height - newH));
          onUpdatePhotoSlot({
            ...slot,
            x: newX,
            y: newY,
            width: newW,
            height: newH,
          });
        } else if (dragMode === "resize-e") {
          // Right-Center Edge
          onUpdatePhotoSlot({
            ...slot,
            width: Math.round(Math.max(minSize, initialSlotState.width + dx)),
          });
        } else if (dragMode === "resize-w") {
          // Left-Center Edge
          const newW = Math.round(Math.max(minSize, initialSlotState.width - dx));
          const newX = Math.round(initialSlotState.x + (initialSlotState.width - newW));
          onUpdatePhotoSlot({
            ...slot,
            x: newX,
            width: newW,
          });
        } else if (dragMode === "resize-s") {
          // Bottom-Center Edge
          onUpdatePhotoSlot({
            ...slot,
            height: Math.round(Math.max(minSize, initialSlotState.height + dy)),
          });
        } else if (dragMode === "resize-n") {
          // Top-Center Edge
          const newH = Math.round(Math.max(minSize, initialSlotState.height - dy));
          const newY = Math.round(initialSlotState.y + (initialSlotState.height - newH));
          onUpdatePhotoSlot({
            ...slot,
            y: newY,
            height: newH,
          });
        }
      } else if (selectedSlotType === "text") {
        const slot = textSlots.find((t) => t.id === selectedSlotId);
        if (!slot) return;

        if (dragMode === "move") {
          // Reposition text anywhere on canvas
          onUpdateTextSlot({
            ...slot,
            x: Math.round(initialSlotState.x + dx),
            y: Math.round(initialSlotState.y + dy),
          });
        } else {
          // 8-directional corner & edge reshaping for text slot
          const initialBoxX = initialSlotState.boxX;
          const initialBoxY = initialSlotState.boxY;
          const initialBoxW = initialSlotState.boxW;
          const initialBoxH = initialSlotState.boxH;
          const minW = 60;
          const minH = 30;

          let newBoxX = initialBoxX;
          let newBoxY = initialBoxY;
          let newBoxW = initialBoxW;
          let newBoxH = initialBoxH;

          if (dragMode === "resize-se") {
            newBoxW = Math.max(minW, initialBoxW + dx);
            newBoxH = Math.max(minH, initialBoxH + dy);
          } else if (dragMode === "resize-sw") {
            newBoxW = Math.max(minW, initialBoxW - dx);
            newBoxH = Math.max(minH, initialBoxH + dy);
            newBoxX = initialBoxX + (initialBoxW - newBoxW);
          } else if (dragMode === "resize-ne") {
            newBoxW = Math.max(minW, initialBoxW + dx);
            newBoxH = Math.max(minH, initialBoxH - dy);
            newBoxY = initialBoxY + (initialBoxH - newBoxH);
          } else if (dragMode === "resize-nw") {
            newBoxW = Math.max(minW, initialBoxW - dx);
            newBoxH = Math.max(minH, initialBoxH - dy);
            newBoxX = initialBoxX + (initialBoxW - newBoxW);
            newBoxY = initialBoxY + (initialBoxH - newBoxH);
          } else if (dragMode === "resize-e") {
            newBoxW = Math.max(minW, initialBoxW + dx);
          } else if (dragMode === "resize-w") {
            newBoxW = Math.max(minW, initialBoxW - dx);
            newBoxX = initialBoxX + (initialBoxW - newBoxW);
          } else if (dragMode === "resize-s") {
            newBoxH = Math.max(minH, initialBoxH + dy);
          } else if (dragMode === "resize-n") {
            newBoxH = Math.max(minH, initialBoxH - dy);
            newBoxY = initialBoxY + (initialBoxH - newBoxH);
          }

          // Map bounding box origin back to slot anchor (x, y)
          const newX =
            slot.align === "left"
              ? newBoxX
              : slot.align === "right"
              ? newBoxX + newBoxW
              : newBoxX + newBoxW / 2;
          const newY = newBoxY + newBoxH / 2;

          onUpdateTextSlot({
            ...slot,
            x: Math.round(newX),
            y: Math.round(newY),
            width: Math.round(newBoxW),
            height: Math.round(newBoxH),
            maxWidth: Math.round(newBoxW),
          });
        }
      }
      return;
    }

    // When hovering without dragging, update cursor style dynamically
    updateHoverCursor(x, y);
  };

  const updateHoverCursor = (x: number, y: number) => {
    // 1. If photo slot selected, check handles & box
    if (selectedSlotId && selectedSlotType === "photo") {
      const slot = photoSlots.find((p) => p.id === selectedSlotId);
      if (slot) {
        const handle = getHitHandle(x, y, slot.x, slot.y, slot.width, slot.height, 28);
        if (handle !== "none") {
          setHoverCursor(getCursorForMode(handle));
          return;
        }
        if (x >= slot.x && x <= slot.x + slot.width && y >= slot.y && y <= slot.y + slot.height) {
          setHoverCursor("move");
          return;
        }
      }
    }

    // 2. If text slot selected, check handles & box
    if (selectedSlotId && selectedSlotType === "text") {
      const slot = textSlots.find((t) => t.id === selectedSlotId);
      if (slot) {
        const { boxX, boxY, boxW, boxH } = getTextSlotBoundingBox(slot);
        const handle = getHitHandle(x, y, boxX, boxY, boxW, boxH, 28);
        if (handle !== "none") {
          setHoverCursor(getCursorForMode(handle));
          return;
        }
        if (x >= boxX && x <= boxX + boxW && y >= boxY && y <= boxY + boxH) {
          setHoverCursor("move");
          return;
        }
      }
    }

    // 3. Check hover over any unselected photo slot
    for (const slot of photoSlots) {
      if (x >= slot.x && x <= slot.x + slot.width && y >= slot.y && y <= slot.y + slot.height) {
        setHoverCursor("pointer");
        return;
      }
    }

    // 4. Check hover over any unselected text slot
    for (const slot of textSlots) {
      const { boxX, boxY, boxW, boxH } = getTextSlotBoundingBox(slot);
      if (x >= boxX && x <= boxX + boxW && y >= boxY && y <= boxY + boxH) {
        setHoverCursor("pointer");
        return;
      }
    }

    setHoverCursor("crosshair");
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

  const activeCursor =
    dragMode === "move"
      ? "grabbing"
      : dragMode !== "none"
      ? getCursorForMode(dragMode)
      : hoverCursor;

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
                <Sparkles className="size-3" /> লাইভ প্রিভিউ মোড সক্রিয়
              </span>
            ) : selectedSlotId ? (
              <span className="text-brand-primary font-bold">
                স্লট সিলেক্টেড (যে কোনো কোণা টেনে রিশেপ বা মাঝখানে ধরে পজিশন করুন)
              </span>
            ) : (
              <span>স্লটে ক্লিক করে রিশেপ ও রিপজিশন করুন</span>
            )}
          </span>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setZoom((z) => Math.max(0.4, Number((z - 0.1).toFixed(1))))}
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
            onPointerLeave={handlePointerUp}
            className="max-w-full h-auto touch-none"
            style={{
              maxHeight: "min(680px, calc(100vh - 250px))",
              width: "auto",
              aspectRatio: `${width} / ${height}`,
              cursor: activeCursor,
            }}
          />
        </div>
      </div>
    </div>
  );
}
