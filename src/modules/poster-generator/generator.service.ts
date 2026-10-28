import axios from "axios";
import { serverURL } from "@/lib/api/authApi";
import {
  CandidateInfo,
  GeneratedSloganItem,
  PosterRenderResult,
  SloganTopicOption,
} from "./generator.types";

export const SLOGAN_TOPICS: SloganTopicOption[] = [
  { id: "youth", label: "তারুণ্য", icon: "zap" },
  { id: "development", label: "উন্নয়ন", icon: "building" },
  { id: "governance", label: "সুশাসন", icon: "scale" },
  { id: "education", label: "শিক্ষা", icon: "graduation-cap" },
];

export const SLOGAN_KNOWLEDGE_BASE: Record<string, string[]> = {
  youth: [
    "তারুণ্যের শক্তি, সমৃদ্ধির ভবিষ্যৎ — গড়ে তুলবো আধুনিক সমাজ",
    "তরুণ প্রজন্মের অঙ্গীকার, মেধা ও কর্মসংস্থানমুখী দেশ গড়ার",
    "তারুণ্যের জয়গান, সততা ও সাহসে এগিয়ে যাবে প্রিয় বাংলাদেশ",
  ],
  development: [
    "উন্নয়নের ধারাবাহিকতায়, জনগণের পাশে সবসময়",
    "কথায় নয় কাজে বিশ্বাসী — এলাকার সার্বিক উন্নয়নে নিবেদিতপ্রাণ",
    "টেকসই অবকাঠামো ও সমৃদ্ধ জনপদ বিনির্মাণে ঐক্যবদ্ধ জনতা",
  ],
  governance: [
    "জনগণের সেবায় নিবেদিতপ্রাণ, দুর্নীতির বিরুদ্ধে আপোষহীন কণ্ঠস্বর",
    "গণতন্ত্র ও ন্যায়বিচারের পথে, নির্ভীক ও জনবান্ধব নেতৃত্ব",
    "স্বচ্ছতা ও ইনসাফ প্রতিষ্ঠায় — গড়ে তুলবো জনতার মডেল এলাকা",
  ],
  education: [
    "মানসম্মত আধুনিক শিক্ষা ও নাগরিক স্বাস্থ্যসেবা সবার অধিকার",
    "জ্ঞানের আলোয় আলোকিত সমাজ — মেধাভিত্তিক নতুন প্রজন্ম",
    "সুশিক্ষা ও মানবিক সমাজ গঠনে আপোষহীন অঙ্গীকার",
  ],
};

export const DEFAULT_CANDIDATE_INFO: CandidateInfo = {
  name: "জনাব মোঃ আরিফুল ইসলাম",
  designation: "সাধারণ সম্পাদক পদপ্রার্থী",
  area: "ঢাকা-১০ সংসদীয় আসন",
  bannerTitle: "গণতন্ত্র ও জনগণের অধিকার আদায়ে",
  slogan: "তারুণ্যের শক্তি, সমৃদ্ধির ভবিষ্যৎ — গড়ে তুলবো আধুনিক সমাজ",
  courtesy: "এলাকাবাসী ও দলীয় সর্বস্তরের কর্মী-সমর্থক",
};

export class PosterGeneratorService {
  /**
   * Initializes or verifies anonymous guest session cookie on backend.
   */
  static async ensureGuestSession(): Promise<string | null> {
    try {
      const res = await axios.post(
        `${serverURL}/api/v1/guest/session`,
        {},
        { withCredentials: true }
      );
      if (res.data?.success && res.data?.data?.guestSessionId) {
        if (typeof window !== "undefined") {
          localStorage.setItem("poster_ai_guest_id", res.data.data.guestSessionId);
        }
        return res.data.data.guestSessionId;
      }
    } catch (err) {
      console.warn("Guest session init skipped or already active:", err);
    }
    return typeof window !== "undefined"
      ? localStorage.getItem("poster_ai_guest_id")
      : null;
  }

  /**
   * Generates AI political campaign slogans via live backend API.
   * Connects to POST /api/v1/ai/generate-slogans with candidate context.
   */
  static async generateAiSlogans(params: {
    topic: string;
    candidateName?: string;
    designation?: string;
    area?: string;
    partyOrIdeology?: string;
    category?: string;
    count?: number;
  }): Promise<GeneratedSloganItem[]> {
    await this.ensureGuestSession();

    try {
      const res = await axios.post(
        `${serverURL}/api/v1/ai/generate-slogans`,
        {
          topic: params.topic || "নির্বাচনী প্রচারণা",
          candidateName: params.candidateName || "জননেতা",
          designation: params.designation || "জনপ্রতিনিধি",
          area: params.area || "নির্বাচনী এলাকা",
          partyOrIdeology: params.partyOrIdeology || "স্বতন্ত্র / সর্বদলীয়",
          category: params.category || "নির্বাচনী প্রচারণা",
          count: params.count || 4,
          language: "bn",
        },
        { withCredentials: true }
      );

      if (res.data?.success && Array.isArray(res.data.data?.slogans)) {
        return res.data.data.slogans.map((item: any) => ({
          slogan: typeof item === "string" ? item : item.slogan || item.headline,
          subText: item.subText,
          tone: item.tone,
          category: item.category,
        }));
      }
    } catch (error) {
      console.warn("Live AI slogan API error, using intelligent fallback:", error);
    }

    // Graceful fallback from knowledge base
    const localCouplets = this.getSlogansByTopic(params.topic);
    return localCouplets.map((s) => ({
      slogan: s,
      subText: `${params.area || "এলাকা"}বাসীর দোয়া ও মূল্যবান ভোট প্রত্যাশী।`,
    }));
  }

