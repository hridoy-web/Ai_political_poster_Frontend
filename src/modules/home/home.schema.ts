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
    categories: { id: TemplateCategory | string; label: string }[];
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

