"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, User, Wallet, LogOut, Layers, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/get-user-data";
import authApi, { serverURL } from "@/lib/api/authApi";

export function DashboardNavbar() {
  const router = useRouter();
  const { user, setUser, isTemplateManager } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const getInitials = (name?: string, email?: string) => {
    if (name && name.trim()) {
      const parts = name.trim().split(" ");
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return name.slice(0, 2).toUpperCase();
    }
    if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return "ইউ";
  };

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

  const displayName = user?.name || "ব্যবহারকারী";
  const displayEmail = user?.email || "";

  return (
    <header className="h-16 border-b border-border/60 px-4 sm:px-6 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-20">
      {/* Left: Sidebar Collapse/Expand Toggle Button */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="hover:bg-accent hover:text-foreground border border-border/60 rounded-lg p-1.5 cursor-pointer" />
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand-green/10 text-brand-mint border border-brand-green/20">
          ইউজার প্যানেল
        </span>
      </div>

      {/* Right: Theme Toggle & User Profile Dropdown */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
            <Avatar className="h-9 w-9 border border-brand-primary/30 hover:ring-2 hover:ring-brand-primary/40 transition-all">
              <AvatarImage src={(user as any)?.avatar?.url || ""} alt={displayName} />
              <AvatarFallback className="bg-gradient-brand text-white font-bold text-xs">
                {getInitials(user?.name, user?.email)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60 mt-2 bg-card/95 backdrop-blur-xl border-border p-1.5 rounded-2xl shadow-xl">
            <DropdownMenuLabel className="font-normal p-2.5">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold text-foreground font-heading truncate">{displayName}</p>
                <p className="text-xs text-muted-foreground truncate">{displayEmail}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-4 h-4 text-muted-foreground" />
                <span>হোম পেজ</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
              <Link href="/dashboard/profile" className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span>প্রোফাইল সেটিংস</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
              <Link href="/recharge" className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-muted-foreground" />
                <span>রিচার্জ ওয়ালেট</span>
              </Link>
            </DropdownMenuItem>

            {isTemplateManager && (
              <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                <Link
                  href="/admin/templates"
                  className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-medium"
                >
                  <Layers className="w-4 h-4 text-rose-500" />
                  <span>টেমপ্লেট ম্যানেজার</span>
                </Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="rounded-xl cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 flex items-center gap-2"
            >
              {isLoggingOut ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>লগআউট হচ্ছে...</span>
                </>
              ) : (
                <>
                  <LogOut className="w-4 h-4" />
                  <span>লগআউট</span>
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}