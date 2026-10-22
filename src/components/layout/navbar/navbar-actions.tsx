"use client";

import { NavbarDropdown } from "./navbar-dropdown";
import DesktopAuthButtons from "./desktop-auth-buttons";

export const loginBtnStyle =
  "cursor-pointer font-semibold rounded-full transition-all duration-200 px-4 text-muted-foreground hover:text-foreground hover:bg-muted";

export const registerBtnStyle =
  "cursor-pointer font-semibold rounded-full shadow-md transition-all duration-200 px-3 bg-gradient-brand text-primary-foreground hover:opacity-95";

export function NavbarActions() {
  return (
    <div className="flex items-center shrink-0">
      <NavbarDropdown />
      <DesktopAuthButtons />
    </div>
  );
}

export default NavbarActions;
