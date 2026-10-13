
"use client";

import React from "react";
import Link from "next/link";
import {
    motion,
    Variants,
    useReducedMotion,
} from "framer-motion";

import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Sparkles,
    Target,
    Zap,
    ShieldCheck,
    Users,
    HeartHandshake,
    Code2,
    Palette,
    CheckCircle2,
    Cpu,
    Star,
    Layers3,
    Fingerprint,
    WandSparkles,
    Globe2,
    Rocket,
} from "lucide-react";

// -----------------------------------------------------
// Animation Variants
// -----------------------------------------------------

const easeOut = [0.16, 1, 0.3, 1] as const;

const fadeInUp: Variants = {
    hidden: {
        opacity: 0,
        y: 32,
        filter: "blur(8px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.8,
            ease: easeOut,
        },
    },
};

const staggerContainer: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.08,
        },
    },
};

const floatingAnimation = {
    y: [0, -14, 0],
    rotate: [0, 2, 0],
};

const cardBase =
    "group relative isolate overflow-hidden rounded-[28px] " +
    "border border-white/[0.09] bg-white/[0.025] " +
    "backdrop-blur-2xl transition-colors duration-500 " +
    "hover:border-emerald-400/25 hover:bg-white/[0.045]";

const iconBase =
    "flex h-14 w-14 shrink-0 items-center justify-center " +
    "rounded-2xl border transition-all duration-500 " +
    "group-hover:scale-105 group-hover:rotate-[-3deg]";

// -----------------------------------------------------
// Core Values Data
// -----------------------------------------------------

const values = [
    {
        icon: Users,
        title: "জনগণের ক্ষমতায়ন",
        description:
            "প্রতিটি সাধারণ মানুষকে ডিজিটাল প্রচারণায় অংশগ্রহণের সুযোগ দেওয়া।",
        color: "emerald",
        number: "01",
    },
    {
        icon: ShieldCheck,
        title: "নিরাপত্তা ও বিশ্বাসযোগ্যতা",
        description:
            "প্রতিটি পোস্টার ও ডেটার নিরাপত্তা এবং নির্ভরযোগ্যতা নিশ্চিত করা।",
        color: "cyan",
        number: "02",
    },
    {
        icon: Code2,
        title: "আধুনিক প্রযুক্তি",
        description:
            "AI ও অটোমেশন দিয়ে সময়ের সাশ্রয় এবং সেরা প্রযুক্তির ব্যবহার।",
        color: "violet",
        number: "03",
    },
    {
        icon: Palette,
        title: "সৃজনশীলতা ও নান্দনিকতা",
        description:
            "আকর্ষণীয় ডিজাইন এবং বাংলা টাইপোগ্রাফির মাধ্যমে সৃজনশীলতা বাড়ানো।",
        color: "pink",
        number: "04",
    },
    {
        icon: HeartHandshake,
        title: "দলীয় সংহতি",
        description:
            "একসঙ্গে এগিয়ে চলার মানসিকতা এবং একটি সমৃদ্ধ বাংলাদেশের প্রত্যাশা।",
        color: "amber",
        number: "05",
    },
    {
        icon: Star,
        title: "টেকসই ভবিষ্যৎ",
        description:
            "ডিজিটাল বাংলাদেশ বিনির্মাণে উদ্ভাবন ও প্রযুক্তির ইতিবাচক ব্যবহার।",
        color: "lime",
        number: "06",
    },
];

const colorStyles: Record<
    string,
    { icon: string; glow: string; number: string }
> = {
    emerald: {
        icon: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
        glow: "bg-emerald-400/10",
        number: "text-emerald-400/70",
    },
    cyan: {
        icon: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
        glow: "bg-cyan-400/10",
        number: "text-cyan-400/70",
    },
    violet: {
        icon: "border-violet-400/20 bg-violet-400/10 text-violet-300",
        glow: "bg-violet-400/10",
        number: "text-violet-400/70",
    },
    pink: {
        icon: "border-pink-400/20 bg-pink-400/10 text-pink-300",
        glow: "bg-pink-400/10",
        number: "text-pink-400/70",
    },
    amber: {
        icon: "border-amber-400/20 bg-amber-400/10 text-amber-300",
        glow: "bg-amber-400/10",
        number: "text-amber-400/70",
    },
    lime: {
        icon: "border-lime-400/20 bg-lime-400/10 text-lime-300",
        glow: "bg-lime-400/10",
        number: "text-lime-400/70",
    },
};

