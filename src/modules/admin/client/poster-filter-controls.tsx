"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export function PosterSearchInput({ initialSearch }: { initialSearch: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
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
        placeholder="পোস্টার, ইউজার বা ক্যাটাগরি খুঁজুন..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10 h-10 bg-card/80 border-border/80 rounded-2xl focus:border-brand-primary/80 text-sm shadow-xs"
      />
    </div>
  );
}

export function PosterPagination({
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

  const validTotalPages = Math.max(totalPages, 1);

  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="outline"
        size="icon"
        onClick={() => goToPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage <= 1}
        className="w-9 h-9 rounded-full border-border/80 hover:bg-accent shadow-2xs"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {Array.from({ length: validTotalPages }, (_, index) => {
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
        onClick={() => goToPage(Math.min(currentPage + 1, validTotalPages))}
        disabled={currentPage >= validTotalPages}
        className="w-9 h-9 rounded-full border-border/80 hover:bg-accent shadow-2xs"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}