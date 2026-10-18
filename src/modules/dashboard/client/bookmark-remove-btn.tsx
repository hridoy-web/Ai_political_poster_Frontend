"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookmarkX, Loader2 } from "lucide-react";

interface BookmarkRemoveBtnProps {
  templateId: string;
}

export function BookmarkRemoveBtn({ templateId }: BookmarkRemoveBtnProps) {
  const [isPending, setIsPending] = useState(false);

  const handleRemove = async () => {
    setIsPending(true);
    console.log("Removing bookmark:", templateId);
    setTimeout(() => setIsPending(false), 500);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      disabled={isPending}
      onClick={handleRemove}
      className="h-9 w-9 rounded-xl border-border/80 text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:border-destructive/30 transition-all shrink-0"
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