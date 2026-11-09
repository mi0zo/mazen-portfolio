"use client";

import React, { useEffect, useRef, useState } from "react";
import { Dictionary } from "@/lib/dictionary";
import { DoorUnit } from "./DoorUnit";
import { DoorCursor } from "./DoorCursor";
import { DoorInfoCard } from "./DoorInfoCard";
import { useSmoothScroll } from "../providers/SmoothScrollProvider";

interface DoorsWallProps {
  dict: Dictionary;
  onEnterRoom?: (route: string, title: string) => void;
}

export function DoorsWall({ dict, onEnterRoom }: DoorsWallProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [activeRoom, setActiveRoom] = useState<{
    route: string;
    title: string;
  } | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [infoStyle, setInfoStyle] = useState<React.CSSProperties>({});

  const sectionRef = useRef<HTMLElement | null>(null);
  const wallRowRef = useRef<HTMLDivElement | null>(null);
  const activeDoorUnitRef = useRef<HTMLElement | null>(null);
  const lastTransformRef = useRef<{
    tx: number;
    ty: number;
    sEnd: number;
    origX: number;
    origY: number;
  }>({ tx: 0, ty: 0, sEnd: 1, origX: 0, origY: 0 });

  const { stopScroll, startScroll } = useSmoothScroll();
  const isRTL = dict.dir === "rtl";
  const walkRafRef = useRef<number>(0);

  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(sec);
    return () => observer.disconnect();
  }, []);

  const handleDoorHover = (idx: number) => {
    if (!isZooming && !activeRoom) setHoveredIndex(idx);
  };

  const handleDoorLeave = () => {
    if (!isZooming && !activeRoom) setHoveredIndex(null);
  };

  // Calculate dynamic positioning for .dinfo inside the space of faded doors
  useEffect(() => {
    if (hoveredIndex === null) return;
    const container = wallRowRef.current;
    if (!container) return;

    if (window.innerWidth < 1024) {
      setInfoStyle({
        position: "relative",
        margin: "2rem auto 0",
        maxWidth: "28rem",
        width: "100%",
        top: "auto",
        left: "auto",
        right: "auto",
        transform: "none",
      });
      return;
    }

    const unitEls = container.querySelectorAll<HTMLElement>(".unit");
    if (!unitEls.length || !unitEls[hoveredIndex]) return;

    const wr = container.getBoundingClientRect();
    const r = unitEls[hoveredIndex].getBoundingClientRect();
    const visible = Array.from(unitEls).filter(
      (u) =>
        getComputedStyle(u).visibility !== "hidden" &&
        getComputedStyle(u).display !== "none"
    );
    const vi = visible.indexOf(unitEls[hoveredIndex]);
    if (vi < 0) return;

    // Mathematical placement matching reference:
    // If door is on the left half (vi < 2), place info over doors on the right half.
    // If door is on the right half (vi >= 2), place info over doors on the left half.
    let a: DOMRect;
    let b: DOMRect;

    if (isRTL) {
      if (vi <= 1) {
        a = (visible[vi + 1] || visible[vi]).getBoundingClientRect();
        b = (
          visible[vi + 2] || visible[visible.length - 1]
        ).getBoundingClientRect();
      } else {
        a = (visible[vi - 2] || visible[0]).getBoundingClientRect();
        b = (visible[vi - 1] || visible[1]).getBoundingClientRect();
      }
    } else {
      if (vi < 2 && visible[vi + 2]) {
        a = visible[vi + 1].getBoundingClientRect();
        b = visible[vi + 2].getBoundingClientRect();
      } else {
        a = (visible[vi - 2] || visible[vi - 1]).getBoundingClientRect();
        b = visible[vi - 1].getBoundingClientRect();
      }
    }

    const left = Math.min(a.left, b.left);
    const right = Math.max(a.right, b.right);
    const w = Math.min(right - left, 26 * 16); // up to ~416px

    setInfoStyle({
      position: "absolute",
      left: `${left - wr.left + (right - left - w) / 2}px`,
      top: `${r.top - wr.top + r.height * 0.46}px`,
      width: `${w}px`,
      maxWidth: "32rem",
    });
  }, [hoveredIndex, isRTL]);

  // Entrance Walkthrough Zoom Animation
  const handleDoorClick = (idx: number, unitEl: HTMLElement) => {
    if (isZooming || activeRoom) return;
    setIsZooming(true);
    setHoveredIndex(null);
    stopScroll();

    activeDoorUnitRef.current = unitEl;
    const sec = sectionRef.current;
    if (!sec) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Measure geometric boundaries of the door opening
    const opening = (unitEl.querySelector(".opening") || unitEl) as HTMLElement;
    const door = unitEl.querySelector(".door") as HTMLElement;
    const r = opening.getBoundingClientRect();
    const dr = door ? door.getBoundingClientRect() : r;
    const gh = r.height;

    // Doorway opening gap calculation matching reference
    const gapL = isRTL
      ? Math.max(r.left, dr.left)
      : Math.min(Math.max(dr.right, r.left), r.right - 6);
    const gw = Math.max(isRTL ? dr.left - r.left : r.right - gapL, 10);
    const cx = (gapL + (isRTL ? r.left : r.right)) / 2;
    const cy = r.top + gh * 0.5;

    const sEnd = Math.max(
      window.innerWidth / gw,
      window.innerHeight / gh
    ) * 1.15;
    const tx = window.innerWidth / 2 - cx;
    const ty = window.innerHeight / 2 - cy;

    const sr = sec.getBoundingClientRect();
    const origX = cx - sr.left;
    const origY = cy - sr.top;

    sec.style.transformOrigin = `${origX}px ${origY}px`;
    sec.classList.add("through");

    lastTransformRef.current = { tx, ty, sEnd, origX, origY };

    if (prefersReduced) {
      const selected = dict.doors.items[idx];
      setActiveRoom({ route: selected.route, title: selected.plate });
      onEnterRoom?.(selected.route, selected.plate);
      setIsZooming(false);
      return;
    }

    const t0 = performance.now();
    const D = 1350; // 1.35 seconds smooth cinematic zoom

    const ease = (x: number) =>
      x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    const zoomOf = (e: number) => Math.exp(Math.log(sEnd) * e);

    let handed = false;

    function walkFrame(now: number) {
      const p = Math.min(1, (now - t0) / D);
      const e = ease(p);
      const sc = zoomOf(e);
      const f = Math.min(1, e * 1.5);

      sec!.style.transform = `translate(${tx * f}px, ${ty * f}px) scale(${sc})`;

      if (!handed && (sc >= sEnd / 1.15 || p >= 1)) {
        handed = true;
        const selected = dict.doors.items[idx];
        setActiveRoom({ route: selected.route, title: selected.plate });
        onEnterRoom?.(selected.route, selected.plate);
        setIsZooming(false);
      }

      if (p < 1) {
        walkRafRef.current = requestAnimationFrame(walkFrame);
      }
    }

    walkRafRef.current = requestAnimationFrame(walkFrame);
  };

  // Exit Walkthrough Reverse Zoom Animation
  const handleLeaveRoom = () => {
    if (isExiting) return;
    setIsExiting(true);

    const sec = sectionRef.current;
    const { tx, ty, sEnd } = lastTransformRef.current;

    // Phase 1: Fade out the room modal over 300ms
    setTimeout(() => {
      if (!sec) {
        setActiveRoom(null);
        setIsExiting(false);
        startScroll();
        return;
      }

      cancelAnimationFrame(walkRafRef.current);

      // Phase 2: Smooth reverse zoom from (tx, ty, sEnd) back to (0, 0, 1)
      const t0 = performance.now();
      const D = 1100; // 1.1s smooth back-out
      const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

      function reverseFrame(now: number) {
        const p = Math.min(1, (now - t0) / D);
        const e = easeOut(p);
        const sc = Math.exp(Math.log(sEnd) * (1 - e));

        sec!.style.transform = `translate(${tx * (1 - e)}px, ${
          ty * (1 - e)
        }px) scale(${sc})`;

        if (p < 1) {
          walkRafRef.current = requestAnimationFrame(reverseFrame);
        } else {
          // Phase 3: Zoom completed, reset transform and swing door shut
          sec!.style.transform = "";
          sec!.style.transformOrigin = "";
          sec!.classList.remove("through");

          // Trigger smooth door close via physics spring
          if (activeDoorUnitRef.current) {
            activeDoorUnitRef.current.dispatchEvent(
              new CustomEvent("close-door")
            );
          }

          setActiveRoom(null);
          setIsExiting(false);
          startScroll();
        }
      }

      walkRafRef.current = requestAnimationFrame(reverseFrame);
    }, 320);
  };

  const activeItem =
    hoveredIndex !== null ? dict.doors.items[hoveredIndex] : null;

  return (
    <>
      <section
        ref={sectionRef}
        id="works"
        className={`doors relative py-20 md:py-32 overflow-hidden bg-background border-t border-b border-line will-change-transform ${
          hoveredIndex !== null ? "focus" : ""
        }`}
        aria-labelledby="doorsTitle"
      >
        {/* Subtle Architectural Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#1A1818_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05] pointer-events-none" />

        <div className="max-w-[94rem] mx-auto px-4 sm:px-6 md:px-12 relative z-10 flex flex-col items-center">
          {/* Section Eyebrow Title */}
          <div className="text-center mb-6">
            <h2
              id="doorsTitle"
              className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-foreground"
            >
              {dict.doors.title}
            </h2>
          </div>

          {/* Graffiti Animated Headline */}
          <p
            className="text-xl sm:text-2xl md:text-4xl font-black tracking-tight text-center text-foreground/90 mb-12 sm:mb-16 whitespace-pre-line select-none font-sans"
            style={{
              clipPath: isInView
                ? "inset(-20% -6% -30% -6%)"
                : isRTL
                ? "inset(-20% -6% -30% 100%)"
                : "inset(-20% 100% -30% -6%)",
              transition: "clip-path 1.5s cubic-bezier(0.65, 0, 0.25, 1) 0.1s",
            }}
            aria-hidden="true"
          >
            {dict.doors.graffiti}
          </p>

          {/* The Hallway of Arched Doors with floating .dinfo placement */}
          <div
            ref={wallRowRef}
            className="relative w-full max-w-[88rem] mx-auto py-4 px-2 flex flex-col lg:flex-row items-center justify-center overflow-visible"
          >
            {/* The 4 Arched Doors Grid */}
            <ul className="doors__row grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 items-end justify-center w-full list-none p-0 m-0">
              {dict.doors.items.slice(0, 4).map((item, i) => (
                <DoorUnit
                  key={item.id}
                  index={i}
                  id={item.id}
                  plate={item.plate}
                  color={item.color}
                  colorDark={item.colorDark}
                  isSecret={false}
                  isRevealed={true}
                  isHovered={hoveredIndex === i}
                  isGhosted={hoveredIndex !== null && hoveredIndex !== i}
                  dir={dict.dir}
                  onHover={handleDoorHover}
                  onLeave={handleDoorLeave}
                  onClick={handleDoorClick}
                />
              ))}
            </ul>

            {/* Secret 5th Door if revealed */}
            {isRevealed && dict.doors.items[4] && (
              <div className="mt-8 lg:mt-0 lg:ml-8 animate-in fade-in duration-500">
                <DoorUnit
                  index={4}
                  id={dict.doors.items[4].id}
                  plate={dict.doors.items[4].plate}
                  color={dict.doors.items[4].color}
                  colorDark={dict.doors.items[4].colorDark}
                  isSecret={true}
                  isRevealed={true}
                  isHovered={hoveredIndex === 4}
                  isGhosted={hoveredIndex !== null && hoveredIndex !== 4}
                  dir={dict.dir}
                  onHover={handleDoorHover}
                  onLeave={handleDoorLeave}
                  onClick={handleDoorClick}
                />
              </div>
            )}

            {/* Dynamic Hover Information Panel (.dinfo - Centered over faded doors) */}
            {activeItem && !activeRoom && (
              <DoorInfoCard
                title={activeItem.title}
                subtitle={activeItem.subtitle}
                points={activeItem.points}
                isVisible={hoveredIndex !== null && !isZooming}
                style={infoStyle}
              />
            )}
          </div>

          {/* Secret 5th Door Reveal Button */}
          {!isRevealed && (
            <button
              onClick={() => setIsRevealed(true)}
              className="mt-10 inline-flex items-center gap-2 text-xs text-muted hover:text-foreground transition-colors underline underline-offset-4 cursor-pointer"
            >
              <span>✦</span>
              <span>
                {dict.locale === "ar"
                  ? "كشف الباب الإضافي (التقنية الإبداعية)"
                  : "Reveal Extra Door (Creative Tech)"}
              </span>
            </button>
          )}
        </div>

        {/* Custom Interactive Door Cursor */}
        <DoorCursor
          label={dict.doors.enterPrompt}
          isVisible={hoveredIndex !== null && !isZooming && !activeRoom}
        />
      </section>

      {/* Embedded Walkthrough Room Modal with smooth entrance & exit transition */}
      {activeRoom && (
        <div
          id="wallv"
          className={`fixed inset-0 z-50 bg-background flex flex-col transition-opacity duration-300 ${
            isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* Header with Back Navigation */}
          <div className="h-16 border-b border-line bg-surface/90 backdrop-blur-md px-6 flex items-center justify-between z-20">
            <button
              onClick={handleLeaveRoom}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line bg-surface text-xs font-semibold text-foreground hover:bg-neutral transition-all cursor-pointer shadow-sm group"
            >
              <span className="transition-transform group-hover:-translate-x-1">
                {isRTL ? "→" : "←"}
              </span>
              <span>{dict.doors.backPrompt}</span>
            </button>
            <h3 className="font-semibold text-sm text-foreground">
              {activeRoom.title}
            </h3>
            <div className="w-24" />
          </div>

          {/* Subpage Frame */}
          <div className="flex-1 w-full h-full relative overflow-hidden bg-background">
            <iframe
              src={`/${dict.locale}${activeRoom.route}?embed`}
              title={activeRoom.title}
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </>
  );
}
