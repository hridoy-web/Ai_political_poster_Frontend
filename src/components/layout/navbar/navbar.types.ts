import { LucideIcon } from "lucide-react";

export interface NavLink {
  name: string;
  href: string;
}

export interface UserDropdownLink extends NavLink {
  icon: LucideIcon;
}

export interface NavActiveLinkProps {
href: string;
children: React.ReactNode;
className?: string;
activeClassName?: string;
}

export interface NavbarScrollShellProps {
  logo: React.ReactNode;
  desktopNav: React.ReactNode;
  mobileThemeToggle: React.ReactNode;
  desktopThemeToggle: React.ReactNode;
  mobileActions: React.ReactNode;
  desktopActions: React.ReactNode;
  mobileMenu: React.ReactNode;
}


export interface AdminDropdownLinksProps {
  isAdmin: boolean;
  isTemplateManager: boolean;
}