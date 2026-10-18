"use client";

import Link from "next/link";
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
import { Home, LayoutDashboard, ShieldCheck, LogOut } from "lucide-react";

export function AdminNavbar() {
  return (
    <header className="h-16 border-b border-border/60 px-4 sm:px-6 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-20">
      {/* Left: Sidebar Toggle & Admin Panel Badge */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="hover:bg-accent hover:text-foreground border border-border/60 rounded-lg p-1.5" />
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-destructive/10 text-destructive border border-destructive/20 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> অ্যাডমিন প্যানেল
        </span>
      </div>

      {/* Right: Theme Toggle & Admin Profile Dropdown */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar className="h-9 w-9 border border-destructive/40 hover:ring-2 hover:ring-destructive/40 transition-all">
              <AvatarImage src="" alt="Admin User" />
              <AvatarFallback className="bg-destructive text-white font-bold text-xs">
                এড
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-2 bg-card/95 backdrop-blur-xl border-border shadow-lg">
            <DropdownMenuLabel className="font-normal p-3">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold text-foreground">হৃদয় চৌধুরী</p>
                <p className="text-xs text-muted-foreground truncate">admin@posterai.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-4 h-4 text-muted-foreground" />
                <span>মূল ওয়েবসাইট</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                <span>ইউজার ড্যাশবোর্ড</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive flex items-center gap-2 font-medium">
              <LogOut className="w-4 h-4" />
              <span>লগআউট</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}