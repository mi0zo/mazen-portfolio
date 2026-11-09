"use client";

import React from "react";
import { Dictionary } from "@/lib/dictionary";
import { useSmoothScroll } from "../providers/SmoothScrollProvider";

interface FooterProps {
  dict: Dictionary;
  onOpenContact?: () => void;
}

export function Footer({ dict, onOpenContact }: FooterProps) {
  const { scrollTo } = useSmoothScroll();
  const t = dict.contact;

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo(0);
  };

  return (
    <footer
      id="contact-footer"
      className="sf relative pt-24 pb-12 bg-background border-t border-line text-foreground overflow-hidden"
      aria-labelledby="sfTitle"
    >
      <div className="max-w-[88rem] mx-auto px-6 md:px-12 relative z-10">
        {/* Main CTA Block */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2
            id="sfTitle"
            className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6"
          >
            {t.ctaTitle}
          </h2>
          <p className="text-base md:text-lg text-muted max-w-xl mx-auto mb-10 leading-relaxed font-normal">
            {t.ctaSubtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenContact}
              className="px-8 h-14 rounded-full bg-primary text-neutral text-sm font-semibold tracking-tight hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer"
            >
              {t.openBtn}
            </button>
            {t.email && t.emailDisplay && (
              <a
                href={t.email}
                className="px-8 h-14 rounded-full border border-line bg-surface/70 text-foreground text-sm font-semibold tracking-tight hover:bg-surface hover:border-foreground/30 transition-all flex items-center justify-center shadow-sm"
              >
                {t.emailDisplay}
              </a>
            )}
          </div>
        </div>

        {/* Links & Attribution Bottom Bar */}
        <div className="pt-12 border-t border-line/60 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted">
          {/* Copyright */}
          <div>
            © {new Date().getFullYear()} {dict.name}. {dict.footer.rights}
          </div>

          {/* Social Profiles (Rendered only when real URLs are provided) */}
          {t.socialLinks?.github && !t.socialLinks.github.includes("placeholder") && (
            <div className="flex items-center gap-6 font-medium text-foreground">
              <a
                href={t.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-secondary transition-colors"
              >
                GitHub
              </a>
              <a
                href={t.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-secondary transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={t.socialLinks.x}
                target="_blank"
                rel="noreferrer"
                className="hover:text-secondary transition-colors"
              >
                Twitter / X
              </a>
            </div>
          )}

          {/* Back to top */}
          <button
            onClick={handleBackToTop}
            className="hover:text-foreground transition-colors font-medium flex items-center gap-1"
          >
            <span>↑</span>
            <span>{dict.footer.backToTop}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

