"use client";

import React, { useEffect, useRef, useState } from "react";
import { createSpring } from "@/lib/utils";

interface DoorUnitProps {
  index: number;
  id: string;
  plate: string;
  color: string;
  colorDark: string;
  isSecret?: boolean;
  isRevealed?: boolean;
  isHovered?: boolean;
  isGhosted?: boolean;
  dir?: "ltr" | "rtl";
  onHover?: (index: number) => void;
  onLeave?: (index: number) => void;
  onClick?: (index: number, element: HTMLElement) => void;
}

function DoorIcon({ type }: { type: string }) {
  switch (type) {
    case "code":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#e8be82"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 md:w-6 md:h-6"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "mobile":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#e8be82"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 md:w-6 md:h-6"
        >
          <rect x="5" y="2" width="14" height="20" rx="3" ry="3" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      );
    case "layers":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#e8be82"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 md:w-6 md:h-6"
        >
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 12 12 17 22 12" />
          <polyline points="2 17 12 22 22 17" />
        </svg>
      );
    case "design":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#e8be82"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 md:w-6 md:h-6"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            strokeDasharray="2 2"
            strokeOpacity="0.6"
          />
          <circle cx="3" cy="3" r="1.5" fill="#e8be82" />
          <circle cx="21" cy="3" r="1.5" fill="#e8be82" />
          <circle cx="3" cy="21" r="1.5" fill="#e8be82" />
          <circle cx="21" cy="21" r="1.5" fill="#e8be82" />
          <path d="M12 7l4 4-5.5 5.5H7v-3.5L12 7z" />
          <circle cx="10.5" cy="13.5" r="0.75" fill="#e8be82" />
        </svg>
      );
    case "camera":
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#e8be82"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 md:w-6 md:h-6"
        >
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      );
  }
}

function getTitleLines(plate: string, dir: "ltr" | "rtl") {
  if (dir === "rtl") {
    if (plate.includes("الويب")) return ["مطور", "الويب"];
    if (plate.includes("الجوال") || plate.includes("تطبيقات"))
      return ["مطور", "التطبيقات"];
    if (plate.includes("معمارية") || plate.includes("البرمجيات"))
      return ["معمارية", "البرمجيات"];
    if (plate.includes("الواجهات")) return ["هندسة", "الواجهات"];
    if (plate.includes("الإبداعية")) return ["التقنية", "الإبداعية"];
  } else {
    if (plate.toLowerCase().includes("web")) return ["Web", "Developer"];
    if (plate.toLowerCase().includes("app")) return ["App", "Developer"];
    if (plate.toLowerCase().includes("architect"))
      return ["Software", "Architect"];
    if (plate.toLowerCase().includes("ui") || plate.toLowerCase().includes("ux"))
      return ["UI/UX", "Engineer"];
    if (plate.toLowerCase().includes("creative"))
      return ["Creative", "Tech"];
  }
  const parts = plate.split(" ");
  if (parts.length >= 2) {
    return [parts[0], parts.slice(1).join(" ")];
  }
  return [plate, ""];
}

