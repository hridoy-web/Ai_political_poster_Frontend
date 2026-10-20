import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { legalLinks } from "./footer-data";

export function FooterLegalLinks() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="h-4 w-1 rounded-full bg-brand-primary dark:bg-brand-secondary" />
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider font-heading">
          আইনি ও পলিসি
        </h3>
      </div>

      <ul className="flex flex-col gap-2.5">
        {legalLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-all duration-200 py-0.5"
            >
              <ChevronRight className="size-3.5 text-muted-foreground/60 group-hover:text-brand-primary dark:group-hover:text-brand-secondary group-hover:translate-x-1 transition-all duration-200 shrink-0" />
              <span className="transition-colors duration-200 font-medium">{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="pt-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-muted/40 border border-border/60 text-muted-foreground text-[11px]">
          <ShieldCheck className="size-3.5 text-brand-green dark:text-brand-mint shrink-0" />
          <span>সুরক্ষিত ও ভেরিফাইড ডেটা</span>
        </div>
      </div>
    </div>
  );
}