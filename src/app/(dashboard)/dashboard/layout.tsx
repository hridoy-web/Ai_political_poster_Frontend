import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip"; 
import { DashboardSidebar } from "@/modules/dashboard/client/dashboard-sidebar";
import { DashboardNavbar } from "@/modules/dashboard/client/dashboard-navbar";
import { DashboardAuthGuard } from "@/modules/dashboard/client/dashboard-auth-guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardAuthGuard>
      <TooltipProvider>
        <SidebarProvider defaultOpen={true}>
          <div className="flex min-h-screen w-full bg-background text-foreground">
            {/* Collapsible Sidebar */}
            <DashboardSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
              <DashboardNavbar />

              <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </DashboardAuthGuard>
  );
}