import { Download, ImagePlus, LayoutGrid, LucideIcon, UserPlus } from "lucide-react";

// TRENDING-TEMPLATES
export type TemplateCategory =
    | "all"
    | "election"
    | "gathering"
    | "rally"
    | "birthday"
    | "victory-day"
    | "victory"
    | "independence-day"
    | "independence"
    | "mourning"
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
    gathering: "সমাবেশ",
    rally: "সমাবেশ",
    birthday: "জন্মদিন",
    "victory-day": "বিজয় দিবস",
    victory: "বিজয় দিবস",
    "independence-day": "স্বাধীনতা দিবস",
    independence: "স্বাধীনতা দিবস",
    mourning: "শোকবার্তা",
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
        { id: "election", label: "নির্বাচনী" },
        { id: "gathering", label: "সমাবেশ" },
        { id: "birthday", label: "জন্মদিন" },
        { id: "victory-day", label: "বিজয় দিবস" },
        { id: "independence-day", label: "স্বাধীনতা দিবস" },
        { id: "mourning", label: "শোকবার্তা" },
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
