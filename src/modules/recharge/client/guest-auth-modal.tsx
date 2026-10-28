"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Lock,
  LogIn,
  Mail,
  Eye,
  EyeOff,
  UserPlus,
  ArrowRight,
  Loader2,
  AlertCircle,
  Zap,
} from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import authApi, { serverURL } from "@/lib/api/authApi";
import { toast } from "sonner";
import { toBengaliNumber } from "../utils";

interface GuestAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  planTitle?: string;
  amount?: number;
  onSuccessLogin?: (user: any) => void;
}

export function GuestAuthModal({
  isOpen,
  onClose,
  planTitle,
  amount,
  onSuccessLogin,
}: GuestAuthModalProps) {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const setUser = authContext?.setUser;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleModalClose = () => {
    setError("");
    setEmail("");
    setPassword("");
    onClose();
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!email.trim() || !email.includes("@")) {
      setError("অনুগ্রহ করে একটি সঠিক ইমেইল এড্রেস লিখুন");
      return;
    }

    if (!password) {
      setError("অনুগ্রহ করে আপনার পাসওয়ার্ড লিখুন");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.request({
        baseURL: serverURL,
        url: authApi.login.url,
        method: authApi.login.method,
        data: {
          email: email.trim(),
          password,
        },
        withCredentials: true,
      });

      const loggedInUser = res?.data?.data?.user;
      if (setUser && loggedInUser) {
        setUser(loggedInUser);
      }

      toast.success("লগইন সফল হয়েছে!");
      handleModalClose();
      onSuccessLogin?.(loggedInUser);
    } catch (err: unknown) {
      console.error("Modal login error:", err);
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "ইমেইল বা পাসওয়ার্ড সঠিক নয়। আবার চেষ্টা করুন।"
        );
      } else {
        setError("লগইন সম্পন্ন করা সম্ভব হয়নি। আবার চেষ্টা করুন।");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    handleModalClose();
    router.push("/register?redirect=/recharge");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleModalClose()}>
      <DialogContent className="sm:max-w-[420px] p-6 sm:p-7 border-border bg-card/95 backdrop-blur-xl shadow-2xl rounded-3xl">
        {/* Simple Header */}
        <DialogHeader className="text-center space-y-2.5 items-center">
          <div className="size-12 rounded-2xl bg-gradient-brand/10 border border-primary/20 text-primary flex items-center justify-center shadow-xs">
            <Lock className="size-5" />
          </div>

          <DialogTitle className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
            লগইন করুন
          </DialogTitle>

          <DialogDescription className="text-xs sm:text-sm text-muted-foreground leading-normal">
            প্যাকেজটি কিনতে আপনার অ্যাকাউন্টে লগইন করুন
          </DialogDescription>

          {/* Selected Plan Badge */}
          {amount && amount > 0 && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-xs font-bold text-primary shadow-2xs">
              <Zap className="size-3.5 shrink-0" />
              <span>
                প্যাকেজ: ৳{toBengaliNumber(amount)}
                {planTitle ? ` • ${planTitle}` : ""}
              </span>
            </div>
          )}
        </DialogHeader>

        {/* Clean Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 pt-2">
          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="modal-email" className="text-xs font-bold text-foreground">
              ইমেইল এড্রেস
            </Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                id="modal-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                disabled={loading}
                autoComplete="email"
                className="pl-10 h-11 rounded-xl border-border bg-background text-sm focus-visible:ring-primary"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <Label htmlFor="modal-password" className="text-xs font-bold text-foreground">
                পাসওয়ার্ড
              </Label>
              <Link
                href="/forgot-password"
                onClick={handleModalClose}
                className="text-[11px] font-semibold text-primary hover:underline"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                id="modal-password"
                type={showPassword ? "text" : "password"}
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                disabled={loading}
                autoComplete="current-password"
                className="pl-10 pr-10 h-11 rounded-xl border-border bg-background text-sm focus-visible:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-2.5 rounded-xl bg-destructive/10 border border-destructive/25 text-xs text-destructive font-medium flex items-center gap-2">
              <AlertCircle className="size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-brand hover:opacity-95 text-white font-bold h-11 text-sm rounded-xl cursor-pointer flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>লগইন করা হচ্ছে...</span>
              </>
            ) : (
              <>
                <LogIn className="size-4" />
                <span>লগইন করে এগিয়ে যান</span>
                <ArrowRight className="size-4 ml-0.5" />
              </>
            )}
          </Button>

          {/* Divider */}
          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase">
              <span className="bg-card px-2 text-muted-foreground font-semibold">
                অথবা
              </span>
            </div>
          </div>

          {/* Create Account Link */}
          <Button
            type="button"
            variant="outline"
            onClick={handleRegister}
            disabled={loading}
            className="w-full border-border hover:bg-accent font-semibold h-10 text-xs rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-colors text-foreground"
          >
            <UserPlus className="size-3.5 text-secondary" />
            <span>অ্যাকাউন্ট নেই? নতুন অ্যাকাউন্ট খুলুন</span>
          </Button>

          {/* Cancel */}
          <button
            type="button"
            onClick={handleModalClose}
            disabled={loading}
            className="w-full pt-1 text-center text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            এখন নয়, পরে করব
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
