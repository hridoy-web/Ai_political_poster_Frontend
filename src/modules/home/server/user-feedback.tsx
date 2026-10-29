import { HeartHandshake } from "lucide-react";
import { UserFeedbackCarousel } from "../client/user-feedback-carousel";
import { reviewsData } from "../home.service";


export function UserFeedbackSection() {
    return (
        <section className="w-full py-8 md:py-10 lg:py-12 sm:py-8 bg-linear-to-b from-transparent via-muted/20 to-transparent relative overflow-hidden">
            {/* Background Decorative Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-75 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

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