// -----------------------------------------------------
// Reusable Section Heading
// -----------------------------------------------------

function SectionHeading({
    eyebrow,
    title,
    highlight,
    description,
}: {
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
}) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={
                shouldReduceMotion
                    ? { duration: 0 }
                    : undefined
            }
            className="mx-auto max-w-3xl space-y-5 text-center"
        >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-300 sm:text-xs">
                <Sparkles className="h-3.5 w-3.5" />
                {eyebrow}
            </div>

            <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                {title}{" "}
                <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                    {highlight}
                </span>
            </h2>

            <p className="mx-auto max-w-2xl text-sm leading-8 text-slate-400 sm:text-base">
                {description}
            </p>
        </motion.div>
    );
}

// -----------------------------------------------------
// Main About Page
// -----------------------------------------------------

export default function AboutPage() {
    const shouldReduceMotion = useReducedMotion();

    const reveal = shouldReduceMotion
        ? {}
        : {
            initial: "hidden" as const,
            whileInView: "visible" as const,
            viewport: {
                once: true,
                amount: 0.15,
            },
            variants: staggerContainer,
        };

    const float = shouldReduceMotion
        ? {}
        : {
            animate: floatingAnimation,
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut" as const,
            },
        };

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#030807] text-white selection:bg-emerald-400 selection:text-black">

            {/* ============================================= */}
            {/* BACKGROUND ATMOSPHERE                         */}
            {/* ============================================= */}

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
            >
                {/* Main emerald ambient light */}
                <div className="absolute -top-[420px] left-1/2 h-[800px] w-[1100px] -translate-x-1/2 rounded-full bg-emerald-500/[0.09] blur-[150px]" />

                {/* Side glow */}
                <div className="absolute left-[-300px] top-[850px] h-[600px] w-[600px] rounded-full bg-teal-500/[0.08] blur-[150px]" />

                <div className="absolute right-[-350px] top-[1500px] h-[700px] w-[700px] rounded-full bg-cyan-500/[0.06] blur-[160px]" />

                {/* Subtle technical grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.045)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

                {/* Noise-free radial vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,8,7,0.3)_65%,#030807_100%)]" />

                {/* Bottom glow */}
                <div className="absolute bottom-0 left-1/2 h-[350px] w-full -translate-x-1/2 bg-gradient-to-t from-emerald-500/[0.06] to-transparent" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-7 sm:px-6 sm:pb-24 sm:pt-10 lg:px-10">

                {/* ============================================= */}
                {/* NAVIGATION                                    */}
                {/* ============================================= */}

                <motion.nav
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: easeOut }}
                    className="flex items-center justify-between gap-3"
                    aria-label="Main navigation"
                >
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 rounded-full border border-white/9 bg-white/[0.035] px-4 py-2.5 text-xs font-semibold text-slate-300 backdrop-blur-xl transition-all duration-300 hover:border-emerald-400/30 hover:bg-emerald-400/6 hover:text-white sm:px-5 sm:text-sm"
                    >
                        <ArrowLeft className="h-4 w-4 text-emerald-400 transition-transform group-hover:-translate-x-1" />
                        হোম পেজে ফিরুন
                    </Link>

                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/4.5 px-3 py-2 text-[10px] font-medium text-emerald-200 sm:px-4 sm:text-xs">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                        </span>
                        AI Political Poster Maker
                    </div>
                </motion.nav>

                {/* ============================================= */}
                {/* HERO SECTION                                  */}
                {/* ============================================= */}

                <section className="relative grid items-center gap-12 pb-20 pt-20 sm:pb-28 sm:pt-28 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 lg:pb-32 lg:pt-32">

                    {/* Hero background accent */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -left-20 top-20 h-80 w-80 rounded-full bg-emerald-400/[0.07] blur-[100px]"
                    />

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="relative z-10 space-y-7"
                    >
                        <motion.div variants={fadeInUp}>
                            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.055] px-4 py-2.5 shadow-[0_0_40px_rgba(16,185,129,0.06)]">
                                <Cpu className="h-4 w-4 text-emerald-300" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.19em] text-emerald-200 sm:text-xs">
                                    Next-Gen Political Branding
                                </span>
                            </div>
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            className="text-4xl font-black leading-[1.25] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.6rem]"
                        >
                            রাজনীতির ডিজিটাল প্রচারণায়{" "}
                            <span className="relative mt-1 inline-block bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text pb-1 text-transparent">
                                স্মার্ট ও যুগান্তকারী পদক্ষেপ
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            className="max-w-xl text-sm leading-8 text-slate-400 sm:text-base sm:leading-9 lg:text-lg"
                        >
                            রাজনৈতিক দল, সংগঠন এবং অনুমোদিত কর্মীদের জন্য
                            বাংলা-সমর্থিত আধুনিক ডিজিটাল পোস্টার তৈরির একটি
                            সহজ, সুরক্ষিত ও প্রযুক্তিনির্ভর প্ল্যাটফর্ম।
                        </motion.p>

                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-wrap items-center gap-3 pt-1"
                        >
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-xs text-slate-300 sm:text-sm">
                                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                বাংলা টাইপোগ্রাফি
                            </div>

                            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-xs text-slate-300 sm:text-sm">
                                <Zap className="h-4 w-4 text-cyan-300" />
                                দ্রুত পোস্টার তৈরি
                            </div>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="flex items-center gap-4 pt-3"
                        >
                            <div className="h-px w-12 bg-gradient-to-r from-emerald-400 to-transparent" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                Technology meets creativity
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Hero Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 25 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                            duration: 1,
                            delay: 0.2,
                            ease: easeOut,
                        }}
                        className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
                    >
                        {/* Visual glow */}
                        <div className="absolute inset-[15%] rounded-full bg-emerald-400/[0.13] blur-[90px]" />

                        {/* Orbit rings */}
                        <motion.div
                            {...float}
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-[8%] rounded-full border border-emerald-400/[0.12]"
                        />

                        <div className="absolute inset-[15%] rounded-full border border-cyan-400/[0.10]" />

                        {/* Main visual panel */}
                        <div className="relative overflow-hidden rounded-[32px] border border-white/[0.10] bg-gradient-to-br from-white/[0.07] via-white/[0.025] to-emerald-400/[0.045] p-3 shadow-[0_30px_100px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:rounded-[40px] sm:p-5">

                            <div className="relative overflow-hidden rounded-[25px] border border-white/[0.07] bg-[#07120f] p-5 sm:rounded-[30px] sm:p-7">

                                {/* Internal gradient */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.17),transparent_60%)]" />

                                {/* Editor header */}
                                <div className="relative flex items-center justify-between border-b border-white/[0.08] pb-5">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10">
                                            <Layers3 className="h-4 w-4 text-emerald-300" />
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold text-white sm:text-sm">
                                                Poster Studio
                                            </p>
                                            <p className="mt-0.5 text-[10px] text-slate-500">
                                                Creative workspace
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                        <span className="h-2 w-2 rounded-full bg-red-400/80" />
                                        <span className="h-2 w-2 rounded-full bg-amber-400/80" />
                                        <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                                    </div>
                                </div>

                                {/* Poster canvas */}
                                <motion.div
                                    {...float}
                                    className="relative my-6 overflow-hidden rounded-2xl border border-emerald-300/20 bg-gradient-to-br from-[#103b2d] via-[#071c16] to-[#102e38] p-5 sm:my-8 sm:p-7"
                                >
                                    {/* Decorative circles */}
                                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-emerald-300/20" />
                                    <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full border border-emerald-300/20" />
                                    <div className="absolute -bottom-16 -left-12 h-44 w-44 rounded-full bg-emerald-400/10 blur-2xl" />

                                    <div className="relative flex items-center justify-between gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/10 sm:h-14 sm:w-14">
                                            <Sparkles className="h-5 w-5 text-emerald-300 sm:h-7 sm:w-7" />
                                        </div>

                                        <div className="rounded-full border border-emerald-300/20 bg-black/20 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-emerald-200 sm:text-[10px]">
                                            Digital Campaign
                                        </div>
                                    </div>

                                    <div className="relative py-10 text-center sm:py-12">
                                        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-300/80 sm:text-xs">
                                            Creative without limits
                                        </p>

                                        <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                                            স্মার্ট
                                            <br />
                                            <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
                                                ডিজিটাল
                                            </span>
                                        </h2>

                                        <p className="mx-auto mt-4 max-w-[240px] text-xs leading-6 text-emerald-50/65 sm:text-sm">
                                            আপনার ভাবনা, আপনার ডিজাইন,
                                            আপনার পরিচয়।
                                        </p>
                                    </div>

                                    <div className="relative flex items-center justify-between border-t border-white/[0.10] pt-4">
                                        <div className="flex items-center gap-2 text-[10px] text-slate-300 sm:text-xs">
                                            <Palette className="h-3.5 w-3.5 text-emerald-300" />
                                            Creative templates
                                        </div>

                                        <div className="flex items-center gap-2 text-[10px] text-slate-300 sm:text-xs">
                                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                                            বাংলা সমর্থিত
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Bottom mini controls */}
                                <div className="relative grid grid-cols-3 gap-2.5">
                                    {[
                                        { icon: Palette, label: "ডিজাইন" },
                                        { icon: WandSparkles, label: "সৃজনশীলতা" },
                                        { icon: ShieldCheck, label: "নিরাপত্তা" },
                                    ].map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <div
                                                key={item.label}
                                                className="flex flex-col items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-2 py-4"
                                            >
                                                <Icon className="h-5 w-5 text-emerald-300" />
                                                <span className="text-[10px] text-slate-400 sm:text-xs">
                                                    {item.label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Floating badge */}
                        <motion.div
                            {...float}
                            className="absolute -left-2 top-[18%] hidden items-center gap-3 rounded-2xl border border-emerald-300/20 bg-[#07140f]/90 p-3.5 shadow-[0_15px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:flex lg:-left-7"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10">
                                <Fingerprint className="h-5 w-5 text-emerald-300" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white">
                                    Smart Platform
                                </p>
                                <p className="mt-1 text-[10px] text-slate-400">
                                    Built for creators
                                </p>
                            </div>
                        </motion.div>

                        {/* Floating technology badge */}
                        <motion.div
                            animate={
                                shouldReduceMotion
                                    ? undefined
                                    : { y: [0, 10, 0] }
                            }
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1,
                            }}
                            className="absolute -bottom-5 right-2 hidden items-center gap-2.5 rounded-2xl border border-cyan-300/20 bg-[#07120f]/90 px-4 py-3 shadow-[0_15px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:flex lg:-right-5"
                        >
                            <Zap className="h-5 w-5 text-cyan-300" />
                            <span className="text-xs font-semibold text-slate-200">
                                Technology powered
                            </span>
                        </motion.div>
                    </motion.div>
                </section>

                {/* ============================================= */}
                {/* MISSION & TECHNOLOGY                          */}
                {/* ============================================= */}

                <section
                    id="mission"
                    className="relative scroll-mt-20 pb-24 sm:pb-32"
                >
                    <SectionHeading
                        eyebrow="Our purpose"
                        title="আমরা যা করি,"
                        highlight="কেন করি"
                        description="প্রযুক্তি, সৃজনশীলতা এবং সহজ ব্যবহারের সমন্বয়ে ডিজিটাল প্রচারণাকে আরও কার্যকর করে তোলাই আমাদের লক্ষ্য।"
                    />

                    <motion.div
                        {...reveal}
                        className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 md:gap-6"
                    >
                        {/* Mission Card */}
                        <motion.article
                            variants={fadeInUp}
                            whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                            className={`${cardBase} p-7 sm:p-9 lg:p-10`}
                        >
                            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-400/[0.07] blur-[70px] transition-opacity duration-500 group-hover:bg-emerald-400/[0.13]" />

                            <div className="absolute bottom-0 right-0 h-1/2 w-full bg-gradient-to-t from-emerald-400/[0.025] to-transparent" />

                            <div className="relative z-10 flex items-start justify-between gap-4">
                                <div
                                    className={`${iconBase} border-emerald-400/20 bg-emerald-400/[0.09] text-emerald-300`}
                                >
                                    <Target className="h-7 w-7" />
                                </div>

                                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.05] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300">
                                    Our Mission
                                </span>
                            </div>

                            <div className="relative z-10 mt-8 space-y-4">
                                <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                    আমাদের মূল লক্ষ্য
                                </h3>

                                <p className="text-sm leading-8 text-slate-400 sm:text-base sm:leading-9">
                                    বাংলাদেশের রাজনৈতিক কর্মী ও সাধারণ মানুষের
                                    ডিজিটাল প্রচারণাকে সহজ, দ্রুত এবং দৃষ্টিনন্দন
                                    করে তোলা। জটিল ডিজাইন সফটওয়্যার বা বিশেষ
                                    ডিজাইন দক্ষতা ছাড়াই যেন বাংলা ফন্টে আকর্ষণীয়
                                    পোস্টার তৈরি করা যায়, সেই সুযোগ তৈরি করাই
                                    আমাদের অঙ্গীকার।
                                </p>
                            </div>

                            <div className="relative z-10 mt-8 flex items-center gap-2 text-sm font-semibold text-emerald-300 transition-all duration-300 group-hover:gap-3">
                                <span>সহজ ডিজাইন, আরও সম্ভাবনা</span>
                            </div>

                            <Target
                                aria-hidden="true"
                                className="pointer-events-none absolute -bottom-7 -right-5 h-36 w-36 rotate-[-15deg] text-emerald-300/[0.055] transition-all duration-700 group-hover:rotate-0 group-hover:text-emerald-300/[0.10]"
                                strokeWidth={1}
                            />
                        </motion.article>

                        {/* Technology Card */}
                        <motion.article
                            variants={fadeInUp}
                            whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                            className={`${cardBase} p-7 sm:p-9 lg:p-10`}
                        >
                            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan-400/[0.07] blur-[70px] transition-opacity duration-500 group-hover:bg-cyan-400/[0.13]" />

                            <div className="relative z-10 flex items-start justify-between gap-4">
                                <div
                                    className={`${iconBase} border-cyan-400/20 bg-cyan-400/[0.09] text-cyan-300`}
                                >
                                    <Zap className="h-7 w-7" />
                                </div>

                                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.05] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                                    Technology
                                </span>
                            </div>

                            <div className="relative z-10 mt-8 space-y-4">
                                <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                    আমাদের প্রযুক্তি ও সুবিধা
                                </h3>

                                <p className="text-sm leading-8 text-slate-400 sm:text-base sm:leading-9">
                                    বাংলা যুক্তবর্ণ, কারচিহ্ন এবং প্রতীকের
                                    যথাযথ রেন্ডারিংয়ের জন্য HTML/CSS ও
                                    Puppeteer-ভিত্তিক প্রযুক্তি ব্যবহার করা যায়।
                                    টেমপ্লেট নির্বাচন ও প্রয়োজনীয় তথ্য দেওয়ার
                                    মাধ্যমে দ্রুত উচ্চমানের PNG পোস্টার
                                    তৈরি এবং ডাউনলোড করার সুবিধা আমাদের
                                    প্ল্যাটফর্মের অন্যতম লক্ষ্য।
                                </p>
                            </div>

                            <div className="relative z-10 mt-8 flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-all duration-300 group-hover:gap-3">
                                <span>প্রযুক্তির কার্যকর ব্যবহার</span>
                            </div>

                            <Cpu
                                aria-hidden="true"
                                className="pointer-events-none absolute -bottom-7 -right-5 h-36 w-36 rotate-[-12deg] text-cyan-300/[0.055] transition-all duration-700 group-hover:rotate-0 group-hover:text-cyan-300/[0.10]"
                                strokeWidth={1}
                            />
                        </motion.article>
                    </motion.div>
                </section>

                {/* ============================================= */}
                {/* CORE VALUES                                   */}
                {/* ============================================= */}

                <section id="values" className="relative scroll-mt-20 pb-24 sm:pb-32">
                    <SectionHeading
                        eyebrow="What drives us"
                        title="আমাদের"
                        highlight="মূল চালিকাশক্তি"
                        description="আমরা বিশ্বাস করি, প্রযুক্তি তখনই সত্যিকার অর্থে মূল্যবান হয়ে ওঠে, যখন তা মানুষের কাজে আসে। তাই আমাদের প্রতিটি উদ্যোগে রয়েছে ব্যবহারকারীর প্রয়োজন, নিরাপত্তা এবং সৃজনশীলতার প্রতি গুরুত্ব।"
                    />

                    <motion.div
                        {...reveal}
                        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5"
                    >
                        {values.map((value) => {
                            const Icon = value.icon;
                            const style = colorStyles[value.color];

                            return (
                                <motion.article
                                    key={value.number}
                                    variants={fadeInUp}
                                    whileHover={
                                        shouldReduceMotion
                                            ? undefined
                                            : { y: -5 }
                                    }
                                    className={`${cardBase} p-6 sm:p-7`}
                                >
                                    {/* Colored glow */}
                                    <div
                                        className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full ${style.glow} opacity-40 blur-[60px] transition-opacity duration-500 group-hover:opacity-100`}
                                    />

                                    <div className="relative z-10 flex items-center justify-between">
                                        <div
                                            className={`${iconBase} h-12 w-12 rounded-xl ${style.icon}`}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <span
                                            className={`font-mono text-xs font-bold ${style.number}`}
                                        >
                                            / {value.number}
                                        </span>
                                    </div>

                                    <div className="relative z-10 mt-7 space-y-3">
                                        <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                                            {value.title}
                                        </h3>

                                        <p className="text-sm leading-7 text-slate-400">
                                            {value.description}
                                        </p>
                                    </div>

                                    <div className="relative z-10 mt-6 h-px w-full bg-gradient-to-r from-white/[0.10] via-white/[0.04] to-transparent">
                                        <div className="h-px w-0 bg-emerald-300 transition-all duration-700 group-hover:w-1/2" />
                                    </div>
                                </motion.article>
                            );
                        })}
                    </motion.div>
                </section>

                {/* ============================================= */}
                {/* OUR APPROACH                                  */}
                {/* ============================================= */}

                <section className="pb-24 sm:pb-32">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                        className="relative overflow-hidden rounded-[30px] border border-white/[0.09] bg-gradient-to-br from-emerald-400/[0.07] via-white/[0.025] to-cyan-400/[0.04] p-7 sm:rounded-[36px] sm:p-10 lg:p-14"
                    >
                        {/* Background decoration */}
                        <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-emerald-400/[0.10] blur-[100px]" />

                        <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-cyan-400/[0.07] blur-[100px]" />

                        <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
                            <div className="max-w-2xl space-y-5">
                                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300 sm:text-xs">
                                    <Rocket className="h-4 w-4" />
                                    Our Approach
                                </div>

                                <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                                    প্রযুক্তির শক্তিতে
                                    <br />
                                    <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                                        নতুন সম্ভাবনার পথে
                                    </span>
                                </h2>

                                <p className="max-w-xl text-sm leading-8 text-slate-400 sm:text-base sm:leading-9">
                                    আমরা এমন একটি অভিজ্ঞতা তৈরি করতে চাই,
                                    যেখানে আধুনিক প্রযুক্তি, ব্যবহারবান্ধব
                                    ডিজাইন এবং বাংলা ভাষার সমর্থন একসঙ্গে
                                    কাজ করবে। আমাদের লক্ষ্য, ডিজিটাল
                                    কনটেন্ট তৈরিকে আরও সহজ ও সবার
                                    নাগালের মধ্যে নিয়ে আসা।
                                </p>

                                <div className="flex flex-wrap gap-x-5 gap-y-3 pt-2">
                                    {[
                                        "সহজ ব্যবহার",
                                        "আধুনিক ডিজাইন",
                                        "বাংলা সমর্থন",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-2 text-xs text-slate-300 sm:text-sm"
                                        >
                                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative mx-auto flex h-48 w-48 items-center justify-center sm:h-56 sm:w-56 lg:h-64 lg:w-64">
                                <div className="absolute inset-0 rounded-full border border-emerald-400/[0.13]" />

                                <div className="absolute inset-5 rounded-full border border-emerald-400/[0.16]" />

                                <div className="absolute inset-10 rounded-full border border-cyan-400/[0.16]" />

                                <div className="absolute inset-[28%] rounded-full bg-emerald-400/[0.10] blur-xl" />

                                <div className="relative flex h-24 w-24 items-center justify-center rounded-[28px] border border-emerald-300/20 bg-gradient-to-br from-emerald-300/15 to-cyan-300/[0.06] shadow-[0_0_60px_rgba(16,185,129,0.10)] sm:h-28 sm:w-28">
                                    <Globe2 className="h-12 w-12 text-emerald-300 sm:h-14 sm:w-14" />
                                </div>

                                <div className="absolute right-4 top-7 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-[#07120f] text-cyan-300 sm:right-5 sm:top-8">
                                    <Code2 className="h-5 w-5" />
                                </div>

                                <div className="absolute bottom-7 left-2 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-[#07120f] text-emerald-300 sm:bottom-9 sm:left-3">
                                    <Sparkles className="h-5 w-5" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* ============================================= */}
                {/* FOOTER                                        */}
                {/* ============================================= */}
                <div className="flex justify-center pt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-6 py-3 text-sm font-semibold text-emerald-300 backdrop-blur-xl transition-all duration-300 hover:bg-emerald-400/20 hover:text-white shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        হোম পেজে ফিরে গিয়ে আপনার পোস্টার তৈরি শুরু করুন
                    </Link>
                </div>

            </div>
        </main>
    );
}
