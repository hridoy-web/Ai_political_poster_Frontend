
import { cn } from "@/lib/utils";
import { navLinks } from "../navbar.constants";
import NavActiveLink from "../client/nav-active-link";



export function DesktopNavMenu() {
  
  const activeLinkClass = "bg-brand-mint/15  text-brand-green font-bold  border border-brand-green/20 dark:bg-brand-mint/10 dark:text-brand-mint dark:border-brand-mint/30 dark:shadow-[0_0_12px_rgba(16,185,129,0.25)]";

  const inActiveLinkClass = "text-muted-foreground hover:text-brand-green hover:bg-brand-green/10 dark:hover:text-brand-mint dark:hover:bg-brand-mint/10";
 
  
  return (
    <nav className="hidden lg:flex items-center gap-1.5 lg:gap-2" aria-label="Main Navigation">
      {navLinks.map((link) => {
      
        return (
          <NavActiveLink
            key={link.href}
            href={link.href}
            className={cn(
              "relative px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-300 flex items-center cursor-pointer select-none",
                 inActiveLinkClass
            )}
            activeClassName ={ activeLinkClass}
          >
            <span>{link.name}</span>
          </NavActiveLink>
        );
      })}
    </nav>
  );
}