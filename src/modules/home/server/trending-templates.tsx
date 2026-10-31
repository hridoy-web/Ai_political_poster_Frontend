import { Flame, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TrendingTemplateClient from '../client/trending-template-client';
import { HomeService } from "../home.service";


export default async function TrendingTemplates() {
    const templates = await HomeService.getTrendingTemplates();
    const categories = await HomeService.getTrendingCategories();

    return (
        <section className="relative w-full overflow-hidden bg-linear-to-b from-background via-brand-primary/5 to-background py-4 md:py-6 lg:py-8 dark:via-brand-primary/10">
            {/* Background Radial Glow Effects */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 left-1/3 h-80 w-80 rounded-full bg-brand-primary/10 blur-[120px] dark:bg-brand-primary/5" />
                <div className="absolute -bottom-20 right-1/3 h-80 w-80 rounded-full bg-brand-secondary/10 blur-[120px] dark:bg-brand-secondary/5" />
            </div>

            <div className="container relative mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="mb-3 text-center sm:mb-4 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-forwards">
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 px-4 py-1 text-xs font-semibold text-brand-primary dark:text-brand-secondary shadow-xs sm:text-sm animate-in zoom-in-90 fade-in duration-500 delay-150 fill-mode-forwards">
                        <Flame className="h-4 w-4 text-brand-primary animate-pulse" />
                        <span>জনপ্রিয় টেমপ্লেট</span>
                    </div>

                    <h2 className="mb-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-forwards">
                        ট্রেন্ডিং <span className="text-gradient-brand">টেমপ্লেট</span>
                    </h2>

                    <p className="mx-auto max-w-xl text-sm text-muted-foreground sm:text-base animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-forwards">
                        আমাদের প্ল্যাটফর্মে থাকা সেরা কিছু রাজনৈতিক ফ্রেম, ডিজাইন ও ক্যাটেগরি বেছে নিন
                    </p>
                </div>

                {/* Client Component */}
                <TrendingTemplateClient templates={templates} categories={categories} />

                {/* View All CTA Button */}
                <div className="mt-4 md:mt-6 text-center sm:mt-5">
                    <Button
                        asChild
                        size="lg"
                        className="rounded-full bg-gradient-brand text-white font-bold px-8 py-3.5 text-sm sm:text-base cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                        <Link href="/templates" className="inline-flex items-center gap-2">
                            <span>সব টেমপ্লেট দেখুন</span>
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
