import { use } from "react";
import { AdminPostersGrid } from "./admin-posters-grid";
import { PosterSearchInput, PosterPagination } from "../client/poster-filter-controls";
import { AdminPoster } from "../admin.types";

interface AdminPostersContentProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export function AdminPostersContent({ searchParams }: AdminPostersContentProps) {
  const resolvedParams = use(searchParams);
  const currentPage = Number(resolvedParams.page) || 1;
  const searchTerm = resolvedParams.search || "";
  const itemsPerPage = 8;

  const mockPosters: AdminPoster[] = [
    {
      id: "1",
      title: "নির্বাচনী ব্যানার ২০২৬",
      userName: "হৃদয় চৌধুরী",
      userEmail: "hridoy@example.com",
      imageUrl: "https://via.placeholder.com/600x800",
      createdAt: "১৫ অক্টোবর, ২০২৬",
      category: "রাজনৈতিক",
    },
    {
      id: "2",
      title: "চেয়ারম্যান প্রার্থীর পোস্টার",
      userName: "অনিল কুমার",
      userEmail: "anil@example.com",
      imageUrl: "https://via.placeholder.com/600x800",
      createdAt: "১২ অক্টোবর, ২০২৬",
      category: "ইউনিয়ন পরিষদ",
    },
  ];

  // Server-side Filtering Logic
  const filtered = mockPosters.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-5">
      {/* Search Bar & Total Stats Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <PosterSearchInput initialSearch={searchTerm} />
        <span className="text-xs text-muted-foreground font-semibold px-3.5 py-1.5 rounded-full bg-card border border-border/60 shadow-2xs self-end sm:self-center">
          মোট পোস্টার: <strong className="text-foreground">{totalCount}</strong> টি
        </span>
      </div>

      {/* Optimized Posters Grid */}
      <AdminPostersGrid posters={paginatedData} />

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-2 pt-2">
        <p className="text-xs text-muted-foreground font-medium">
          পেজ <span className="text-foreground font-bold">{currentPage}</span> /{" "}
          <span className="text-foreground font-bold">{totalPages || 1}</span>
        </p>
        <PosterPagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}