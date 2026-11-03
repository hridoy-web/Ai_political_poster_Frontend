import { LucideIcon } from "lucide-react";
import { StepIconKey, Template, TemplateCategory } from "./home.types";

// HERO
export interface PosterCardItem {
    id: string;
    src: string;
    title: string;
}

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
    categories?: { id: TemplateCategory | string; label: string }[];
}

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

// TRENDING-TEMPLATES-CLIENT
export interface ApiCategoryItem {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    sortOrder?: number;
    isActive?: boolean;
}

// TRENDING-TEMPLATES-CLIENT
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

// TRENDING-TEMPLATES-CLIENT
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

// TRENDING-TEMPLATES-CLIENT
export interface TemplateCategoryOption {
    id: string;
    label: string;
    count?: number;
}

