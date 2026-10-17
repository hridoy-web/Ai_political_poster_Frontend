import { CategoryOption, PosterTemplate, TemplateCategory, TemplateSort } from "./template.types";

export const TEMPLATE_CATEGORIES: CategoryOption[] = [
  { id: "all", label: "সকল টেমপ্লেট", count: 18 },
  { id: "election", label: "নির্বাচন প্রচারণা", count: 6 },
  { id: "national-day", label: "জাতীয় দিবস", count: 4 },
  { id: "greetings", label: "দলীয় পদের শুভেচ্ছা", count: 3 },
  { id: "birthday", label: "শুভ জন্মদিন", count: 3 },
  { id: "religious", label: "ধর্মীয় উৎসব", count: 2 },
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
    priceCredits: 2,
    downloadsCount: 1420,
    likesCount: 389,
    tags: ["নির্বাচন", "ভোট", "প্রচারণা", "পোস্টার"],
    aspectRatio: "4:5",
    createdAt: "2026-03-10",
  },
  {
    id: "tpl-102",
    title: "২৬শে মার্চ মহান স্বাধীনতা দিবস শুভেচ্ছা",
    description: "লাল-সবুজের আবহে জাতীয় স্মৃতিসৌধ সম্বলিত দেশাত্মবোধক ও শ্রদ্ধাঞ্জলি পোস্টার ডিজাইন।",
    category: "national-day",
    categoryLabel: "জাতীয় দিবস",
    thumbnailUrl: "https://shorifart.com/wp-content/uploads/2025/10/cropped-01-4.jpg",
    isPremium: false,
    downloadsCount: 3890,
    likesCount: 912,
    tags: ["স্বাধীনতা দিবস", "২৬ মার্চ", "বাংলাদেশ", "শ্রদ্ধাঞ্জলি"],
    aspectRatio: "4:5",
    createdAt: "2026-03-01",
  },
  {
    id: "tpl-112",
    title: "জাতীয় সংসদ সদস্য প্রার্থী প্রচার পোস্টার",
    description: "আসন্ন জাতীয় সংসদ নির্বাচনে মার্কা ও প্রার্থীর পক্ষে গণজোয়ার সৃষ্টির পোস্টার।",
    category: "election",
    categoryLabel: "নির্বাচন প্রচারণা",
    thumbnailUrl: "https://shorifart.com/wp-content/uploads/2025/10/cropped-01-4.jpg",
    isPremium: true,
    priceCredits: 3,
    downloadsCount: 2450,
    likesCount: 780,
    tags: ["সংসদ সদস্য", "এমপি", "নির্বাচন", "ভোট"],
    aspectRatio: "4:5",
    createdAt: "2026-03-11",
  },
  {
    id: "tpl-113",
    title: "সিটি কর্পোরেশন কাউন্সিলর প্রার্থী পোস্টার",
    description: "ওয়ার্ডবাসীর সেবা ও উন্নয়নের অঙ্গীকার নিয়ে কাউন্সিলর প্রার্থীর নির্বাচনী পোস্টার।",
    category: "election",
    categoryLabel: "নির্বাচন প্রচারণা",
    thumbnailUrl: "https://shorifart.com/wp-content/uploads/2025/10/cropped-01-4.jpg",
    isPremium: false,
    downloadsCount: 1320,
    likesCount: 410,
    tags: ["কাউন্সিলর", "ওয়ার্ড", "নির্বাচন", "ভোট"],
    aspectRatio: "4:5",
    createdAt: "2026-03-02",
  },
  {
    id: "tpl-114",
    title: "নির্বাচনী বিশাল জনসভা ও পথসভা ব্যানার",
    description: "প্রধান অতিথির শুভাগমন ও নির্বাচনী পথসভা সফল করার উদাত্ত আহ্বান ব্যানার।",
    category: "election",
    categoryLabel: "নির্বাচন প্রচারণা",
    thumbnailUrl: "https://shorifart.com/wp-content/uploads/2025/10/cropped-01-4.jpg",
    isPremium: true,
    priceCredits: 2,
    downloadsCount: 1750,
    likesCount: 520,
    tags: ["জনসভা", "পথসভা", "নির্বাচন", "ব্যানার"],
    aspectRatio: "4:5",
    createdAt: "2026-03-09",
  },
  {
    id: "tpl-115",
    title: "১৬ই ডিসেম্বর মহান বিজয় দিবস শ্রদ্ধাঞ্জলি",
    description: "বীর মুক্তিযোদ্ধাদের প্রতি বিনম্র শ্রদ্ধা ও বিজয়ের রক্তিম শুভেচ্ছা পোস্টার।",
    category: "national-day",
    categoryLabel: "জাতীয় দিবস",
    thumbnailUrl: "https://shorifart.com/wp-content/uploads/2025/10/cropped-01-4.jpg",
    isPremium: false,
    downloadsCount: 4600,
    likesCount: 1390,
    tags: ["বিজয় দিবস", "১৬ ডিসেম্বর", "মুক্তিযোদ্ধা", "শ্রদ্ধাঞ্জলি"],
    aspectRatio: "4:5",
    createdAt: "2026-02-10",
  },
  {
    id: "tpl-116",
    title: "ঐতিহাসিক ৭ই নভেম্বর জাতীয় সংহতি দিবস",
    description: "জাতীয় বিপ্লব ও সংহতি দিবস উপলক্ষে দলীয় নেতাকর্মীদের স্মরণ ও শুভেচ্ছা বার্তা।",
    category: "national-day",
    categoryLabel: "জাতীয় দিবস",
    thumbnailUrl: "https://shorifart.com/wp-content/uploads/2025/10/cropped-01-4.jpg",
    isPremium: true,
    priceCredits: 2,
    downloadsCount: 2890,
    likesCount: 890,
    tags: ["সংহতি দিবস", "৭ নভেম্বর", "জাতীয় দিবস"],
    aspectRatio: "4:5",
    createdAt: "2026-02-05",
  },
  {
    id: "tpl-117",
    title: "দেশনেত্রীর শুভ জন্মদিনে দীর্ঘায়ু কামনায় শুভেচ্ছা",
    description: "গণমানুষের প্রিয় দেশনেত্রীর শুভ জন্মদিনে আন্তরিক শুভেচ্ছা ও সুস্বাস্থ্য কামনায় ব্যানার।",
    category: "birthday",
    categoryLabel: "শুভ জন্মদিন",
    thumbnailUrl: "https://shorifart.com/wp-content/uploads/2025/10/cropped-01-4.jpg",
    isPremium: false,
    downloadsCount: 3100,
    likesCount: 1100,
    tags: ["দেশনেত্রী", "জন্মদিন", "শুভ জন্মদিন", "নেতা"],
    aspectRatio: "4:5",
    createdAt: "2026-02-27",
  },
  {
    id: "tpl-118",
    title: "পবিত্র ঈদে মিলাদুন্নবী (সাঃ) উপলক্ষে শুভেচ্ছা ব্যানার",
    description: "বিশ্বনবী হযরত মুহাম্মদ (সাঃ) এর পবিত্র শুভাগমন উপলক্ষে রাজনৈতিক শুভেচ্ছা পোস্টার।",
    category: "religious",
    categoryLabel: "ধর্মীয় উৎসব",
    thumbnailUrl: "https://shorifart.com/wp-content/uploads/2025/10/cropped-01-4.jpg",
    isPremium: false,
    downloadsCount: 2200,
    likesCount: 670,
    tags: ["ঈদে মিলাদুন্নবী", "ধর্মীয়", "উৎসব", "শুভেচ্ছা"],
    aspectRatio: "4:5",
    createdAt: "2026-03-01",
  },
];

