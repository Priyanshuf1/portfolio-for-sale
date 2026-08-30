const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Update viewport meta tag for mobile accessibility
html = html.replace(/<meta[^>]*name=["']viewport["'][^>]*>/gi, '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">');

// ACTIVELY REMOVE three-logo-interactive.js (unused 3D model)
html = html.replace(/<script[^>]+three-logo-interactive\.js[^>]*><\/script>\r?\n?/gi, '');
html = html.replace(/<script id="inline-logo3d-script">[\s\S]*?<\/script>\r?\n?/gi, '');

// Remove the old blog drawer if it exists
html = html.replace('<script src="./blog-section.js"></script>\n', '');

// Hide old Framer Client Reviews and other sections immediately to prevent FOUC delay
html = html.replace(/<style>[\s\S]*?\/\* Hide old testimonials section \*\/[\s\S]*?<\/style>/gi, '');

const hideStyle = `
<!-- Cache Control Meta Tags to Prevent Stale/Old Commit Flashes -->
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
<script id="kill-service-workers">
  // Force document title to brand name and protect from Framer runtime overrides
  let brandTitle = "Global Logic Media";
  const titleObserver = new MutationObserver(function() {
    if (document.title !== brandTitle) {
      document.title = brandTitle;
    }
  });

  function initTitleLock() {
    const titleEl = document.querySelector('title');
    if (titleEl) {
      brandTitle = titleEl.textContent;
      document.title = brandTitle;
      titleObserver.observe(titleEl, { characterData: true, childList: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTitleLock);
  } else {
    initTitleLock();
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for (let registration of registrations) {
        registration.unregister().then(function() {
          console.log('Stale service worker unregistered!');
          window.location.reload(true);
        });
      }
    });
  }
  if ('caches' in window) {
    caches.keys().then(function(names) {
      for (let name of names) {
        caches.delete(name);
      }
    });
  }
</script>
<script id="debug-error-catcher">
window.__pageErrors = [];
window.addEventListener('error', function(e) {
  window.__pageErrors.push({
    message: e.message,
    filename: e.filename,
    lineno: e.lineno,
    colno: e.colno,
    stack: e.error ? e.error.stack : null
  });
});
window.addEventListener('unhandledrejection', function(e) {
  window.__pageErrors.push({
    message: e.reason ? e.reason.message : 'Unhandled rejection',
    stack: e.reason ? e.reason.stack : null
  });
});
const origError = console.error;
console.error = function(...args) {
  window.__pageErrors.push({
    message: args.map(a => String(a)).join(' '),
    stack: new Error().stack
  });
  origError.apply(console, args);
};
</script>
<style id="glb-main-custom-styles">
  /* Hide old testimonials section */
  #testimonials, section[data-framer-name="testimonials"], .framer-izep5p { display: none !important; }
  
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
    background-color: #ffffff !important;
    background: #ffffff !important;
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
  img[src*="process_graphics"],
  img[src*="faq_graphics"],
  img[src*="services_graphics"] {
    object-fit: cover !important;
    border-radius: 16px !important;
    box-shadow: 0 10px 30px rgba(0,0,0,0.04), 0 1px 8px rgba(0,0,0,0.02) !important;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
    padding: 0 !important;
    box-sizing: border-box !important;
  }
  img[src*="process_graphics"] { background-color: transparent !important; }
  img[src*="faq_graphics"] { background-color: transparent !important; }
  img[src*="services_graphics"] { background-color: transparent !important; }
  
  img[src*="process_graphics"]:hover,
  img[src*="faq_graphics"]:hover,
  img[src*="services_graphics"]:hover {
    transform: scale(1.025) translateY(-4px) !important;
    box-shadow: 0 20px 40px rgba(226, 0, 1, 0.08), 0 1px 12px rgba(226, 0, 1, 0.04) !important;
  }

  /* Instantly hide original template sections to prevent flash of unstyled content */
  [data-framer-name="Projects"],
  .framer-1mm21uq {
    display: none !important;
    opacity: 0 !important;
    height: 0 !important;
    overflow: hidden !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  /* Hide the Instagram screenshots carousel from the Meet Global Logic Media | Digital Marketing Agency in Lucknow | SEO, Web Design & Lead Generation|Global Logic Media | Digital Marketing Agency in Lucknow | SEO, Web Design & Lead Generation|Global Logic Media | Digital Marketing Agency in Lucknow | SEO, Web Design & Lead Generationsection globally */
  #about-me .framer-1ineur-container,
  [data-framer-name="about me section"] .framer-1ineur-container {
    display: none !important;
    visibility: hidden !important;
    height: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
    overflow: hidden !important;
  }
  /* Premium Mobile Layout Fixes */
  @media (max-width: 767px) {
    /* 1. Scale down logo header on mobile to prevent overflow & overlap */
    html body .framer-1lcme9 {
      width: 160px !important;
      height: 48px !important;
      background: none !important;
      background-image: none !important;
    }
    /* Hide the React-restored duplicate child div and images to prevent double rendering */
    .framer-1lcme9 div,
    .framer-1lcme9 img {
      display: none !important;
    }
    .framer-11n6lfm-container {
      height: 60px !important;
    }
    /* 2. Collapse automatic empty height/spacing from Framer container elements */
    .framer-povseb, .framer-OLpjL {
      height: auto !important;
      min-height: 100vh !important;
      overflow: visible !important;
    }
    /* 3. Tighten section spacing to eliminate massive blank page gaps */
    #hero,
    [data-framer-name="hero"] {
      min-height: auto !important;
      height: auto !important;
      padding-top: 100px !important; /* Pushes content down to clear the floating header */
      padding-bottom: 40px !important;
    }
    #about-me, #process, #services, #faq,
    [data-framer-name="about me section"],
    [data-framer-name="process"],
    [data-framer-name="Services"],
    [data-framer-name="FAQ's"] {
      min-height: auto !important;
      height: auto !important;
      padding-top: 40px !important;
      padding-bottom: 40px !important;
    }
    /* 4. Fix custom sections spacing */
    #projects {
      min-height: auto !important;
      padding: 40px 0 20px !important;
    }
    #glm-instagram-feed-section {
      min-height: auto !important;
      padding: 20px 0 40px !important;
    }
  }

  /* Horizontal Nav links tray on mobile devices */
  /* Horizontal Nav links tray on mobile devices */
  @media (max-width: 810px) {
    /* Set fixed wrapper height to auto to fit logo + links tray */
    .framer-11n6lfm-container {
      height: auto !important;
      min-height: 145px !important;
      background: rgba(255, 255, 255, 0.96) !important;
      backdrop-filter: blur(12px) !important;
      -webkit-backdrop-filter: blur(12px) !important;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
    }

    /* Adjust header height and style */
    header:not(.glb-site-header),
    header[data-framer-name="Desktop"]:not(.glb-site-header),
    .framer-QWF25.framer-9hd2nx {
      height: auto !important;
      min-height: 145px !important;
      flex-direction: column !important;
      justify-content: center !important;
      align-items: center !important;
      padding: 8px 16px !important;
      gap: 6px !important;
      background: transparent !important;
      overflow: visible !important;
    }
    
    /* Re-layout header wrapper children */
    .framer-1o2om4 {
      width: 100% !important;
      flex-direction: column !important;
      align-items: center !important;
      gap: 6px !important;
    }
    
    .framer-h0ping {
      width: 100% !important;
      justify-content: center !important;
      display: flex !important;
      margin-top: 2px !important;
    }
    
    /* Make horizontal links list scrollable with smooth touch momentum scroll */
    nav[data-framer-name="nav links"] {
      display: flex !important;
      flex-direction: row !important;
      justify-content: flex-start !important;
      align-items: center !important;
      gap: 16px !important;
      width: 100% !important;
      max-width: 100vw !important;
      overflow-x: auto !important;
      overflow-y: hidden !important;
      -webkit-overflow-scrolling: touch !important;
      padding: 6px 12px !important;
      background: rgba(255, 255, 255, 0.8) !important;
      border-radius: 20px !important;
      border: none !important;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03) !important;
      scrollbar-width: none !important;
    }

    nav[data-framer-name="nav links"]::-webkit-scrollbar {
      display: none !important;
    }
    
    /* Prevent elements inside scrollable nav from stretching/wrapping */
    nav[data-framer-name="nav links"] > div {
      flex: 0 0 auto !important;
    }
    
    /* Adjust mobile text sizes inside active pills */
    nav[data-framer-name="nav links"] a {
      padding: 5px 10px !important;
      font-size: 13px !important;
      flex-shrink: 0 !important;
    }

    /* Hide native menu trigger button so it doesn't float over our horizontal links tray */
    div[data-framer-name="Menu Button"],
    div[class*="menu-button"] {
      display: none !important;
    }
  }

  /* Style for mini skill cards / badges in Services section - Bold Brand Red Filled */
  html body [data-framer-name="Services"] .framer-NIbMY,
  html body .framer-NIbMY {
    background: rgb(226, 0, 1) !important;
    background-color: rgb(226, 0, 1) !important;
    border: none !important;
    border-radius: 20px !important;
    padding: 8px 18px !important;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
    cursor: pointer !important;
    box-shadow: 0 4px 10px rgba(226, 0, 1, 0.15) !important;
  }

  html body [data-framer-name="Services"] .framer-NIbMY *,
  html body .framer-NIbMY * {
    color: #ffffff !important;
    -webkit-text-fill-color: #ffffff !important;
    background-color: transparent !important;
    background: transparent !important;
    font-weight: 600 !important;
  }

  html body [data-framer-name="Services"] .framer-NIbMY:hover,
  html body .framer-NIbMY:hover {
    background: #111827 !important;
    background-color: #111827 !important;
    transform: translateY(-3px) scale(1.05) !important;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
  }

  html body [data-framer-name="Services"] .framer-NIbMY:hover *,
  html body .framer-NIbMY:hover * {
    color: #ffffff !important;
    -webkit-text-fill-color: #ffffff !important;
  }

  /* Premium filled layout for Stats Cards (framer-t9Edp) */
  html body [data-framer-name="Services"] .framer-t9Edp,
  html body .framer-t9Edp {
    background: #ffffff !important;
    background-color: #ffffff !important;
    border: 1px solid rgba(0, 0, 0, 0.06) !important;
    border-radius: 12px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02) !important;
    transition: all 0.3s ease !important;
    padding: 14px 20px !important;
  }
  
  html body [data-framer-name="Services"] .framer-t9Edp:hover,
  html body .framer-t9Edp:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06) !important;
    border-color: rgba(226, 0, 1, 0.2) !important;
  }

  /* Color stat numbers brand red */
  html body [data-framer-name="Services"] .framer-18ouoo9,
  html body [data-framer-name="Services"] .framer-18ouoo9 *,
  html body .framer-18ouoo9,
  html body .framer-18ouoo9 * {
    color: rgb(226, 0, 1) !important;
    -webkit-text-fill-color: rgb(226, 0, 1) !important;
    background-color: transparent !important;
    background: transparent !important;
    font-weight: 800 !important;
  }

  /* Color description texts charcoal gray */
  html body [data-framer-name="Services"] .framer-1lqu27a,
  html body [data-framer-name="Services"] .framer-1lqu27a *,
  html body [data-framer-name="Services"] .framer-i2bbrs,
  html body [data-framer-name="Services"] .framer-i2bbrs *,
  html body .framer-1lqu27a,
  html body .framer-1lqu27a *,
  html body .framer-i2bbrs,
  html body .framer-i2bbrs * {
    color: #374151 !important;
    -webkit-text-fill-color: #374151 !important;
    background-color: transparent !important;
    background: transparent !important;
  }

  /* =====================================================
     VANILLA WARM YELLOWISH-WHITE — ALL CARD CONTAINERS
     Static base color, hover gets a subtle warm glow lift
  ===================================================== */

  /* Core service feature cards (framer-nSE2Y) — override inline dark token */
  .framer-nSE2Y,
  [class*="framer-nSE2Y"] {
    background-color: #FFFDF0 !important;
    background: #FFFDF0 !important;
    /* Override the inline CSS var that makes it dark */
    --token-0c62d1bb-1ac3-4cd6-8f0f-8ee3950e02c0: #FFFDF0 !important;
    border-radius: 20px !important;
    border: 1px solid rgba(226, 160, 0, 0.12) !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04) !important;
    transition: transform 0.3s ease, box-shadow 0.3s ease !important;
  }

  /* Hover effect on service cards — warm amber glow lift */
  .framer-nSE2Y:hover,
  [class*="framer-nSE2Y"]:hover {
    transform: translateY(-4px) !important;
    box-shadow: 0 12px 36px rgba(226, 120, 0, 0.12), 0 2px 8px rgba(0,0,0,0.04) !important;
    border-color: rgba(226, 160, 0, 0.25) !important;
  }

  /* Text inside service cards — dark charcoal for readability */
  .framer-nSE2Y *,
  [class*="framer-nSE2Y"] * {
    color: #1f2937 !important;
    -webkit-text-fill-color: #1f2937 !important;
    background-color: transparent !important;
    background: transparent !important;
  }

  /* Paragraph text slightly softer */
  .framer-nSE2Y p,
  [class*="framer-nSE2Y"] p {
    color: #4b5563 !important;
    -webkit-text-fill-color: #4b5563 !important;
    font-size: 15px !important;
    line-height: 1.65 !important;
  }

  /* Headings inside cards — bold dark */
  .framer-nSE2Y h1,
  .framer-nSE2Y h2,
  .framer-nSE2Y h3,
  .framer-nSE2Y h4,
  [class*="framer-nSE2Y"] h1,
  [class*="framer-nSE2Y"] h2,
  [class*="framer-nSE2Y"] h3,
  [class*="framer-nSE2Y"] h4 {
    color: #111827 !important;
    -webkit-text-fill-color: #111827 !important;
    font-weight: 700 !important;
  }

  /* Icons inside service cards — keep them dark/charcoal, not white */
  .framer-nSE2Y svg,
  [class*="framer-nSE2Y"] svg {
    color: #374151 !important;
    stroke: #374151 !important;
    fill: currentColor !important;
  }

  /* Stats / Stats cards (framer-t9Edp) — also vanilla warm white */
  html body .framer-t9Edp {
    background: #FFFDF0 !important;
    background-color: #FFFDF0 !important;
    border: 1px solid rgba(226, 160, 0, 0.12) !important;
    border-radius: 12px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03) !important;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease !important;
  }
  html body .framer-t9Edp:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 10px 28px rgba(226, 120, 0, 0.1) !important;
    border-color: rgba(226, 0, 1, 0.25) !important;
  }

  /* Comparison cards in "Mind behind Work" section — vanilla warm */
  .glb-comparison-card.others {
    background: #FFFDF0 !important;
    border: 1px solid rgba(0, 0, 0, 0.06) !important;
  }
  .glb-comparison-card.others:hover {
    background: #FFF9E6 !important;
    border-color: rgba(226, 160, 0, 0.2) !important;
    transform: translateY(-3px) !important;
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.06) !important;
  }
  /* Text color fix in others comparison card */
  .glb-comparison-card.others .glb-comp-title { color: #374151 !important; }
  .glb-comparison-card.others .glb-comp-item { color: #4b5563 !important; }

  /* Team cards in team section — vanilla warm */
  .glb-team-card {
    background: #FFFDF0 !important;
    border: 1px solid rgba(226, 160, 0, 0.1) !important;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04) !important;
  }
  .glb-team-card:hover {
    background: #FFF9E6 !important;
    border-color: rgba(226, 0, 1, 0.25) !important;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(226, 0, 1, 0.08) !important;
    transform: translateY(-4px) !important;
  }
  /* Team card text — dark on vanilla bg */
  .glb-team-name { color: #111827 !important; }
  .glb-team-desc { color: #6b7280 !important; }

  /* Review / skill cards in custom sections */
  .glb-review-card-premium,
  .glb-skill-card,
  .glb-contact-card,
  .glb-map-container-box {
    background: #FFFDF0 !important;
    border: 1px solid rgba(226, 160, 0, 0.1) !important;
  }
  .glb-review-card-premium:hover,
  .glb-skill-card:hover,
  .glb-contact-card:hover {
    background: #FFF9E6 !important;
    border-color: rgba(226, 0, 1, 0.2) !important;
    transform: translateY(-3px) !important;
  }
</style>\n`;
// Extract the parts of hideStyle dynamically
const mainScriptMatch = hideStyle.match(/<script id="kill-service-workers">[\s\S]*?<\/script>/gi);
const mainStyleMatch = hideStyle.match(/<style id="glb-main-custom-styles">[\s\S]*?<\/style>/gi);

// Inject meta tags if not already present
if (!html.includes('http-equiv="Cache-Control"')) {
    const metaMatch = hideStyle.match(/<!--[\s\S]*?-->\n<meta[\s\S]*?<meta http-equiv="Expires" content="0">/gi);
    if (metaMatch) {
        html = html.replace('<head>', '<head>\n' + metaMatch[0]);
    } else {
        const lines = hideStyle.trim().split('\n');
        const metaBlock = lines.slice(0, 4).join('\n');
        html = html.replace('<head>', '<head>\n' + metaBlock);
    }
}

// Inject/update script
if (html.includes('id="kill-service-workers"')) {
    if (mainScriptMatch) {
        html = html.replace(/<script id="kill-service-workers">[\s\S]*?<\/script>/gi, mainScriptMatch[0]);
    }
} else {
    if (mainScriptMatch) {
        html = html.replace('<head>', '<head>\n' + mainScriptMatch[0]);
    }
}

// Inject/update style
if (html.includes('id="glb-main-custom-styles"')) {
    if (mainStyleMatch) {
        html = html.replace(/<style id="glb-main-custom-styles">[\s\S]*?<\/style>/gi, mainStyleMatch[0]);
    }
} else {
    if (mainStyleMatch) {
        html = html.replace('<head>', '<head>\n' + mainStyleMatch[0]);
    }
}

// Inject Firebase init before other custom scripts
if (!html.includes('firebase-init.js')) {
    const firebaseScripts = `
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>
<script src="./firebase-init.js"></script>
`;
    html = html.replace('</body>', firebaseScripts + '</body>');
}

if (!html.includes('custom-footer.js')) html = html.replace('</body>', '<script src="./custom-footer.js"></script>\n</body>');
if (!html.includes('book-a-call-modal.js')) html = html.replace('</body>', '<script src="./book-a-call-modal.js"></script>\n</body>');
if (!html.includes('add-review-modal.js')) html = html.replace('</body>', '<script src="./add-review-modal.js"></script>\n</body>');
if (!html.includes('native-sections.js')) html = html.replace('</body>', '<script src="./native-sections.js"></script>\n</body>');
if (!html.includes('blog-section.js')) html = html.replace('</body>', '<script src="./blog-section.js"></script>\n</body>');
if (!html.includes('location-section.js')) html = html.replace('</body>', '<script src="./location-section.js"></script>\n</body>');
if (!html.includes('admin-panel.js')) html = html.replace('</body>', '<script src="./admin-panel.js"></script>\n</body>');
if (!html.includes('ambient-particles.js')) html = html.replace('</body>', '<script src="./ambient-particles.js"></script>\n</body>');
if (!html.includes('audio-system.js')) html = html.replace('</body>', '<script src="./audio-system.js"></script>\n</body>');
if (!html.includes('svg-decorations.js')) html = html.replace('</body>', '<script src="./svg-decorations.js"></script>\n</body>');
if (!html.includes('rabto-fx-engine.js')) html = html.replace('</body>', '<script src="./rabto-fx-engine.js"></script>\n</body>');
if (!html.includes('bg-enhancer.js')) html = html.replace('</body>', '<script src="./bg-enhancer.js"></script>\n</body>');
if (!html.includes('skills-section.js')) html = html.replace('</body>', '<script src="./skills-section.js"></script>\n</body>');
if (!html.includes('global-logic-replacer.js')) html = html.replace('</body>', '<script src="./global-logic-replacer.js"></script>\n</body>');
if (!html.includes('company-details.js')) html = html.replace('</body>', '<script src="./company-details.js"></script>\n</body>');
if (!html.includes('three-bg.js')) html = html.replace('</body>', '<script src="./three-bg.js"></script>\n</body>');
if (!html.includes('image-trail-section.js')) html = html.replace('</body>', '<script src="./image-trail-section.js"></script>\n</body>');
if (!html.includes('custom-cursor.js')) html = html.replace('</body>', '<script src="./custom-cursor.js"></script>\n</body>');
if (!html.includes('brand-logos-marquee.js')) html = html.replace('</body>', '<script src="./brand-logos-marquee.js"></script>\n</body>');

const scrollSpyScript = `
<script id="glb-scroll-spy-navbar">
(function() {
  const sections = [
    { id: '#hero', name: 'Home' },
    { id: '#about-me', name: 'About' },
    { id: '#projects', name: 'Our Clients' },
    { id: '#glm-instagram-feed-section', name: 'About' },
    { id: '#process', name: 'Services' },
    { id: '#services', name: 'Services' },
    { id: '#why-choose-us', name: 'Services' },
    { id: '#our-team', name: 'About' },
    { id: '#faq', name: 'Services' },
    { id: '#glb-reviews-section', name: 'About' },
    { id: '.glb-home-blogs-section-wrapper', name: 'Blog' },
    { id: '#glb-location', name: 'Contact us' },
    { id: '#glb-skills-section', name: 'Contact us' }
  ];

  let cachedLinks = [];
  function cacheLinks() {
    const links = document.querySelectorAll('a');
    cachedLinks = Array.from(links).map(a => {
      const p = a.querySelector('p') || a;
      const text = p.textContent.trim().toLowerCase();
      const isFooter = a.closest('footer') || a.closest('.glb-footer') || a.closest('[data-framer-name*="footer"]') || a.closest('[class*="footer"]');
      
      const isHome = text === 'home';
      const isAbout = text === 'about' || text === 'about us';
      const isClients = text === 'our clients' || text === 'clients';
      const isServices = text === 'services' || text === 'service';
      const isBlog = text === 'blog';
      const isContact = text === 'contact us' || text === 'contact';
      
      return {
        element: a,
        isFooter: !!isFooter,
        isHome,
        isAbout,
        isClients,
        isServices,
        isBlog,
        isContact
      };
    }).filter(item => !item.isFooter);
  }

  let ticking = false;
  function updateActiveNav() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        performUpdate();
        ticking = false;
      });
      ticking = true;
    }
  }

  function performUpdate() {
    if (cachedLinks.length === 0) cacheLinks();
    
    const scrollY = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    
    let activeSectionName = 'Home';

    if (scrollY + viewportHeight >= docHeight - 120) {
      activeSectionName = 'Contact us';
    } else {
      let maxVisibleHeight = 0;
      
      sections.forEach(section => {
        let el = document.querySelector(section.id);
        if (!el) {
          const cleanId = section.id.replace(/[#.]/g, '');
          el = document.querySelector('[data-framer-name="' + cleanId + '"]');
        }
        if (el) {
          const rect = el.getBoundingClientRect();
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(viewportHeight, rect.bottom);
          const visibleHeight = visibleBottom - visibleTop;
          
          if (visibleHeight > 0 && visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            activeSectionName = section.name;
          }
        }
      });
    }

    cachedLinks.forEach(item => {
      let isMatch = false;
      if (activeSectionName === 'Home' && item.isHome) isMatch = true;
      if (activeSectionName === 'About' && item.isAbout) isMatch = true;
      if (activeSectionName === 'Our Clients' && item.isClients) isMatch = true;
      if (activeSectionName === 'Services' && item.isServices) isMatch = true;
      if (activeSectionName === 'Blog' && item.isBlog) isMatch = true;
      if (activeSectionName === 'Contact us' && item.isContact) isMatch = true;

      if (isMatch) {
        item.element.classList.add('glb-nav-active');
      } else {
        item.element.classList.remove('glb-nav-active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('resize', () => {
    cacheLinks();
    updateActiveNav();
  }, { passive: true });

  const observer = new MutationObserver(() => {
    cacheLinks();
    updateActiveNav();
  });
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Initial run
  setTimeout(() => {
    cacheLinks();
    performUpdate();
  }, 100);
})();
</script>
`;
if (html.includes('glb-scroll-spy-navbar')) {
    html = html.replace(/<script id="glb-scroll-spy-navbar">[\s\S]*?<\/script>/gi, scrollSpyScript);
} else {
    html = html.replace('</body>', scrollSpyScript + '\n</body>');
}

// Inject Tailwind CSS safely without Preflight reset to prevent breaking Framer styles
if (!html.includes('tailwindcss')) {
    const tailwindScript = `
<script>
  window.tailwind = {
    corePlugins: {
      preflight: false,
    }
  }
</script>
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://unpkg.com/lucide@latest"></script>
`;
    html = html.replace('</head>', tailwindScript + '\n</head>');
}

// Cache-busting version overrides to bypass browser cache for all custom scripts
const cacheBuster = Date.now();
html = html.replace(/src="\.\/([a-zA-Z0-9_-]+\.js)(\?v=[^"]*)?"/g, `src="./$1?v=${cacheBuster}"`);

fs.writeFileSync('index.html', html);
console.log('Appended firebase-init and native sections to index.html');

// Patch other HTML files (blog, instagram, 404) to include the service worker killer block
const otherHtmls = ['blog.html', 'instagram.html', '404.html'];
const swKiller = `
<!-- Cache Control Meta Tags to Prevent Stale/Old Commit Flashes -->
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
<script id="kill-service-workers">
  // Force document title to brand name and protect from Framer runtime overrides
  let brandTitle = "Global Logic Media";
  const titleObserver = new MutationObserver(function() {
    if (document.title !== brandTitle) {
      document.title = brandTitle;
    }
  });

  function initTitleLock() {
    const titleEl = document.querySelector('title');
    if (titleEl) {
      brandTitle = titleEl.textContent;
      document.title = brandTitle;
      titleObserver.observe(titleEl, { characterData: true, childList: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTitleLock);
  } else {
    initTitleLock();
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for (let registration of registrations) {
        registration.unregister().then(function() {
          console.log('Stale service worker unregistered!');
          window.location.reload(true);
        });
      }
    });
  }
  if ('caches' in window) {
    caches.keys().then(function(names) {
      for (let name of names) {
        caches.delete(name);
      }
    });
  }
</script>
`;

otherHtmls.forEach(fileName => {
  if (fs.existsSync(fileName)) {
    let fHtml = fs.readFileSync(fileName, 'utf8');
    let updated = false;
    if (fHtml.includes('kill-service-workers')) {
      const scriptMatch = swKiller.match(/<script id="kill-service-workers">[\s\S]*?<\/script>/gi);
      if (scriptMatch) {
        fHtml = fHtml.replace(/<script id="kill-service-workers">[\s\S]*?<\/script>/gi, scriptMatch[0]);
        updated = true;
      }
    } else {
      fHtml = fHtml.replace('<head>', '<head>\n' + swKiller);
      updated = true;
    }
    const origViewport = fHtml;
    fHtml = fHtml.replace(/<meta[^>]*name=["']viewport["'][^>]*>/gi, '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">');
    if (fHtml !== origViewport || updated) {
      fs.writeFileSync(fileName, fHtml);
      console.log('Updated service worker and viewport meta tag in ' + fileName);
    }
  }
});

require('./patch-webflow-expandable-cards.js');
require('./patch-three-cards-logo.js');
require('./patch-section-images.js');
require('./patch-metadata.js');

