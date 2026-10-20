/**
 * Types & Interfaces for Client-Side Background Removal Module
 */

export type ProgressCallback = (percent: number, message: string) => void;

export interface BackgroundRemovalOptions {
  /** Optional custom CDN or public path for @imgly assets */
  publicPath?: string;
  /** Force fallback to smart canvas without attempting ML model */
  forceCanvasFallback?: boolean;
  /**
   * Maximum dimension in pixels for in-memory pre-scaling (default: 1200px).
   * Accelerates inference speed by 3-5x on high-resolution camera uploads.
   */
  maxDimension?: number;
  /**
   * Set to true to use fast quantized 8-bit model optimization ('isnet_quint8')
   */
  fastMode?: boolean;
  /**
   * Explicit model variant: 'isnet_quint8' (fastest, quantized), 'isnet_fp16' (standard), or 'isnet'
   */
  model?: "isnet" | "isnet_fp16" | "isnet_quint8";
}

export interface UseBackgroundRemovalReturn {
  /** True while the model is downloading or processing the image */
  isProcessing: boolean;
  /** Human-readable status message in Bengali (e.g., 'মডেল লোড ও স্ক্যান হচ্ছে...') */
  progressText: string;
  /** Progress percentage integer from 0 to 100 */
  progressPercent: number;
  /** Data URL or object URL of the original uploaded photo */
  originalPhotoUrl: string | null;
  /** Boolean indicating if an original photo exists in state */
  hasOriginal: boolean;
  /**
   * Main function: removes background from a File, Blob, or image URL.
   * Resolves with transparent PNG data URL, or null if failed.
   */
  removeBg: (imageSource: string | File | Blob) => Promise<string | null>;
  /**
   * Reverts back to the original photo before background removal.
   */
  revertToOriginal: () => string | null;
  /**
   * Manually set an original photo URL in state
   */
  setOriginalPhoto: (url: string) => void;
  /**
   * Resets all progress, flags, and image states to initial values
   */
  resetBgState: () => void;
}
