import { HeartHandshake } from "lucide-react";
import { UserFeedbackCarousel } from "../client/user-feedback-carousel";
import { reviewsData } from "../home.data";


export function UserFeedbackSection() {
    return (
        <section className="relative w-full overflow-hidden bg-linear-to-b from-background via-brand-green/5 to-background py-8 md:py-10 lg:py-12 dark:via-brand-green/10">
            {/* Background Radial Glow Effects */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 left-1/3 h-80 w-80 rounded-full bg-brand-green/10 blur-[120px] dark:bg-brand-green/5" />
                <div className="absolute -bottom-20 right-1/3 h-80 w-80 rounded-full bg-brand-mint/10 blur-[120px] dark:bg-brand-mint/5" />
            </div>

            <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 space-y-10 relative z-10">
                {/* Modern & Catchy Section Header */}
                <div className="text-center space-y-4 max-w-3xl mx-auto animate-in fade-in slide-in-from-top-6 duration-700 ease-out fill-mode-both">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent border border-brand-primary/20 text-brand-primary text-xs font-semibold tracking-wide">
                        <HeartHandshake className="w-3.5 h-3.5 animate-pulse" />
                        <span>ইউজারদের অভিজ্ঞতা</span>
                    </div>

                    {/* Heading with Brand Gradient */}
                    <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-forwards">
                        প্রার্থী ও প্রচারকদের{" "}
                        <span className="text-gradient-brand">পছন্দের প্ল্যাটফর্ম</span>
                    </h2>

                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        হাজারো প্রার্থী এবং ডিজিটাল ক্যাম্পেইন ম্যানেজার প্রতিদিন PosterAI ব্যবহার করে আকর্ষণীয় নির্বাচনী ব্যানার তৈরি করছেন।
                    </p>
                </div>

                {/* Client */}
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 ease-out fill-mode-both">
                    <UserFeedbackCarousel reviews={reviewsData} />
                </div>
            </div>
        </section>
    );
}
