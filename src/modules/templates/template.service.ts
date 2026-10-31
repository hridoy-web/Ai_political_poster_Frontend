import { CategoryOption, PosterTemplate, TemplateCategory, TemplateSort } from "./template.types";
import { serverURL } from "@/lib/api/authApi";

export const TEMPLATE_CATEGORIES: CategoryOption[] = [
  { id: "all", label: "সকল টেমপ্লেট", count: 5 },
  { id: "election", label: "নির্বাচন প্রচারণা", count: 1 },
  { id: "national-day", label: "জাতীয় দিবস", count: 1 },
  { id: "greetings", label: "দলীয় পদের শুভেচ্ছা", count: 1 },
  { id: "birthday", label: "শুভ জন্মদিন", count: 1 },
  { id: "religious", label: "ধর্মীয় উৎসব", count: 1 },
];

export const MOCK_TEMPLATES: PosterTemplate[] = [
  {
    id: "tpl-101",
    title: "নির্বাচনী প্রচারণা",
    category: "election",
    categoryLabel: "নির্বাচন প্রচারণা",
    thumbnailUrl: "/image/images26.jpg",
    isPremium: true,
    tags: ["নির্বাচন", "ভোট", "প্রচারণা", "পোস্টার"],
    createdAt: "2026-03-10",
  },
  {
    id: "tpl-102",
    title: "জনসভা পোস্টার",
    category: "greetings",
    categoryLabel: "সমাবেশ ও জনসভা",
    thumbnailUrl: "/image/image6.jpg",
    isPremium: false,
    tags: ["জনসভা", "সমাবেশ", "মিছিল", "দলীয়"],
    createdAt: "2026-03-01",
  },
  {
    id: "tpl-103",
    title: "নেতার জন্মদিন",
    category: "birthday",
    categoryLabel: "শুভ জন্মদিন",
    thumbnailUrl: "/image/images24.jpg",
    isPremium: false,
    tags: ["জন্মদিন", "নেতা", "শুভেচ্ছা", "দীর্ঘায়ু"],
    createdAt: "2026-02-18",
  },
  {
    id: "tpl-104",
    title: "বিজয় দিবস",
    category: "national-day",
    categoryLabel: "জাতীয় দিবস",
    thumbnailUrl: "/image/images21.jpg",
    isPremium: true,
    tags: ["বিজয় দিবস", "১৬ ডিসেম্বর", "বাংলাদেশ", "স্বাধীনতা"],
    createdAt: "2026-02-25",
  },
  {
    id: "tpl-105",
    title: "শোকবার্তা",
    category: "national-day",
    categoryLabel: "শোকবার্তা",
    thumbnailUrl: "/image/images11.jpg",
    isPremium: false,
    tags: ["শোকবার্তা", "শ্রদ্ধাঞ্জলি", "স্মরণসভা"],
    createdAt: "2026-03-12",
  },
  {
    id: "tpl-106",
    title: "প্রতিষ্ঠাবার্ষিকী",
    category: "greetings",
    categoryLabel: "প্রতিষ্ঠাবার্ষিকী",
    thumbnailUrl: "/image/images3.jpg",
    isPremium: false,
    tags: ["প্রতিষ্ঠাবার্ষিকী", "শুভেচ্ছা", "দলীয়"],
    createdAt: "2026-03-14",
  },
  {
    id: "tpl-107",
    title: "ভোটার উদ্বুদ্ধকরণ",
    category: "election",
    categoryLabel: "ভোটার উদ্বুদ্ধকরণ",
    thumbnailUrl: "/image/images5.jpg",
    isPremium: true,
    tags: ["ভোট", "নির্বাচন", "গণতন্ত্র"],
    createdAt: "2026-03-15",
  },
  {
    id: "tpl-108",
    title: "ধর্মীয় উৎসব ও ঈদ শুভেচ্ছা",
    category: "religious",
    categoryLabel: "ধর্মীয় উৎসব",
    thumbnailUrl: "/image/images4.jpg",
    isPremium: false,
    tags: ["ঈদ", "ঈদ মোবারক", "ধর্মীয়", "উৎসব"],
    createdAt: "2026-03-16",
  },
];

