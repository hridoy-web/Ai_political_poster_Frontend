"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LogOut,
  Home,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/brand/logo";
import { ADMIN_NAV_ITEMS } from "../admin.constants";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border/80 bg-card/80 dark:bg-card/95 backdrop-blur-xl shadow-xs transition-[width] duration-200 ease-in-out"
    >
      {/* Sidebar Header */}
      <SidebarHeader className="h-16 flex flex-row items-center justify-between px-3.5 border-b border-border/40 shrink-0">
        <Link
          href="/admin"
          className="flex items-center justify-center w-full active:scale-95 transition-transform"
        >
          <div className="group-data-[collapsible=icon]:hidden w-full flex items-center justify-between">
            <Logo />
            <span className="px-2 py-0.5 text-[10px] font-bold bg-destructive/10 text-destructive border border-destructive/20 rounded-full">
              ADMIN
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
          {ADMIN_NAV_ITEMS.map((item) => {
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

      {/* Sidebar Footer */}
      <SidebarFooter className="p-2 border-t border-border/40 space-y-1.5 group-data-[collapsible=icon]:px-1">
        <Link href="/" className="w-full flex justify-center">
          <Button
            variant="outline"
            className="w-full justify-start group-data-[collapsible=icon]:justify-center gap-2.5 border-border/80 text-foreground hover:bg-accent px-3 h-10 rounded-xl transition-colors duration-150"
          >
            <Home className="w-4.5 h-4.5 shrink-0" />
            <span className="group-data-[collapsible=icon]:hidden truncate font-medium text-xs">
              মূল ওয়েবসাইট
            </span>
          </Button>
        </Link>

        <Button
          variant="ghost"
          className="w-full justify-start group-data-[collapsible=icon]:justify-center gap-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive px-3 h-10 rounded-xl transition-colors duration-150"
        >
          <LogOut className="w-4.5 h-4.5 shrink-0" />
          <span className="group-data-[collapsible=icon]:hidden truncate font-medium text-xs">
            লগআউট
          </span>
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}