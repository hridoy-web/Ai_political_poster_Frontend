import Link from "next/link";
import { Lock, Eye, HardDrive, UserCheck, ArrowRight, Sparkles, Cookie, Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
    title: "গোপনীয়তা নীতি | AI Political Poster Maker",
    description: "আমাদের অ্যাপ্লিকেশনের গোপনীয়তা নীতি এবং আপনার তথ্যের সুরক্ষা সংক্রান্ত তথ্য জানুন।",
};

const PRIVACY_CARDS = [
    { icon: Lock, title: "ডাটা এনক্রিপশন", desc: "আপনার ব্যক্তিগত ছবি ও তথ্য এনক্রিপ্ট করে সম্পূর্ণ সুরক্ষিত ক্লাউড সার্ভারে রাখা হয়।", color: "text-primary", bg: "bg-primary/10" },
    { icon: Eye, title: "কোনো গোপন নজরদারি নেই", desc: "আপনার অনুমতি ছাড়া কোনো ব্যক্তিগত ডাটা তৃতীয় কারো কাছে বিক্রি বা শেয়ার করা হয় না।", color: "text-secondary", bg: "bg-secondary/10" },
    { icon: HardDrive, title: "ডাটা ডিলিট করার সুযোগ", desc: "যেকোনো সময় হিস্টোরি থেকে আপনার তৈরি পোস্টার ও ডাটা স্থায়ীভাবে মুছে ফেলতে পারবেন।", color: "text-primary", bg: "bg-accent" },
];

const COLLECTED_DATA = [
    { title: "ব্যক্তিগত তথ্য", desc: "সাইন-আপের সময় প্রদত্ত নাম, ইমেইল এবং প্রোফাইল তথ্য।" },
    { title: "আপলোডকৃত ছবি", desc: "পোস্টার প্রসেসিংয়ের জন্য নেতাদের দেওয়া ডিজিটাল ছবি।" },
    { title: "পোস্টার কন্টেন্ট", desc: "পোস্টারে ব্যবহারের জন্য পদবি, এলাকা ও রাজনৈতিক বার্তা।" },
    { title: "গেস্ট ডিভাইস ডাটা", desc: "৩টি ফ্রি লিমিট ট্র্যাকিংয়ের জন্য কুকিজ ও ডিভাইস সংকেত।" },
];

