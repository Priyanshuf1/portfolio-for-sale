(function() {
  // Rabto Skill Engine: creative-web-art-direction & background-aware-contrast-compositing
  // OVERRIDE Framer black background with Rich Slate Obsidian & Aurora Teal Theme
  
  const styles = `
    /* CSS Token Overrides for Framer */
    :root {
      --token-f50a08ee-89ba-45ba-bd59-521f4e9cdc51: #0A111E !important;
      --token-0c62d1bb-1ac3-4cd6-8f0f-8ee3950e02c0: #0F172A !important;
      --token-67527bae-cc15-4839-8636-c9b28351e4d7: #1E293B !important;
    }

    /* Global Body & HTML Slate Obsidian Background */
    html, body, html body {
      background-color: #0A111E !important;
      background-image: 
        radial-gradient(at 15% 10%, rgba(6, 182, 212, 0.35) 0px, transparent 50%),
        radial-gradient(at 85% 15%, rgba(79, 70, 229, 0.35) 0px, transparent 50%),
        radial-gradient(at 50% 50%, rgba(212, 175, 55, 0.18) 0px, transparent 55%),
        radial-gradient(at 85% 85%, rgba(139, 92, 246, 0.25) 0px, transparent 50%),
        radial-gradient(at 15% 85%, rgba(16, 185, 129, 0.2) 0px, transparent 50%) !important;
      background-attachment: fixed !important;
      background-size: cover !important;
      color: #ffffff !important;
    }

    /* Force ALL Framer hero, root, and section elements to transparent background */
    [data-framer-root],
    #main,
    .framer-DvMIA,
    .framer-1iwpgy7,
    #hero,
    #services,
    #about,
    #contact,
    section[class*="framer-"],
    div[class*="framer-"],
    [data-framer-name="Hero"],
    [data-framer-name="hero"],
    [data-framer-name="Services"],
    [data-framer-name="Skills"],
    [data-framer-name="Process"],
    [data-framer-name="Work"] {
      background-color: transparent !important;
      background: transparent !important;
    }

    /* Slate Glassmorphic Cards & Containers */
    .framer-1l7inir,
    .glb-review-card-premium, 
    .glb-home-blog-card, 
    .glb-contact-card,
    .glb-skill-card {
      background: rgba(15, 23, 42, 0.8) !important;
      backdrop-filter: blur(16px) !important;
      -webkit-backdrop-filter: blur(16px) !important;
      border: 1px solid rgba(255, 255, 255, 0.12) !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4) !important;
    }

    /* Native Sections Slate Surfaces */
    .glb-reviews-native-wrapper, 
    .glb-home-blogs, 
    .glb-location-section, 
    .glb-skills-section,
    .glb-footer {
      background: rgba(11, 19, 34, 0.8) !important;
      backdrop-filter: blur(20px) !important;
      -webkit-backdrop-filter: blur(20px) !important;
      border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
    }

    /* Floating Ambient Aurora Lighting Orbs */
    .rabto-ambient-orb-1 {
      position: fixed;
      top: 8%;
      left: -6%;
      width: 550px;
      height: 550px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%);
      filter: blur(90px);
      pointer-events: none;
      z-index: 0;
      animation: floatOrb1 16s ease-in-out infinite alternate;
    }

    .rabto-ambient-orb-2 {
      position: fixed;
      bottom: 12%;
      right: -6%;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(79, 70, 229, 0.3) 0%, transparent 70%);
      filter: blur(100px);
      pointer-events: none;
      z-index: 0;
      animation: floatOrb2 20s ease-in-out infinite alternate;
    }

    @keyframes floatOrb1 {
      0% { transform: translate(0, 0) scale(1); }
      100% { transform: translate(100px, 80px) scale(1.2); }
    }

    @keyframes floatOrb2 {
      0% { transform: translate(0, 0) scale(1); }
      100% { transform: translate(-90px, -90px) scale(1.15); }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);

  function applyColorOverride() {
    // Strip inline background-color from Framer hero and section nodes
    document.querySelectorAll('section, div, header, #hero').forEach(el => {
      const name = el.getAttribute('data-framer-name') || el.id || el.className;
      if (name && (typeof name === 'string') && (name.includes('Hero') || name.includes('hero') || name.includes('Services') || name.includes('Skills') || name.includes('Process') || name.includes('1iwpgy7'))) {
        el.style.backgroundColor = 'transparent';
        el.style.background = 'transparent';
      }
    });

    if (!document.querySelector('.rabto-ambient-orb-1')) {
      const orb1 = document.createElement('div');
      orb1.className = 'rabto-ambient-orb-1';
      document.body.appendChild(orb1);

      const orb2 = document.createElement('div');
      orb2.className = 'rabto-ambient-orb-2';
      document.body.appendChild(orb2);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(applyColorOverride, 200));
  } else {
    setTimeout(applyColorOverride, 200);
  }

  setInterval(applyColorOverride, 1000);
})();
