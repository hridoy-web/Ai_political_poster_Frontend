import Link from "next/link";
import { Sparkles, ChevronRight, CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HeroSectionClient from "../client/hero-section-client";

export default function HeroSection() {
    return (
        <section
            id="hero-section"
            className="relative flex min-h-[calc(100vh-4rem)] w-full select-none items-center justify-center overflow-hidden bg-background py-10 sm:py-12 lg:py-16 text-foreground"
        >
            {/* Background Radial Glow Effect using Brand Colors */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,var(--color-brand-primary)/0.15,transparent_65%)] dark:bg-[radial-gradient(circle_at_50%_20%,var(--color-brand-primary)/0.25,transparent_70%)]"
            />

            {/* Main Grid Container */}
            <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-14">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">

                    {/* LEFT COLUMN: HERO CONTENT (SSR) */}
                    <header className="relative z-10 flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-left">

                        {/* Top Announcement Badge */}
                        <Badge
                            variant="outline"
                            className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 px-4 py-2.5 text-xs font-semibold backdrop-blur-md shadow-xs transition-all hover:bg-brand-primary/20 h-8"
                        >
                            <span className="relative flex h-2 w-2 shrink-0">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary" />
                            </span>
                            <Sparkles className="h-3.5 w-3.5 shrink-0 animate-pulse text-gradient-brand" />
                            <span className="text-gradient-brand">AI-পাওয়ার্ড পোস্টার জেনারেটর</span>
                        </Badge>

                        {/* Main Heading with Pure Brand Gradients */}
                        <h1 className="mb-6 text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
                            <span className="block text-gradient-green drop-shadow-xs">
                                প্রফেশনাল{" "}
                                <span className="text-gradient-brand inline-block drop-shadow-sm">
                                    রাজনৈতিক পোস্টার
                                </span>
                            </span>
                            <span className="mt-2 block font-black text-gradient-green drop-shadow-xs sm:mt-3">
                                মুহূর্তেই তৈরি করুন
                            </span>
                        </h1>

                        {/* Subtitle Description */}
                        <p className="mb-8 max-w-xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
                            অনুমোদিত টেমপ্লেট, দলীয় রং, প্রতীক ও চমৎকার বাংলা ফন্ট — সবই এক জায়গায়।
                            AI-এর সহায়তায় ব্যাকগ্রাউন্ড ডিজাইন করুন, প্রিভিউ দেখুন এবং এইচডি PNG ডাউনলোড করুন।
                        </p>

                        {/* Action Buttons */}
                        <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row lg:justify-start">
                            {/* Crimson Red Gradient Button */}
                            <Button
                                asChild
                                size="lg"
                                className="bg-gradient-brand group w-full rounded-full text-white font-bold px-8 py-6 text-sm sm:text-base cursor-pointer shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 sm:w-auto border-0"
                            >
                                <Link href="/templates" className="inline-flex items-center justify-center gap-2">
                                    <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
                                    <span>পোস্টার তৈরি করুন</span>
                                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>

                            {/* Emerald Green Gradient Secondary Button */}
                            <Button
                                asChild
                                size="lg"
                                className="bg-gradient-green group w-full rounded-full text-white font-bold px-8 py-6 text-sm sm:text-base cursor-pointer shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 sm:w-auto border-0"
                            >
                                <Link href="/templates" className="inline-flex items-center justify-center gap-2">
                                    <span>টেমপ্লেট গ্যালারি</span>
                                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>

                        {/* Trust Badges Footer */}
                        <footer className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground lg:justify-start">
                            <div className="flex items-center gap-1.5 bg-card/60 px-3.5 py-1.5 rounded-full border border-border/80 shadow-2xs backdrop-blur-xs">
                                <div className="flex text-amber-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                                    ))}
                                </div>
                                <span className="font-bold text-foreground">৪.৯/৫</span>
                                <span className="text-muted-foreground">(হাজারো কর্মী)</span>
                            </div>

                            <div className="flex items-center gap-1.5 font-medium">
                                <CheckCircle2 className="h-4 w-4 text-brand-green" />
                                <span className="text-gradient-green font-semibold">১০০% ফ্রি ও ওয়াটারমার্ক ছাড়া</span>
                            </div>

                            <div className="flex items-center gap-1.5 font-medium">
                                <CheckCircle2 className="h-4 w-4 text-brand-green" />
                                <span className="text-gradient-green font-semibold">এইচডি কোয়ালিটি ডাউনলোড</span>
                            </div>
                        </footer>

                    </header>

                    {/* RIGHT COLUMN: CLIENT COMPONENT (CSR) */}
                    <div className="relative z-10 flex w-full items-center justify-center lg:col-span-6">
                        <HeroSectionClient />
                    </div>

                </div>
            </div>
        </section>
    );
}
