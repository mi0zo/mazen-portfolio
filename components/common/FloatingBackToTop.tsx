"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSmoothScroll } from "../providers/SmoothScrollProvider";

export function FloatingBackToTop() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const { scrollTo } = useSmoothScroll();
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      const p = totalH > 0 ? Math.min(1, Math.max(0, scrollY / totalH)) : 0;
      setProgress(p);

      // Show after scrolling past ~70% of first screen
      setShow(scrollY > window.innerHeight * 0.7);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    scrollTo(0);
  };

  const len = 2 * Math.PI * 24; // 150.796

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={handleClick}
      className={`totop ${show ? "show" : ""}`}
      style={{
        "--len": len.toFixed(2),
        "--p": progress.toFixed(4),
      } as React.CSSProperties}
      aria-label="Back to top"
    >
      <svg className="ring" viewBox="0 0 52 52">
        <circle cx="26" cy="26" r="24" />
      </svg>
      <svg
        className="ar"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}

