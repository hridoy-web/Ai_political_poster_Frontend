"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Sparkles,
    Copy,
    Check,
    RotateCcw,
    Quote,
    Hash,
    ArrowRight,
    Wand2,
    Vote,
    Users,
    Flame,
    Award,
    Heart,
    Download,
    CheckCircle2,
    Share2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface SloganVariant {
    id: string;
    tone: string;
    toneLabel: string;
    badge?: string;
    slogan: string;
}

export interface TemplatePreset {
    id: string;
    name: string;
    category: string;
    image: string;
    headerBanner: string;
    sampleCandidate: string;
    sampleDesignation: string;
    sampleSymbol: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    variants: SloganVariant[];
    captionTemplate: (name: string, area: string, slogan: string) => string;
    tags: string[];
}

const PRESETS: TemplatePreset[] = [
    {
        id: "election",
        name: "নির্বাচনী প্রচারণা",
        category: "নির্বাচন",
        image: "/image/images26.jpg",
        headerBanner: "বিসমিল্লাহির রাহমানির রাহিম",
        sampleCandidate: "মাহমুদুল হাসান চৌধুরী",
        sampleDesignation: "সংসদ সদস্য পদপ্রার্থী, ঢাকা-১০ আসন",
        sampleSymbol: "🗳️ মার্কা: কলম প্রতীক",
        icon: Vote,
        accentColor: "from-emerald-600 to-teal-800",
        variants: [
            {
                id: "el-1",
                tone: "energetic",
                toneLabel: "🔥 তেজস্বী ও বলিষ্ঠ",
                badge: "সেরা পছন্দ",
                slogan: "জনগণের অধিকার রক্ষায়, সততা ও সাহসের নতুন অঙ্গীকার!",
            },
            {
                id: "el-2",
                tone: "inspiring",
                toneLabel: "✨ অনুপ্রেরণামূলক",
                slogan: "সুশাসন ও এলাকার সার্বিক উন্নয়নে জনতার আস্থার প্রতীক।",
            },
            {
                id: "el-3",
                tone: "patriotic",
                toneLabel: "🇧🇩 দেশপ্রেম ও শান্তি",
                slogan: "শান্তি, সম্প্রীতি ও পরিবর্তনের লক্ষ্যে আপনার মূল্যবান রায় দিন।",
            },
        ],
        captionTemplate: (name, area, slogan) =>
            `আসন্ন জাতীয় সংসদ নির্বাচনে ${area}-এর সর্বস্তরের সম্মানিত ভাই ও বোনদের আন্তরিক সালাম ও শুভেচ্ছা।\n\n"${slogan}"\n\nএলাকার সার্বিক উন্নয়ন, দুর্নীতিমুক্ত সমাজ গঠন ও নাগরিক সেবা নিশ্চিত করতে ${name}-কে আপনার মূল্যবান ভোট দিয়ে পরিবর্তনের যাত্রায় শামিল হোন।`,
        tags: ["#নির্বাচন২০২৬", "#গণমানুষের_প্রার্থী", "#উন্নয়নের_অঙ্গীকার", "#ভোটের_অধিকার"],
    },
    {
        id: "rally",
        name: "দলীয় মহাসমাবেশ",
        category: "জনসভা",
        image: "/image/image6.jpg",
        headerBanner: "ঐক্যবদ্ধ জনতা • অপরাজেয় শক্তি",
        sampleCandidate: "ব্যারিস্টার নাজমুল হুদা",
        sampleDesignation: "প্রধান বক্তা ও কেন্দ্রীয় আহ্বায়ক",
        sampleSymbol: "📢 ঐতিহাসিক মহাসমাবেশ",
        icon: Users,
        accentColor: "from-rose-600 to-red-800",
        variants: [
            {
                id: "rl-1",
                tone: "energetic",
                toneLabel: "🔥 তেজস্বী",
                badge: "জনপ্রিয়",
                slogan: "জনতার ঢল নামবে রাজপথে, প্রতিষ্ঠিত হবে গণতন্ত্রের চূড়ান্ত বিজয়!",
            },
            {
                id: "rl-2",
                tone: "inspiring",
                toneLabel: "✨ বলিষ্ঠ ডাক",
                slogan: "অন্যায়ের বিরুদ্ধে মাথা নত নয় কখনো, জনতার ঐক্যই সবচেয়ে বড় শক্তি!",
            },
            {
                id: "rl-3",
                tone: "patriotic",
                toneLabel: "🇧🇩 অধিকার আদায়",
                slogan: "মেহনতী জনতার ন্যায্য দাবি আদায়ে ঐতিহাসিক মহাসমাবেশে যোগ দিন।",
            },
        ],
        captionTemplate: (name, area, slogan) =>
            `ঐতিহাসিক মহাসমাবেশের ডাক!\n\n"${slogan}"\n\nগণতন্ত্র ও ভোটাধিকার পুনরুদ্ধারের ন্যায্য লড়াইয়ে আগামী সমাবেশে দলে দলে যোগ দিন। প্রধান বক্তা হিসেবে বক্তব্য রাখবেন ${name} (${area})।`,
        tags: ["#ঐতিহাসিক_সমাবেশ", "#জনতার_ঢল", "#গণতন্ত্রের_লড়াই", "#রাজপথের_ডাক"],
    },
    {
        id: "youth",
        name: "তারুণ্যের নেতৃত্ব",
        category: "ছাত্র ও যুব",
        image: "/image/images21.jpg",
        headerBanner: "তারুণ্যের শক্তিতে আগামীর বাংলাদেশ",
        sampleCandidate: "তানভীর আহমেদ হৃদয়",
        sampleDesignation: "সভাপতি পদপ্রার্থী, কেন্দ্রীয় ছাত্র সংসদ",
        sampleSymbol: "⚡ তারুণ্যের নতুন দিশা",
        icon: Flame,
        accentColor: "from-amber-600 to-orange-800",
        variants: [
            {
                id: "yt-1",
                tone: "energetic",
                toneLabel: "🔥 তেজস্বী",
                badge: "ট্রেন্ডিং",
                slogan: "তারুণ্যের হাত ধরে আসবে পরিবর্তন, গড়বো মেধা ও সাহসের বাংলাদেশ!",
            },
            {
                id: "yt-2",
                tone: "inspiring",
                toneLabel: "✨ নতুন চিন্তা",
                slogan: "শিক্ষা, সংস্কার ও কর্মসংস্থানের দাবিতে সোচ্চার তারুণ্যের ঐক্য!",
            },
            {
                id: "yt-3",
                tone: "patriotic",
                toneLabel: "🇧🇩 উদ্ভাবনী শক্তি",
                slogan: "মেধা আর যোগ্যতায় এগিয়ে যাবে দেশ, তারুণ্যেই সব সংকটের সমাধান শেষ।",
            },
        ],
        captionTemplate: (name, area, slogan) =>
            `নতুন প্রজন্মের নতুন ভাবনায় এগিয়ে যাক আগামীর সমৃদ্ধ ছাত্রসমাজ।\n\n"${slogan}"\n\nশিক্ষার্থীদের অধিকার রক্ষা ও মেধাভিত্তিক ক্যাম্পাস বিনির্মাণে ${name} (${area})-এর নেতৃত্বে ঐক্যবদ্ধ হোন।`,
        tags: ["#তারুণ্যের_শক্তি", "#ছাত্র_সংসদ", "#নতুন_নেতৃত্ব", "#মেধার_মূল্যায়ন"],
    },
    {
        id: "victory",
        name: "মহান বিজয় দিবস",
        category: "জাতীয় দিবস",
        image: "/image/images1.jpg",
        headerBanner: "১৬ই ডিসেম্বর • মহান বিজয় দিবস",
        sampleCandidate: "এডভোকেট রেজাউল করিম",
        sampleDesignation: "বীর মুক্তিযোদ্ধার সন্তান ও সমাজসেবক",
        sampleSymbol: "🇧🇩 লাল সবুজের অহংকার",
        icon: Award,
        accentColor: "from-emerald-700 to-green-900",
        variants: [
            {
                id: "vc-1",
                tone: "patriotic",
                toneLabel: "🇧🇩 দেশপ্রেম",
                badge: "শ্রদ্ধাঞ্জলি",
                slogan: "বীর মুক্তিযোদ্ধাদের রক্তে অর্জিত স্বাধীনতায়, মাথা নত নয় কোনো অন্যায়ে!",
            },
            {
                id: "vc-2",
                tone: "inspiring",
                toneLabel: "✨ বিজয়ের শপথ",
                slogan: "বিজয়ের চেতনা বুকে ধারণ করে, শপথ নিই সুখী-সমৃদ্ধ দেশ গড়ার।",
            },
            {
                id: "vc-3",
                tone: "energetic",
                toneLabel: "🔥 সার্বভৌমত্ব",
                slogan: "রক্তের দামে কেনা এই স্বাধীনতা, আমাদের চিরন্তন অহংকার ও ভালোবাসা।",
            },
        ],
        captionTemplate: (name, area, slogan) =>
            `মহান বিজয় দিবসে বীর শহীদ ও জাতির শ্রেষ্ঠ সন্তান মুক্তিযোদ্ধাদের প্রতি বিনম্র শ্রদ্ধা ও রক্তিম সালাম।\n\n"${slogan}"\n\nসাম্য ও মানবিক মর্যাদার বাংলাদেশ গড়ার শপথ গ্রহণ করুন। শুভেচ্ছান্তে: ${name} (${area})।`,
        tags: ["#মহান_বিজয়_দিবস", "#লাল_সবুজের_পতাকা", "#চির_অমর_শহীদ", "#বাংলাদেশ"],
    },
    {
        id: "condolence",
        name: "শোকবার্তা ও স্মরণসভা",
        category: "স্মরণসভা",
        image: "/image/images4.jpg",
        headerBanner: "ইন্না লিল্লাহি ওয়া ইন্না ইলাইহি রাজিউন",
        sampleCandidate: "মরহুম আলহাজ্ব আবুল কালাম",
        sampleDesignation: "সাবেক সংসদ সদস্য ও বিশিষ্ট জননেতা",
        sampleSymbol: "🕊️ বিনম্র শ্রদ্ধা ও স্মরণ",
        icon: Heart,
        accentColor: "from-zinc-700 to-neutral-900",
        variants: [
            {
                id: "cd-1",
                tone: "inspiring",
                toneLabel: "🕊️ বিনম্র শ্রদ্ধা",
                badge: "চিরস্মরণীয়",
                slogan: "আপনার দেশপ্রেম ও আদর্শের আলো, কোটি মানুষের হৃদয়ে বেঁচে থাকবে চিরকাল!",
            },
            {
                id: "cd-2",
                tone: "patriotic",
                toneLabel: "✨ অপূরণীয় ক্ষতি",
                slogan: "একটি নক্ষত্রের বিদায়, জাতির এক অপূরণীয় শূন্যতা সৃষ্টি করলো।",
            },
            {
                id: "cd-3",
                tone: "energetic",
                toneLabel: "🤍 শোকগাথা",
                slogan: "বিদায় প্রিয় নেতা, আপনার আদর্শই হবে আমাদের চলার পথের অনন্ত শক্তি।",
            },
        ],
        captionTemplate: (name, area, slogan) =>
            `গভীর শোক ও সমবেদনা।\n\n"${slogan}"\n\nবিশিষ্ট রাজনীতিবিদ ও সমাজসেবক ${name} (${area})-এর মহাপ্রয়াণে আমরা গভীরভাবে শোকাহত। পরম করুণাময় আল্লাহ তায়ালা উনাকে জান্নাতুল ফেরদৌস দান করুন। আমিন।`,
        tags: ["#গভীর_শোকবার্তা", "#বিনম্র_শ্রদ্ধা", "#চিরস্মরণীয়_নেতা", "#শোকগাথা"],
    },
];

