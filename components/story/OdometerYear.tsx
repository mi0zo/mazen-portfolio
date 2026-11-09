"use client";

import React from "react";

interface OdometerYearProps {
  year: string;
}

export function OdometerYear({ year }: OdometerYearProps) {
  const digits = year.split("");

  return (
    <div className="inline-flex items-center text-4xl md:text-6xl font-black font-mono tracking-tighter text-foreground h-12 md:h-16 overflow-hidden select-none">
      {digits.map((digit, colIdx) => (
        <div key={colIdx} className="relative w-[0.62em] h-full overflow-hidden">
          <div
            className="flex flex-col transition-transform duration-500 ease-out"
            style={{
              transform: `translateY(-${parseInt(digit, 10) * 10}%)`,
            }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="h-12 md:h-16 flex items-center justify-center leading-none"
              >
                {i}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

