"use client";

import React, { useState } from "react";
import { Dictionary } from "@/lib/dictionary";

interface AbilityCardFallbackProps {
  dict: Dictionary;
}

export function AbilityCardFallback({ dict }: AbilityCardFallbackProps) {
  const [flipped, setFlipped] = useState(false);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotY(x * 30);
    setRotX(-y * 30);
  };

  const handlePointerLeave = () => {
    setRotX(0);
    setRotY(0);
  };

  return (
    <div
      className="relative w-80 h-[460px] md:w-96 md:h-[540px] cursor-pointer select-none"
      style={{ perspective: "1200px" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full h-full rounded-2xl shadow-2xl transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotX}deg) rotateY(${rotY + (flipped ? 180 : 0)}deg)`,
        }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-amber-300/40 bg-neutral shadow-2xl flex flex-col justify-between p-6"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Card Scenery Window */}
          <div className="relative w-full h-48 rounded-xl overflow-hidden bg-primary shadow-inner">
            <img
              src="/card/win_bg.webp"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <img
              src="/card/win_sub.webp"
              alt=""
              className="absolute inset-0 w-full h-full object-contain object-bottom filter drop-shadow-lg"
            />
          </div>

          {/* Card Info & Plate */}
          <div className="my-auto py-4">
            <h4 className="font-bold text-lg md:text-xl text-primary tracking-tight">
              {dict.name}
            </h4>
            <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-4">
              {dict.role}
            </p>

            {/* Disciplines (Non-numeric, verified software capabilities) */}
            <div className="space-y-2 pt-1">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-primary/60 mb-2">
                {dict.abilityCard.disciplinesTitle}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {dict.abilityCard.disciplines.map((d, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-amber-900/20 bg-amber-50/60 dark:bg-amber-950/20 text-[11px] font-medium text-primary tracking-tight shadow-xs"
                  >
                    <span className="w-1 h-1 rounded-full bg-secondary" />
                    <span>{d}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Foil sheen overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 bg-gradient-to-tr from-transparent via-white/30 to-transparent"
            style={{ mixBlendMode: "overlay" }}
          />
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-amber-300/40 bg-[#161413] shadow-2xl flex flex-col items-center justify-center p-6 text-center"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <img
            src="/card/back.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="relative z-10 p-6 rounded-xl border border-amber-400/30 bg-black/40 backdrop-blur-sm">
            <span className="text-3xl text-amber-400 block mb-2">✦</span>
            <h5 className="font-editorial italic text-xl text-amber-200">
              {dict.name}
            </h5>
            <p className="text-xs text-amber-100/70 tracking-widest uppercase mt-1">
              Engineering Mastercraft
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

