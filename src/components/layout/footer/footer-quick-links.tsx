import Link from "next/link";

const quickLinks = [
  { name: "হোম", href: "/" },
  { name: "টেমপ্লেট গ্যালারি", href: "/templates" },
  { name: "পোস্টার তৈরি করুন", href: "/create-poster" },
  { name: "রিচার্জ প্যাকেজ", href: "/recharge" },
  { name: "আমাদের সম্পর্কে", href: "/about" },
  { name: "যোগাযোগ", href: "/contact" },
  
];

export function FooterQuickLinks() {
  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-widest font-heading">
        কুইক লিংকস
      </h3>
      <ul className="grid grid-cols-2  lg:grid-cols-1 gap-2.5 sm:gap-2">
        {quickLinks.map((link) => (
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