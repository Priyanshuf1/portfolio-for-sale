(function() {
  const hasHoverPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!hasHoverPointer || prefersReduced) return;

  const styles = `
    body { cursor: default; }

    #rabto-cursor-dot {
      position: fixed; top: 0; left: 0;
      width: 6px; height: 6px;
      background: #FFFFFF; border-radius: 50%;
      pointer-events: none; z-index: 99999;
      will-change: transform;
      box-shadow: 0 0 12px rgba(255,255,255,0.9);
      transition: opacity 0.2s ease;
    }
    #rabto-cursor-ring {
      position: fixed; top: 0; left: 0;
      width: 32px; height: 32px;
      border: 1px solid rgba(255,255,255,0.4);
      border-radius: 50%;
      pointer-events: none; z-index: 99998;
      will-change: transform;
      transition: width 0.3s ease, height 0.3s ease, opacity 0.2s ease, border-color 0.3s ease;
      box-shadow: 0 0 15px rgba(255,255,255,0.1);
    }
    body.rabto-hovering #rabto-cursor-ring {
      width: 52px; height: 52px;
      background: rgba(255,255,255,0.08);
      border-color: rgba(255,255,255,0.85);
      box-shadow: 0 0 25px rgba(255,255,255,0.3);
    }
    body.rabto-hovering #rabto-cursor-dot {
      width: 8px; height: 8px;
      box-shadow: 0 0 15px #FFFFFF;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);

  const dot = document.createElement('div');
  dot.id = 'rabto-cursor-dot';
  document.body.appendChild(dot);

  const ring = document.createElement('div');
  ring.id = 'rabto-cursor-ring';
  document.body.appendChild(ring);

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  let ticking = false;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!ticking) {
      requestAnimationFrame(() => {
        const isHovering = document.body.classList.contains('rabto-hovering');
        const dotOffset = isHovering ? 4 : 3;
        dot.style.transform = `translate3d(${mouseX - dotOffset}px, ${mouseY - dotOffset}px, 0)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  let _ringRaf = null;
  let _lastActiveTime = Date.now();

  window.addEventListener('mousemove', () => {
    _lastActiveTime = Date.now();
    if (!_ringRaf) {
      _ringRaf = const diff = Math.abs(mouseX - ringX) + Math.abs(mouseY - ringY);
    if (diff > 0.1 || Date.now() - _lastActiveTime < 1000) {
      _ringRaf = requestAnimationFrame(animateRing);
    } else {
      _ringRaf = null;
    }
    }
  }, { passive: true });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    const isHovering = document.body.classList.contains('rabto-hovering');
    const isClicking = document.body.classList.contains('rabto-clicking');
    const offset = isHovering ? 26 : 16;
    let scaleStr = isClicking ? ' scale3d(0.75, 0.75, 1)' : '';
    ring.style.transform = `translate3d(${ringX - offset}px, ${ringY - offset}px, 0)${scaleStr}`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // When mouse enters an iframe, hide cursor (browser loses tracking inside iframes)
  document.addEventListener('mouseover', (e) => {
    const hoverTarget = e.target;
    if (hoverTarget.tagName === 'IFRAME') {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    } else if (hoverTarget.closest('a, button, input, textarea, select, .glb-skill-card, .glb-home-blog-card, .glb-review-card-premium, .glb-contact-card, .glb-map-tilt-wrapper')) {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      document.body.classList.add('rabto-hovering');
    } else {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }
  });

  document.addEventListener('mouseout', (e) => {
    const hoverTarget = e.target;
    if (hoverTarget.tagName === 'IFRAME') {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }
    if (hoverTarget.closest('a, button, input, textarea, select, .glb-skill-card, .glb-home-blog-card, .glb-review-card-premium, .glb-contact-card, .glb-map-tilt-wrapper')) {
      document.body.classList.remove('rabto-hovering');
    }
  });

  document.addEventListener('mousedown', () => document.body.classList.add('rabto-clicking'));
  document.addEventListener('mouseup', () => document.body.classList.remove('rabto-clicking'));
})();
