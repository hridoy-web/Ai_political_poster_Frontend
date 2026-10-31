import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
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