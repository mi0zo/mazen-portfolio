"use client";

import React, { useEffect, useRef } from "react";

interface DoorCursorProps {
  label?: string;
  isVisible: boolean;
}

export function DoorCursor({ label = "Click to enter", isVisible }: DoorCursorProps) {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    function onPointerMove(e: PointerEvent) {
      el!.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 z-50 pointer-events-none transition-opacity duration-150 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
      aria-hidden="true"
    >
      <div className="px-4 py-2 rounded-full bg-[#1A1818] text-[#E8E4E0] text-[13px] font-medium tracking-tight shadow-2xl whitespace-nowrap border border-white/15">
        {label}
      </div>
    </div>
  );
}
