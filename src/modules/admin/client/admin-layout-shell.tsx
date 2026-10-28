"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./admin-sidebar";
import { AdminNavbar } from "./admin-navbar";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { NavbarDropdown } from "@/components/layout/navbar/navbar-dropdown";
import { Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminLayoutShellProps {
  children: React.ReactNode;
}

export function AdminLayoutShell({ children }: AdminLayoutShellProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setIsScrolled((prev) => {
            if (!prev && currentScrollY > 25) return true;
            if (prev && currentScrollY < 10) return false;
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // If user is on the templates manager pages (/admin/templates or /admin/templates/create)
  // Hide the left sidebar and use a centered mx-auto layout matching the main website.
  const isTemplatesPage = pathname.startsWith("/admin/templates");

  if (isTemplatesPage) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        {/* Floating Glassmorphic Navbar matching website body (max-w-7xl mx-auto) */}
        <header
          className={cn(
            "sticky z-50 w-full inset-x-0 mx-auto max-w-7xl transition-all duration-300 ease-in-out px-4 sm:px-6 lg:px-8",
            isScrolled ? "top-2 sm:top-3" : "top-0 pt-2 sm:pt-4"
          )}
        >
          <div
            className={cn(
              "h-16 flex items-center justify-between gap-4 transition-all duration-300 ease-in-out px-4 sm:px-6",
              isScrolled
                ? "rounded-full backdrop-blur-2xl shadow-lg bg-white/85 dark:bg-card/85 border border-brand-green/25 dark:border-brand-mint/20 shadow-brand-green/5 dark:shadow-2xl dark:shadow-black/70"
                : "rounded-2xl border border-border/60 bg-card/75 backdrop-blur-xl shadow-xs"
            )}
          >
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

            {/* Right: Theme Toggle & Unified Profile Dropdown */}
            <div className="flex items-center gap-2.5">
              <ThemeToggle />

              {/* User Avatar Dropdown - 100% Identical Across Site */}
              <NavbarDropdown />
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
