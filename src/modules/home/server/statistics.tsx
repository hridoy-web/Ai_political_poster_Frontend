import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import StatisticsClient from "../client/statistics-client";

export default function Statistics() {
    return (
        <section className="relative overflow-hidden bg-linear-to-b from-background via-brand-primary/5 to-background py-14 sm:py-18 lg:py-20">
            {/* Background Radial Glow Effects */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 left-1/3 h-80 w-80 rounded-full bg-brand-primary/10 blur-[120px]" />
                <div className="absolute -bottom-20 right-1/3 h-80 w-80 rounded-full bg-brand-secondary/10 blur-[120px]" />
            </div>

            <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-6 text-center sm:mb-8 animate-in fade-in slide-in-from-top-6 duration-700 ease-out fill-mode-both">
                    {/* Badge */}
                    <Badge
                        variant="outline"
                        className="mb-3 inline-flex h-auto w-fit items-center gap-2 rounded-full border-brand-primary/20 bg-accent px-3.5 py-1.5 text-xs font-semibold text-accent-foreground backdrop-blur-md shadow-2xs sm:text-sm"
                    >
                        <TrendingUp className="h-4 w-4 text-brand-green animate-pulse" />
                        <span>আমাদের অর্জন</span>
                    </Badge>

                    {/* Title */}
                    <h2 className="mb-2.5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                        আপনার <span className="text-gradient-brand">আস্থার</span> প্রতিদান
                    </h2>

                    {/* Subtitle */}
                    <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                        প্রতিদিন হাজারো দলীয় কর্মী ও নেতা নিশ্চিন্তে আমাদের প্ল্যাটফর্মে যুক্ত হয়ে প্রফেশনাল মানসম্পন্ন পোস্টার তৈরি করছেন।
                    </p>
                </div>

                {/* client */}
                <StatisticsClient />
            </div>
        </section>
    );
}
