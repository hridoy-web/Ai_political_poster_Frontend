"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavActiveLinkProps } from "../navbar.types";

const NavActiveLink = ({href, children, className, activeClassName}:NavActiveLinkProps) => {
    
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
       <Link href={href}
        className={cn(className, isActive && activeClassName)}>
            {children}
       </Link>
    )
};

export default NavActiveLink;