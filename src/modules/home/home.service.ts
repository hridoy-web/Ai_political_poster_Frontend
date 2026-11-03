import { serverURL } from "@/lib/api/authApi";
import { CATEGORY_MAP, Template } from "./home.types";
import { ApiTemplateItem } from "./home.schema";


const getBaseServerUrl = (): string => {
  return serverURL || process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
};

// Fetch published trending templates from backend API
export async function getTrendingTemplates(limit: number = 8): Promise<Template[]> {
  try {
    const baseUrl = getBaseServerUrl();
    const res = await fetch(`${baseUrl}/api/v1/template?limit=${limit}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`[HomeService] Failed to fetch templates: HTTP ${res.status}`);
      return [];
    }

    const json = await res.json();
    const items: ApiTemplateItem[] = json?.data?.items || [];

    if (!Array.isArray(items)) return [];

    return items.map((item) => {
      const slug = item.category?.slug || item.categoryId || "political-posters";

      return {
        id: item.id,
        title: item.title,
        category: slug,
        categoryId: item.categoryId,
        categorySlug: slug,
        categoryLabel:
        item.category?.name ||
          (CATEGORY_MAP as Record<string, string>)[slug] ||
          "রাজনৈতিক পোস্টার",
        image: item.config?.previewUrl || item.config?.blankTemplateUrl || item.previewUrl || "",
        isPremium: item.accessLevel === "PREMIUM",
      };
    });
  } catch (error) {
    console.error("[HomeService] Error fetching trending templates:", error);
    return [];
  }
}

export const HomeService = {
  getTrendingTemplates,
};
