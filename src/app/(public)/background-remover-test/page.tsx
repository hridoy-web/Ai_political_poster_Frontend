import type { Metadata } from "next";
import { Sparkles, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { RemoverTestClient } from "./_components/remover-test-client";

export const metadata: Metadata = {
  title: "নেতার ছবির ব্যাকগ্রাউন্ড রিমুভার ডেমো | Rise Together",
  description:
    "কোনো পেইড API ছাড়া সম্পূর্ণ ব্রাউজারে ক্লায়েন্ট-সাইড WebAssembly এবং স্মার্ট ক্যানভাস ফলব্যাক দিয়ে নেতার ছবির ব্যাকগ্রাউন্ড মুছে স্বচ্ছ PNG তৈরি করার লাইভ ডেমো ল্যাব।",
};

/**
 * Server Component Shell for Background Remover Test Route
 * Render Isolation Architecture:
 * - Server renders Hero Header, SEO metadata, and Static Code Docs ahead of time.
 * - Interactive client components are isolated inside _components/remover-test-client.tsx.
 * - Client state mutations never re-render the server shell or static documentation.
 */
export default function BackgroundRemoverTestPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative Dual Brand Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 w-96 sm:w-[500px] h-80 sm:h-[350px] bg-primary/10 rounded-full blur-3xl -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/4 w-96 sm:w-[500px] h-80 sm:h-[350px] bg-secondary/10 rounded-full blur-3xl -z-10"
      />

      <div className="max-w-6xl mx-auto space-y-10">
        {/* Pre-rendered Server Hero Header */}
        <header className="text-center space-y-3 max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="px-4 py-1.5 rounded-full bg-accent border-border text-accent-foreground text-xs font-bold tracking-wider uppercase inline-flex items-center gap-2"
          >
            <Sparkles className="size-3.5 text-primary" />
            <span>ইন-ব্রাউজার এআই টেস্ট ল্যাব ($০ এপিআই খরচ)</span>
          </Badge>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            নেতার ছবির <span className="text-gradient-brand">ব্যাকগ্রাউন্ড রিমুভার</span> ডেমো
          </h1>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            কোনো পেইড API ছাড়া সম্পূর্ণ ক্লায়েন্ট-সাইডে WebAssembly এবং স্মার্ট ক্যানভাস ফলব্যাক দিয়ে
            নেতার ছবির ব্যাকগ্রাউন্ড স্বয়ংক্রিয়ভাবে মুছে স্বচ্ছ PNG তৈরি করার লাইভ ডেমো।
          </p>
        </header>

        {/* Isolated Client Boundary */}
        <RemoverTestClient />

        {/* ================= DEVELOPER GUIDE: HOW TO USE IN 3 LINES ================= */}
        <Card className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border pb-3">
            <div className="size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Code2 className="size-4" />
            </div>
            <div>
              <h2 className="font-bold text-base text-foreground">টিমের অন্য মেম্বারদের (যেমন Kaowser) জন্য ইন্টিগ্রেশন গাইড</h2>
              <p className="text-xs text-muted-foreground">পোস্টার ক্যানভাস বা যেকোনো পেজে মাত্র ৩ লাইনে এই মডিউলটি ব্যবহার করার উপায়</p>
            </div>
          </div>

          <div className="rounded-2xl bg-muted/60 p-4 font-mono text-xs overflow-x-auto border border-border space-y-2 leading-relaxed">
            <p className="text-muted-foreground">// ১. আমাদের তৈরি করা মডিউল থেকে হুকটি ইমপোর্ট করুন:</p>
            <p className="text-primary font-bold">
              {`import { useBackgroundRemoval } from "@/modules/background-removal";`}
            </p>
            <br />
            <p className="text-muted-foreground">// ২. আপনার কম্পোনেন্টের ভেতরে হুকটি কল করুন:</p>
            <p className="text-foreground">
              {`const { removeBg, isProcessing, progressPercent } = useBackgroundRemoval();`}
            </p>
            <br />
            <p className="text-muted-foreground">// ৩. যেকোনো ইমেজ ফাইল দিয়ে কল করলেই সাথে সাথে স্বচ্ছ PNG পাওয়া যাবে:</p>
            <p className="text-foreground">
              {`const transparentUrl = await removeBg(imageFile);`}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
