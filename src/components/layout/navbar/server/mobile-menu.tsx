import { Menu } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { navLinks } from "../navbar.constants";
import NavActiveLink from "../client/nav-active-link";



export default function MobileMenu() {
  const mobileActiveLinkClass =
    "text-brand-green font-bold dark:text-brand-mint bg-brand-green/10";
    
  const mobileInactiveLinkClass =
    "text-foreground hover:bg-muted dark:hover:bg-muted/10";

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost" size="icon"
            aria-label="Open Menu"
            className="rounded-full size-8 hover:bg-brand-green/10 dark:hover:bg-brand-mint/15 transition-all duration-300"
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-72 p-6 flex flex-col justify-between font-sans"
        >
          <div className="space-y-6">
            <SheetHeader className="p-0 pb-4 text-left border-b border-border/50">
              <SheetTitle className="flex items-center">
                <Logo />
              </SheetTitle>
              <SheetDescription className="sr-only">
                মোবাইল নেভিগেশন মেনু
              </SheetDescription>
            </SheetHeader>

            <nav className="flex flex-col gap-1" aria-label="Main Navigation">
              {navLinks.map((link) => {
                return (
                  <Button
                    key={link.href} variant="ghost" asChild
                    className="w-full justify-between h-10 px-3 text-sm font-medium rounded-xl transition-colors"
                  >
                    <NavActiveLink
                      href={link.href}
                      className={mobileInactiveLinkClass}
                      activeClassName={mobileActiveLinkClass}
                    >
                      <span>{link.name}</span>
                    </NavActiveLink>
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
