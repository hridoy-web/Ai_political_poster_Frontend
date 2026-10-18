"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Sparkles, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface SlideItem {
    src: string;
    title: string;
    subtitle: string;
    accent: string;
}

// Brand colors strictly according to globals.css
const BRAND_GREEN = "#059669"; // --color-brand-green
const BRAND_RED = "#e11d48"; // --color-brand-primary

const slides: SlideItem[] = [
    {
        src: "/image/images11.jpg",
        title: "নির্বাচনী প্রচারণা",
        subtitle: "ভোট দিন প্রতীকে",
        accent: BRAND_GREEN,
    },
    {
        src: "/image/images26.jpg",
        title: "দলীয় সমাবেশ",
        subtitle: "২৫ অক্টোবর, ঢাকা",
        accent: BRAND_RED,
    },
    {
        src: "/image/images21.jpg",
        title: "প্রতিষ্ঠাবার্ষিকী",
        subtitle: "৭৫তম বর্ষপূর্তি",
        accent: BRAND_GREEN,
    },
    {
        src: "/image/image6.jpg",
        title: "বিজয় দিবস",
        subtitle: "১৬ ডিসেম্বর ১৯৭১",
        accent: BRAND_RED,
    },
    {
        src: "/image/images24.jpg",
        title: "শোকবার্তা",
        subtitle: "গভীর শোক ও সমবেদনা",
        accent: BRAND_GREEN,
    },
];

export default function HeroClient() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    // Auto-slide effect with pause on hover/touch
    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [isPaused, nextSlide]);

    const handleImageError = (index: number) => {
        setImageErrors((prev) => ({ ...prev, [index]: true }));
    };

    const activeSlide = slides[currentIndex];

    // Synchronize title
    useEffect(() => {
        const hero = document.getElementById("hero-section");
        if (hero) {
            hero.style.setProperty("--hero-accent", activeSlide.accent);
        }
    }, [activeSlide.accent]);

    return (
        <div
            className="relative z-10 flex w-full flex-col items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Dynamic Ambient Glow behind poster */}
            <motion.div
                key={activeSlide.accent}
                animate={{
                    backgroundColor: activeSlide.accent,
                    scale: [1, 1.08, 1],
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="pointer-events-none absolute -inset-4 -z-10 rounded-full opacity-25 blur-3xl sm:-inset-8 sm:opacity-35 dark:opacity-35"
            />

            {/* Poster Showcase Card */}
            <div className="group relative w-full max-w-[320px] sm:max-w-90 md:max-w-95 lg:max-w-97.5">
                {/* Floating Top-Right Feature Badge */}
                <div className="pointer-events-none absolute -top-3.5 -right-2 z-20 hidden items-center gap-1.5 rounded-full border border-white/70 bg-card/90 px-3 py-1.5 text-xs font-bold text-foreground shadow-xl shadow-black/10 backdrop-blur-xl sm:flex dark:border-white/15 dark:bg-card/95 animate-in fade-in duration-500">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>✨ এআই স্মার্ট কাটআউট</span>
                </div>

                {/* Floating Bottom-Left Feature Badge */}
                <div className="pointer-events-none absolute -bottom-3 -left-2 z-20 hidden items-center gap-1.5 rounded-full border border-white/70 bg-card/90 px-3 py-1.5 text-xs font-bold text-foreground shadow-xl shadow-black/10 backdrop-blur-xl sm:flex dark:border-white/15 dark:bg-card/95 animate-in fade-in duration-500">
                    <span
                        className="flex h-2 w-2 rounded-full transition-colors duration-500"
                        style={{ backgroundColor: activeSlide.accent }}
                    />
                    <span>🎨 ১-ক্লিকে এইচডি পোস্টার</span>
                </div>

                {/* Outer Glass Card */}
                <div className="relative aspect-3/4 w-full overflow-hidden rounded-3xl border border-white/80 bg-card/70 p-2.5 shadow-2xl shadow-black/10 backdrop-blur-2xl transition-all duration-300 sm:p-3 dark:border-white/15 dark:bg-card/85">
                    {/* Top Specular Highlight Line */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-linear-to-r from-transparent via-white/80 to-transparent dark:via-white/30" />

                    {/* Inner Poster Canvas */}
                    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-muted">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.03 }}
                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                className="relative h-full w-full"
                            >
                                {/* Fallback Backdrop if image fails */}
                                <div
                                    className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white"
                                    style={{
                                        background: `linear-gradient(145deg, ${activeSlide.accent}, #0f172a)`,
                                    }}
                                >
                                    {imageErrors[currentIndex] && (
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="rounded-full bg-white/20 p-3 backdrop-blur-md">
                                                <ImageIcon className="h-8 w-8 text-white" />
                                            </div>
                                            <span className="text-lg font-bold">{activeSlide.title}</span>
                                            <span className="text-xs text-white/80">{activeSlide.subtitle}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Slide Image */}
                                {!imageErrors[currentIndex] && (
                                    <Image
                                        src={activeSlide.src}
                                        alt={activeSlide.title}
                                        fill
                                        priority
                                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 400px"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        onError={() => handleImageError(currentIndex)}
                                    />
                                )}

                                {/* Contrast Vignette Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20" />

                                {/* Top Floating Badge */}
                                <div className="absolute left-3.5 top-3.5 z-10 flex items-center gap-1.5 rounded-full border border-white/25 bg-black/40 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md shadow-md sm:text-xs">
                                    <span
                                        className="h-2 w-2 rounded-full"
                                        style={{ backgroundColor: activeSlide.accent }}
                                    />
                                    <span>{activeSlide.title}</span>
                                </div>

                                {/* Bottom Info Glass Strip */}
                                <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 rounded-xl border border-white/20 bg-black/50 p-2.5 backdrop-blur-md">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="min-w-0">
                                            <p className="truncate text-xs font-bold text-white sm:text-sm">
                                                {activeSlide.title}
                                            </p>
                                            <p className="truncate text-[10px] text-white/75 sm:text-xs">
                                                {activeSlide.subtitle}
                                            </p>
                                        </div>
                                        <div className="flex shrink-0 items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                                            <Sparkles className="h-3 w-3 text-amber-300" />
                                            <span>HD প্রিন্ট</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Prev / Next Floating Arrows */}
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={prevSlide}
                        aria-label="পূর্ববর্তী স্লাইড"
                        className="absolute left-1 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md shadow-md transition-all duration-200 hover:bg-black/70 hover:scale-110 active:scale-95"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={nextSlide}
                        aria-label="পরবর্তী স্লাইড"
                        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md shadow-md transition-all duration-200 hover:bg-black/70 hover:scale-110 active:scale-95"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                {/* Pagination Indicator Dots */}
                <div className="mt-4 flex items-center justify-center gap-1.5 sm:gap-2">
                    {slides.map((slide, idx) => {
                        const isCurrent = idx === currentIndex;
                        return (
                            <button
                                key={slide.title}
                                type="button"
                                onClick={() => setCurrentIndex(idx)}
                                aria-label={`স্লাইড ${idx + 1}`}
                                className={cn(
                                    "h-2 rounded-full transition-all duration-300 cursor-pointer",
                                    isCurrent
                                        ? "w-7"
                                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                )}
                                style={{
                                    backgroundColor: isCurrent ? activeSlide.accent : undefined,
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
