"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";

interface PosterDeleteBtnProps {
  posterId: string;
}

export function PosterDeleteBtn({ posterId }: PosterDeleteBtnProps) {
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    setIsPending(true);
    console.log("Deleting poster:", posterId);
    setTimeout(() => setIsPending(false), 500);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={isPending}
      onClick={handleDelete}
      className="h-9 w-9 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0 transition-all"
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