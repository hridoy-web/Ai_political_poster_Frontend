import Link from "next/link";

const legalLinks = [
  { name: "প্রাইভেসি পলিসি", href: "/privacy" },
  { name: "ব্যবহারের শর্তাবলী", href: "/terms" },
];

export function FooterLegalLinks() {
  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-widest font-heading">
        আইনি নোটিশ
      </h3>
      <ul className="flex flex-col gap-2.5 sm:gap-2">
        {legalLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex items-center text-xs sm:text-sm text-muted-foreground hover:text-brand-green dark:hover:text-brand-mint transition-colors duration-200 group"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green/40 dark:bg-brand-mint/50 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 mr-2 shrink-0 hidden sm:inline-block" />
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}