export type AspectRatioType = "4:5" | "1:1" | "9:16";

export interface PhotoSlot {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  shape: "rectangle" | "rounded" | "circle" | "oval";
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  zIndex?: number;
}

export interface TextSlot {
  id: string;
  key: string; // e.g. "candidate_name", "designation", "area", "slogan", "banner_title", "courtesy", "symbol"
  label: string;
  defaultText: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  maxWidth?: number;
  fontSize: number;
  fontFamily: string;
  fontWeight: "normal" | "bold" | "800" | "900";
  color: string;
  align: "left" | "center" | "right";
  shadow?: boolean;
  shadowColor?: string;
  shadowBlur?: number;
  lineHeight?: number;
  zIndex?: number;
}

export interface TemplateCanvasConfig {
  type: "canvas";
  blankTemplateUrl: string;
  previewUrl?: string;
  width: number;
  height: number;
  photoSlots: PhotoSlot[];
  textSlots: TextSlot[];
}

export interface TemplateStudioState {
  title: string;
  categoryId: string;
  accessLevel: "FREE" | "PREMIUM";
  aspectRatio: AspectRatioType;
  width: number;
  height: number;
  previewUrl: string;
  blankTemplateUrl: string;
  photoSlots: PhotoSlot[];
  textSlots: TextSlot[];
  selectedSlotId: string | null;
  selectedSlotType: "photo" | "text" | null;
  isTestPreviewMode: boolean;
  zoomLevel: number;
}

export interface SampleCandidateData {
  name: string;
  designation: string;
  area: string;
  bannerTitle: string;
  slogan: string;
  courtesy: string;
  symbol: string;
  photoUrl: string;
  imageScale?: number;
  imageOffsetX?: number;
  imageOffsetY?: number;
}


export const ASPECT_RATIO_PRESETS: Record<
  AspectRatioType,
  { label: string; width: number; height: number; ratioString: string }
> = {
  "4:5": { label: "৪:৫ (স্ট্যান্ডার্ড পোস্টার)", width: 1080, height: 1350, ratioString: "4/5" },
  "1:1": { label: "১:১ (স্কয়ার সোশ্যাল মিডিয়া)", width: 1080, height: 1080, ratioString: "1/1" },
  "9:16": { label: "৯:১৬ (স্টোরি / রিলস)", width: 1080, height: 1920, ratioString: "9/16" },
};

export const DEFAULT_SAMPLE_CANDIDATE: SampleCandidateData = {
  name: "জনাব মোঃ আরিফুল ইসলাম",
  designation: "সাধারণ সম্পাদক পদপ্রার্থী",
  area: "ঢাকা-১০ সংসদীয় আসন",
  bannerTitle: "গণতন্ত্র ও জনগণের অধিকার আদায়ে",
  slogan: "জনগণের সেবায় নিবেদিতপ্রাণ, দুর্নীতির বিরুদ্ধে আপোষহীন কণ্ঠস্বর",
  courtesy: "এলাকাবাসী ও দলীয় সর্বস্তরের কর্মী-সমর্থক",
  symbol: "ধানের শীষ",
  photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
};

export const COMMON_TEXT_SLOT_PRESETS = [
  { key: "candidate_name", label: "প্রার্থীর নাম", defaultText: "জনাব মোঃ আরিফুল ইসলাম", fontSize: 44, color: "#ffffff", fontWeight: "bold" as const },
  { key: "designation", label: "পদবী / মার্কা", defaultText: "সাধারণ সম্পাদক পদপ্রার্থী", fontSize: 26, color: "#fbbf24", fontWeight: "bold" as const },
  { key: "area", label: "নির্বাচনী এলাকা", defaultText: "ঢাকা-১০ সংসদীয় আসন", fontSize: 22, color: "#6ee7b7", fontWeight: "normal" as const },
  { key: "banner_title", label: "ব্যানার শিরোনাম", defaultText: "গণতন্ত্র ও জনগণের অধিকার আদায়ে", fontSize: 24, color: "#fef08a", fontWeight: "bold" as const },
  { key: "slogan", label: "রাজনৈতিক স্লোগান", defaultText: "জনগণের সেবায় নিবেদিতপ্রাণ, দুর্নীতির বিরুদ্ধে আপোষহীন কণ্ঠস্বর", fontSize: 20, color: "#f1f5f9", fontWeight: "normal" as const },
  { key: "courtesy", label: "সৌজন্যে ও প্রচারে", defaultText: "সৌজন্যে: সর্বস্তরের জনতা", fontSize: 18, color: "#cbd5e1", fontWeight: "normal" as const },
];
