import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Edit3, Tag } from "lucide-react";
import { UserPoster } from "../dashboard.types";
import { PosterDeleteBtn } from "../client/poster-delete-btn";

interface UserPosterCardProps {
  poster: UserPoster;
}

export function UserPosterCard({ poster }: UserPosterCardProps) {
  return (
    <Card className="border border-border/80 bg-card/80 backdrop-blur-xl rounded-3xl overflow-hidden group hover:border-brand-primary/60 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between h-full">
      {/* Safe Padding Box (No Image Clipping) */}
      <div className="relative w-full p-3 bg-muted/30 rounded-t-3xl overflow-hidden flex items-center justify-center">
        <div className="relative w-full aspect-9/16 sm:aspect-3/4 rounded-2xl overflow-hidden shadow-xs">
          <Image
            src={poster.imageUrl}
            alt={poster.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={false}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Hover Download Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-2">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-md hover:scale-105 transition-transform"
            >
              <Download className="w-4 h-4 text-foreground" />
            </Button>
          </div>
        </div>

        {/* Category Tag */}
        <div className="absolute top-5 left-5 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold bg-background/90 backdrop-blur-md text-foreground border border-border/60 rounded-full shadow-xs">
            <Tag className="w-3 h-3 text-brand-primary" />
            {poster.category || "রাজনৈতিক"}
          </span>
        </div>
      </div>

      {/* Details & Action Bar */}
      <CardContent className="p-4 space-y-4 flex flex-col justify-between flex-1">
        <div className="space-y-1">
          <h3 className="font-bold text-foreground text-sm line-clamp-1 group-hover:text-brand-primary transition-colors">
            {poster.title}
          </h3>
          <p className="text-xs text-muted-foreground font-medium">
            তৈরি করা হয়েছে: {poster.createdAt}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 pt-2 border-t border-border/40">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs h-9 rounded-xl border-border/80 hover:bg-accent font-semibold gap-1"
          >
            <Download className="w-3.5 h-3.5 text-brand-primary" />
            ডাউনলোড
          </Button>

          <Link href={`/generator?edit=${poster.id}`}>
            <Button
              size="sm"
              className="bg-gradient-brand text-white text-xs h-9 px-3 rounded-xl font-semibold shadow-xs hover:opacity-90 transition-opacity"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </Button>
          </Link>

          {/* Isolated Client Action */}
          <PosterDeleteBtn posterId={poster.id} />
        </div>
      </CardContent>
    </Card>
  );
}