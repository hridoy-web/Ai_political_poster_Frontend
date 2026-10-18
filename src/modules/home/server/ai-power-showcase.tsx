// দায়িত্বে: > Diponkor Roy 

import React from "react";
import Link from "next/link";
import { Sparkles, Zap, Target, Layers, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AiPowerShowcaseClient from "../client/ai-power-showcase-client";

// Feature
const FEATURES = [
    {
        icon: Zap,
        title: "লাইভ ডায়নামিক পোস্টার",
        description: "টেমপ্লেট ও তথ্য দিলেই চোখের পলকে ক্যানভাসে তৈরি হয় জীবন্ত পোস্টার প্রিভিউ।",
    },
    {
        icon: Target,
        title: "স্মার্ট স্লোগান ও ক্যাপশন",
        description: "নির্বাচনী উপলক্ষ ও ভাব অনুযায়ী মুহূর্তে তৈরি হয় আকর্ষণীয় স্লোগান ও ফেসবুক পোস্ট।",
    },
    {
        icon: Layers,
        title: "ক্যানভাসে সরাসরি সম্পাদনা",
        description: "পছন্দের পোস্টার ও স্লোগান এক ক্লিকে ডাউনলোড করুন বা ক্যানভাসে কাস্টমাইজ করুন।",
    },
];

export default function AiPowerShowcase() {
    return (
        <section className="w-full py-16 lg:py-24 relative overflow-hidden bg-background">
            {/* Background Decorative Radial Glows */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-brand-primary/10 blur-[120px] dark:bg-brand-primary/5" />
                <div className="absolute left-0 bottom-1/4 h-80 w-80 rounded-full bg-brand-secondary/10 blur-[130px] dark:bg-brand-secondary/5" />
            </div>

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-12 text-center sm:mb-16 animate-in fade-in slide-in-from-top-6 duration-700 ease-out fill-mode-both">
                    {/* Badge */}
                    <Badge
                        variant="outline"
                        className="mb-4 inline-flex h-auto w-fit items-center gap-2 overflow-visible rounded-full border border-brand-primary/20 bg-accent px-3.5 py-1.5 text-xs font-semibold text-accent-foreground backdrop-blur-md shadow-2xs"
                    >
                        <span className="relative flex h-2 w-2 shrink-0">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary" />
                        </span>
                        <Sparkles className="h-3.5 w-3.5 shrink-0 animate-pulse text-brand-primary" />
                        <span>লাইভ প্রিভিউ স্টুডিও • AI পোস্টার ও স্লোগান</span>
                    </Badge>

                    {/* Main Title */}
                    <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                        এক ক্লিকে তৈরি করুন{" "}
                        <span className="text-gradient-brand">
                            রাজনৈতিক পোস্টার
                        </span>
                    </h2>

                    {/* Subtitle */}
                    <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                        টেমপ্লেট বেছে নিয়ে তথ্য দিন — আমাদের ইন্টেলিজেন্ট AI এক ক্লিকে সম্পূর্ণ পোস্টার, ছন্দময় স্লোগান এবং সোশ্যাল মিডিয়া ক্যাপশন লাইভ তৈরি করবে।
                    </p>
                </div>

                {/* Top 3 Value Proposition Pills */}
                <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
                    {FEATURES.map((feat) => {
                        const Icon = feat.icon;
                        return (
                            <div
                                key={feat.title}
                                className="flex items-start gap-3.5 rounded-2xl border border-border/70 bg-card/60 p-4 backdrop-blur-sm transition-all duration-200 hover:border-brand-primary/30 hover:bg-card/90"
                            >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                                    <Icon className="h-5 w-5" />
                                </span>
                                <div className="min-w-0">
                                    <h3 className="text-sm font-bold text-foreground">
                                        {feat.title}
                                    </h3>
                                    <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                                        {feat.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* client */}
                <AiPowerShowcaseClient />

                {/* Bottom CTA Banner */}
                <div className="mt-14 flex flex-col items-center justify-between gap-4 rounded-3xl border border-brand-primary/20 bg-linear-to-r from-brand-primary/5 via-card to-brand-primary/10 p-6 backdrop-blur-md sm:flex-row sm:p-8">
                    <div className="text-center sm:text-left">
                        <h4 className="text-base font-bold text-foreground sm:text-lg">
                            আপনার পছন্দের স্লোগান দিয়ে এখনই পোস্টার ডিজাইন করুন!
                        </h4>
                        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                            টেমপ্লেট সিলেক্ট করুন, স্লোগান বসান এবং মুহূর্তেই ডাউনলোড করুন এইচডি পোস্টার।
                        </p>
                    </div>

                    <Button
                        asChild
                        size="lg"
                        className="rounded-full bg-gradient-brand text-white font-bold px-7 py-3 text-sm cursor-pointer shadow-md transition-all duration-200 hover:scale-105 active:scale-95 shrink-0"
                    >
                        <Link href="/templates" className="inline-flex items-center gap-2">
                            <span>টেমপ্লেট গ্যালারিতে যান</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
