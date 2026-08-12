
(function() {
  var isHydrated = false;
  document.addEventListener('framer:pageview', function() { isHydrated = true; });
  setTimeout(function() { isHydrated = true; }, 1500);

  function patchDOM() {
    if (!isHydrated) return false;

    // 1. Remove "Get Template" button securely post-hydration
    document.querySelectorAll('a[href*="framer.link"], a[href*="framer.com/edit"]').forEach(function(el) {
      var wrap = el.closest('[class*="container"]') || el.parentElement;
      (wrap || el).remove();
    });

    // 2. Add Silver hover glow to interactive elements
    document.querySelectorAll('a, button, [class*="framer-4b6vqy"]').forEach(function(el) {
      if(!el.dataset.glowPatched) {
          el.dataset.glowPatched = '1';
          el.addEventListener('mouseenter', function() {
              this.style.boxShadow = '0 0 30px rgba(224,224,224,0.15)';
              this.style.transition = 'box-shadow 0.3s ease';
          });
          el.addEventListener('mouseleave', function() {
              this.style.boxShadow = 'none';
          });
      }
    });

    // 3. Ensure Gold/Silver CTA buttons look premium
    document.querySelectorAll(
      'a[data-framer-name="Primary"], a[class*="framer-1z0enj7"], a[class*="framer-1dk6y11"]'
    ).forEach(function(btn) {
      if (btn.href && btn.href.includes('framer.link')) { btn.remove(); return; }
      btn.style.background = 'linear-gradient(135deg,#e0e0e0,#ffffff)';
      btn.style.color = '#0A0E27';
      btn.style.border = 'none';
      btn.style.boxShadow = '0 0 28px rgba(224,224,224,.45)';
    });
    
    // 4. Set Logo to custom SVG
    var logo = document.querySelector('a[href="/"]');
    if (logo && !logo.dataset.patched) {
        logo.dataset.patched = '1';
        logo.href = '#hero';
        logo.innerHTML = [
          '<svg viewBox="0 0 340 120" style="height: 48px; width: auto;" xmlns="http://www.w3.org/2000/svg">',
            '<path d="M 90 30 L 15 10 L 15 110 L 90 90" fill="none" stroke="#e60000" stroke-width="14" stroke-linejoin="miter" stroke-linecap="butt" />',
            '<text x="110" y="55" font-family="Inter, sans-serif" font-weight="900" font-size="34" fill="#ffffff" style="text-transform:uppercase; letter-spacing: -1px;">GLOBAL</text>',
            '<text x="110" y="85" font-family="Inter, sans-serif" font-weight="900" font-size="34" fill="#ffffff" style="text-transform:uppercase; letter-spacing: -1px;">LOGIC</text>',
            '<text x="110" y="110" font-family="Inter, sans-serif" font-weight="900" font-size="34" fill="#ffffff" style="text-transform:uppercase; letter-spacing: -1px;">MEDIA</text>',
          '</svg>'
        ].join('');
        logo.style.cssText = 'display: flex; align-items: center; justify-content: flex-start; z-index: 10;';
    }

    // 5. Update Navbar Links
    var navLinksContainer = document.querySelector('nav[data-framer-name="nav links"]');
    if (navLinksContainer && !navLinksContainer.dataset.patchedLinks) {
      var links = navLinksContainer.querySelectorAll('a p.framer-text');
      if (links.length >= 4) {
        navLinksContainer.dataset.patchedLinks = '1';
        
        links[0].textContent = 'Home';
        links[0].closest('a').href = '#hero';
        
        links[1].textContent = 'About';
        links[1].closest('a').href = '#about';
        
        links[2].textContent = 'Services';
        links[2].closest('a').href = '#services';
        
        links[3].textContent = 'Blog';
        links[3].closest('a').href = '#blog';
        
        var lastContainer = links[3].closest('div[class*="-container"]');
        if (lastContainer) {
          var newContainer = lastContainer.cloneNode(true);
          newContainer.querySelector('p').textContent = 'Contact us';
          var newLink = newContainer.querySelector('a');
          newLink.href = '#contact';
          newLink.target = '_self';
          newLink.removeAttribute('rel');
          navLinksContainer.appendChild(newContainer);
        }
      }
    }

    // 6. Interactive Spotlight (Color-Dodge Glow)
    var isMobile = window.innerWidth <= 809 || ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    if (!document.getElementById('awwwards-spotlight') && !isMobile) {
      var spotlight = document.createElement('div');
      spotlight.id = 'awwwards-spotlight';
      spotlight.style.cssText = [
        'position: fixed;',
        'top: 0; left: 0;',
        'width: 600px; height: 600px;',
        'border-radius: 50%;',
        'background: radial-gradient(circle, rgba(224,224,224,0.15) 0%, rgba(224,224,224,0) 60%);',
        'pointer-events: none;',
        'z-index: 9999;',
        'transform: translate3d(-50%, -50%, 0);',
        'mix-blend-mode: color-dodge;',
        'transition: opacity 0.5s ease;',
        'opacity: 0;'
      ].join('');
      document.body.appendChild(spotlight);

      var mouseX = window.innerWidth / 2;
      var mouseY = window.innerHeight / 2;
      var spotX = mouseX;
      var spotY = mouseY;

      window.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        spotlight.style.opacity = '1';
      });
      window.addEventListener('mouseout', function() { spotlight.style.opacity = '0'; });
      function animateSpotlight() {
        spotX += (mouseX - spotX) * 0.12;
        spotY += (mouseY - spotY) * 0.12;
        spotlight.style.transform = 'translate3d(' + (spotX - 300) + 'px, ' + (spotY - 300) + 'px, 0)';
        requestAnimationFrame(animateSpotlight);
      }
      animateSpotlight();
    }
    return true;
  }

  var attempts = 0;
  var poll = setInterval(function() {
    attempts++;
    if (patchDOM() || attempts > 40) clearInterval(poll);
  }, 200);

  new MutationObserver(function() { patchDOM(); })
    .observe(document.body, { childList: true, subtree: true });
})();
