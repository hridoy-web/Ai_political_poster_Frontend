import React, { Suspense } from "react";
import { AdminTransaction } from "../admin.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpDown,
  Wallet,
  CheckCircle2,
  XCircle,
  Clock,
  User,
} from "lucide-react";
import {
  TransactionSearch,
  TransactionCopyBtn,
  TransactionPagination,
} from "@/modules/dashboard/client/transaction-table-controls";

interface AdminTransactionTableProps {
  transactions: AdminTransaction[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  searchTerm: string;
}

export function AdminTransactionTable({
  transactions,
  totalCount,
  currentPage,
  totalPages,
  searchTerm,
}: AdminTransactionTableProps) {
  const renderMethodBadge = (method: string) => {
    const isBkash = method.toLowerCase().includes("bkash");
    const isNagad = method.toLowerCase().includes("nagad");

    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-muted/80 border border-border/80">
        <Wallet
          className={`w-3.5 h-3.5 ${
            isBkash
              ? "text-pink-500"
              : isNagad
              ? "text-orange-500"
              : "text-brand-primary"
          }`}
        />
        <span>{method}</span>
      </div>
    );
  };

  const renderStatusBadge = (status: string) => {
    if (status === "Successful") {
      return (
        <Badge className="bg-brand-green/10 text-brand-mint hover:bg-brand-green/20 border-brand-green/20 font-semibold px-3 py-1 rounded-full gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>সফল</span>
        </Badge>
      );
    }
    if (status === "Failed") {
      return (
        <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20 font-semibold px-3 py-1 rounded-full gap-1.5">
          <XCircle className="w-3.5 h-3.5" />
          <span>ব্যর্থ</span>
        </Badge>
      );
    }
    return (
      <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20 font-semibold px-3 py-1 rounded-full gap-1.5">
        <Clock className="w-3.5 h-3.5" />
        <span>পেন্ডিং</span>
      </Badge>
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

      {/* Main Table Structure */}
      <div className="border border-border/80 rounded-3xl bg-card/80 backdrop-blur-xl overflow-hidden shadow-md">
        <Table>
          <TableHeader className="bg-muted/50 border-b border-border/60">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4 px-6">
                <div className="flex items-center gap-1.5 select-none">
                  <span>ট্রানজেকশন আইডি</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4 px-6">
                ব্যবহারকারী
              </TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4 px-6">
                পেমেন্ট মাধ্যম
              </TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4 px-6">
                পরিমাণ
              </TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4 px-6">
                তারিখ ও সময়
              </TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground text-right py-4 px-6">
                স্ট্যাটাস
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
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                        {trx.userName || "ব্যবহারকারী"}
                      </p>
                      {trx.userEmail && (
                        <p className="text-[11px] text-muted-foreground pl-5 truncate max-w-[160px]">
                          {trx.userEmail}
                        </p>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="py-4 px-6">
                    {renderMethodBadge(trx.method)}
                  </TableCell>

                  <TableCell className="py-4 px-6 font-bold text-foreground text-sm">
                    ৳ {Number(trx.amount || 0).toFixed(2)}
                  </TableCell>

                  <TableCell className="py-4 px-6 text-xs text-muted-foreground font-medium">
                    {trx.date}
                  </TableCell>

                  <TableCell className="py-4 px-6 text-right">
                    {renderStatusBadge(trx.status)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground text-sm"
                >
                  কোনো ট্রানজেকশন রেকর্ড পাওয়া যায়নি।
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Bottom Bar */}
      <div className="flex items-center justify-between px-2 pt-1">
        <p className="text-xs text-muted-foreground font-medium">
          পেজ <span className="text-foreground font-bold">{currentPage}</span> /{" "}
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
