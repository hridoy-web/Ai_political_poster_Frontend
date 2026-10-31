import { AdminTemplatesGrid } from "./admin-templates-grid";
import { TemplateSearchInput, TemplatePagination } from "../client/template-filter-controls";
import { AdminTemplate } from "../admin.types";
import { serverURL } from "@/lib/api/authApi";

interface AdminTemplatesContentProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

async function fetchTemplates(): Promise<AdminTemplate[]> {
  try {
    const res = await fetch(`${serverURL}/api/v1/template?limit=50`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (data?.success && Array.isArray(data.data?.items)) {
      return data.data.items.map((item: any) => ({
        id: item.id,
        title: item.title,
        category: item.category?.name || "রাজনৈতিক পোস্টার",
        imageUrl:
          item.config?.previewUrl ||
          item.config?.blankTemplateUrl ||
          "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=600&q=80",
        isPremium: item.accessLevel === "PREMIUM",
        isActive: item.status === "PUBLISHED",
        aspectRatio: item.aspectRatio || "4:5",
        width: item.width || 1080,
        height: item.height || 1350,
        description: item.description || "",
        createdAt: item.createdAt,
        photoSlotsCount: Array.isArray(item.config?.photoSlots) ? item.config.photoSlots.length : 1,
        textSlotsCount: Array.isArray(item.config?.textSlots) ? item.config.textSlots.length : 4,
      }));
    }
  } catch (e) {
    console.error("Failed to fetch templates on server:", e);
  }
  return [];
}

export async function AdminTemplatesContent({ searchParams }: AdminTemplatesContentProps) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  const searchTerm = resolvedParams.search || "";
  const itemsPerPage = 8;

  const realTemplates = await fetchTemplates();
  const templatesList = realTemplates;

  // Server-side Filter Logic
  const filtered = templatesList.filter(
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