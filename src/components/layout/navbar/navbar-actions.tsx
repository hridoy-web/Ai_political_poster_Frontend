"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings, LogOut, FileText, LogIn, UserPlus, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {DropdownMenu,DropdownMenuContent,DropdownMenuGroup,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { NavbarAvatar } from "./navbar-avatar";
import { isAuthenticated } from "./main-navbar";
import DesktopAuthButtons from "./desktop-auth-buttons";

const demoUser = { name: "আবুল বাশার", email: "bashar@example.com" };

const userDropdownLinks = [
  { name: "ড্যাশবোর্ড", href: "/dashboard", icon: LayoutDashboard },
  { name: "আমার পোস্টারসমূহ", href: "/dashboard/posters", icon: FileText },
  { name: "প্রোফাইল সেটিংস", href: "/dashboard/profile", icon: Settings },
];

export const loginBtnStyle =
  "cursor-pointer font-semibold rounded-full transition-all duration-200 px-4 text-muted-foreground hover:text-foreground hover:bg-muted";

export const registerBtnStyle =
  "cursor-pointer font-semibold rounded-full shadow-md transition-all duration-200 px-3 bg-gradient-brand text-primary-foreground hover:opacity-95";

export function NavbarActions() {
  const pathname = usePathname();

  return (
    <div className="flex items-center shrink-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {isAuthenticated ? (
            <Button
              variant="ghost"
              className="size-8 sm:size-9 rounded-full p-0 ring-2 ring-brand-green/20 dark:ring-brand-mint/30 hover:ring-brand-green dark:hover:ring-brand-mint transition-all duration-300 shadow-sm cursor-pointer shrink-0"
              aria-label="ইউজার প্রোফাইল মেনু"
            >
              <NavbarAvatar />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-full hover:bg-brand-green/10 dark:hover:bg-brand-mint/15 text-muted-foreground hover:text-foreground transition-all duration-300 cursor-pointer shrink-0 lg:hidden"
              aria-label="লগইন বা রেজিস্টার মেনু"
            >
              <User className="size-4" />
            </Button>
          )}
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 mt-2 bg-card/95 backdrop-blur-xl border-border rounded-2xl p-1.5 shadow-xl font-sans" align="end">
          {isAuthenticated ? (
            <>
              <DropdownMenuLabel className="font-normal p-2.5">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold text-foreground font-heading">{demoUser.name}</p>
                  <p className="text-xs text-muted-foreground">{demoUser.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />

              <DropdownMenuGroup className="space-y-0.5">
                {userDropdownLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <DropdownMenuItem key={item.href} asChild className="rounded-xl cursor-pointer">
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center w-full px-2.5 py-2 text-xs font-medium transition-colors",
                          isActive
                            ? "bg-brand-green/10 text-brand-green font-bold dark:bg-brand-mint/15 dark:text-brand-mint"
                            : "text-foreground hover:bg-muted"
                        )}
                      >
                        <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{item.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="rounded-xl cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>লগআউট</span>
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuGroup className="flex flex-col gap-1.5 p-1">
              <Button asChild variant="ghost" size="sm" className={cn("w-full justify-start", loginBtnStyle)}>
                <Link href="/login" className="flex items-center">
                  <LogIn className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>লগইন</span>
                </Link>
              </Button>

              <Button asChild size="sm" className={cn("w-full justify-center", registerBtnStyle)}>
                <Link href="/register" className="flex items-center justify-center">
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>রেজিস্ট্রেশন</span>
                </Link>
              </Button>
            </DropdownMenuGroup>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <DesktopAuthButtons />
    </div>
  );
}

export default NavbarActions;