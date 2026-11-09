"use client";

import React, { useEffect, useState } from "react";
import { Dictionary } from "@/lib/dictionary";

interface PageLoaderProps {
  dict: Dictionary;
}

export function PageLoader({ dict }: PageLoaderProps) {
  const [mounted, setMounted] = useState(true);
  const [isOut, setIsOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // If returning from internal hash or if reduced motion is requested
    if (window.location.hash && ["#works", "#about", "#contact"].includes(window.location.hash)) {
      setMounted(false);
      document.body.classList.add("ready");
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setProgress(100);
      setIsOut(true);
      setTimeout(() => {
        setMounted(false);
        document.body.classList.add("ready");
      }, 500);
      return;
    }

    // Progress counter animation
    const startTime = performance.now();
    const duration = 1400; // 1.4s smooth loader
    let rafId: number;

    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const currentVal = Math.round(ease(t) * 100);
      setProgress(currentVal);

      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        // Last pill has landed -> trigger split exit
        setTimeout(() => {
          setIsOut(true);
          setTimeout(() => {
            document.body.classList.add("ready");
          }, 260);
          setTimeout(() => {
            setMounted(false);
          }, 1100);
        }, 300);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  if (!mounted) return null;

  // 6 Stacked pills matching reference color scheme and disciplines
  const isRTL = dict.dir === "rtl";
  const pills = [
    { k: 0, c: "#1F1C1C", t: "#E8E4E0", dir: 1, label: dict.name },
    { k: 1, c: "#22304a", t: "#E8E4E0", dir: -1, label: isRTL ? "تطوير الويب" : "Web Development" },
    { k: 2, c: "#24362a", t: "#E8E4E0", dir: 1, label: isRTL ? "تطبيقات الجوال" : "Mobile Engineering" },
    { k: 3, c: "#3d261e", t: "#F3EEEC", dir: -1, label: isRTL ? "هندسة البرمجيات" : "Software Architecture" },
    { k: 4, c: "#342038", t: "#F3EEEC", dir: 1, label: isRTL ? "تصميم الواجهات" : "UI/UX Engineering" },
    { k: 5, c: "#a4552c", t: "#F3EEEC", dir: -1, label: isRTL ? "التقنية الإبداعية" : "Creative Technologist" },
  ];

  return (
    <div
      id="loader"
      className={`fixed inset-0 z-[120] overflow-hidden select-none font-sans text-[#E8E4E0] ${
        isOut ? "pointer-events-none" : ""
      }`}
      aria-hidden="true"
    >
      {/* Background Radial Gradients with Exit Slide Up */}
      <div
        className={`absolute inset-0 transition-transform duration-[850ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isOut ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{
          background:
            "radial-gradient(38% 55% at 0% 72%, rgba(164,85,44,0.26), transparent 70%), radial-gradient(40% 58% at 100% 70%, rgba(196,176,176,0.16), transparent 72%), radial-gradient(70% 60% at 50% 0%, rgba(107,92,92,0.3), transparent 70%), #0D0C0C",
        }}
      />

      {/* Center Stack of Colorful Discipline Pills */}
      <div
        className="absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "min(76vw, 26rem)",
          height: "calc(min(76vw, 26rem) * 0.27 + 5 * (min(76vw, 26rem) * 0.27 * 0.6))",
        }}
      >
        {pills.map((pill) => {
          const stepPercent = pill.k / 6;
          const isOn = progress >= stepPercent * 100 + 2 || progress >= 100;
          const exitTranslate = isOut
            ? `translateX(${pill.dir * 125}vw) rotate(${pill.dir * 6}deg)`
            : isOn
            ? "translateY(0) scale(1)"
            : "translateY(-1.6rem) scale(0.96)";

          return (
            <div
              key={pill.k}
              className="absolute left-0 w-full flex items-center justify-center rounded-full transition-all text-center"
              style={{
                top: `calc(${pill.k} * (min(76vw, 26rem) * 0.27 * 0.6))`,
                height: "calc(min(76vw, 26rem) * 0.27)",
                zIndex: pill.k,
                padding:
                  pill.k === 5
                    ? "0 1.5rem"
                    : "0 1.5rem calc(min(76vw, 26rem) * 0.27 * 0.38) 1.5rem",
                fontSize: "max(13px, calc(min(76vw, 26rem) * 0.04))",
                fontWeight: 600,
                letterSpacing: isRTL ? "normal" : "0.02em",
                backgroundColor: pill.c,
                backgroundImage: `linear-gradient(180deg, color-mix(in srgb, ${pill.c} 88%, #fff) 0%, ${pill.c} 22%, ${pill.c} 70%, color-mix(in srgb, ${pill.c} 82%, #000) 100%)`,
                color: pill.t,
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.18), 0 -1px 0 rgba(0,0,0,0.25), 0 calc(min(76vw, 26rem) * 0.27 * -0.18) calc(min(76vw, 26rem) * 0.27 * 0.35) calc(min(76vw, 26rem) * 0.27 * -0.12) rgba(0,0,0,0.55)",
                opacity: isOn && !isOut ? 1 : isOut ? 0 : 0,
                transform: exitTranslate,
                transitionDuration: isOut ? "800ms" : "750ms",
                transitionDelay: isOut ? `${pill.k * 45}ms` : "0ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <span className="opacity-95 text-center leading-none">{pill.label}</span>
            </div>
          );
        })}
      </div>

      {/* Head-Up Display (HUD): Name on Top, Large Odometer Counter on Bottom */}
      <div
        className={`absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-12 transition-opacity duration-300 ${
          isOut ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Top Header in Loader */}
        <div className="flex justify-between items-center text-xs sm:text-sm font-medium text-[#E8E4E0]/70">
          <span>
            <b className="font-semibold text-[#E8E4E0]">{dict.name}</b> • {dict.role}
          </span>
          <span className="tracking-widest uppercase text-[11px] text-[#E8E4E0]/50">
            {isRTL ? "جاري التحميل" : "Initializing Experience"}
          </span>
        </div>

        {/* Bottom Status & Large Counter */}
        <div className="flex justify-between items-end gap-6">
          <div className="text-xs sm:text-sm text-[#E8E4E0]/60 max-w-xs">
            <span>{dict.tagline}</span>
          </div>

          <div className="text-right">
            <span className="block font-mono text-[10px] tracking-widest uppercase text-[#E8E4E0]/50 mb-1">
              {isRTL ? "التقدم" : "Loading Assets"}
            </span>
            <div className="text-5xl sm:text-8xl font-bold tracking-tighter tabular-nums text-[#E8E4E0]">
              {String(progress).padStart(3, "0")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

