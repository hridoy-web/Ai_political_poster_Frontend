import { Logo } from "@/components/brand/logo";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { FooterQuickLinks } from "./footer-quick-links";
import { FooterLegalLinks } from "./footer-legal-links";
import { SocialMediaLinks } from "./social-media-links";
import Copyright from "./copyright";


export function MainFooter() {
  return (
    <footer className=" px-4 sm:px-6 lg:px-14 w-full mx-auto max-w-7xl border-t border-border/80 bg-card/40 backdrop-blur-xl text-card-foreground mt-auto relative overflow-hidden ">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-linear-to-r from-brand-primary/10 via-brand-green/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto  pt-10 sm:pt-14 pb-6 sm:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-8 sm:pb-10 border-b border-border/60">
          
          {/* Brand Info Section */}
          <div className="md:col-span-12 lg:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <Logo />
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              রাজনৈতিক দল এবং দলের কর্মীদের জন্য এআই-চালিত আধুনিক পোস্টার, ব্যানার ও নির্বাচনী প্রচারণা ডিজাইন তৈরির নির্ভরযোগ্য প্ল্যাটফর্ম।
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/10 text-brand-green dark:text-brand-mint text-xs font-semibold border border-brand-green/20">
              <Sparkles className="size-3.5 shrink-0" />
              <span>এআই-স্মার্ট পোস্টার মেকার</span>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="md:col-span-4 lg:col-span-3">
            <FooterQuickLinks />
          </div>

          {/* Legal Section */}
          <div className="md:col-span-4 lg:col-span-2">
            <FooterLegalLinks />
          </div>

          {/* Social Media Section */}
          <div className="md:col-span-4 lg:col-span-2">
            <SocialMediaLinks />
          </div>
        </div>

        {/* Bottom Section: Centered Copyright */}
        <div className="pt-6 flex justify-center text-center text-xs text-muted-foreground">
          <Copyright />
        </div>
      </div>
    </footer>
  );
}