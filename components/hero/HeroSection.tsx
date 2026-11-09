"use client";

import React from "react";
import { Dictionary } from "@/lib/dictionary";
import { FlipCalendar } from "./FlipCalendar";
import { LiquidReveal } from "./LiquidReveal";
import { useSmoothScroll } from "../providers/SmoothScrollProvider";

interface HeroSectionProps {
  dict: Dictionary;
  onOpenCard?: () => void;
  onOpenContact?: () => void;
}

export function HeroSection({
  dict,
  onOpenCard,
  onOpenContact,
}: HeroSectionProps) {
  const { scrollTo } = useSmoothScroll();
  const isRTL = dict.dir === "rtl";

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("works");
    if (el) scrollTo(el);
  };

  return (
    <section
      id="home"
      className="relative min-h-[88vh] lg:min-h-[92vh] pt-20 sm:pt-24 pb-8 sm:pb-12 flex items-center justify-center overflow-hidden"
      aria-label="Introduction"
    >
      <div className="max-w-[92rem] mx-auto px-6 md:px-14 lg:px-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
        {/* Left Column: Editorial Headline & Actions */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start z-10 py-4 lg:py-6 self-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-line bg-surface/70 backdrop-blur-md text-xs font-medium text-muted mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span>{dict.status}</span>
          </div>

          {/* Greeting */}
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground/80 mb-3">
            {dict.hero.greeting}
          </h2>

          {/* Headline with Flip Calendar */}
          <h1 className="h1 text-4xl md:text-6xl lg:text-[68px] font-semibold tracking-tight text-foreground leading-[1.15] mb-8">
            <span className="block">{dict.hero.headlineStart}</span>
            <span className="cal-line">
              <FlipCalendar skills={dict.hero.flipSkills} dir={dict.dir} />
            </span>
          </h1>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#works"
              onClick={handleExploreClick}
              className="inline-flex items-center justify-center px-6 h-12 rounded-full bg-primary text-neutral text-sm font-medium tracking-tight hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
            >
              {dict.nav.works}
            </a>
            <button
              onClick={onOpenContact}
              className="inline-flex items-center justify-center px-6 h-12 rounded-full border border-line bg-surface/60 backdrop-blur-md text-foreground text-sm font-medium tracking-tight hover:bg-surface hover:border-foreground/30 transition-all shadow-sm"
            >
              {dict.nav.contact}
            </button>
          </div>
        </div>

        {/* Right Column: LiquidReveal Portrait & Ability Card Trigger */}
        <div className="lg:col-span-6 xl:col-span-6 relative flex justify-center lg:justify-end items-center h-[520px] sm:h-[620px] md:h-[680px] lg:h-[760px] xl:h-[820px] self-center">
          {/* Ambient radial glow behind portrait */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface/50 via-surface/15 to-transparent rounded-full filter blur-3xl pointer-events-none -z-10" />

          {/* The Cutout Portrait with LiquidReveal */}
          <div className="relative w-full max-w-[460px] sm:max-w-[540px] md:max-w-[600px] lg:max-w-[660px] xl:max-w-[720px] h-full flex items-center justify-center">
            <LiquidReveal
              bwSrc="/images/portrait-bw.webp"
              colorSrc="/images/portrait-color.webp"
              alt={dict.locale === "ar" ? "مازن - مهندس ومطور برمجيات" : "Mazen - Software Developer"}
              className="h-full"
            />

            {/* Floating Ability Card Trigger Badge pinned over figure */}
            <button
              id="holoOpen"
              onClick={onOpenCard}
              className="fig__card group"
              aria-haspopup="dialog"
              aria-controls="holo"
              aria-label={dict.hero.cardBadge}
            >
              <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-black font-bold flex items-center justify-center text-[10px] shadow-sm group-hover:rotate-45 transition-transform">
                ✦
              </span>
              <span>{dict.hero.cardBadge}</span>
              <span className="text-white/60 group-hover:translate-x-0.5 group-hover:text-white transition-all">
                {dict.locale === "ar" ? "←" : "→"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

