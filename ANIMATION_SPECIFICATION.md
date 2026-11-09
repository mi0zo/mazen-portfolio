# ANIMATION_SPECIFICATION.md
# Comprehensive Animation & Interaction Specification

This document details all animations, physics models, interactive gestures, and camera transitions discovered on the reference website, distinguishing verified implementation details from architectural assumptions.

---

## 1. Summary Matrix of Interactions

| Component | Trigger | Implementation Engine | Duration / Timing | Easing / Physics Curve | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Pull Cord** | Pointer drag & release | 2D Canvas + Verlet integration | Continuous / settles ~1.2s | $G=4600\text{ px/s}^2$, 16 constraint passes | **Confirmed** (from source) |
| **Desk-Calendar Flip** | Automatic timer (1.7s hold) | Web Animations API (`animate`) | 1250ms flip, 1700ms hold | `cubic-bezier(.5, .05, .2, 1)` | **Confirmed** (from source) |
| **LiquidReveal Portrait** | Pointer move over hero image | 2D Canvas dual-buffer + mask | Continuous RAF loop | Radius 143px, decay `0.016`/frame | **Confirmed** (from source) |
| **Holographic 3D Card** | Pointer drag / orientation | Three.js + Custom WebGL Shaders | Dynamic / 60 FPS | Inertial damping + Face snapping | **Confirmed** (from source) |
| **Door Hover Crack** | Pointer enter / focus doorway | Semi-implicit Euler Spring | ~350ms settle | `tension: 120, friction: 14` | **Confirmed** (from source) |
| **Doorway Walkthrough** | Click on doorway | Window RAF + 2D Transform Zoom | 1500ms zoom | Exponential $e^{\ln(s_{end}) \cdot e}$ | **Confirmed** (from source) |
| **Room Exit / Unzoom** | Click back navigation | Window RAF + 2D Transform | 1300ms zoom-out | Cubic ease-out $1 - (1-x)^3$ | **Confirmed** (from source) |
| **Story Clock Tunnel** | Scroll event | 2D Canvas 3D projection | Scroll-synchronized | CamZ and dial spin tied to scroll | **Confirmed** (from source) |
| **Odometer Year Roll** | Chapter cross midpoint | CSS Transform variable `--d` | 420ms per digit | `cubic-bezier(.22, 1, .36, 1)` | **Confirmed** (from source) |
| **Questionnaire Steps** | Next button / Option change | CSS transition / opacity-slide | 300ms | `cubic-bezier(.16, 1, .3, 1)` | **Confirmed** (from source) |
| **Smooth Scrolling** | Wheel / Touch / Keyboard | Lenis Smooth Scroll | Dynamic lerp | Standard Lenis smooth friction | **Confirmed** (from source) |

---

## 2. Detailed Technical Specifications

### 2.1 The Verlet Pull Cord (`#cord`)

- **Confirmed Implementation**:
  - Script lines 459–640 of `script_6.js`.
  - Points Array: 26 discrete nodes (`pts = [{x, y, px, py, w}]`). Node 0 is pinned above the screen; Node 26 holds the knob.
  - Step Loop: Runs at a fixed delta `STEP = 1 / 120` seconds.
  - Integration Formula:
    $$x_{new} = x + (x - x_{prev}) + a_x \cdot \Delta t^2$$
    $$y_{new} = y + (y - y_{prev}) + G \cdot \Delta t^2$$
  - Constraint Enforcement: 16 iterations per frame enforcing fixed segment distance `seg = total / N`.
  - Travel & Switch Trigger:
    - User pointerdown on `#cordHit` grabs the nearest segment or knob.
    - Dragging pulls the anchor downward against an anchor spring up to `EXT_MAX` (72px desktop, 54px mobile).
    - Crossing `EXT_MAX * 0.9` arms the trigger. Releasing past threshold triggers a tactile sound/visual toggle and inverts page theme.
    - Cord snaps back upward and pendulum swing dissipates over ~1.2s.

---

### 2.2 Interactive Desk-Calendar Flip (`#cal`)

