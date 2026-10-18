import { use } from "react";
import { AdminUsersTable, AdminUser } from "./admin-users-table";
import { UserSearchInput, UserPagination } from "../client/user-filter-controls";

interface AdminUsersContentProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export function AdminUsersContent({ searchParams }: AdminUsersContentProps) {
  const resolvedParams = use(searchParams);
  const currentPage = Number(resolvedParams.page) || 1;
  const searchTerm = resolvedParams.search || "";
  const itemsPerPage = 5;

  const mockUsers: AdminUser[] = [
    {
      id: "usr-1",
      name: "হৃদয় চৌধুরী",
      email: "hridoy@example.com",
      phone: "01800000000",
      balance: 150.0,
      totalPosters: 12,
      role: "USER",
      status: "ACTIVE",
      createdAt: "১০ জানুয়ারি, ২০২৬",
    },
    {
      id: "usr-2",
      name: "রাহেলা আক্তার",
      email: "rahela@example.com",
      phone: "01700000000",
      balance: 50.0,
      totalPosters: 4,
      role: "USER",
      status: "ACTIVE",
      createdAt: "০২ ফেব্রুয়ারি, ২০২৬",
    },
  ];

  // Server-side Filter Logic
  const filtered = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-5">
      {/* Search Bar & Total Counter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <UserSearchInput initialSearch={searchTerm} />
        <span className="text-xs text-muted-foreground font-semibold px-3.5 py-1.5 rounded-full bg-card border border-border/60 shadow-2xs self-end sm:self-center">
          মোট ইউজার: <strong className="text-foreground">{totalCount}</strong> জন
        </span>
      </div>

      {/* Users Table */}
      <AdminUsersTable users={paginatedData} />

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-2 pt-2">
        <p className="text-xs text-muted-foreground font-medium">
          পেজ <span className="text-foreground font-bold">{currentPage}</span> /{" "}
          <span className="text-foreground font-bold">{totalPages || 1}</span>
        </p>
        <UserPagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}