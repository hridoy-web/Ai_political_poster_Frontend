import Link from "next/link";
import { DesktopNavMenu } from "./desktop-nav-menu";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import MobileMenu from "./mobile-menu";
import { Logo } from "@/components/brand/logo";
import { NavbarActions } from "./navbar-actions";
import { NavbarScrollShell } from "./navbar-scroll-shell";

/**
 * MainNavbar - Server Component (RSC)
 * Renders on the server while delegating dynamic scroll transitions
 * to the lightweight NavbarScrollShell client island.
 */
export function MainNavbar() {
  return (
    <NavbarScrollShell
      logo={
        <Link href="/" className="flex items-center cursor-pointer transition-transform hover:opacity-95">
          <Logo />
        </Link>
      }
      desktopNav={<DesktopNavMenu />}
      mobileThemeToggle={<ThemeToggle />}
      desktopThemeToggle={<ThemeToggle />}
      mobileActions={<NavbarActions />}
      desktopActions={<NavbarActions />}
      mobileMenu={<MobileMenu />}
    />
  );
}