- **Confirmed Implementation**:
  - Script lines 274–345 of `script_6.js`.
  - Elements:
    - `.cal__body`: Calendar housing.
    - `.cal__rings`: Wire spiral binder.
    - `.cal__leaf`: Double-sided turning page.
    - `.cal__face`: Current top face showing skill title and counter (`01 / 05`).
    - `[data-under]`: Underlying face displaying next skill in advance.
    - `.cal__rear`: Backside of flipping leaf.
  - Dynamic Layout Adaptation:
    - Measures character width of all 5 skills using an off-screen measurement span.
    - Calculates required width in `em`: `wEm = max / fs + 0.8 + 0.06`.
    - Dynamically generates spiral wire rings and punched hole elements:
      $$\text{count} = \max(5, \text{round}((wEm - 0.64) / 0.7) + 1)$$
  - Flip Keyframe Breakdown (Duration: `1250ms`, Easing: `cubic-bezier(.5, .05, .2, 1)`):
    1. **0% to 28.5%**: Top face remains fully visible, rotating upward in 3D perspective from `rotateX(0deg)` to `rotateX(90deg)`.
    2. **28.5% to 29.5%**: Opacity of `.cal__face` steps from 1 to 0; rear face takes over.
    3. **29% to 45%**: Rear face catches virtual light, brightness peaking at `1.02`, then drops into shadow (`0.90` brightness) as it clears the top spiral rings.
    4. **Underlying Face Shadow**: Overlay shadow on `[data-under]` animates from `0.7` opacity to `0.0` over `1125ms` (`FLIP * 0.9`) with `cubic-bezier(.3, .6, .4, 1)`.
    5. **100%**: Leaf completes full rotation to `rotateX(352deg)`, resting behind the calendar pad. Data values swap seamlessly.

---

### 2.3 LiquidReveal Portrait Canvas (`#figCanvas`)

- **Confirmed Implementation**:
  - Script lines 346–458 of `script_6.js`.
  - Architecture: Offscreen rendering with 5 distinct canvas contexts:
    1. `canvas`: Display canvas in DOM.
    2. `bwC`: Offscreen black-and-white base portrait.
    3. `colC`: Offscreen full-color portrait.
    4. `mask`: Offscreen alpha mask canvas where cursor paints.
    5. `tmp`: Temporary compositing scratch canvas.
  - Pointer Event Handling:
    - Pointer coordinates mapped to canvas space factoring in device pixel ratio (`dpr = Math.min(window.devicePixelRatio || 1, 2)`).
    - Radial brush stamp:
      $$\text{Gradient}(r=143\text{px}): 0\% \to \text{rgba}(255,255,255,1), 55\% \to \text{rgba}(255,255,255,0.82), 100\% \to \text{rgba}(255,255,255,0)$$
  - Dual-Layer Alpha Compositing Formula:
    1. Clear main context.
    2. Draw grayscale portrait.
    3. Composite `destination-out` with mask: produces $BW \cdot (1 - \text{mask})$.
    4. In temporary context, draw color portrait, composite `destination-in` with mask: produces $\text{Color} \cdot \text{mask}$.
    5. Draw temporary context onto main context using `globalCompositeOperation = 'lighter'`.
  - Result: Edge transparency along delicate hair strands remains 100% accurate without darkening or halos.
  - Idle Decay: On every RAF frame where the pointer is stationary, a faint clearRect fades the mask by factor `decay = 0.016`.

---

### 2.4 Holographic 3D Ability Card (`#holo`)

- **Confirmed Implementation**:
  - Standalone module `/ability-card/` (394KB inline bundle).
  - Renderer Settings:
    - WebGLRenderer with `antialias: false`, `stencil: true`, `powerPreference: "high-performance"`, `outputColorSpace: LinearSRGBColorSpace`.
  - Geometry & Hierarchy:
    - Dimensions: Width 6.3 units, Height 8.8 units (standard trading card aspect ratio).
    - Camera: PerspectiveCamera at $Z = 32$ units.
  - Multi-Pass Shader Engine:
    - `FRAME_FRAG`: Computes specular glint and metallic sheen across embossed borders using view-angle dot products.
    - `MASK_FRAG`: Writes stencil bit 1 across interior card window.
    - `BG_FRAG`: Parallax-projected landscape backdrop contained inside the stencil mask.
    - `FLAME_FRAG` & `SMOKE_FRAG`: Dynamic additive particle billboards positioned between the background and character silhouette.
    - `BACK_GOLD`: Specular foil effect on reverse side, simulating micro-grooves and light scatter.
  - Touch / Mouse Physics:
    - Inertial drag tracking (`state.vel.x`, `state.vel.y`).
    - Auto-alignment: When released, snaps smoothly to either Front face ($0^\circ$) or Back face ($180^\circ$) depending on angular velocity.
  - Fallback Mode (`#holoLite`):
    - Multi-layer CSS 3D card using CSS `transform: rotateY(...)` and pseudo-element gradient overlays (`.hc__foil`, `.hc__glare`, `.hc__sheen`).

---

### 2.5 Doors Wall & Camera Walkthrough Zoom

