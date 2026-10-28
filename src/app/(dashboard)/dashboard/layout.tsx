import React from "react";
import { DashboardNavbar } from "@/modules/dashboard/client/dashboard-navbar";
import { DashboardAuthGuard } from "@/modules/dashboard/client/dashboard-auth-guard";
import { MainFooter } from "@/components/layout/footer/main-footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardAuthGuard>
      <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        {/* Centered Dashboard Top Header matching max-w-7xl mx-auto */}
        <DashboardNavbar />

        {/* Centered Main Content Area */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </main>

        {/* Footer */}
        <MainFooter />
      </div>
    </DashboardAuthGuard>
  );
}