import {
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

export type QuickLink = { name: string; href: string; badge?: string };
export type LegalLink = { name: string; href: string };
export type SocialLink = { name: string; icon: IconType; href: string; color: string; hoverStyle: string };

export const quickLinks: QuickLink[] = [
  { name: "হোম", href: "/" },
  { name: "টেমপ্লেট গ্যালারি", href: "/templates" },
  { name: "পোস্টার তৈরি করুন", href: "/create-poster", badge: "নতুন AI" },
  { name: "যোগাযোগ ও সহায়তা", href: "/contact" },
];

export const legalLinks: LegalLink[] = [
  { name: "প্রাইভেসি পলিসি", href: "/privacy" },
  { name: "ব্যবহারের শর্তাবলী", href: "/terms" },
];

export const socialLinks: SocialLink[] = [
  {
    name: "Facebook",
    icon: FaFacebookF,
    href: "https://facebook.com",
    color: "text-[#1877F2]",
    hoverStyle: "hover:border-[#1877F2]/50 hover:bg-[#1877F2]/10 hover:shadow-[#1877F2]/20",
  },
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    href: "https://wa.me/8801700000000",
    color: "text-[#25D366]",
    hoverStyle: "hover:border-[#25D366]/50 hover:bg-[#25D366]/10 hover:shadow-[#25D366]/20",
  },
  {
    name: "X (Twitter)",
    icon: FaXTwitter,
    href: "https://twitter.com",
    color: "text-foreground",
    hoverStyle: "hover:border-foreground/40 hover:bg-foreground/10",
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    href: "https://youtube.com",
    color: "text-[#FF0000]",
    hoverStyle: "hover:border-[#FF0000]/50 hover:bg-[#FF0000]/10 hover:shadow-[#FF0000]/20",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    href: "https://linkedin.com",
    color: "text-[#0A66C2]",
    hoverStyle: "hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 hover:shadow-[#0A66C2]/20",
  },
];
