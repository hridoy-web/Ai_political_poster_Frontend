"use client";

import { useSyncExternalStore } from "react";
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

const emptySubscribe = () => () => { };

export function DesktopNavMenu() {
  const pathname = usePathname();
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  return (
    <nav className="hidden lg:flex items-center gap-1.5 lg:gap-2">
      {navLinks.map((link) => {
        const isActive = isMounted && pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "relative px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-300 flex items-center cursor-pointer select-none",
              isActive
                ? "bg-brand-green/15 text-brand-green font-bold shadow-xs border border-brand-green/20 dark:bg-brand-mint/10 dark:text-brand-mint dark:border-brand-mint/30 dark:shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                : "text-muted-foreground hover:text-brand-green hover:bg-brand-green/10 dark:hover:text-brand-mint dark:hover:bg-brand-mint/10"
            )}
          >
            <span>{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}