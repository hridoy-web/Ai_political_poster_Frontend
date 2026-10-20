import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { FooterQuickLinks } from "./footer-quick-links";
import { FooterLegalLinks } from "./footer-legal-links";
import { SocialMediaLinks } from "./social-media-links";
import Copyright from "./copyright";

export function MainFooter() {
  return (
    <footer className="w-full relative overflow-hidden bg-background border-t border-border/50 mt-auto">
      {/* Top Gradient Accent Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-brand-green/40 dark:via-brand-mint/40 to-transparent" />
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-48 bg-brand-green/10 dark:bg-brand-mint/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-1/4 translate-x-1/2 w-96 h-48 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 pt-10 sm:pt-14 pb-6">

        {/* Main Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-border/60">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
              <Logo />
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              বাংলাদেশের প্রথম রাজনৈতিক এআই পোস্টার মেকার। তৃণমূল কর্মী থেকে জাতীয় নেতা—সবার জন্য আধুনিক ডিজিটাল প্রচারণার সমাধান।
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/40 border border-border/60 text-xs text-muted-foreground">
              <span className="relative flex size-2 shrink-0">
                <span className="animate-ping absolute inline-flex size-full rounded-full bg-brand-green dark:bg-brand-mint opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-brand-green dark:bg-brand-mint" />
              </span>
              <span className="font-medium">এআই ইঞ্জিন ১০০% সচল</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <FooterQuickLinks />
          </div>

          {/* Legal Links */}
          <div className="col-span-1">
            <FooterLegalLinks />
          </div>

          {/* Social Media */}
          <div className="col-span-2 lg:col-span-1">
            <SocialMediaLinks />
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-4">
          <Copyright />
        </div>
      </div>
    </footer>
  );
}