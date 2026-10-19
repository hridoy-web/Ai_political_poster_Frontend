import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import { quickLinks } from "./footer-data";

export function FooterQuickLinks() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="h-4 w-1 rounded-full bg-brand-green dark:bg-brand-mint" />
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider font-heading">
          কুইক লিংকস
        </h3>
      </div>

      <ul className="flex flex-col gap-2">
        {quickLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-all duration-200 py-0.5"
            >
              <ChevronRight className="size-3 text-muted-foreground/50 group-hover:text-brand-green dark:group-hover:text-brand-mint group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
              <span className="transition-colors duration-200">{link.name}</span>
              {link.badge && (
                <span className="inline-flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary dark:text-brand-secondary border border-brand-primary/20 shrink-0">
                  <Sparkles className="size-2" />
                  <span>{link.badge}</span>
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}