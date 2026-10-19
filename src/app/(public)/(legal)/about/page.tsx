import Link from "next/link";
import {
    CheckCircle2,
    Target,
    Users,
    Sparkles,
    ArrowRight,
    ShieldCheck,
    Zap,
    Award,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
    title: "আমাদের সম্পর্কে | AI Political Poster Maker",
    description: "আমাদের প্ল্যাটফর্ম, ডিজিটাল মিশন এবং টিম সম্পর্কে বিস্তারিত জানুন।",
};

const features = [
    { label: "সঠিক বাংলা রেন্ডারিং", value: "১০০%", icon: CheckCircle2, color: "text-primary" },
    { label: "পোস্টার তৈরি", value: "১ মিনিটে", icon: Zap, color: "text-secondary" },
    { label: "রেডি টেমপ্লেট", value: "অনুমোদিত", icon: Award, color: "text-primary" },
    { label: "নিরাপদ ডাটা", value: "সুরক্ষিত", icon: ShieldCheck, color: "text-secondary" },
];

const target = [
    {
        step: "০১",
        title: "রাজনৈতিক কর্মী",
        desc: "সভা, মিছিল, সভা-সমাবেশ বা নির্বাচনী প্রচারণার জন্য তাৎক্ষণিক পোস্টার তৈরি ও শেয়ার।",
    },
    {
        step: "০২",
        title: "দলীয় সংগঠন",
        desc: "সংগঠনের লোগো, নির্দিষ্ট কালার থিম ও প্রেস ব্রিফিংয়ের ফ্রেম ব্যবহারে সুনির্দিষ্ট লেআউট।",
    },
    {
        step: "০৩",
        title: "সাধারণ নাগরিক",
        desc: "নাগরিক সেবা, সামাজিক কাজ বা উন্নয়নমূলক কর্মকাণ্ডের বার্তা ছড়িয়ে দেওয়ার সুযোগ।",
    },
];

const platforms = [
    "যুক্তবর্ণ ও কারচিহ্নযুক্ত বাংলা ফন্টের নিখুঁত প্লেসমেন্ট",
    "অটোমেটিক ছবি প্রসেসিং ও সাবজেক্ট কাট-আউট",
    "বিভিন্ন দল ও ঐতিহাসিক দিবসের জন্য বিশেষ টেমপ্লেট",
    "সম্পূর্ণ সুরক্ষিত ও ব্যক্তিগত ডাটা পলিসি",
]

