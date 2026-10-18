import { UserPoster } from "../dashboard.types";
import { UserPosterCard } from "./user-poster-card";

interface UserPosterGridProps {
  posters: UserPoster[];
}

export function UserPosterGrid({ posters }: UserPosterGridProps) {
  if (!posters || posters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl border border-dashed border-border/80 bg-card/40">
        <p className="text-sm font-medium text-muted-foreground">
          আপনার পূর্বে তৈরি করা কোনো পোস্টার পাওয়া যায়নি।
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
      {posters.map((poster) => (
        <UserPosterCard key={poster.id} poster={poster} />
      ))}
    </div>
  );
}