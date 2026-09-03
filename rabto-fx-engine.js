(function() {
  // Rabto FX Engine: Pro RAF-Lerp 3D Card Tilt & Spotlight Glare (Awwwards/Stripe Physics)
  
  const styles = `
    /* ── 3D Tilt & Mouse Spotlight Base ── */
    .rabto-tilt-card {
      transform-style: preserve-3d;
      perspective: 1000px;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
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
      background: radial-gradient(550px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(226, 0, 1, 0.18), transparent 45%);
      border-radius: inherit;
      z-index: 3;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .rabto-tilt-card:hover .rabto-spotlight-glare {
      opacity: 1;
    }

    .rabto-tilt-card:hover {
      border-color: rgba(226, 0, 1, 0.5) !important;
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(226, 0, 1, 0.25) !important;
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
      background: rgba(226, 0, 1, 0.4);
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
      background: linear-gradient(90deg, transparent, #e20001, #ff3333, #FFFFFF, transparent);
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

  // Ultra-Smooth Lerp Physics Engine for 3D Tilt
  function applyCardTiltFX() {
    const hasHoverPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasHoverPointer) return;

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

      let tiltState = {
        targetRX: 0,
        targetRY: 0,
        currRX: 0,
        currRY: 0,
        targetScale: 1,
        currScale: 1,
        targetX: 50,
        targetY: 50,
        currX: 50,
        currY: 50,
        hovering: false,
        raf: null
      };

      function updatePhysics() {
        // High-precision RAF lerp (0.12 speed = super smooth momentum)
        tiltState.currRX += (tiltState.targetRX - tiltState.currRX) * 0.12;
        tiltState.currRY += (tiltState.targetRY - tiltState.currRY) * 0.12;
        tiltState.currScale += (tiltState.targetScale - tiltState.currScale) * 0.12;
        tiltState.currX += (tiltState.targetX - tiltState.currX) * 0.12;
        tiltState.currY += (tiltState.targetY - tiltState.currY) * 0.12;

        card.style.transform = `perspective(1000px) rotateX(${tiltState.currRX.toFixed(2)}deg) rotateY(${tiltState.currRY.toFixed(2)}deg) scale3d(${tiltState.currScale.toFixed(3)}, ${tiltState.currScale.toFixed(3)}, 1)`;
        card.style.setProperty('--mouse-x', `${tiltState.currX.toFixed(1)}px`);
        card.style.setProperty('--mouse-y', `${tiltState.currY.toFixed(1)}px`);

        const diff = Math.abs(tiltState.targetRX - tiltState.currRX) + 
                     Math.abs(tiltState.targetRY - tiltState.currRY) + 
                     Math.abs(tiltState.targetScale - tiltState.currScale);
        
        if (tiltState.hovering || diff > 0.01) {
          tiltState.raf = requestAnimationFrame(updatePhysics);
        } else {
          tiltState.raf = null;
          if (!tiltState.hovering) {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
          }
        }
      }

      card.addEventListener('mouseenter', () => {
        tiltState.hovering = true;
        tiltState.targetScale = 1.025;
        if (!tiltState.raf) {
          tiltState.raf = requestAnimationFrame(updatePhysics);
        }
      });

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        tiltState.targetRX = Math.max(-8, Math.min(8, ((y - centerY) / centerY) * -7));
        tiltState.targetRY = Math.max(-8, Math.min(8, ((x - centerX) / centerX) * 7));
        tiltState.targetX = x;
        tiltState.targetY = y;
      });

      card.addEventListener('mouseleave', () => {
        tiltState.hovering = false;
        tiltState.targetRX = 0;
        tiltState.targetRY = 0;
        tiltState.targetScale = 1;
      });
    });
  }

  // Audio SFX Helper for Button Clicks
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

  var _fxTimerCount = 0;
  var _fxTimer = setInterval(function() {
    applyCardTiltFX();
    _fxTimerCount++;
    if (_fxTimerCount > 8) clearInterval(_fxTimer);
  }, 1500);
})();
