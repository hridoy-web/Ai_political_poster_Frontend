import { WalletStatCards } from "@/modules/dashboard/server/wallet-stat-cards";

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
            <div className="space-y-1 pt-6 lg:pt-0">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    স্বাগতম, <span className="text-gradient-brand">হৃদয় চৌধুরী</span> 👋
                </h1>
                <p className="text-sm text-muted-foreground">
                    আপনার অ্যাকাউন্ট ওয়ালেট ব্যালেন্স ও পোস্টার তৈরির সামারি একনজরে দেখে নিন।
                </p>
            </div>

            {/* SSR Rendered Wallet & Stats Component */}
            <WalletStatCards stats={mockWalletStats} />
        </div>
    );
}