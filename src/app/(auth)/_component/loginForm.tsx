"use client";

import { useState, useTransition, type ChangeEvent, type SyntheticEvent } from "react";
import Link from "next/link";
import { Lock, LogIn, Mail } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

import type { ActionState, FieldErrors, LoginInput } from "@/lib/type";

import { googleLoginAction, loginAction } from "../_action/authAction";
import FormField from "./formField";
import { loginSchema, toFieldErrors } from "@/lib/validation/authValidation";

export default function LoginForm() {
  const [form, setForm] = useState<LoginInput>({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    setError("");
  };

  // server  redirect 
  const handleResult = (result?: ActionState) => {
    if (result && !result.success) {
      setFieldErrors(result.fieldErrors ?? {});
      setError(result.fieldErrors ? "" : result.message);
    }
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;
    setError("");

    const parsed = loginSchema.safeParse(form);
    if (!parsed.success) {
      setFieldErrors(toFieldErrors(parsed.error));
      return;
    }
    setFieldErrors({});

    startTransition(async () => {
      handleResult(await loginAction(form));
    });
  };

  const handleGoogle = (credential?: string) => {
    if (!credential) {
      setError("Google দিয়ে লগইন করা যায়নি। আবার চেষ্টা করো।");
      return;
    }
    setError("");

    startTransition(async () => {
      handleResult(await googleLoginAction(credential));
    });
  };

  return (
    <>
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
            <LogIn className="h-5 w-5" />
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Welcome back</h2>
        </div>
        <p className="mt-2 text-xs leading-5 text-muted-foreground sm:text-sm">
          Log in to continue creating and sharing your posters.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-3">
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

        <FormField
          name="password"
          label="Password"
          type="password"
          icon={Lock}
          placeholder="Enter your password"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          error={fieldErrors.password}
          labelRight={
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-primary hover:underline sm:text-sm"
            >
              Forgot password?
            </Link>
          }
        />

        {error && (
          <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:py-3"
        >
          {pending ? "Logging in..." : "Login"}
        </button>

        <div className="flex items-center gap-3 py-1">
          <span className="h-px flex-1 bg-border" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-xs">
            or
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        {/* Google ID token (credential)*/}
        
<div className={`flex justify-center ${pending ? "pointer-events-none opacity-70" : ""}`}>
  <GoogleLogin
    onSuccess={(res) => handleGoogle(res.credential)}
    onError={() => setError("Google দিয়ে লগইন করা যায়নি। আবার চেষ্টা করো।")}
    text="continue_with"
    shape="pill"
    width="320"
  />
</div>

        <p className="text-center text-xs text-muted-foreground sm:text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Create account
          </Link>
        </p>
      </form>
    </>
  );
}