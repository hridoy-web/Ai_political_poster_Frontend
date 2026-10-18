"use client";

import React from "react";
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
import { Home, User, Wallet, LogOut } from "lucide-react";

export function DashboardNavbar() {
  return (
    <header className="h-16 border-b border-border/60 px-4 sm:px-6 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-20">
      {/* Left: Sidebar Collapse/Expand Toggle Button */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="hover:bg-accent hover:text-foreground border border-border/60 rounded-lg p-1.5" />
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand-green/10 text-brand-mint border border-brand-green/20">
          ইউজার প্যানেল
        </span>
      </div>

      {/* Right: Theme Toggle & User Profile Dropdown */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar className="h-9 w-9 border border-brand-primary/30 hover:ring-2 hover:ring-brand-primary/40 transition-all">
              <AvatarImage src="" alt="Hridoy Chowdhury" />
              <AvatarFallback className="bg-gradient-brand text-white font-bold text-xs">
                হচ
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-2 bg-card/95 backdrop-blur-xl border-border">
            <DropdownMenuLabel className="font-normal p-3">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold text-foreground">হৃদয় চৌধুরী</p>
                <p className="text-xs text-muted-foreground truncate">hridoy@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-4 h-4 text-muted-foreground" />
                <span>হোম পেজ</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/dashboard/profile" className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span>প্রোফাইল সেটিংস</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/recharge" className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-muted-foreground" />
                <span>রিচার্জ ওয়ালেট</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              <span>লগআউট</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}