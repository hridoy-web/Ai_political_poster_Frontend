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

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
  totalPosters: number;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "BANNED";
  createdAt: string;
}

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

  return (
    <div className="border border-border/80 rounded-3xl bg-card/80 backdrop-blur-xl overflow-hidden shadow-md">
      <Table>
        <TableHeader className="bg-muted/50 border-b border-border/60">
          <TableRow className="hover:bg-transparent border-none">
            <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4 px-6">ইউজার</TableHead>
            <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4 px-6">ফোন ও ইমেইল</TableHead>
            <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4 px-6">ব্যালেন্স</TableHead>
            <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4 px-6">পোস্টার সংখ্যা</TableHead>
            <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4 px-6">স্ট্যাটাস</TableHead>
            <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground text-right py-4 px-6">অ্যাকশন</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="border-b border-border/40 hover:bg-accent/40 transition-colors">
              <TableCell className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border border-brand-primary/30">
                    <AvatarFallback className="bg-gradient-brand text-white font-bold text-xs">
                      {user.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">{user.name}</h4>
                    <span className="text-[10px] text-muted-foreground font-mono">{user.createdAt}</span>
                  </div>
                </div>
              </TableCell>

              <TableCell className="py-4 px-6 text-xs text-muted-foreground font-medium">
                <div>{user.phone}</div>
                <div className="text-[11px] opacity-80">{user.email}</div>
              </TableCell>

              <TableCell className="py-4 px-6 font-bold text-foreground text-sm">
                ৳ {user.balance.toFixed(2)}
              </TableCell>

              <TableCell className="py-4 px-6 font-semibold text-xs text-foreground">
                {user.totalPosters} টি
              </TableCell>

              <TableCell className="py-4 px-6">
                {user.status === "ACTIVE" ? (
                  <Badge className="bg-brand-green/10 text-brand-mint border-brand-green/20 font-semibold px-2.5 py-0.5 rounded-full">
                    অ্যাক্টিভ
                  </Badge>
                ) : (
                  <Badge className="bg-destructive/10 text-destructive border-destructive/20 font-semibold px-2.5 py-0.5 rounded-full">
                    ব্লকড
                  </Badge>
                )}
              </TableCell>

              <TableCell className="py-4 px-6 text-right">
                <UserActionsDropdown userId={user.id} currentStatus={user.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}