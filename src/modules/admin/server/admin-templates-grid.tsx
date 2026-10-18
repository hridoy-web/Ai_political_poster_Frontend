import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Eye, Tag } from "lucide-react";
import { AdminTemplate } from "../admin.types";

export function AdminTemplatesGrid({ templates }: { templates: AdminTemplate[] }) {
  if (!templates || templates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl border border-dashed border-border/80 bg-card/40">
        <p className="text-sm font-medium text-muted-foreground">
          কোনো টেমপ্লেট পাওয়া যায়নি।
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {templates.map((tpl) => (
        <Card
          key={tpl.id}
          className="border border-border/80 bg-card/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xs hover:shadow-md flex flex-col justify-between h-full"
        >
          <div className="relative w-full p-3 bg-muted/30 rounded-t-3xl overflow-hidden flex items-center justify-center">
            {/* Aspect Ratio Box with Dynamic Performance Sizes */}
            <div className="relative w-full aspect-3/4 rounded-2xl overflow-hidden shadow-xs bg-muted">
              <Image
                src={tpl.imageUrl}
                alt={tpl.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={false}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute top-5 left-5 z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold bg-background/90 backdrop-blur-md text-foreground border border-border/60 rounded-full shadow-xs">
                <Tag className="w-3 h-3 text-brand-primary" /> {tpl.category}
              </span>
            </div>
          </div>

          <CardContent className="p-4 space-y-3">
            <h3 className="font-bold text-foreground text-sm line-clamp-1">{tpl.title}</h3>
            <div className="flex items-center gap-2 pt-2 border-t border-border/40">
              <Button variant="outline" size="sm" className="flex-1 text-xs h-9 rounded-xl font-semibold">
                <Eye className="w-3.5 h-3.5 mr-1 text-brand-primary" /> প্রিভিউ
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-destructive hover:bg-destructive/10">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}