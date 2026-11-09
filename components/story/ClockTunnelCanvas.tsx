"use client";

import React, { useEffect, useRef } from "react";

interface ClockTunnelCanvasProps {
  progress: number;
}

export function ClockTunnelCanvas({ progress }: ClockTunnelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = 1;
    let W = 0;
    let H = 0;
    let rgb = "26, 24, 24";

    const RINGS = 16;
    const GAP = 340;
    const FOCAL = 520;
    const R = 620;
    const TICKS = 60;
    const len = RINGS * GAP;

    // Dust particles in 3D
    const dust = Array.from({ length: 60 }, () => ({
      a: Math.random() * Math.PI * 2,
      r: 120 + Math.random() * 700,
      z: Math.random() * RINGS * GAP,
      s: 0.6 + Math.random() * 1.4,
    }));

    function readRgb() {
      const mode = document.documentElement.dataset.mode;
      rgb = mode === "dark" ? "232, 228, 224" : "26, 24, 24";
    }

    function resize() {
      const rect = container!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width;
      H = rect.height;
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      readRgb();
    }

    resize();
    window.addEventListener("resize", resize);

    const observer = new MutationObserver(readRgb);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-mode"],
    });

    let rafId = 0;
    let t = 0;

    function render() {
      t += 0.016;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, W, H);

      const cx = W * 0.5;
      const cy = H * 0.55;
      const k = Math.min(W, H) / 900;
      const camZ = progress * 4 * GAP * 1.6 + t * 18;
      const spin = -progress * Math.PI * 1.5 - t * 0.02;

      ctx!.lineCap = "round";

      // Draw Rings & Dials
      for (let i = 0; i < RINGS; i++) {
        const z = (((i * GAP - camZ) % len) + len) % len + 60;
        const s = (FOCAL / z) * k;
        const fog =
          Math.min(1, Math.max(0, (z - 260) / 1100)) * Math.max(0, 1 - z / len);

        if (fog <= 0.01) continue;

        const rr = R * s;
        const rot = spin + i * 0.21;

        // Circular ring
        ctx!.strokeStyle = `rgba(${rgb}, ${(fog * 0.12).toFixed(3)})`;
        ctx!.lineWidth = Math.max(0.5, 1.2 * s);
        ctx!.beginPath();
        ctx!.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx!.stroke();

        // Clock Ticks
        const T = W < 768 ? 36 : TICKS;
        const every = T / 12;

        for (const isHour of [false, true]) {
          const l = (isHour ? 42 : 16) * s;
          ctx!.beginPath();
          for (let j = 0; j < T; j++) {
            if ((j % every === 0) !== isHour) continue;
            const a = rot + (j / T) * Math.PI * 2;
            const ca = Math.cos(a);
            const sa = Math.sin(a);
            ctx!.moveTo(cx + ca * (rr - l), cy + sa * (rr - l));
            ctx!.lineTo(cx + ca * rr, cy + sa * rr);
          }
          ctx!.strokeStyle = `rgba(${rgb}, ${(
            fog * (isHour ? 0.28 : 0.12)
          ).toFixed(3)})`;
          ctx!.lineWidth = Math.max(0.5, (isHour ? 2.5 : 1.2) * s);
          ctx!.stroke();
        }

        // Clock hand on dial
        const ha = rot * 3 + i;
        ctx!.strokeStyle = `rgba(${rgb}, ${(fog * 0.15).toFixed(3)})`;
        ctx!.lineWidth = Math.max(0.5, 2 * s);
        if (rr < Math.min(W, H) * 0.45) {
          ctx!.beginPath();
          ctx!.moveTo(cx, cy);
          ctx!.lineTo(cx + Math.cos(ha) * rr * 0.55, cy + Math.sin(ha) * rr * 0.55);
          ctx!.stroke();
        }
      }

      // Dust particles
      for (const q of dust) {
        const z = (((q.z - camZ * 1.1) % len) + len) % len + 40;
        const s = (FOCAL / z) * k;
        const fog =
          Math.min(1, Math.max(0, (z - 300) / 900)) * Math.max(0, 1 - z / len);
        const a = q.a + spin * 0.3;

        ctx!.fillStyle = `rgba(${rgb}, ${(fog * 0.35).toFixed(3)})`;
        ctx!.beginPath();
        ctx!.arc(
          cx + Math.cos(a) * q.r * s,
          cy + Math.sin(a) * q.r * s,
          Math.max(0.4, q.s * s * 2.2),
          0,
          Math.PI * 2
        );
        ctx!.fill();
      }

      rafId = requestAnimationFrame(render);
    }

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [progress]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none opacity-40 md:opacity-60 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
    </div>
  );
}

