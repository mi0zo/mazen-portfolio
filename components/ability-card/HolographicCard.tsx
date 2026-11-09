"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Dictionary } from "@/lib/dictionary";

interface HolographicCardProps {
  dict: Dictionary;
}

export function HolographicCard({ dict }: HolographicCardProps) {
  const cardRef = useRef<HTMLButtonElement | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const pointerOriginRef = useRef<[number, number] | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const RX = 11;
    const RY = 14;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let held = false;
    let loop = 0;
    let t0 = performance.now();

    function step(now: number) {
      const sway = held || calm.matches ? 0 : 1;
      const t = (now - t0) / 1000;
      cx += (tx + sway * Math.sin(t * 0.62) * 0.34 - cx) * 0.12;
      cy += (ty + sway * Math.sin(t * 0.47 + 1.1) * 0.22 - cy) * 0.12;

      const S = card!.style;
      S.setProperty("--px", cx.toFixed(4));
      S.setProperty("--py", cy.toFixed(4));
      S.setProperty("--ry", `${(cx * RY).toFixed(2)}deg`);
      S.setProperty("--rx", `${(-cy * RX).toFixed(2)}deg`);
      S.setProperty("--lift", Math.min(1, Math.hypot(cx, cy) * 1.3).toFixed(3));

      loop = requestAnimationFrame(step);
    }

    loop = requestAnimationFrame(step);

    const clamp = (v: number) => Math.max(-1, Math.min(1, v));

    const onPointerMove = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const u = (e.clientX - r.left) / r.width;
      const v = (e.clientY - r.top) / r.height;

      if (u < -0.4 || u > 1.4 || v < -0.35 || v > 1.35) {
        held = false;
        tx = 0;
        ty = 0;
        return;
      }

      held = true;
      card.classList.add("live");
      tx = clamp((u - 0.5) * 2);
      ty = clamp((v - 0.5) * 2);
    };

    const onPointerLeave = () => {
      held = false;
      tx = 0;
      ty = 0;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(loop);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerOriginRef.current = [e.clientX, e.clientY];
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerOriginRef.current) {
      const [ox, oy] = pointerOriginRef.current;
      const dist = Math.hypot(e.clientX - ox, e.clientY - oy);
      if (dist < 9) {
        setIsFlipped((prev) => !prev);
      }
    }
    pointerOriginRef.current = null;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsFlipped((prev) => !prev);
    }
  };

  return (
    <div className="holo__lite in">
      <button
        ref={cardRef}
        id="hc"
        className={`hc ${isFlipped ? "flip" : ""}`}
        aria-label={dict.abilityCard.flipHint}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
      >
        <i className="hc__aura" aria-hidden="true" />
        <span className="hc__in">
          {/* Front Face: Ornate Plate with 3D Parallax Window & Specular Layers */}
          <span className="hc__face hc__front">
            <span className="hc__win" aria-hidden="true">
              <img
                className="hc__bg"
                src="/card/win_bg.webp"
                alt=""
                decoding="async"
                loading="eager"
              />
              <img
                className="hc__sub"
                src="/card/win_sub.webp"
                alt=""
                decoding="async"
                loading="eager"
              />
              <i className="hc__wsh" />
            </span>
            <img
              className="hc__plate"
              src="/card/plate.webp"
              alt={`${dict.hero.greeting} - ${dict.abilityCard.title}`}
              decoding="async"
              loading="eager"
            />
            <i className="hc__foil" aria-hidden="true" />
            <i className="hc__sheen" aria-hidden="true" />
            <i className="hc__glare" aria-hidden="true" />
            <i className="hc__rim" aria-hidden="true" />
          </span>

          {/* Back Face: Astrolabe Monogram Foil with Gold Bevel */}
          <span className="hc__face hc__back">
            <img
              className="hc__backimg"
              src="/card/back.webp"
              alt=""
              decoding="async"
              loading="eager"
            />
            <i className="hc__foil" aria-hidden="true" />
            <i className="hc__glare" aria-hidden="true" />
            <i className="hc__rim" aria-hidden="true" />
          </span>
        </span>
      </button>

      {/* Hint text */}
      <p className="hc__hint" aria-hidden="true">
        {dict.locale === "ar"
          ? "حرّك المؤشر فوق البطاقة · انقر للقلب"
          : "Move across the card · tap to flip"}
      </p>
    </div>
  );
}

