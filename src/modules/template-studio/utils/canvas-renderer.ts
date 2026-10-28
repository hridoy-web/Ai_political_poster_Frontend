import { PhotoSlot, TextSlot, SampleCandidateData } from "../types";

// In-memory image cache to prevent flicker during fast state changes
const imageCache = new Map<string, HTMLImageElement>();

export function loadImage(url: string): Promise<HTMLImageElement> {
  if (imageCache.has(url)) {
    const cached = imageCache.get(url)!;
    if (cached.complete) return Promise.resolve(cached);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imageCache.set(url, img);
      resolve(img);
    };
    img.onerror = (e) => reject(e);
    img.src = url;
  });
}

/**
 * Wraps text into multiple lines given a max width constraint on a 2D canvas context.
 */
export function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  if (!text) return [];
  if (!maxWidth || maxWidth <= 0) return text.split("\n");

  const rawParagraphs = text.split("\n");
  const lines: string[] = [];

  for (const para of rawParagraphs) {
    if (para.trim().length === 0) {
      lines.push("");
      continue;
    }
    const words = para.split(" ");
    let currentLine = "";

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine.length === 0 ? word : currentLine + " " + word;
      const testWidth = ctx.measureText(testLine).width;

      if (testWidth > maxWidth && currentLine.length > 0) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine.length > 0) {
      lines.push(currentLine);
    }
  }

  return lines.length > 0 ? lines : [text];
}

interface RenderCanvasOptions {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  blankTemplateUrl?: string;
  photoSlots: PhotoSlot[];
  textSlots: TextSlot[];
  selectedSlotId: string | null;
  selectedSlotType: "photo" | "text" | null;
  isTestPreviewMode: boolean;
  sampleCandidate: SampleCandidateData;
}