  /**
   * Fetches published templates from live database.
   */
  static async fetchPublishedTemplates(): Promise<Array<{ id: string; title: string; width: number; height: number }>> {
    try {
      const res = await axios.get(`${serverURL}/api/v1/template?limit=20`, {
        withCredentials: true,
      });
      if (res.data?.success && Array.isArray(res.data.data?.items)) {
        return res.data.data.items;
      }
    } catch (err) {
      console.error("Failed to load templates:", err);
    }
    return [
      {
        id: "447130b7-5eea-41d9-b6cf-ae5f3145ac66",
        title: "জাতীয় সংসদ নির্বাচন ক্যানভাস ২০২৬",
        width: 1080,
        height: 1350,
      },
    ];
  }

  /**
   * Saves poster draft into database via POST /api/v1/posters.
   */
  static async createPosterDraft(payload: {
    templateId: string;
    inputData: Record<string, unknown>;
  }): Promise<{ id: string; status: string }> {
    await this.ensureGuestSession();

    const idempotencyKey = `poster_draft_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const res = await axios.post(
      `${serverURL}/api/v1/posters`,
      {
        templateId: payload.templateId,
        inputData: payload.inputData,
        idempotencyKey,
      },
      { withCredentials: true }
    );

    if (!res.data?.success || !res.data?.data?.id) {
      throw new Error(res.data?.message || "Failed to create poster record");
    }

    return res.data.data;
  }

  /**
   * Triggers background rendering and billing hold via POST /api/v1/posters/:id/render.
   */
  static async triggerPosterRender(posterId: string): Promise<PosterRenderResult> {
    const res = await axios.post(
      `${serverURL}/api/v1/posters/${posterId}/render`,
      {
        idempotencyKey: `render_${posterId}_${Date.now()}`,
        rendererVersion: "1.0.0",
      },
      { withCredentials: true }
    );

    if (!res.data?.success) {
      throw new Error(res.data?.message || "Failed to trigger poster rendering");
    }

    return res.data.data;
  }

  /**
   * Polls status of rendering poster via GET /api/v1/posters/:id/status.
   */
  static async pollPosterStatus(posterId: string): Promise<PosterRenderResult> {
    const res = await axios.get(
      `${serverURL}/api/v1/posters/${posterId}/status`,
      { withCredentials: true }
    );

    if (res.data?.success && res.data?.data) {
      return res.data.data;
    }
    throw new Error(res.data?.message || "Failed to fetch render status");
  }

  static getSlogansByTopic(topic: string): string[] {
    const clean = (topic || "").trim().toLocaleLowerCase();

    if (
      clean.includes("তারুণ্য") ||
      clean.includes("কর্মসংস্থান") ||
      clean.includes("তরুণ")
    ) {
      return SLOGAN_KNOWLEDGE_BASE.youth;
    } else if (
      clean.includes("উন্নয়ন") ||
      clean.includes("অবকাঠামো") ||
      clean.includes("কাজ")
    ) {
      return SLOGAN_KNOWLEDGE_BASE.development;
    } else if (
      clean.includes("সুশাসন") ||
      clean.includes("দুর্নীতি") ||
      clean.includes("অধিকার") ||
      clean.includes("গণতন্ত্র")
    ) {
      return SLOGAN_KNOWLEDGE_BASE.governance;
    } else if (
      clean.includes("শিক্ষা") ||
      clean.includes("স্বাস্থ্য") ||
      clean.includes("মেধা")
    ) {
      return SLOGAN_KNOWLEDGE_BASE.education;
    }
    return [
      `${topic} বাস্তবায়নে ঐক্যবদ্ধ জনতা — গড়বো আগামীর নতুন দিগন্ত`,
      `${topic} ও নাগরিক অধিকার প্রতিষ্ঠায় — নির্ভীক ও আপোষহীন নেতৃত্ব`,
      `জনগণের প্রত্যাশায় ${topic} — পরিবর্তনের প্রত্যয়ে এগিয়ে চলুন`,
    ];
  }

  static getThemeGradientClass(theme: string): string {
    switch (theme) {
      case "crimson":
        return "bg-gradient-to-br from-[#881337] via-[#6b0f2b] to-[#4c0519] border-rose-500/30";
      case "navy":
        return "bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0a0f1d] border-blue-500/30";
      case "charcoal":
        return "bg-gradient-to-br from-[#18181b] via-[#27272a] to-[#09090b] border-zinc-600/30";
      case "emerald":
      default:
        return "bg-gradient-to-br from-[#063923] via-[#052d1c] to-[#031d12] border-emerald-500/30";
    }
  }
}