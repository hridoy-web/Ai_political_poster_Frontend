import { Download, ImagePlus, LayoutGrid, LucideIcon, UserPlus } from "lucide-react";

// TRENDING-TEMPLATES
export type TemplateCategory =
    | "all"
    | "election"
    | "rally"
    | "birthday"
    | "victory"
    | "independence"
    | "condolence"
    | (string & {});

// TRENDING-TEMPLATES
export interface Template {
    id: number | string;
    title: string;
    category: string;
    categoryId?: string;
    categorySlug?: string;
    categoryLabel?: string;
    badge?: "trending" | "new" | "popular";
    gradient?: string;
    image: string;
    isPremium?: boolean;
}

// TRENDING-TEMPLATES
export const CATEGORY_MAP: Record<string, string> = {
    election: "নির্বাচনী",
    rally: "সমাবেশ",
    birthday: "জন্মদিন",
    victory: "বিজয় দিবস",
    independence: "স্বাধীনতা দিবস",
    condolence: "শোকবার্তা",
    "political-posters": "রাজনৈতিক পোস্টার",
    "election-poster-new": "নির্বাচনী প্রচারণা পোস্টার",
    "victory-day-poster": "বিজয় দিবস পোস্টার",
    "victory-day-poster21971": "বিজয় দিবস পোস্টার ১৯৭১",
};

// TRENDING-TEMPLATES
export const categories: {
    id: TemplateCategory;
    label: string;
}[] = [
        { id: "all", label: "সব" },
        { id: "election", label: CATEGORY_MAP.election },
        { id: "rally", label: CATEGORY_MAP.rally },
        { id: "birthday", label: CATEGORY_MAP.birthday },
        { id: "victory", label: CATEGORY_MAP.victory },
        { id: "independence", label: CATEGORY_MAP.independence },
        { id: "condolence", label: CATEGORY_MAP.condolence },
    ];

// STEP-CARD
export type StepIconKey = "user-plus" | "layout-grid" | "image-plus" | "download";

// STEP-CARD
export const iconMap: Record<StepIconKey, LucideIcon> = {
    "user-plus": UserPlus,
    "layout-grid": LayoutGrid,
    "image-plus": ImagePlus,
    "download": Download,
};

export type {
    PosterCardItem,
    BadgeConfigItem,
    TemplateCardProps,
    TrendingTemplateClientProps,
    StepItem,
    StepCardProps,
    StatItem,
    StatCardProps,
    ReviewItem,
    UserFeedbackCarouselProps,
    FAQItem,
} from "./home.schema";
