import Link from "next/link";
import { Home, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "পেজটি পাওয়া যায়নি | AI Political Poster Maker",
    description: "আপনি যে পেজটি খুঁজছেন তা পাওয়া যায়নি বা সরিয়ে ফেলা হয়েছে।",
};

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-12 max-w-2xl mx-auto space-y-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

            <h1 className="text-8xl sm:text-9xl font-black tracking-tight text-gradient-brand select-none leading-none">
                404
            </h1>

            <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                    পেজটি পাওয়া যায়নি
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                    আপনি যে পেজটিতে ঢোকার চেষ্টা করছেন তা মুছে ফেলা হয়েছে অথবা ইউআরএল ঠিকানাটি ভুল।
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 w-full sm:w-auto">
                <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-auto rounded-xl font-bold bg-gradient-brand text-white shadow-md hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm"
                >
                    <Link href="/">
                        <Home className="w-4 h-4 mr-2" />
                        <span>হোমপেজে ফিরে যান</span>
                    </Link>
                </Button>

                <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto rounded-xl font-bold bg-background/50 border-border/80 hover:bg-accent text-foreground shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm"
                >
                    <Link href="/templates">
                        <Compass className="w-4 h-4 mr-2 text-secondary" />
                        <span>টেমপ্লেটগুলো দেখুন</span>
                    </Link>
                </Button>
            </div>

            <p className="pt-6 text-xs text-muted-foreground">
                সাহায্য প্রয়োজন?{" "}
                <Link
                    href="/contact"
                    className="text-primary hover:underline font-semibold"
                >
                    আমাদের সাথে যোগাযোগ করুন
                </Link>
            </p>
        </div>
    );
}