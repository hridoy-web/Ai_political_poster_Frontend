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
import { Home, LayoutDashboard, ShieldCheck, Crown, LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/get-user-data";
import authApi, { serverURL } from "@/lib/api/authApi";

export function AdminNavbar() {
  const router = useRouter();
  const { user, setUser, isSuperAdmin } = useAuth();
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
    return "এড";
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

  const displayName = user?.name || "অ্যাডমিন ইউজার";
  const displayEmail = user?.email || "";

  return (
    <header className="h-16 border-b border-border/60 px-4 sm:px-6 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-20">
      {/* Left: Sidebar Toggle & Admin/SuperAdmin Panel Badge */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="hover:bg-accent hover:text-foreground border border-border/60 rounded-lg p-1.5 cursor-pointer" />
        {isSuperAdmin ? (
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center gap-1.5 shadow-2xs">
            <Crown className="w-3.5 h-3.5" /> সুপার অ্যাডমিন প্যানেল
          </span>
        ) : (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> অ্যাডমিন প্যানেল
          </span>
        )}
      </div>

      {/* Right: Theme Toggle & Admin Profile Dropdown */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
            <Avatar className={`h-9 w-9 border transition-all ${
              isSuperAdmin ? "border-amber-500/40 hover:ring-2 hover:ring-amber-500/30" : "border-brand-primary/40 hover:ring-2 hover:ring-brand-primary/30"
            }`}>
              <AvatarImage src={(user as any)?.avatar?.url || ""} alt={displayName} />
              <AvatarFallback className={`${
                isSuperAdmin ? "bg-amber-500" : "bg-brand-primary"
              } text-white font-bold text-xs`}>
                {getInitials(user?.name, user?.email)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-2 bg-card/95 backdrop-blur-xl border-border shadow-lg p-1.5 rounded-2xl">
            <DropdownMenuLabel className="font-normal p-2.5">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold text-foreground truncate">{displayName}</p>
                <p className="text-xs text-muted-foreground truncate">{displayEmail}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-4 h-4 text-muted-foreground" />
                <span>মূল ওয়েবসাইট</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
              <Link href="/dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                <span>ইউজার ড্যাশবোর্ড</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="rounded-xl cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 flex items-center gap-2 font-medium"
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