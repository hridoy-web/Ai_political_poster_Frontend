"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { TransactionHistoryTable } from "./transaction-history-table";
import { TransactionHistory } from "../dashboard.types";
import { DashboardService } from "../dashboard.service";
import { Loader2 } from "lucide-react";

interface TransactionHistoryContentProps {
  searchParams?: Promise<{
    page?: string;
    search?: string;
  }>;
}

export function TransactionHistoryContent({}: TransactionHistoryContentProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get("page")) || 1;
  const searchTerm = searchParams?.get("search") || "";
  const itemsPerPage = 5;

  const [transactions, setTransactions] = useState<TransactionHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    DashboardService.getMyTransactions(1, 100)
      .then((data) => {
        if (isMounted) {
          setTransactions(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load user transactions:", err);
        if (isMounted) {
          setTransactions([]);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Real data filtering logic
  const filtered = transactions.filter(
    (item) =>
      item.trxId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 space-y-3 rounded-3xl border border-border/80 bg-card/80">
        <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
        <p className="text-sm text-muted-foreground font-medium">
          ট্রানজেকশন তথ্য লোড হচ্ছে...
        </p>
      </div>
    );
  }

  return (
    <TransactionHistoryTable
      transactions={paginatedData}
      totalCount={totalCount}
      currentPage={currentPage}
      totalPages={totalPages}
      searchTerm={searchTerm}
    />
  );
}