import HeroSection from "@/modules/home/server/hero-section";
import TrendingTemplates from "@/modules/home/server/trending-templates";
import AiPowerShowcase from "@/modules/home/server/ai-power-showcase";
import { UserFeedbackSection } from "@/modules/home/server/user-feedback";
import HowToUse from "@/modules/home/server/how-to-use";
import Statistics from "@/modules/home/server/statistics";

const HomePage = () => {
    return (
        <>
            {/* Lets Build Something Amazing Together */}
            <HeroSection />
            <AiPowerShowcase />
            <TrendingTemplates />
            {/* <AiPowerShowcase /> */}
            <UserFeedbackSection />
            <HowToUse />
            <Statistics />
        </>
    );
};

export default HomePage;