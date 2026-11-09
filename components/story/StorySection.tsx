"use client";

import React, { useEffect, useRef } from "react";
import { Dictionary } from "@/lib/dictionary";

interface StorySectionProps {
  dict: Dictionary;
}

export function StorySection({ dict }: StorySectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLOListElement | null>(null);
  const railRef = useRef<HTMLSpanElement | null>(null);
  const dtrackRef = useRef<HTMLSpanElement | null>(null);
  const ttrackRef = useRef<HTMLSpanElement | null>(null);
  const whenRef = useRef<HTMLParagraphElement | null>(null);
  const countRef = useRef<HTMLSpanElement | null>(null);
  const colsRef = useRef<HTMLSpanElement[]>([]);

  const chapters = dict.story.chapters;

  useEffect(() => {
    const sec = sectionRef.current;
    const cv = canvasRef.current;
    const line = lineRef.current;
    const list = listRef.current;
    const rail = railRef.current;
    const dtrack = dtrackRef.current;
    const ttrack = ttrackRef.current;
    const when = whenRef.current;
    const count = countRef.current;
    const cols = colsRef.current;

    if (!sec || !line || !list || !cv) return;

    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const chs = Array.from(list.querySelectorAll<HTMLLIElement>(".ch"));
    const N = chs.length;
    if (N === 0) return;

    const root = document.documentElement;
    let shownYear = "";
    let shown = -1;

    const setYear = (y: string) => {
      if (y === shownYear) return;
      shownYear = y;
      String(y)
        .split("")
        .forEach((d, k) => {
          if (cols[k]) {
            cols[k].style.setProperty("--d", d);
          }
        });
    };

    const show = (i: number) => {
      if (i === shown || i < 0 || i >= N) return;
      shown = i;
      chs.forEach((c, k) => c.classList.toggle("on", k === i));
      const targetYear = chs[i].dataset.y || "2026";
      const targetWhen = chs[i].dataset.when || "";
      setYear(targetYear);
      if (when) when.textContent = targetWhen;
      if (count) count.textContent = String(i + 1).padStart(2, "0");
      sec.classList.toggle("is-now", i === 0);
      sec.dataset.ch = String(i);
    };

    // ---- Canvas Tunnel ----
    let W = 0;
    let H = 0;
    let dpr = 1;
    let rgb = "26, 24, 24";

    const size = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = cv.clientWidth;
      H = cv.clientHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
    };

    const readRgb = () => {
      const isDark =
        root.getAttribute("data-mode") === "dark" ||
        root.classList.contains("dark");
      rgb = isDark ? "232, 228, 224" : "26, 24, 24";
    };

    const RINGS = 16;
    const GAP = 340;
    const FOCAL = 520;
    const R = 620;
    const TICKS = 60;
    const dust = Array.from({ length: 70 }, () => ({
      a: Math.random() * Math.PI * 2,
      r: 120 + Math.random() * 760,
      z: Math.random() * RINGS * GAP,
      s: 0.6 + Math.random() * 1.4,
    }));

    function tunnel(pVal: number, t: number) {
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const isMob = W < 768;
      const cx = W * 0.5;
      const cy = H * 0.55;
      const k = Math.min(W, H) / 900;
      const camZ = pVal * (N - 1) * GAP * 1.6 + t * 18;
      const spin = -pVal * Math.PI * 1.5 - t * 0.02;
      const len = RINGS * GAP;
      ctx.lineCap = "round";

      for (let i = 0; i < RINGS; i++) {
        const z = (((i * GAP - camZ) % len) + len) % len + 60;
        const s = (FOCAL / z) * k;
        const fog =
          Math.min(1, Math.max(0, (z - 260) / 1100)) *
          Math.max(0, 1 - z / len);
        if (fog <= 0.01) continue;

        const rr = R * s;
        const rot = spin + i * 0.21;

        // Dial Ring
        ctx.strokeStyle = `rgba(${rgb}, ${(fog * 0.12).toFixed(3)})`;
        ctx.lineWidth = Math.max(0.5, 1.2 * s);
        ctx.beginPath();
        ctx.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx.stroke();

        // Clock Ticks
        const T = isMob ? 36 : TICKS;
        const every = T / 12;
        for (const hour of [false, true]) {
          const l = (hour ? 46 : 18) * s;
          ctx.beginPath();
          for (let j = 0; j < T; j++) {
            if ((j % every === 0) !== hour) continue;
            const a = rot + (j / T) * Math.PI * 2;
            const c = Math.cos(a);
            const d = Math.sin(a);
            ctx.moveTo(cx + c * (rr - l), cy + d * (rr - l));
            ctx.lineTo(cx + c * rr, cy + d * rr);
          }
          ctx.strokeStyle = `rgba(${rgb}, ${(fog * (hour ? 0.3 : 0.14)).toFixed(3)})`;
          ctx.lineWidth = Math.max(0.5, (hour ? 3 : 1.4) * s);
          ctx.stroke();
        }

        // Clock Hand
        const ha = rot * 3 + i;
        ctx.strokeStyle = `rgba(${rgb}, ${(fog * 0.16).toFixed(3)})`;
        ctx.lineWidth = Math.max(0.5, 2 * s);
        if (rr < Math.min(W, H) * 0.45) {
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(ha) * rr * 0.55, cy + Math.sin(ha) * rr * 0.55);
          ctx.stroke();
        }
      }

      // Dust Particles
      for (const q of dust) {
        const z = (((q.z - camZ * 1.1) % len) + len) % len + 40;
        const s = (FOCAL / z) * k;
        const fog =
          Math.min(1, Math.max(0, (z - 300) / 900)) *
          Math.max(0, 1 - z / len);
        const a = q.a + spin * 0.3;
        ctx.fillStyle = `rgba(${rgb}, ${(fog * 0.35).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(
          cx + Math.cos(a) * q.r * s,
          cy + Math.sin(a) * q.r * s,
          Math.max(0.4, q.s * s * 2.2),
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }

    // Positions measurement along the line
    let firstY = 0;
    let lastY = 0;
    let endY = 0;

    const measure = () => {
      if (!chs[0] || !chs[N - 1]) return;
      const mark = (c: HTMLLIElement) => {
        const firstEl = c.firstElementChild as HTMLElement | null;
        const offset = firstEl ? firstEl.offsetTop : 0;
        return list.offsetTop + c.offsetTop + offset + 8;
      };
      firstY = mark(chs[0]);
      lastY = mark(chs[N - 1]);
      const last = chs[N - 1];
      const pb = parseFloat(window.getComputedStyle(last).paddingBottom) || 0;
      endY = list.offsetTop + last.offsetTop + last.offsetHeight - pb;

      const trackEls = [rail, dtrack, ttrack];
      trackEls.forEach((el) => {
        if (el) {
          el.style.setProperty("--r0", firstY + "px");
          el.style.setProperty("--rh", endY - firstY + "px");
        }
      });

      if (window.innerWidth >= 768) {
        size();
      }
    };

    let raf = 0;
    let p = 0;
    const reducedM = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function update() {
      raf = 0;
      const lr = line!.getBoundingClientRect();
      const mid = window.innerHeight * 0.5;

      const y = Math.min(lastY, Math.max(firstY, mid - lr.top));
      p = (y - firstY) / Math.max(1, lastY - firstY);

      sec!.style.setProperty("--p", p.toFixed(4));
      sec!.style.setProperty("--warm", p.toFixed(3));
      sec!.classList.toggle("at-start", p < 0.002);

      let activeIdx = 0;
      for (let k = 0; k < N; k++) {
        if (lr.top + list!.offsetTop + chs[k].offsetTop < mid + 40) {
          activeIdx = k;
        }
      }
      show(activeIdx);

      if (window.innerWidth >= 768 && !reducedM) {
        tunnel(p, 0);
      }
    }

    const onScrollOrResize = () => {
      if (!raf) {
        raf = requestAnimationFrame(update);
      }
    };

    const onResize = () => {
      measure();
      onScrollOrResize();
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onResize);

    const observer = new MutationObserver(() => {
      readRgb();
      onScrollOrResize();
    });
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-mode", "class"],
    });

    readRgb();
    measure();
    show(0);
    update();

    if (document.fonts) {
      document.fonts.ready.then(() => {
        measure();
        onScrollOrResize();
      });
    }

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [chapters]);

  const initialYear = chapters[0]?.year || "2026";
  const initialDigits = initialYear.split("");

  return (
    <section
      ref={sectionRef}
      id="about"
      className="story"
      aria-labelledby="storyTitle"
      style={{ "--n": chapters.length } as React.CSSProperties}
    >
      <div className="story__amb" aria-hidden="true">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>

      <div className="story__track">
        <div className="story__pin">
          <div className="shell story__stage">
            {/* Sticky Left Column / Clock Stage */}
            <div className="story__clock">
              <canvas
                ref={canvasRef}
                className="story__bg"
                aria-hidden="true"
              ></canvas>
              <p className="eyebrow">{dict.story.eyebrow}</p>
              <h2 className="story__h" id="storyTitle">
                {dict.story.introTitle}
              </h2>

              {/* 4-digit Rolling Odometer */}
              <div className="story__yr" aria-hidden="true">
                {[0, 1, 2, 3].map((colIdx) => (
                  <span key={colIdx} className="dg">
                    <span
                      ref={(el) => {
                        if (el) colsRef.current[colIdx] = el;
                      }}
                      className="dg__c"
                      style={
                        {
                          "--d": initialDigits[colIdx] || "0",
                        } as React.CSSProperties
                      }
                    >
                      {Array.from({ length: 10 }).map((_, digit) => (
                        <i key={digit}>{digit}</i>
                      ))}
                    </span>
                  </span>
                ))}
              </div>

              {/* Active Milestone Date Range */}
              <p ref={whenRef} className="story__when" aria-hidden="true">
                {chapters[0]?.when}
              </p>

              {/* Meter with Rewind Icon & Progress Bar */}
              <div className="story__meter" aria-hidden="true">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  className="story__rw"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 3-6.7" />
                  <path d="M3 4v5h5" />
                  <path d="M12 7v5l3 2" />
                </svg>
                <span ref={countRef} className="story__count">
                  01
                </span>
                <span className="story__of">
                  / {String(chapters.length).padStart(2, "0")}
                </span>
                <i className="story__bar">
                  <b></b>
                </i>
              </div>
            </div>

            {/* Scrollable Right Column / Timeline Line */}
            <div ref={lineRef} className="story__line">
              <span
                ref={railRef}
                className="story__rail"
                aria-hidden="true"
              ></span>
              <span
                ref={ttrackRef}
                className="story__ttrack"
                aria-hidden="true"
              >
                <span className="story__tail"></span>
              </span>
              <span
                ref={dtrackRef}
                className="story__dtrack"
                aria-hidden="true"
              >
                <span className="story__dot"></span>
              </span>

              <ol ref={listRef} className="story__list">
                {chapters.map((ch, idx) => (
                  <li
                    key={idx}
                    className={`ch ${idx === 0 ? "ch--now on" : ""}`}
                    data-y={ch.year}
                    data-when={ch.when}
                  >
                    <p className="ch__date">{ch.when}</p>
                    <h3 className="ch__t">{ch.title}</h3>
                    <p className="ch__org">{ch.org}</p>
                    <ul className="ch__b">
                      {ch.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
