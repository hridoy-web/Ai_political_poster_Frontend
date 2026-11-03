import { CheckCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PASSWORD_REQUIREMENTS, STRENGTH_BAR_COLORS, STRENGTH_TEXTS } from "@/lib/validation/authValidation";

type Props = {
  password: string;
  hasError?: boolean;
};

export default function PasswordStrength({ password, hasError = false }: Props) {
  if (!password && !hasError) return null;

  const requirements = PASSWORD_REQUIREMENTS.map((req) => ({
    text: req.text,
    met: req.regex.test(password),
  }));
  const score = requirements.filter((r) => r.met).length;

  return (
    <div
      id="password-strength"
      aria-live="polite"
      className="mt-2.5 rounded-xl border border-border bg-muted/40 p-3"
    >
      <div className="flex w-full justify-between gap-1.5">
        {STRENGTH_BAR_COLORS.map((color, i) => (
          <span
            key={color}
            className={cn(
              "h-1.5 w-full rounded-full transition-colors",
              score >= i + 1 ? color : "bg-muted",
            )}
          />
        ))}
      </div>

      <p className="mt-2 flex justify-between text-xs font-medium">
        <span>Must contain:</span>
        <span>{STRENGTH_TEXTS[score]}</span>
      </p>

      <ul
        className="mt-2 grid grid-cols-1 gap-x-3 gap-y-1.5 min-[420px]:grid-cols-2"
        aria-label="Password requirements"
      >
        {requirements.map((req) => (
          <li key={req.text} className="flex items-center gap-1.5">
            {req.met ? (
              <CheckCheck size={14} className="shrink-0 text-emerald-500" />
            ) : (
              <X
                size={14}
                className={cn(
                  "shrink-0",
                  hasError ? "text-destructive" : "text-muted-foreground/80",
                )}
              />
            )}
            <span
              className={cn(
                "text-xs leading-4",
                req.met
                  ? "text-emerald-600"
                  : hasError
                    ? "text-destructive"
                    : "text-muted-foreground",
              )}
            >
              {req.text}
              <span className="sr-only">
                {req.met ? " - Requirement met" : " - Requirement not met"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}