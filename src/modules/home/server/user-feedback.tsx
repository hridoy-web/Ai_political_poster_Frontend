import { HeartHandshake } from "lucide-react";
import { UserFeedbackCarousel, ReviewItem } from "../client/user-feedback-carousel";

// Feedback Data
const reviewsData: ReviewItem[] = [
    {
        id: "1",
        name: "রহিম উদ্দিন চৌধুরী",
        role: "ইউনিয়ন পরিষদ চেয়ারম্যান পদপ্রার্থী",
        party: "ধানের শীষ প্রতীক",
        comment:
            "মাঠপর্যায়ের প্রচারণার জন্য ২ মিনিটেই প্রফেশনাল এইচডি পোস্টার তৈরি করে ফেলেছি। এআই ব্যাকগ্রাউন্ড কোয়ালিটি দারুণ!",
        rating: 5,
        avatarText: "রউ",
    },
    {
        id: "2",
        name: "মোঃ শাকিল আহমেদ",
        role: "কেন্দ্রীয় সাধারণ সম্পাদক",
        party: "ছাত্র সংগ্রাম পরিষদ",
        comment:
            "এআই অটো-ক্যাপশন সাজেস্ট ফিচারটি আমার সময় অনেক বাঁচিয়ে দিয়েছে। এক ক্লিকেই স্লোগান জেনারেট হয়ে যায়!",
        rating: 5,
        avatarText: "শাআ",
    },
    {
        id: "3",
        name: "কাজী তানভীর হোসেন",
        role: "হেড অফ ক্যাম্পেইন মিডিয়া",
        party: "স্বতন্ত্র প্রার্থীর মিডিয়া সেল",
        comment:
            "হাই-রেজোলিউশন পোস্টার প্রিন্টিংয়ের জন্য এটিই সেরা প্ল্যাটফর্ম। কালার গ্রাডিয়েন্ট ও ফ্রেম ডিজাইনগুলো একদম ডিজিটাল এজেন্সির মতো!",
        rating: 5,
        avatarText: "কা তা",
    },
    {
        id: "4",
        name: "মাহমুদুল হাসান",
        role: "পৌরসভা কাউন্সিলর প্রার্থী",
        party: "নৌকা প্রতীক",
        comment:
            "মোবাইল দিয়েই পোস্টার ডিজাইন সম্পন্ন করা যায়। ফ্রেম পছন্দ করে ছবি বসালেই রেডিমেড ব্যানার তৈরি!",
        rating: 5,
        avatarText: "মা হা",
    },
];

export function UserFeedbackSection() {
    return (
        <section className="w-full py-16 lg:py-24 bg-linear-to-b from-transparent via-muted/20 to-transparent relative overflow-hidden">
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
