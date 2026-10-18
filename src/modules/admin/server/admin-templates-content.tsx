import { use } from "react";
import { AdminTemplatesGrid } from "./admin-templates-grid";
import { TemplateSearchInput, TemplatePagination } from "../client/template-filter-controls";
import { AdminTemplate } from "../admin.types";

interface AdminTemplatesContentProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export function AdminTemplatesContent({ searchParams }: AdminTemplatesContentProps) {
  const resolvedParams = use(searchParams);
  const currentPage = Number(resolvedParams.page) || 1;
  const searchTerm = resolvedParams.search || "";
  const itemsPerPage = 8;

  const mockTemplates: AdminTemplate[] = [
    {
      id: "tpl-1",
      title: "চেয়ারম্যান পদপ্রার্থী ক্যানভাস ফ্রেম",
      category: "ইউনিয়ন পরিষদ",
      imageUrl: "https://via.placeholder.com/600x800",
      isPremium: true,
      isActive: true,
    },
    {
      id: "tpl-2",
      title: "মেয়র পদপ্রার্থী পোস্টার",
      category: "পৌরসভা",
      imageUrl: "https://via.placeholder.com/600x800",
      isPremium: false,
      isActive: true,
    },
  ];

  // Server-side Filter Logic
  const filtered = mockTemplates.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-5">
      {/* Search Bar & Counter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <TemplateSearchInput initialSearch={searchTerm} />
        <span className="text-xs text-muted-foreground font-semibold px-3.5 py-1.5 rounded-full bg-card border border-border/60 shadow-2xs self-end sm:self-center">
          মোট টেমপ্লেট: <strong className="text-foreground">{totalCount}</strong> টি
        </span>
      </div>

      {/* Optimized Server Images Grid */}
      <AdminTemplatesGrid templates={paginatedData} />

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-2 pt-2">
        <p className="text-xs text-muted-foreground font-medium">
          পেজ <span className="text-foreground font-bold">{currentPage}</span> /{" "}
          <span className="text-foreground font-bold">{totalPages || 1}</span>
        </p>
        <TemplatePagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}