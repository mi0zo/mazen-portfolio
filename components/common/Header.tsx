"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Dictionary } from "@/lib/dictionary";
import { LiveClock } from "./LiveClock";
import { useSmoothScroll } from "../providers/SmoothScrollProvider";

interface HeaderProps {
  dict: Dictionary;
  onOpenContact?: () => void;
}

export function Header({ dict, onOpenContact }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const { scrollTo } = useSmoothScroll();
  const isRTL = dict.dir === "rtl";
  const targetLang = dict.locale === "en" ? "ar" : "en";

  React.useEffect(() => {
    const handleScroll = () => {
      setIsStuck(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      scrollTo(el, { offset: -60 });
    }
  };

  const navLinks = [
    { id: "home", label: dict.locale === "ar" ? "الرئيسية" : "Home" },
    { id: "works", label: dict.doors.items[0]?.plate || "Web Development", isDoor: true, doorIdx: 0 },
    { id: "works", label: dict.doors.items[1]?.plate || "App Development", isDoor: true, doorIdx: 1 },
    { id: "works", label: dict.doors.items[2]?.plate || "Architecture", isDoor: true, doorIdx: 2 },
    { id: "works", label: dict.doors.items[3]?.plate || "UI/UX Design", isDoor: true, doorIdx: 3 },
    { id: "about", label: dict.nav.story },
  ];

  return (
    <>
      <header
        className={`hdr fixed top-0 inset-x-0 z-40 h-16 sm:h-20 transition-all duration-300 ${
          isStuck
            ? "bg-background/90 backdrop-blur-md border-b border-line/50 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[92rem] mx-auto h-full px-6 sm:px-10 md:px-16 flex items-center justify-between gap-4">
          {/* Left Navigation: Brand Monogram + Full Desktop Nav */}
          <div className="flex items-center gap-6 xl:gap-8 min-w-0">
            {/* Monogram / Home Link */}
            <a
              href="#home"
              onClick={handleNavClick("home")}
              className="flex items-center gap-2.5 group cursor-pointer flex-shrink-0"
              aria-label="Home"
            >
              <span className="w-8 h-8 rounded-full bg-primary text-neutral flex items-center justify-center font-bold text-sm tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
                {dict.name[0]}
              </span>
              <span className="font-semibold text-sm tracking-tight text-foreground hidden sm:inline">
                {dict.name}
              </span>
            </a>

            {/* Desktop Primary Nav Bar (Visible on >= 1100px screens, matching reference layout) */}
            <nav aria-label="Primary" className="hidden min-[1100px]:block">
              <ul className="nav flex items-center gap-5 xl:gap-6 text-sm font-medium list-none m-0 p-0 text-foreground/80">
                {navLinks.map((link, idx) => (
                  <li key={idx}>
                    <button
                      onClick={handleNavClick(link.id)}
                      className="cursor-pointer hover:text-foreground transition-colors py-1 inline-flex items-center gap-1 opacity-80 hover:opacity-100"
                    >
                      <span>{link.label}</span>
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => {
                      if (onOpenContact) onOpenContact();
                      else {
                        const el = document.getElementById("contact-footer");
                        if (el) scrollTo(el);
                      }
                    }}
                    className="cursor-pointer hover:text-foreground transition-colors py-1 inline-flex items-center gap-1 opacity-80 hover:opacity-100"
                  >
                    <span>{dict.nav.contact}</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Right Actions: Local Time Chip + Language Switcher + Mobile Menu */}
          <div className="hdr__right flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Unified Local Time & Date Chip */}
            <LiveClock locale={dict.locale} />

            {/* Language Switcher Chip */}
            <Link
              href={`/${targetLang}`}
              className="chip px-3 py-1.5 rounded-full border border-line bg-surface/70 backdrop-blur-md text-xs font-medium text-foreground hover:border-foreground/40 transition-all shadow-sm"
              title={`Switch language to ${dict.nav.langName}`}
            >
              {dict.nav.switchLang}
            </Link>

            {/* Mobile / Tablet Menu Button (Visible < 1100px) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="min-[1100px]:hidden chip menu-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-line bg-surface/70 backdrop-blur-md text-xs font-semibold text-foreground hover:bg-neutral/60 transition-all"
              aria-label={dict.nav.menu}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
              <span>{dict.nav.menu}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col justify-center items-center gap-6 text-xl sm:text-2xl font-semibold min-[1100px]:hidden animate-in fade-in duration-200">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 p-2.5 rounded-full border border-line text-foreground hover:bg-neutral"
            aria-label={dict.nav.close}
          >
            ✕
          </button>

          {navLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={handleNavClick(link.id)}
              className="hover:text-primary transition-colors text-foreground"
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => {
              setMenuOpen(false);
              if (onOpenContact) onOpenContact();
              else {
                const el = document.getElementById("contact-footer");
                if (el) scrollTo(el);
              }
            }}
            className="hover:text-primary transition-colors text-foreground"
          >
            {dict.nav.contact}
          </button>

          <Link
            href={`/${targetLang}`}
            onClick={() => setMenuOpen(false)}
            className="text-xs px-4 py-2 rounded-full border border-line mt-4 font-normal"
          >
            {dict.nav.switchLang}
          </Link>
        </div>
      )}
    </>
  );
}
