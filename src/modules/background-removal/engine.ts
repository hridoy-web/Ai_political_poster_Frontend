import type { ProgressCallback, BackgroundRemovalOptions } from "./types";

/**
 * Converts a Blob to a base64 Data URL string
 */
export function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("blobToDataURL cannot execute on the server"));
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Smart Canvas-based fallback algorithm:
 * Analyzes the 4 image corners to sample background color tone,
 * then strips pixels within a color distance threshold or near-white/dark edges.
 */
export function executeCanvasSmartRemoval(
  imageSource: string | File | Blob
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Canvas 2D context is unavailable on server-side"));
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";

    let objectUrlToRevoke: string | null = null;
    if (typeof imageSource === "string") {
      img.src = imageSource;
    } else {
      objectUrlToRevoke = URL.createObjectURL(imageSource);
      img.src = objectUrlToRevoke;
    }

    img.onload = () => {
      if (objectUrlToRevoke) URL.revokeObjectURL(objectUrlToRevoke);

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });

      if (!ctx) {
        canvas.width = 0;
        canvas.height = 0;
        reject(new Error("Canvas 2D context unavailable"));
        return;
      }

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // 4 corners sampling for background tone
      const corners = [
        [0, 0],
        [canvas.width - 1, 0],
        [0, canvas.height - 1],
        [canvas.width - 1, canvas.height - 1],
      ];

      let bgR = 0,
        bgG = 0,
        bgB = 0;
      corners.forEach(([x, y]) => {
        const idx = (y * canvas.width + x) * 4;
        bgR += data[idx];
        bgG += data[idx + 1];
        bgB += data[idx + 2];
      });
      bgR /= 4;
      bgG /= 4;
      bgB /= 4;

      const threshold = 55;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const dist = Math.sqrt(
          (r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2
        );
        const isNearWhite = r > 225 && g > 225 && b > 225;
        const isNearDark = r < 35 && g < 35 && b < 35 && bgR < 50;

        if (dist < threshold || isNearWhite || isNearDark) {
          data[i + 3] = 0; // Set Alpha to 0 (Transparent)
        }
      }

      ctx.putImageData(imgData, 0, 0);
      const resultDataUrl = canvas.toDataURL("image/png");

      // Memory Optimization: Immediately release GPU VRAM & backing canvas buffers
      canvas.width = 0;
      canvas.height = 0;

      resolve(resultDataUrl);
    };

    img.onerror = (err) => {
      if (objectUrlToRevoke) URL.revokeObjectURL(objectUrlToRevoke);
      reject(err);
    };
  });
}

/**
 * Automatically downsizes huge high-res images (e.g. 4000x3000) down to a max dimension
 * before running neural network inference. Accelerates AI processing by 3-5x without
 * any perceptible loss in portrait segmentation accuracy.
 */
export function downscaleImageIfNeeded(
  imageSource: string | File | Blob,
  maxDimension = 1200
): Promise<Blob | string> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(imageSource);
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    let objectUrlToRevoke: string | null = null;

    if (typeof imageSource === "string") {
      img.src = imageSource;
    } else {
      objectUrlToRevoke = URL.createObjectURL(imageSource);
      img.src = objectUrlToRevoke;
    }

    img.onload = () => {
      if (objectUrlToRevoke) URL.revokeObjectURL(objectUrlToRevoke);

      const width = img.naturalWidth || img.width;
      const height = img.naturalHeight || img.height;

      // If already within optimal size, skip resizing
      if (width <= maxDimension && height <= maxDimension) {
        resolve(imageSource);
        return;
      }

      // Calculate aspect-ratio preserved dimensions
      let newWidth = width;
      let newHeight = height;
      if (width > height) {
        newWidth = maxDimension;
        newHeight = Math.round((height * maxDimension) / width);
      } else {
        newHeight = maxDimension;
        newWidth = Math.round((width * maxDimension) / height);
      }

      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        canvas.width = 0;
        canvas.height = 0;
        resolve(imageSource);
        return;
      }

      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      canvas.toBlob(
        (blob) => {
          // Memory Optimization: Release GPU VRAM & canvas memory
          canvas.width = 0;
          canvas.height = 0;
          resolve(blob || imageSource);
        },
        "image/jpeg",
        0.92
      );
    };

    img.onerror = () => {
      if (objectUrlToRevoke) URL.revokeObjectURL(objectUrlToRevoke);
      resolve(imageSource);
    };
  });
}

let preloadPromise: Promise<void> | null = null;

/**
 * Pre-warms / pre-downloads the AI model in background idle time
 * so user's first click is instant without initial model download lag.
 */
export function preloadBackgroundRemovalModel(
  options?: BackgroundRemovalOptions
): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (preloadPromise) return preloadPromise;

  preloadPromise = (async () => {
    try {
      const { preload } = await import("@imgly/background-removal");
      await preload({
        publicPath: options?.publicPath,
        model: options?.model ?? (options?.fastMode ? "isnet_quint8" : "isnet_fp16"),
      });
    } catch {
      // Graceful fallback if preload fails
    }
  })();

  return preloadPromise;
}

/**
 * Client-side background removal with automatic smart canvas fallback
 * Uses on-demand dynamic import of @imgly/background-removal and pre-scaling optimization.
 */
export async function removeImageBackground(
  imageSource: string | File | Blob,
  onProgress?: ProgressCallback,
  options?: BackgroundRemovalOptions
): Promise<string> {
  if (typeof window === "undefined") {
    throw new Error("removeImageBackground must run on the client side.");
  }

  if (options?.forceCanvasFallback) {
    onProgress?.(50, "স্মার্ট অ্যালগরিদমে রিমুভ হচ্ছে...");
    const fallbackData = await executeCanvasSmartRemoval(imageSource);
    onProgress?.(100, "সম্পন্ন!");
    return fallbackData;
  }

  try {
    // Speed Optimization 1: Auto Downscale if image is huge
    const maxDim = options?.maxDimension ?? 1200;
    onProgress?.(5, "ছবি অপ্টিমাইজ ও সাইজ প্রস্তুত হচ্ছে...");
    const optimizedSource = await downscaleImageIfNeeded(imageSource, maxDim);

    onProgress?.(15, "মডেল লোড ও স্ক্যান হচ্ছে...");

    // On-demand dynamic import to ensure zero SSR build bloat
    const { removeBackground } = await import("@imgly/background-removal");

    onProgress?.(35, "এআই ব্যাকগ্রাউন্ড আলাদা করছে...");

    const blob = await removeBackground(optimizedSource, {
      publicPath: options?.publicPath,
      model: options?.model ?? (options?.fastMode ? "isnet_quint8" : "isnet_fp16"),
      progress: (_key: string, current: number, total: number) => {
        if (total > 0) {
          const percent = Math.min(95, Math.round((current / total) * 100));
          onProgress?.(percent, `প্রসেসিং: ${percent}%`);
        }
      },
    });

    onProgress?.(100, "সম্পন্ন!");
    return await blobToDataURL(blob);
  } catch (error) {
    console.warn(
      "AI background removal model encountered an error, activating smart edge fallback:",
      error
    );
    onProgress?.(50, "স্মার্ট অ্যালগরিদমে রিমুভ হচ্ছে...");
    const fallbackResult = await executeCanvasSmartRemoval(imageSource);
    onProgress?.(100, "সম্পন্ন!");
    return fallbackResult;
  }
}
