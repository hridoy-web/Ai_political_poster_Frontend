import Link from "next/link";
import {
    Scale,
    ShieldAlert,
    CheckCircle2,
    UserX,
    AlertOctagon,
    FileText,
    ArrowRight,
    Lock,
    Sparkles,
} from "lucide-react";

export const metadata = {
    title: "সেবার শর্তাবলী | AI Political Poster Maker",
    description: "আমাদের প্ল্যাটফর্ম ব্যবহারের শর্তাবলী, কন্টেন্ট নীতিমালা এবং আইনগত বিষয়াবলী জানুন।",
};

const cards = [
    {
        icon: CheckCircle2,
        title: "সঠিক তথ্যের ব্যবহার",
        desc: "পোস্টারে নির্ভরযোগ্য নাম, পদবি এবং অনুমোদিত রাজনৈতিক বার্তা ব্যবহার করতে হবে।",
        color: "text-secondary",
        bg: "bg-secondary/10",
    },
    {
        icon: ShieldAlert,
        title: "কপিরাইট ও স্বত্বাধিকার",
        desc: "অনুমতিহীন ছবি, ট্রেডমার্ক বা লোগো ব্যবহার করা কঠোরভাবে নিষিদ্ধ।",
        color: "text-primary",
        bg: "bg-primary/10",
    },
    {
        icon: UserX,
        title: "অপব্যবহার প্রতিরোধ",
        desc: "উসকানিমূলক বা বিভ্রান্তিকর কন্টেন্ট তৈরিতে একাউন্ট চিরতরে ব্লক করা হবে।",
        color: "text-primary",
        bg: "bg-accent",
    },
]

const rules = [
    "কারো মুখমণ্ডল বিকৃতি বা বিভ্রান্তিকর ভুয়া প্রচারণা চালানো যাবে না।",
    "দলীয় অনুমোদনহীন বা বিতর্কিত প্রতীক ও লোগোর অনৈতিক ব্যবহার নিষিদ্ধ।",
    "সাম্প্রদায়িক বা জাতীয় নিরাপত্তা বিঘ্নিত করে এমন কোনো উসকানিমূলক বার্তা যোগ করা যাবে না।",
]

