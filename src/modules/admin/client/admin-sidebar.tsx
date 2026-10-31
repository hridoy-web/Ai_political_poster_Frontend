"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/brand/logo";
import { ADMIN_NAV_ITEMS } from "../admin.constants";
import { useAuth } from "@/hooks/get-user-data";

export function AdminSidebar() {
  const pathname = usePathname();
  const { isAdmin, isSuperAdmin } = useAuth();

  // If user is not full admin (i.e. only Template Manager), show only template manager navigation
  const visibleNavItems = isAdmin
    ? ADMIN_NAV_ITEMS
    : ADMIN_NAV_ITEMS.filter((item) => item.href.startsWith("/admin/templates"));

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border/80 bg-card/80 dark:bg-card/95 backdrop-blur-xl shadow-xs transition-[width] duration-200 ease-in-out"
    >
      {/* Sidebar Header */}
      <SidebarHeader className="h-16 flex flex-row items-center justify-between px-3.5 border-b border-border/40 shrink-0">
        <Link
          href={isAdmin ? "/admin" : "/admin/templates"}
          className="flex items-center justify-center w-full active:scale-95 transition-transform"
        >
          <div className="group-data-[collapsible=icon]:hidden w-full flex items-center justify-between">
            <Logo />
            <span
              className={`px-2.5 py-0.5 text-[9.5px] font-bold border rounded-full tracking-wide ${
                isSuperAdmin
                  ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                  : isAdmin
                  ? "bg-brand-primary/10 text-brand-primary border-brand-primary/20"
                  : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
              }`}
            >
              {isSuperAdmin
                ? "SUPER ADMIN"
                : isAdmin
                ? "ADMIN"
                : "TEMPLATE MANAGER"}
            </span>
          </div>

          <div className="hidden group-data-[collapsible=icon]:flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-brand text-white shadow-sm shadow-brand-primary/20 shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
        </Link>
      </SidebarHeader>

      {/* Sidebar Navigation */}
      <SidebarContent className="p-2 pt-6 space-y-1.5 group-data-[collapsible=icon]:px-1">
        <SidebarMenu className="space-y-1">
          {visibleNavItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <SidebarMenuItem key={item.href} className="flex justify-center">
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.name}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium h-10 w-full transition-colors duration-150",
                    "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0",
                    isActive
                      ? "bg-gradient-brand text-white shadow-md shadow-brand-primary/20 hover:text-white"
                      : "text-muted-foreground hover:bg-accent/80 hover:text-foreground"
                  )}
                >
                  <Link href={item.href} className="flex items-center w-full">
                    <Icon
                      className={cn(
                        "w-5 h-5 shrink-0 transition-transform duration-150 group-hover:scale-105",
                        isActive ? "text-white" : "text-muted-foreground"
                      )}
                    />
                    <span className="group-data-[collapsible=icon]:hidden truncate ml-3">
                      {item.name}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