export function DoorUnit({
  index,
  id,
  plate,
  color,
  colorDark,
  isSecret = false,
  isRevealed = false,
  isHovered = false,
  isGhosted = false,
  dir = "ltr",
  onHover,
  onLeave,
  onClick,
}: DoorUnitProps) {
  const unitRef = useRef<HTMLLIElement | null>(null);
  const doorRef = useRef<HTMLSpanElement | null>(null);
  const springRef = useRef<ReturnType<typeof createSpring> | null>(null);
  const [isPressed, setIsPressed] = useState(false);

  const ANG = 74; // max swing angle in degrees
  const isRTL = dir === "rtl";

  useEffect(() => {
    const door = doorRef.current;
    const unit = unitRef.current;
    if (!door || !unit) return;

    // Semi-implicit Euler spring with natural architectural mass
    const s = createSpring({ tension: 120, friction: 14 }, (val) => {
      const openAmount = Math.max(0, val);
      const rot = isRTL ? -openAmount * ANG : openAmount * ANG;
      door.style.transform = `rotateY(${rot}deg)`;
      unit.style.setProperty("--o", openAmount.toFixed(4));
    });

    springRef.current = s;

    // Listen to custom "close-door" event when exiting room
    const handleCloseDoor = () => {
      s.set(0);
      setIsPressed(false);
    };

    unit.addEventListener("close-door", handleCloseDoor);

    return () => {
      unit.removeEventListener("close-door", handleCloseDoor);
      s.destroy();
    };
  }, [isRTL]);

  const handlePointerEnter = () => {
    springRef.current?.set(0.15); // cracks open ~11 degrees to let warm room light spill
    onHover?.(index);
  };

  const handlePointerLeave = () => {
    if (!isPressed) {
      springRef.current?.set(0);
      onLeave?.(index);
    }
  };

  const handleClick = () => {
    setIsPressed(true);
    // Brass handle latch depression
    setTimeout(() => setIsPressed(false), 380);
    // Swing door fully open into room
    springRef.current?.set(1.0);
    if (unitRef.current) {
      onClick?.(index, unitRef.current);
    }
  };

  if (isSecret && !isRevealed) {
    return null;
  }

  const iconTypes = ["code", "mobile", "layers", "design", "camera"];
  const iconType = iconTypes[index] || "code";
  const [titleLine1, titleLine2] = getTitleLines(plate, dir);

  return (
    <li
      ref={unitRef}
      className={`unit relative flex-shrink-0 transition-all duration-500 ${
        isHovered ? "on" : ""
      } ${isSecret ? "animate-in fade-in zoom-in-95 duration-700" : ""}`}
      style={
        {
          "--door": color,
          "--door-dk": colorDark,
        } as React.CSSProperties
      }
    >
      {/* Warm Ambient Floor Light Pool beneath each door */}
      <span
        className="floor-glow absolute -bottom-5 left-1/2 -translate-x-1/2 w-48 md:w-64 h-16 pointer-events-none transition-opacity duration-500 rounded-full blur-xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255, 195, 125, 0.45) 0%, rgba(255, 160, 80, 0.15) 50%, transparent 80%)",
          opacity: isHovered ? 1 : 0.65,
        }}
      />

      <button
        type="button"
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className={`doorway relative block w-44 sm:w-56 md:w-64 h-[360px] sm:h-[430px] md:h-[480px] p-2 md:p-2.5 rounded-t-[125px] overflow-visible cursor-pointer group focus:outline-none transition-all duration-500 ease-out ${
          isGhosted
            ? "opacity-15 saturate-[0.25] scale-[0.98]"
            : "opacity-100 saturate-100 scale-100"
        }`}
        aria-label={`Open the ${plate} door`}
        style={{ perspective: "1200px" }}
      >
        {/* Halo Neon Rim Backlight tracing the entire outer curve and frame */}
        <span
          className="halo-rim absolute -inset-1 rounded-t-[128px] pointer-events-none transition-all duration-500"
          style={{
            boxShadow: isHovered
              ? "0 0 25px 6px rgba(255, 195, 130, 0.65), 0 0 50px 14px rgba(230, 145, 75, 0.35)"
              : "0 0 16px 3px rgba(255, 190, 120, 0.4), 0 0 35px 8px rgba(220, 135, 65, 0.2)",
            filter: "blur(2px)",
          }}
        />

        {/* Outer Architectural Molded Arch Frame (Casing) */}
        <span
          className="casing absolute inset-0 rounded-t-[125px] pointer-events-none transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(180deg, #383432 0%, #22201e 100%)",
            boxShadow:
              "inset 0 0 0 1.5px rgba(255,255,255,0.2), inset 0 0 0 3.5px rgba(0,0,0,0.6), inset 0 0 0 7px rgba(255,255,255,0.08), 0 0 0 1px rgba(255,190,120,0.5), 0 8px 24px rgba(0,0,0,0.5)",
          }}
        >
          {/* Inner molded step bevel */}
          <span
            className="absolute inset-[4px] rounded-t-[121px] pointer-events-none"
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "inset 0 0 6px rgba(0,0,0,0.5)",
            }}
          />
        </span>

        {/* Doorway Opening (Dark Room Void Behind Door) */}
        <span className="opening relative block w-full h-full rounded-t-[115px] bg-[#090808] overflow-hidden shadow-inner">
          {/* Room Interior Spill Light on Hover */}
          <span
            className={`spill absolute inset-0 bg-gradient-to-tr from-amber-400/40 via-amber-200/15 to-transparent transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* The Swinging Solid Door Slab */}
          <span
            ref={doorRef}
            className={`door absolute inset-0 rounded-t-[115px] shadow-2xl flex flex-col justify-between p-4 md:p-5 select-none will-change-transform ${
              isRTL ? "origin-right" : "origin-left"
            }`}
            style={{
              backgroundColor: color,
              backgroundImage: `linear-gradient(105deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 30%, rgba(0,0,0,0.25) 100%), linear-gradient(135deg, ${color} 0%, ${colorDark} 100%)`,
              boxShadow:
                "inset 0 0 0 1px rgba(0,0,0,0.35), inset 2px 0 0 rgba(255,255,255,0.08), 0 10px 28px rgba(0,0,0,0.45)",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Door Leaf Slab Thickness Edge (3D Simulated Extrusion) */}
            <span
              className={`absolute top-10 bottom-0 w-2.5 pointer-events-none ${
                isRTL
                  ? "left-0 origin-left -rotate-y-90"
                  : "right-0 origin-right rotate-y-90"
              }`}
              style={{
                backgroundColor: colorDark,
                filter: "brightness(0.65)",
                boxShadow: "inset 0 0 4px rgba(0,0,0,0.6)",
              }}
            />

            {/* Inset Vertical Fluted Ribbed Wooden Panels */}
            <span
              className="door__flute absolute inset-3 rounded-t-[105px] pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.02) 2px, rgba(0,0,0,0.22) 5px, rgba(255,255,255,0.08) 8px)",
                boxShadow:
                  "inset 0 0 0 1.5px rgba(0,0,0,0.35), inset 3px 6px 14px rgba(0,0,0,0.45), inset -2px -2px 6px rgba(255,255,255,0.06)",
              }}
            />

            {/* The Large Rounded Squircle Plaque (Signboard) */}
            <div
              className="door-plaque relative z-10 mx-auto mt-6 md:mt-8 w-[76%] py-4 px-2.5 rounded-[22px] md:rounded-[26px] flex flex-col items-center justify-center select-none transition-transform duration-300 group-hover:scale-[1.02]"
              style={{
                backgroundColor: colorDark,
                backgroundImage:
                  "linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(0,0,0,0.32) 100%)",
                boxShadow:
                  "0 8px 22px rgba(0,0,0,0.6), inset 0 1.5px 1.5px rgba(255,255,255,0.2), inset 0 -1.5px 2px rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {/* Circular Debossed Medallion with Gold Icon */}
              <div
                className="w-11 h-11 md:w-13 md:h-13 rounded-full flex items-center justify-center mb-2.5"
                style={{
                  backgroundColor: "rgba(0,0,0,0.45)",
                  boxShadow:
                    "inset 0 2px 6px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.14)",
                  border: "1px solid rgba(232, 190, 130, 0.25)",
                }}
              >
                <DoorIcon type={iconType} />
              </div>

              {/* Title in Two Clean Lines */}
              <div className="text-center">
                <span className="block font-bold text-xs sm:text-sm md:text-[15px] leading-tight text-[#f7f3ee] tracking-tight">
                  {titleLine1}
                </span>
                {titleLine2 && (
                  <span className="block font-bold text-xs sm:text-sm md:text-[15px] leading-tight text-[#f7f3ee] tracking-tight mt-0.5">
                    {titleLine2}
                  </span>
                )}
              </div>
            </div>

            {/* Solid Cast Brass Lever Handle & Keyhole */}
            <div
              className={`door-hardware relative z-10 mt-auto mb-14 sm:mb-16 md:mb-20 flex flex-col items-center ${
                isRTL ? "mr-auto ml-4 sm:ml-5" : "ml-auto mr-4 sm:mr-5"
              }`}
            >
              {/* Handle Lever */}
              <div className="relative flex items-center">
                {/* Circular Rose Backplate */}
                <div
                  className="w-4 h-4 rounded-full shadow-md"
                  style={{
                    background:
                      "radial-gradient(circle, #f5e4b2 0%, #caa45a 60%, #7d5e24 100%)",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.6)",
                    border: "0.5px solid rgba(255,255,255,0.4)",
                  }}
                />

                {/* Horizontal Cast Brass Lever Handle */}
                <div
                  className={`absolute w-9 md:w-11 h-2.5 rounded-full shadow-lg transition-transform duration-200 ${
                    isRTL ? "right-1 origin-right" : "left-1 origin-left"
                  } ${
                    isPressed
                      ? isRTL
                        ? "-rotate-12 translate-y-0.5"
                        : "rotate-12 translate-y-0.5"
                      : ""
                  }`}
                  style={{
                    background:
                      "linear-gradient(180deg, #f7e6b8 0%, #d8b263 45%, #9e7930 85%, #664d1a 100%)",
                    boxShadow:
                      "0 3px 6px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.5)",
                  }}
                />
              </div>

              {/* Oval Keyhole Escutcheon Plate */}
              <div
                className="mt-3.5 w-3 h-5 rounded-full flex items-center justify-center shadow-sm"
                style={{
                  background:
                    "linear-gradient(180deg, #eddba6 0%, #b89345 70%, #73551f 100%)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
                }}
              >
                {/* Keyhole Slot */}
                <div className="w-[2px] h-[7px] bg-[#1a1107] rounded-sm" />
              </div>
            </div>
          </span>
        </span>
      </button>
    </li>
  );
}
