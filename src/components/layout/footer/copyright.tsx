"use client";

import { useEffect, useState } from "react";

export default function Copyright() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setYear(new Date().getFullYear());
  }, []);

  return <p className="text-xs text-muted-foreground font-medium tracking-wide flex items-center justify-center gap-1.5 flex-wrap">
      <span>&copy; {year}</span>
      <span className="font-bold text-foreground font-heading hover:text-brand-green dark:hover:text-brand-mint transition-colors cursor-default">
        PosterAI
      </span>
      <span className="text-border">•</span>
      <span>All Rights Reserved.</span>
    </p>
}