"use client";

import React, { useEffect, useState } from "react";

interface LiveClockProps {
  locale?: string;
}

export function LiveClock({ locale = "en" }: LiveClockProps) {
  const [timeStr, setTimeStr] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");
  const isArabic = locale === "ar";

  useEffect(() => {
    function tick() {
      const d = new Date();
      const h = d.getHours();
      const m = String(d.getMinutes()).padStart(2, "0");
      const ampm = h < 12 ? (isArabic ? "ص" : "am") : (isArabic ? "م" : "pm");
      const formattedH = h % 12 || 12;
      setTimeStr(`${formattedH}:${m} ${ampm}`);

      const months = isArabic
        ? ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
        : [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December",
          ];

      const day = d.getDate();
      const month = months[d.getMonth()];
      const year = d.getFullYear();
      setDateStr(isArabic ? `${day} ${month} ${year}` : `${day} ${month}, ${year}`);
    }

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isArabic]);

  return (
    <div
      className="chip clock inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 rounded-full border border-line bg-surface/70 backdrop-blur-md text-xs font-medium text-foreground tracking-tight shadow-sm"
      aria-label="Local time"
    >
      <span className="clock__lbl text-muted hidden lg:inline">
        {isArabic ? "التوقيت المحلي" : "Local time"}
      </span>
      <span className="clock__time font-mono font-semibold tabular-nums text-foreground">
        {timeStr || "--:--"}
      </span>
      <span className="clock__sep text-muted/40 hidden md:inline" aria-hidden="true">
        •
      </span>
      <span className="clock__date text-muted hidden md:inline">
        {dateStr}
      </span>
    </div>
  );
}
