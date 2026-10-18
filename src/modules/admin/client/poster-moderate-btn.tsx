"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, Eye } from "lucide-react";

export function PosterModerateBtn({ posterId }: { posterId: string }) {
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    setIsPending(true);
    // Server Action or Moderation API
    console.log("Admin deleted poster:", posterId);
    setTimeout(() => setIsPending(false), 500);
  };

  return (
    <div className="flex items-center gap-1.5 w-full">
      <Button
        variant="outline"
        size="sm"
        className="flex-1 text-xs h-8 rounded-xl border-border/80 hover:bg-accent font-semibold gap-1"
      >
        <Eye className="w-3.5 h-3.5 text-brand-primary" />
        প্রিভিউ
      </Button>

      <Button
        variant="ghost"
        size="icon"
        disabled={isPending}
        onClick={handleDelete}
        className="h-8 w-8 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0 transition-all"
        title="মুছে ফেলুন"
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin text-destructive" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}