"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { NavbarDropdown } from "@/components/layout/navbar/navbar-dropdown";
import { MainFooter } from "@/components/layout/footer/main-footer";
import { Crown, ShieldCheck, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/get-user-data";
import { ADMIN_NAV_ITEMS } from "../admin.constants";

interface AdminLayoutShellProps {
  children: React.ReactNode;
}

export function AdminLayoutShell({ children }: AdminLayoutShellProps) {
  const pathname = usePathname();
  const { isAdmin, isSuperAdmin, isTemplateManager } = useAuth();
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

  // Filter navigation items based on role
  const visibleNavItems = isAdmin
    ? ADMIN_NAV_ITEMS
    : ADMIN_NAV_ITEMS.filter((item) => item.href.startsWith("/admin/templates"));

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      {/* Centered Floating Glassmorphic Top Navbar matching all other pages (max-w-7xl mx-auto) */}
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
          {/* Left: Brand Logo & Role Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <Logo />
            </Link>
            <div className="hidden sm:block h-5 w-px bg-border" />
            {isSuperAdmin ? (
              <span className="hidden sm:inline-flex text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 items-center gap-1">
                <Crown className="size-3 text-amber-500" /> সুপার অ্যাডমিন
              </span>
            ) : isAdmin ? (
              <span className="hidden sm:inline-flex text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 items-center gap-1">
                <ShieldCheck className="size-3 text-brand-primary" /> অ্যাডমিন
              </span>
            ) : (
              <span className="hidden sm:inline-flex text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 items-center gap-1">
                <Layers className="size-3 text-rose-500" /> টেমপ্লেট
              </span>
            )}
          </div>

          {/* Center: Admin Desktop Navigation Tabs */}
          {visibleNavItems.length > 1 && (
            <nav className="hidden lg:flex items-center gap-1 bg-muted/50 p-1 rounded-full border border-border/60">
              {visibleNavItems.map((item) => {
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200",
                      isActive
                        ? "bg-brand-primary text-white shadow-xs dark:bg-brand-mint dark:text-zinc-950 font-bold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                    )}
                  >
                    <Icon className="size-3.5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Right: Theme Toggle & Unified Profile Dropdown */}
          <div className="flex items-center gap-2.5 shrink-0">
            <ThemeToggle />
            <NavbarDropdown />
          </div>
        </div>
      </header>

      {/* Main Content: mx-auto Centered Container Matching all pages */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Mobile & Tablet Horizontal Tab Bar */}
        {visibleNavItems.length > 1 && (
          <div className="lg:hidden w-full overflow-x-auto no-scrollbar py-2 px-1 border-b border-border/40 flex items-center gap-1.5 mb-6">
            {visibleNavItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0",
                    isActive
                      ? "bg-brand-primary text-white shadow-xs dark:bg-brand-mint dark:text-zinc-950 font-bold"
                      : "bg-muted/60 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="size-3.5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        )}

        {children}
      </main>

      {/* Global Footer */}
      <MainFooter />
    </div>
  );
}
