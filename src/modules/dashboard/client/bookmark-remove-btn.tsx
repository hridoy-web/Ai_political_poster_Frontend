"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookmarkX, Loader2 } from "lucide-react";
import { DashboardService } from "../dashboard.service";
import { toast } from "sonner";

interface BookmarkRemoveBtnProps {
  templateId: string;
}

export function BookmarkRemoveBtn({ templateId }: BookmarkRemoveBtnProps) {
  const [isPending, setIsPending] = useState(false);

  const handleRemove = async () => {
    setIsPending(true);
    try {
      const ok = await DashboardService.toggleBookmark(templateId, true);
      if (ok) {
        toast.success("টেমপ্লেটটি বুকমার্ক থেকে সফলভাবে সরানো হয়েছে!");
        window.location.reload();
      } else {
        toast.error("বুকমার্ক সরাতে ব্যর্থ হয়েছে।");
      }
    } catch (err: any) {
      console.error("Bookmark remove error:", err);
      toast.error(err.response?.data?.message || "বুকমার্ক সরাতে সমস্যা হয়েছে।");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      disabled={isPending}
      onClick={handleRemove}
      className="h-9 w-9 rounded-xl border-border/80 text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:border-destructive/30 transition-all shrink-0 cursor-pointer"
      title="বুকমার্ক থেকে সরান"
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
      ) : (
        <BookmarkX className="w-4 h-4" />
      )}
    </Button>
  );
}