const USAGE_RULES = [
    "স্বয়ংক্রিয়ভাবে ছবির পটভূমি অপসারণ ও টেমপ্লেটে পজিশন নিশ্চিতকরণ।",
    "আপনার ড্যাশবোর্ডে পূর্বের তৈরি পোস্টার ইতিহাস সংরক্ষণ করা।",
    "অনুমোদিত কন্টেন্ট নীতি বজায় রাখা এবং সিস্টেমে অপব্যবহার প্রতিরোধ।",
];

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10 relative overflow-hidden">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-125 h-125 bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="absolute top-[40%] right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

            {/* Hero Section */}
            <section className="text-center space-y-6 max-w-3xl mx-auto">
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
                    গোপনীয়তা <span className="text-gradient-brand">নীতিমালা</span>
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                    আমাদের প্ল্যাটফর্মে আপনার আপলোড করা ছবি, নাম এবং ডাটা কতটা সুরক্ষিত রাখা হয় এবং কীভাবে ব্যবহার করা হয়, তার স্পষ্ট বিবরণ নিচে দেওয়া হলো।
                </p>
            </section>

            {/* Feature Cards */}
            <section className="grid sm:grid-cols-3 gap-6">
                {PRIVACY_CARDS.map(({ icon: Icon, title, desc, color, bg }, i) => (
                    <Card key={i} className="group bg-card/60 backdrop-blur-md border-border/80 p-6 rounded-3xl space-y-4 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-sm">
                        <CardHeader className="p-0 space-y-4">
                            <div className={`w-12 h-12 rounded-2xl ${bg} ${color} flex items-center justify-center font-bold transition-transform duration-300 group-hover:scale-110`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <CardTitle className="font-bold text-xl">{title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <CardDescription className="text-muted-foreground text-sm leading-relaxed">{desc}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </section>

            {/* Detailed Clauses */}
            <Card className="bg-card/70 border-border/80 p-6 sm:p-12 rounded-3xl shadow-2xl space-y-10 backdrop-blur-xl relative overflow-hidden">

                {/* Clause 1 */}
                <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-gradient-brand text-white flex items-center justify-center font-bold text-sm shrink-0">০১</span>
                        <h2 className="text-xl sm:text-2xl font-extrabold">সংগৃহীত তথ্যের বিবরণ</h2>
                    </div>
                    <div className="pl-11 space-y-3">
                        <p className="text-muted-foreground text-sm sm:text-base">প্লাটফর্ম ব্যবহারের সময় সঠিক সেবা নিশ্চিত করতে আমরা যেসব ডাটা সংগ্রহ করি:</p>
                        <div className="grid sm:grid-cols-2 gap-3 text-sm">
                            {COLLECTED_DATA.map((item, i) => (
                                <div key={i} className="bg-muted/40 p-3.5 rounded-xl border space-y-1">
                                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                                        <Database className="w-3.5 h-3.5 text-primary" />
                                        <span>{item.title}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Clause 2 */}
                <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-center font-bold text-sm shrink-0">০২</span>
                        <h2 className="text-xl sm:text-2xl font-bold">তথ্য ব্যবহারের উদ্দেশ্য</h2>
                    </div>
                    <div className="pl-11 space-y-3 text-muted-foreground text-sm sm:text-base">
                        <p>আপনার প্রদত্ত ডাটা সম্পূর্ণ স্বচ্ছতার সাথে শুধুমাত্র সেবা প্রদানের জন্য ব্যবহার করা হয়:</p>
                        <ul className="space-y-2 text-sm">
                            {USAGE_RULES.map((rule, i) => (
                                <li key={i} className="flex items-start gap-2.5">
                                    <Sparkles className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                                    <span>{rule}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Clause 3 */}
                <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-gradient-brand text-white flex items-center justify-center font-bold text-sm shrink-0">০৩</span>
                        <h2 className="text-xl sm:text-2xl font-bold">কুকিজ (Cookies) ও ট্র্যাকিং নীতি</h2>
                    </div>
                    <div className="pl-11">
                        <div className="bg-muted/40 p-4 rounded-2xl border space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2 font-semibold text-foreground">
                                <Cookie className="w-4 h-4 text-primary" />
                                <span>কুকির ভূমিকা:</span>
                            </div>
                            <p className="text-xs sm:text-sm leading-relaxed">
                                ব্যবহারকারীর সেশন বজায় রাখতে এবং গেস্ট ট্রায়ালের (৩টি ফ্রি পোস্টার) সঠিক হিসাব রাখতে আমরা নিরাপদ কুকি ব্যবহার করি। ব্রাউজার থেকে কুকি বন্ধ করলে সাইটের কিছু সুবিধা সীমিত হতে পারে।
                            </p>
                        </div>
                    </div>
                </div>

                {/* Clause 4 */}
                <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-center font-bold text-sm shrink-0">০৪</span>
                        <h2 className="text-xl sm:text-2xl font-bold">থার্ড-পার্টি ও ক্লাউড স্টোরেজ</h2>
                    </div>
                    <div className="pl-11">
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                            আমরা ডাটা ও ইমেজ হোস্ট করার জন্য নিরাপদ ব্যাকএন্ড এনভায়রনমেন্ট ও এনক্রিপ্টেড ক্লাউড স্টোরেজ ব্যবহার করি। কোনো বাণিজ্যিকভাবে তৃতীয় পক্ষের কাছে ডাটা উন্মুক্ত করা হয় না।
                        </p>
                    </div>
                </div>

                {/* Clause 5 */}
                <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-gradient-brand text-white flex items-center justify-center font-bold text-sm shrink-0">০৫</span>
                        <h2 className="text-xl sm:text-2xl font-bold">নীতিমালার পরিমার্জন</h2>
                    </div>
                    <div className="pl-11">
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                            আমরা সময়ে সময়ে এই প্রাইভেসি নীতি হালনাগাদ করতে পারি। নতুন যেকোনো আপডেট এই পেজে প্রকাশ পাওয়ার সাথে সাথেই তা কার্যকরী হবে।
                        </p>
                    </div>
                </div>
            </Card>

            {/* CTA Section */}
            <Card className="relative bg-card border-primary/20 p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
                <div className="space-y-3 relative z-10">
                    <div className="w-12 h-12 mx-auto rounded-2xl bg-accent text-primary flex items-center justify-center border border-primary/20 shadow-inner">
                        <UserCheck className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-extrabold">
                        গোপনীয়তা নিয়ে <span className="text-gradient-brand">জিজ্ঞাসা আছে?</span>
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
                        আপনার ডাটা সুরক্ষা বা প্রাইভেসি নীতি বিষয়ক কোনো প্রশ্ন থাকলে আমাদের সাপোর্ট টিমের সাথে কথা বলুন।
                    </p>
                </div>
                <Separator className="my-4 max-w-xs mx-auto opacity-50" />
                <div className="relative z-10 pt-2">
                    <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold bg-gradient-brand text-white shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-200 text-sm">
                        <span>যোগাযোগ করুন</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </Card>
        </div>
    );
}