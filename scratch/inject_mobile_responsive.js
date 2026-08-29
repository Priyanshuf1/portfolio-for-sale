const fs = require('fs');

// ============================================================
// GLB Mobile Responsive Fix — inject into <head> of index.html
// Targets ONLY @media (max-width: 809px) — the Framer phone breakpoint
// Uses high-specificity selectors to override Framer absolute positioning
// ============================================================

const mobileCSS = `
<style id="glb-mobile-responsive">
/* ================================================================
   GLB Mobile Responsive Overrides
   Breakpoint: max-width 809px (Framer phone breakpoint)
   Also: max-width 480px for small phones
   ================================================================ */

@media (max-width: 809px) {

  /* ── GLOBAL ── */
  html body * {
    max-width: 100vw !important;
  }
  html body {
    overflow-x: hidden !important;
  }
  html body #main {
    overflow-x: hidden !important;
  }

  /* ── 1. NAV BAR ── */
  /* Constrain logo size */
  html body .framer-1lcme9,
  html body [data-framer-name="Logo"] {
    width: auto !important;
    max-width: 160px !important;
    height: 40px !important;
  }
  html body .framer-1lcme9 img,
  html body [data-framer-name="Logo"] img {
    height: 36px !important;
    width: auto !important;
    max-width: 160px !important;
    object-fit: contain !important;
  }
  /* Header sticky at top */
  html body header {
    position: sticky !important;
    top: 0 !important;
    z-index: 9999 !important;
    width: 100% !important;
  }

  /* ── 2. HERO SECTION ── */
  html body [data-framer-name="hero"] {
    padding: 16px !important;
    min-height: auto !important;
  }
  /* Force hero content to stack vertically */
  html body [data-framer-name="hero"] [data-framer-name="Header+Main"],
  html body [data-framer-name="hero"] [data-framer-name="Main"],
  html body [data-framer-name="hero"] [data-framer-name="H1+Body"] {
    width: 100% !important;
    max-width: 100% !important;
  }
  /* Hero heading size */
  html body [data-framer-name="hero"] h1 {
    font-size: clamp(28px, 7vw, 48px) !important;
    line-height: 1.15 !important;
    word-break: break-word !important;
  }
  /* Hero paragraph */
  html body [data-framer-name="hero"] p {
    font-size: clamp(14px, 3.5vw, 18px) !important;
    line-height: 1.5 !important;
  }
  /* Hero buttons stack */
  html body [data-framer-name="hero"] [data-framer-name="Buttons"] {
    display: flex !important;
    flex-direction: column !important;
    gap: 12px !important;
    width: 100% !important;
  }
  html body [data-framer-name="hero"] [data-framer-name="Buttons"] > * {
    width: 100% !important;
  }

  /* ── 3. COMPANIES / LOGOS MARQUEE ── */
  html body [data-framer-name="Companies"] {
    overflow: hidden !important;
    width: 100% !important;
    max-width: 100vw !important;
  }
  html body [data-framer-name="Companies"] img {
    max-height: 28px !important;
    width: auto !important;
  }

  /* ── 4. ABOUT / MEET GLM SECTION ── */
  html body [data-framer-name="about me section"] {
    padding: 20px 16px !important;
  }
  /* Stack the about section content vertically */
  html body [data-framer-name="about me section"] [data-framer-name="container"] {
    display: flex !important;
    flex-direction: column !important;
    gap: 20px !important;
    height: auto !important;
  }
  html body [data-framer-name="about me section"] [data-framer-name="more info"] {
    width: 100% !important;
    height: auto !important;
    position: relative !important;
  }
  /* About heading */
  html body [data-framer-name="about me section"] h2,
  html body [data-framer-name="About"] {
    font-size: clamp(22px, 6vw, 36px) !important;
    line-height: 1.2 !important;
  }
  /* Skills tags wrap properly */
  html body [data-framer-name="Skills"] {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 8px !important;
    height: auto !important;
    width: 100% !important;
  }
  html body [data-framer-name="Skills"] > * {
    width: auto !important;
    height: auto !important;
    flex-shrink: 0 !important;
  }
  /* Experience items stack */
  html body [data-framer-name="Experience"] {
    display: flex !important;
    flex-direction: column !important;
    gap: 16px !important;
    height: auto !important;
  }
  /* Projects Carousel in about section */
  html body [data-framer-name="Projects Carousel"] {
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch !important;
    width: 100% !important;
  }

  /* ── 5. PROJECTS / RECENT WORK GRID ── */
  html body [data-framer-name="Projects"] {
    padding: 20px 16px !important;
  }
  html body [data-framer-name="Projects"] [data-framer-name="Images Wrapper"],
  html body [data-framer-name="Projects"] [data-framer-name="Mask"] {
    display: flex !important;
    flex-direction: column !important;
    gap: 16px !important;
    height: auto !important;
    width: 100% !important;
  }
  /* Force project columns to full width and stack */
  html body [data-framer-name="Projects"] [data-framer-name="Col 1"],
  html body [data-framer-name="Projects"] [data-framer-name="Col 5"],
  html body [data-framer-name="Projects"] [data-framer-name="Col 6"] {
    width: 100% !important;
    height: auto !important;
    position: relative !important;
  }
  /* Project card images fit viewport */
  html body [data-framer-name="Projects"] img {
    width: 100% !important;
    height: auto !important;
    object-fit: cover !important;
    border-radius: 12px !important;
  }
  html body [data-framer-name="Projects"] h2 {
    font-size: clamp(22px, 6vw, 36px) !important;
  }

  /* ── 6. PROCESS SECTION ── */
  html body [data-framer-name="process"] {
    padding: 20px 16px !important;
  }
  /* Stack text and diagram vertically */
  html body [data-framer-name="process"] [data-framer-name="Container"],
  html body [data-framer-name="process"] [data-framer-name="container"] {
    display: flex !important;
    flex-direction: column !important;
    gap: 20px !important;
    height: auto !important;
    width: 100% !important;
  }
  html body [data-framer-name="process"] [data-framer-name="right content"],
  html body [data-framer-name="process"] [data-framer-name="Right container"],
  html body [data-framer-name="process"] [data-framer-name="left container"],
  html body [data-framer-name="process"] [data-framer-name="Left container"] {
    width: 100% !important;
    height: auto !important;
    position: relative !important;
  }
  /* Process steps stack */
  html body [data-framer-name="process"] [data-framer-name="Steps"] {
    display: flex !important;
    flex-direction: column !important;
    gap: 16px !important;
    height: auto !important;
  }
  /* Process images fit */
  html body [data-framer-name="process"] img {
    width: 100% !important;
    height: auto !important;
    max-height: 300px !important;
    object-fit: contain !important;
  }
  html body [data-framer-name="process"] h2 {
    font-size: clamp(22px, 6vw, 36px) !important;
  }

  /* ── 7. SERVICES SECTION ── */
  html body [data-framer-name="Services"] {
    padding: 20px 16px !important;
  }
  html body [data-framer-name="Services"] [data-framer-name="container"],
  html body [data-framer-name="Services"] [data-framer-name="top container"] {
    display: flex !important;
    flex-direction: column !important;
    gap: 20px !important;
    height: auto !important;
    width: 100% !important;
  }
  html body [data-framer-name="Services"] [data-framer-name="left container"],
  html body [data-framer-name="Services"] [data-framer-name="Left container"] {
    width: 100% !important;
    height: auto !important;
    position: relative !important;
  }
  /* Services Bento grid → single column */
  html body [data-framer-name="Services Bento "] {
    display: flex !important;
    flex-direction: column !important;
    gap: 16px !important;
    height: auto !important;
    width: 100% !important;
  }
  html body [data-framer-name="Services Bento "] [data-framer-name="Left Cards"] {
    display: flex !important;
    flex-direction: column !important;
    gap: 12px !important;
    width: 100% !important;
    height: auto !important;
  }
  /* More Services tags wrap */
  html body [data-framer-name="More Services"] {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 8px !important;
    height: auto !important;
    width: 100% !important;
  }
  html body [data-framer-name="More Services"] > * {
    width: auto !important;
    height: auto !important;
  }
  html body [data-framer-name="Services"] img {
    width: 100% !important;
    height: auto !important;
    max-height: 300px !important;
    object-fit: contain !important;
  }
  html body [data-framer-name="Services"] h2 {
    font-size: clamp(22px, 6vw, 36px) !important;
  }

  /* ── 8. TESTIMONIALS SECTION ── */
  html body [data-framer-name="testimonials"] {
    padding: 20px 16px !important;
  }
  html body [data-framer-name="testimonials"] [data-framer-name="container"],
  html body [data-framer-name="testimonials"] [data-framer-name="top container"] {
    display: flex !important;
    flex-direction: column !important;
    gap: 20px !important;
    height: auto !important;
    width: 100% !important;
  }
  html body [data-framer-name="testimonials"] [data-framer-name="text content"] {
    width: 100% !important;
    height: auto !important;
  }
  /* Testimonial cards → single column */
  html body [data-framer-name="testimonials"] [data-framer-name="bottom container"] {
    display: flex !important;
    flex-direction: column !important;
    gap: 16px !important;
    height: auto !important;
    width: 100% !important;
  }
  html body [data-framer-name="testimonials"] [data-framer-name="Desktop"] {
    width: 100% !important;
    height: auto !important;
    min-height: 200px !important;
  }
  html body [data-framer-name="testimonials"] h2 {
    font-size: clamp(22px, 6vw, 36px) !important;
  }

  /* ── 9. STATS SECTION ── */
  html body [data-framer-name="Stats"] {
    padding: 20px 16px !important;
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: center !important;
    gap: 16px !important;
    height: auto !important;
  }
  html body [data-framer-name="Stats"] [data-framer-name="Primary"] {
    min-width: 40% !important;
    flex: 1 1 40% !important;
    text-align: center !important;
  }
  html body [data-framer-name="Stats"] [data-framer-name="Separation"] {
    display: none !important;
  }

  /* ── 10. FAQ SECTION ── */
  html body [data-framer-name="FAQ's"] {
    padding: 20px 16px !important;
  }
  html body [data-framer-name="FAQ's"] [data-framer-name="container"] {
    display: flex !important;
    flex-direction: column !important;
    gap: 20px !important;
    height: auto !important;
    width: 100% !important;
  }
  html body [data-framer-name="FAQ's"] [data-framer-name="Left container"] {
    width: 100% !important;
    height: auto !important;
    position: relative !important;
  }
  html body [data-framer-name="FAQ's"] [data-framer-name="All FAQs"] {
    width: 100% !important;
    height: auto !important;
  }
  html body [data-framer-name="FAQ's"] img {
    width: 100% !important;
    height: auto !important;
    max-height: 250px !important;
    object-fit: contain !important;
  }
  html body [data-framer-name="FAQ's"] h2 {
    font-size: clamp(22px, 6vw, 36px) !important;
  }
  /* FAQ accordion items full width */
  html body [data-framer-name="Open"],
  html body [data-framer-name="Closed"] {
    width: 100% !important;
  }
  html body [data-framer-name="Question"],
  html body [data-framer-name="Answer"] {
    width: 100% !important;
    padding: 12px 0 !important;
  }

  /* ── 11. CTA OVERLAY / FOOTER ── */
  html body [data-framer-name="Overlay"] {
    padding: 20px 16px !important;
  }
  html body [data-framer-name="Overlay"] [data-framer-name="Container"] {
    display: flex !important;
    flex-direction: column !important;
    gap: 16px !important;
    height: auto !important;
    width: 100% !important;
  }
  html body [data-framer-name="Overlay"] [data-framer-name="Text Content"] {
    width: 100% !important;
    height: auto !important;
  }
  /* Footer detail stack */
  html body [data-framer-name="Footer detail"] {
    display: flex !important;
    flex-direction: column !important;
    gap: 16px !important;
    height: auto !important;
    padding: 20px 16px !important;
    width: 100% !important;
  }
  html body [data-framer-name="Footer detail"] [data-framer-name="Info"],
  html body [data-framer-name="Footer detail"] [data-framer-name="Content"] {
    width: 100% !important;
    height: auto !important;
  }
  html body [data-framer-name="Footer detail"] [data-framer-name="Bottom"] {
    flex-direction: column !important;
    gap: 8px !important;
    height: auto !important;
  }
  /* Social media row */
  html body [data-framer-name="social media row"] {
    display: flex !important;
    justify-content: center !important;
    gap: 16px !important;
    flex-wrap: wrap !important;
    height: auto !important;
    width: 100% !important;
  }

  /* ── GENERAL TYPOGRAPHY CLAMPS ── */
  html body h2,
  html body [class*="framer-"] h2 {
    font-size: clamp(22px, 6vw, 36px) !important;
    line-height: 1.2 !important;
  }
  html body p,
  html body [class*="framer-"] p {
    font-size: clamp(13px, 3.2vw, 16px) !important;
    line-height: 1.5 !important;
  }

  /* ── BOOK A CALL FLOATING BUTTON ── */
  html body [data-framer-name="phone btn"] {
    position: fixed !important;
    bottom: 16px !important;
    left: 16px !important;
    right: 16px !important;
    z-index: 9998 !important;
    width: auto !important;
  }

  /* ── PREVENT ALL HORIZONTAL OVERFLOW ── */
  html body .framer-1iwpgy7,
  html body .framer-1jqzdj,
  html body .framer-1mm21uq,
  html body .framer-13xhzk6,
  html body .framer-11ocna9,
  html body .framer-izep5p,
  html body .framer-7sx5b6,
  html body .framer-85cfdf,
  html body .framer-17jcdvw {
    overflow: hidden !important;
    width: 100% !important;
    max-width: 100vw !important;
    padding-left: 16px !important;
    padding-right: 16px !important;
    box-sizing: border-box !important;
  }

}

/* ── EXTRA SMALL PHONES (< 480px) ── */
@media (max-width: 480px) {
  html body [data-framer-name="hero"] h1 {
    font-size: 26px !important;
  }
  html body h2,
  html body [class*="framer-"] h2 {
    font-size: 22px !important;
  }
  html body [data-framer-name="Stats"] [data-framer-name="Primary"] {
    min-width: 100% !important;
    flex: 1 1 100% !important;
  }
}
</style>
`;

// Read index.html
let html = fs.readFileSync('index.html', 'utf8');

// Remove any existing glb-mobile-responsive style block
html = html.replace(/<style id="glb-mobile-responsive">[\s\S]*?<\/style>/g, '');

// Inject BEFORE </head> so it's render-blocking (no FOUC)
html = html.replace('</head>', mobileCSS + '\n</head>');

fs.writeFileSync('index.html', html);
console.log('✅ Injected glb-mobile-responsive CSS into index.html');
console.log('   File size:', fs.statSync('index.html').size, 'bytes');
