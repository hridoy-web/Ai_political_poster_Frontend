"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Flame, Sparkles, Star, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
    CATEGORY_MAP,
    type Template,
    type TemplateCategory,
} from "../server/trending-templates";
import { Button } from "@/components/ui/button";

interface BadgeConfigItem {
    icon: LucideIcon;
    label: string;
    className: string;
}

const BADGE_CONFIG: Record<"trending" | "new" | "popular", BadgeConfigItem> = {
    trending: {
        icon: Flame,
        label: "ট্রেন্ডিং",
        className: "bg-brand-primary/90 text-white border-brand-secondary/40 shadow-xs",
    },
    new: {
        icon: Sparkles,
        label: "নতুন",
        className: "bg-brand-green/90 text-white border-brand-mint/40 shadow-xs",
    },
    popular: {
        icon: Star,
        label: "জনপ্রিয়",
        className: "bg-amber-500/90 text-white border-amber-400/50 shadow-xs",
    },
};

interface TemplateCardProps {
    template: Template;
    className?: string;
}

function TemplateCard({ template, className }: TemplateCardProps) {
    const [imageError, setImageError] = useState(false);
    const badge = template.badge ? BADGE_CONFIG[template.badge] : null;
    const BadgeIcon = badge?.icon;
    const categoryLabel = CATEGORY_MAP[template.category] || template.category;

    return (
        <Card
            className={cn(
                "group relative overflow-hidden rounded-2xl border border-border/80 bg-card p-0 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-xl hover:shadow-brand-primary/5 py-0! gap-0! [--card-spacing:0px] w-full flex flex-col justify-between",
                className
            )}
        >
            {/* Image & Preview Container */}
            <div className="relative aspect-3/4 w-full overflow-hidden bg-muted">
                {/* Background */}
                <div
                    className={cn(
                        "absolute inset-0 bg-linear-to-br flex flex-col items-center justify-center p-4 text-center transition-transform duration-500 group-hover:scale-105",
                        template.gradient
                    )}
                >
                    {imageError && (
                        <div className="flex flex-col items-center gap-1.5 text-white/95">
                            <span className="text-xs font-semibold uppercase tracking-wider opacity-85">
                                {categoryLabel}
                            </span>
                            <span className="text-sm sm:text-base font-extrabold line-clamp-2 px-2">
                                {template.title}
                            </span>
                        </div>
                    )}
                </div>

                {/* Template Image */}
                {template.image && !imageError && (
                    <Image
                        src={template.image}
                        alt={template.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={() => setImageError(true)}
                        priority={false}
                    />
                )}

                {/* Overlay to give contrast */}
                <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/35" />

                {/* Hover Overlay Button */}
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                    <Button
                        asChild
                        className="rounded-full bg-gradient-brand text-white font-bold px-5 py-2 text-xs sm:text-sm cursor-pointer shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
                    >
                        <Link
                            href={`/templates/${template.id}`}
                            className="inline-flex items-center gap-2"
                        >
                            <Eye className="h-4 w-4" />
                            <span>ব্যবহার করুন</span>
                        </Link>
                    </Button>
                </div>

                {/* Badge (Trending / New / Popular) */}
                {badge && BadgeIcon && (
                    <div
                        className={cn(
                            "absolute left-2.5 top-2.5 sm:left-3 sm:top-3 z-10 flex items-center gap-1 rounded-full border px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-semibold shadow-md backdrop-blur-md",
                            badge.className
                        )}
                    >
                        <BadgeIcon className="h-3 w-3 shrink-0" />
                        <span>{badge.label}</span>
                    </div>
                )}

                {/* Category Tag */}
                <div className="absolute right-2.5 top-2.5 sm:right-3 sm:top-3 z-10 rounded-full border border-white/20 bg-black/40 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium text-white backdrop-blur-md">
                    {categoryLabel}
                </div>
            </div>

            {/* Card Information */}
            <CardContent className="p-3 sm:p-4">
                <Link href={`/templates/${template.id}`} className="block">
                    <h3 className="truncate text-xs sm:text-sm md:text-base font-bold text-foreground transition-colors group-hover:text-brand-primary">
                        {template.title}
                    </h3>
                </Link>
                <div className="mt-1 flex items-center justify-between gap-1">
                    <p className="truncate text-[11px] sm:text-xs text-muted-foreground">
                        PNG · সম্পাদনাযোগ্য
                    </p>
                    <Button
                        asChild
                        variant="ghost"
                        size="icon-xs"
                        className="rounded-full text-brand-primary hover:bg-accent hover:text-accent-foreground transition-transform duration-300 group-hover:translate-x-1 shrink-0"
                    >
                        <Link
                            href={`/templates/${template.id}`}
                            aria-label={`${template.title} ব্যবহার করুন`}
                        >
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

interface TrendingTemplateClientProps {
    templates: Template[];
    categories: { id: TemplateCategory; label: string }[];
}

export default function TrendingTemplateClient({
    templates,
    categories,
}: TrendingTemplateClientProps) {
    const [activeCategory, setActiveCategory] = useState<TemplateCategory>("all");

    // Memoized filter logic
    const filteredTemplates = useMemo(() => {
        if (activeCategory === "all") return templates;
        return templates.filter((t) => t.category === activeCategory);
    }, [activeCategory, templates]);

    return (
        <div>
            {/* Category Filter Tabs */}
            <div className="mb-8 flex items-center justify-center sm:mb-12">
                <div className="flex max-w-full gap-2 overflow-x-auto p-1.5 scrollbar-none sm:flex-wrap sm:justify-center">
                    {categories.map((cat) => {
                        const isActive = activeCategory === cat.id;
                        return (
                            <Button
                                key={cat.id}
                                type="button"
                                variant={isActive ? "default" : "outline"}
                                size="sm"
                                onClick={() => setActiveCategory(cat.id)}
                                className={cn(
                                    "shrink-0 rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer h-auto",
                                    isActive
                                        ? "bg-linear-to-b from-brand-primary via-brand-primary to-brand-hover dark:from-brand-secondary dark:via-brand-secondary dark:to-brand-hover text-white border-transparent shadow-none! hover:shadow-none! [box-shadow:none!important] hover:[box-shadow:none!important]"
                                        : "bg-card text-muted-foreground border border-border/80 shadow-xs hover:border-brand-primary/40 hover:bg-accent hover:text-accent-foreground hover:shadow-sm"
                                )}
                            >
                                <span>{cat.label}</span>
                            </Button>
                        );
                    })}
                </div>
            </div>

            {/* Templates Grid Container */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
                {filteredTemplates.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                ))}
            </div>

            {/* Empty State */}
            {filteredTemplates.length === 0 && (
                <div className="py-16 text-center">
                    <p className="text-sm font-medium text-muted-foreground sm:text-base">
                        এই ক্যাটেগরিতে এখনো কোনো টেমপ্লেট পাওয়া যায়নি।
                    </p>
                </div>
            )}
        </div>
    );
}
