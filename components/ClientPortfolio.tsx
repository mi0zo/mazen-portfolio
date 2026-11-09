"use client";

import React, { useEffect, useState } from "react";
import { Dictionary } from "@/lib/dictionary";
import { Header } from "@/components/common/Header";
import { PageLoader } from "@/components/common/PageLoader";
import { PullCord } from "@/components/common/PullCord";
import { HeroSection } from "@/components/hero/HeroSection";
import { DoorsWall } from "@/components/doors/DoorsWall";
import { StorySection } from "@/components/story/StorySection";
import { Footer } from "@/components/contact/Footer";
import { HolographicModal } from "@/components/ability-card/HolographicModal";
import { ContactModal } from "@/components/contact/ContactModal";
import { FloatingBackToTop } from "@/components/common/FloatingBackToTop";

interface ClientPortfolioProps {
  dict: Dictionary;
}

export function ClientPortfolio({ dict }: ClientPortfolioProps) {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Fullscreen shortcut 'F' key (matching reference site feature)
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
      ) {
        return;
      }
      if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* 4-Panel Multi-Color Opening Page Loader */}
      <PageLoader dict={dict} />

      {/* Header & Verlet Pull Cord */}
      <Header dict={dict} onOpenContact={() => setIsContactOpen(true)} />
      <PullCord dir={dict.dir} />

      {/* Main Content Flow */}
      <main id="main">
        {/* Hero Section with Flip Calendar & LiquidReveal Portrait */}
        <HeroSection
          dict={dict}
          onOpenCard={() => setIsCardOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* The Hallway of Doors with 60x Walkthrough Zoom */}
        <DoorsWall dict={dict} />

        {/* "My Story" Timeline with 3D Clock Tunnel Canvas & Rolling Odometer */}
        <StorySection dict={dict} />
      </main>

      {/* Contact & Footer */}
      <Footer dict={dict} onOpenContact={() => setIsContactOpen(true)} />

      {/* 3D Holographic Ability Card Modal */}
      <HolographicModal
        dict={dict}
        isOpen={isCardOpen}
        onClose={() => setIsCardOpen(false)}
      />

      {/* 5-Step Project Inquiry Modal */}
      <ContactModal
        dict={dict}
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Floating Circular Back-to-Top with Progress Ring */}
      <FloatingBackToTop />
    </div>
  );
}

