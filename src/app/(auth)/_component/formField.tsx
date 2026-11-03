"use client";

import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const inputClass =
  "h-auto w-full rounded-xl border border-input bg-background/80 px-3.5 py-2 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-ring/10 aria-invalid:border-destructive sm:py-2.5";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  icon?: LucideIcon;
  error?: string;
  labelRight?: ReactNode; // যেমন "Forgot password?"
};

export default function FormField({
  name,
  label,
  icon: Icon,
  error,
  labelRight,
  type = "text",
  className,
  ...props
}: Props) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <Label htmlFor={name} className="block text-xs font-semibold sm:text-sm">
          {label}
        </Label>
        {labelRight}
      </div>

      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        )}

        <Input
          id={name}
          name={name}
          type={isPassword && show ? "text" : type}
          aria-invalid={!!error}
          className={cn(inputClass, Icon && "pl-10", isPassword && "pr-16", className)}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            aria-label={show ? "Hide password" : "Show password"}
            aria-pressed={show}
            className="absolute inset-y-0 right-3 flex items-center gap-1 text-xs font-medium text-muted-foreground transition hover:text-primary sm:text-sm"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span>{show ? "Hide" : "Show"}</span>
          </button>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}