import type { ChangeEvent } from "react";
import type { LucideIcon } from "lucide-react";

/* ================================================================
 * Global types
 * Import from anywhere:  import type { ... } from "@/types/type";
 * ================================================================ */

/* ---------------- Common ---------------- */

/** { fieldName: [error messages] } */
export type FieldErrors<T> = Partial<Record<keyof T, string[]>>;

/* ---------------- Auth: form data ---------------- */
/* Keep these in sync with loginSchema / registerSchema (authSchema.ts). */

export type LoginData = {
  email: string;
  password: string;
};

export type FormData_ = {
  name: string;
  email: string;
  password: string;
};

/* ---------------- Auth: session ---------------- */

export type SessionUser = {
  roles?: string[];
  roleNames?: string[];
  role?: string;
};

/* ---------------- Auth: password strength ---------------- */

export type StrengthScore = 0 | 1 | 2 | 3 | 4;

/* ---------------- Auth: register form component props ---------------- */

export type FieldProps = {
  id: string;
  label: string;
  icon: LucideIcon;
  type?: string;
  placeholder: string;
  autoComplete: string;
  maxLength?: number;
  value: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type ProfileImagePickerProps = {
  image: File | null;
  onChange: (file: File | null) => void;
  onError: (message: string) => void;
};

export type PasswordStrengthProps = {
  password: string;
  hasError: boolean;
};