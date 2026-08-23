(function() {
  // Rabto Skill Engine: Pure Restored Site Layout + Gold Swapped to Brand Red (#e20001)
  
  const styles = `
    :root {
      --token-f50a08ee-89ba-45ba-bd59-521f4e9cdc51: transparent !important;
      --token-0c62d1bb-1ac3-4cd6-8f0f-8ee3950e02c0: transparent !important;
      --token-67527bae-cc15-4839-8636-c9b28351e4d7: transparent !important;
      --gold: #e20001 !important;
    }

    html, body, html body, #main, [data-framer-root] {
      background-color: #ffffff !important;
      background: #ffffff !important;
      background-image: 
        radial-gradient(at 15% 10%, rgba(226, 0, 1, 0.05) 0px, transparent 50%),
        radial-gradient(at 85% 15%, rgba(0, 0, 0, 0.03) 0px, transparent 50%),
        radial-gradient(at 50% 50%, rgba(226, 0, 1, 0.03) 0px, transparent 55%),
        radial-gradient(at 85% 85%, rgba(0, 0, 0, 0.02) 0px, transparent 50%),
        radial-gradient(at 15% 85%, rgba(226, 0, 1, 0.02) 0px, transparent 50%) !important;
      background-attachment: fixed !important;
      background-size: cover !important;
      color: #1f2937 !important;
    }

    /* Force all Framer layout containers and page wrappers to be transparent */
    [data-framer-root],
    #main,
    .framer-DvMIA,
    .framer-1iwpgy7,
    #hero, #services, #about, #contact,
    section[class*="framer-"],
    section[id],
    div[data-framer-name="hero"],
    div[data-framer-name="about me section"],
    div[data-framer-name="process"],
    div[data-framer-name="Services"],
    div[data-framer-name="FAQ's"],
    .framer-OLpjL,
    .framer-povseb,
    div[class*="framer-OLpjL"],
    div[class*="framer-povseb"],
    [data-framer-root] > div,
    [data-framer-root] > div > div,
    [data-framer-root] > div > div > div {
      background-color: transparent !important;
      background: transparent !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }

    /* Remove section top borders that create visible breaks */
    .glb-reviews-native-wrapper, 
    .glb-home-blogs, 
    .glb-location-section, 
    .glb-skills-section {
      border-top: none !important;
    }

    /* Hide Framer's built-in dark hero background canvas/overlays */
    [data-framer-name="bg animation"],
    .framer-w3gto7,
    .framer-17jcdvw {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
    }

    /* High-Specificity Light Mode Contrast Overrides */
    html body [class*="framer-text"],
    html body [class*="framer-text"] *,
    html body [class*="framer-styles-preset"],
    html body [class*="framer-styles-preset"] *,
    html body [data-framer-component-type="RichTextContainer"],
    html body [data-framer-component-type="RichTextContainer"] *,
    html body div[class*="framer-"] h1,
    html body div[class*="framer-"] h2,
    html body div[class*="framer-"] h3,
    html body div[class*="framer-"] p,
    html body div[class*="framer-"] span,
    html body div[class*="framer-"] a {
      color: #1f2937 !important;
      --framer-text-color: #1f2937 !important;
    }

    /* Gradient Override for Section and Hero Headings and their span elements (Red Brand Theme) */
    html body [data-framer-name="about me section"] h2,
    html body .framer-12f38e1 h2,
    html body [data-framer-name="about me section"] h2 span,
    html body .framer-12f38e1 h2 span,
    html body [data-framer-name="hero"] h1,
    html body .framer-1wqlnff h1,
    html body [data-framer-name="hero"] h1 span,
    html body .framer-1wqlnff h1 span {
      background: linear-gradient(135deg, #111827 30%, #e20001 100%) !important;
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      color: transparent !important;
    }

    /* Contact Card Text visibility */
    .glb-contact-card-info,
    .glb-contact-card-info *,
    .glb-contact-card-info p,
    .glb-contact-card-info a,
    .glb-contact-card-info h4 {
      color: #1f2937 !important;
    }

    /* Clean typography colors for Light Mode */
    h1, h2, h3, h4, h5, h6,
    [class*="framer-text"] h1, [class*="framer-text"] h2, [class*="framer-text"] h3,
    [class*="framer-text"] h4, [class*="framer-text"] h5, [class*="framer-text"] h6 {
      color: #111827 !important;
    }

    p, span, li, a, div[class*="framer-text"] {
      color: #374151 !important;
    }

    /* Experience Card elements */
    .framer-t9Edp, .framer-t9Edp * {
      background-color: rgba(0, 0, 0, 0.02) !important;
      color: #1f2937 !important;
      border: 1px solid rgba(0, 0, 0, 0.08) !important;
      box-shadow: 0 4px 12px rgba(0,0,0,0.02) !important;
    }

    /* Skills badges */
    .framer-NIbMY, .framer-NIbMY * {
      background-color: rgba(0, 0, 0, 0.03) !important;
      color: #1f2937 !important;
      border-color: rgba(0, 0, 0, 0.08) !important;
    }

    /* Specific parent divs from scan */
    .framer-1wqlnff *, .framer-14oc2jn *, .framer-9i4k4l *, .framer-q0n70g *,
    .framer-12f38e1 *, .framer-1ufo3s8 *, .framer-hfiucj *, .framer-18ouoo9 *,
    .framer-1lqu27a *, .framer-i2bbrs *, .framer-1bmy43f *, .framer-1ggx9rq *,
    .framer-13j9i9w *, .framer-599w1w *, .framer-1wkuc8z *, .framer-186mym2 *,
    .framer-jai2ez *, .framer-1k87pfs *, .framer-1xqc7v3 *, .framer-ioy98r *,
    .framer-1gcvau6 *, .framer-2mglhp *, .framer-56eq0g *, .framer-nata4o *,
    .framer-1avq0zg *, .framer-13o5xv2 *, .framer-14wvrix *, .framer-1lpulcd *,
    .framer-11zxh82 *, .framer-177xte9 *, .framer-8lbnjo *, .framer-t5ezea *,
    .framer-1u4e5h0 * {
      color: #1f2937 !important;
    }

    /* Header Logo visibility */
    [data-framer-name="Logo"] img, 
    .framer-1lcme9 img,
    img[src*="6tgxXoNxl1P8llnNFQNUsphYFbU.svg"] {
      filter: invert(1) brightness(0.1) !important;
    }

    /* Header Navigation Contrast & Light Theme Backdrop */
    :root, [data-framer-root], html, body {
      --token-cc7c73b0-b7c0-47c8-8487-b084b19b7755: rgba(255, 255, 255, 0.85) !important;
    }
    header,
    [class*="framer-QWF25"] {
      background-color: rgba(255, 255, 255, 0.85) !important;
      background: rgba(255, 255, 255, 0.85) !important;
      backdrop-filter: blur(12px) !important;
      -webkit-backdrop-filter: blur(12px) !important;
      border-bottom: 1px solid rgba(226, 0, 1, 0.08) !important;
      transition: background-color 0.3s ease !important;
    }

    .framer-466h6r p, .framer-466h6r span, .framer-466h6r a,
    .framer-h0ping p, .framer-h0ping span, .framer-h0ping a {
      color: #111827 !important;
    }

    /* Active / CTA Services button in Header (Polished Brand Red) */
    html body a.framer-1yuh7ai[href*="services"],
    html body a.framer-1yuh7ai[href*="Services"],
    html body a.framer-1yuh7ai[style*="background"] {
      background-color: #e20001 !important;
      background: #e20001 !important;
      border-radius: 20px !important;
      border: 1px solid rgba(226, 0, 1, 0.3) !important;
      box-shadow: 0 4px 10px rgba(226, 0, 1, 0.2) !important;
      transition: all 0.25s ease-out !important;
      color: #ffffff !important;
    }
    html body a.framer-1yuh7ai[href*="services"]:hover,
    html body a.framer-1yuh7ai[href*="Services"]:hover,
    html body a.framer-1yuh7ai[style*="background"]:hover {
      background-color: #ff1a1a !important;
      background: #ff1a1a !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 6px 14px rgba(226, 0, 1, 0.3) !important;
    }
    html body a.framer-1yuh7ai[href*="services"] *,
    html body a.framer-1yuh7ai[href*="Services"] *,
    html body a.framer-1yuh7ai[style*="background"] * {
      color: #ffffff !important;
    }

    /* Reviews, blogs, and other details */
    .glb-review-meta h4, .glb-review-meta p,
    .glb-home-blog-content h3, .glb-home-blog-content p,
    .glb-contact-card-info p, .glb-contact-card-info a, .glb-contact-card-info h4 {
      color: #1f2937 !important;
    }

    /* Exclude custom components and modals from being forced to dark text theme */
    .story-inner img,
    .story-ring,
    .story-inner,
    .instagram-btn,
    .glb-floating-btn-book,
    #glbTriggerBook,
    .glb-why-us-badge,
    .glb-team-badge,
    .glm-insta-section *,
    .glass-card *,
    #post-modal *,
    .glb-modal-overlay *,
    .glb-modal-content *,
    .glb-modal-overlay-book *,
    .glb-modal-content-book *,
    .glb-modal-overlay-review *,
    .glb-modal-content-review *,
    .glb-admin-overlay *,
    .glb-admin-content * {
      color: inherit !important;
    }

    /* ── Card Wireframe Accent Outlines for Premium Light UI ── */
    .glb-review-card-premium, 
    .glb-home-blog-card, 
    .glb-contact-card,
    .glb-skill-card,
    .glb-map-container-box,
    .glb-map-tilt-wrapper,
    .framer-6o1HC,
    div[data-framer-name="Open"],
    div[data-framer-name="Closed"],
    div[data-framer-name="All FAQs"],
    .framer-1wjnscd-container,
    .framer-1sk946w-container,
    .framer-h63dtg-container,
    .framer-tb0yeu-container,
    .framer-1l7inir,
    .framer-unn2aa,
    .framer-NIbMY {
      background: #ffffff !important;
      background-color: #ffffff !important;
      border: 1px solid rgba(226, 0, 1, 0.15) !important;
      border-radius: 16px !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03) !important;
      transition: all 0.3s ease !important;
    }
    .glb-review-card-premium:hover, 
    .glb-home-blog-card:hover, 
    .glb-contact-card:hover,
    .glb-skill-card:hover,
    .glb-map-container-box:hover,
    .glb-map-tilt-wrapper:hover,
    .framer-6o1HC:hover {
      background: rgba(226, 0, 1, 0.04) !important;
      border-color: rgba(226, 0, 1, 0.4) !important;
      box-shadow: 0 8px 24px rgba(226, 0, 1, 0.08) !important;
      transform: translateY(-2px);
    }

    /* ── Unified Logo-Themed Button Design System ── */

    /* 1. Primary CTA Buttons (Solid Brand Red, White Text, Red Glow) */
    html body .framer-caRRT,
    html body a[href*="book"], 
    html body a[href*="call"],
    html body .glb-floating-btn-book,
    html body .glb-floating-btn-review,
    html body .glb-modal-book-btn,
    html body .glb-modal-review-btn,
    html body .glb-password-submit,
    html body .glb-admin-submit {
      background: #e20001 !important;
      background-color: #e20001 !important;
      color: #ffffff !important;
      border: 1px solid rgba(226, 0, 1, 0.4) !important;
      border-radius: 24px !important;
      box-shadow: 0 4px 14px rgba(226, 0, 1, 0.3) !important;
      transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1) !important;
      cursor: pointer !important;
      pointer-events: auto !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
    }

    html body .framer-caRRT *,
    html body a[href*="book"] *,
    html body a[href*="call"] *,
    html body .glb-floating-btn-book *,
    html body .glb-floating-btn-review *,
    html body .glb-modal-book-btn *,
    html body .glb-modal-review-btn *,
    html body .glb-password-submit *,
    html body .glb-admin-submit * {
      color: #ffffff !important;
      stroke: #ffffff !important;
      fill: transparent !important;
    }

    html body .framer-caRRT:hover,
    html body a[href*="book"]:hover,
    html body a[href*="call"]:hover,
    html body .glb-floating-btn-book:hover,
    html body .glb-floating-btn-review:hover,
    html body .glb-modal-book-btn:hover,
    html body .glb-modal-review-btn:hover,
    html body .glb-password-submit:hover,
    html body .glb-admin-submit:hover {
      background: #c10001 !important;
      background-color: #c10001 !important;
      transform: translateY(-3px) scale(1.02) !important;
      box-shadow: 0 6px 20px rgba(226, 0, 1, 0.5) !important;
    }

    /* 2. Secondary CTA Buttons (Dark Slate, White Text, Turns Red on Hover) */
    html body a[href*="project"],
    html body a[href*="services"],
    html body .glb-floating-btn,
    html body .glass-card.px-6.py-3,
    html body .glb-home-blogs-btn {
      background: #1f2937 !important;
      background-color: #1f2937 !important;
      color: #ffffff !important;
      border: 1px solid rgba(31, 41, 55, 0.4) !important;
      border-radius: 24px !important;
      box-shadow: 0 4px 12px rgba(31, 41, 55, 0.15) !important;
      transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1) !important;
      cursor: pointer !important;
      pointer-events: auto !important;
      display: inline-flex !important;
    }

    /* RESTORE SOLID FOOTER SECTION WITH BRAND RED TOP BORDER */
    .glb-footer,
    footer,
    [data-framer-name="Footer"] {
      background-color: #ffffff !important;
      background: #ffffff !important;
      border-top: 1px solid rgba(226, 0, 1, 0.15) !important;
      position: relative !important;
      z-index: 100 !important;
      opacity: 1 !important;
    }

    #monochrome-spotlight {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: -2;
      background: radial-gradient(circle 350px at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(226, 0, 1, 0.055), transparent 80%);
      transition: background 0.05s ease;
    }

    /* Hide redundant Book a Free Call CTA buttons */
    [data-framer-name="process"] [data-framer-name="buttons"],
    [data-framer-name="FAQ's"] .framer-4y99x1-container,
    [data-framer-name="faq"] .framer-4y99x1-container {
      display: none !important;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);

  // Dynamic watcher to remove filter from cloud background
  function resetHeroCloudFilter() {
    const hero = document.querySelector('[data-framer-name="Hero"]') || document.querySelector('[data-framer-name="hero"]') || document.querySelector('#hero');
    if (!hero) return;
    const bgWrappers = hero.querySelectorAll('[data-framer-background-image-wrapper], .framer-1uy17lu');
    bgWrappers.forEach(el => {
      el.style.filter = 'none';
    });
  }

  // Inject spotlight DOM element
  function initMonochromeSpotlight() {
    if (document.getElementById('monochrome-spotlight')) return;
    const spotlight = document.createElement('div');
    spotlight.id = 'monochrome-spotlight';
    document.body.appendChild(spotlight);

    window.addEventListener('mousemove', (e) => {
      spotlight.style.setProperty('--mouse-x', `${e.clientX}px`);
      spotlight.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
  }

  // Intercept all "Book a Call" buttons to trigger the local modal
  function patchBookACallLinks() {
    const elements = document.querySelectorAll('a, button');
    elements.forEach(el => {
      const text = (el.textContent || '').trim().toLowerCase();
      if (text.includes('book') && text.includes('call')) {
        if (!el.dataset.patchedGlbCall) {
          el.dataset.patchedGlbCall = 'true';
          el.setAttribute('href', 'javascript:void(0)');
          el.removeAttribute('target');
          el.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (typeof window.openBookACallModal === 'function') {
              window.openBookACallModal();
            }
          });
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      resetHeroCloudFilter();
      initMonochromeSpotlight();
      patchBookACallLinks();
    });
  } else {
    resetHeroCloudFilter();
    initMonochromeSpotlight();
    patchBookACallLinks();
  }
  setInterval(() => {
    resetHeroCloudFilter();
    patchBookACallLinks();
  }, 500);
})();
