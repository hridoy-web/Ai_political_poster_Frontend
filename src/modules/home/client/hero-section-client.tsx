"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PosterCardItem {
    id: string;
    src: string;
    title: string;
    subtitle: string;
    category: string;
    accent: string;
}

// Brand colors referencing globals.css
const BRAND_GREEN = "var(--color-brand-green)";
const BRAND_RED = "var(--color-brand-primary)";

// 5 curated poster cards (no repeated code)
const POSTERS: PosterCardItem[] = [
    {
        id: "poster-1",
        src: "/image/images11.jpg",
        title: "নির্বাচনী প্রচারণা",
        subtitle: "ভোট দিন প্রতীকে",
        category: "নির্বাচনী",
        accent: BRAND_GREEN,
    },
    {
        id: "poster-2",
        src: "/image/images26.jpg",
        title: "দলীয় সমাবেশ",
        subtitle: "২৫ অক্টোবর, ঢাকা",
        category: "সমাবেশ",
        accent: BRAND_RED,
    },
    {
        id: "poster-3",
        src: "/image/images21.jpg",
        title: "প্রতিষ্ঠাবার্ষিকী",
        subtitle: "৭৫তম বর্ষপূর্তি",
        category: "বার্ষিকী",
        accent: BRAND_GREEN,
    },
    {
        id: "poster-4",
        src: "/image/image6.jpg",
        title: "বিজয় দিবস",
        subtitle: "১৬ ডিসেম্বর ১৯৭১",
        category: "জাতীয় দিবস",
        accent: BRAND_RED,
    },
    {
        id: "poster-5",
        src: "/image/images24.jpg",
        title: "শুভ জন্মদিন",
        subtitle: "আন্তরিক শুভেচ্ছা ও অভিনন্দন",
        category: "জন্মদিন",
        accent: BRAND_GREEN,
    },
];


const CARD_TRANSFORMS = [
    { rotate: -10, x: "-22%", defaultZ: 1 },
    { rotate: -5, x: "-11%", defaultZ: 2 },
    { rotate: 0, x: "0%", defaultZ: 3 },
    { rotate: 5, x: "11%", defaultZ: 4 },
    { rotate: 10, x: "22%", defaultZ: 5 },
];

