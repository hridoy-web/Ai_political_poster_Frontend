"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { cn } from "@/lib/utils";

const mainNavLinks = [
  { name: "হোম", href: "/" },
  { name: "টেমপ্লেট গ্যালারি", href: "/templates" },
  { name: "পোস্টার তৈরি করুন", href: "/create-poster", isHot: true },
  { name: "আমাদের সম্পর্কে", href: "/about" },
  { name: "রিচার্জ প্যাক", href: "/recharge" },
];

const emptySubscribe = () => () => {};

export default function MobileMenu() {
  const pathname = usePathname();
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open Menu" className="rounded-full size-9 hover:bg-brand-green/10 dark:hover:bg-brand-mint/15 transition-all duration-300">
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-72 p-6 flex flex-col justify-between font-sans">
          <div className="space-y-6">
            <SheetHeader className="p-0 pb-4 text-left border-b border-border/50">
              <SheetTitle className="flex items-center"><Logo /></SheetTitle>
              <SheetDescription className="sr-only">মোবাইল নেভিগেশন মেনু</SheetDescription>
            </SheetHeader>

            <nav className="flex flex-col gap-1">
              {mainNavLinks.map((link) => {
                const isActive = isMounted && pathname === link.href;
                return (
                  <Button
                    key={link.href}
                    variant="ghost"
                    asChild
                    className={cn(
                      "w-full justify-between h-10 px-3 text-sm font-medium rounded-xl transition-colors",
                      isActive ? "text-brand-green font-bold dark:text-brand-mint bg-brand-green/10" : "text-foreground hover:bg-muted"
                    )}
                  >
                    <Link href={link.href}>
                      <span>{link.name}</span>
                      {link.isHot && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                          HOT
                        </span>
                      )}
                    </Link>
                  </Button>
                );
              })}
            </nav>
          </div>

          <div className="pt-4 border-t border-border/50 mt-auto flex items-center justify-between px-2 text-xs text-muted-foreground">
            <span>থিম পরিবর্তন</span>
            <ThemeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}