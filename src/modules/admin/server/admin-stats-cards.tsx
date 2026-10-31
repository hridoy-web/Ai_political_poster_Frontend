"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  ImageIcon,
  Wallet,
  Layers,
  TrendingUp,
  CalendarDays,
  DollarSign,
} from "lucide-react";
import { AdminService, OverviewAnalyticsData } from "../admin.service";

export function AdminStatsCards() {
  const [data, setData] = useState<OverviewAnalyticsData | null>(null);

  useEffect(() => {
    let isMounted = true;
    AdminService.getOverviewAnalytics()
      .then((res) => {
        if (isMounted && res) {
          setData(res);
        }
      })
      .catch((err) => console.warn("Failed to load admin overview analytics:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  const statsList = [
    {
      title: "আজকের আয়",
      value: `৳ ${(data?.todayRevenue || 0).toLocaleString("bn-BD")}`,
      change: "+আজকের",
      isPositive: true,
      icon: CalendarDays,
    },
    {
      title: "চলতি মাসের আয়",
      value: `৳ ${(data?.monthRevenue || 0).toLocaleString("bn-BD")}`,
      change: "+চলতি মাস",
      isPositive: true,
      icon: DollarSign,
    },
    {
      title: "সর্বমোট আয়",
      value: `৳ ${(data?.totalRevenue || 0).toLocaleString("bn-BD")}`,
      change: "+সর্বমোট",
      isPositive: true,
      icon: Wallet,
    },
    {
      title: "মোট ইউজার",
      value: `${(data?.totalUsers || 0).toLocaleString("bn-BD")} জন`,
      change: `+${(data?.todayUsers || 0).toLocaleString("bn-BD")} আজ`,
      isPositive: true,
      icon: Users,
    },
    {
      title: "মোট পোস্টার",
      value: `${(data?.totalPosters || 0).toLocaleString("bn-BD")} টি`,
      change: `+${(data?.todayPosters || 0).toLocaleString("bn-BD")} আজ`,
      isPositive: true,
      icon: ImageIcon,
    },
    {
      title: "অ্যাক্টিভ টেমপ্লেট",
      value: `${(data?.totalTemplates || 0).toLocaleString("bn-BD")} টি`,
      change: "লাইভ",
      isPositive: true,
      icon: Layers,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
      {statsList.map((stat, i) => {
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
                  <TrendingUp className="w-3 h-3 text-brand-mint shrink-0" />
                  <span className="text-brand-mint">
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