"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const analyticsData = [
  { day: "১০ অক", revenue: 1200 },
  { day: "১২ অক", revenue: 1800 },
  { day: "১৪ অক", revenue: 2900 },
  { day: "১৬ অক", revenue: 3800 },
  { day: "১৮ অক", revenue: 2500 },
];

// Custom Tooltip Interface 
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number | string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border/80 rounded-2xl p-2.5 shadow-lg text-xs font-semibold">
        <p className="text-muted-foreground mb-1">{label}</p>
        <p className="text-brand-primary">
          আয়: <span className="font-bold">৳ {payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
}

export function AdminOverviewCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2 border border-border/80 bg-card/80 backdrop-blur-xl rounded-3xl p-4 shadow-xs">
        <CardHeader className="p-0 pb-3">
          <CardTitle className="text-sm font-bold text-foreground">
            রেভিনিউ ট্রেন্ড (দৈনিক)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-55 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={analyticsData}
              margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e11d48" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#e11d48" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10 }}
              />

              {/* Custom Tooltip Component */}
              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#e11d48"
                strokeWidth={2.5}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border border-border/80 bg-card/80 backdrop-blur-xl rounded-3xl p-4 shadow-xs flex flex-col justify-between">
        <CardHeader className="p-0 pb-2">
          <CardTitle className="text-sm font-bold text-foreground">
            আজকের হাইলাইটস
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-3">
          <div className="p-3 rounded-2xl bg-accent/40 border border-border/40">
            <span className="text-[11px] text-muted-foreground font-semibold">
              আজকের পোস্টার
            </span>
            <h4 className="text-lg font-bold text-foreground">২৬০ টি</h4>
          </div>
          <div className="p-3 rounded-2xl bg-accent/40 border border-border/40">
            <span className="text-[11px] text-muted-foreground font-semibold">
              আজকের সাইনআপ
            </span>
            <h4 className="text-lg font-bold text-foreground">১৮ জন</h4>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}