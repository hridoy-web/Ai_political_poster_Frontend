"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { NavbarDropdown } from "@/components/layout/navbar/navbar-dropdown";
import { MainFooter } from "@/components/layout/footer/main-footer";
import { Crown, ShieldCheck, Layers } from "lucide-react";
import { useAuth } from "@/hooks/get-user-data";
import { AdminSidebar } from "./admin-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface AdminLayoutShellProps {
  children: React.ReactNode;
}

export function AdminLayoutShell({ children }: AdminLayoutShellProps) {
  const { isAdmin, isSuperAdmin } = useAuth();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background text-foreground font-sans">
        {/* Modern Fast Left Sidebar for Admin & Super Admin */}
        <AdminSidebar />

        {/* Right Area: Top Header + Page Content */}
        <SidebarInset className="flex-1 flex flex-col min-h-screen min-w-0 bg-background">
          {/* Admin Header with Sidebar Trigger, Brand Info & Actions */}
          <header className="sticky top-0 z-40 h-16 w-full border-b border-border/60 bg-card/80 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between gap-4 shadow-2xs">
            {/* Left: Sidebar Trigger & Role Indicator */}
            <div className="flex items-center gap-3">
              <SidebarTrigger className="cursor-pointer text-muted-foreground hover:text-foreground hover:bg-muted p-1.5 rounded-xl transition-colors" />

              <div className="h-5 w-px bg-border/60 hidden sm:block" />

              <Link href="/admin" className="hidden sm:flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-tight text-foreground">
                  অ্যাডমিন ড্যাশবোর্ড
                </span>
              </Link>

              {isSuperAdmin ? (
                <span className="inline-flex text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 items-center gap-1">
                  <Crown className="size-3 text-amber-500" /> সুপার অ্যাডমিন
                </span>
              ) : isAdmin ? (
                <span className="inline-flex text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 items-center gap-1">
                  <ShieldCheck className="size-3 text-brand-primary" /> অ্যাডমিন
                </span>
              ) : (
                <span className="inline-flex text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 items-center gap-1">
                  <Layers className="size-3 text-rose-500" /> টেমপ্লেট
                </span>
              )}
            </div>

            {/* Right: Theme Toggle & Unified Profile Menu */}
            <div className="flex items-center gap-2.5 shrink-0">
              <ThemeToggle />
              <NavbarDropdown />
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>

          {/* Global Footer */}
          <MainFooter />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
