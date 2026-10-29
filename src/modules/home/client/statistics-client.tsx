"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Image as ImageIcon, LayoutGrid, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

import { serverURL } from "@/lib/api/authApi";
import { StatCardProps, StatItem } from "../home.types";
import { DEFAULT_STATS } from "../home.service";

// Reusable helper to format
function formatBengaliNumber(val: number, decimals = 0): string {
    return new Intl.NumberFormat("bn-BD", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(val);
}

// Ultra-Smooth CountUp Animation Hook
function useCountUp(target: number, duration = 2000, start = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;

        let startTime: number | null = null;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (startTime === null) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Smooth easeOutCubic curve
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * target);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [start, target, duration]);

    return count;
}

function StatCard({ stat, index, start }: StatCardProps) {
    const Icon = stat.icon;
    const currentCount = useCountUp(stat.value, 2000 + index * 100, start);
    const formattedValue = formatBengaliNumber(currentCount, stat.decimals ?? 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            whileHover={{
                y: -4,
                transition: { duration: 0.2, ease: "easeOut" },
            }}
            className="h-full"
        >
            <Card className="group relative h-full overflow-hidden rounded-xl sm:rounded-2xl border border-border/80 bg-card/60 p-0 shadow-xs backdrop-blur-md transition-all duration-300 hover:border-brand-primary/50 hover:bg-card hover:shadow-lg hover:shadow-brand-primary/10 py-0! gap-0! [--card-spacing:0px]">
                <CardContent className="relative flex flex-col justify-center p-4 sm:px-6 sm:py-4">
                    {/* Ambient Spotlight Hover Background */}
                    <div className="pointer-events-none absolute -right-6 -bottom-6 h-20 w-20 rounded-full bg-brand-primary/10 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Icon Wrapper */}
                    <div className="relative mb-2.5 sm:mb-3 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-brand-primary/20 bg-brand-primary/10 text-brand-primary shadow-xs transition-transform duration-300 group-hover:scale-105 group-hover:bg-brand-primary group-hover:text-white">
                        <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                    </div>

                    {/* Numbers & Label */}
                    <div>
                        <div className="relative mb-1 flex items-baseline gap-1">
                            <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-none">
                                {formattedValue}
                            </CardTitle>
                            <span className="text-base sm:text-lg lg:text-xl font-bold leading-none bg-linear-to-r from-brand-primary to-brand-mint bg-clip-text text-transparent">
                                {stat.suffix}
                            </span>
                        </div>

                        <CardDescription className="text-xs sm:text-sm font-medium text-muted-foreground leading-normal">
                            {stat.label}
                        </CardDescription>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default function StatisticsClient() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });
    const [stats, setStats] = useState<StatItem[]>(DEFAULT_STATS);

    useEffect(() => {
        let isMounted = true;
        const baseUrl = serverURL || process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

        fetch(`${baseUrl}/api/v1/public/stats`)
            .then((res) => res.json())
            .then((data) => {
                if (isMounted && data?.success && data?.data) {
                    const d = data.data;
                    setStats([
                        {
                            id: "users",
                            icon: Users,
                            value: Number(d.totalUsers || 0),
                            suffix: "+",
                            label: "সক্রিয় ব্যবহারকারী",
                        },
                        {
                            id: "posters",
                            icon: ImageIcon,
                            value: Number(d.totalPosters || 0),
                            suffix: "+",
                            label: "তৈরি পোস্টার",
                        },
                        {
                            id: "templates",
                            icon: LayoutGrid,
                            value: Number(d.totalTemplates || 0),
                            suffix: "+",
                            label: "অনুমোদিত টেমপ্লেট",
                        },
                        {
                            id: "rating",
                            icon: Star,
                            value: Number(d.rating || 4.9),
                            suffix: "/৫",
                            label: "গড় রেটিং",
                            decimals: 1,
                        },
                    ]);
                }
            })
            .catch((err) => {
                console.warn("Failed to fetch public stats:", err);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div ref={containerRef} className="grid w-full grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {stats.map((stat, i) => (
                <StatCard
                    key={stat.id}
                    stat={stat}
                    index={i}
                    start={isInView}
                />
            ))}
        </div>
    );
}
