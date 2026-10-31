"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { cn } from "@/lib/utils";
import {
  LogOut,
  Home,
  Sparkles,
  Layers,
  ShieldCheck,
  Loader2,
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
import { USER_NAV_ITEMS } from "../dashboard.constants";
import { useAuth } from "@/hooks/get-user-data";
import authApi, { serverURL } from "@/lib/api/authApi";

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setUser, isTemplateManager, isAdmin } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await axios({
        url: `${serverURL}${authApi.logout.url}`,
        method: authApi.logout.method,
        withCredentials: true,
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      setIsLoggingOut(false);
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border/80 bg-card/80 dark:bg-card/95 backdrop-blur-xl transition-all duration-300 ease-in-out shadow-xs"
    >
      {/* Sidebar Header: Brand Logo & Collapsed Icon Switch */}
      <SidebarHeader className="h-16 flex flex-row items-center justify-between px-3.5 border-b border-border/40 shrink-0">
        <Link href="/" className="flex items-center justify-center w-full transition-transform active:scale-95">
          <div className="group-data-[collapsible=icon]:hidden w-full flex items-center justify-start">
            <Logo />
          </div>

          <div className="hidden group-data-[collapsible=icon]:flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-brand text-white shadow-sm shadow-brand-primary/20 shrink-0 transition-all duration-300">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
        </Link>
      </SidebarHeader>

      {/* Sidebar Content: Smooth Navigation Links */}
      <SidebarContent className="p-2 pt-6 space-y-1.5 group-data-[collapsible=icon]:px-1 transition-all duration-300">
        <SidebarMenu className="space-y-1">
          {USER_NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={item.href} className="flex justify-center">
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.name}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ease-in-out h-10 w-full",
                    "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0",
                    isActive
                      ? "bg-gradient-brand text-white shadow-md shadow-brand-primary/20 hover:text-white"
                      : "text-muted-foreground hover:bg-accent/80 hover:text-foreground"
                  )}
                >
                  <Link
                    href={item.href}
                    className="flex items-center justify-start group-data-[collapsible=icon]:justify-center w-full"
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110",
                        isActive ? "text-white" : "text-muted-foreground"
                      )}
                    />
                    <span className="group-data-[collapsible=icon]:hidden truncate">
                      {item.name}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}

          {isAdmin && (
            <SidebarMenuItem className="flex justify-center">
              <SidebarMenuButton
                asChild
                tooltip="অ্যাডমিন প্যানেল"
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ease-in-out h-10 w-full",
                  "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0",
                  pathname === "/admin" ||
                    (pathname.startsWith("/admin") &&
                      !pathname.startsWith("/admin/templates"))
                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold"
                    : "text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
                )}
              >
                <Link
                  href="/admin"
                  className="flex items-center justify-start group-data-[collapsible=icon]:justify-center w-full"
                >
                  <ShieldCheck className="w-5 h-5 shrink-0 text-amber-500" />
                  <span className="group-data-[collapsible=icon]:hidden truncate">
                    অ্যাডমিন প্যানেল
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          {isTemplateManager && (
            <SidebarMenuItem className="flex justify-center">
              <SidebarMenuButton
                asChild
                tooltip="টেমপ্লেট ম্যানেজার"
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ease-in-out h-10 w-full",
                  "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0",
                  pathname.startsWith("/admin/templates")
                    ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold"
                    : "text-rose-600 dark:text-rose-400 hover:bg-rose-500/10"
                )}
              >
                <Link
                  href="/admin/templates"
                  className="flex items-center justify-start group-data-[collapsible=icon]:justify-center w-full"
                >
                  <Layers className="w-5 h-5 shrink-0 text-rose-500" />
                  <span className="group-data-[collapsible=icon]:hidden truncate">
                    টেমপ্লেট ম্যানেজার
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="p-2 border-t border-border/40 space-y-1.5 group-data-[collapsible=icon]:px-1 transition-all duration-300">
        <Link href="/" className="w-full flex justify-center">
          <Button
            variant="outline"
            className="w-full justify-start group-data-[collapsible=icon]:justify-center gap-2.5 border-border/80 text-foreground hover:bg-accent px-3 h-10 rounded-xl transition-all duration-200 cursor-pointer"
          >
            <Home className="w-4.5 h-4.5 shrink-0" />
            <span className="group-data-[collapsible=icon]:hidden truncate font-medium text-xs">
              মূল ওয়েবসাইট
            </span>
          </Button>
        </Link>

        <Button
          variant="ghost"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full justify-start group-data-[collapsible=icon]:justify-center gap-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive px-3 h-10 rounded-xl transition-all duration-200 cursor-pointer"
        >
          {isLoggingOut ? (
            <Loader2 className="w-4.5 h-4.5 shrink-0 animate-spin" />
          ) : (
            <LogOut className="w-4.5 h-4.5 shrink-0" />
          )}
          <span className="group-data-[collapsible=icon]:hidden truncate font-medium text-xs">
            {isLoggingOut ? "লগআউট হচ্ছে..." : "লগআউট"}
          </span>
        </Button>
      </SidebarFooter>

      {/* Desktop Resizable Rail */}
      <SidebarRail />
    </Sidebar>
  );
}