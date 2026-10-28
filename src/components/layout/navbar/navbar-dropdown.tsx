"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import {
  Home,
  LayoutDashboard,
  Settings,
  LogOut,
  FileText,
  Wallet,
  LogIn,
  UserPlus,
  User,
  Layers,
  Bookmark,
  ReceiptText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavbarAvatar } from "./navbar-avatar";
import { useAuth } from "@/hooks/get-user-data";
import authApi, { serverURL } from "@/lib/api/authApi";
import { loginBtnStyle, registerBtnStyle } from "./navbar-actions";

const userDropdownLinks = [
  { name: "হোম পেজ", href: "/", icon: Home },
  { name: "ড্যাশবোর্ড", href: "/dashboard", icon: LayoutDashboard },
  { name: "আমার পোস্টারসমূহ", href: "/dashboard/posters", icon: FileText },
  { name: "সংরক্ষিত পোস্টার", href: "/dashboard/saved", icon: Bookmark },
  { name: "লেনদেনের ইতিহাস", href: "/dashboard/history", icon: ReceiptText },
  { name: "প্রোফাইল সেটিংস", href: "/dashboard/profile", icon: Settings },
  { name: "রিচার্জ ওয়ালেট", href: "/recharge", icon: Wallet },
];

export function NavbarDropdown() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser, isTemplateManager } = useAuth();
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {user?.email ? (
          <Button
            variant="ghost"
            aria-label="ইউজার প্রোফাইল মেনু"
            className="size-8 rounded-full p-0 ring-2 ring-brand-green/20 dark:ring-brand-mint/30 hover:ring-brand-green dark:hover:ring-brand-mint transition-all duration-300 shadow-sm cursor-pointer shrink-0"
          >
            <NavbarAvatar />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            aria-label="লগইন বা রেজিস্টার মেনু"
            className="lg:hidden size-8 rounded-full hover:bg-brand-green/10 dark:hover:bg-brand-mint/15 text-muted-foreground hover:text-foreground transition-all duration-300 cursor-pointer shrink-0"
          >
            <User className="size-4" />
          </Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 mt-2 bg-card/95 backdrop-blur-xl border-border rounded-2xl p-1.5 shadow-xl font-sans"
      >
        {user?.email ? (
          <>
            <DropdownMenuLabel className="font-normal p-2.5">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold text-foreground font-heading">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />

            <DropdownMenuGroup className="space-y-0.5">
              {userDropdownLinks.map(({ name, href, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <DropdownMenuItem key={href} asChild className="rounded-xl cursor-pointer">
                    <Link
                      href={href}
                      className={cn(
                        "flex items-center w-full px-2.5 py-2 text-xs font-medium transition-colors",
                        isActive
                          ? "bg-brand-green/10 text-brand-green font-bold dark:bg-brand-mint/15 dark:text-brand-mint"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{name}</span>
                    </Link>
                  </DropdownMenuItem>
                );
              })}

              {isTemplateManager && (
                <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                  <Link
                    href="/admin/templates"
                    className={cn(
                      "flex items-center w-full px-2.5 py-2 text-xs font-semibold transition-colors rounded-xl",
                      pathname.startsWith("/admin")
                        ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold"
                        : "text-rose-600 dark:text-rose-400 hover:bg-rose-500/10"
                    )}
                  >
                    <Layers className="mr-2 h-4 w-4 text-rose-500" />
                    <span>টেমপ্লেট ম্যানেজার</span>
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="rounded-xl cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>{isLoggingOut ? "লগআউট হচ্ছে..." : "লগআউট"}</span>
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
  );
}

export default NavbarDropdown;
