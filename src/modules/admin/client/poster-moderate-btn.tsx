"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, Loader2, Eye, User, Calendar, Tag, AlertTriangle } from "lucide-react";
import { AdminPoster } from "../admin.types";
import { AdminService } from "../admin.service";
import { toast } from "sonner";

interface PosterModerateBtnProps {
  poster: AdminPoster;
  onDeleted?: (id: string) => void;
}

export function PosterModerateBtn({ poster, onDeleted }: PosterModerateBtnProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const initialImg =
    poster.imageUrl?.startsWith("http://") ||
    poster.imageUrl?.startsWith("https://") ||
    poster.imageUrl?.startsWith("data:")
      ? poster.imageUrl
      : poster.imageUrl?.startsWith("/")
      ? poster.imageUrl
      : `/${poster.imageUrl || "image/images26.jpg"}`;

  const [modalImg, setModalImg] = useState(initialImg);

  const handleDelete = async () => {
    try {
      setIsPending(true);
      const success = await AdminService.deletePoster(poster.id);
      if (success) {
        toast.success(`"${poster.title}" সফলভাবে মুছে ফেলা হয়েছে!`);
        setIsDeleteOpen(false);
        setIsPreviewOpen(false);
        if (onDeleted) onDeleted(poster.id);
      } else {
        toast.error("পোস্টারটি মুছতে ব্যর্থ হয়েছে।");
      }
    } catch (err: any) {
      console.error("Poster deletion error:", err);
      toast.error(err?.response?.data?.message || "পোস্টার মুছতে সমস্যা হয়েছে।");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-1.5 w-full">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setModalImg(initialImg);
            setIsPreviewOpen(true);
          }}
          className="flex-1 text-xs h-8 rounded-xl border-border/80 hover:bg-brand-primary/10 hover:text-brand-primary hover:border-brand-primary/40 font-semibold gap-1 transition-all cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-brand-primary" />
          প্রিভিউ
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDeleteOpen(true)}
          className="h-8 w-8 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0 transition-all cursor-pointer"
          title="মুছে ফেলুন"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Live Poster Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-md max-h-[90vh] flex flex-col p-0 overflow-hidden rounded-3xl border border-border/80 bg-card/95 backdrop-blur-2xl">
          <DialogHeader className="p-4 border-b border-border/40 shrink-0">
            <div>
              <DialogTitle className="text-base font-bold text-foreground">
                পোস্টার প্রিভিউ ও বিস্তারিত
              </DialogTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                আইডি: <span className="font-mono text-brand-primary">{poster.id}</span>
              </p>
            </div>
          </DialogHeader>

          <div className="p-4 space-y-3 overflow-y-auto flex-1">
            <div className="relative w-48 mx-auto aspect-3/4 rounded-xl overflow-hidden bg-muted/60 border border-border/60 shadow-md">
              <Image
                src={modalImg}
                alt={poster.title}
                fill
                unoptimized
                onError={() => setModalImg("/image/images26.jpg")}
                className="object-contain"
                sizes="200px"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-muted/30 border border-border/50 text-xs">
              <div className="space-y-1">
                <span className="text-[11px] text-muted-foreground font-semibold flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-brand-primary" /> তৈরি করেছেন
                </span>
                <p className="font-bold text-foreground line-clamp-1">{poster.userName}</p>
                <p className="text-muted-foreground text-[10px] truncate">{poster.userEmail}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-muted-foreground font-semibold flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-brand-mint" /> ক্যাটাগরি ও তারিখ
                </span>
                <p className="font-bold text-foreground line-clamp-1">{poster.category}</p>
                <p className="text-muted-foreground text-[10px] flex items-center gap-1 truncate">
                  <Calendar className="w-3 h-3" /> {poster.createdAt}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPreviewOpen(false)}
                className="rounded-xl border-border/80 text-xs"
              >
                বন্ধ করুন
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setIsPreviewOpen(false);
                  setIsDeleteOpen(true);
                }}
                className="rounded-xl font-semibold gap-1.5 text-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                পোস্টার মুছে ফেলুন
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Deleting Poster */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-md p-6 rounded-3xl border border-destructive/30 bg-card/95 backdrop-blur-2xl">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <DialogTitle className="text-base font-bold text-foreground">
              পোস্টার মুছে ফেলতে চান?
            </DialogTitle>
            <p className="text-xs text-muted-foreground leading-relaxed">
              আপনি কি নিশ্চিত যে আপনি <strong>{poster.title}</strong> পোস্টারটি মুছে ফেলতে চান? এটি ব্যবহারকারীর হিস্ট্রি থেকেও অপসারিত হবে।
            </p>
          </div>

          <div className="flex items-center justify-end gap-2.5 mt-5">
            <Button
              variant="outline"
              size="sm"
              disabled={isPending}
              onClick={() => setIsDeleteOpen(false)}
              className="rounded-xl border-border/80"
            >
              বাতিল
            </Button>
            <Button
              variant="destructive"
              size="sm"
              disabled={isPending}
              onClick={handleDelete}
              className="rounded-xl font-semibold gap-1.5"
            >
              {isPending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Trash2 className="w-3.5 h-3.5" />
              )}
              মুছে ফেলুন
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}