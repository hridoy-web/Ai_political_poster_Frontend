
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import NavActiveLink from "../client/nav-active-link";
import { AdminDropdownLinksProps } from "../navbar.types";
import { adminLinks } from "../navbar.constants";


export default function AdminDropdownLinks({
  isAdmin,
  isTemplateManager,
}: AdminDropdownLinksProps) {

     if (!isAdmin && !isTemplateManager) return null;

  const visibleLinks = adminLinks.filter((link) =>
    link.href === "/admin" ? isAdmin : isTemplateManager,
  );

  return (
    <>
      {visibleLinks.map(
        ({ name, href, icon: Icon, activeClassName, className }) => (
          <DropdownMenuItem
            key={href}
            asChild
            className="rounded-xl cursor-pointer"
          >
            <NavActiveLink
              href={href}
              className={`flex items-center w-full px-2.5 py-2 text-xs font-semibold transition-colors rounded-xl ${className}`}
              activeClassName={activeClassName}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span>{name}</span>
            </NavActiveLink>
          </DropdownMenuItem>
        ),
      )}
    </>
  );
}
