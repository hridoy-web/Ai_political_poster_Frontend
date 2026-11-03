"use client";

import { useState, useTransition, type ChangeEvent, type SyntheticEvent } from "react";
import Link from "next/link";
import { Loader2, Lock, Mail, User } from "lucide-react";

import type { FieldErrors, RegisterInput } from "@/lib/type";

import { registerAction } from "../_action/authAction";
import FormField from "./formField";
import PasswordStrength from "./passwordStrength";
import ProfileImagePicker from "./profileImagePicker";
import { registerSchema, toFieldErrors } from "@/lib/validation/authValidation";

export default function RegisterForm() {
  const [form, setForm] = useState<RegisterInput>({ name: "", email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    setError("");
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;
    setError("");

    const parsed = registerSchema.safeParse(form);
    if (!parsed.success) {
      setFieldErrors(toFieldErrors(parsed.error));
      return;
    }
    setFieldErrors({});

    const data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("password", form.password);
    if (image) data.append("image", image);

    startTransition(async () => {
      const result = await registerAction(data);

      // সফল হলে server নিজেই redirect করে
      if (result && !result.success) {
        setFieldErrors(result.fieldErrors ?? {});
        setError(result.fieldErrors ? "" : result.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <ProfileImagePicker image={image} onChange={setImage} onError={setError} />

      <FormField
        name="name"
        label="Full name"
        icon={User}
        placeholder="Enter your full name"
        autoComplete="name"
        maxLength={100}
        value={form.name}
        onChange={handleChange}
        error={fieldErrors.name}
      />

      <FormField
        name="email"
        label="Email address"
        type="email"
        icon={Mail}
        placeholder="you@example.com"
        autoComplete="email"
        value={form.email}
        onChange={handleChange}
        error={fieldErrors.email}
      />

      <div>
        <FormField
          name="password"
          label="Password"
          type="password"
          icon={Lock}
          placeholder="At least 8 characters"
          autoComplete="new-password"
          aria-describedby="password-strength"
          value={form.password}
          onChange={handleChange}
          error={fieldErrors.password}
        />
        <PasswordStrength password={form.password} hasError={!!fieldErrors.password} />
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:py-3"
      >
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        {pending ? "Submitting..." : "Create account"}
      </button>

      <p className="text-center text-xs text-muted-foreground sm:text-sm">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}