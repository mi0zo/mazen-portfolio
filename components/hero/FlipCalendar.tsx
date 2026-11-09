"use client";

import React, { useEffect, useRef } from "react";

interface FlipCalendarProps {
  skills: string[];
  dir?: "ltr" | "rtl";
}

export function FlipCalendar({ skills, dir = "ltr" }: FlipCalendarProps) {
  const calRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const cal = calRef.current;
    if (!cal) return;

    const HOLD = 1800;
    const FLIP = 1250;
    const body = cal.querySelector(".cal__body") as HTMLElement | null;
    const leaf = cal.querySelector(".cal__leaf") as HTMLElement | null;
    const under = cal.querySelector("[data-under]") as HTMLElement | null;
    const face = cal.querySelector(".cal__face") as HTMLElement | null;
    const measure = cal.querySelector(".cal__measure") as HTMLElement | null;
    const rings = cal.querySelector(".cal__rings") as HTMLElement | null;

    if (!body || !leaf || !under || !face || !measure || !rings) return;

    const n = skills.length;
    let i = 0;
    let timer: NodeJS.Timeout;
    let flipping = false;

    const paint = (page: HTMLElement, k: number) => {
      const word = page.querySelector(".cal__word");
      const no = page.querySelector(".cal__no");
      if (word) word.textContent = skills[k];
      if (no) no.textContent = `${String(k + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
    };

    paint(face, 0);
    paint(under, 1);

    function fit() {
      if (!cal || !body || !measure || !rings) return;
      cal.style.fontSize = "";
      const fs = parseFloat(getComputedStyle(cal).fontSize) || 16;
      let max = 0;
      for (const w of skills) {
        measure.textContent = w;
        max = Math.max(max, measure.getBoundingClientRect().width);
      }
      const wEm = max / fs + 0.8 + 0.06;
      body.style.setProperty("--cal-w", wEm.toFixed(3) + "em");
      cal.style.setProperty("--cal-w", wEm.toFixed(3) + "em");

      // Rings spaced roughly every 0.7em
      const count = Math.max(5, Math.round((wEm - 0.64) / 0.7) + 1);
      rings.innerHTML = "<i></i>".repeat(count);
      cal.querySelectorAll(".cal__holes").forEach((h) => {
        h.innerHTML = "<i></i>".repeat(count);
      });
    }

    fit();
    document.fonts?.ready?.then(fit);

    let resizeTimer: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(fit, 120);
    };
    window.addEventListener("resize", onResize);

    function flip() {
      if (document.hidden) {
        timer = setTimeout(flip, 600);
        return;
      }
      if (flipping) return;
      flipping = true;
      const next = (i + 1) % n;

      const timing: KeyframeAnimationOptions = {
        duration: FLIP,
        easing: "cubic-bezier(.5, .05, .2, 1)",
        fill: "forwards",
      };

      face!.animate(
        [
          { opacity: 1 },
          { opacity: 1, offset: 0.285 },
          { opacity: 0, offset: 0.295 },
          { opacity: 0 },
        ],
        { duration: FLIP, easing: "linear", fill: "forwards" }
      );

      const rear = leaf!.querySelector(".cal__rear") as HTMLElement | null;
      if (rear) {
        rear.animate(
          [
            { filter: "brightness(1)" },
            { filter: "brightness(1.02)", offset: 0.29 },
            { filter: "brightness(.96)", offset: 0.45 },
            { filter: "brightness(.9)" },
          ],
          { duration: FLIP, easing: "linear", fill: "forwards" }
        );
      }

      const a = leaf!.animate(
        [
          { transform: "translateZ(.004em) rotateX(0deg)" },
          { transform: "translateZ(.004em) rotateX(352deg)" },
        ],
        timing
      );

      const shadeFace = face!.querySelector(".cal__shade") as HTMLElement | null;
      if (shadeFace) {
        shadeFace.animate(
          [
            { opacity: 0 },
            { opacity: 0.45, offset: 0.2 },
            { opacity: 0, offset: 0.275 },
            { opacity: 0 },
          ],
          { duration: FLIP, easing: "linear", fill: "forwards" }
        );
      }

      const shadeUnder = under!.querySelector(".cal__shade") as HTMLElement | null;
      if (shadeUnder) {
        shadeUnder.animate(
          [{ opacity: 0.7 }, { opacity: 0 }],
          {
            duration: FLIP * 0.9,
            easing: "cubic-bezier(.3,.6,.4,1)",
            fill: "forwards",
          }
        );
      }

      a.onfinish = () => {
        i = next;
        paint(face!, i);
        leaf!.style.transform = "translateZ(.004em) rotateX(0deg)";
        face!.style.opacity = "1";
        paint(under!, (i + 1) % n);
        flipping = false;
        timer = setTimeout(flip, HOLD);
      };
    }

    timer = setTimeout(flip, HOLD);

    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, [skills, dir]);

  return (
    <span
      ref={calRef}
      className="cal align-middle select-none mx-2 my-1"
      id="cal"
    >
      <span className="cal__body">
        <span className="cal__stand" />
        <span className="cal__stack">
          <span className="cal__back">
            <span className="cal__holes" />
          </span>
          <span className="cal__page" data-under>
            <span className="cal__holes" />
            <span className="cal__word">{skills[1] || skills[0]}</span>
            <span className="cal__no">02 / {String(skills.length).padStart(2, "0")}</span>
            <span className="cal__shade" />
          </span>
          <span className="cal__leaf">
            <span className="cal__face">
              <span className="cal__holes" />
              <span className="cal__word">{skills[0]}</span>
              <span className="cal__no">01 / {String(skills.length).padStart(2, "0")}</span>
              <span className="cal__shade" />
            </span>
            <span className="cal__rear">
              <span className="cal__holes" />
            </span>
          </span>
        </span>
        <span className="cal__rings" />
      </span>
      <span className="cal__measure" />
    </span>
  );
}
