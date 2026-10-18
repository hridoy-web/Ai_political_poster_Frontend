import { Flame, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TrendingTemplateClient from '../client/trending-template-client';

export type TemplateCategory =
    | "all"
    | "election"
    | "rally"
    | "birthday"
    | "condolence"
    | "victory";

export interface Template {
    id: number;
    title: string;
    category: Exclude<TemplateCategory, "all">;
    categoryLabel?: string;
    badge?: "trending" | "new" | "popular";
    gradient: string;
    image: string;
}

export const CATEGORY_MAP: Record<Exclude<TemplateCategory, "all">, string> = {
    election: "নির্বাচনী",
    rally: "সমাবেশ",
    birthday: "জন্মদিন",
    victory: "বিজয় দিবস",
    condolence: "শোকবার্তা",
};

export const categories: {
    id: TemplateCategory;
    label: string;
}[] = [
        { id: "all", label: "সব" },
        { id: "election", label: CATEGORY_MAP.election },
        { id: "rally", label: CATEGORY_MAP.rally },
        { id: "birthday", label: CATEGORY_MAP.birthday },
        { id: "victory", label: CATEGORY_MAP.victory },
        { id: "condolence", label: CATEGORY_MAP.condolence },
    ];

export const templates: Template[] = [
    {
        id: 1,
        title: "নির্বাচনী প্রচারণা",
        category: "election",
        badge: "trending",
        gradient: "from-emerald-600 via-green-700 to-emerald-900",
        image: "/image/images26.jpg",
    },
    {
        id: 2,
        title: "জনসভা পোস্টার",
        category: "rally",
        badge: "popular",
        gradient: "from-red-600 via-rose-700 to-red-900",
        image: "/image/image6.jpg",
    },
    {
        id: 3,
        title: "নেতার জন্মদিন",
        category: "birthday",
        badge: "new",
        gradient: "from-blue-600 via-indigo-700 to-blue-900",
        image: "/image/images24.jpg",
    },
    {
        id: 4,
        title: "বিজয় দিবস",
        category: "victory",
        badge: "trending",
        gradient: "from-amber-500 via-orange-600 to-red-800",
        image: "/image/images21.jpg",
    },
    {
        id: 5,
        title: "শোকবার্তা",
        category: "condolence",
        gradient: "from-slate-700 via-slate-800 to-slate-950",
        image: "/image/images11.jpg",
    },
    {
        id: 6,
        title: "প্রতিষ্ঠাবার্ষিকী",
        category: "rally",
        gradient: "from-purple-600 via-fuchsia-700 to-purple-900",
        image: "/image/images3.jpg",
    },
    {
        id: 7,
        title: "ভোটার উদ্বুদ্ধকরণ",
        category: "election",
        badge: "popular",
        gradient: "from-teal-600 via-cyan-700 to-teal-900",
        image: "/image/images5.jpg",
    },
    {
        id: 8,
        title: "স্মরণসভা",
        category: "condolence",
        gradient: "from-zinc-700 via-neutral-800 to-black",
        image: "/image/images4.jpg",
    },
];

export default function TrendingTemplates() {
    return (
        <section className="relative w-full overflow-hidden bg-linear-to-b from-background via-brand-green/5 to-background py-16 sm:py-24 dark:via-brand-green/10">
            {/* Background Radial Glow Effects */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 right-1/4 h-80 w-80 rounded-full bg-brand-green/10 blur-[120px] dark:bg-brand-green/5" />
                <div className="absolute -bottom-20 left-1/4 h-80 w-80 rounded-full bg-brand-mint/10 blur-[120px] dark:bg-brand-mint/5" />
            </div>

            <div className="container relative mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="mb-5 text-center sm:mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-forwards">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 px-4 py-1.5 text-xs font-semibold text-brand-primary dark:text-brand-secondary shadow-xs sm:text-sm animate-in zoom-in-90 fade-in duration-500 delay-150 fill-mode-forwards">
                        <Flame className="h-4 w-4 text-brand-primary animate-pulse" />
                        <span>জনপ্রিয় টেমপ্লেট</span>
                    </div>

                    <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-forwards">
                        ট্রেন্ডিং <span className="text-gradient-brand">টেমপ্লেট</span>
                    </h2>

                    <p className="mx-auto max-w-xl text-sm text-muted-foreground sm:text-base animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-forwards">
                        আমাদের প্ল্যাটফর্মে থাকা সেরা কিছু রাজনৈতিক ফ্রেম, ডিজাইন ও ক্যাটেগরি বেছে নিন
                    </p>
                </div>

                {/* Client Component */}
                <TrendingTemplateClient templates={templates} categories={categories} />

                {/* View All CTA Button */}
                <div className="mt-12 text-center sm:mt-16">
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