export default function AboutPage() {
    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-20 relative overflow-hidden">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
            <div className="absolute top-96 right-10 w-80 h-80  rounded-full blur-3xl -z-10 pointer-events-none" />

            <section className="text-center space-y-6 max-w-3xl mx-auto">
                <Badge
                    variant="outline"
                    className="px-4 py-1.5 gap-2 rounded-full bg-accent/80 border-primary/20 text-accent-foreground text-xs sm:text-sm font-semibold backdrop-blur-md shadow-xs"
                >
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                    <span>স্মার্ট ও আধুনিক রাজনৈতিক প্রচারণা</span>
                </Badge>

                <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
                    ডিজিটাল যুগে পোস্টার তৈরির <br />
                    <span className="text-gradient-brand">নতুন অভিজ্ঞতা</span>
                </h1>

                <p className="text-muted-foreground text-base sm:text-xl leading-relaxed max-w-2xl mx-auto font-normal">
                    তৃণমূল কর্মী থেকে জাতীয় স্তরের নেতা—সবার জন্য দ্রুত, দৃষ্টিনন্দন এবং নিখুঁত বাংলা ফন্টে রাজনৈতিক পোস্টার তৈরির আধুনিক প্ল্যাটফর্ম।
                </p>
            </section>

            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {features.map((stat, idx) => {
                    const IconComponent = stat.icon;
                    return (
                        <Card
                            key={idx}
                            className="bg-card/60 backdrop-blur-md border-border/60 text-center space-y-2 hover:border-primary/40 transition-all duration-300 shadow-xs hover:shadow-md"
                        >
                            <CardContent className="p-5 sm:p-6 space-y-2">
                                <IconComponent className={`w-6 h-6 mx-auto ${stat.color}`} />
                                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                    {stat.value}
                                </div>
                                <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                                    {stat.label}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </section>

            <Card className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center bg-card/80 border-border/80 p-6 sm:p-10 shadow-xl relative backdrop-blur-xl rounded-3xl overflow-hidden">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                            কেন এই <span className="text-gradient-green">প্ল্যাটফর্ম তৈরি?</span>
                        </h2>
                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                            গ্রাফিক ডিজাইনারের ওপর নির্ভর না করে এবং যুক্তবর্ণ বা ফন্টের সমস্যা ছাড়াই যেকোনো রাজনৈতিক অনুষ্ঠান বা দিবসের পোস্টার মুহূর্তেই তৈরি করা এখন অনেক সহজ।
                        </p>
                    </div>

                    <div className="space-y-3">
                        {platforms.map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="p-1 rounded-full bg-secondary/10 text-secondary shrink-0 mt-0.5">
                                    <CheckCircle2 className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-medium text-foreground/90">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <Card className="bg-linear-to-br from-accent/50 to-muted/80 border-primary/10 shadow-md">
                    <CardHeader className="space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-brand text-white flex items-center justify-center shadow-md">
                            <Target className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-xl font-bold">আমাদের ভিশন</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            আমরা বিশ্বাস করি প্রচারণায় সঠিক বার্তা উপস্থাপন অনেক গুরুত্বপূর্ণ। আধুনিক প্রযুক্তির ব্যবহারে প্রচারণার কাজকে সহজ ও আধুনিক রূপ দিয়ে প্রতিটি কর্মীকে পোস্টার তৈরিতে আত্মনির্ভরশীল করাই আমাদের মূল উদ্দেশ্য।
                        </p>
                    </CardContent>
                </Card>
            </Card>

            <section className="space-y-10">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <h2 className="text-3xl sm:text-4xl font-extrabold">
                        কাদের জন্য এই প্ল্যাটফর্ম?
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base">
                        সবাই যেন কোনো জটিলতা ছাড়াই ব্যবহার করতে পারেন, সেভাবেই প্রতিটি অংশ সাজানো হয়েছে।
                    </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                    {target.map((card, index) => (
                        <Card
                            key={index}
                            className="group border-border/80 space-y-2 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-xl"
                        >
                            <CardHeader className="space-y-3">
                                <div className="w-12 h-12 rounded-xl bg-accent group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex items-center justify-center font-bold text-primary text-base">
                                    {card.step}
                                </div>
                                <CardTitle className="font-bold text-xl">{card.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                                    {card.desc}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <Card className="bg-card/60 backdrop-blur-md p-8 sm:p-12 border-border/80 text-center space-y-6 rounded-3xl">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/80 text-primary flex items-center justify-center border border-primary/20 shadow-inner">
                    <Users className="w-8 h-8" />
                </div>
                <div className="space-y-3 max-w-xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-extrabold">আমাদের ডেভ টিম</h2>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        প্রযুক্তি ও ডিজাইনের সমন্বয়ে রাজনৈতিক প্রচারণাকে সহজ এবং সর্বসাধারণের ব্যবহারোপযোগী করতে একঝাঁক তরুণ ডেভেলপারের প্রচেষ্টায় এটি নির্মিত।
                    </p>
                </div>
            </Card>

            <Card className="relative bg-card border-primary/20 p-8 sm:p-12 rounded-3xl text-center space-y-6 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

                <div className="space-y-2 relative z-10">
                    <h2 className="text-3xl sm:text-4xl font-extrabold">
                        পোস্টার তৈরি করতে <span className="text-gradient-brand">প্রস্তুত?</span>
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
                        পছন্দের টেমপ্লেট বেছে নিন এবং কয়েক ক্লিকেই বানিয়ে ফেলুন মানসম্মত রাজনৈতিক পোস্টার।
                    </p>
                </div>

                <Separator className="my-4 max-w-xs mx-auto opacity-50" />

                <div className="relative z-10 pt-2">
                    <Link
                        href="/create-poster"
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold bg-gradient-brand text-white shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-200 text-sm"
                    >
                        <span>পোস্টার তৈরি করুন</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </Card>
        </div>
    );
}