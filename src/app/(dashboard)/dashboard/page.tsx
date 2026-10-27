import { WalletStatCards } from "@/modules/dashboard/server/wallet-stat-cards";
import { DashboardHeader } from "@/modules/dashboard/client/dashboard-header";

export const metadata = {
    title: "ড্যাশবোর্ড - PosterAI",
    description: "ইউজার ড্যাশবোর্ড ও ওয়ালেট ওভারভিউ",
};

export default async function DashboardOverviewPage() {
    // damy data
    const mockWalletStats = {
        balance: 150.0,
        currency: "BDT",
        totalPosters: 12,
        bookmarkedTemplates: 5,
    };

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <DashboardHeader />

            {/* SSR Rendered Wallet & Stats Component */}
            <WalletStatCards stats={mockWalletStats} />
        </div>
    );
}