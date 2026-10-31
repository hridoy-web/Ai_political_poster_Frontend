"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import {
  PhotoSlot,
  TextSlot,
  AspectRatioType,
  ASPECT_RATIO_PRESETS,
  DEFAULT_SAMPLE_CANDIDATE,
  SampleCandidateData,
  COMMON_TEXT_SLOT_PRESETS,
} from "../types";
import { TemplateCanvasEditor } from "./template-canvas-editor";
import { SlotPropertiesPanel } from "./slot-properties-panel";
import { DeviceImageUploader } from "./device-image-uploader";
import { serverURL } from "@/lib/api/authApi";
import {
  ArrowLeft,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  Eye,
  Sliders,
  Layers,
  Crown,
  FileImage,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CategoryOption {
  id: string;
  name: string;
  slug: string;
}

export function TemplateStudioWorkspace() {
  const router = useRouter();

  // Categories state
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Core Form State
  const [title, setTitle] = useState("জাতীয় সংসদ নির্বাচন ক্যানভাস ২০২৬");
  const [categoryId, setCategoryId] = useState("");
  const [accessLevel, setAccessLevel] = useState<"FREE" | "PREMIUM">("FREE");
  const [aspectRatio, setAspectRatio] = useState<AspectRatioType>("4:5");

  // Assets (The two key images requested)
  // 1. Preview Image (catalog demo poster shown to users)
  const [previewUrl, setPreviewUrl] = useState("");
  // 2. Blank Template (blank background for HTML5 Canvas 2D)
  const [blankTemplateUrl, setBlankTemplateUrl] = useState("");

  // Slots State
  const [photoSlots, setPhotoSlots] = useState<PhotoSlot[]>([
    {
      id: "candidate-photo-main",
      label: "প্রধান প্রার্থীর ছবি",
      x: 390,
      y: 340,
      width: 300,
      height: 380,
      shape: "rounded",
      borderRadius: 24,
      borderWidth: 0,
      borderColor: "#fbbf24",
      zIndex: 1,
    },
  ]);

  const [textSlots, setTextSlots] = useState<TextSlot[]>([
    {
      id: "txt-banner-title",
      key: "banner_title",
      label: "ব্যানার শিরোনাম",
      defaultText: "গণতন্ত্র ও জনগণের অধিকার আদায়ে",
      x: 540,
      y: 280,
      width: 900,
      height: 50,
      maxWidth: 900,
      fontSize: 26,
      fontFamily: "Noto Serif Bengali",
      fontWeight: "bold",
      color: "#fef08a",
      align: "center",
      shadow: true,
      zIndex: 2,
    },
    {
      id: "txt-candidate-name",
      key: "candidate_name",
      label: "প্রার্থীর নাম",
      defaultText: "জনাব মোঃ আরিফুল ইসলাম",
      x: 540,
      y: 770,
      width: 900,
      height: 70,
      maxWidth: 900,
      fontSize: 48,
      fontFamily: "Noto Serif Bengali",
      fontWeight: "bold",
      color: "#ffffff",
      align: "center",
      shadow: true,
      zIndex: 2,
    },
    {
      id: "txt-designation",
      key: "designation",
      label: "পদবী / মার্কা",
      defaultText: "সাধারণ সম্পাদক পদপ্রার্থী • মার্কা: ধানের শীষ",
      x: 540,
      y: 840,
      width: 900,
      height: 50,
      maxWidth: 900,
      fontSize: 26,
      fontFamily: "Noto Serif Bengali",
      fontWeight: "bold",
      color: "#fbbf24",
      align: "center",
      shadow: true,
      zIndex: 2,
    },
    {
      id: "txt-area",
      key: "area",
      label: "নির্বাচনী এলাকা",
      defaultText: "ঢাকা-১০ সংসদীয় আসন",
      x: 540,
      y: 895,
      width: 800,
      height: 45,
      maxWidth: 800,
      fontSize: 22,
      fontFamily: "Noto Serif Bengali",
      fontWeight: "normal",
      color: "#6ee7b7",
      align: "center",
      shadow: true,
      zIndex: 2,
    },
    {
      id: "txt-slogan",
      key: "slogan",
      label: "রাজনৈতিক স্লোগান",
      defaultText: "জনগণের সেবায় নিবেদিতপ্রাণ, দুর্নীতির বিরুদ্ধে আপোষহীন কণ্ঠস্বর",
      x: 540,
      y: 980,
      width: 780,
      height: 55,
      maxWidth: 780,
      fontSize: 20,
      fontFamily: "Noto Serif Bengali",
      fontWeight: "normal",
      color: "#f1f5f9",
      align: "center",
      shadow: true,
      zIndex: 2,
    },
    {
      id: "txt-courtesy",
      key: "courtesy",
      label: "সৌজন্যে ও প্রচারে",
      defaultText: "সৌজন্যে ও প্রচারে: সর্বস্তরের জনতা ও দলীয় নেতাকর্মী",
      x: 540,
      y: 1280,
      width: 850,
      height: 45,
      maxWidth: 850,
      fontSize: 18,
      fontFamily: "Noto Serif Bengali",
      fontWeight: "normal",
      color: "#e2e8f0",
      align: "center",
      shadow: true,
      zIndex: 2,
    },
  ]);

  // Selection & Mode State
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>("candidate-photo-main");
  const [selectedSlotType, setSelectedSlotType] = useState<"photo" | "text" | null>("photo");
  const [isTestPreviewMode, setIsTestPreviewMode] = useState(false);
  const [sampleCandidate, setSampleCandidate] = useState<SampleCandidateData>(DEFAULT_SAMPLE_CANDIDATE);
  const [isPublishing, setIsPublishing] = useState(false);

  // Canvas Dimensions calculated from aspect ratio preset
  const canvasWidth = ASPECT_RATIO_PRESETS[aspectRatio].width;
  const canvasHeight = ASPECT_RATIO_PRESETS[aspectRatio].height;

  // Fetch categories from backend
  useEffect(() => {
    async function loadCategories() {
      try {
        setIsLoadingCategories(true);
        const res = await axios.get(`${serverURL}/api/v1/category`, {
          withCredentials: true,
        });
        if (res.data?.success && Array.isArray(res.data.data)) {
          setCategories(res.data.data);
          if (res.data.data.length > 0) {
            setCategoryId(res.data.data[0].id);
          }
        }
      } catch {
        // Fallback default category
        const fallback = [
          { id: "7dae81a2-f9ed-4acf-8910-6ecdd2cb442f", name: "রাজনৈতিক পোস্টার", slug: "political-posters" },
          { id: "0e307770-b69a-4fc0-86e6-6f0c1057ff5c", name: "নির্বাচনী পোস্টার নতুন", slug: "election-poster-new" },
        ];
        setCategories(fallback);
        setCategoryId(fallback[0].id);
      } finally {
        setIsLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

  // Handlers for Slots
  const handleAddPhotoSlot = () => {
    const newSlot: PhotoSlot = {
      id: `photo-slot-${Date.now()}`,
      label: `ফটো স্লট ${photoSlots.length + 1}`,
      x: Math.round(canvasWidth / 2 - 125),
      y: Math.round(canvasHeight / 2 - 150),
      width: 250,
      height: 300,
      shape: "rounded",
      borderRadius: 16,
      borderWidth: 0,
      borderColor: "#ffffff",
      zIndex: photoSlots.length + 1,
    };
    setPhotoSlots((prev) => [...prev, newSlot]);
    setSelectedSlotId(newSlot.id);
    setSelectedSlotType("photo");
  };

  const handleAddTextSlot = (preset?: (typeof COMMON_TEXT_SLOT_PRESETS)[0]) => {
    const newSlot: TextSlot = {
      id: `text-slot-${Date.now()}`,
      key: preset ? preset.key : `custom_text_${textSlots.length + 1}`,
      label: preset ? preset.label : `কাস্টম টেক্সট ${textSlots.length + 1}`,
      defaultText: preset ? preset.defaultText : "এখানে আপনার কাস্টম লেখা লিখুন",
      x: Math.round(canvasWidth / 2),
      y: Math.round(canvasHeight / 2),
      width: 750,
      height: 60,
      maxWidth: 750,
      fontSize: preset ? preset.fontSize : 28,
      fontFamily: "Noto Serif Bengali",
      fontWeight: preset ? (preset.fontWeight as any) : "bold",
      color: preset ? preset.color : "#ffffff",
      align: "center",
      shadow: true,
      zIndex: textSlots.length + 1,
    };
    setTextSlots((prev) => [...prev, newSlot]);
    setSelectedSlotId(newSlot.id);
    setSelectedSlotType("text");
  };

  const handleUpdatePhotoSlot = (updated: PhotoSlot) => {
    setPhotoSlots((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handleUpdateTextSlot = (updated: TextSlot) => {
    setTextSlots((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handleDeleteSlot = (id: string, type: "photo" | "text") => {
    if (type === "photo") {
      setPhotoSlots((prev) => prev.filter((s) => s.id !== id));
    } else {
      setTextSlots((prev) => prev.filter((s) => s.id !== id));
    }
    if (selectedSlotId === id) {
      setSelectedSlotId(null);
      setSelectedSlotType(null);
    }
  };

  // Helper to optimize/compress raw device images to high-quality lightweight WebP/JPEG
  const compressImageFile = (file: File, maxDim = 1920, quality = 0.85): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const rawUrl = e.target?.result as string;
        if (!rawUrl) return resolve("");
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
            resolve(rawUrl);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          try {
            const optimized = canvas.toDataURL("image/webp", quality);
            resolve(optimized);
          } catch {
            resolve(rawUrl);
          }
        };
        img.onerror = () => resolve(rawUrl);
        img.src = rawUrl;
      };
      reader.onerror = () => resolve("");
      reader.readAsDataURL(file);
    });
  };

  // Image Upload handler (with instant client compression)
  const handleLocalImageUpload = async (file: File, target: "preview" | "blank") => {
    try {
      const optimizedUrl = await compressImageFile(file);
      if (optimizedUrl) {
        if (target === "preview") {
          setPreviewUrl(optimizedUrl);
        } else {
          setBlankTemplateUrl(optimizedUrl);
        }
        return;
      }
    } catch (err) {
      console.warn("Client compression failed, falling back to direct data URL", err);
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        if (target === "preview") {
          setPreviewUrl(e.target.result as string);
        } else {
          setBlankTemplateUrl(e.target.result as string);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Ensure any base64 data URL is compressed before transmission
  const ensureOptimizedDataUrl = (
    dataUrl: string,
    maxDim = 1600,
    quality = 0.82
  ): Promise<string> => {
    if (!dataUrl || !dataUrl.startsWith("data:image/")) {
      return Promise.resolve(dataUrl);
    }
    // If already lightweight (< 400KB string length), don't re-compress
    if (dataUrl.length < 400 * 1024) {
      return Promise.resolve(dataUrl);
    }
    return new Promise((resolve) => {
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
        if (!ctx) return resolve(dataUrl);
        ctx.drawImage(img, 0, 0, width, height);
        try {
          const webp = canvas.toDataURL("image/webp", quality);
          resolve(webp);
        } catch {
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  };

  // Publish Template to Backend
  const handlePublishTemplate = async () => {
    if (!title.trim()) {
      toast.error("অনুগ্রহ করে একটি টেমপ্লেট টাইটেল প্রদান করুন।");
      return;
    }
    if (!categoryId) {
      toast.error("অনুগ্রহ করে একটি ক্যাটাগরি সিলেক্ট করুন।");
      return;
    }
    if (!blankTemplateUrl) {
      toast.error("অনুগ্রহ করে একটি ব্ল্যাঙ্ক ব্যাকগ্রাউন্ড টেমপ্লেট আপলোড করুন।");
      return;
    }

    try {
      setIsPublishing(true);

      // 1. Optimize blank template URL
      const finalBlankUrl = await ensureOptimizedDataUrl(blankTemplateUrl, 1600, 0.82);

      // 2. Prepare lightweight preview URL (max 600px width if generated from blank)
      let finalPreviewUrl = previewUrl;
      if (finalPreviewUrl) {
        finalPreviewUrl = await ensureOptimizedDataUrl(finalPreviewUrl, 1000, 0.8);
      } else {
        finalPreviewUrl = await ensureOptimizedDataUrl(finalBlankUrl, 600, 0.75);
      }

      const templatePayload = {
        title: title.trim(),
        categoryId,
        accessLevel,
        aspectRatio,
        width: canvasWidth,
        height: canvasHeight,
        config: {
          type: "canvas",
          blankTemplateUrl: finalBlankUrl,
          previewUrl: finalPreviewUrl,
          width: canvasWidth,
          height: canvasHeight,
          photoSlots,
          textSlots,
        },
      };

      // 1. Create Template (DRAFT) with timeout
      const res = await axios.post(`${serverURL}/api/v1/template`, templatePayload, {
        withCredentials: true,
        timeout: 20000,
      });

      const createdTemplate = res.data?.data;
      if (!createdTemplate?.id) {
        throw new Error("টমপ্লেট তৈরি করতে ব্যর্থ হয়েছে।");
      }

      // 2. Publish Template with timeout
      await axios.post(
        `${serverURL}/api/v1/template/${createdTemplate.id}/publish`,
        {},
        { withCredentials: true, timeout: 20000 }
      );

      toast.success("টেমপ্লেট সফলভাবে তৈরি এবং পাবলিশ করা হয়েছে!");
      setIsPublishing(false);
      // Hard navigation to guarantee fresh catalog state
      window.location.href = "/admin/templates";
    } catch (err: any) {
      console.error("Failed to publish template:", err);
      const msg = err.response?.data?.message || err.message || "টেমপ্লেট সেভ হতে ব্যর্থ হয়েছে।";
      toast.error(msg);
      setIsPublishing(false);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* ================= HEADER BAR ================= */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-3xl bg-card/90 backdrop-blur-xl border border-border/80 shadow-md">
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="size-9 rounded-xl hover:bg-muted"
          >
            <Link href="/admin/templates">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                HTML5 Canvas 2D স্টুডিও
              </span>
              <span className="text-xs text-muted-foreground">• টেমপ্লেট মেকার</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Layers className="size-5 text-brand-primary" />
              <span>টেমপ্লেট ম্যানেজার স্টুডিও</span>
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Toggle Mode Button */}
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsTestPreviewMode(!isTestPreviewMode)}
            className={`rounded-2xl h-10 px-4 text-xs font-semibold gap-1.5 transition-all ${
              isTestPreviewMode
                ? "bg-emerald-600/15 border-emerald-600/30 text-emerald-600 dark:text-emerald-400 font-bold"
                : "hover:bg-muted"
            }`}
          >
            {isTestPreviewMode ? (
              <>
                <Sliders className="size-3.5" /> স্লট এডিট মোডে ফিরুন
              </>
            ) : (
              <>
                <Eye className="size-3.5 text-brand-primary" /> লাইভ টেস্ট প্রিভিউ দেখুন
              </>
            )}
          </Button>

          {/* Publish Button */}
          <Button
            type="button"
            onClick={handlePublishTemplate}
            disabled={isPublishing}
            className="bg-gradient-brand text-white font-semibold rounded-2xl h-10 px-5 shadow-md shadow-brand-primary/20 hover:opacity-90 gap-2 text-xs sm:text-sm"
          >
            {isPublishing ? (
              <>
                <Loader2 className="size-4 animate-spin" /> পাবলিশ হচ্ছে...
              </>
            ) : (
              <>
                <CheckCircle2 className="size-4" /> টেমপ্লেট পাবলিশ করুন
              </>
            )}
          </Button>
        </div>
      </div>

      {/* ================= STEP 1: TEMPLATE METADATA & ASSETS ACCORDION ================= */}
      <div className="p-4 sm:p-5 rounded-3xl bg-card/80 backdrop-blur-xl border border-border/80 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Title */}
          <div className="md:col-span-5 space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground">
              টেমপ্লেট টাইটেল
            </Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="যেমন: ইউনিয়ন পরিষদ ক্যানভাস ২০২৬"
              className="h-10 rounded-2xl bg-background"
            />
          </div>

          {/* Category */}
          <div className="md:col-span-3 space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground">
              ক্যাটাগরি
            </Label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full h-10 rounded-2xl bg-background border border-input px-3 text-xs outline-none focus:border-brand-primary"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Aspect Ratio */}
          <div className="md:col-span-2 space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground">
              অ্যাসপেক্ট রেশিও
            </Label>
            <select
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value as AspectRatioType)}
              className="w-full h-10 rounded-2xl bg-background border border-input px-3 text-xs outline-none focus:border-brand-primary"
            >
              {(Object.keys(ASPECT_RATIO_PRESETS) as AspectRatioType[]).map((key) => (
                <option key={key} value={key}>
                  {ASPECT_RATIO_PRESETS[key].label}
                </option>
              ))}
            </select>
          </div>

          {/* Access Level */}
          <div className="md:col-span-2 space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground">
              অ্যাক্সেস লেভেল
            </Label>
            <div className="grid grid-cols-2 gap-1 p-1 bg-muted/50 rounded-2xl border border-border">
              <button
                type="button"
                onClick={() => setAccessLevel("FREE")}
                className={`py-1.5 rounded-xl text-xs font-bold transition-all ${
                  accessLevel === "FREE"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                ফ্রি
              </button>
              <button
                type="button"
                onClick={() => setAccessLevel("PREMIUM")}
                className={`flex items-center justify-center gap-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  accessLevel === "PREMIUM"
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Crown className="size-3" /> প্রো
              </button>
            </div>
          </div>
        </div>

        {/* Two Device Image Uploaders (The core feature requested by the user) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border/40">
          {/* 1. Preview Image (catalog demo poster) */}
          <DeviceImageUploader
            label="১. ক্যাটালগ প্রিভিউ ছবি"
            badgeText="ব্যবহারকারীরা যা দেখবে"
            description="ডিভাইস থেকে তৈরি পোস্টারের একটি আকর্ষণীয় প্রিভিউ আপলোড করুন যা সাধারণ ইউজাররা ক্যাটালগে দেখবে।"
            accent="primary"
            currentImageUrl={previewUrl}
            onImageSelected={(dataUrl) => setPreviewUrl(dataUrl)}
            onClear={() => setPreviewUrl("")}
          />

          {/* 2. Blank Background Canvas Template */}
          <DeviceImageUploader
            label="২. ব্ল্যাঙ্ক ব্যাকগ্রাউন্ড ক্যানভাস"
            badgeText="HTML5 Canvas 2D ব্যাকগ্রাউন্ড"
            description="প্রার্থীর ছবি ও লেখা ছাড়া মূল র ব্যাকগ্রাউন্ড ফ্রেম আপলোড করুন যা সরাসরি 2D ক্যানভাসে লোড হবে।"
            accent="emerald"
            currentImageUrl={blankTemplateUrl}
            onImageSelected={(dataUrl) => setBlankTemplateUrl(dataUrl)}
            onClear={() => setBlankTemplateUrl("")}
          />
        </div>
      </div>

      {/* ================= STEP 2: INTERACTIVE CANVAS STUDIO ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left / Center: Interactive HTML5 Canvas 2D */}
        <div className="lg:col-span-8 w-full">
          <TemplateCanvasEditor
            width={canvasWidth}
            height={canvasHeight}
            blankTemplateUrl={blankTemplateUrl}
            photoSlots={photoSlots}
            textSlots={textSlots}
            selectedSlotId={selectedSlotId}
            selectedSlotType={selectedSlotType}
            isTestPreviewMode={isTestPreviewMode}
            sampleCandidate={sampleCandidate}
            onSelectSlot={(id, type) => {
              setSelectedSlotId(id);
              setSelectedSlotType(type);
            }}
            onUpdatePhotoSlot={handleUpdatePhotoSlot}
            onUpdateTextSlot={handleUpdateTextSlot}
          />
        </div>

        {/* Right: Slot Inspector & Properties Panel */}
        <div className="lg:col-span-4 w-full sticky top-4">
          <div className="h-[min(680px,calc(100vh-140px))]">
            <SlotPropertiesPanel
              photoSlots={photoSlots}
              textSlots={textSlots}
              selectedSlotId={selectedSlotId}
              selectedSlotType={selectedSlotType}
              sampleCandidate={sampleCandidate}
              onSelectSlot={(id, type) => {
                setSelectedSlotId(id);
                setSelectedSlotType(type);
              }}
              onAddPhotoSlot={handleAddPhotoSlot}
              onAddTextSlot={handleAddTextSlot}
              onUpdatePhotoSlot={handleUpdatePhotoSlot}
              onUpdateTextSlot={handleUpdateTextSlot}
              onDeleteSlot={handleDeleteSlot}
              onUpdateSampleCandidate={setSampleCandidate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
