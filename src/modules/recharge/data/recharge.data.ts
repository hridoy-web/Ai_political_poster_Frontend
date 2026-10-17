import type { Metadata } from "next";
import { ShieldCheck, Zap } from "lucide-react";
import type { PackagePlan, PaymentGateway, TrustBadgeItem } from "../types";

export const rechargeMetadata: Metadata = {
  title: "কুইক ওয়ালেট রিচার্জ | PosterAI",
  description:
    "সহজেই এবং তাৎক্ষণিকভাবে রিচার্জ করুন পোস্টার ওয়ালেট। আকর্ষণীয় প্যাকেজে ফ্রি বোনাস পোস্টার সহ প্রিমিয়াম এআই পলিটিক্যাল টেমপ্লেট আনলক করুন।",
  keywords: [
    "PosterAI Wallet",
    "Wallet Recharge",
    "Political Poster Pricing",
    "পোস্টার রিচার্জ",
    "নির্বাচনী পোস্টার মেকার",
  ],
};

export const PRESET_PACKAGES: PackagePlan[] = [
  {
    id: "starter",
    nameBangla: "মিনিমাম প্যাক",
    nameEnglish: "Starter Pack",
    amount: 20,
    posters: 20,
    freePosters: 0,
    totalPosters: 20,
    tag: "স্টার্টার প্যাক",
    isPopular: false,
    features: [
      "২০টি পোস্টার তৈরির সুযোগ (প্রতিটি ১ টাকা)",
    ],
    bonusText: "কোনো অতিরিক্ত চার্জ বা ওয়াটারমার্ক ছাড়া সাধারণ ডাউনলোড।",
  },
  {
    id: "campaign",
    nameBangla: "পপুলার ক্যাম্পেইন প্যাক",
    nameEnglish: "Campaign Booster Pack",
    amount: 50,
    posters: 50,
    freePosters: 10,
    totalPosters: 60,
    tag: "সবচেয়ে জনপ্রিয়",
    isPopular: true,
    features: [
      "৫০টি পোস্টার তৈরির সুযোগ + ১০টি পোস্টার সম্পূর্ণ ফ্রি! (মোট ৬০টি)",
      "সমস্ত প্রিমিয়াম টেমপ্লেট এবং এআই স্লোগান জেনারেটরের আনলিমিটেড অ্যাক্সেস",
    ],
    bonusText: "১০টি পোস্টার সম্পূর্ণ ফ্রি! (মোট ৬০টি)",
  },
  {
    id: "pro",
    nameBangla: "প্রো পলিটিক্যাল প্যাক",
    nameEnglish: "Pro Political Package",
    amount: 100,
    posters: 100,
    freePosters: 25,
    totalPosters: 125,
    tag: "সেরা ভ্যালু (২৫% ফ্রি)",
    isBestValue: true,
    features: [
      "১০০টি পোস্টার তৈরির সুযোগ + ২৫টি পোস্টার সম্পূর্ণ ফ্রি! (মোট ১২৫টি)",
      "সমস্ত প্রিমিয়াম টেমপ্লেট এবং এআই স্লোগান জেনারেটরের আনলিমিটেড অ্যাক্সেস",
    ],
    bonusText: "২৫টি পোস্টার সম্পূর্ণ ফ্রি! (মোট ১২৫টি)",
  },
];

export const QUICK_AMOUNTS: number[] = [20, 50, 100];

export const TRUST_BADGES: TrustBadgeItem[] = [
  {
    id: "secure",
    icon: ShieldCheck,
    iconColor: "text-secondary",
    label: "১০০% নিরাপদ ট্রানজেকশন",
  },
  {
    id: "instant",
    icon: Zap,
    iconColor: "text-primary",
    label: "তাৎক্ষণিক ব্যালেন্স অ্যাক্টিভেশন",
  },
];

export const PAYMENT_GATEWAYS: PaymentGateway[] = [
  { id: "bkash", name: "বিকাশ (bKash)", badge: "তাৎক্ষণিক" },
  { id: "nagad", name: "নগদ (Nagad)", badge: "তাৎক্ষণিক" },
  { id: "card", name: "কার্ড / অন্যান্য", badge: "অনলাইন" },
];
