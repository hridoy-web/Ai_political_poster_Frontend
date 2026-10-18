import { FaFacebookF, FaXTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa6";

const socialLinks = [
  {
    name: "Facebook",
    icon: FaFacebookF,
    href: "https://facebook.com",
    // ফেসবুক অরিজিনাল কালার ও হোভার ইফেক্ট
    brandColor: "text-[#1877F2] hover:bg-[#1877F2]/10 hover:border-[#1877F2]/30",
  },
  {
    name: "Twitter",
    icon: FaXTwitter,
    href: "https://twitter.com",
    // টুইটার/X অরিজিনাল কালার ও হোভার ইফেক্ট
    brandColor: "text-[#0F1419] dark:text-[#E7E9EA] hover:bg-[#0F1419]/10 dark:hover:bg-[#E7E9EA]/10 hover:border-current",
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    href: "https://youtube.com",
    // ইউটিউব অরিজিনাল কালার ও হোভার ইফেক্ট
    brandColor: "text-[#FF0000] hover:bg-[#FF0000]/10 hover:border-[#FF0000]/30",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    href: "https://linkedin.com",
    // লিঙ্কডইন অরিজিনাল কালার ও হোভার ইফেক্ট
    brandColor: "text-[#0A66C2] hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/30",
  },
];

export function SocialMediaLinks() {
  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-widest">
        সোশ্যাল মিডিয়া
      </h3>
      <div className="flex items-center gap-2.5 sm:gap-3">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className={`size-9 sm:size-10 rounded-xl bg-background/80 border border-border flex items-center justify-center transition-all duration-300 transform hover:-translate-y-0.5 shadow-xs ${social.brandColor}`}
            >
              <Icon className="size-4 sm:size-4.5" />
            </a>
          );
        })}
      </div>
    </div>
  );
}