export default function TermsPage() {

    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-20 relative overflow-hidden">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-125 h-125 bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="absolute top-[40%] right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <section className="text-center space-y-6 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/80 border border-primary/20 text-accent-foreground text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm">
                    <Scale className="w-4 h-4 text-primary animate-pulse" />
                    <span>আইনগত নির্দেশিকা ও নিয়মাবলী</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
                    সেবার <span className="text-gradient-brand">শর্তাবলী</span>
                </h1>

                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                    আমাদের প্ল্যাটফর্ম ব্যবহার করার পূর্বে অনুগ্রহ করে নিয়মাবলী পড়ুন। সার্ভিস ব্যবহারের মাধ্যমে আপনি এই শর্তসমূহে সম্মতি জ্ঞাপন করছেন।
                </p>

            </section>

            <section className="grid sm:grid-cols-3 gap-6">
                {cards.map((item, idx) => {
                    const IconComp = item.icon;
                    return (
                        <div
                            key={idx}
                            className="group bg-card/60 backdrop-blur-md border border-border/80 p-8 rounded-3xl space-y-4 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl relative overflow-hidden"
                        >
                            <div
                                className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center font-bold transition-transform duration-300 group-hover:scale-110`}
                            >
                                <IconComp className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-xl">{item.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    );
                })}
            </section>

            <section className="bg-card/70 border border-border/80 p-6 sm:p-12 rounded-3xl shadow-2xl space-y-12 backdrop-blur-xl relative">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <FileText className="w-64 h-64 text-foreground" />
                </div>

                {/* Clause 1 */}
                <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-gradient-brand text-white flex items-center justify-center font-bold text-sm shrink-0">
                            ০১
                        </span>
                        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                            অ্যাকাউন্ট ও ব্যবহারের ফ্রি লিমিট
                        </h2>
                    </div>
                    <div className="pl-11 space-y-3">
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                            নতুন ব্যবহারকারী বা অতিথিদের জন্য প্ল্যাটফর্মে সর্বোচ্চ ৩টি পোস্টার সম্পূর্ণ বিনামূল্যে জেনারেট ও ডাউনলোড করার সুযোগ রয়েছে।
                        </p>
                        <div className="bg-muted/40 p-4 rounded-2xl border space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2 font-medium text-foreground">
                                <Sparkles className="w-4 h-4 text-primary" />
                                মনে রাখা জরুরি:
                            </div>
                            <ul className="list-disc list-inside space-y-1 pl-2">
                                <li>ফ্রি লিমিট অবৈধ উপায়ে বাইপাস করার চেষ্টা সিস্টেম সিকিউরিটি দ্বারা প্রতিরোধ করা হবে।</li>
                                <li>অ্যাডমিন প্যানেল কোনো কারণ দর্শানো ছাড়াই নিয়ম লঙ্ঘনকারী একাউন্ট স্থগিত (Block) করার ক্ষমতা রাখে।</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Clause 2 */}
                <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-gradient-green text-white flex items-center justify-center font-bold text-sm shrink-0">
                            ০২
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                            কন্টেন্ট নীতি ও বাধ্যবাধকতা
                        </h2>
                    </div>
                    <div className="pl-11 space-y-3">
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                            আমাদের প্ল্যাটফর্ম ব্যবহার করে যেকোনো প্রকার পোস্টার বানানোর ক্ষেত্রে নিম্নে উল্লেখিত নীতিমালা মেনে চলা আবশ্যক:
                        </p>
                        <ul className="space-y-2.5 text-sm">
                            {rules.map((rule, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-muted-foreground">
                                    <AlertOctagon className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                                    <span>{rule}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Clause 3 */}
                <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-gradient-brand text-white flex items-center justify-center font-bold text-sm shrink-0">
                            ০৩
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                            ছবি ও মিডিয়ার স্বত্বাধিকার
                        </h2>
                    </div>
                    <div className="pl-11 space-y-2">
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                            ব্যবহারকারীর আপলোডকৃত সকল ছবির কপিরাইট ও সত্ত্ব ব্যবহারকারীর নিজের। অনুমতিহীন ব্যক্তির ছবি ব্যবহারজনিত যেকোনো আইনি জটিলতার দায়ভার ব্যবহারকারীকেই বহন করতে হবে; এতে প্ল্যাটফর্ম কর্তৃপক্ষ কোনোভাবে দায়ী থাকবে না।
                        </p>
                    </div>
                </div>

                {/* Clause 4 */}
                <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-gradient-green text-white flex items-center justify-center font-bold text-sm shrink-0">
                            ০৪
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                            সার্ভিস ও শর্তাবলী পরিবর্তন
                        </h2>
                    </div>
                    <div className="pl-11 space-y-2">
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                            কর্তৃপক্ষ যেকোনো সময়ে কোনো পূর্বানুমতি ছাড়াই ফিচারসমূহ, টেমপ্লেট অথবা পলিসিতে পরিবর্তন আনার অধিকার সংরক্ষণ করে।
                        </p>
                    </div>
                </div>
            </section>

            <section className="relative bg-card border border-primary/20 p-8 sm:p-12 rounded-3xl text-center space-y-6 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

                <div className="space-y-3 relative z-10">
                    <div className="w-12 h-12 mx-auto rounded-2xl bg-accent text-primary flex items-center justify-center border border-primary/20 shadow-inner">
                        <Lock className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-extrabold">
                        কোনো শর্ত নিয়ে <span className="text-gradient-brand">প্রশ্ন আছে?</span>
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
                        আমাদের সেবার শর্তাবলী বা লিগ্যাল বিষয়ে সহায়তার জন্য সাপোর্ট টিমের সাথে কথা বলুন।
                    </p>
                </div>

                <div className="relative z-10 pt-2">
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold bg-gradient-brand text-white shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-200 text-sm"
                    >
                        <span>যোগাযোগ করুন</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
}