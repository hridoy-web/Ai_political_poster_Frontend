"use client";

import { useAuth } from "@/hooks/get-user-data";
import { ProfileEditForm } from "../client/profile-edit-form";
import { Loader2 } from "lucide-react";

export function UserProfileView() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-brand-primary" />
        <p className="text-sm text-muted-foreground">প্রোফাইল তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  const roleLabel = user?.roles?.includes("SUPER_ADMIN")
    ? "সুপার অ্যাডমিন"
    : user?.roles?.includes("ADMIN")
    ? "অ্যাডমিন"
    : user?.roles?.includes("TEMPLATE_MANAGER")
    ? "টেমপ্লেট ম্যানেজার"
    : "ভেরিফাইড ইউজার";

  const userProfileData = {
    name: user?.name || "ইউজার",
    phone: "01800000000",
    email: user?.email || "",
    avatarUrl: (user as any)?.avatar?.url || "",
    role: roleLabel,
  };

  return <ProfileEditForm user={userProfileData} />;
}