- **Confirmed Implementation**:
  - Script lines 819–1235 of `script_6.js`.
  - **Hinge Spring Mechanics**:
    - Semi-implicit Euler integration:
      $$v_{new} = v + (-k \cdot (x - x_{target}) - d \cdot v) \cdot \Delta t$$
      $$x_{new} = x + v_{new} \cdot \Delta t$$
      with `tension: 120, friction: 14`.
    - Maximum door opening angle: `70deg`. Hover crack angle: `7deg` ($0.10 \times 70^\circ$).
  - **Walkthrough Zoom Transition (`through(i)`)**:
    - Calculates doorway gap coordinates: `cx = (gapL + r.right) / 2`, `cy = r.top + gh * 0.5`.
    - End Scale:
      $$s_{End} = \max(\text{innerWidth} / gw, \text{innerHeight} / gh) \cdot 1.15 \quad (\text{up to } 60\times)$$
    - Per-frame exponential zoom:
      $$sc(t) = \exp(\ln(s_{End}) \cdot e(t))$$
      where $e(t)$ is a cubic ease curve:
      $$e(t) = \begin{cases} 4t^3 & \text{if } t < 0.5 \\ 1 - \frac{(-2t + 2)^3}{2} & \text{if } t \ge 0.5 \end{cases}$$
    - Drift to center: Simultaneously offsets doorway center to viewport center:
      $$\text{transform} = \text{translate}(t_x \cdot f, t_y \cdot f) \cdot \text{scale}(sc)$$
    - When zoom $sc \ge s_{End} / 1.15$ (or at $t=1500\text{ms}$), `#wallv` activates with zero visual flash, seamlessly transferring control to the subpage iframe.
  - **Reverse Walkthrough (`leaveWall()`)**:
    - Reverses scale from $S$ to $1.0$ over $1300\text{ms}$ using ease-out cubic $e(t) = 1 - (1-t)^3$.
    - Restores door rotation to $0^\circ$, clears transform origins, and re-engages Lenis smooth scroll.

---

### 2.6 "My Story" Clock Tunnel & Rolling Odometer

- **Confirmed Implementation**:
  - Script lines 1–110 of `script_7.js`.
  - **Scroll Progress & Rail Synchronization**:
    - Calculates vertical position where viewport center intersects `.story__line`.
    - Normalizes progress $p \in [0, 1]$ across the 5 chapters.
    - Sets CSS variables `--p` and `--warm` on section root.
  - **3D Clock Tunnel Canvas (`.story__bg`)**:
    - 16 concentric rings spaced at $GAP = 340\text{px}$, focal length $520\text{px}$, base radius $R = 620\text{px}$.
    - Depth coordinate for ring $i$:
      $$z = ((i \cdot GAP - \text{camZ}) \bmod len + len) \bmod len + 60$$
    - Scale factor: $s = \frac{FOCAL}{z} \cdot k$.
    - Perspective ring radius: $rr = R \cdot s$.
    - Clock dials rotate backwards with scroll:
      $$\text{spin} = -p \cdot \pi \cdot 1.5 - t \cdot 0.02$$
    - Radial hour ticks (12 long hour marks, 48 short minute ticks) and individual clock hands drawn via batched canvas paths.
    - 70 3D dust particles orbiting the tunnel with depth-based opacity attenuation.
  - **Odometer Digit Roll (`.dg__c`)**:
    - 4 vertical columns representing the 4 digits of the year (e.g., `2`, `0`, `2`, `4`).
    - CSS variable `--d` set from active chapter's `data-y`.
    - Each column contains digits 0–9 stacked vertically, translating via `transform: translateY(calc(var(--d) * -10%))` with `transition: transform 420ms cubic-bezier(.22, 1, .36, 1)`.

---

## 3. Assumptions vs. Confirmed Observations

1. **Lenis Integration**:
   - *Confirmed*: Lenis is loaded via ES module importmap (`./vendor/lenis.min.mjs`) and controls overall window scrolling.
   - *Confirmed*: During modal overlays and doorway walkthrough transitions, Lenis is explicitly paused (`lenis.stop()`) and wheel/touch events are intercepted to avoid desynchronization.
2. **GSAP & ScrollTrigger**:
   - *Confirmed finding*: The reference website **does NOT use GSAP or ScrollTrigger**.
   - *Verified mechanism*: The entire site runs on bespoke, ultra-lightweight Vanilla JS loops: semi-implicit Euler springs, Verlet physics, Web Animations API, and requestAnimationFrame canvas renderers.
   - *Architecture recommendation*: For our recreation, we will implement these exact lightweight formulas directly or encapsulate them in clean React hooks, avoiding heavy third-party bundle bloat.
3. **Three.js Usage**:
   - *Confirmed*: Three.js is utilized strictly for the 3D Holographic Ability Card (`/ability-card/`).
   - *Confirmed*: The homepage Hero, Doors Wall, and Story Clock Tunnel run on native 2D Canvas and CSS 3D transforms, NOT Three.js.

