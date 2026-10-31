import { Flame, ImageIcon, LayoutGrid, Sparkles, Star, Users } from "lucide-react";
import { BadgeConfigItem, FAQItem, PosterCardItem, ReviewItem, StatItem, StepItem } from "./home.schema";

// HERO
export const POSTERS: PosterCardItem[] = [
    {
        id: "poster-1",
        src: "/image/images11.jpg",
        title: "নির্বাচনী প্রচারণা",
    },
    {
        id: "poster-2",
        src: "/image/images26.jpg",
        title: "দলীয় সমাবেশ",
    },
    {
        id: "poster-3",
        src: "/image/images21.jpg",
        title: "প্রতিষ্ঠাবার্ষিকী",
    },
    {
        id: "poster-4",
        src: "/image/image6.jpg",
        title: "বিজয় দিবস",
    },
    {
        id: "poster-5",
        src: "/image/images24.jpg",
        title: "শুভ জন্মদিন",
    },
];

// TRENDING-TEMPLATES-CLIENT
export const BADGE_CONFIG: Record<"trending" | "new" | "popular", BadgeConfigItem> = {
    trending: {
        icon: Flame,
        label: "ট্রেন্ডিং",
        className: "bg-brand-primary/90 text-white border-brand-secondary/40 shadow-xs",
    },
    new: {
        icon: Sparkles,
        label: "নতুন",
        className: "bg-brand-green/90 text-white border-brand-mint/40 shadow-xs",
    },
    popular: {
        icon: Star,
        label: "জনপ্রিয়",
        className: "bg-amber-500/90 text-white border-amber-400/50 shadow-xs",
    },
};

// HOW-TO-USE
export const steps: StepItem[] = [
    {
        number: "০১",
        title: "অ্যাকাউন্ট তৈরি করুন",
        description: "রেজিস্টার করে লগইন করুন এবং আপনার দল নির্বাচন করুন।",
        icon: "user-plus",
    },
    {
        number: "০২",
        title: "টেমপ্লেট বেছে নিন",
        description: "কর্মসূচির ধরন অনুযায়ী অনুমোদিত টেমপ্লেট থেকে বেছে নিন।",
        icon: "layout-grid",
    },
    {
        number: "০৩",
        title: "ছবি ও তথ্য যোগ করুন",
        description: "সর্বোচ্চ ৩টি ছবি, নাম, পদবি, দল, এলাকা ও শিরোনাম লিখুন।",
        icon: "image-plus",
    },
    {
        number: "০৪",
        title: "প্রিভিউ ও ডাউনলোড",
        description: "প্রিভিউ দেখে সম্পাদনা করুন, তারপর এইচডি PNG ডাউনলোড করুন।",
        icon: "download",
    },
];

// STATISTICS-CLIENT
export const DEFAULT_STATS: StatItem[] = [
    {
        id: "users",
        icon: Users,
        value: 10,
        suffix: "+",
        label: "সক্রিয় ব্যবহারকারী",
    },
    {
        id: "posters",
        icon: ImageIcon,
        value: 5,
        suffix: "+",
        label: "তৈরি পোস্টার",
    },
    {
        id: "templates",
        icon: LayoutGrid,
        value: 4,
        suffix: "+",
        label: "অনুমোদিত টেমপ্লেট",
    },
    {
        id: "rating",
        icon: Star,
        value: 4.9,
        suffix: "/৫",
        label: "গড় রেটিং",
        decimals: 1,
    },
];

// USER-FEEDBACK
export const reviewsData: ReviewItem[] = [
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

// FAQ-SECTION
export const faqData: FAQItem[] = [
    {
        id: "item-1",
        question: "এই ওয়েব অ্যাপটি কাদের জন্য তৈরি?",
        answer:
            "এটি শুধুমাত্র রাজনৈতিক দল এবং দলের অনুমোদিত কর্মীদের নির্বাচনী প্রচারণা, দলীয় সভা-সমাবেশ, প্রতিষ্ঠাবার্ষিকী, বিজয় দিবস, নেতার জন্মদিন, স্মরণসভা ও শোকবার্তার পোস্টার তৈরির জন্য নির্দিষ্ট। সাধারণ শুভেচ্ছা বা অন্যান্য সামাজিক পোস্টার এর অন্তর্ভুক্ত নয়।",
    },
    {
        id: "item-2",
        question: "পোস্টার তৈরির জন্য কী কী তথ্য দিতে হবে?",
        answer:
            "ব্যবহারকারী অনুমোদিত Template বেছে নেওয়ার পর সর্বোচ্চ তিনটি ছবি, নাম, পদবি, দল বা সংগঠনের নাম, এলাকা, শিরোনাম এবং প্রচারের প্রয়োজনীয় তথ্য দেবেন।",
    },
    {
        id: "item-3",
        question: "বাংলা লেখা ও যুক্তবর্ণ কি সঠিকভাবে আসবে?",
        answer:
            "হ্যাঁ, বানান ও যুক্তবর্ণ বিকৃত হওয়ার ঝুঁকি এড়াতে সরাসরি AI দিয়ে ছবির মধ্যে বাংলা লেখা তৈরি করা হয় না। পরিবর্তে, সঠিক বাংলা Font ব্যবহার করে HTML/CSS Template-এর মাধ্যমে লেখা বসিয়ে Puppeteer-এর সাহায্যে PNG তৈরি করা হয়।",
    },
    {
        id: "item-4",
        question:
            "AI কাজ না করলে বা ফ্রি লিমিট শেষ হয়ে গেলে কি পোস্টার বানানো যাবে?",
        answer:
            "হ্যাঁ, প্রথম কোনো AI Provider ব্যর্থ হলে বা এর সীমা শেষ হলে সিস্টেম স্বয়ংক্রিয়ভাবে বিকল্প (Fallback) Provider চেষ্টা করবে। সব AI Provider অনুপলব্ধ হলেও সাধারণ Template ব্যবহার করে পোস্টার তৈরির সুযোগ থাকবে।",
    },
    {
        id: "item-5",
        question: "তৈরি করা পোস্টার কি ডাউনলোড করা যাবে?",
        answer:
            "হ্যাঁ, ব্যবহারকারী সম্পাদনা শেষে পোস্টারের Preview দেখতে পাবেন এবং তা PNG ফরম্যাটে ডাউনলোড করতে পারবেন। পাশাপাশি নিজের তৈরি আগের পোস্টারগুলো History-তেও দেখতে পাবেন।",
    },
    {
        id: "item-6",
        question: "এই সেবা ব্যবহার করতে কি কোনো অ্যাকাউন্ট লাগবে?",
        answer:
            "হ্যাঁ, প্ল্যাটফর্মটি ব্যবহারের জন্য প্রথমে অ্যাকাউন্ট তৈরি করে প্রবেশ করতে হবে, যার মাধ্যমে ব্যবহারকারীর পোস্টার হিস্ট্রি ও অনুমতি সুরক্ষিত থাকে।",
    },
];

