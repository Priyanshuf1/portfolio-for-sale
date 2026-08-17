(function() {
  // Rabto FX Engine: 3D Card Tilt, Mouse Spotlight Glare, Radar Pulse, and Kinetic Scroll Animations
  
  const styles = `
    /* ── 3D Tilt & Mouse Spotlight Base ── */
    .rabto-tilt-card {
      transform-style: preserve-3d;
      perspective: 1000px;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    /* Mouse Spotlight Beam Glare */
    .rabto-spotlight-glare {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      background: radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(212, 175, 55, 0.15), transparent 45%);
      border-radius: inherit;
      z-index: 2;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .rabto-tilt-card:hover .rabto-spotlight-glare {
      opacity: 1;
    }

    .rabto-tilt-card:hover {
      border-color: rgba(212, 175, 55, 0.45) !important;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(212, 175, 55, 0.25) !important;
    }

    /* ── Kinetic Scroll-Triggered Text Reveal ── */
    .rabto-text-reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .rabto-text-reveal.is-visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* ── Live Pulsing Radar Beacon Rings ── */
    .rabto-radar-beacon {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .rabto-radar-beacon::before,
    .rabto-radar-beacon::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: rgba(212, 175, 55, 0.4);
      animation: rabtoRadarPulse 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
      pointer-events: none;
    }

    .rabto-radar-beacon::after {
      animation-delay: 1.2s;
    }

    @keyframes rabtoRadarPulse {
      0% {
        transform: scale(0.9);
        opacity: 0.8;
      }
      100% {
        transform: scale(2.8);
        opacity: 0;
      }
    }

    /* ── Shimmering Light Beam Button Sweep ── */
    a[class*="framer-"][class*="1dk6y11"],
    a[class*="framer-"][class*="1z0enj7"],
    a[data-framer-name="Primary"],
    .glb-floating-btn-review,
    .glb-skills-tab {
      position: relative;
      overflow: hidden;
    }

    a[class*="framer-"][class*="1dk6y11"]::after,
    a[class*="framer-"][class*="1z0enj7"]::after,
    a[data-framer-name="Primary"]::after,
    .glb-floating-btn-review::after {
      content: '';
      position: absolute;
      top: -50%; left: -50%;
      width: 200%; height: 200%;
      background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      transform: rotate(45deg) translateY(-100%);
      transition: transform 0.6s ease;
      pointer-events: none;
    }

    a[class*="framer-"][class*="1dk6y11"]:hover::after,
    a[class*="framer-"][class*="1z0enj7"]:hover::after,
    a[data-framer-name="Primary"]:hover::after,
    .glb-floating-btn-review:hover::after {
      transform: rotate(45deg) translateY(100%);
    }

    /* ── Header Top Shimmer Sweep Line ── */
    header::before, nav::before {
      content: '';
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 2px;
      background: linear-gradient(90deg, transparent, #D4AF37, #F0D060, #FFFFFF, transparent);
      background-size: 200% 100%;
      animation: rabtoHeaderGlow 6s linear infinite;
      pointer-events: none;
      z-index: 100;
    }

    @keyframes rabtoHeaderGlow {
      0% { background-position: -100% 0; }
      100% { background-position: 200% 0; }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);

  // Track processed cards so we never add duplicate listeners
  const _tiltedCards = new WeakSet();

  // 1. Apply 3D Magnetic Tilt & Mouse Spotlight to Cards
  function applyCardTiltFX() {
    const cards = document.querySelectorAll(
      '.glb-skill-card, .glb-home-blog-card, .glb-review-card-premium, .glb-contact-card, .glb-map-tilt-wrapper'
    );
    
    cards.forEach(card => {
      if (_tiltedCards.has(card)) return; // already wired up — skip
      _tiltedCards.add(card);

      card.classList.add('rabto-tilt-card');
      
      if (!card.querySelector('.rabto-spotlight-glare')) {
        const glare = document.createElement('div');
        glare.className = 'rabto-spotlight-glare';
        card.appendChild(glare);
      }

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -6; // Max 6deg tilt
        const rotateY = ((x - centerX) / centerX) * 6;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // 2. Kinetic Scroll-Triggered Text & Card Reveals
  function applyScrollReveals() {
    const elements = document.querySelectorAll('.glb-skills-header, .glb-home-blogs-header, .glb-reviews-header, .glb-location-header, .glb-skill-card, .glb-home-blog-card, .glb-review-card-premium');
    
    elements.forEach(el => {
      el.classList.add('rabto-text-reveal');
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  }

  // 3. Audio SFX Helper for Button Clicks
  window.rabtoPlayClickSFX = function(freq = 600, type = 'sine', duration = 0.06) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch(e) {}
  };

  document.addEventListener('click', (e) => {
    if (e.target.closest('a, button, .glb-skills-tab')) {
      window.rabtoPlayClickSFX(650, 'sine', 0.07);
    }
  });

  function initFXEngine() {
    applyCardTiltFX();
    applyScrollReveals();
  }

  // Expose globally so location-section.js can call it after late injection
  window.rabtoApplyTilt = applyCardTiltFX;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initFXEngine, 400));
  } else {
    setTimeout(initFXEngine, 400);
  }

  // Re-scan every 1.5s for late-injected sections (location, blog, etc.)
  setInterval(applyCardTiltFX, 1500);
})();
