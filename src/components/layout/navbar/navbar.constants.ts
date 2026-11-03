import {
  Home,
  LayoutDashboard,
  Settings,
  FileText,
  Wallet,
  Bookmark,
  ReceiptText,
  Layers,
} from "lucide-react";
import { NavLink, UserDropdownLink } from "./navbar.types";

export const userDropdownLinks: UserDropdownLink[] = [
  { name: "হোম পেজ", href: "/", icon: Home },
  { name: "ড্যাশবোর্ড", href: "/dashboard", icon: LayoutDashboard },
  { name: "আমার পোস্টারসমূহ", href: "/dashboard/posters", icon: FileText },
  { name: "সংরক্ষিত পোস্টার", href: "/dashboard/saved", icon: Bookmark },
  { name: "লেনদেনের ইতিহাস", href: "/dashboard/history", icon: ReceiptText },
  { name: "প্রোফাইল সেটিংস", href: "/dashboard/profile", icon: Settings },
  { name: "রিচার্জ ওয়ালেট", href: "/recharge", icon: Wallet },
];


export const navLinks: NavLink[] = [
  { name: "হোম", href: "/" },
  { name: "টেমপ্লেট গ্যালারি", href: "/templates" },
  { name: "আমাদের সম্পর্কে", href: "/about" },
  { name: "রিচার্জ প্যাক", href: "/recharge" },
];


export const adminLinks = [
  {
    name: "অ্যাডমিন প্যানেল",
    href: "/admin",
    icon: LayoutDashboard,
    activeClassName:
      "bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold",
    className: "text-amber-600 dark:text-amber-400 hover:bg-amber-500/10",
  },
  {
    name: "টেমপ্লেট ম্যানেজার",
    href: "/admin/templates",
    icon: Layers,
    activeClassName:
      "bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold",
    className: "text-rose-600 dark:text-rose-400 hover:bg-rose-500/10",
  },
];

export const mockUser = {
  name:"Rakib Gazi",
  email:"rakib@gazi.com"
}

