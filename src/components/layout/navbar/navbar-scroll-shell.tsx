"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";



interface NavbarScrollShellProps {
  logo: React.ReactNode;
  desktopNav: React.ReactNode;
  mobileThemeToggle: React.ReactNode;
  desktopThemeToggle: React.ReactNode;
  mobileActions: React.ReactNode;
  desktopActions: React.ReactNode;
  mobileMenu: React.ReactNode;
}

export function NavbarScrollShell({
  logo,
  desktopNav,
  mobileThemeToggle,
  desktopThemeToggle,
  mobileActions,
  desktopActions,
  mobileMenu,
}: NavbarScrollShellProps) {
  
  const [isScrolled, setIsScrolled] = useState(false);


  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setIsScrolled((prev) => {
            // Hysteresis buffer: scroll down > 45px to activate pill,
            // scroll back up < 15px to revert. Prevents oscillation/jitter loop.
            if (!prev && currentScrollY > 45) return true;
            if (prev && currentScrollY < 15) return false;
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
        "sticky z-50 w-full inset-x-0 mx-auto max-w-7xl transition-all duration-300 ease-in-out",
        "max-lg:top-2 max-lg:sm:top-3 max-lg:px-4 max-lg:sm:px-6",
        isScrolled ? "lg:top-2 lg:px-14" : "lg:top-0 lg:px-8"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between transition-all duration-300 ease-in-out",
          "max-lg:w-full max-lg:px-2.5 max-lg:py-2 max-lg:rounded-full max-lg:backdrop-blur-xl max-lg:shadow-sm",
          "max-lg:bg-white/80 max-lg:border max-lg:border-brand-green/25 max-lg:shadow-brand-green/5",
          "dark:max-lg:bg-card/85 dark:max-lg:border-brand-mint/20 dark:max-lg:shadow-2xl dark:max-lg:shadow-black/80",
          isScrolled
            ? [
                "lg:px-4 lg:py-2 lg:rounded-full lg:backdrop-blur-xl lg:shadow-md",
                "lg:bg-white/85 lg:border lg:border-brand-green/25 lg:shadow-brand-green/5",
                "dark:lg:bg-card/85 dark:lg:border-brand-mint/20 dark:lg:shadow-2xl dark:lg:shadow-black/70",
              ]
            : [
                "lg:h-auto lg:px-2 lg:py-3.5 lg:rounded-none lg:border-0 lg:bg-transparent dark:lg:bg-transparent lg:shadow-none lg:backdrop-blur-none",
              ]
        )}
      >
        {/* Mobile Menu Icon */}
        <div className="flex lg:hidden items-center shrink-0">{mobileMenu}</div>



        <div className="flex items-center justify-center shrink-0">{logo}</div>

        {/* Desktop Navigation Links */}
        {desktopNav}

        {/* Actions Container */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile Pill Wrapper */}
          <div className="flex lg:hidden items-center justify-center gap-2">
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out flex items-center justify-center shrink-0",
                isScrolled ? "w-0 max-w-0 opacity-0 -mr-2 scale-75 pointer-events-none" : "opacity-100 scale-100 pointer-events-auto"
              )}
            >
              {mobileThemeToggle}
            </div>
            <div className="flex items-center justify-center">{mobileActions}</div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center justify-center gap-4">
            {desktopThemeToggle}
            {desktopActions}
          </div>
        </div>
      </div>
    </header>
  );
}