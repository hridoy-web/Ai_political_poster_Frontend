"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Logo } from "@/components/brand/logo";
import { NavbarDropdown } from "@/components/layout/navbar/navbar-dropdown";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Bookmark,
  ReceiptText,
  User,
  Home,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DASHBOARD_NAV_TABS = [
  { name: "ওভারভিউ", href: "/dashboard", icon: LayoutDashboard },
  { name: "আমার পোস্টার্স", href: "/dashboard/posters", icon: ImageIcon },
  { name: "সংরক্ষিত", href: "/dashboard/saved", icon: Bookmark },
  { name: "ট্রানজেকশন", href: "/dashboard/history", icon: ReceiptText },
  { name: "প্রোফাইল", href: "/dashboard/profile", icon: User },
];

export function DashboardNavbar() {
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

  return (
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
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Logo />
          </Link>
          <div className="hidden sm:block h-5 w-px bg-border" />
          <span className="hidden sm:inline-flex text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-green/10 text-brand-mint border border-brand-green/20 items-center gap-1">
            <Sparkles className="size-3" /> ড্যাশবোর্ড
          </span>
        </div>

        {/* Center: Horizontal Navigation Tabs (Pills) */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1 px-1 bg-muted/50 rounded-2xl border border-border/60 text-xs font-semibold">
          {DASHBOARD_NAV_TABS.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-card text-foreground shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`size-3.5 ${isActive ? "text-brand-primary" : "text-muted-foreground"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions, Theme Toggle & Unified Profile Picture Dropdown */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden md:flex rounded-xl h-9 text-xs gap-1.5"
          >
            <Link href="/">
              <Home className="size-3.5 text-muted-foreground" />
              <span>মূল ওয়েবসাইট</span>
            </Link>
          </Button>

          <ThemeToggle />

          {/* Unified Profile Picture Dropdown - 100% Identical across all pages */}
          <NavbarDropdown />
        </div>
      </div>
    </header>
  );
}