import {
  LayoutDashboard,
  Image as ImageIcon,
  Layers,
  ReceiptText,
  Users,
  LucideIcon,
} from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { name: "ওভারভিউ", href: "/admin", icon: LayoutDashboard },
  { name: "পোস্টার মডারেশন", href: "/admin/posters", icon: ImageIcon },
  { name: "টেমপ্লেট ম্যানেজার", href: "/admin/templates", icon: Layers },
  { name: "ট্রানজেকশনসমূহ", href: "/admin/transactions", icon: ReceiptText },
  { name: "ইউজার লিস্ট", href: "/admin/users", icon: Users },
];