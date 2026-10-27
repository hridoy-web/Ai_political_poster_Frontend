"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./admin-sidebar";
import { AdminNavbar } from "./admin-navbar";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { NavbarAvatar } from "@/components/layout/navbar/navbar-avatar";
import { Layers, Plus, Sparkles, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/get-user-data";

interface AdminLayoutShellProps {
  children: React.ReactNode;
}

export function AdminLayoutShell({ children }: AdminLayoutShellProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  // If user is on the templates manager pages (/admin/templates or /admin/templates/create)
  // Hide the left sidebar and use a centered mx-auto layout matching the main website.
  const isTemplatesPage = pathname.startsWith("/admin/templates");

  if (isTemplatesPage) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        {/* Top Navbar for Template Manager */}
        <header className="sticky top-0 z-30 w-full border-b border-border/80 bg-card/85 backdrop-blur-xl shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            {/* Left: Brand Logo & Title */}
            <div className="flex items-center gap-3">
              <Link href="/" className="hover:opacity-90 transition-opacity">
                <Logo />
              </Link>
              <div className="hidden sm:block h-5 w-px bg-border" />
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 flex items-center gap-1">
                  <Layers className="size-3" /> টেমপ্লেট ম্যানেজার
                </span>
              </div>
            </div>

            {/* Center: Navigation Links */}
            <div className="hidden md:flex items-center gap-1 bg-muted/50 p-1 rounded-2xl border border-border/60 text-xs font-semibold">
              <Link
                href="/admin/templates"
                className={`px-3.5 py-1.5 rounded-xl transition-all ${
                  pathname === "/admin/templates"
                    ? "bg-card text-foreground shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                টেমপ্লেট তালিকা
              </Link>
              <Link
                href="/admin/templates/create"
                className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
                  pathname === "/admin/templates/create"
                    ? "bg-brand-primary text-white shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sparkles className="size-3" />
                <span>নতুন ক্যানভাস তৈরি</span>
              </Link>
            </div>

            {/* Right: Actions, Theme Toggle & Profile */}
            <div className="flex items-center gap-2.5">
              <Button asChild variant="ghost" size="sm" className="hidden sm:flex rounded-xl h-9 text-xs gap-1.5">
                <Link href="/">
                  <Home className="size-3.5 text-muted-foreground" /> মূল ওয়েবসাইট
                </Link>
              </Button>

              <ThemeToggle />

              {/* User Avatar & Info */}
              <Link
                href="/dashboard/profile"
                className="size-9 rounded-full ring-2 ring-brand-primary/20 hover:ring-brand-primary transition-all p-0.5 flex items-center justify-center shrink-0"
                title={user?.name || "ইউজার প্রোফাইল"}
              >
                <NavbarAvatar />
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content: mx-auto Centered Container */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </main>
      </div>
    );
  }

  // Other Admin sections (Users, Transactions, Overview) retain standard sidebar if needed
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AdminNavbar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
