import { Template } from "../dashboard.types";
import { BookmarkedTemplateCard } from "./bookmarked-template-card";

interface BookmarkedTemplatesGridProps {
  templates: Template[];
}

export function BookmarkedTemplatesGrid({ templates }: BookmarkedTemplatesGridProps) {
  if (!templates || templates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl border border-dashed border-border/80 bg-card/40">
        <p className="text-sm font-medium text-muted-foreground">
          আপনার বুকমার্ক করা কোনো টেমপ্লেট পাওয়া যায়নি।
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
      {templates.map((template) => (
        <BookmarkedTemplateCard key={template.id} template={template} />
      ))}
    </div>
  );
}