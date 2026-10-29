import { CategoryOption, PosterTemplate, TemplateCategory, TemplateSort } from "./template.types";
import { apiFetch } from "@/lib/api/api-client";

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

function getTemplateImage(item: any, index: number): string {
  if (item.thumbnailUrl) return item.thumbnailUrl;
  if (item.previewUrl) return item.previewUrl;
  if (item.config?.previewUrl) return item.config.previewUrl;
  if (item.config?.thumbnailUrl) return item.config.thumbnailUrl;
  // cloudinary
  if (item.preview?.storageKey) {
    return item.preview.storageKey.startsWith("http")
      ? item.preview.storageKey
      : `https://res.cloudinary.com/dtniwvrty/image/upload/${item.preview.storageKey}`;
  }
  const fallbackImages = [
    "/image/images26.jpg",
    "/image/image6.jpg",
    "/image/images21.jpg",
    "/image/images24.jpg",
    "/image/images11.jpg",
    "/image/images3.jpg",
    "/image/images5.jpg",
    "/image/images4.jpg",
  ];
  return fallbackImages[index % fallbackImages.length];
}



export class TemplateService {
  // Fetch all templates 
  static async getAllTemplates(categoryId?: string): Promise<PosterTemplate[]> {
    try {
      const query = categoryId && categoryId !== "all" ? `?categoryId=${categoryId}` : "";
      const res = await apiFetch<{ items: any[] }>(`/template${query}`);
      
      if (res.success && res.data?.items && res.data.items.length > 0) {
        return res.data.items.map((item: any, index: number) => ({
  id: item.id,
  title: item.title,
  category: item.categoryId || "all",
  categoryLabel: item.title,
  thumbnailUrl: getTemplateImage(item, index),
  isPremium: item.accessLevel === "PREMIUM",
  tags: [item.title],
  createdAt: item.createdAt,
  width: item.width || 1080,
  height: item.height || 1350,
  aspectRatio: item.aspectRatio || "4:5",
  previewAssetId: item.previewAssetId || null,
  config: item.config || null,
}));
      }
    } catch (error) {
      console.error("Templates fetch failed, using fallback:", error);
    }
    return MOCK_TEMPLATES;
  }

   // Find a specific template by ID
  static async getTemplateById(id: string): Promise<PosterTemplate | undefined> {
    try {
      const res = await apiFetch<any>(`/template/${id}`);
      
      if (res.success && res.data) {
        const item = res.data;
        return {
          id: item.id,
          title: item.title,
          category: item.categoryId || "all",
          categoryLabel: item.category?.name || item.title,
          thumbnailUrl: getTemplateImage(item, 0),
          isPremium: item.accessLevel === "PREMIUM",
          tags: [item.title],
          createdAt: item.createdAt,
          width: item.width || 1080,
          height: item.height || 1350,
          aspectRatio: item.aspectRatio || "4:5",
          previewAssetId: item.previewAssetId || null,
          config: item.config || null,
        };
      }
    } catch (error) {
      console.error("Single Template Fetch Failed:", error);
    }
    return MOCK_TEMPLATES.find((tpl) => tpl.id === id);
  }


  // Get categories with dynamic template count
  static async getCategories(): Promise<CategoryOption[]> {
     try {
    const res = await apiFetch<any[]>("/category");
    if (res.success && Array.isArray(res.data) && res.data.length > 0) {
      return [
        { id: "all", label: "সকল টেমপ্লেট" },
        ...res.data.map((cat) => ({
          id: cat.id,
          label: cat.name,
        })),
      ];
    }
  } catch (error) {
    console.error("Categories fetch failed, using fallback:", error);
  }
  return TEMPLATE_CATEGORIES;
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
  //Bookmark API
    static async  addBookmark(templateId: string){
      return await apiFetch(`/bookmarks/${templateId}` , {
        method:"POST",
      })
    }
    static async removeBookmark(templateId: string) {
      return await apiFetch(`/bookmarks/${templateId}`, {
        method: "DELETE",
      });
    }
    static async getBookmarks(): Promise<string[]>{
      try{
        const res = await apiFetch<any[]>("/bookmarks");
        if (res.success && Array.isArray(res.data) ){
          return res.data.map((item) => item.id)
        }
         } catch (error) {
    console.error("Failed to fetch bookmarks:", error);
  }
  return [];
      }
    }

