import Link from "next/link";
import { Sparkles, ChevronRight, CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HeroSectionClient from "../client/hero-section-client";

export default function HeroSection() {
    return (
        <section
            id="hero-section"
            className="relative flex w-full select-none items-center justify-center overflow-hidden bg-background pt-2 pb-10 sm:pt-6 sm:pb-16 lg:pt-8 lg:pb-20 text-foreground transition-colors duration-300 sm:overflow-hidden"
        >
            {/* Smooth Radial Overlay Across Navbar & Bottom Section */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-brand-primary)/0.15,transparent_75%)] dark:bg-[radial-gradient(ellipse_at_top,var(--color-brand-primary)/0.25,transparent_80%)]"
            />

            {/* Main Grid Container */}
            <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-14">
                <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8 xl:gap-12">

                    {/* RIGHT COLUMN: CLIENT COMPONENT (CSR) */}
                    <div className="order-first lg:order-last relative z-10 flex w-full items-center justify-center lg:col-span-6">
                        <HeroSectionClient />
                    </div>

                    {/* LEFT COLUMN: HERO CONTENT (SSR) */}
                    <header className="order-last lg:order-first relative z-10 flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-left">

                        {/* Top Announcement Badge - Fully Transparent & Theme Adapted */}
                        <Badge
                            variant="outline"
                            className="badge-brand mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 dark:bg-primary/10 dark:border-primary/30 px-3.5 py-1.5 text-xs font-semibold shadow-xs backdrop-blur-md transition-colors duration-300 h-8 cursor-default"
                        >
                            <span className="relative flex h-2 w-2 shrink-0">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                            </span>
                            <Sparkles className="h-3.5 w-3.5 shrink-0 animate-pulse text-primary" />
                            <span className="text-foreground font-medium tracking-wide">
                                AI-পাওয়ার্ড পোস্টার জেনারেটর
                            </span>
                        </Badge>

                        {/* Title Heading */}
                        <h1 className="mb-4 sm:mb-6 text-3xl font-black leading-tight sm:leading-[1.2] tracking-tight sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
                            <span className="block text-foreground mb-1 sm:mb-2">
                                প্রফেশনাল{" "}
                                <span className="text-gradient-brand inline-block">
                                    রাজনৈতিক পোস্টার
                                </span>
                            </span>
                            <span className="block font-black text-foreground">
                                মুহূর্তেই তৈরি করুন
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="mb-6 sm:mb-8 max-w-2xl text-balance text-sm leading-relaxed sm:leading-relaxed text-muted-foreground sm:text-base md:text-lg xl:text-xl">
                            অনুমোদিত টেমপ্লেট, দলীয় রং, প্রতীক ও চমৎকার বাংলা ফন্ট — সবই এক প্ল্যাটফর্মে।
                            কৃত্রিম বুদ্ধিমত্তার (AI) সহায়তায় অটোমেটিক ব্যাকগ্রাউন্ড তৈরি করুন, রিয়েল-টাইম এইচডি প্রিভিউ দেখুন এবং কোনো প্রকার ওয়াটারমার্ক ছাড়াই এক ক্লিকে ডাউনলোড করুন।
                        </p>

                        {/* Action Buttons */}
                        <div className="flex w-full flex-col items-center justify-center gap-3.5 sm:w-auto sm:flex-row lg:justify-start">
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

                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="group w-full rounded-full font-bold px-8 py-6 text-sm sm:text-base cursor-pointer backdrop-blur-xs transition-all duration-300 hover:bg-accent/80 hover:text-accent-foreground hover:scale-105 active:scale-95 sm:w-auto border-border/80"
                            >
                                <Link href="/templates" className="inline-flex items-center justify-center gap-2">
                                    <span>টেমপ্লেট গ্যালারি</span>
                                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>

                        {/* Trust Badges */}
                        <footer className="mt-7 sm:mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground lg:justify-start">
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
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">১০০% ফ্রি ও ওয়াটারমার্ক ছাড়া</span>
                            </div>

                            <div className="flex items-center gap-1.5 font-medium">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">এইচডি কোয়ালিটি ডাউনলোড</span>
                            </div>
                        </footer>

                    </header>

                </div>
            </div>
        </section>
    );
}