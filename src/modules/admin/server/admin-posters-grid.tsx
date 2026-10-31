"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Tag, User } from "lucide-react";
import { PosterModerateBtn } from "../client/poster-moderate-btn";
import { AdminPoster } from "../admin.types";

const safeImageUrl = (url?: string) => {
  if (!url) return "/image/images26.jpg";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) return url;
  if (url.startsWith("/")) return url;
  return `/${url}`;
};

function PosterCardImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      unoptimized
      onError={() => setImgSrc("/image/images26.jpg")}
      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      priority={false}
      className="object-cover group-hover:scale-105 transition-transform duration-300"
    />
  );
}

export function AdminPostersGrid({
  posters,
  onPosterDeleted,
}: {
  posters: AdminPoster[];
  onPosterDeleted?: (id: string) => void;
}) {
  if (!posters || posters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl border border-dashed border-border/80 bg-card/40">
        <p className="text-sm font-medium text-muted-foreground">
          কোনো পোস্টার রেকর্ড পাওয়া যায়নি।
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {posters.map((poster) => {
        const imageSrc = safeImageUrl(poster.imageUrl);
        return (
          <Card
            key={poster.id}
            className="border border-border/80 bg-card/80 backdrop-blur-xl rounded-3xl overflow-hidden group hover:border-brand-primary/60 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between h-full"
          >
            <div className="relative w-full p-3 bg-muted/30 rounded-t-3xl overflow-hidden flex items-center justify-center">
              <div className="relative w-full aspect-3/4 rounded-2xl overflow-hidden shadow-xs bg-muted">
                <PosterCardImage src={imageSrc} alt={poster.title} />
              </div>

              <div className="absolute top-5 left-5 z-10">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold bg-background/90 backdrop-blur-md text-foreground border border-border/60 rounded-full shadow-xs">
                  <Tag className="w-3 h-3 text-brand-primary" />
                  {poster.category}
                </span>
              </div>
            </div>

          <CardContent className="p-4 space-y-3 flex flex-col justify-between flex-1">
            <div className="space-y-1.5">
              <h3 className="font-bold text-foreground text-sm line-clamp-1">
                {poster.title}
              </h3>
              
              {/* User Details: Name & Email */}
              <div className="space-y-0.5 text-[11px] text-muted-foreground font-medium">
                <p className="flex items-center gap-1.5 text-foreground font-semibold line-clamp-1">
                  <User className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                  {poster.userName}
                </p>
                <p className="flex items-center gap-1.5 opacity-80 truncate pl-5">
                  {poster.userEmail}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-border/40">
              <PosterModerateBtn poster={poster} onDeleted={onPosterDeleted} />
            </div>
          </CardContent>
        </Card>
        );
      })}
    </div>
  );
}