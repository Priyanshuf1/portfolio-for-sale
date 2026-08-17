(function() {
  // Rabto Skill Engine: creative-web-art-direction & background-aware-contrast-compositing
  // FORCE OVERRIDE all Framer black backgrounds to reveal vibrant Deep Cyber Violet / Indigo Theme
  
  const styles = `
    /* CSS Token Override for Framer */
    :root {
      --token-f50a08ee-89ba-45ba-bd59-521f4e9cdc51: #0e0a1f !important;
      --token-0c62d1bb-1ac3-4cd6-8f0f-8ee3950e02c0: #130f28 !important;
      --token-67527bae-cc15-4839-8636-c9b28351e4d7: #1a1435 !important;
    }

    /* Global Body & HTML New Color Background */
    html, body {
      background-color: #0d091a !important;
      background-image: 
        radial-gradient(at 15% 10%, rgba(124, 58, 237, 0.35) 0px, transparent 50%),
        radial-gradient(at 85% 20%, rgba(79, 70, 229, 0.3) 0px, transparent 50%),
        radial-gradient(at 50% 50%, rgba(6, 182, 212, 0.2) 0px, transparent 55%),
        radial-gradient(at 80% 80%, rgba(147, 51, 234, 0.25) 0px, transparent 50%),
        radial-gradient(at 20% 85%, rgba(16, 185, 129, 0.18) 0px, transparent 50%) !important;
      background-attachment: fixed !important;
      background-size: cover !important;
      color: #ffffff !important;
    }

    /* Force Framer root and section wrappers to transparent background so body background shows */
    [data-framer-root],
    #main,
    .framer-DvMIA,
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

    /* Keep individual card elements with dark translucent glassmorphism */
    .framer-1l7inir,
    .glb-review-card-premium, 
    .glb-home-blog-card, 
    .glb-contact-card,
    .glb-skill-card {
      background: rgba(22, 17, 42, 0.75) !important;
      backdrop-filter: blur(16px) !important;
      -webkit-backdrop-filter: blur(16px) !important;
      border: 1px solid rgba(139, 92, 246, 0.2) !important;
    }

    /* Update Native Section wrappers to translucent glass surfaces */
    .glb-reviews-native-wrapper, 
    .glb-home-blogs, 
    .glb-location-section, 
    .glb-skills-section,
    .glb-footer {
      background: rgba(13, 9, 26, 0.75) !important;
      backdrop-filter: blur(20px) !important;
      -webkit-backdrop-filter: blur(20px) !important;
      border-top: 1px solid rgba(139, 92, 246, 0.2) !important;
    }

    /* Animated Ambient Lighting Orbs */
    .rabto-ambient-orb-1 {
      position: fixed;
      top: 10%;
      left: -5%;
      width: 550px;
      height: 550px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, transparent 70%);
      filter: blur(90px);
      pointer-events: none;
      z-index: 0;
      animation: floatOrb1 16s ease-in-out infinite alternate;
    }

    .rabto-ambient-orb-2 {
      position: fixed;
      bottom: 15%;
      right: -5%;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%);
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
    // Force inline background-color overrides on Framer sections
    document.querySelectorAll('section, div[data-framer-name]').forEach(el => {
      const name = el.getAttribute('data-framer-name');
      if (name && (name.includes('Hero') || name.includes('Services') || name.includes('Skills') || name.includes('Process') || name.includes('Work'))) {
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
    document.addEventListener('DOMContentLoaded', () => setTimeout(applyColorOverride, 300));
  } else {
    setTimeout(applyColorOverride, 300);
  }

  // Periodic check to ensure Framer re-renders don't re-apply black background
  setInterval(applyColorOverride, 1500);
})();