export class TemplateService {
  // Fetch all templates with live backend integration and graceful fallback
  static async getAllTemplates(categoryId?: string): Promise<PosterTemplate[]> {
    try {
      const query = categoryId && categoryId !== "all" ? `?categoryId=${categoryId}&limit=50` : "?limit=50";
      const res = await fetch(`${serverURL}/api/v1/template${query}`, {
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.success && Array.isArray(data.data?.items)) {
          const liveTemplates: PosterTemplate[] = data.data.items.map((item: any) => {
            const cfg = item.config || {};
            const preview =
              cfg.previewUrl ||
              cfg.blankTemplateUrl ||
              item.thumbnailUrl ||
              "/image/images26.jpg";

            return {
              id: item.id,
              title: item.title,
              category: item.category?.slug || item.category?.id || "political-posters",
              categoryLabel: item.category?.name || "রাজনৈতিক পোস্টার",
              thumbnailUrl: preview,
              previewUrl: preview,
              isPremium: item.accessLevel === "PREMIUM",
              tags: Array.isArray(item.tags) && item.tags.length > 0
                ? item.tags
                : [item.category?.name || "রাজনৈতিক", "পোস্টার", item.title],
              createdAt: item.createdAt || new Date().toISOString(),
            };
          });

          // If live templates exist in DB, show them first
          if (liveTemplates.length > 0) {
            const liveIds = new Set(liveTemplates.map((t) => t.id));
            const remainingMocks = MOCK_TEMPLATES.filter((m) => !liveIds.has(m.id));
            return [...liveTemplates, ...remainingMocks];
          }
        }
      }
    } catch (error) {
      console.error("API Fetch Failed, falling back to mock templates:", error);
    }

    return MOCK_TEMPLATES;
  }

  // Find a specific template by ID (checks live API first, then mocks)
  static async getTemplateById(id: string): Promise<PosterTemplate | undefined> {
    try {
      const res = await fetch(`${serverURL}/api/v1/template/${id}`, {
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        const item = data?.data;
        if (item) {
          const cfg = item.config || {};
          const preview =
            cfg.previewUrl ||
            cfg.blankTemplateUrl ||
            item.thumbnailUrl ||
            "/image/images26.jpg";

          return {
            id: item.id,
            title: item.title,
            category: item.category?.slug || item.category?.id || "political-posters",
            categoryLabel: item.category?.name || "রাজনৈতিক পোস্টার",
            thumbnailUrl: preview,
            previewUrl: preview,
            isPremium: item.accessLevel === "PREMIUM",
            tags: Array.isArray(item.tags) && item.tags.length > 0
              ? item.tags
              : [item.category?.name || "রাজনৈতিক", "পোস্টার", item.title],
            createdAt: item.createdAt || new Date().toISOString(),
          };
        }
      }
    } catch (error) {
      console.error("Single Template Fetch Failed, searching mock:", error);
    }

    return MOCK_TEMPLATES.find((tpl) => tpl.id === id);
  }

  // Get categories with dynamic template count based on available templates
  static async getCategories(templates?: PosterTemplate[]): Promise<CategoryOption[]> {
    const list = templates || (await this.getAllTemplates());
    const categoryMap = new Map<string, { label: string; count: number }>();

    list.forEach((tpl) => {
      const key = tpl.category || "political-posters";
      const existing = categoryMap.get(key);
      if (existing) {
        existing.count += 1;
      } else {
        categoryMap.set(key, {
          label: tpl.categoryLabel || "রাজনৈতিক পোস্টার",
          count: 1,
        });
      }
    });

    const dynamicCategories: CategoryOption[] = Array.from(categoryMap.entries()).map(
      ([id, data]) => ({
        id,
        label: data.label,
        count: data.count,
      })
    );

    return [
      { id: "all", label: "সকল টেমপ্লেট", count: list.length },
      ...dynamicCategories,
    ];
  }

  // Search and filtering engine
  static filterTemplates(
    templates: PosterTemplate[],
    options: {
      category?: TemplateCategory;
      search?: string;
      sort?: TemplateSort;
      bookmarkedIds?: Set<string>;
    }
  ): PosterTemplate[] {
    let result = [...templates];

    // 1. Category filter (skip if 'all')
    if (options.category && options.category !== "all") {
      result = result.filter((item) => item.category === options.category);
    }

    // 2. Search filter (matches title, description, or tags)
    if (options.search && options.search.trim() !== "") {
      const query = options.search.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // 3. Sorting filter (popular, latest, or premium)
    if (options.sort) {
      if (options.sort === "popular") {
        if (options.bookmarkedIds) {
          result = result.filter((item) => options.bookmarkedIds!.has(item.id));
        }
      } else if (options.sort === "latest") {
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else if (options.sort === "premium") {
        result = result.filter((item) => item.isPremium);
      }
    }

    return result;
  }
}
