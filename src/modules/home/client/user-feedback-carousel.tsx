"use client";
import * as React from "react";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star, CheckCircle2 } from "lucide-react";

export interface ReviewItem {
    id: string;
    name: string;
    role: string;
    party: string;
    comment: string;
    rating: number;
    avatarText: string;
}

interface UserFeedbackCarouselProps {
    reviews: ReviewItem[];
}

export function UserFeedbackCarousel({ reviews }: UserFeedbackCarouselProps) {
    // 3.0-second auto slide
    const autoplayPlugin = React.useMemo(
        () =>
            Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
            }),
        []
    );

    return (
        <div className="relative w-full mx-auto px-3 sm:px-4">
            <Carousel
                plugins={[autoplayPlugin]}
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-3 md:-ml-4 lg:-ml-5 py-2">
                    {reviews.map((review) => (
                        <CarouselItem
                            key={review.id}
                            className="pl-3 md:pl-4 lg:pl-5 basis-full md:basis-1/2 lg:basis-1/3"
                        >
                            <motion.div
                                whileHover={{
                                    y: -6,
                                    transition: { duration: 0.25, ease: "easeOut" },
                                }}
                                className="h-full"
                            >
                                <Card className="h-full border border-border/80 bg-card/70 dark:bg-card/40 backdrop-blur-md rounded-2xl transition-all duration-300 hover:border-brand-secondary/50 hover:shadow-xl hover:shadow-brand-primary/10 group flex flex-col justify-between py-0! [--card-spacing:0px]">
                                    <CardContent className="px-4 sm:px-5 py-3.5 sm:py-4 flex flex-col justify-between h-full">
                                        {/* Top Header */}
                                        <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-border/60">
                                            {/* User Info (Left) */}
                                            <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                                {/* User Avatar Badge */}
                                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-md shrink-0">
                                                    {review.avatarText}
                                                </div>

                                                {/* Details */}
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-1.5">
                                                        <h4 className="font-semibold text-foreground text-sm truncate leading-tight">
                                                            {review.name}
                                                        </h4>
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-mint shrink-0" />
                                                    </div>
                                                    <p className="text-xs text-muted-foreground truncate leading-tight mt-0.5">
                                                        {review.role}
                                                    </p>
                                                    <span className="inline-block mt-1 px-1.5 py-0.5 text-[10px] font-medium rounded-md bg-brand-green/10 text-brand-mint border border-brand-green/20 leading-none">
                                                        {review.party}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Star Rating (Right) */}
                                            <div className="flex items-center gap-0.5 shrink-0 pt-0.5">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${i < review.rating
                                                                ? "fill-amber-400 text-amber-400"
                                                                : "text-muted/40"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Bottom: Review Comment */}
                                        <div className="pt-2.5 flex-1">
                                            <p className="text-foreground/90 text-sm leading-relaxed font-normal italic">
                                                {review.comment}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Carousel  */}
                <div className="hidden sm:block">
                    <CarouselPrevious className="-left-2 sm:-left-3 lg:-left-4 border-border bg-background/80 hover:bg-gradient-brand hover:text-white transition-all duration-200" />
                    <CarouselNext className="-right-2 sm:-right-3 lg:-right-4 border-border bg-background/80 hover:bg-gradient-brand hover:text-white transition-all duration-200" />
                </div>
            </Carousel>
        </div>
    );
}
