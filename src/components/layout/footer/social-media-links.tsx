import { Mail } from "lucide-react";
import { socialLinks } from "./footer-data";

export function SocialMediaLinks() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="h-4 w-1 rounded-full bg-brand-green dark:bg-brand-mint" />
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider font-heading">
          ফলো করুন
        </h3>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        আমাদের সাথে যুক্ত হয়ে নতুন টেমপ্লেট ও ক্যাম্পেইন আপডেট পান।
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className={`group size-9 rounded-full border border-border/50 bg-muted/20 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer ${social.color} ${social.hoverStyle}`}
            >
              <Icon className="size-4 transition-transform duration-200 group-hover:scale-110" />
            </a>
          );
        })}
      </div>

      <a
        href="mailto:support@posterai.com"
        className="group inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        <Mail className="size-3.5 text-muted-foreground/70 group-hover:text-brand-green dark:group-hover:text-brand-mint transition-colors" />
        <span className="font-medium underline-offset-4 group-hover:underline">
          support@posterai.com
        </span>
      </a>
    </div>
  );
}