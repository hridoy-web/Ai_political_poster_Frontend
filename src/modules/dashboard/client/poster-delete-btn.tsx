"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { DashboardService } from "../dashboard.service";
import { toast } from "sonner";

interface PosterDeleteBtnProps {
  posterId: string;
}

export function PosterDeleteBtn({ posterId }: PosterDeleteBtnProps) {
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই পোস্টারটি মুছে ফেলতে চান?")) return;

    setIsPending(true);
    try {
      const ok = await DashboardService.deletePoster(posterId);
      if (ok) {
        toast.success("পোস্টারটি সফলভাবে মুছে ফেলা হয়েছে!");
        window.location.reload();
      } else {
        toast.error("পোস্টারটি মুছতে ব্যর্থ হয়েছে।");
      }
    } catch (err: any) {
      console.error("Poster delete error:", err);
      toast.error(err.response?.data?.message || "পোস্টার মুছতে সমস্যা হয়েছে।");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={isPending}
      onClick={handleDelete}
      className="h-9 w-9 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0 transition-all cursor-pointer"
      title="মুছে ফেলুন"
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin text-destructive" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </Button>
  );
}