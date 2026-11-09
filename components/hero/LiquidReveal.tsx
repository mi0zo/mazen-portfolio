"use client";

import React, { useEffect, useRef, useState } from "react";

interface LiquidRevealProps {
  bwSrc: string;
  colorSrc: string;
  alt?: string;
  className?: string;
}

export function LiquidReveal({
  bwSrc,
  colorSrc,
  alt = "Portrait",
  className = "",
}: LiquidRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check reduced motion or touch device
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchOnly = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (reducedMotion || isTouchOnly) {
      setIsReady(true);
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let radius = 140 * dpr;
    const decay = 0.016;

    // Offscreen canvases
    const createOffscreen = () => {
      const c = document.createElement("canvas");
      return [c, c.getContext("2d")!] as const;
    };
    const [bwC, bwX] = createOffscreen();
    const [colC, colX] = createOffscreen();
    const [mask, mX] = createOffscreen();
    const [tmp, tX] = createOffscreen();

    const bwImg = new Image();
    const colImg = new Image();
    let loaded = 0;

    const onImgLoad = () => {
      loaded++;
      if (loaded === 2) {
        setIsReady(true);
        resize();
      }
    };

    bwImg.onload = onImgLoad;
    colImg.onload = onImgLoad;
    bwImg.src = bwSrc;
    colImg.src = colorSrc;

    function fitDraw(targetCtx: CanvasRenderingContext2D, img: HTMLImageElement) {
      if (!img.width || !img.height) return;
      targetCtx.clearRect(0, 0, W, H);
      // Contain & top-aligned with slight breathing room so portrait is raised nicely
      const scale = Math.min(W / img.width, H / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = (W - dw) / 2;
      // Anchor near the top (small breathing margin) so no empty space above head
      const dy = Math.max(0, Math.min(16 * dpr, (H - dh) * 0.08));
      targetCtx.drawImage(img, dx, dy, dw, dh);
    }

    function resize() {
      const r = container!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, Math.round(r.width * dpr));
      H = Math.max(1, Math.round(r.height * dpr));

      canvas!.width = W;
      canvas!.height = H;
      for (const c of [bwC, colC, mask, tmp]) {
        c.width = W;
        c.height = H;
      }
      radius = 140 * dpr;

      if (loaded === 2) {
        fitDraw(bwX, bwImg);
        fitDraw(colX, colImg);
        render();
      }
    }

    function stamp(x: number, y: number) {
      const g = mX.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.55, "rgba(255,255,255,0.85)");
      g.addColorStop(1, "rgba(255,255,255,0)");

      mX.globalCompositeOperation = "source-over";
      mX.fillStyle = g;
      mX.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }

    function render() {
      ctx!.globalCompositeOperation = "source-over";
      ctx!.clearRect(0, 0, W, H);

      // Draw BW portrait
      ctx!.drawImage(bwC, 0, 0);

      // Subtract mask: BW * (1 - mask)
      ctx!.globalCompositeOperation = "destination-out";
      ctx!.drawImage(mask, 0, 0);

      // Prepare color * mask in tmp
      tX.globalCompositeOperation = "source-over";
      tX.clearRect(0, 0, W, H);
      tX.drawImage(colC, 0, 0);
      tX.globalCompositeOperation = "destination-in";
      tX.drawImage(mask, 0, 0);

      // Add color back to base using 'lighter'
      ctx!.globalCompositeOperation = "lighter";
      ctx!.drawImage(tmp, 0, 0);
      ctx!.globalCompositeOperation = "source-over";
    }

    let rafId = 0;
    let isHovering = false;

    function loop() {
      // Fade mask when stationary
      if (!isHovering) {
        mX.globalCompositeOperation = "destination-out";
        mX.fillStyle = `rgba(0,0,0,${decay})`;
        mX.fillRect(0, 0, W, H);
      }
      render();
      rafId = requestAnimationFrame(loop);
    }

    function onPointerMove(e: PointerEvent) {
      isHovering = true;
      const rect = container!.getBoundingClientRect();
      const x = (e.clientX - rect.left) * dpr;
      const y = (e.clientY - rect.top) * dpr;
      stamp(x, y);
    }

    function onPointerLeave() {
      isHovering = false;
    }

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", resize);
    };
  }, [bwSrc, colorSrc]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none ${className}`}
    >
      {/* Fallback image (visible while loading or on touch devices) */}
      <img
        src={bwSrc}
        alt={alt}
        className={`w-full h-full object-contain object-top pointer-events-none transition-opacity duration-300 ${
          isReady ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* LiquidReveal Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-contain pointer-events-auto cursor-crosshair transition-opacity duration-500 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

