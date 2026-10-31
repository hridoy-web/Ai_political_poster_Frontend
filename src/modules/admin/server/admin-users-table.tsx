import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserActionsDropdown } from "../client/user-actions-dropdown";
import { AdminUser } from "../admin.types";
import { Crown, ShieldCheck, Layers, User } from "lucide-react";

export type { AdminUser };

export function AdminUsersTable({ users }: { users: AdminUser[] }) {
  if (!users || users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl border border-dashed border-border/80 bg-card/40">
        <p className="text-sm font-medium text-muted-foreground">
          কোনো ইউজার রেকর্ড পাওয়া যায়নি।
        </p>
      </div>
    );
  }

  const renderRoleBadge = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return (
          <Badge
            variant="outline"
            className="border-amber-500/40 bg-amber-500/10 text-amber-500 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 w-fit text-[10.5px]"
          >
            <Crown className="size-3" />
            <span>সুপার অ্যাডমিন</span>
          </Badge>
        );
      case "ADMIN":
        return (
          <Badge
            variant="outline"
            className="border-rose-500/40 bg-rose-500/10 text-rose-500 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 w-fit text-[10.5px]"
          >
            <ShieldCheck className="size-3" />
            <span>অ্যাডমিন</span>
          </Badge>
        );
      case "TEMPLATE_MANAGER":
        return (
          <Badge
            variant="outline"
            className="border-emerald-500/40 bg-emerald-500/10 text-emerald-500 font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 w-fit text-[10.5px]"
          >
            <Layers className="size-3" />
            <span>টেমপ্লেট ম্যানেজার</span>
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="border-slate-500/30 bg-slate-500/10 text-slate-400 font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 w-fit text-[10.5px]"
          >
            <User className="size-3" />
            <span>ইউজার</span>
          </Badge>
        );
    }
  };

  return (
    <div className="border border-border/80 rounded-3xl bg-card/80 backdrop-blur-xl overflow-hidden shadow-md">
      <Table>
        <TableHeader className="bg-muted/50 border-b border-border/60">
          <TableRow className="hover:bg-transparent border-none">
            <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4 px-6">
              ইউজার
            </TableHead>
            <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4 px-6">
              সিস্টেম রোল
            </TableHead>
            <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4 px-6">
              ফোন ও ইমেইল
            </TableHead>
            <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4 px-6">
              ব্যালেন্স
            </TableHead>
            <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4 px-6">
              পোস্টার
            </TableHead>
            <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4 px-6">
              স্ট্যাটাস
            </TableHead>
            <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground text-right py-4 px-6">
              অ্যাকশন
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="border-b border-border/40 hover:bg-accent/40 transition-colors"
            >
              <TableCell className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border border-brand-primary/30">
                    <AvatarFallback className="bg-gradient-brand text-white font-bold text-xs">
                      {user.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">
                      {user.name}
                    </h4>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {user.createdAt}
                    </span>
                  </div>
                </div>
              </TableCell>

              <TableCell className="py-4 px-6">
                {renderRoleBadge(user.role)}
              </TableCell>

              <TableCell className="py-4 px-6 text-xs text-muted-foreground font-medium">
                <div>{user.phone}</div>
                <div className="text-[11px] opacity-80">{user.email}</div>
              </TableCell>

              <TableCell className="py-4 px-6 font-bold text-foreground text-sm">
                <div>৳ {(user.balance || 0).toFixed(2)}</div>
                {user.credits > 0 && (
                  <div className="text-[10px] text-brand-mint font-normal">
                    {user.credits} ক্রেডিট
                  </div>
                )}
              </TableCell>

              <TableCell className="py-4 px-6 font-semibold text-xs text-foreground">
                {(user.totalPosters || 0).toLocaleString("bn-BD")} টি
              </TableCell>

              <TableCell className="py-4 px-6">
                {user.status === "ACTIVE" ? (
                  <Badge className="bg-brand-green/10 text-brand-mint border-brand-green/20 font-semibold px-2.5 py-0.5 rounded-full text-[11px]">
                    অ্যাক্টিভ
                  </Badge>
                ) : (
                  <Badge className="bg-destructive/10 text-destructive border-destructive/20 font-semibold px-2.5 py-0.5 rounded-full text-[11px]">
                    ব্লকড
                  </Badge>
                )}
              </TableCell>

              <TableCell className="py-4 px-6 text-right">
                <UserActionsDropdown
                  userId={user.id}
                  userName={user.name}
                  userEmail={user.email}
                  currentRole={user.role}
                  currentStatus={user.status}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}