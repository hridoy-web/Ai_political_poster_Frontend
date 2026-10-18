import { use } from "react";
import { TransactionHistoryTable } from "./transaction-history-table";
import { TransactionHistory } from "../dashboard.types";

interface TransactionHistoryContentProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export function TransactionHistoryContent({
  searchParams,
}: TransactionHistoryContentProps) {

  const resolvedParams = use(searchParams);
  const currentPage = Number(resolvedParams.page) || 1;
  const searchTerm = resolvedParams.search || "";
  const itemsPerPage = 5;

  const allTransactions: TransactionHistory[] = [
    {
      id: "1",
      trxId: "TRX982347129",
      method: "bKash",
      amount: 100.0,
      date: "১২ অক্টোবর, ২০২৬",
      status: "Successful",
    },
    {
      id: "2",
      trxId: "TRX582348123",
      method: "Nagad",
      amount: 50.0,
      date: "০৫ অক্টোবর, ২০২৬",
      status: "Successful",
    },
    {
      id: "3",
      trxId: "TRX109238471",
      method: "bKash",
      amount: 200.0,
      date: "২৮ সেপ্টেম্বর, ২০২৬",
      status: "Successful",
    },
    {
      id: "4",
      trxId: "TRX482019382",
      method: "Nagad",
      amount: 150.0,
      date: "১৫ সেপ্টেম্বর, ২০২৬",
      status: "Failed",
    },
    {
      id: "5",
      trxId: "TRX781203948",
      method: "bKash",
      amount: 50.0,
      date: "০১ সেপ্টেম্বর, ২০২৬",
      status: "Successful",
    },
    {
      id: "6",
      trxId: "TRX982347129",
      method: "bKash",
      amount: 100.0,
      date: "১২ অক্টোবর, ২০২৬",
      status: "Successful",
    },
    {
      id: "7",
      trxId: "TRX582348123",
      method: "Nagad",
      amount: 50.0,
      date: "০৫ অক্টোবর, ২০২৬",
      status: "Successful",
    }
  ];

  // Server-side Filtering Logic
  const filtered = allTransactions.filter(
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
    <TransactionHistoryTable
      transactions={paginatedData}
      totalCount={totalCount}
      currentPage={currentPage}
      totalPages={totalPages}
      searchTerm={searchTerm}
    />
  );
}