import { serverURL } from "@/lib/api/authApi";
import { CATEGORY_MAP, Template } from "./home.types";

export interface ApiCategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  sortOrder?: number;
  isActive?: boolean;
}

export interface ApiTemplateConfig {
  type?: "canvas" | "html";
  previewUrl?: string;
  blankTemplateUrl?: string;
  photoSlots?: unknown;
  textSlots?: unknown;
  width?: number;
  height?: number;
  fields?: unknown;
}

export interface ApiTemplateItem {
  id: string;
  title: string;
  categoryId?: string;
  accessLevel?: "FREE" | "PREMIUM";
  aspectRatio?: string;
  width?: number;
  height?: number;
  status?: string;
  config?: ApiTemplateConfig;
  previewAssetId?: string | null;
  previewUrl?: string;
  category?: ApiCategoryItem;
  createdAt?: string;
  updatedAt?: string;
}

export interface TemplateCategoryOption {
  id: string;
  label: string;
  count?: number;
}

const GRADIENTS = [
  "from-emerald-600 via-green-700 to-emerald-900",
  "from-red-600 via-rose-700 to-red-900",
  "from-blue-600 via-indigo-700 to-blue-900",
  "from-amber-500 via-orange-600 to-red-800",
  "from-purple-600 via-fuchsia-700 to-purple-900",
  "from-teal-600 via-cyan-700 to-teal-900",
  "from-slate-700 via-slate-800 to-slate-950",
];

const getBaseServerUrl = (): string => {
  return serverURL || process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
};

export class HomeService {
  /**
   * Fetch published trending templates from backend API: GET /api/v1/template
   */
  static async getTrendingTemplates(limit: number = 20): Promise<Template[]> {
    try {
      const baseUrl = getBaseServerUrl();
      const res = await fetch(`${baseUrl}/api/v1/template?limit=${limit}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        console.error(`[HomeService] Failed to fetch templates: HTTP ${res.status}`);
        return [];
      }

      const json = await res.json();
      const items: ApiTemplateItem[] = json?.data?.items || [];

      if (!Array.isArray(items)) {
        return [];
      }

      return items.map((item, index) => {
        const cfg = item.config || {};
        const image =
          cfg.previewUrl ||
          cfg.blankTemplateUrl ||
          item.previewUrl ||
          "";

        const rawSlug =
          item.category?.slug ||
          item.category?.id ||
          item.categoryId ||
          "political-posters";

        const rawName = item.category?.name || "";
        const titleText = item.title || "";
        const combined = `${rawSlug} ${rawName} ${titleText}`.toLowerCase();

        let categorySlug = rawSlug;
        if (combined.includes("election") || combined.includes("নির্বাচন") || combined.includes("ভোট")) {
          categorySlug = "election";
        } else if (combined.includes("rally") || combined.includes("সমাবেশ") || combined.includes("জনসভা") || combined.includes("মিছিল")) {
          categorySlug = "rally";
        } else if (combined.includes("birthday") || combined.includes("জন্মদিন")) {
          categorySlug = "birthday";
        } else if (
          combined.includes("independence") ||
          combined.includes("sadhinota") ||
          combined.includes("shadhinota") ||
          combined.includes("স্বাধীনতা") ||
          combined.includes("২৬ মার্চ")
        ) {
          categorySlug = "independence";
        } else if (combined.includes("victory") || combined.includes("বিজয়") || combined.includes("১৬ ডিসেম্বর")) {
          categorySlug = "victory";
        } else if (combined.includes("condolence") || combined.includes("shok") || combined.includes("শোক") || combined.includes("স্মরণ")) {
          categorySlug = "condolence";
        }

        const categoryName =
          (CATEGORY_MAP as Record<string, string>)[categorySlug] ||
          item.category?.name ||
          "রাজনৈতিক পোস্টার";

        // Assign dynamic badges
        let badge: "trending" | "new" | "popular" | undefined = undefined;
        if (index === 0 || item.accessLevel === "PREMIUM") {
          badge = "trending";
        } else if (index % 3 === 1) {
          badge = "popular";
        } else if (index % 3 === 2) {
          badge = "new";
        }

        return {
          id: item.id,
          title: item.title,
          category: categorySlug,
          categoryId: item.categoryId,
          categorySlug: rawSlug,
          categoryLabel: categoryName,
          badge,
          gradient: GRADIENTS[index % GRADIENTS.length],
          image,
          isPremium: item.accessLevel === "PREMIUM",
        };
      });
    } catch (error) {
      console.error("[HomeService] Error fetching trending templates:", error);
      return [];
    }
  }

  /**
   * Return category buttons for trending templates:
   */
  static async getTrendingCategories(): Promise<TemplateCategoryOption[]> {
    return [
      { id: "all", label: "সব" },
      { id: "election", label: "নির্বাচনী" },
      { id: "rally", label: "সমাবেশ" },
      { id: "birthday", label: "জন্মদিন" },
      { id: "victory", label: "বিজয় দিবস" },
      { id: "independence", label: "স্বাধীনতা দিবস" },
      { id: "condolence", label: "শোকবার্তা" },
    ];
  }
}

export const getTrendingTemplates = HomeService.getTrendingTemplates;
export const getTrendingCategories = HomeService.getTrendingCategories;
export default HomeService;
