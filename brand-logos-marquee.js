/**
 * brand-logos-marquee.js
 * Replaces the Framer company logos strip with a CSS-animated marquee.
 * Wordmarks are styled in a premium dark silver grayscale mix-blend mode.
 * Replaces About section image with a high-end vector 3D Tilt Parallax Logo Card.
 */
(function() {

  // ── 1. INJECT STYLES ──────────────────────────────────────────────────
  const style = document.createElement('style');
  style.innerHTML = `
    /* Hide original Framer logos container */
    .framer-ikqh5l-container {
      display: none !important;
      height: 0 !important;
      overflow: hidden !important;
    }

    /* GLM Brand Marquee Strip */
    #glm-brand-marquee-wrap {
      width: 100%;
      overflow: hidden;
      padding: 20px 0;
      position: relative;
      z-index: 2;
      background: transparent;
      border-top: 1px solid rgba(0, 0, 0, 0.03);
      border-bottom: 1px solid rgba(0, 0, 0, 0.03);
      margin-top: 20px;
    }
    #glm-brand-marquee-wrap::before,
    #glm-brand-marquee-wrap::after {
      content: '';
      position: absolute;
      top: 0; bottom: 0;
      width: 120px;
      z-index: 3;
      pointer-events: none;
    }
    #glm-brand-marquee-wrap::before { left: 0; background: linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0)); }
    #glm-brand-marquee-wrap::after  { right: 0; background: linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0)); }

    .glm-brand-marquee-track {
      display: flex;
      align-items: center;
      gap: 75px;
      width: max-content;
      animation: glmMarqueeScroll 28s linear infinite;
    }
    .glm-brand-marquee-track:hover { animation-play-state: paused; }

    @keyframes glmMarqueeScroll {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }

    .glm-brand-logo-item {
      flex-shrink: 0;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .glm-brand-logo-item:hover {
      transform: scale(1.08);
    }
    
    /* Premium Dark silver monochrome color treatment for moving logos */
    .glm-brand-logo-item img {
      height: 34px;
      width: auto;
      max-width: 130px;
      object-fit: contain;
      display: block;
      mix-blend-mode: multiply;
      filter: contrast(0.85) brightness(0.6) grayscale(1) opacity(0.7) !important;
      transition: filter 0.3s ease, opacity 0.3s ease;
    }
    .glm-brand-logo-item:hover img {
      filter: grayscale(0) brightness(1) contrast(1) opacity(1) !important;
    }

    /* Disable grayscale filter in About section to let the logo show in true colors */
    [data-framer-name="about me section"] .framer-vbrsas,
    [data-framer-name="about me section"] .framer-eDUaF,
    .glm-about-logo-container,
    .glm-about-logo-container * {
      filter: none !important;
      -webkit-filter: none !important;
    }

    /* Ring Rotation in About Section */
    @keyframes glmRingRotate {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    .glm-rotating-ring-element {
      animation: glmRingRotate 22s linear infinite !important;
    }
  `;
  document.head.appendChild(style);

  // ── 2. BRAND DATA ──────────────────────────────────────────────────────────
  const brands = [
    { src: './brand_b_luxury.jpeg',       alt: 'B Luxury Salon'        },
    { src: './brand_book_digital.jpeg',   alt: 'Book Your Digital Story' },
    { src: './brand_cs_ec.jpeg',          alt: 'CS EC'                 },
    { src: './brand_krazy_cakes.jpeg',    alt: 'Krazy 4 Cakes'         },
    { src: './brand_kurti_kahaanii.jpeg', alt: 'Kurti Kahaanii'        },
    { src: './brand_om_group.jpeg',       alt: 'OM Group Builders'     },
    { src: './brand_tabs19.jpeg',         alt: 'Tabs 19 Studio'        },
    { src: './brand_b_luxury2.jpeg',      alt: 'B Luxury Salon 2'      }
  ];

  // ── 3. BUILD MARQUEE ──────────────────────────────────────────────────────
  function buildItems(list) {
    return list.map(b => '<div class="glm-brand-logo-item"><img src="' + b.src + '" alt="' + b.alt + '" loading="lazy"></div>').join('');
  }

  function injectMarquee() {
    if (document.getElementById('glm-brand-marquee-wrap')) return;

    const heroSection = document.querySelector('[data-framer-name="hero"]') || document.querySelector('#hero');
    if (!heroSection) return;

    const wrap = document.createElement('div');
    wrap.id = 'glm-brand-marquee-wrap';

    const track = document.createElement('div');
    track.className = 'glm-brand-marquee-track';
    track.innerHTML = buildItems(brands) + buildItems(brands); // doubled for seamless loop
    wrap.appendChild(track);

    if (heroSection.nextSibling) {
      heroSection.parentNode.insertBefore(wrap, heroSection.nextSibling);
    } else {
      heroSection.parentNode.appendChild(wrap);
    }

    // Hide original Framer container
    const framerContainer = document.querySelector('.framer-ikqh5l-container');
    if (framerContainer) framerContainer.style.setProperty('display', 'none', 'important');
  }

  // ── 4. REPLACE ABOUT LOGO WITH 3D TILT CARD ────────────────────────────────
  function replaceAboutLogoWith3DTiltCard() {
    const aboutSection = document.querySelector('[data-framer-name="about me section"]') || document.getElementById('about-me');
    if (!aboutSection) return;

    // Check if already patched to prevent infinite re-render loop
    if (aboutSection.querySelector('.glm-about-logo-container')) return;

    const targetImg = aboutSection.querySelector('img[src*="logo.png"]');
    if (!targetImg) return;

    const container = targetImg.parentElement;
    if (!container) return;

    const svgHTML = `
      <div class="glm-about-logo-container" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; min-height: 250px; background: transparent; padding: 20px; box-sizing: border-box; position: relative; perspective: 1000px;">
        <div class="glm-about-3d-wrapper" style="position: relative; width: 230px; height: 230px; display: flex; justify-content: center; align-items: center; transition: transform 0.15s ease-out; transform-style: preserve-3d; cursor: pointer;">
          <!-- Rotating Yellow Ring SVG (3D depth: translateZ(-20px)) -->
          <svg viewBox="0 0 100 100" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; pointer-events: none; z-index: 1; transform: translateZ(-20px);">
            <circle cx="50" cy="50" r="47" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="8 6" class="glm-rotating-ring-element" style="transform-origin: center; stroke: #fbbf24 !important; fill: none !important;"></circle>
          </svg>
          <!-- GLM Vector Logo (3D depth: translateZ(25px)) -->
          <svg viewBox="0 0 340 120" style="width: 85%; height: 85%; z-index: 2; overflow: visible; transform: translateZ(25px); filter: drop-shadow(0 15px 25px rgba(0,0,0,0.06));">
            <g>
              <!-- Red logo triangle outline -->
              <path d="M 90 30 L 15 10 L 15 110 L 90 90 Z" fill="none" stroke="#e20001" stroke-width="12" stroke-linejoin="miter" stroke-linecap="butt" style="stroke: #e20001 !important; fill: none !important;"></path>
              <!-- Red play symbol -->
              <polygon points="40,40 75,60 40,80" fill="#e20001" style="fill: #e20001 !important;"></polygon>
            </g>
            <!-- Logo Text: Black -->
            <g fill="#111827" font-family="Inter, sans-serif" font-weight="900" font-size="34" letter-spacing="-0.5" style="fill: #111827 !important;">
              <text x="110" y="42" style="fill: #111827 !important;">GLOBAL</text>
              <text x="110" y="76" style="fill: #111827 !important;">LOGIC</text>
              <text x="110" y="110" style="fill: #111827 !important;">MEDIA</text>
            </g>
          </svg>
        </div>
      </div>
    `;

    container.innerHTML = svgHTML;

    // Attach 3D tilt interactions
    const box = container.querySelector('.glm-about-logo-container');
    const wrapper = container.querySelector('.glm-about-3d-wrapper');
    if (!box || !wrapper) return;

    box.addEventListener('mousemove', function(e) {
      const rect = box.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt degrees (max 22 degrees)
      const tiltX = ((centerY - y) / centerY) * 22;
      const tiltY = ((x - centerX) / centerX) * 22;

      wrapper.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    box.addEventListener('mouseleave', function() {
      wrapper.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  }

  // ── 5. RUN ────────────────────────────────────────────────────────────────
  function run() { 
    injectMarquee(); 
    replaceAboutLogoWith3DTiltCard(); 
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
  
  // Single-run safety checker
  setInterval(run, 1000);

})();
