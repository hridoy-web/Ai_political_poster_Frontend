"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, signOut } from "firebase/auth";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, googleProvider } from "@/lib/firebase";
import { AuthContext } from "@/context/AuthContext";

import type { SessionUser } from "@/types/type";
import { LoginData, loginSchema } from "@/lib/validation/authValidation";
import { getApiErrorMessage, getRedirectPath, googleLoginRequest, loginRequest } from "../_action/authAction";


const POPUP_CANCEL_CODES = ["auth/popup-closed-by-user", "auth/cancelled-popup-request"];

export default function LoginForm() {
  const router = useRouter();
  const setUser = useContext(AuthContext)?.setUser;

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const busy = isSubmitting || googleLoading;

  const finishLogin = (user: SessionUser) => {
    setUser?.(user);
    router.push(getRedirectPath(user));
    router.refresh();
  };

  /* ---------- Email login ---------- */

  const onSubmit = async (data: LoginData) => {
    setError("");
    try {
      finishLogin(await loginRequest(data));
    } catch (err) {
      setError(getApiErrorMessage(err, "Login failed. Please try again."));
    }
  };

  /* ---------- Google login ---------- */

  const onGoogleLogin = async () => {
    setError("");

    if (!auth || !googleProvider) {
      setError("Google login is not configured. Please use email and password.");
      return;
    }

    setGoogleLoading(true);
    try {
      const credential = await signInWithPopup(auth, googleProvider);
      const idToken = await credential.user.getIdToken();
      await signOut(auth).catch(() => {}); // our own cookie is the session

      finishLogin(await googleLoginRequest(idToken));
    } catch (err) {
      const code = (err as { code?: string })?.code ?? "";
      if (POPUP_CANCEL_CODES.includes(code)) return; // user closed popup

      setError(getApiErrorMessage(err, "Google login failed. Please try again."));
    } finally {
      setGoogleLoading(false);
    }
  };

  /* ---------- UI ---------- */

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <p role="alert" className="text-xs text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link href="/forgot-password" className="text-xs font-semibold text-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            autoComplete="current-password"
            className="pr-10"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-3 text-muted-foreground hover:text-primary"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {errors.password && (
          <p role="alert" className="text-xs text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs uppercase text-muted-foreground">or</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <button
        type="button"
        onClick={onGoogleLogin}
        disabled={busy}
        className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-70"
      >
        <FcGoogle className="h-4 w-4" />
        {googleLoading ? "Signing in..." : "Continue with Google"}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Create account
        </Link>
      </p>
    </form>
  );
}