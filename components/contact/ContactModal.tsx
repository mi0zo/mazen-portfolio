"use client";

import React, { useEffect } from "react";
import { Dictionary } from "@/lib/dictionary";
import { QuestionnaireForm } from "./QuestionnaireForm";
import { useSmoothScroll } from "../providers/SmoothScrollProvider";

interface ContactModalProps {
  dict: Dictionary;
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ dict, isOpen, onClose }: ContactModalProps) {
  const { stopScroll, startScroll } = useSmoothScroll();

  useEffect(() => {
    if (isOpen) {
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
    }
  }, [isOpen, onClose, stopScroll, startScroll]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={dict.contact.modalTitle}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-surface rounded-3xl border border-line shadow-2xl p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Title and Close Button */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-line">
          <h3 className="font-bold text-lg text-foreground tracking-tight">
            {dict.contact.modalTitle}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-xs font-semibold text-foreground hover:bg-neutral transition-all"
            aria-label={dict.nav.close}
          >
            ✕
          </button>
        </div>

        {/* 5-Step Form */}
        <QuestionnaireForm dict={dict} onClose={onClose} />
      </div>
    </div>
  );
}