export default function HeroSectionClient() {
    const [activeIdx, setActiveIdx] = useState(POSTERS.length - 1);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll-linked upward motion
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });
    const scrollParallaxY = useTransform(scrollYProgress, [0, 1], [0, -40]);

    // const activePoster = POSTERS[activeIdx];

    const handleImageError = (id: string) => {
        setImageErrors((prev) => ({ ...prev, [id]: true }));
    };

    return (
        <div
            ref={containerRef}
            className="relative z-10 flex w-full flex-col items-center justify-center py-2 sm:py-4"
        >
            {/* Ambient Background Glow (Red Brand Gradient) */}
            <motion.div
                animate={{
                    scale: [1, 1.08, 1],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-brand-primary/20 opacity-20 blur-3xl sm:-inset-10 sm:opacity-25"
            />

            {/* Fanned Stack Canvas Container */}
            <motion.div
                style={{ y: scrollParallaxY }}
                className="relative flex h-95 w-full max-w-85 items-center justify-center sm:h-110 sm:max-w-100 md:h-122.5 md:max-w-112.5 lg:h-132.5 lg:max-w-122.5 xl:h-140 xl:max-w-132.5"
            >
                {POSTERS.map((poster, index) => {
                    const transform = CARD_TRANSFORMS[index % CARD_TRANSFORMS.length];
                    const isHovered = hoveredIdx === index;
                    const isActive = activeIdx === index;

                    // smooth cinematic timing
                    const entranceDelay = 0.2 + index * 0.48;

                    // Compute dynamic zIndex
                    const zIndex = isHovered
                        ? 40
                        : isActive
                            ? 20
                            : transform.defaultZ;

                    return (
                        <motion.div
                            key={poster.id}
                            initial={{
                                y: 350,
                                opacity: 0,
                                scale: 2.00,
                                rotate: 0,
                            }}
                            animate={{
                                y: 0,
                                opacity: 1,
                                scale: isActive ? 1.02 : 1.00,
                                rotate: transform.rotate,
                            }}
                            transition={{
                                duration: 3.0,
                                delay: entranceDelay,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            whileHover={{
                                y: -24,
                                scale: 1.05,
                                rotate: transform.rotate * 0.8,
                                transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                            }}
                            onClick={() => setActiveIdx(index)}
                            onMouseEnter={() => setHoveredIdx(index)}
                            onMouseLeave={() => setHoveredIdx(null)}
                            style={{
                                x: transform.x,
                                zIndex,
                            }}
                            className={cn(
                                "group absolute aspect-3/4 w-46 sm:w-54 md:w-62 lg:w-68 xl:w-74 cursor-pointer overflow-hidden rounded-2xl border bg-card/90 shadow-2xl transition-all duration-500 backdrop-blur-md select-none",
                                isActive
                                    ? "border-white/80 ring-2 ring-primary/40 shadow-black/40 dark:border-white/30"
                                    : "border-white/40 shadow-black/25 hover:border-white/70 dark:border-white/10 dark:hover:border-white/25"
                            )}
                        >
                            {/* Inner Poster Canvas */}
                            <div className="relative h-full w-full overflow-hidden bg-muted">
                                {!imageErrors[poster.id] ? (
                                    <Image
                                        src={poster.src}
                                        alt={poster.title}
                                        fill
                                        priority={index >= 3}
                                        sizes="(max-width: 640px) 200px, (max-width: 1024px) 280px, 340px"
                                        className={cn(
                                            "object-cover transition-all duration-1000 group-hover:scale-105",
                                            !isActive && !isHovered
                                                ? "contrast-95 brightness-95"
                                                : "contrast-105 brightness-100"
                                        )}
                                        onError={() => handleImageError(poster.id)}
                                    />
                                ) : (
                                    <div
                                        className="flex h-full w-full flex-col items-center justify-center bg-linear-to-br from-brand-primary/80 via-slate-900 to-black p-4 text-center text-white"
                                    >
                                        <ImageIcon className="mb-2 h-8 w-8 text-white/80" />
                                        <span className="text-xs font-bold sm:text-sm">{poster.title}</span>
                                    </div>
                                )}

                                {/* Top Light Reflection Line */}
                                <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-linear-to-r from-transparent via-white/80 to-transparent dark:via-white/30" />

                                {/* Top Category Badge */}
                                <div className="absolute left-2.5 top-2.5 z-10 flex items-center gap-1 rounded-full border border-white/30 bg-black/50 px-2 py-0.5 text-[9px] font-semibold text-white backdrop-blur-md sm:left-3 sm:top-3 sm:px-2.5 sm:text-[10px]">
                                    <span
                                        className={cn(
                                            "h-1.5 w-1.5 rounded-full",
                                            poster.accent === BRAND_GREEN ? "bg-brand-green" : "bg-brand-primary"
                                        )}
                                    />
                                    <span>{poster.category}</span>
                                </div>

                                {/* Contrast Vignette + Bottom Title Card */}
                                <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/90 via-black/35 to-transparent p-3 sm:p-4">
                                    <div className="flex items-center justify-between gap-1.5">
                                        <div className="min-w-0">
                                            <p className="truncate text-xs font-black uppercase tracking-tight text-white sm:text-sm">
                                                {poster.title}
                                            </p>
                                            <p className="truncate text-[10px] text-white/80 sm:text-xs">
                                                {poster.subtitle}
                                            </p>
                                        </div>
                                        <div className="flex shrink-0 items-center gap-0.5 rounded-full bg-white/20 px-1.5 py-0.5 text-[9px] font-semibold text-white backdrop-blur-sm sm:px-2 sm:text-[10px]">
                                            <Sparkles className="h-2.5 w-2.5 text-amber-300" />
                                            <span>HD</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Quick Interactive Indicators */}
            <div className="mt-4 flex items-center justify-center gap-1.5 sm:gap-2">
                {POSTERS.map((poster, idx) => {
                    const isCurrent = idx === activeIdx;
                    return (
                        <button
                            key={poster.id}
                            type="button"
                            onClick={() => setActiveIdx(idx)}
                            aria-label={`পোস্টার ${idx + 1}: ${poster.title}`}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                                isCurrent
                                    ? poster.accent === BRAND_GREEN
                                        ? "w-6 bg-brand-green"
                                        : "w-6 bg-brand-primary"
                                    : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                            )}
                        />
                    );
                })}
            </div>
        </div>
    );
}
