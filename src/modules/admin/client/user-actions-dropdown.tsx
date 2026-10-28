"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Lock, Ban, CheckCircle } from "lucide-react";

import { useRouter } from "next/navigation";
import { AdminService } from "../admin.service";
import { toast } from "sonner";

interface UserActionsDropdownProps {
  userId: string;
  currentStatus: "ACTIVE" | "BLOCKED" | "BANNED" | string;
}

export function UserActionsDropdown({ userId, currentStatus }: UserActionsDropdownProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAction = async (actionType: "BLOCK" | "BAN" | "UNBLOCK") => {
    try {
      setLoading(true);
      const newStatus = actionType === "UNBLOCK" ? "ACTIVE" : "BLOCKED";
      const success = await AdminService.updateUserStatus(userId, newStatus);
      if (success) {
        toast.success(
          actionType === "UNBLOCK"
            ? "ইউজার সফলভাবে সক্রিয় করা হয়েছে!"
            : "ইউজার সফলভাবে ব্লক করা হয়েছে!"
        );
        router.refresh();
      } else {
        toast.error("ইউজার স্ট্যাটাস পরিবর্তন করতে সমস্যা হয়েছে।");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl border border-border/40 hover:bg-accent">
          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-48 rounded-2xl border-border/80 bg-card/95 backdrop-blur-xl shadow-lg p-1.5 space-y-0.5">
        <DropdownMenuLabel className="text-xs font-semibold px-2 py-1.5 text-muted-foreground">
          ইউজার অ্যাকশন
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 border-border/40" />

        {currentStatus === "ACTIVE" ? (
          <>
            <DropdownMenuItem
              onClick={() => handleAction("BLOCK")}
              disabled={loading}
              className="gap-2.5 cursor-pointer text-xs font-semibold rounded-xl text-brand-primary focus:text-brand-primary focus:bg-brand-primary/10 p-2 transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-brand-primary" />
              <span>সাময়িক ব্লক করুন</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handleAction("BAN")}
              disabled={loading}
              className="gap-2.5 cursor-pointer text-xs font-semibold rounded-xl text-destructive focus:text-destructive focus:bg-destructive/10 p-2 transition-colors"
            >
              <Ban className="w-3.5 h-3.5 text-destructive" />
              <span>স্থায়ী ব্যান করুন</span>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem
            onClick={() => handleAction("UNBLOCK")}
            disabled={loading}
            className="gap-2.5 cursor-pointer text-xs font-semibold rounded-xl text-brand-mint focus:text-brand-mint focus:bg-brand-green/10 p-2 transition-colors"
          >
            <CheckCircle className="w-3.5 h-3.5 text-brand-mint" />
            <span>অ্যাক্টিভ/আনব্লক করুন</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}