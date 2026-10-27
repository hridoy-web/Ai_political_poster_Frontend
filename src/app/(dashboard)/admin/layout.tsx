import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminSidebar } from "@/modules/admin/client/admin-sidebar";
import { AdminNavbar } from "@/modules/admin/client/admin-navbar";
import { AdminRoleGuard } from "@/modules/admin/client/admin-role-guard";
import { AdminLayoutShell } from "@/modules/admin/client/admin-layout-shell";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <AdminRoleGuard>
        <AdminLayoutShell>{children}</AdminLayoutShell>
      </AdminRoleGuard>
    </TooltipProvider>
  );
}