export async function renderTemplateCanvas({
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
}: RenderCanvasOptions): Promise<void> {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // 1. Draw Blank Template Background
  if (blankTemplateUrl) {
    try {
      const bgImg = await loadImage(blankTemplateUrl);
      ctx.drawImage(bgImg, 0, 0, width, height);
    } catch {
      // Fallback elegant gradient background
      drawPlaceholderBackground(ctx, width, height);
    }
  } else {
    drawPlaceholderBackground(ctx, width, height);
  }

  // 2. Render Slots
  if (isTestPreviewMode) {
    // === LIVE RENDER TEST MODE ===
    // Draw Photo Slots with Sample Candidate Photo
    for (const slot of photoSlots) {
      if (sampleCandidate.photoUrl) {
        try {
          const photoImg = await loadImage(sampleCandidate.photoUrl);
          ctx.save();

          // Clip to slot shape
          clipSlotShape(ctx, slot);
          ctx.clip();

          // Draw image centered and covering the slot
          const imgAspect = photoImg.width / photoImg.height;
          const slotAspect = slot.width / slot.height;
          let renderW = slot.width;
          let renderH = slot.height;
          let offsetX = slot.x;
          let offsetY = slot.y;

          if (imgAspect > slotAspect) {
            renderW = slot.height * imgAspect;
            offsetX = slot.x - (renderW - slot.width) / 2;
          } else {
            renderH = slot.width / imgAspect;
            offsetY = slot.y - (renderH - slot.height) / 2;
          }

          ctx.drawImage(photoImg, offsetX, offsetY, renderW, renderH);
          ctx.restore();

          // Optional Border Ring
          if (slot.borderWidth && slot.borderWidth > 0) {
            ctx.save();
            ctx.lineWidth = slot.borderWidth;
            ctx.strokeStyle = slot.borderColor || "#ffffff";
            clipSlotShape(ctx, slot);
            ctx.stroke();
            ctx.restore();
          }
        } catch {
          drawSlotPlaceholder(ctx, slot, "ফটো লোড হতে পারেনি");
        }
      } else {
        drawSlotPlaceholder(ctx, slot, "প্রার্থীর ছবি");
      }
    }

    // Draw Dynamic Bengali Text Slots
    for (const slot of textSlots) {
      const textToRender = getCandidateTextForSlot(slot.key, slot.defaultText, sampleCandidate);

      ctx.save();
      ctx.font = `${slot.fontWeight === "bold" ? "bold" : slot.fontWeight === "800" ? "800" : slot.fontWeight === "900" ? "900" : "normal"} ${slot.fontSize}px "${slot.fontFamily || "Noto Serif Bengali"}", "Hind Siliguri", sans-serif`;
      ctx.fillStyle = slot.color || "#ffffff";
      ctx.textAlign = slot.align || "center";
      ctx.textBaseline = "middle";

      if (slot.shadow !== false) {
        ctx.shadowColor = slot.shadowColor || "rgba(0,0,0,0.85)";
        ctx.shadowBlur = slot.shadowBlur ?? 6;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 2;
      }

      const boxW = slot.width || slot.maxWidth || width - 100;
      const lines = wrapCanvasText(ctx, textToRender, boxW);
      const lineHeight = slot.fontSize * (slot.lineHeight || 1.25);
      const startY = slot.y - ((lines.length - 1) * lineHeight) / 2;

      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], slot.x, startY + i * lineHeight);
      }

      ctx.restore();
    }
  } else {
    // === EDIT SLOTS MODE ===
    // 1. Draw Photo Slots
    for (const slot of photoSlots) {
      const isSelected = selectedSlotType === "photo" && selectedSlotId === slot.id;

      ctx.save();
      // Fill translucent tinted area
      ctx.fillStyle = isSelected ? "rgba(225, 29, 72, 0.25)" : "rgba(16, 185, 129, 0.18)";
      clipSlotShape(ctx, slot);
      ctx.fill();

      // Stroke outline
      ctx.lineWidth = isSelected ? 3 : 2;
      ctx.strokeStyle = isSelected ? "#e11d48" : "#10b981";
      if (!isSelected) {
        ctx.setLineDash([8, 6]);
      }
      clipSlotShape(ctx, slot);
      ctx.stroke();
      ctx.restore();

      // Badge label
      drawSlotLabel(ctx, slot.x, slot.y, `${slot.label} (${Math.round(slot.width)}×${Math.round(slot.height)})`, isSelected ? "#e11d48" : "#059669");

      // Draw resize handles if selected
      if (isSelected) {
        drawResizeHandles(ctx, slot.x, slot.y, slot.width, slot.height);
      }
    }

    // 2. Draw Text Slots
    for (const slot of textSlots) {
      const isSelected = selectedSlotType === "text" && selectedSlotId === slot.id;

      ctx.save();
      ctx.font = `${slot.fontWeight === "bold" ? "bold" : "normal"} ${slot.fontSize}px "${slot.fontFamily || "Noto Serif Bengali"}", "Hind Siliguri", sans-serif`;
      ctx.textAlign = slot.align || "center";
      ctx.textBaseline = "middle";

      const sampleText = slot.defaultText || slot.label;
      const boxW = slot.width || slot.maxWidth || 300;
      const lines = wrapCanvasText(ctx, sampleText, boxW);
      const lineHeight = slot.fontSize * (slot.lineHeight || 1.25);
      const textTotalHeight = lines.length * lineHeight;
      const boxH = slot.height || Math.max(textTotalHeight + 20, slot.fontSize + 24);

      let boxX = slot.x - boxW / 2;
      if (slot.align === "left") boxX = slot.x;
      if (slot.align === "right") boxX = slot.x - boxW;
      const boxY = slot.y - boxH / 2;

      // Background selection highlight
      ctx.fillStyle = isSelected ? "rgba(225, 29, 72, 0.2)" : "rgba(255, 255, 255, 0.08)";
      ctx.strokeStyle = isSelected ? "#e11d48" : "rgba(255, 255, 255, 0.35)";
      ctx.lineWidth = isSelected ? 2 : 1;
      if (!isSelected) {
        ctx.setLineDash([4, 4]);
      }
      ctx.beginPath();
      ctx.roundRect(boxX, boxY, boxW, boxH, 8);
      ctx.fill();
      ctx.stroke();

      // Draw the text
      ctx.fillStyle = slot.color || "#ffffff";
      if (slot.shadow !== false) {
        ctx.shadowColor = slot.shadowColor || "rgba(0,0,0,0.85)";
        ctx.shadowBlur = slot.shadowBlur ?? 5;
      }
      const startY = slot.y - ((lines.length - 1) * lineHeight) / 2;
      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], slot.x, startY + i * lineHeight);
      }
      ctx.restore();

      // Label badge
      drawSlotLabel(ctx, boxX, boxY, `${slot.label} (${Math.round(boxW)}×${Math.round(boxH)})`, isSelected ? "#e11d48" : "#3b82f6");

      // Draw resize/position handles if selected
      if (isSelected) {
        drawResizeHandles(ctx, boxX, boxY, boxW, boxH);
      }
    }
  }
}

