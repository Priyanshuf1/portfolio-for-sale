(function() {
  // Rabto FX Engine: Ultra-Fast Hardware-Accelerated 3D Card Tilt & Spotlight Glare (Zero Lag)
  
  const styles = `
    /* ── 3D Tilt & Mouse Spotlight Base ── */
    .rabto-tilt-card {
      transform-style: preserve-3d;
      perspective: 1000px;
      transition: transform 0.12s cubic-bezier(0.1, 1, 0.2, 1), border-color 0.25s ease, box-shadow 0.25s ease;
      position: relative;
      overflow: hidden;
      will-change: transform;
    }

    /* Mouse Spotlight Beam Glare */
    .rabto-spotlight-glare {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      background: radial-gradient(550px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 199, 44, 0.18), transparent 45%);
      border-radius: inherit;
      z-index: 3;
      opacity: 0;
      transition: opacity 0.25s ease;
    }

    .rabto-tilt-card:hover .rabto-spotlight-glare {
      opacity: 1;
    }

    .rabto-tilt-card:hover {
      border-color: rgba(255, 199, 44, 0.5) !important;
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 199, 44, 0.25) !important;
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
      background: rgba(255, 199, 44, 0.4);
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
      background: linear-gradient(90deg, transparent, #FFC72C, #FFE066, #FFFFFF, transparent);
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

  const _tiltedCards = new WeakSet();

  // Fast per-card 3D Tilt without global document scanning (Zero Lag)
  function applyCardTiltFX() {
    const cards = document.querySelectorAll(
      '.glb-skill-card, .glb-home-blog-card, .glb-review-card-premium, .glb-contact-card, .glb-map-container-box, .glb-map-tilt-wrapper'
    );
    
    cards.forEach(card => {
      if (_tiltedCards.has(card)) return;
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
        
        const rotateX = Math.max(-8, Math.min(8, ((y - centerY) / centerY) * -7));
        const rotateY = Math.max(-8, Math.min(8, ((x - centerX) / centerX) * 7));
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // 2. Audio SFX Helper for Button Clicks
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
  }

  window.rabtoApplyTilt = applyCardTiltFX;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initFXEngine, 200));
  } else {
    setTimeout(initFXEngine, 200);
  }

  setInterval(applyCardTiltFX, 1500);
})();
