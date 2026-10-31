import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import StepCard from "../client/step-card";
import { steps } from "../home.data";


const HowToUse = () => {
    return (
        <section className="relative w-full overflow-hidden bg-linear-to-b from-background via-brand-green/5 to-background py-8 md:py-10 lg:py-12 dark:via-brand-green/10">
            {/* Background Radial Glow Effects */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 left-1/3 h-80 w-80 rounded-full bg-brand-green/10 blur-[120px] dark:bg-brand-green/5" />
                <div className="absolute -bottom-20 right-1/3 h-80 w-80 rounded-full bg-brand-mint/10 blur-[120px] dark:bg-brand-mint/5" />
            </div>

            <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-7 text-center sm:mb-9 animate-in fade-in slide-in-from-top-6 duration-700 ease-out fill-mode-both">
                    {/* Badge */}
                    <Badge
                        variant="outline"
                        className="mb-3 inline-flex h-auto w-fit items-center gap-2 overflow-visible rounded-full border-brand-primary/20 bg-accent px-3.5 py-1.5 text-xs font-semibold text-accent-foreground backdrop-blur-md shadow-2xs sm:text-sm"
                    >
                        <Sparkles className="h-4 w-4 shrink-0 animate-pulse text-brand-primary" />
                        <span>সহজ ৪টি ধাপ</span>
                    </Badge>

                    {/* Main Title */}
                    <h2 className="mb-2.5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                        কীভাবে{" "}
                        <span className="text-gradient-brand">
                            কাজ করে?
                        </span>
                    </h2>

                    {/* Subtitle */}
                    <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                        কোনো ডিজাইনিং অভিজ্ঞতা ছাড়াই মাত্র ৪টি সহজ ধাপে আপনার পছন্দমতো প্রফেশনাল পোস্টার তৈরি করুন।
                    </p>
                </div>

                {/* Steps Grid Wrapper */}
                <div className="relative">
                    {/* Positioned above Card Title */}
                    <div className="pointer-events-none absolute top-21 left-0 z-10 hidden h-1 w-full -translate-y-1/2 rounded-full bg-linear-to-r from-transparent via-brand-primary/35 to-transparent shadow-[0_0_10px_rgba(225,29,72,0.3)] lg:block" />

                    {/* Positioned above Card Title  */}
                    <div className="pointer-events-none absolute top-21 left-0 z-30 hidden -translate-y-1/2 items-center animate-travel-line lg:flex">
                        {/* Luminous Trailing Energy Tail */}
                        <div className="h-1.5 w-24 rounded-full bg-linear-to-r from-transparent via-brand-primary/50 to-brand-primary blur-[0.5px]" />

                        {/* Glowing Pulse Pointer Head */}
                        <div className="relative -ml-2 flex h-6 w-6 items-center justify-center">
                            {/* Outer Sonar Ripple Wave */}
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-75" />

                            {/* Radiant Crimson Halo */}
                            <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-brand-primary shadow-[0_0_12px_#ff2e55,0_0_24px_#e11d48]">
                                {/* Searing White Energy Core */}
                                <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
                            </span>
                        </div>
                    </div>

                    {/* Steps Container */}
                    <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                        {steps.map((step, i) => (
                            <StepCard
                                key={step.number}
                                step={step}
                                isLast={i === steps.length - 1}
                                index={i}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HowToUse;
