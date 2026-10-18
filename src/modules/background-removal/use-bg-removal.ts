"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { removeImageBackground, preloadBackgroundRemovalModel } from "./engine";
import type { UseBackgroundRemovalReturn, BackgroundRemovalOptions } from "./types";

/**
 * Custom React Hook for in-browser client-side background removal.
 * Ultra-Optimized with:
 * 1. Concurrency Locking (prevents parallel/duplicate inference triggers)
 * 2. RAM Lifecycle Cleanup (tracks & revokes created Blob URLs to prevent memory leaks)
 * 3. Background Idle Pre-warming (instant first-click processing)
 */
export function useBackgroundRemoval(
  options?: BackgroundRemovalOptions
): UseBackgroundRemovalReturn {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progressText, setProgressText] = useState<string>("");
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [originalPhotoUrl, setOriginalPhotoUrl] = useState<string | null>(null);

  // Ultra-Optimization 1: Concurrency Lock Ref to prevent rapid double-clicks
  const isProcessingRef = useRef<boolean>(false);

  // Ultra-Optimization 2: Track created blob: URLs for deterministic RAM cleanup
  const createdBlobUrlsRef = useRef<Set<string>>(new Set());

  const registerBlobUrl = useCallback((url: string): string => {
    if (typeof window !== "undefined" && url.startsWith("blob:")) {
      createdBlobUrlsRef.current.add(url);
    }
    return url;
  }, []);

  const revokeBlobUrl = useCallback((url: string | null) => {
    if (typeof window !== "undefined" && url && createdBlobUrlsRef.current.has(url)) {
      try {
        URL.revokeObjectURL(url);
      } catch {
        // Safe fallback
      }
      createdBlobUrlsRef.current.delete(url);
    }
  }, []);

  const revokeAllBlobUrls = useCallback(() => {
    if (typeof window === "undefined") return;
    createdBlobUrlsRef.current.forEach((url) => {
      try {
        URL.revokeObjectURL(url);
      } catch {
        // Safe fallback
      }
    });
    createdBlobUrlsRef.current.clear();
  }, []);

  // Safe cleanup on component unmount to ensure 0 MB memory leak
  useEffect(() => {
    return () => {
      revokeAllBlobUrls();
    };
  }, [revokeAllBlobUrls]);

  // Pre-warm the model in background idle time for instant first-click response
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("requestIdleCallback" in window) {
      const handle = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(() => {
        preloadBackgroundRemovalModel(options);
      });
      return () => {
        if ("cancelIdleCallback" in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
        }
      };
    } else {
      const timer = setTimeout(() => {
        preloadBackgroundRemovalModel(options);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [options]);

  const removeBg = useCallback(
    async (imageSource: string | File | Blob): Promise<string | null> => {
      if (!imageSource) return null;

      // Concurrency Lock: Reject if already processing
      if (isProcessingRef.current) {
        console.warn("Background removal is already in progress. Ignoring concurrent trigger.");
        return null;
      }

      isProcessingRef.current = true;
      setIsProcessing(true);
      setProgressPercent(10);
      setProgressText("মডেল লোড ও স্ক্যান হচ্ছে...");

      // Save original URL snapshot if not already stored
      if (typeof imageSource === "string" && !originalPhotoUrl) {
        setOriginalPhotoUrl(imageSource);
      } else if (imageSource instanceof Blob && !originalPhotoUrl) {
        try {
          const originalDataUrl = registerBlobUrl(URL.createObjectURL(imageSource));
          setOriginalPhotoUrl(originalDataUrl);
        } catch {
          // Ignore if object url generation fails
        }
      }

      try {
        const transparentUrl = await removeImageBackground(
          imageSource,
          (percent, msg) => {
            setProgressPercent(percent);
            setProgressText(msg);
          },
          options
        );

        setProgressText("সম্পন্ন!");
        setProgressPercent(100);
        return transparentUrl;
      } catch (error) {
        console.error("Background removal processing failed:", error);
        setProgressText("ব্যর্থ হয়েছে");
        setProgressPercent(0);
        return null;
      } finally {
        isProcessingRef.current = false;
        setIsProcessing(false);
      }
    },
    [originalPhotoUrl, options, registerBlobUrl]
  );

  const revertToOriginal = useCallback((): string | null => {
    return originalPhotoUrl;
  }, [originalPhotoUrl]);

  const setOriginalPhoto = useCallback(
    (url: string) => {
      if (originalPhotoUrl && originalPhotoUrl !== url) {
        revokeBlobUrl(originalPhotoUrl);
      }
      registerBlobUrl(url);
      setOriginalPhotoUrl(url);
    },
    [originalPhotoUrl, registerBlobUrl, revokeBlobUrl]
  );

  const resetBgState = useCallback(() => {
    revokeAllBlobUrls();
    isProcessingRef.current = false;
    setIsProcessing(false);
    setProgressText("");
    setProgressPercent(0);
    setOriginalPhotoUrl(null);
  }, [revokeAllBlobUrls]);

  return {
    isProcessing,
    progressText,
    progressPercent,
    originalPhotoUrl,
    hasOriginal: Boolean(originalPhotoUrl),
    removeBg,
    revertToOriginal,
    setOriginalPhoto,
    resetBgState,
  };
}
