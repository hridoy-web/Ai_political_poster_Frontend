import ContactForm from "@/modules/contact/client/contact-form";
import ContactPledge from "@/modules/contact/client/ContactPledge";
import { MessageSquare } from "lucide-react";


export default function ContactPage() {
    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16 relative overflow-hidden">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-125 h-125 bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <section className="text-center space-y-4 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/80 border border-primary/20 text-accent-foreground text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm">
                    <MessageSquare className="w-4 h-4 text-primary animate-pulse" />
                    <span>২৪/৭ সাপোর্ট ও সহায়তা</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
                    যোগাযোগ <span className="text-gradient-brand">করুন</span>
                </h1>

                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                    আপনার যেকোনো সমস্যা, ফিচারের জন্য পরামর্শ বা সাধারণ প্রশ্নের জন্য আমাদের সাথে যোগাযোগ করুন। আমাদের টিম দ্রুত আপনার উত্তর প্রদান করবে।
                </p>
            </section>
            <section className="grid lg:grid-cols-12 gap-8 items-start">
                {/* Left Column*/}
                <div className="lg:col-span-5">
                    <ContactPledge />
                </div>

                {/* Right Column*/}
                <div className="lg:col-span-7 bg-card/80 backdrop-blur-xl border border-border/80 p-6 sm:p-10 rounded-3xl shadow-2xl">
                    <ContactForm />
                </div>
            </section>
        </div>
    );
}