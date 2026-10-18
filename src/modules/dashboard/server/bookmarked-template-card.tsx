import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Tag } from "lucide-react";
import { Template } from "../dashboard.types";
import { BookmarkRemoveBtn } from "../client/bookmark-remove-btn";

interface BookmarkedTemplateCardProps {
  template: Template;
}

export function BookmarkedTemplateCard({ template }: BookmarkedTemplateCardProps) {
  return (
    <Card className="border border-border/80 bg-card/80 backdrop-blur-xl rounded-3xl overflow-hidden group hover:border-brand-mint/60 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between h-full">
      {/* Aspect ratio specific with padding & full view */}
      <div className="relative w-full p-3 bg-muted/30 rounded-t-3xl overflow-hidden flex items-center justify-center">
        {/* Dynamic Image Wrapper with Full Aspect Ratio Visibility */}
        <div className="relative w-full aspect-9/16 sm:aspect-3/4 rounded-2xl overflow-hidden shadow-xs">
          <Image
            src={template.imageUrl}
            alt={template.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={false}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Category Pill Badge */}
        <div className="absolute top-5 left-5 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold bg-background/90 backdrop-blur-md text-foreground border border-border/60 rounded-full shadow-xs">
            <Tag className="w-3 h-3 text-brand-mint" />
            {template.category}
          </span>
        </div>
      </div>

      {/* Card Content & Action Bar */}
      <CardContent className="p-4 space-y-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-bold text-foreground text-sm line-clamp-1 group-hover:text-brand-mint transition-colors">
            {template.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            ক্যানভাস সাজানো প্রস্তুত
          </p>
        </div>

        {/* Actions Layout */}
        <div className="flex items-center gap-2 pt-2 border-t border-border/40">
          <Link href={`/generator?template=${template.id}`} className="flex-1">
            <Button
              size="sm"
              className="w-full h-9 rounded-xl text-xs bg-gradient-green text-white font-semibold shadow-xs hover:opacity-90 transition-opacity gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> পোস্টার তৈরি করুন
            </Button>
          </Link>

          {/* Client Interactivity Isolated Button */}
          <BookmarkRemoveBtn templateId={template.id} />
        </div>
      </CardContent>
    </Card>
  );
}