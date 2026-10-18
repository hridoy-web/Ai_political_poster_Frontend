"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { LayoutDashboard, User, FolderKanban, LogOut } from "lucide-react";

import { UserData } from "@/types/user.types";
import { NavbarAvatar } from "./navbar-avatar";



interface NavbarDropdownAvatarProps {
  user: UserData;
  onLogout?: () => void;
}

export function NavbarDropdown({ user, onLogout }: NavbarDropdownAvatarProps) {
  const pathname = usePathname();

  // PRD Router structure onujayi routes
  const menuItems = [
    {
      name: "ড্যাশবোর্ড",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "মাই পোস্টার্স",
      href: "/dashboard/posters",
      icon: FolderKanban,
    },
    {
      name: "প্রোফাইল সেটিংস",
      href: "/dashboard/profile",
      icon: User,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="ইউজার মেনু খুলুন"
          className="group relative flex items-center justify-center rounded-full p-0.5 outline-hidden ring-2 ring-brand-green/30 hover:ring-brand-green dark:ring-brand-mint/30 dark:hover:ring-brand-mint focus-visible:ring-ring transition-all duration-200 cursor-pointer"
        >
          <NavbarAvatar />
          {/* Emerald Green Online Status Indicator */}
          <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-brand-green dark:bg-brand-mint ring-2 ring-background" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-60 p-1.5 rounded-2xl bg-card text-card-foreground border border-border shadow-xl backdrop-blur-xl dark:bg-(--card)/90 animate-in fade-in-80 zoom-in-95 duration-150"
      >
        {/* User Info Header */}
        <DropdownMenuLabel className="p-2.5 font-normal">
          <div className="flex items-center gap-3">
            <NavbarAvatar />
            <div className="flex flex-col space-y-1 overflow-hidden">
              <p className="text-sm font-semibold text-foreground leading-none truncate">
                {user.name}
              </p>
              <p className="text-xs text-muted-foreground leading-none truncate">
                {user.email}
              </p>
            </div>
          </div>
          {user.role && (
            <div className="mt-2.5">
              <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-green/10 text-brand-green dark:bg-brand-mint/10 dark:text-brand-mint border border-brand-green/20 dark:border-brand-mint/20">
                {user.role}
              </span>
            </div>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-1 bg-border" />

        {/* Quick Navigation Items */}
        <DropdownMenuGroup className="space-y-0.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <DropdownMenuItem key={item.href} asChild className="cursor-pointer">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium cursor-pointer transition-colors duration-150",
                    /* ☀️ Light & 🌙 Dark Menu Active & Hover Styles */
                    isActive
                      ? "bg-brand-green/10 text-brand-green font-bold dark:bg-brand-mint/15 dark:text-brand-mint"
                      : "text-foreground hover:bg-muted hover:text-brand-green dark:hover:text-brand-mint"
                  )}
                >
                  <Icon
                    className={cn(
                      "size-4 shrink-0 transition-colors",
                      isActive
                        ? "text-brand-green dark:text-brand-mint"
                        : "text-muted-foreground group-hover:text-brand-green dark:group-hover:text-brand-mint"
                    )}
                  />
                  <span>{item.name}</span>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1 bg-border" />

        {/* Logout Action with Crimson Red Accent */}
        <DropdownMenuItem
          onClick={onLogout}
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors duration-150 text-brand-primary hover:bg-brand-primary/10 focus:bg-brand-primary/10 focus:text-brand-primary dark:text-brand-secondary dark:hover:bg-brand-secondary/10"
        >
          <LogOut className="size-4 shrink-0 text-brand-primary dark:text-brand-secondary" />
          <span>লগআউট</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}