function clipSlotShape(ctx: CanvasRenderingContext2D, slot: PhotoSlot) {
  ctx.beginPath();
  if (slot.shape === "circle") {
    const radius = Math.min(slot.width, slot.height) / 2;
    ctx.arc(slot.x + slot.width / 2, slot.y + slot.height / 2, radius, 0, Math.PI * 2);
  } else if (slot.shape === "oval") {
    ctx.ellipse(
      slot.x + slot.width / 2,
      slot.y + slot.height / 2,
      slot.width / 2,
      slot.height / 2,
      0,
      0,
      Math.PI * 2
    );
  } else {
    // rounded or rectangle
    const radius = slot.shape === "rounded" ? (slot.borderRadius ?? 20) : 0;
    ctx.roundRect(slot.x, slot.y, slot.width, slot.height, radius);
  }
}

function drawPlaceholderBackground(ctx: CanvasRenderingContext2D, width: number, height: number) {
  // Rich dark emerald to navy gradient
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, "#064e3b");
  grad.addColorStop(0.5, "#022c22");
  grad.addColorStop(1, "#0f172a");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Decorative border
  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.lineWidth = 12;
  ctx.strokeRect(16, 16, width - 32, height - 32);

  // Decorative inner gold line
  ctx.strokeStyle = "rgba(245, 158, 11, 0.3)";
  ctx.lineWidth = 2;
  ctx.strokeRect(26, 26, width - 52, height - 52);

  // Watermark text in center
  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
  ctx.font = "bold 38px 'Noto Serif Bengali', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("ব্ল্যাঙ্ক ব্যাকগ্রাউন্ড টেমপ্লেট আপলোড করুন", width / 2, height / 2 - 20);
  ctx.font = "20px 'Noto Serif Bengali', sans-serif";
  ctx.fillText("HTML5 Canvas 2D রেন্ডার ফ্রেমওয়ার্ক", width / 2, height / 2 + 25);
  ctx.restore();
}

function drawSlotLabel(ctx: CanvasRenderingContext2D, x: number, y: number, text: string, color: string) {
  ctx.save();
  ctx.font = "bold 13px 'Noto Serif Bengali', sans-serif";
  const textWidth = ctx.measureText(text).width;
  const paddingX = 8;
  const paddingY = 4;
  const h = 20;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(x, y - h, textWidth + paddingX * 2, h, 6);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x + paddingX, y - h / 2);
  ctx.restore();
}

function drawSlotPlaceholder(ctx: CanvasRenderingContext2D, slot: PhotoSlot, label: string) {
  ctx.save();
  ctx.fillStyle = "rgba(15, 23, 42, 0.75)";
  clipSlotShape(ctx, slot);
  ctx.fill();
  ctx.strokeStyle = "#fbbf24";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#fef08a";
  ctx.font = "bold 16px 'Noto Serif Bengali', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, slot.x + slot.width / 2, slot.y + slot.height / 2);
  ctx.restore();
}

function drawResizeHandles(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const handleSize = 12;
  const corners = [
    { x, y }, // top-left
    { x: x + w, y }, // top-right
    { x, y: y + h }, // bottom-left
    { x: x + w, y: y + h }, // bottom-right
    { x: x + w / 2, y }, // top-mid
    { x: x + w / 2, y: y + h }, // bottom-mid
    { x, y: y + h / 2 }, // left-mid
    { x: x + w, y: y + h / 2 }, // right-mid
  ];

  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#e11d48";
  ctx.lineWidth = 2.5;
  ctx.shadowColor = "rgba(0,0,0,0.35)";
  ctx.shadowBlur = 4;

  for (const c of corners) {
    ctx.beginPath();
    ctx.arc(c.x, c.y, handleSize / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

function getCandidateTextForSlot(key: string, defaultText: string, c: SampleCandidateData): string {
  switch (key) {
    case "candidate_name":
      return c.name || defaultText;
    case "designation":
      return c.designation || defaultText;
    case "area":
      return c.area || defaultText;
    case "banner_title":
      return c.bannerTitle || defaultText;
    case "slogan":
      return c.slogan || defaultText;
    case "courtesy":
      return c.courtesy || defaultText;
    case "symbol":
      return `মার্কা: ${c.symbol || "ধানের শীষ"}`;
    default:
      return defaultText || key;
  }
}
