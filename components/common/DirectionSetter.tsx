"use client";

import { useEffect } from "react";

interface DirectionSetterProps {
  lang: string;
  dir: "ltr" | "rtl";
}

export function DirectionSetter({ lang, dir }: DirectionSetterProps) {
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    if (typeof window !== "undefined" && window.self !== window.top) {
      document.documentElement.setAttribute("data-embed", "true");
    }
  }, [lang, dir]);

  return null;
}

