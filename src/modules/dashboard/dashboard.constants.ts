import {
  LayoutDashboard,
  Image as ImageIcon,
  Bookmark,
  ReceiptText,
  User,
  LucideIcon,
} from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export const USER_NAV_ITEMS: NavItem[] = [
  { name: "ওভারভিউ", href: "/dashboard", icon: LayoutDashboard },
  { name: "মাই পোস্টার্স", href: "/dashboard/posters", icon: ImageIcon },
  { name: "বুকমার্কস", href: "/dashboard/saved", icon: Bookmark },
  { name: "ট্রানজেকশন", href: "/dashboard/history", icon: ReceiptText },
  { name: "প্রোফাইল সেটিংস", href: "/dashboard/profile", icon: User },
];