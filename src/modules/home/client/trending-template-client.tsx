"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_MAP, TemplateCardProps, TrendingTemplateClientProps } from "../home.types";


function TemplateCard({ template }: TemplateCardProps) {
    const [imageError, setImageError] = useState(false);
    const categoryLabel = template.categoryLabel || CATEGORY_MAP[template.category] || template.category;
    // console.log("Rendering TemplateCard:", template);

    return (
        <Card className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card p-0 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-xl hover:shadow-brand-primary/5 py-0! gap-0! [--card-spacing:0px] w-full flex flex-col justify-between">
            {/* Image & Preview Container */}
            <div className="relative aspect-3/4 w-full overflow-hidden bg-muted">
                {/* Background */}
                <div
                    className={cn(
                        "absolute inset-0 bg-linear-to-br flex flex-col items-center justify-center p-4 text-center transition-transform duration-500 group-hover:scale-105",
                        template.gradient || "from-emerald-600 via-green-700 to-emerald-900"
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

                {/* Trending Badge */}
                <Badge
                    className="absolute left-2.5 top-2.5 sm:left-3 sm:top-3 z-10 border-brand-secondary/40 bg-brand-primary/90 text-white shadow-xs backdrop-blur-md text-[10px] sm:text-xs font-semibold"
                >
                    <Flame className="text-white" />
                    <span>ট্রেন্ডিং</span>
                </Badge>

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


export default function TrendingTemplateClient({
    templates,
}: TrendingTemplateClientProps) {
    return (
        <div>
            {/* Templates Grid Container */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
                {templates.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                ))}
            </div>

            {/* Empty State */}
            {templates.length === 0 && (
                <div className="py-16 text-center">
                    <p className="text-sm font-medium text-muted-foreground sm:text-base">
                        কোনো টেমপ্লেট পাওয়া যায়নি।
                    </p>
                </div>
            )}
        </div>
    );
}
