const fs = require('fs');
const path = require('path');

const customCSS = `
<style id="priyanshu-custom-theme">
  /* ── Luxury White + Brand Red Theme with Liquid Platinum Silver Buttons ── */
  :root {
    --gold: #e20001;
    --gold-light: #ff3333;
    --midnight: #ffffff;
    --midnight-mid: #f9fafb;
    --midnight-card: #ffffff;
    --silver-liquid: linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 45%, #94A3B8 100%);
  }

  /* Global background overrides to instantly force white theme before React hydration */
  body, html, #main,
  .framer-OLpjL,
  .framer-povseb,
  div[class*="framer-povseb"],
  [data-framer-name="hero"],
  [data-framer-name="about me section"],
  [data-framer-name="Services"],
  [data-framer-name="process"],
  [data-framer-name="FAQ's"] {
    background-color: var(--midnight) !important;
    background: var(--midnight) !important;
  }

  /* Instantly show all hero & text content to bypass hydration delay opacity/transform lock */
  [data-framer-name="hero"] *,
  [data-framer-name="about me section"] *,
  .framer-1tw6hmz,
  .framer-1wqlnff {
    opacity: 1 !important;
    visibility: visible !important;
    transform: none !important;
  }

  /* Premium Hover lift, shadow, and scale for generated 3D section graphics */
  img[src*="process_graphics.jpg"],
  img[src*="faq_graphics.jpg"],
  img[src*="services_graphics.jpg"] {
    object-fit: cover !important;
    border-radius: 16px !important;
    box-shadow: 0 10px 30px rgba(0,0,0,0.04), 0 1px 8px rgba(0,0,0,0.02) !important;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
    padding: 0 !important;
    box-sizing: border-box !important;
  }
  img[src*="process_graphics.jpg"] { background-color: transparent !important; }
  img[src*="faq_graphics.jpg"] { background-color: transparent !important; }
  img[src*="services_graphics.jpg"] { background-color: transparent !important; }
  
  img[src*="process_graphics.jpg"]:hover,
  img[src*="faq_graphics.jpg"]:hover,
  img[src*="services_graphics.jpg"]:hover {
    transform: scale(1.025) translateY(-4px) !important;
    box-shadow: 0 20px 40px rgba(226, 0, 1, 0.08), 0 1px 12px rgba(226, 0, 1, 0.04) !important;
  }

  /* Crisp Slate for Headings & Clean Brand Red for Highlights */
  h1, h2, h3, h1 *, h2 *, h3 * {
    background: none !important;
    -webkit-background-clip: initial !important;
    -webkit-text-fill-color: initial !important;
    color: #111827 !important;
    text-shadow: none !important;
    filter: none !important;
  }
  h1 span, h2 span, h3 span,
  [class*="framer-"] h1 span, [class*="framer-"] h2 span, [class*="framer-"] h3 span {
    color: #e20001 !important;
    -webkit-text-fill-color: #e20001 !important;
    background: none !important;
    -webkit-background-clip: initial !important;
    text-shadow: none !important;
    filter: none !important;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--midnight); }
  ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

  /* Gold selection highlight */
  ::selection { background: rgba(226, 0, 1, 0.35); color: #fff; }

  /* Nav bar luxury glass */
  header, nav, [data-framer-name="Navbar"],
  [data-framer-name="nav"], [data-framer-name="Nav"] {
    background: rgba(255, 255, 255, 0.85) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    border-bottom: 1px solid rgba(226, 0, 1, 0.08) !important;
  }

  /* ⚡ ONLY CTA Primary Buttons → Liquid Platinum Silver Gradient ⚡ */
  a[class*="framer-"][class*="1dk6y11"],
  a[class*="framer-"][class*="1z0enj7"],
  a[class*="framer-1z0enj7"],
  a[class*="framer-1dk6y11"],
  a[data-framer-name="Primary"] {
    background: linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 45%, #94A3B8 100%) !important;
    color: #0A0E27 !important;
    font-weight: 700 !important;
    border: none !important;
    box-shadow: 0 0 28px rgba(255, 255, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.8) !important;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }

  /* ⚡ Force Text Inside Silver CTA Buttons to Crystal Clear Dark Obsidian (#0A0E27) ⚡ */
  a[class*="framer-"][class*="1dk6y11"] *,
  a[class*="framer-"][class*="1z0enj7"] *,
  a[class*="framer-1z0enj7"] *,
  a[class*="framer-1dk6y11"] *,
  a[data-framer-name="Primary"] *,
  a[class*="framer-1z0enj7"] p,
  a[class*="framer-1dk6y11"] p,
  a[data-framer-name="Primary"] p,
  a[class*="framer-1z0enj7"] span,
  a[class*="framer-1dk6y11"] span,
  a[data-framer-name="Primary"] span {
    color: #0A0E27 !important;
    -webkit-text-fill-color: #0A0E27 !important;
    font-weight: 700 !important;
  }

  a[class*="framer-"][class*="1dk6y11"]:hover,
  a[class*="framer-"][class*="1z0enj7"]:hover,
  a[data-framer-name="Primary"]:hover {
    box-shadow: 0 0 45px rgba(255, 255, 255, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.9) !important;
    transform: translateY(-2px) scale(1.03) !important;
  }

  /* Cards hover glow → Sharp Gold */
  [class*="framer-"]:hover > [class*="framer-s7w4jd"] {
    box-shadow: 0 0 30px rgba(226, 0, 1, 0.35) !important;
  }

  /* Project card overlay border → gold tint */
  [data-framer-name="View Project"],
  [data-framer-name="View Casestudy"] {
    border-color: rgba(226, 0, 1, 0.5) !important;
    background-color: rgba(10, 14, 39, 0.75) !important;
  }

  /* Gold divider lines */
  [data-framer-name="separation"] {
    background-color: rgba(226, 0, 1, 0.4) !important;
    opacity: 1 !important;
  }

  /* Cursor dot → sharp gold */
  [class*="cursor"], [data-framer-cursor] {
    background: var(--gold) !important;
    mix-blend-mode: normal !important;
  }

  /* Footer bg */
  footer, [data-framer-name="Footer"] {
    background: var(--midnight) !important;
    border-top: 1px solid rgba(226, 0, 1, 0.2) !important;
  }

  /* "Available / Open to projects" badge → Sharp Red */
  [class*="framer-"][class*="jral3p"] {
    border: 1px solid rgba(226, 0, 1, 0.6) !important;
    background: rgba(226, 0, 1, 0.12) !important;
    color: var(--gold) !important;
  }

  /* Social icon hover → red */
  a[class*="framer-ir3zuj"]:hover svg,
  a[class*="framer-ir3zuj"]:hover use {
    --21h8s6: #e20001 !important;
  }

  /* Modal Overlay and Content Light Text Theme Force */
  html body .glb-modal-content,
  html body .glb-modal-content *,
  html body .glb-modal-content-book,
  html body .glb-modal-content-book *,
  html body .glb-modal-content-review,
  html body .glb-modal-content-review *,
  html body .glb-admin-content,
  html body .glb-admin-content * {
    color: #f3f4f6 !important;
    -webkit-text-fill-color: #f3f4f6 !important;
  }

  /* Titles / Highlights inside modals */
  html body .glb-modal-title,
  html body .glb-modal-book-title,
  html body .glb-modal-review-title,
  html body .glb-admin-title {
    background: linear-gradient(90deg, #ffffff 0%, #e2e8f0 100%) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    color: transparent !important;
  }

  /* Subtitles inside modals */
  html body .glb-modal-subtitle,
  html body .glb-modal-book-subtitle,
  html body .glb-modal-review-subtitle {
    color: #e20001 !important;
    -webkit-text-fill-color: #e20001 !important;
  }

  /* Form input text typed by users inside modals */
  html body .glb-form-group input,
  html body .glb-form-group textarea,
  html body .glb-form-group select,
  html body .glb-form-group input *,
  html body .glb-form-group textarea *,
  html body #glbPasswordInput {
    color: #ffffff !important;
    -webkit-text-fill-color: #ffffff !important;
    background-color: rgba(255, 255, 255, 0.08) !important;
  }

  /* Input placeholders */
  html body .glb-form-group input::placeholder,
  html body .glb-form-group textarea::placeholder {
    color: #9ca3af !important;
    -webkit-text-fill-color: #9ca3af !important;
  }

  /* Button text colors inside modals */
  html body .glb-modal-cta,
  html body .glb-modal-book-btn,
  html body .glb-modal-review-btn,
  html body .glb-admin-submit,
  html body .glb-password-submit,
  html body .glb-approve-btn {
    color: #000000 !important;
    -webkit-text-fill-color: #000000 !important;
    background-color: #ffffff !important;
  }
  html body .glb-modal-cta:hover,
  html body .glb-modal-book-btn:hover,
  html body .glb-modal-review-btn:hover,
  html body .glb-admin-submit:hover,
  html body .glb-password-submit:hover,
  html body .glb-approve-btn:hover {
    background-color: #e2e8f0 !important;
  }

  html body .glb-delete-btn {
    color: #f87171 !important;
    -webkit-text-fill-color: #f87171 !important;
    background-color: rgba(248, 113, 113, 0.1) !important;
    border: 1px solid rgba(248, 113, 113, 0.2) !important;
  }
  html body .glb-delete-btn:hover {
    background-color: #f87171 !important;
    color: #ffffff !important;
    -webkit-text-fill-color: #ffffff !important;
  }

  /* Clean, Premium Navbar Link Buttons - NO ugly box borders! */
  html body nav[data-framer-name="nav links"] a,
  html body a.framer-1yuh7ai {
    border: none !important;
    background: transparent !important;
    background-color: transparent !important;
    border-radius: 0px !important;
    padding: 6px 12px !important;
    color: #4b5563 !important; /* Soft grey text */
    -webkit-text-fill-color: #4b5563 !important;
    font-weight: 500 !important;
    transition: all 0.25s ease !important;
    box-shadow: none !important;
  }
  
  html body nav[data-framer-name="nav links"] a p,
  html body nav[data-framer-name="nav links"] a span,
  html body a.framer-1yuh7ai p,
  html body a.framer-1yuh7ai span {
    color: #4b5563 !important;
    -webkit-text-fill-color: #4b5563 !important;
    font-weight: 500 !important;
  }

  /* Active Navbar Link style: clean pill design */
  html body nav[data-framer-name="nav links"] a.glb-nav-active,
  html body a.framer-1yuh7ai.glb-nav-active {
    background-color: #e20001 !important; /* Brand red active background */
    border-radius: 20px !important;
    color: #ffffff !important;
    -webkit-text-fill-color: #ffffff !important;
    font-weight: 700 !important;
    padding: 6px 14px !important;
    box-shadow: 0 4px 12px rgba(226, 0, 1, 0.2) !important;
    border: none !important;
  }

  html body nav[data-framer-name="nav links"] a.glb-nav-active p,
  html body nav[data-framer-name="nav links"] a.glb-nav-active span,
  html body a.framer-1yuh7ai.glb-nav-active p,
  html body a.framer-1yuh7ai.glb-nav-active span {
    color: #ffffff !important;
    -webkit-text-fill-color: #ffffff !important;
    font-weight: 700 !important;
  }

  /* Hover states for inactive links: subtle text color change */
  html body nav[data-framer-name="nav links"] a:not(.glb-nav-active):hover,
  html body a.framer-1yuh7ai:not(.glb-nav-active):hover {
    color: #e20001 !important;
    -webkit-text-fill-color: #e20001 !important;
  }
  
  html body nav[data-framer-name="nav links"] a:not(.glb-nav-active):hover p,
  html body nav[data-framer-name="nav links"] a:not(.glb-nav-active):hover span,
  html body a.framer-1yuh7ai:not(.glb-nav-active):hover p,
  html body a.framer-1yuh7ai:not(.glb-nav-active):hover span {
    color: #e20001 !important;
    -webkit-text-fill-color: #e20001 !important;
  }

  /* Hide the Admin button completely from the header navigation bar list */
  #glbTriggerAdmin,
  .glb-admin-nav-btn {
    display: none !important;
  }

  /* Disable hardcoded active red services link override from bg-enhancer.js */
  html body nav[data-framer-name="nav links"] a.framer-1yuh7ai[href*="services"],
  html body nav[data-framer-name="nav links"] a.framer-1yuh7ai[href*="Services"] {
    background: transparent !important;
    background-color: transparent !important;
    border: none !important;
    border-radius: 0px !important;
    padding: 6px 12px !important;
    color: #4b5563 !important;
    -webkit-text-fill-color: #4b5563 !important;
    font-weight: 500 !important;
    box-shadow: none !important;
  }
  html body nav[data-framer-name="nav links"] a.framer-1yuh7ai[href*="services"] p,
  html body nav[data-framer-name="nav links"] a.framer-1yuh7ai[href*="Services"] p,
  html body nav[data-framer-name="nav links"] a.framer-1yuh7ai[href*="services"] span,
  html body nav[data-framer-name="nav links"] a.framer-1yuh7ai[href*="Services"] span {
    color: #4b5563 !important;
    -webkit-text-fill-color: #4b5563 !important;
    font-weight: 500 !important;
  }

  /* Reactivate Services styling only when glb-nav-active class is added */
  html body nav[data-framer-name="nav links"] a.framer-1yuh7ai[href*="services"].glb-nav-active,
  html body nav[data-framer-name="nav links"] a.framer-1yuh7ai[href*="Services"].glb-nav-active {
    background-color: #e20001 !important;
    border-radius: 20px !important;
    color: #ffffff !important;
    -webkit-text-fill-color: #ffffff !important;
    font-weight: 700 !important;
    padding: 6px 14px !important;
    box-shadow: 0 4px 12px rgba(226, 0, 1, 0.2) !important;
    border: none !important;
  }
  html body nav[data-framer-name="nav links"] a.framer-1yuh7ai[href*="services"].glb-nav-active p,
  html body nav[data-framer-name="nav links"] a.framer-1yuh7ai[href*="Services"].glb-nav-active p,
  html body nav[data-framer-name="nav links"] a.framer-1yuh7ai[href*="services"].glb-nav-active span,
  html body nav[data-framer-name="nav links"] a.framer-1yuh7ai[href*="Services"].glb-nav-active span {
    color: #ffffff !important;
    -webkit-text-fill-color: #ffffff !important;
    font-weight: 700 !important;
  }

  /* Mobile touch/tap target expansion to WCAG 44x44px minimum target size */
  @media (max-width: 809px) {
    html body nav[data-framer-name="nav links"] a,
    div[data-framer-name="Hamburger"],
    a[href*="facebook"],
    a[href*="instagram"],
    a[href*="linkedin"],
    a[href*="youtube"],
    a[href*="wa.me"],
    .glb-contact-card-action,
    .glb-map-direct-btn {
      position: relative !important;
    }
    
    html body nav[data-framer-name="nav links"] a::after,
    div[data-framer-name="Hamburger"]::after,
    a[href*="facebook"]::after,
    a[href*="instagram"]::after,
    a[href*="linkedin"]::after,
    a[href*="youtube"]::after,
    a[href*="wa.me"]::after,
    .glb-contact-card-action::after,
    .glb-map-direct-btn::after {
      content: "" !important;
      position: absolute !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%) !important;
      width: 100% !important;
      min-width: 44px !important;
      height: 100% !important;
      min-height: 44px !important;
      z-index: 10 !important;
    }
  }

  html { scroll-behavior: smooth; }
</style>
`;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    if (filePath.endsWith('index.html')) {
        if (content.indexOf('priyanshu-custom-theme') !== -1) {
            content = content.replace(/<style id="priyanshu-custom-theme">[\s\S]*?<\/style>/g, customCSS);
        } else {
            content = content.replace('</head>', customCSS + '\n</head>');
        }
        fs.writeFileSync(filePath, content);
        console.log('✅ Updated index.html with Sharp Gold Theme & Liquid Silver Buttons');
    }
}

processFile('index.html');
