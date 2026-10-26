"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PosterCardItem {
    id: string;
    src: string;
    title: string;
}

const POSTERS: PosterCardItem[] = [
    {
        id: "poster-1",
        src: "/image/images11.jpg",
        title: "নির্বাচনী প্রচারণা",
    },
    {
        id: "poster-2",
        src: "/image/images26.jpg",
        title: "দলীয় সমাবেশ",
    },
    {
        id: "poster-3",
        src: "/image/images21.jpg",
        title: "প্রতিষ্ঠাবার্ষিকী",
    },
    {
        id: "poster-4",
        src: "/image/image6.jpg",
        title: "বিজয় দিবস",
    },
    {
        id: "poster-5",
        src: "/image/images24.jpg",
        title: "শুভ জন্মদিন",
    },
];

export default function HeroSectionClient() {
    const [activeIdx, setActiveIdx] = useState(0);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
    const isInteractingRef = useRef(false);

    // Smooth & Lag-free Auto-slide interval
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isInteractingRef.current) {
                setActiveIdx((prev) => (prev + 1) % POSTERS.length);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleImageError = (id: string) => {
        setImageErrors((prev) => ({ ...prev, [id]: true }));
    };

    return (
        <div 
            className="relative z-10 flex w-full flex-col items-center justify-center overflow-hidden sm:overflow-visible"
            onMouseEnter={() => { isInteractingRef.current = true; }}
            onMouseLeave={() => { isInteractingRef.current = false; }}
            onTouchStart={() => { isInteractingRef.current = true; }}
            onTouchEnd={() => { 
                setTimeout(() => { isInteractingRef.current = false; }, 2000); 
            }}
        >
            {/* Card Stack Container - Mobile Optimized */}
            <div className="relative flex h-80 w-full max-w-72 items-center justify-center sm:h-100 sm:max-w-96 md:h-115 md:max-w-108 lg:h-125 lg:max-w-118 xl:h-135 xl:max-w-lg">
                {POSTERS.map((poster, index) => {
                    const total = POSTERS.length;
                    const offset = (index - activeIdx + total) % total;

                    let position = offset;
                    if (offset > Math.floor(total / 2)) {
                        position = offset - total;
                    }

                    const isActive = position === 0;
                    const isHovered = hoveredIdx === index;

                    // Smooth card positioning calculation
                    let transformClass = "translate-x-0 rotate-0 scale-100 z-10 opacity-0 pointer-events-none";

                    if (position === 0) {
                        // Center Active Card - Straight & Front
                        transformClass = "translate-x-0 rotate-0 scale-105 z-40 opacity-100";
                    } else if (position === 1) {
                        // Right Card 1
                        transformClass = "translate-x-[16%] sm:translate-x-[20%] rotate-[6deg] sm:rotate-[8deg] scale-95 z-30 opacity-90";
                    } else if (position === 2) {
                        // Right Card 2
                        transformClass = "translate-x-[30%] sm:translate-x-[36%] rotate-[12deg] sm:rotate-[15deg] scale-90 z-20 opacity-60";
                    } else if (position === -1) {
                        // Left Card 1
                        transformClass = "-translate-x-[16%] sm:-translate-x-[20%] -rotate-[6deg] sm:-rotate-[8deg] scale-95 z-30 opacity-90";
                    } else if (position === -2) {
                        // Left Card 2
                        transformClass = "-translate-x-[30%] sm:-translate-x-[36%] -rotate-[12deg] sm:-rotate-[15deg] scale-90 z-20 opacity-60";
                    }

                    if (isHovered && !isActive) {
                        transformClass += " z-50 scale-100";
                    }

                    return (
                        <div
                            key={poster.id}
                            onClick={() => setActiveIdx(index)}
                            onMouseEnter={() => setHoveredIdx(index)}
                            onMouseLeave={() => setHoveredIdx(null)}
                            style={{ willChange: "transform, opacity" }}
                            className={cn(
                                "group absolute aspect-3/4 w-44 sm:w-54 md:w-62 lg:w-68 xl:w-74 cursor-pointer overflow-hidden rounded-2xl border bg-card shadow-xl select-none transform-gpu transition-all duration-500 ease-in-out",
                                transformClass,
                                isActive
                                    ? "border-primary ring-2 ring-primary/40 shadow-black/40 dark:border-white/60"
                                    : "border-border/60 hover:border-border dark:border-white/15"
                            )}
                        >
                            {/* Inner Poster Canvas without Text Overlay */}
                            <div className="relative h-full w-full overflow-hidden bg-muted">
                                {!imageErrors[poster.id] ? (
                                    <Image
                                        src={poster.src}
                                        alt={poster.title}
                                        fill
                                        priority={true}
                                        loading="eager"
                                        sizes="(max-width: 640px) 180px, (max-width: 1024px) 260px, 320px"
                                        className={cn(
                                            "object-cover transition-transform duration-500 group-hover:scale-105",
                                            !isActive
                                                ? "contrast-95 brightness-95"
                                                : "contrast-105 brightness-100"
                                        )}
                                        onError={() => handleImageError(poster.id)}
                                    />
                                ) : (
                                    <div className="flex h-full w-full flex-col items-center justify-center bg-muted p-4 text-center">
                                        <ImageIcon className="mb-2 h-8 w-8 text-muted-foreground" />
                                        <span className="text-xs font-bold sm:text-sm">{poster.title}</span>
                                    </div>
                                )}

                                {/* Subtle Top Glass Reflection Line */}
                                <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-linear-to-r from-transparent via-white/60 to-transparent" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pagination Bullet Indicators */}
            <div className="mt-1 flex items-center justify-center gap-1.5">
                {POSTERS.map((poster, idx) => {
                    const isCurrent = idx === activeIdx;
                    return (
                        <button
                            key={poster.id}
                            type="button"
                            onClick={() => setActiveIdx(idx)}
                            aria-label={`পোস্টার ${idx + 1}`}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                                isCurrent
                                    ? "w-6 bg-primary"
                                    : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                            )}
                        />
                    );
                })}
            </div>
        </div>
    );
}