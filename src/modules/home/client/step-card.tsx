"use client";
import React from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, UserPlus } from "lucide-react";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { iconMap, StepCardProps, StepIconKey } from "../home.types";


export const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: (custom: number = 0) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
            delay: custom * 0.12,
        },
    }),
};

export const StepCard: React.FC<StepCardProps> = ({ step, isLast = false, index = 0 }) => {
    const IconComponent = typeof step.icon === "string" ? (iconMap[step.icon as StepIconKey] || UserPlus) : step.icon;

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={index}
            whileHover={{ y: -10, transition: { duration: 0.25, ease: "easeOut" } }}
            className="relative flex flex-col h-full"
        >
            {/* Step Card Container */}
            <CardContent className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card/60 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-brand-primary/50 hover:bg-card hover:shadow-xl hover:shadow-brand-primary/10">
                {/* Top Row: Icon & Step Number */}
                <div className="mb-6 flex items-center justify-between">
                    {/* Step Icon Badge */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-primary/20 bg-brand-primary/10 text-brand-primary shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-brand group-hover:text-white">
                        <IconComponent className="h-6 w-6" />
                    </div>

                    {/* Large Step Number */}
                    <span className="text-3xl font-black text-muted-foreground/30 transition-colors duration-300 group-hover:text-brand-primary/40 sm:text-4xl">
                        {step.number}
                    </span>
                </div>

                {/* Card Title & Content */}
                <div className="relative z-10">
                    <CardTitle className="mb-2 text-lg font-bold leading-tight sm:text-xl text-foreground transition-colors duration-200 group-hover:text-brand-primary">
                        {step.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed sm:text-sm">
                        {step.description}
                    </CardDescription>
                </div>

                {/* Subtle Glow Overlay on Hover */}
                <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-brand-primary/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </CardContent>

            {/* Positioned above Card */}
            {!isLast && (
                <div className="absolute -right-3.5 top-21 z-20 hidden -translate-y-1/2 lg:flex">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card shadow-xs transition-transform duration-200 hover:scale-110 hover:border-brand-primary/40">
                        <ArrowRight className="h-3.5 w-3.5 text-brand-primary" />
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default StepCard;
