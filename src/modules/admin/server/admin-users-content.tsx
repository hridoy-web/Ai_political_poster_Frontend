"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AdminUsersTable, AdminUser } from "./admin-users-table";
import { UserSearchInput, UserPagination } from "../client/user-filter-controls";
import { AdminService } from "../admin.service";
import { Loader2 } from "lucide-react";

interface AdminUsersContentProps {
  searchParams?: Promise<{
    page?: string;
    search?: string;
  }>;
}

export function AdminUsersContent({}: AdminUsersContentProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get("page")) || 1;
  const searchTerm = searchParams?.get("search") || "";
  const itemsPerPage = 10;

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    AdminService.getUsers(currentPage, itemsPerPage, searchTerm)
      .then((data) => {
        if (isMounted) {
          setUsers(data.users);
          setTotalCount(data.totalCount);
          setTotalPages(data.totalPages);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load admin users:", err);
        if (isMounted) {
          setUsers([]);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [currentPage, searchTerm]);

  return (
    <div className="space-y-5">
      {/* Search Bar & Total Counter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <UserSearchInput initialSearch={searchTerm} />
        <span className="text-xs text-muted-foreground font-semibold px-3.5 py-1.5 rounded-full bg-card border border-border/60 shadow-2xs self-end sm:self-center">
          মোট ইউজার: <strong className="text-foreground">{totalCount}</strong> জন
        </span>
      </div>

      {loading ? (
        <div className="p-16 text-center flex flex-col items-center justify-center gap-3 bg-card/50 rounded-2xl border border-dashed border-border">
          <Loader2 className="w-6 h-6 animate-spin text-brand-primary" />
          <p className="text-xs text-muted-foreground">ইউজার তালিকা লোড হচ্ছে...</p>
        </div>
      ) : (
        <>
          {/* Users Table */}
          <AdminUsersTable users={users} />

          {/* Pagination Footer */}
          <div className="flex items-center justify-between px-2 pt-2">
            <p className="text-xs text-muted-foreground font-medium">
              পেজ <span className="text-foreground font-bold">{currentPage}</span> /{" "}
              <span className="text-foreground font-bold">{totalPages || 1}</span>
            </p>
            <UserPagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        </>
      )}
    </div>
  );
}