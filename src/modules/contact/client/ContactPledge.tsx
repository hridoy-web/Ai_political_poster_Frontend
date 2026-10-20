import { ShieldCheck, HeartHandshake, Zap, Sparkles, CheckCircle2 } from "lucide-react";

export default function ContactPledge() {
  const pledges = [
    {
      icon: HeartHandshake,
      title: "গ্রাহক সন্তুষ্টির নিশ্চয়তা",
      desc: "আপনার যেকোনো প্রশ্ন, সমস্যা বা ফিডব্যাক আমরা সর্বোচ্চ গুরুত্বের সাথে বিবেচনা করি এবং দ্রুত সমাধানের চেষ্টা করি।",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: ShieldCheck,
      title: "ডাটা ও তথ্যের গোপনীয়তা",
      desc: "আপনার দেওয়া যেকোনো বার্তা, ছবি বা ইমেইল সম্পূর্ণ এনক্রিপ্টেড ও গোপন রাখা হয়। কোনো তৃতীয় পক্ষের সাথে শেয়ার করা হয় না।",
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      icon: Zap,
      title: "দ্রুততম সাপোর্ট রেসপন্স",
      desc: "আমাদের প্রযুক্তি টিম ২৪ ঘণ্টার মধ্যে আপনার মেসেজের উত্তর প্রদান করতে প্রতিশ্রুতিবদ্ধ।",
      color: "text-primary",
      bg: "bg-accent",
    },
  ];

  return (
    <div className="bg-card/70 backdrop-blur-xl border border-border/80 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-primary text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ব্যবহারকারীর প্রতি প্রতিশ্রুতি</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight">আমাদের অঙ্গীকার</h2>
        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
          রাজনীতিবিদ ও কর্মীদের সেবা প্রদানে আমরা যেসব মূল্যবোধ কঠোরভাবে মেনে চলি:
        </p>
      </div>

      {/* Pledge Cards */}
      <div className="space-y-4 pt-2">
        {pledges.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={idx}
              className="group flex items-start gap-4 p-4 rounded-2xl bg-muted/40 border border-border/50 hover:border-primary/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div
                className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110`}
              >
                <IconComp className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                  <span>{item.title}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-secondary opacity-80" />
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}