"use client";

import React, { useEffect, useState } from "react";
import { Dictionary } from "@/lib/dictionary";
import { HolographicCard } from "./HolographicCard";
import { useSmoothScroll } from "../providers/SmoothScrollProvider";

interface HolographicModalProps {
  dict: Dictionary;
  isOpen: boolean;
  onClose: () => void;
}

export function HolographicModal({
  dict,
  isOpen,
  onClose,
}: HolographicModalProps) {
  const { stopScroll, startScroll } = useSmoothScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      stopScroll();
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKeyDown);
      return () => {
        startScroll();
        window.removeEventListener("keydown", onKeyDown);
      };
    } else {
      startScroll();
      const timeout = setTimeout(() => setMounted(false), 380);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, onClose, stopScroll, startScroll]);

  if (!mounted && !isOpen) return null;

  return (
    <div
      id="holo"
      role="dialog"
      aria-modal="true"
      aria-label={dict.abilityCard.title}
      className={`holo-overlay ${isOpen ? "on" : ""}`}
      onClick={onClose}
    >
      {/* Close Button (.holo__x) */}
      <button
        id="holoClose"
        onClick={onClose}
        className="holo__x"
        aria-label={dict.abilityCard.close}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          className="w-4 h-4"
          aria-hidden="true"
        >
          <path d="M5 5l14 14M19 5 5 19" />
        </svg>
        <span>{dict.abilityCard.close}</span>
      </button>

      {/* 3D Holographic Card Container */}
      <div
        className="relative w-full h-full flex items-center justify-center pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <HolographicCard dict={dict} />
      </div>
    </div>
  );
}
