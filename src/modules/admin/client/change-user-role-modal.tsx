"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AdminService } from "../admin.service";
import { SystemRole, UserRoleType } from "../admin.types";
import { Crown, ShieldCheck, Layers, User, Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ChangeUserRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userName: string;
  userEmail: string;
  currentRole: UserRoleType;
}

const ROLE_ICONS: Record<string, any> = {
  SUPER_ADMIN: Crown,
  ADMIN: ShieldCheck,
  TEMPLATE_MANAGER: Layers,
  USER: User,
};

const ROLE_STYLES: Record<
  string,
  { border: string; bg: string; text: string; label: string }
> = {
  SUPER_ADMIN: {
    border: "border-amber-500/50",
    bg: "bg-amber-500/10",
    text: "text-amber-500",
    label: "সুপার অ্যাডমিন (Super Admin)",
  },
  ADMIN: {
    border: "border-rose-500/50",
    bg: "bg-rose-500/10",
    text: "text-rose-500",
    label: "অ্যাডমিন (Admin)",
  },
  TEMPLATE_MANAGER: {
    border: "border-emerald-500/50",
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    label: "টেমপ্লেট ম্যানেজার (Template Manager)",
  },
  USER: {
    border: "border-slate-500/50",
    bg: "bg-slate-500/10",
    text: "text-slate-400",
    label: "সাধারণ ব্যবহারকারী (Standard User)",
  },
};

export function ChangeUserRoleModal({
  isOpen,
  onClose,
  userId,
  userName,
  userEmail,
  currentRole,
}: ChangeUserRoleModalProps) {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRoleType>(currentRole);
  const [roles, setRoles] = useState<SystemRole[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setSelectedRole(currentRole);
  }, [currentRole, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setLoadingRoles(true);
      AdminService.getRoles()
        .then((res) => {
          if (res && res.length > 0) {
            setRoles(res);
          }
        })
        .finally(() => setLoadingRoles(false));
    }
  }, [isOpen]);

  const handleSaveRole = async () => {
    if (selectedRole === currentRole) {
      onClose();
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await AdminService.updateUserRole(userId, selectedRole);
      if (success) {
        toast.success(
          `ইউজার '${userName}'-এর রোল সফলভাবে '${selectedRole}'-এ পরিবর্তিত হয়েছে!`
        );
        onClose();
        router.refresh();
      } else {
        toast.error("রোল পরিবর্তন করতে ব্যর্থ হয়েছে।");
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.message || err.message || "রোল পরিবর্তন ব্যর্থ হয়েছে।";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-3xl border border-border/80 bg-card/95 backdrop-blur-2xl shadow-2xl p-6">
        <DialogHeader className="space-y-1.5 text-left">
          <DialogTitle className="text-lg font-bold text-foreground flex items-center gap-2">
            <Crown className="size-5 text-amber-500" />
            <span>ইউজার রোল পরিবর্তন করুন</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{userName}</span> (
            <span className="font-mono text-[11px]">{userEmail}</span>)-এর জন্য নতুন
            সিস্টেম রোল নির্ধারণ করুন।
          </DialogDescription>
        </DialogHeader>

        {loadingRoles ? (
          <div className="py-8 flex flex-col items-center justify-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="size-5 animate-spin text-brand-primary" />
            <span>সিস্টেম রোল তালিকা লোড হচ্ছে...</span>
          </div>
        ) : (
          <div className="space-y-2.5 py-3">
            {roles.map((role) => {
              const roleKey = role.name as UserRoleType;
              const isSelected = selectedRole === roleKey;
              const Icon = ROLE_ICONS[roleKey] || User;
              const style =
                ROLE_STYLES[roleKey] || ROLE_STYLES.USER;

              return (
                <button
                  key={role.id || role.name}
                  type="button"
                  onClick={() => setSelectedRole(roleKey)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? `${style.border} ${style.bg} shadow-xs ring-2 ring-brand-primary/20`
                      : "border-border/60 hover:border-brand-primary/40 bg-muted/20 hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`size-9 rounded-xl flex items-center justify-center shrink-0 border ${style.border} ${style.bg} ${style.text}`}
                    >
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                        <span>{style.label}</span>
                      </h4>
                      <p className="text-[11px] text-muted-foreground">
                        {role.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`size-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "border-brand-primary bg-brand-primary text-white"
                        : "border-border"
                    }`}
                  >
                    {isSelected && <Check className="size-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-border/40">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-xl text-xs h-9 px-4"
          >
            বাতিল
          </Button>
          <Button
            type="button"
            onClick={handleSaveRole}
            disabled={isSubmitting || loadingRoles}
            className="bg-gradient-brand text-white font-bold text-xs h-9 px-5 rounded-xl shadow-md gap-2 cursor-pointer hover:opacity-95"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                <span>সংরক্ষণ হচ্ছে...</span>
              </>
            ) : (
              <span>রোল আপডেট করুন</span>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
