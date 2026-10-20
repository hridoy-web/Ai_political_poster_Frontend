// দায়িত্বে: > Diponkor Roy 

import React from "react";
import Link from "next/link";
import { Search, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HeroClient from "../client/hero-section-client";

const popularTags = ["নির্বাচনী", "সমাবেশ", "জন্মদিন", "শোকবার্তা", "বিজয় দিবস"];

export default function HeroSection() {
    return (
        <section
            id="hero-section"
            className="relative flex min-h-[calc(100vh-4rem)] w-full select-none items-center justify-center overflow-hidden bg-linear-to-b from-background via-brand-primary/5 to-background py-12 sm:py-16 lg:py-20"
            style={{ "--hero-accent": "#059669" } as React.CSSProperties}
        >
            {/* Background Subtle Tech Dot Grid Pattern */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-20 mask-[radial-gradient(ellipse_at_center,black_35%,transparent_75%)]"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                    backgroundSize: "28px 28px",
                }}
            />


            {/* Background Soft Ambient Radial Glows */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-brand-primary/15 blur-[110px] sm:h-105 sm:w-105 sm:blur-[140px] dark:bg-brand-primary/10" />
                <div className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-brand-secondary/15 blur-[110px] sm:h-105 sm:w-105 sm:blur-[150px] dark:bg-brand-secondary/10" />
                <div
                    className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full opacity-20 blur-[130px] transition-colors duration-700 sm:h-96 sm:w-96"
                    style={{ backgroundColor: "var(--hero-accent, #059669)" }}
                />
            </div>

            {/* Main Content Grid Container */}
            <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-14">
                    {/* LEFT COLUMN: HERO CONTENT */}
                    <div className="relative z-10 flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-left xl:col-span-7">
                        {/* Top Badge */}
                        <Badge
                            variant="outline"
                            className="mb-4 inline-flex h-auto w-fit items-center gap-2 overflow-visible rounded-full border border-brand-primary/25 bg-brand-primary/10 px-3.5 py-1.5 text-xs font-semibold text-brand-primary backdrop-blur-xl shadow-xs animate-in zoom-in-90 fade-in duration-500 delay-150 fill-mode-forwards"
                        >
                            <span className="relative flex h-2 w-2 shrink-0">
                                <span
                                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 transition-colors duration-500"
                                    style={{ backgroundColor: "var(--hero-accent, #059669)" }}
                                />
                                <span
                                    className="relative inline-flex h-2 w-2 rounded-full transition-colors duration-500"
                                    style={{ backgroundColor: "var(--hero-accent, #059669)" }}
                                />
                            </span>
                            <Sparkles
                                className="h-3.5 w-3.5 shrink-0 animate-pulse transition-colors duration-500"
                                style={{ color: "var(--hero-accent, #059669)" }}
                            />
                            <span>AI-পাওয়ার্ড পোস্টার জেনারেটর</span>
                        </Badge>

                        {/* Heading */}
                        <h1 className="mb-4 text-3xl font-extrabold leading-[1.18] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.35rem]">
                            <span className="block sm:whitespace-nowrap">
                                <span
                                    className="font-serif italic drop-shadow-xs mr-3 sm:mr-4 inline-block transition-colors duration-500"
                                    style={{ color: "var(--hero-accent, #059669)" }}
                                >
                                    প্রফেশনাল
                                </span>
                                <span className="bg-linear-to-r from-brand-primary via-brand-primary to-brand-green bg-clip-text text-transparent inline-block drop-shadow-xs">
                                    রাজনৈতিক পোস্টার,
                                </span>
                            </span>
                            <span className="block font-black tracking-tight text-foreground mt-1.5 sm:mt-2">
                                মুহূর্তেই তৈরি করুন
                            </span>
                        </h1>

                        {/* Subtitle / Description */}
                        <p className="mb-6 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg lg:text-base xl:text-lg">
                            অনুমোদিত টেমপ্লেট, দলীয় রং, প্রতীক ও চমৎকার বাংলা ফন্ট — সবই এক জায়গায়।
                            AI-এর সহায়তায় ব্যাকগ্রাউন্ড ডিজাইন করুন, প্রিভিউ দেখুন এবং এইচডি PNG ডাউনলোড করুন।
                        </p>

                        {/* Search Form */}
                        <form
                            action="/templates"
                            method="GET"
                            className="group mb-5 flex w-full max-w-md items-center gap-1.5 rounded-2xl border border-border/80 bg-card/85 p-1.5 shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-300 hover:border-brand-primary/40 focus-within:border-brand-primary focus-within:ring-4 focus-within:ring-brand-primary/15 sm:max-w-lg lg:max-w-md"
                        >
                            <div className="flex flex-1 items-center gap-2.5 min-w-0 pl-3 sm:pl-3.5">
                                <Search className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-focus-within:text-brand-primary" strokeWidth={2.2} />
                                <input
                                    type="text"
                                    name="q"
                                    placeholder="টেমপ্লেট খুঁজুন — নির্বাচনী, সমাবেশ, জন্মদিন..."
                                    className="w-full min-w-0 bg-transparent py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-sm font-medium"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="rounded-xl text-white font-bold px-5 py-2.5 text-xs sm:text-sm cursor-pointer border-0 shadow-md transition-all duration-500 hover:scale-105 active:scale-95"
                                style={{
                                    backgroundColor: "var(--hero-accent, #059669)",
                                    backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.15) 100%)",
                                    boxShadow: "0 4px 16px color-mix(in srgb, var(--hero-accent, #059669) 40%, transparent)",
                                }}
                            >
                                খুঁজুন
                            </Button>
                        </form>

                        {/* Popular Tags */}
                        <div className="mb-7 flex flex-wrap items-center justify-center gap-2 text-xs sm:mb-8 lg:justify-start">
                            <span className="font-semibold text-muted-foreground">জনপ্রিয়:</span>
                            {popularTags.map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/templates?category=${encodeURIComponent(tag)}`}
                                    className="rounded-full border border-border/80 bg-card/70 px-3.5 py-1 text-muted-foreground transition-all duration-200 hover:border-brand-primary/40 hover:bg-accent hover:text-accent-foreground hover:shadow-xs hover:scale-105 active:scale-95"
                                >
                                    #{tag}
                                </Link>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex w-full flex-col items-center justify-center gap-3.5 sm:w-auto sm:flex-row sm:gap-4 lg:justify-start">
                            <Button
                                asChild
                                size="lg"
                                className="group rounded-full text-white font-bold px-8 py-3.5 text-sm sm:text-base cursor-pointer border-0 transition-all duration-500 hover:scale-105 active:scale-95 w-full sm:w-auto shadow-lg"
                                style={{
                                    backgroundColor: "var(--hero-accent, #059669)",
                                    backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.18) 100%)",
                                    boxShadow: "0 8px 24px color-mix(in srgb, var(--hero-accent, #059669) 45%, transparent)",
                                }}
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
                                className="rounded-full border-border/90 bg-card/80 px-7 py-3.5 text-sm font-semibold text-foreground shadow-xs backdrop-blur-md transition-all duration-200 hover:border-brand-primary/40 hover:bg-accent hover:text-accent-foreground w-full sm:w-auto sm:text-base cursor-pointer hover:scale-105 active:scale-95"
                            >
                                <Link href="/templates" className="inline-flex items-center justify-center">
                                    টেমপ্লেট গ্যালারি
                                </Link>
                            </Button>
                        </div>

                        {/* Social Proof / Micro Trust Row */}
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground lg:justify-start">
                            <div className="flex items-center gap-1.5">
                                <span className="flex text-amber-400">★★★★★</span>
                                <span className="font-semibold text-foreground">৪.৯/৫</span>
                                <span>(হাজারো কর্মী)</span>
                            </div>
                            <span className="hidden h-1 w-1 rounded-full bg-muted-foreground/40 sm:inline-block" />
                            <div className="flex items-center gap-1.5 font-medium">
                                <span className="text-emerald-500">✓</span>
                                <span>১০০% ফ্রি ও ওয়াটারমার্ক ছাড়া</span>
                            </div>
                            <span className="hidden h-1 w-1 rounded-full bg-muted-foreground/40 sm:inline-block" />
                            <div className="flex items-center gap-1.5 font-medium">
                                <span className="text-emerald-500">✓</span>
                                <span>এইচডি কোয়ালিটি ডাউনলোড</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="relative z-10 flex w-full flex-col items-center justify-center lg:col-span-6 xl:col-span-5">
                        <HeroClient />
                    </div>
                </div>
            </div>
        </section>
    );
}
