import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["selector", '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ink: "var(--ink)",
        primary: "#1A1818",
        secondary: "#A4552C",
        tertiary: "#D5CDCA",
        neutral: "#E8E4E0",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        "on-surface": "#1A1818",
        muted: "var(--muted)",
        subtle: "var(--subtle)",
        line: "var(--line)",
        border: "var(--line)",
      },
      fontFamily: {
        sans: ["var(--font-onest)", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        onest: ["var(--font-onest)", "sans-serif"],
        arabic: ["var(--font-arabic)", "sans-serif"],
        editorial: ["var(--font-garamond)", "serif"],
      },
      borderRadius: {
        pill: "9999px",
        card: "2rem",
        "card-sm": "1.25rem",
        control: "0.875rem",
      },
      transitionTimingFunction: {
        "e-line": "cubic-bezier(0.215, 0.61, 0.355, 1)",
        "e-spring": "cubic-bezier(0.22, 1, 0.36, 1)",
        "e-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
        "e-snap": "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