const TONES = [
    { id: "all", label: "✨ সকল টোন" },
    { id: "energetic", label: "🔥 তেজস্বী" },
    { id: "inspiring", label: "✨ অনুপ্রেরণামূলক" },
    { id: "patriotic", label: "🇧🇩 দেশপ্রেম" },
];

export default function AiPowerShowcaseClient() {
    const [selectedPresetId, setSelectedPresetId] = useState<string>("election");
    const [selectedTone, setSelectedTone] = useState<string>("all");
    const [selectedVariantIdx, setSelectedVariantIdx] = useState<number>(0);

    // Form inputs initialized with active preset's defaults
    const currentPreset = PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0];

    const [candidateName, setCandidateName] = useState<string>(currentPreset.sampleCandidate);
    const [candidateDesignation, setCandidateDesignation] = useState<string>(currentPreset.sampleDesignation);
    const [candidateSymbol, setCandidateSymbol] = useState<string>(currentPreset.sampleSymbol);
    const [customKeyword, setCustomKeyword] = useState<string>("");

    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();
    const [copiedSloganId, setCopiedSloganId] = useState<string | null>(null);
    const [captionCopied, setCaptionCopied] = useState<boolean>(false);

    // Handle template preset change
    const handleSelectPreset = (preset: TemplatePreset) => {
        setSelectedPresetId(preset.id);
        setSelectedVariantIdx(0);
        setCandidateName(preset.sampleCandidate);
        setCandidateDesignation(preset.sampleDesignation);
        setCandidateSymbol(preset.sampleSymbol);
        setCustomKeyword("");
        toast.info(`'${preset.name}' টেমপ্লেট লোড হয়েছে!`);
    };

    // Filter variants based on tone
    const filteredVariants =
        selectedTone === "all"
            ? currentPreset.variants
            : currentPreset.variants.filter((v) => v.tone === selectedTone);

    const safeIdx = selectedVariantIdx < filteredVariants.length ? selectedVariantIdx : 0;
    const activeVariant = filteredVariants[safeIdx] || currentPreset.variants[0];

    // Build dynamic slogan if custom keyword exists
    const activeSloganText = customKeyword.trim()
        ? `${customKeyword.trim()}-এর প্রশ্নে কোনো আপস নেই, জনতার সাথে পরিবর্তনের জয়!`
        : activeVariant.slogan;

    // Full caption text
    const fullCaptionText = currentPreset.captionTemplate(
        candidateName || currentPreset.sampleCandidate,
        candidateDesignation || currentPreset.sampleDesignation,
        activeSloganText
    );

    // Generate animation trigger
    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            startTransition(() => {
                // Cycle to next slogan variant for dynamic feeling
                setSelectedVariantIdx((prev) => (prev + 1) % filteredVariants.length);
                setIsGenerating(false);
                toast.success("✨ AI নতুন স্লোগান ও লাইভ পোস্টার রেন্ডার করেছে!");
            });
        }, 650);
    };

    // Copy Slogan
    const handleCopySlogan = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedSloganId(id);
            toast.success("স্লোগান ক্লিপবোর্ডে কপি করা হয়েছে!");
            setTimeout(() => setCopiedSloganId(null), 2000);
        } catch {
            toast.error("কপি করতে সমস্যা হয়েছে");
        }
    };

    // Copy Full Caption
    const handleCopyCaption = async () => {
        try {
            const fullContent = `${fullCaptionText}\n\n${currentPreset.tags.join(" ")}`;
            await navigator.clipboard.writeText(fullContent);
            setCaptionCopied(true);
            toast.success("সম্পূর্ণ সোশ্যাল মিডিয়া ক্যাপশন ও হ্যাশট্যাগ কপি করা হয়েছে!");
            setTimeout(() => setCaptionCopied(false), 2200);
        } catch {
            toast.error("কপি করতে সমস্যা হয়েছে");
        }
    };

    // Simulated Download
    const handleDownloadMockup = () => {
        const link = document.createElement("a");
        link.href = currentPreset.image;
        link.download = `PosterAI-${currentPreset.id}-mockup.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("পোস্টার প্রিভিউ ডাউনলোড শুরু হয়েছে!");
    };

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 xl:gap-10 items-start">
            {/* LEFT COLUMN: Interactive Generator Studio Controls */}
            <div className="flex flex-col gap-6 lg:col-span-5">
                <div className="rounded-3xl border border-border/80 bg-card/80 p-5 shadow-lg backdrop-blur-xl sm:p-6 dark:bg-card/60 relative overflow-hidden">
                    {/* Top Studio Header */}
                    <div className="mb-5 flex items-center justify-between border-b border-border/60 pb-4">
                        <div className="flex items-center gap-2.5">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary shadow-xs">
                                <Wand2 className="h-4.5 w-4.5 animate-spin-slow" />
                            </span>
                            <div>
                                <h3 className="text-sm font-bold text-foreground sm:text-base flex items-center gap-1.5">
                                    <span>AI লাইভ জেনারেটর স্টুডিও</span>
                                </h3>
                                <p className="text-[11px] text-muted-foreground">
                                    টেমপ্লেট ও তথ্য দিয়ে লাইভ প্রিভিউ দেখুন
                                </p>
                            </div>
                        </div>

                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            লাইভ স্টুডিও
                        </span>
                    </div>

                    {/* Step 1: Visual Template Selector */}
                    <div className="mb-5">
                        <label className="mb-2.5 flex items-center justify-between text-xs font-bold text-foreground">
                            <span>১. টেমপ্লেট ও উপলক্ষ বেছে নিন:</span>
                            <span className="text-[10px] text-brand-primary font-medium">
                                {PRESETS.length}টি প্রস্তুত ক্যাটাগরি
                            </span>
                        </label>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                            {PRESETS.map((preset) => {
                                const Icon = preset.icon;
                                const isSelected = selectedPresetId === preset.id;
                                return (
                                    <button
                                        key={preset.id}
                                        type="button"
                                        onClick={() => handleSelectPreset(preset)}
                                        className={cn(
                                            "group flex items-center gap-3 rounded-2xl border p-2 text-left transition-all duration-200 cursor-pointer",
                                            isSelected
                                                ? "border-brand-primary/70 bg-brand-primary/10 shadow-xs ring-1 ring-brand-primary/30"
                                                : "border-border/70 bg-card/40 hover:border-brand-primary/30 hover:bg-accent/60"
                                        )}
                                    >
                                        {/* Mini Template Preview Thumbnail */}
                                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted">
                                            <Image
                                                src={preset.image}
                                                alt={preset.name}
                                                fill
                                                className="object-cover object-top transition-transform duration-300 group-hover:scale-110"
                                                sizes="44px"
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between gap-1">
                                                <h4 className={cn(
                                                    "truncate text-xs font-bold",
                                                    isSelected ? "text-brand-primary font-extrabold" : "text-foreground"
                                                )}>
                                                    {preset.name}
                                                </h4>
                                                <span className="shrink-0 rounded-md bg-accent px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">
                                                    {preset.category}
                                                </span>
                                            </div>
                                            <p className="truncate text-[10px] text-muted-foreground mt-0.5">
                                                {preset.sampleCandidate} • {preset.sampleSymbol}
                                            </p>
                                        </div>

                                        {isSelected ? (
                                            <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-primary" />
                                        ) : (
                                            <Icon className="h-4 w-4 shrink-0 text-muted-foreground/60 group-hover:text-foreground" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Step 2: Candidate Info & Keyword Inputs */}
                    <div className="mb-5 space-y-3.5 border-t border-border/60 pt-4">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-foreground">
                                ২. প্রার্থীর তথ্য ও কাস্টমাইজেশন:
                            </label>
                            <button
                                type="button"
                                onClick={() => {
                                    setCandidateName(currentPreset.sampleCandidate);
                                    setCandidateDesignation(currentPreset.sampleDesignation);
                                    setCandidateSymbol(currentPreset.sampleSymbol);
                                    setCustomKeyword("");
                                    toast.success("ডিফল্ট স্যাম্পল তথ্য লোড হয়েছে!");
                                }}
                                className="text-[10px] text-brand-primary hover:underline font-semibold cursor-pointer"
                            >
                                স্যাম্পল লোড করুন
                            </button>
                        </div>

                        {/* Candidate Name Input */}
                        <div>
                            <span className="block text-[11px] font-medium text-muted-foreground mb-1">
                                প্রার্থীর নাম / নেতার নাম:
                            </span>
                            <input
                                type="text"
                                value={candidateName}
                                onChange={(e) => setCandidateName(e.target.value)}
                                placeholder="যেমন: মাহমুদুল হাসান চৌধুরী"
                                className="w-full rounded-xl border border-border/80 bg-background/80 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                            />
                        </div>

                        {/* Designation & Area */}
                        <div>
                            <span className="block text-[11px] font-medium text-muted-foreground mb-1">
                                পদবি ও নির্বাচনী এলাকা:
                            </span>
                            <input
                                type="text"
                                value={candidateDesignation}
                                onChange={(e) => setCandidateDesignation(e.target.value)}
                                placeholder="যেমন: মেয়র পদপ্রার্থী, ঢাকা উত্তর"
                                className="w-full rounded-xl border border-border/80 bg-background/80 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                            />
                        </div>

                        {/* Symbol / Tagline */}
                        <div>
                            <span className="block text-[11px] font-medium text-muted-foreground mb-1">
                                প্রতীক বা বিশেষ বার্তা:
                            </span>
                            <input
                                type="text"
                                value={candidateSymbol}
                                onChange={(e) => setCandidateSymbol(e.target.value)}
                                placeholder="যেমন: মার্কা: কলম প্রতীক"
                                className="w-full rounded-xl border border-border/80 bg-background/80 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                            />
                        </div>

                        {/* Tone Selector */}
                        <div>
                            <span className="block text-[11px] font-medium text-muted-foreground mb-1.5">
                                স্লোগানের ভাব বা টোন:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {TONES.map((tone) => {
                                    const isSelected = selectedTone === tone.id;
                                    return (
                                        <button
                                            key={tone.id}
                                            type="button"
                                            onClick={() => {
                                                setSelectedTone(tone.id);
                                                setSelectedVariantIdx(0);
                                            }}
                                            className={cn(
                                                "rounded-lg border px-2.5 py-1 text-[11px] transition-all duration-200 cursor-pointer font-medium",
                                                isSelected
                                                    ? "border-brand-primary bg-brand-primary text-white shadow-xs font-semibold"
                                                    : "border-border/70 bg-card/50 text-muted-foreground hover:border-border hover:bg-accent hover:text-foreground"
                                            )}
                                        >
                                            {tone.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Generate Action Button */}
                    <Button
                        type="button"
                        onClick={handleGenerate}
                        disabled={isGenerating || isPending}
                        className="w-full rounded-2xl bg-gradient-brand text-white font-bold py-3.5 text-sm cursor-pointer shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
                    >
                        {isGenerating ? (
                            <span className="inline-flex items-center gap-2">
                                <Sparkles className="h-4 w-4 animate-spin text-amber-300" />
                                <span>AI লাইভ পোস্টার রেন্ডার করছে...</span>
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" />
                                <span>এক ক্লিকে AI পোস্টার ও স্লোগান জেনারেট করুন</span>
                            </span>
                        )}
                    </Button>
                </div>
            </div>

            {/* RIGHT COLUMN: Dynamic Live Artboard & Poster Preview */}
            <div className="flex flex-col gap-6 lg:col-span-7">
                {/* Artboard Top Control Bar */}
                <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-card/70 px-4 py-3 backdrop-blur-md shadow-xs">
                    <div className="flex items-center gap-2.5">
                        <span className="relative flex h-2.5 w-2.5 shrink-0">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        </span>
                        <div>
                            <span className="text-xs font-extrabold text-foreground sm:text-sm">
                                ডায়নামিক লাইভ পোস্টার প্রিভিউ
                            </span>
                            <span className="hidden sm:inline-block text-[11px] text-muted-foreground ml-2">
                                ({currentPreset.name})
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-background/80 px-2.5 py-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer shadow-2xs"
                        >
                            <RotateCcw className={cn("h-3.5 w-3.5", isGenerating && "animate-spin text-brand-primary")} />
                            <span>রিফ্রেশ</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleDownloadMockup}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-accent border border-brand-primary/20 px-2.5 py-1 text-xs font-semibold text-brand-primary hover:bg-brand-primary/10 transition-colors cursor-pointer shadow-2xs"
                        >
                            <Download className="h-3.5 w-3.5" />
                            <span>ডাউনলোড</span>
                        </button>
                    </div>
                </div>

                {/* Live Poster Mockup Canvas */}
                <div className="relative mx-auto w-full max-w-lg overflow-hidden rounded-3xl border border-border/80 bg-zinc-950 p-2 sm:p-3 shadow-2xl ring-1 ring-white/10">
                    {/* Ambient Glow */}
                    <div className="pointer-events-none absolute -inset-4 -z-10 rounded-full bg-brand-primary/15 blur-3xl" />

                    {/* Canvas Frame */}
                    <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-zinc-900 shadow-inner">
                        {/* Background Poster Image */}
                        <Image
                            key={currentPreset.id}
                            src={currentPreset.image}
                            alt={currentPreset.name}
                            fill
                            priority
                            className={cn(
                                "object-cover object-top transition-all duration-700 brightness-[0.82] contrast-[1.08]",
                                isGenerating && "scale-105 blur-[1px]"
                            )}
                            sizes="(max-width: 768px) 100vw, 550px"
                        />

                        {/* Realistic Overlays: Top Gradient & Bottom Gradient */}
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-black/80 via-black/40 to-transparent z-10" />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-linear-to-t from-black/95 via-black/85 to-transparent z-10" />

                        {/* Top Badges & Meta */}
                        <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between gap-2">
                            <span className="rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold text-amber-300 backdrop-blur-md border border-white/15 shadow-xs">
                                300 DPI • HD ক্যানভাস
                            </span>

                            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold text-emerald-400 backdrop-blur-md border border-white/15 shadow-xs">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                লাইভ ভিউ
                            </span>
                        </div>

                        {/* Traditional Top Banner Motif */}
                        <div className="absolute top-10 inset-x-0 z-20 text-center">
                            <span className="inline-block rounded-md bg-black/40 px-3 py-0.5 text-[10px] font-medium tracking-wide text-zinc-200 backdrop-blur-xs">
                                {currentPreset.headerBanner}
                            </span>
                        </div>

                        {/* Futuristic Scanning Beam while Generating */}
                        {isGenerating && (
                            <motion.div
                                initial={{ top: "-10%" }}
                                animate={{ top: "110%" }}
                                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                                className="pointer-events-none absolute inset-x-0 h-20 z-30 bg-linear-to-b from-transparent via-cyan-400/30 to-brand-primary/50 shadow-[0_0_25px_rgba(225,29,72,0.8)] border-b-2 border-cyan-300"
                            />
                        )}

                        {/* Center Dynamic AI Slogan Banner */}
                        <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 z-20">
                            <motion.div
                                key={activeSloganText}
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="rounded-2xl border border-white/20 bg-black/75 p-3.5 sm:p-4 text-center backdrop-blur-md shadow-2xl"
                            >
                                <span className="mb-1.5 inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-400/30">
                                    <Sparkles className="h-3 w-3 animate-pulse text-amber-300" />
                                    AI স্লোগান
                                </span>

                                <h3 className="font-extrabold text-sm sm:text-base md:text-lg text-white leading-snug drop-shadow-md text-balance font-serif">
                                    &ldquo;{activeSloganText}&rdquo;
                                </h3>
                            </motion.div>
                        </div>

                        {/* Bottom Candidate Profile Details */}
                        <div className="absolute inset-x-4 bottom-3 z-20">
                            <div className="text-center sm:text-left">
                                <div className="inline-flex items-center gap-2 rounded-lg bg-brand-primary/90 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs mb-1">
                                    <span>{candidateSymbol || currentPreset.sampleSymbol}</span>
                                </div>

                                <h4 className="text-base sm:text-xl font-black text-white tracking-tight drop-shadow-md">
                                    {candidateName || currentPreset.sampleCandidate}
                                </h4>

                                <p className="text-xs sm:text-sm font-semibold text-rose-200 drop-shadow-xs line-clamp-1">
                                    {candidateDesignation || currentPreset.sampleDesignation}
                                </p>
                            </div>

                            <div className="mt-2.5 flex items-center justify-between border-t border-white/15 pt-2 text-[10px] text-zinc-300">
                                <span>PosterAI™ রেন্ডার</span>
                                <span className="font-mono text-zinc-400">ID: #{currentPreset.id}-2026</span>
                            </div>
                        </div>
                    </div>

                    {/* Canvas Bottom Action Bar */}
                    <div className="mt-2 flex items-center justify-between gap-2 px-1 pt-1">
                        <span className="text-[11px] text-muted-foreground">
                            পোস্টারের লেখা পরিবর্তন করতে বামের ফিল্ডে টাইপ করুন।
                        </span>

                        <Button
                            asChild
                            size="sm"
                            className="rounded-xl bg-gradient-brand text-white font-bold text-xs h-8 px-3 cursor-pointer shadow-xs transition-transform hover:scale-105 active:scale-95"
                        >
                            <Link href={`/templates?category=${currentPreset.id}`} className="inline-flex items-center gap-1.5">
                                <span>ক্যানভাসে এডিট করুন</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Slogan Variations Selection & Copy (Interactive Live Switcher) */}
                <div className="rounded-3xl border border-border/80 bg-card/70 p-5 backdrop-blur-xl sm:p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Quote className="h-4 w-4 text-brand-primary" />
                            <h4 className="text-xs font-bold text-foreground sm:text-sm">
                                AI জেনারেটেড বিকল্প স্লোগানসমূহ (পোস্টারে দেখতে ক্লিক করুন)
                            </h4>
                        </div>
                        <span className="text-[11px] text-muted-foreground font-medium">
                            {filteredVariants.length}টি ভ্যারিয়েন্ট
                        </span>
                    </div>

                    <div className="space-y-3">
                        {filteredVariants.map((item, idx) => {
                            const isSelected = safeIdx === idx;
                            const isCopied = copiedSloganId === item.id;

                            return (
                                <div
                                    key={item.id}
                                    onClick={() => setSelectedVariantIdx(idx)}
                                    className={cn(
                                        "group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border p-3.5 transition-all duration-200 cursor-pointer",
                                        isSelected
                                            ? "border-brand-primary/60 bg-brand-primary/10 shadow-xs ring-1 ring-brand-primary/30"
                                            : "border-border/70 bg-card/40 hover:border-brand-primary/30 hover:bg-accent/50"
                                    )}
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            {item.badge && (
                                                <span className="rounded-md bg-gradient-brand px-1.5 py-0.5 text-[9px] font-bold text-white shadow-2xs">
                                                    {item.badge}
                                                </span>
                                            )}
                                            <span className="text-[10px] font-medium text-muted-foreground">
                                                {item.toneLabel}
                                            </span>
                                            {isSelected && (
                                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-primary">
                                                    <CheckCircle2 className="h-3 w-3" />
                                                    পোস্টারে সক্রিয়
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-xs sm:text-sm font-bold text-foreground leading-snug">
                                            &ldquo;{item.slogan}&rdquo;
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCopySlogan(item.slogan, item.id);
                                            }}
                                            className="inline-flex items-center gap-1 rounded-lg border border-border/70 bg-background/80 px-2 py-1 text-[11px] font-semibold text-muted-foreground transition-all hover:border-brand-primary/40 hover:text-foreground cursor-pointer shadow-2xs"
                                        >
                                            {isCopied ? (
                                                <>
                                                    <Check className="h-3 w-3 text-emerald-500" />
                                                    <span className="text-emerald-500">কপি হয়েছে!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="h-3 w-3" />
                                                    <span>কপি</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Ready Social Media Caption & Hashtags Card */}
                <div className="rounded-3xl border border-border/80 bg-card/70 p-5 backdrop-blur-xl sm:p-6 shadow-sm">
                    <div className="mb-3 flex items-center justify-between border-b border-border/60 pb-3">
                        <div className="flex items-center gap-2">
                            <Share2 className="h-4 w-4 text-brand-primary" />
                            <h4 className="text-xs font-bold text-foreground sm:text-sm">
                                সোশ্যাল মিডিয়া পোস্ট ক্যাপশন ও হ্যাশট্যাগ
                            </h4>
                        </div>

                        <button
                            type="button"
                            onClick={handleCopyCaption}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-brand text-white px-3 py-1.5 text-xs font-bold shadow-xs hover:opacity-90 transition-opacity cursor-pointer"
                        >
                            {captionCopied ? (
                                <>
                                    <Check className="h-3.5 w-3.5" />
                                    <span>কপি হয়েছে!</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="h-3.5 w-3.5" />
                                    <span>সম্পূর্ণ ক্যাপশন কপি</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Pre-formatted Caption Body */}
                    <p className="whitespace-pre-line text-xs sm:text-sm text-foreground/90 leading-relaxed rounded-2xl bg-accent/40 p-3.5 border border-border/60">
                        {fullCaptionText}
                    </p>

                    {/* Hashtags Row */}
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        {currentPreset.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center gap-0.5 rounded-md bg-accent/70 px-2 py-0.5 text-[10px] font-medium text-muted-foreground border border-border/50"
                            >
                                <Hash className="h-2.5 w-2.5 text-muted-foreground/60" />
                                <span>{tag.replace(/^#/, "")}</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
