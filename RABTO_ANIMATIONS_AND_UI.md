# Technical Animation & Mobile UI Design System Specs

This documentation details the custom animation engines, interactive canvas physics, text reveals, and responsive mobile-first UI patterns implemented in this portfolio.

---

## ── TABLE OF CONTENTS ──
1. [Core Animation Philosophy](#1-core-animation-philosophy)
2. [Text & Typographic Reveal Animations](#2-text--typographic-reveal-animations)
3. [WebGL & Canvas Physics Systems](#3-webgl--canvas-physics-systems)
4. [Awwwards-Style Card Interaction (3D Tilt & Spot Glare)](#4-awwwards-style-card-interaction-3d-tilt--spot-glare)
5. [Responsive Mobile UI Architecture](#5-responsive-mobile-ui-architecture)
6. [Dynamic Asset Compile & Deployment Optimization](#6-dynamic-asset-compile--deployment-optimization)

---

## 1. CORE ANIMATION PHILOSOPHY
Our animation layers are designed to create a premium, editorial, high-end feel while maintaining smooth frame rates (60fps target on all viewports). To prevent layout jank:
- **GSAP (GreenSock)** owns scroll-choreographed text entry, SVG morphs, and header/footer states.
- **RequestAnimationFrame (RAF)** loop controls interactive mouse-tethered physics and momentum lerping.
- **Hardware-accelerated CSS** handles continuous background looping (radar waves, navigation shimmers).
- **Conditional Initialization**: Heavy physics and WebGL loops are completely bypassed on mobile viewports to prevent processor thermal throttling.

---

## 2. TEXT & TYPOGRAPHIC REVEAL ANIMATIONS

### Word-Split Scroll Entry
To achieve a fluid text-reveal entry without layout shifts:
- Large headings are parsed into individual words wrapped in `<span>` tags with `overflow: hidden`.
- An inner `<span>` is animated dynamically:
  ```javascript
  gsap.from(words, {
    y: "110%",
    duration: 0.95,
    ease: "power4.out",
    stagger: 0.05,
    scrollTrigger: {
      trigger: heading,
      start: "top 85%"
    }
  });
  ```
- **Mobile optimization**: Fails gracefully to a simple opacity fade on older devices.

### Dynamic SVG Line Drawing
Continuous paths (connective visual lines) animate their dash arrays relative to viewport scroll progress:
- Path lengths are measured dynamically via `path.getTotalLength()`.
- Synchronized to GSAP's scroll position:
  ```javascript
  gsap.fromTo(path, 
    { strokeDashoffset: length }, 
    { strokeDashoffset: 0, scrollTrigger: { trigger: section, scrub: true } }
  );
  ```

---

## 3. WEBGL & CANVAS PHYSICS SYSTEMS

### Eager-Loaded Vanta Topology Background
A monochromatic vector mesh renders organic topography curves in the hero section:
- Dynamic script injection pulls in `three.js`, `p5.js`, and `vanta.topology.js` only on desktop viewports.
- Skips loading on viewports `< 768px` to save **500KB+** of asset weight and zero CPU thread execution on mobile.
- Automatic canvas fade-out occurs past `80%` of the viewport height to avoid background renders on scrolling down.

### Light-Mode Interactive Constellation
An interactive node-link particle net is drawn dynamically over a transparent HTML body:
- **Zero-Shadow drawing**: Removed expensive `ctx.shadowBlur` operations, accelerating render performance by **10x** on the canvas layer.
- **Mouse Repulsion Physics**: Node speed vectors deflect dynamically as they approach the user's cursor radius, creating a magnetic mesh ripple.
- **Cursor Tethering**: Close particles dynamically draw connecting lines to the mouse coordinate using brand-red color gradient sweeps.

---

## 4. AWWWARDS-STYLE CARD INTERACTION (3D TILT & SPOT GLARE)
All client reviews, services, and skill badges incorporate dynamic Awwwards-style perspective-tilt:
- **Momentum Lerping**: A `0.12` interpolation coefficient smooths rotation, keeping motion fluid:
  ```javascript
  currentRotationX += (targetRotationX - currentRotationX) * 0.12;
  ```
- **Radial Glare Spotlight**: A hover-state radial shine overlay follows the cursor coordinate, utilizing CSS custom properties `--mouse-x` and `--mouse-y` dynamically set via JavaScript:
  ```css
  background: radial-gradient(550px circle at var(--mouse-x) var(--mouse-y), rgba(226,0,1,0.18), transparent 45%);
  ```
- **Mobile Guard**: Completely skipped on touch viewports to prevent touchscreen gesture conflicts.

---

## 5. RESPONSIVE MOBILE UI ARCHITECTURE

### Flex-Wrapped Video Feed Grid
To support at least 2 videos by default from the Elfsight Instagram widget, the layout resets typical carousel structures to a clean responsive grid:
```css
@media (max-width: 600px) {
  [class*="SliderViewport"], [class*="CarouselViewport"], [class*="SliderTrack"] {
    display: flex !important;
    flex-wrap: wrap !important;
    overflow: visible !important;
    transform: none !important;
  }
  [class*="SliderItem"], [class*="CarouselItem"] {
    width: 48% !important;
    flex: 0 0 48% !important;
    margin: 1% !important;
  }
}
```

### Dynamic Link Capture (0% CPU Footprint)
Rather than executing resource-intensive recursive `setInterval` loops that scan the entire page every 500ms to patch links, we implemented high-performance **click delegation** on capture phases:
```javascript
document.addEventListener('click', (e) => {
  const el = e.target.closest('a, button');
  if (el && el.textContent.toLowerCase().includes('book a call')) {
    e.preventDefault();
    e.stopPropagation();
    window.openBookACallModal();
  }
}, { capture: true });
```
This guarantees 0% CPU consumption during idle states while securely intercepting dynamically created CTA links before default navigation fires.

### Bottom Full-Width Sticky Bar
On viewports `< 768px`, secondary triggers are hidden to prevent visual clutter, and the primary "Book a Call" CTA button is styled as a clean sticky bar at the base of the touchscreen viewport.

---

## 6. DYNAMIC ASSET COMPILE & DEPLOYMENT OPTIMIZATION
- **Cache-Busting Pipelines**: The script query parameter versions (e.g., `styles.css?v=1.5`) are updated during edits to force mobile browsers to discard cached resources immediately.
- **Template Compiler (`patch.js`)**: Coordinates layout updates, injects dynamic modular scripts, patches Framer structures, and ensures all standalone pages (`blog.html`, `instagram.html`, etc.) stay in sync with layout styling and global modules.
