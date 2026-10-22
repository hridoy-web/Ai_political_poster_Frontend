import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/get-user-data";

export function NavbarAvatar() {
  const { loading, user } = useAuth();
  console.log(loading, user);

  return (
    <div>
      {loading ? (
        <Skeleton className="size-8 rounded-full"/>
      ) : (
        <Avatar className="outline-2 outline-brand-green dark:outline-brand-mint transition-all cursor-pointer">
          <AvatarImage
            src={user?.name || "https://github.com/shadcn.png"}
            alt={user?.name || "user avatar"}
          />
          <AvatarFallback className="bg-brand-green/10 text-brand-green font-bold">
            {user?.name.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
          <AvatarBadge className="bg-brand-green dark:bg-brand-mint ring-2 ring-background" />
        </Avatar>
      )}
    </div>
  );
}
