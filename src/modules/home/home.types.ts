import { Download, ImagePlus, LayoutGrid, LucideIcon, UserPlus } from "lucide-react";

// HERO
export interface PosterCardItem {
    id: string;
    src: string;
    title: string;
}

// TRENDING-TEMPLATES
export type TemplateCategory =
    | "all"
    | "election"
    | "rally"
    | "birthday"
    | "condolence"
    | "victory";

// TRENDING-TEMPLATES
export interface Template {
    id: number;
    title: string;
    category: Exclude<TemplateCategory, "all">;
    categoryLabel?: string;
    badge?: "trending" | "new" | "popular";
    gradient: string;
    image: string;
}

// TRENDING-TEMPLATES
export const CATEGORY_MAP: Record<Exclude<TemplateCategory, "all">, string> = {
    election: "নির্বাচনী",
    rally: "সমাবেশ",
    birthday: "জন্মদিন",
    victory: "বিজয় দিবস",
    condolence: "শোকবার্তা",
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
        { id: "condolence", label: CATEGORY_MAP.condolence },
    ];

// TRENDING-TEMPLATES-CLIENT
export interface BadgeConfigItem {
    icon: LucideIcon;
    label: string;
    className: string;
}

// TRENDING-TEMPLATES-CLIENT
export interface TemplateCardProps {
    template: Template;
    className?: string;
}

// TRENDING-TEMPLATES-CLIENT
export interface TrendingTemplateClientProps {
    templates: Template[];
    categories: { id: TemplateCategory; label: string }[];
}


// STEP-CARD
export type StepIconKey = "user-plus" | "layout-grid" | "image-plus" | "download";

// STEP-CARD
export interface StepItem {
    number: string;
    title: string;
    description: string;
    icon: StepIconKey | LucideIcon;
}

// STEP-CARD
export interface StepCardProps {
    step: StepItem;
    isLast?: boolean;
    index?: number;
}

// STEP-CARD
export const iconMap: Record<StepIconKey, LucideIcon> = {
    "user-plus": UserPlus,
    "layout-grid": LayoutGrid,
    "image-plus": ImagePlus,
    "download": Download,
};

// STATISTICS-CLIENT
export interface StatItem {
    id: string;
    icon: LucideIcon;
    value: number;
    suffix: string;
    label: string;
    decimals?: number;
}

// STATISTICS-CLIENT
export interface StatCardProps {
    stat: StatItem;
    index: number;
    start: boolean;
}

// USER-FEEDBACK
export interface ReviewItem {
    id: string;
    name: string;
    role: string;
    party: string;
    comment: string;
    rating: number;
    avatarText: string;
}

// USER-FEEDBACK
export interface UserFeedbackCarouselProps {
    reviews: ReviewItem[];
}

// FAQ-SECTION
export interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

