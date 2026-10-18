"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight, Copy, Check } from "lucide-react";

interface TransactionSearchProps {
  initialSearch: string;
}

export function TransactionSearch({ initialSearch }: TransactionSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [term, setTerm] = useState(initialSearch);

  const handleSearch = (value: string) => {
    setTerm(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="relative w-full sm:w-80">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        placeholder="Search transaction ID or method..."
        value={term}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10 h-10 bg-card/80 border-border/80 rounded-2xl focus:border-brand-primary/80 text-sm shadow-xs"
      />
    </div>
  );
}

export function TransactionCopyBtn({ trxId }: { trxId: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(trxId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors opacity-0 group-hover:opacity-100"
      title="Copy"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-brand-mint" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
    </button>
  );
}

export function TransactionPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="outline"
        size="icon"
        onClick={() => goToPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="w-9 h-9 rounded-full border-border/80 hover:bg-accent shadow-2xs"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {Array.from({ length: totalPages }, (_, index) => {
        const pageNum = index + 1;
        const isActive = pageNum === currentPage;
        return (
          <Button
            key={pageNum}
            size="icon"
            variant={isActive ? "default" : "outline"}
            onClick={() => goToPage(pageNum)}
            className={`w-9 h-9 rounded-full text-xs font-bold transition-all ${
              isActive
                ? "bg-gradient-brand text-white shadow-md shadow-brand-primary/20 border-none"
                : "border-border/80 hover:bg-accent text-foreground"
            }`}
          >
            {pageNum}
          </Button>
        );
      })}

      <Button
        variant="outline"
        size="icon"
        onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages || totalPages === 0}
        className="w-9 h-9 rounded-full border-border/80 hover:bg-accent shadow-2xs"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}