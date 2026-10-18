import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  ImageIcon,
  Wallet,
  Layers,
  TrendingUp,
  TrendingDown,
  CalendarDays,
  DollarSign,
} from "lucide-react";

const STATS_DATA = [
  { title: "আজকের আয়", value: "৳ ২,৫০০.০০", change: "+১৫%", isPositive: true, icon: CalendarDays },
  { title: "চলতি মাসের আয়", value: "৳ ৪৫,০০০.০০", change: "+৮%", isPositive: true, icon: DollarSign },
  { title: "সর্বমোট আয়", value: "৳ ১,৪৫,০০০.০০", change: "+২৪%", isPositive: true, icon: Wallet },
  { title: "মোট ইউজার", value: "১,২৪৮ জন", change: "+১২%", isPositive: true, icon: Users },
  { title: "মোট পোস্টার", value: "৮,৫৪০ টি", change: "+১৮%", isPositive: true, icon: ImageIcon },
  { title: "অ্যাক্টিভ টেমপ্লেট", value: "৪৫ টি", change: "-২ টি", isPositive: false, icon: Layers },
];

export function AdminStatsCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
      {STATS_DATA.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <Card key={i} className="border border-border/80 bg-card/80 backdrop-blur-xl rounded-2xl p-3.5 shadow-2xs">
            <CardContent className="p-0 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-muted-foreground truncate">{stat.title}</span>
                <div className="p-1.5 rounded-xl bg-brand-primary/10 text-brand-primary shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">{stat.value}</h3>
                <div className="flex items-center gap-1 mt-0.5 text-[10px] font-semibold">
                  {stat.isPositive ? (
                    <TrendingUp className="w-3 h-3 text-brand-mint shrink-0" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-destructive shrink-0" />
                  )}
                  <span className={stat.isPositive ? "text-brand-mint" : "text-destructive"}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}