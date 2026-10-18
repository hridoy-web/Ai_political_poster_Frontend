"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      
      size="sm"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative w-11 lg:w-auto rounded-full lg:rounded-md px-1.5  cursor-pointer bg-muted/60 dark:bg-muted/40 hover:bg-brand-green/10 dark:hover:bg-brand-mint/15 transition-all duration-300 border border-border/50 shadow-xs"
      aria-label="Toggle theme"
    >
      <Sun className="size-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-amber-500 dark:text-foreground" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-foreground dark:text-brand-mint" />
    </Button>
  );
}