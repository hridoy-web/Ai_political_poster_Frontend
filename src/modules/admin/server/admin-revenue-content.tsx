import { use } from "react";
import { TransactionHistoryTable } from "@/modules/dashboard/server/transaction-history-table";
import { TransactionHistory } from "@/modules/dashboard/dashboard.types";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, CalendarDays, TrendingUp, DollarSign } from "lucide-react";

interface AdminRevenueContentProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
    }>;
}

export function AdminRevenueContent({ searchParams }: AdminRevenueContentProps) {
    const resolvedParams = use(searchParams);
    const currentPage = Number(resolvedParams.page) || 1;
    const searchTerm = resolvedParams.search || "";
    const itemsPerPage = 5;

    const allSystemLedger: TransactionHistory[] = [
        {
            id: "1",
            trxId: "TRX982347129",
            method: "bKash" as TransactionHistory["method"],
            amount: 500.0,
            date: "১৮ অক্টোবর, ২০২৬",
            status: "Successful",
        },
        {
            id: "2",
            trxId: "TRX582348123",
            method: "Nagad" as TransactionHistory["method"],
            amount: 200.0,
            date: "১৮ অক্টোবর, ২০২৬",
            status: "Successful",
        },
        {
            id: "3",
            trxId: "TRX109238471",
            method: "bKash" as TransactionHistory["method"],
            amount: 300.0,
            date: "১০ অক্টোবর, ২০২৬",
            status: "Successful",
        },
        {
            id: "4",
            trxId: "TRX882910382",
            method: "bKash" as TransactionHistory["method"],
            amount: 150.0,
            date: "২৫ সেপ্টেম্বর, ২০২৬",
            status: "Successful",
        },
    ];

    // Successful Transactions
    const successfulTransactions = allSystemLedger.filter(
        (item) => item.status === "Successful"
    );

    // Today's Income 
    const todayDateStr = "১৮ অক্টোবর, ২০২৬";
    const todayIncome = successfulTransactions
        .filter((item) => item.date === todayDateStr)
        .reduce((acc, curr) => acc + curr.amount, 0);

    //(This Month's Income
    const monthlyIncome = successfulTransactions
        .filter((item) => item.date.includes("অক্টোবর, ২০২৬"))
        .reduce((acc, curr) => acc + curr.amount, 0);

    // (Lifetime Total Income)
    const totalLifetimeRevenue = successfulTransactions.reduce(
        (acc, curr) => acc + curr.amount,
        0
    );

    // Server-side Filtering Logic
    const filtered = allSystemLedger.filter(
        (item) =>
            item.trxId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.date.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="space-y-6">
            {/* Timeframe Revenue Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Card 1: Today's Income */}
                <Card className="border border-brand-primary/30 bg-card/80 backdrop-blur-xl rounded-3xl p-5 shadow-xs relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/10 rounded-full blur-2xl pointer-events-none" />
                    <CardContent className="p-0 space-y-3 relative z-10">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-muted-foreground">
                                আজকের আয় (Today)
                            </span>
                            <div className="p-2.5 rounded-2xl bg-brand-primary/10 text-brand-primary">
                                <CalendarDays className="w-5 h-5" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-foreground">
                                ৳ {todayIncome.toFixed(2)}
                            </h3>
                            <p className="text-[11px] text-brand-mint font-semibold mt-1 flex items-center gap-1">
                                <TrendingUp className="w-3.5 h-3.5" /> আজ সংগৃহীত ওয়ালেট টপ-আপ
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Card 2: Current Month Income */}
                <Card className="border border-border/80 bg-card/80 backdrop-blur-xl rounded-3xl p-5 shadow-xs">
                    <CardContent className="p-0 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-muted-foreground">
                                চলতি মাসের আয় (October)
                            </span>
                            <div className="p-2.5 rounded-2xl bg-brand-mint/10 text-brand-mint">
                                <DollarSign className="w-5 h-5" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-foreground">
                                ৳ {monthlyIncome.toFixed(2)}
                            </h3>
                            <p className="text-[11px] text-muted-foreground font-medium mt-1">
                                এই মাসের মোট জমা
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Card 3: Lifetime Total Income */}
                <Card className="border border-border/80 bg-card/80 backdrop-blur-xl rounded-3xl p-5 shadow-xs">
                    <CardContent className="p-0 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-muted-foreground">
                                সর্বমোট আয় (Lifetime)
                            </span>
                            <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-500">
                                <Wallet className="w-5 h-5" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-foreground">
                                ৳ {totalLifetimeRevenue.toFixed(2)}
                            </h3>
                            <p className="text-[11px] text-muted-foreground font-medium mt-1">
                                প্ল্যাটফর্মের শুরু থেকে
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Transaction Ledger Table */}
            <TransactionHistoryTable
                transactions={paginatedData}
                totalCount={totalCount}
                currentPage={currentPage}
                totalPages={totalPages}
                searchTerm={searchTerm}
            />
        </div>
    );
}