# ASSET_INVENTORY.md
# Comprehensive Asset Inventory & Replacement Strategy

This document audits all visual, audio, typographic, and 3D assets discovered on [therishithakor.com](https://therishithakor.com/), categorizes their licensing and origin, and details the exact replacement strategy for transforming the portfolio into **Mazen's personal developer identity**.

---

## 1. Asset Audit & Categorization

The live reference site delivers 127+ unique static assets. The table below classifies each asset group, its public URL pattern, licensing status, and whether it will be retained, adapted, or replaced.

### 1.1 Typography & Fonts

| Asset Path | Format | Original Source | License | Action for Mazen's Portfolio |
| :--- | :--- | :--- | :--- | :--- |
| `/fonts/onest-latin.woff2` | WOFF2 | Onest (Google Fonts / Typeface) | SIL Open Font License 1.1 | **Retain**: Core display and body typeface for English (LTR). |
| `/fonts/onest-latin-ext.woff2` | WOFF2 | Onest Extended Latin glyphs | SIL Open Font License 1.1 | **Retain**: Full extended Latin character support. |
| `/fonts/eb-garamond-latin.woff2` | WOFF2 | EB Garamond (Google Fonts) | SIL Open Font License 1.1 | **Retain**: Editorial accent serif for ability card titles. |
| *New Arabic Typeface* | WOFF2 | IBM Plex Sans Arabic / Readex Pro | SIL Open Font License 1.1 | **Add**: Essential pairing for Arabic (RTL) mode. |

---

### 1.2 3D Holographic Ability Card Assets

These assets power the WebGL shader pipeline inside `/ability-card/assets/`.

| Asset Name | Format | Role in 3D Scene | Action for Mazen's Portfolio |
| :--- | :--- | :--- | :--- |
| `background.webp` | WebP (21KB) | Distant scenery behind card window | **Adapt / Replace**: Curated dark fantasy / tech horizon background. |
| `subject.webp` | WebP (66KB) | Character silhouette with alpha cut-out | **Replace**: Mazen's stylized developer avatar / 3D figure cut-out. |
| `lineart.webp` | WebP (6KB) | Specular edge highlighting on subject | **Replace**: High-contrast contour line art generated from subject. |
| `lineart_df.webp` | WebP (1KB) | Distance field for normal edge glint | **Replace**: SDF generated from new lineart. |
| `frame.webp` | WebP (242KB) | Front trading card border & filigree | **Retain or Re-brand**: Ornate border with Mazen's custom crest. |
| `frame_aux.webp` | WebP (96KB) | Normal / height map for card frame | **Retain / Adapt**: Paired normal map for gold specular reflections. |
| `fx.webp` | WebP (1KB) | Particle and flame depth control map | **Retain**: Controls flame rendering and depth occlusion. |
| `type.webp` | WebP (138KB) | Card typography, ability ratings, titles | **Replace**: Mazen's stats (Full-Stack Dev, Software Architecture, etc.). |
| `back_clean.webp` | WebP (149KB) | Reverse side base texture | **Retain / Adapt**: Ornate backplate design. |
| `back_clean_aux.webp` | WebP (14KB) | Reverse side specular foil channel | **Retain**: Drives gold sheen and micro-grooves. |
| `rays.webp` | WebP (1KB) | Volumetric light god-rays | **Retain**: Reusable procedural light texture. |
| `rose.webp` | WebP (4KB) | Central emblem seal on back | **Replace**: Mazen's personal seal or developer monogram. |
| `rose_aux.webp` | WebP (132KB) | Normal map for central emblem | **Replace**: Paired normal map for monogram seal. |

#### CSS 3D Fallback Assets (`/card/`)
- `card/win_bg.webp`: Low-resolution fallback background.
- `card/win_sub.webp`: Fallback character layer.
- `card/plate.webp`: Fallback front card plate with stats.
- `card/back.webp`: Fallback reverse face.

---

### 1.3 Hero Section Assets

| Asset Name | Format | Original Role | Action for Mazen's Portfolio |
| :--- | :--- | :--- | :--- |
| Grayscale Cutout Portrait | WebP | Base figure anchored on hero right | **Replace**: Mazen's high-resolution cut-out portrait in grayscale. |
| Color Cutout Portrait (`COLOUR_SRC`) | Base64 WebP | Full-color target for LiquidReveal cursor trail | **Replace**: Mazen's full-color cut-out portrait with identical pixel alignment. |
| Monogram & Favicons | PNG / ICO | Personal branding & browser icons | **Replace**: Mazen's customized initial / monogram icon. |

---

### 1.4 Interactive Doors Wall Assets

| Asset Name | Format | Original Role | Action for Mazen's Portfolio |
| :--- | :--- | :--- | :--- |
| Wall Texture Overlay (`.doors__tex`) | CSS / SVG | Tactile plastered architectural wall grain | **Retain / Recreate**: Procedural noise / subtle plaster grain pattern. |
| Door Handle & Escutcheon | CSS / SVG | 3D-styled lever handle with press states | **Retain**: SVG vectors and box-shadow styling. |
| Door Nameplates | Typography | Brass / enameled discipline plaques | **Adapt**: Re-label for Mazen's core developer disciplines. |

---

### 1.5 Discipline Subpages Media & Projects

All project mockups, video recordings, and screenshots belong personally to Rishi Thakor and must be completely replaced with Mazen's authenticated engineering projects.

#### Web Development (`/web-developer/`)
- *Original*: Zerodha P&L clone, Quicko tax calculator, Sundown studio.
- *Mazen Replacement*:
  1. **Enterprise SaaS Platform / Cloud Dashboard**: Microservices architecture, real-time analytics.
  2. **High-Performance Full-Stack Web App**: Next.js, TypeScript, PostgreSQL, Edge caching.
  3. **Interactive Developer Tool / API Playground**: Complex state management, syntax highlighting, web workers.
  4. **Open-Source System / Library**: High-throughput utility or NPM package.
  - *Media required*: 4 WebP preview screenshots + 2 short looped MP4 interaction screen recordings.

#### App Development (`/app-developer/`)
- *Original*: Brick Breaker, Dice, Expense Tracker, Vault.
- *Mazen Replacement*:
  1. **Cross-Platform Mobile Application**: React Native / Flutter, offline-first sync.
  2. **Productivity / Utility Mobile App**: Native gestures, biometrics, dark mode.
  3. **Financial / Portfolio Mobile Dashboard**: Real-time charts, local secure storage.
  - *Media required*: Device mockups (iPhone / Android frames) with looped MP4 recordings.

#### Software Architecture & UI Engineering (`/ui-ux-designer/` & `/graphic-designer/`)
- *Original*: Agency design case studies, social posters.
- *Mazen Replacement*:
  1. **Software System Architecture & Cloud Infrastructure**: Component diagrams, API contracts, high-availability schemas.
  2. **Design System & Component Library**: Accessible UI primitives, typography hierarchy, design tokens.
  3. **Technical Brand & Developer Experience (DevEx)**: Documentation portal, technical diagrams.

#### Photography & Creative Work (`/photographer/`)
- *Original*: 28 photographs across Architecture, Concerts, Nature.
- *Mazen Adaptation Strategy*:
  - Curated high-resolution developer gallery (workspace setups, hardware engineering, tech conferences, architectural photography, or creative visual coding).
  - 28 balanced photographs with embedded base64 blurred placeholders (`q: "data:image/webp;base64,..."`), metadata titles, and categories.

---

## 2. Licensing Compliance & Intellectual Property Protection

1. **Code & Interaction Mechanics**:
   - The physics algorithms (Verlet integration, semi-implicit Euler, exponential camera zoom, canvas composite math) are standard mathematical formulations and can be cleanly recreated in modern TypeScript.
2. **Typography**:
   - `Onest` and `EB Garamond` are distributed under the **SIL Open Font License 1.1** and can be bundled and served locally with complete legal compliance.
   - The selected Arabic typeface (`IBM Plex Sans Arabic` or `Readex Pro`) also operates under the SIL OFL 1.1.
3. **Proprietary Creative Content**:
   - Every photograph, client work screenshot, personal portrait, video demo, and text bio belonging to Rishi Thakor will be completely substituted with Mazen's verified developer persona and engineering projects.
   - No copyrighted client assets from the reference website will be included in the production deployment.