export class TemplateService {
  static async getAllTemplates(): Promise<PosterTemplate[]> {
    /*ভবিষ্যতে এপিআই আসলে নিচের অংশটি আন-কমেন্ট করবেন:
    try {
      const response = await fetch("এপিআই", {
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

  // নির্দিষ্ট একটি পোস্টার খুঁজে বের করার মেথড
   static async getTemplateById(id: string): Promise<PosterTemplate | undefined> {
    return MOCK_TEMPLATES.find((tpl) => tpl.id === id);
  }

  //ক্যাটাগরি তালিকা ও আসল পোস্টার কাউন্ট পাওয়ার মেথড
  static getCategories(): CategoryOption[] {
    return TEMPLATE_CATEGORIES.map((cat) => {
      if (cat.id === "all") {
        return { ...cat, count: MOCK_TEMPLATES.length };
      }
      const count = MOCK_TEMPLATES.filter((tpl) => tpl.category === cat.id).length;
      return { ...cat, count };
    });
  }

  //সার্চ ও ফিল্টারিং মেথড
  static filterTemplates(
    templates: PosterTemplate[],
    options: {
      category?: TemplateCategory;
      search?: string;
      sort?: TemplateSort;
    }
  ): PosterTemplate[] {
    let result = [...templates];

    // ১. ক্যাটাগরি ফিল্টার ("all" বাদে বাকি ক্যাটাগরি ফিল্টার হবে)
    if (options.category && options.category !== "all") {
      result = result.filter((item) => item.category === options.category);
    }

    // ২. সার্চ ফিল্টার (নাম, বর্ণনা বা ট্যাগ মিলিয়ে দেখা)
    if (options.search && options.search.trim() !== "") {
      const query = options.search.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // ৩. সর্টিং ফিল্টার (জনপ্রিয়, নতুন বা প্রিমিয়াম অনুযায়ী সাজানো)
    if (options.sort) {
      if (options.sort === "popular") {
        result.sort((a, b) => b.downloadsCount - a.downloadsCount);
      } else if (options.sort === "latest") {
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else if (options.sort === "premium") {
        // শুধুমাত্র প্রিমিয়াম পোস্টার ফিল্টার হয়ে আসবে
        result = result.filter((item) => item.isPremium);
      }
    }

    return result;
  }
}
