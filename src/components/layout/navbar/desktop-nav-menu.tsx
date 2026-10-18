"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface NavLink {
  name: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { name: "হোম", href: "/" },
  { name: "টেমপ্লেট গ্যালারি", href: "/templates" },
  { name: "পোস্টার তৈরি করুন", href: "/create-poster" },
  { name: "আমাদের সম্পর্কে", href: "/about" },
  { name: "রিচার্জ প্যাক", href: "/recharge" },
];

export function DesktopNavMenu() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-1.5 lg:gap-2">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "relative px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-300 flex items-center cursor-pointer select-none",
              
              /* ☀️ LIGHT THEME DESIGN: Soft Emerald Green Pill Fill */
              isActive
                ? "bg-brand-green/15 text-brand-green font-bold shadow-xs border border-brand-green/20 " +
                  /* 🌙 DARK THEME DESIGN: Neon Emerald Glow Text with Mint Accent */
                  "dark:bg-brand-mint/10 dark:text-brand-mint dark:border-brand-mint/30 dark:shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                : "text-muted-foreground " +
                  /* Light Hover */
                  "hover:text-brand-green hover:bg-brand-green/10 " +
                  /* Dark Hover */
                  "dark:hover:text-brand-mint dark:hover:bg-brand-mint/10"
            )}
          >
            <span>{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}