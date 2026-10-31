import { TransactionHistory } from "../dashboard.types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Wallet, CheckCircle2, XCircle, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import {
    TransactionSearch,
    TransactionCopyBtn,
    TransactionPagination,
} from "../client/transaction-table-controls";
import { Suspense } from "react";

interface TransactionHistoryTableProps {
    transactions: TransactionHistory[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
    searchTerm: string;
}

export function TransactionHistoryTable({
    transactions,
    totalCount,
    currentPage,
    totalPages,
    searchTerm,
}: TransactionHistoryTableProps) {
    const renderMethodBadge = (method: string) => {
        const isBkash = method.toLowerCase().includes("bkash");
        const isNagad = method.toLowerCase().includes("nagad");
        const isWallet = method.toLowerCase() === "wallet";

        return (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-muted/80 border border-border/80">
                <Wallet
                    className={`w-3.5 h-3.5 ${
                        isBkash
                            ? "text-pink-500"
                            : isNagad
                            ? "text-orange-500"
                            : isWallet
                            ? "text-purple-500"
                            : "text-brand-primary"
                    }`}
                />
                <span>{method}</span>
            </div>
        );
    };

    /** Renders the amount cell with sign (+/-) and color coding */
    const renderAmountCell = (trx: TransactionHistory) => {
        const isDebit = trx.signedAmount < 0 || trx.type === "PACKAGE_PURCHASE";
        const displayAmt = Math.abs(trx.amount).toFixed(2);

        return (
            <div className={`flex items-center gap-1.5 font-bold text-sm ${isDebit ? "text-destructive" : "text-emerald-600 dark:text-emerald-400"}`}>
                {isDebit ? (
                    <ArrowUpRight className="w-4 h-4 shrink-0 rotate-180" />
                ) : (
                    <ArrowDownLeft className="w-4 h-4 shrink-0 rotate-180" />
                )}
                <span>
                    {isDebit ? "-" : "+"}৳ {displayAmt}
                </span>
                {trx.packageName && (
                    <span className="text-xs text-muted-foreground font-medium ml-1">
                        ({trx.packageName})
                    </span>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-5">
            {/* Top Controls section */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <Suspense fallback={<div className="w-80 h-10 bg-card/60 rounded-2xl animate-pulse" />}>
                    <TransactionSearch initialSearch={searchTerm} />
                </Suspense>

                <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="text-xs text-muted-foreground font-semibold px-3.5 py-1.5 rounded-full bg-card border border-border/60 shadow-2xs">
                        মোট ট্রানজেকশন: <strong className="text-foreground">{totalCount}</strong> টি
                    </span>
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground px-1">
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                    <span>+ সবুজ = রিচার্জ / ডিপোজিট</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-destructive inline-block" />
                    <span>- লাল = প্যাকেজ কেনা / ডেবিট</span>
                </div>
            </div>

            {/* Main Table */}
            <div className="border border-border/80 rounded-3xl bg-card/80 backdrop-blur-xl overflow-hidden shadow-md">
                <Table>
                    <TableHeader className="bg-muted/50 border-b border-border/60">
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4 px-6">
                                <div className="flex items-center gap-1.5 select-none">
                                    <span>Transaction ID</span>
                                    <ArrowUpDown className="w-3 h-3" />
                                </div>
                            </TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4 px-6">
                                Payment Method
                            </TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4 px-6">
                                Amount
                            </TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4 px-6">
                                Date
                            </TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground text-right py-4 px-6">
                                Status
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {transactions.length > 0 ? (
                            transactions.map((trx) => (
                                <TableRow
                                    key={trx.id}
                                    className="border-b border-border/40 hover:bg-accent/40 transition-all duration-200 group"
                                >
                                    <TableCell className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-xs font-bold text-brand-primary">
                                                {trx.trxId}
                                            </span>
                                            <TransactionCopyBtn trxId={trx.trxId} />
                                        </div>
                                    </TableCell>

                                    <TableCell className="py-4 px-6">
                                        {renderMethodBadge(trx.method)}
                                    </TableCell>

                                    <TableCell className="py-4 px-6">
                                        {renderAmountCell(trx)}
                                    </TableCell>

                                    <TableCell className="py-4 px-6 text-xs text-muted-foreground font-medium">
                                        {trx.date}
                                    </TableCell>

                                    <TableCell className="py-4 px-6 text-right">
                                        {trx.status === "Successful" ? (
                                            <Badge className="bg-brand-green/10 text-brand-mint hover:bg-brand-green/20 border-brand-green/20 font-semibold px-3 py-1 rounded-full gap-1.5">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                <span>Success</span>
                                            </Badge>
                                        ) : trx.status === "Pending" ? (
                                            <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 font-semibold px-3 py-1 rounded-full">
                                                <span>Pending</span>
                                            </Badge>
                                        ) : (
                                            <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20 font-semibold px-3 py-1 rounded-full gap-1.5">
                                                <XCircle className="w-3.5 h-3.5" />
                                                <span>Failed</span>
                                            </Badge>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="h-32 text-center text-muted-foreground text-sm"
                                >
                                    কোনো ট্রানজেকশন রেকর্ড পাওয়া যায়নি।
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Bottom Bar */}
            <div className="flex items-center justify-between px-2 pt-1">
                <p className="text-xs text-muted-foreground font-medium">
                    Page <span className="text-foreground font-bold">{currentPage}</span> of{" "}
                    <span className="text-foreground font-bold">{totalPages || 1}</span>
                </p>
                <TransactionPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </div>
        </div>
    );
}
