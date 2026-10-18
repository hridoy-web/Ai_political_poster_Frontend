import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function NavbarAvatar() {
  const user = {image: ''}
  
  return (
    <Avatar className="outline-2 outline-brand-green dark:outline-brand-mint transition-all cursor-pointer">
      <AvatarImage src={user?.image || "https://github.com/shadcn.png" } alt="@shadcn"/>
      <AvatarFallback className="bg-brand-green/10 text-brand-green font-bold">CN</AvatarFallback>
      <AvatarBadge className="bg-brand-green dark:bg-brand-mint ring-2 ring-background" />
    </Avatar>
  )
}