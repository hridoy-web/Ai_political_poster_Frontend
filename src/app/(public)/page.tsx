import { FaqSection } from "@/modules/home/server/faq-section";
import HowToUse from "@/modules/home/server/how-to-use";
import Statistics from "@/modules/home/server/statistics";
import TrendingTemplates from "@/modules/home/server/trending-templates";
import { UserFeedbackSection } from "@/modules/home/server/user-feedback";


export default function Home() {
  return (
    <section className="container mx-auto ">
      <div className="px-4">
        <TrendingTemplates />
        <HowToUse />
        <Statistics />
        <UserFeedbackSection />
        <FaqSection />
     </div>
    </section>
  )
}