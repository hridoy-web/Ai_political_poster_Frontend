import Link from "next/link";
import { DesktopNavMenu } from "./desktop-nav-menu";
import { ThemeToggle } from "@/components/theme/theme-toggle";

import MobileMenu from "./mobile-menu";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";
import { NavbarActions } from "./navbar-actions";

export const isAuthenticated = true;

export function MainNavbar() {
  return (
    /* 🔴 CHANGE MARK: Added `w-full inset-x-0` and cleaned margin classes to ensure proper centering */
    <header className="sticky top-2 z-50 w-full inset-x-0 mx-auto max-w-7xl px-4 sm:px-6 lg:px-14 overflow-hidden">
      <div
        className={cn(
          "flex h-14 items-center justify-between px-3 py-2 rounded-full transition-all duration-300 backdrop-blur-xl  shadow-sm",

          /* ☀️ LIGHT THEME STYLE: Soft Slate Glass with Green Tint Border */
          "bg-white/80 border border-brand-green/25 shadow-lg shadow-brand-green/5",

          /* 🌙 DARK THEME STYLE: Dark Slate Glass with Mint Glow Border */
          "dark:bg-card/85 dark:border-brand-mint/20 dark:shadow-2xl dark:shadow-black/80"
        )}
      >
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link href="/" className="flex items-center cursor-pointer">
            <Logo />
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <DesktopNavMenu />

        {/* Right: Premium Actions Container */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Mobile & Medium Screens Pill Wrapper (ThemeToggle + NavbarActions) */}
          <div className="flex lg:hidden items-center justify-center p-1 gap-2 rounded-full border border-border/60 bg-muted/40 backdrop-blur-md shadow-inner">
            <ThemeToggle />
            <NavbarActions />
          </div>

          {/* Large Screens Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <NavbarActions />
          </div>

          {/* Mobile Sheet Trigger Menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}