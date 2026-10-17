import { CategoryOption, PosterTemplate, TemplateCategory, TemplateSort } from "./template.types";

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
    title: "নির্বাচনী গণসংযোগ পোস্টার - বিজয়ী ২০২৬",
    description: "স্থানীয় ও জাতীয় নির্বাচন প্রচারণার জন্য আদর্শ প্রিমিয়াম গ্রাফিক ফ্রেম ও স্লোগান স্পেস।",
    category: "election",
    categoryLabel: "নির্বাচন প্রচারণা",
    thumbnailUrl: "https://shorifart.com/wp-content/uploads/2025/10/cropped-01-4.jpg",
    isPremium: true,
    tags: ["নির্বাচন", "ভোট", "প্রচারণা", "পোস্টার"],
    createdAt: "2026-03-10",
  },
  {
    id: "tpl-102",
    title: "২৬শে মার্চ মহান স্বাধীনতা দিবস শুভেচ্ছা",
    description: "লাল-সবুজের আবহে জাতীয় স্মৃতিসৌধ সম্বলিত দেশাত্মবোধক ও শ্রদ্ধাঞ্জলি পোস্টার ডিজাইন।",
    category: "national-day",
    categoryLabel: "জাতীয় দিবস",
    thumbnailUrl: "https://cdn.dribbble.com/userupload/36528011/file/original-328a6c43bd268cf3edd4592834f6139b.jpg",
    isPremium: false,
    tags: ["স্বাধীনতা দিবস", "২৬ মার্চ", "বাংলাদেশ", "শ্রদ্ধাঞ্জলি"],
    createdAt: "2026-03-01",
  },
  {
    id: "tpl-103",
    title: "দলীয় নবনির্বাচিত কমিটিকে উষ্ণ অভিনন্দন",
    description: "সভাপতি ও সাধারণ সম্পাদক পদে নির্বাচিত নেতৃবৃন্দকে শুভেচ্ছা ও অভিনন্দন জানানোর পোস্টার।",
    category: "greetings",
    categoryLabel: "দলীয় পদের শুভেচ্ছা",
    thumbnailUrl: "https://cdn.dribbble.com/userupload/43070883/file/original-a95afc36f38069131a411ed8fc5e9168.jpg?resize=752x&vertical=center",
    isPremium: false,
    tags: ["শুভেচ্ছা", "কমিটি", "অভিনন্দন", "দলীয় পদ"],
    createdAt: "2026-02-18",
  },
  {
    id: "tpl-104",
    title: "প্রিয় নেতার শুভ জন্মদিন ব্যানার",
    description: "নেতা বা দলীয় প্রধানের জন্মদিনে দীর্ঘায়ু ও সুস্বাস্থ্য কামনায় বিশেষ জন্মদিনের ফ্রেম।",
    category: "birthday",
    categoryLabel: "শুভ জন্মদিন",
    thumbnailUrl: "https://shorifart.com/wp-content/uploads/2025/10/cropped-01-4.jpg",
    isPremium: true,
    tags: ["জন্মদিন", "নেতা", "শুভেচ্ছা", "দীর্ঘায়ু"],
    createdAt: "2026-02-25",
  },
  {
    id: "tpl-105",
    title: "পবিত্র ঈদুল ফিতর মোবারক রাজনৈতিক শুভেচ্ছা",
    description: "জনসাধারণ ও দলীয় নেতাকর্মীদের পবিত্র ঈদের শুভেচ্ছা ও শান্তি কামনায় বিশেষ পোস্টার।",
    category: "religious",
    categoryLabel: "ধর্মীয় উৎসব",
    thumbnailUrl: "https://cdn.dribbble.com/userupload/43070968/file/original-080ea70639ed00e7260c3c3e81903fc6.jpg?resize=752x&vertical=center",
    isPremium: false,
    tags: ["ঈদ", "ঈদ মোবারক", "ধর্মীয়", "উৎসব"],
    createdAt: "2026-03-12",
  },
];

export class TemplateService {
  // Fetch all templates (supports future backend API with caching)
  static async getAllTemplates(): Promise<PosterTemplate[]> {
    /* When backend API is ready, uncomment the block below:
    try {
      const response = await fetch("API_URL_HERE", {
        next: { revalidate: 60 },
      });
      if (!response.ok) throw new Error("API Network response was not ok");
      const data: PosterTemplate[] = await response.json();
      return data;
    } catch (error) {
      console.error("API Fetch Failed, falling back to mock:", error);
      return MOCK_TEMPLATES;
    }
    */

    return MOCK_TEMPLATES;
  }

  // Find a specific template by ID
  static async getTemplateById(id: string): Promise<PosterTemplate | undefined> {
    /* When single template detail API is ready, uncomment the block below:
    try {
      const response = await fetch("API_URL_HERE", {
        next: { revalidate: 60 },
      });
      if (!response.ok) throw new Error("Single template API response was not ok");
      const data: PosterTemplate = await response.json();
      return data;
    } catch (error) {
      console.error("Single Template Fetch Failed, falling back to mock:", error);
      return MOCK_TEMPLATES.find((tpl) => tpl.id === id);
    }
    */

    return MOCK_TEMPLATES.find((tpl) => tpl.id === id);
  }

  // Get categories with dynamic template count
  static getCategories(): CategoryOption[] {
    return TEMPLATE_CATEGORIES.map((cat) => {
      if (cat.id === "all") {
        return { ...cat, count: MOCK_TEMPLATES.length };
      }
      const count = MOCK_TEMPLATES.filter((tpl) => tpl.category === cat.id).length;
      return { ...cat, count };
    });
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
          item.description.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // 3. Sorting filter (popular, latest, or premium)
    if (options.sort) {
      if (options.sort === "popular") {
        // Show templates that have user's love/bookmark react
        if (options.bookmarkedIds) {
          result = result.filter((item) => options.bookmarkedIds!.has(item.id));
        }
      } else if (options.sort === "latest") {
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else if (options.sort === "premium") {
        // Filter only premium templates
        result = result.filter((item) => item.isPremium);
      }
    }

    return result;
  }
}
