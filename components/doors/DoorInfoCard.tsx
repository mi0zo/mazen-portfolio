"use client";

import React from "react";

interface DoorInfoCardProps {
  title: string;
  subtitle: string;
  points: string[];
  isVisible: boolean;
  style?: React.CSSProperties;
}

export function DoorInfoCard({
  title,
  subtitle,
  points,
  isVisible,
  style,
}: DoorInfoCardProps) {
  return (
    <div
      className={`dinfo ${isVisible ? "on" : ""}`}
      style={style}
      aria-live="polite"
    >
      <h3 className="dinfo__h">{title}</h3>
      <p className="dinfo__t">{subtitle}</p>
      <ul className="dinfo__p">
        {points.map((pt, i) => (
          <li key={i}>
            <span className="dinfo__check">
              <svg
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-2.5 h-2.5"
              >
                <path d="M2.5 6.2 5 8.5 9.5 3.5" />
              </svg>
            </span>
            <span>{pt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
