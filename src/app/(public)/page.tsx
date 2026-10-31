import { Suspense } from "react";
import { FaqSection } from "@/modules/home/server/faq-section";
import HeroSection from "@/modules/home/server/hero-section";
import HowToUse from "@/modules/home/server/how-to-use";
import Statistics from "@/modules/home/server/statistics";
import TrendingTemplates from "@/modules/home/server/trending-templates";
import { UserFeedbackSection } from "@/modules/home/server/user-feedback";

export default function Home() {
  return (
    <section>
      <div>
        <HeroSection />
        <Suspense fallback={<div className="min-h-72 flex items-center justify-center text-sm text-muted-foreground">টেমপ্লেট লোড হচ্ছে...</div>}>
          <TrendingTemplates />
        </Suspense>
        <HowToUse />
        <Statistics />
        <UserFeedbackSection />
        <FaqSection />
      </div>
    </section>
  );
}
