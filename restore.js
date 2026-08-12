const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ─── 1. Configuration ─────────────────────────────────────────────────────────
const JS_DIR = path.join(__dirname, 'js');
if (!fs.existsSync(JS_DIR)) fs.mkdirSync(JS_DIR);

const JS_URLS = [
    'https://framerusercontent.com/sites/6K4HlZhe7KgNnkaNiaAUUG/rolldown-runtime.Dh6celcD.mjs',
    'https://framerusercontent.com/sites/6K4HlZhe7KgNnkaNiaAUUG/react.DwDJOhmk.mjs',
    'https://framerusercontent.com/sites/6K4HlZhe7KgNnkaNiaAUUG/motion.Bmeq54nQ.mjs',
    'https://framerusercontent.com/sites/6K4HlZhe7KgNnkaNiaAUUG/framer.D2WIVMiA.mjs',
    'https://framerusercontent.com/sites/6K4HlZhe7KgNnkaNiaAUUG/shared-lib.9k2vNqPN.mjs',
    'https://framerusercontent.com/sites/6K4HlZhe7KgNnkaNiaAUUG/l31sonSvPM96iEFWqw0Ab0nmHNOercM7iLhki8PGTPg.6BnxHPM7.mjs',
    'https://framerusercontent.com/sites/6K4HlZhe7KgNnkaNiaAUUG/Aq5hZ7CfEN2npDSr-dhEXwwUw-WM17N-nE12dNyPMF4.Bb-NVMPS.mjs',
    'https://framerusercontent.com/sites/6K4HlZhe7KgNnkaNiaAUUG/PX9hIOIVM.Ig339C9v.mjs',
    'https://framerusercontent.com/sites/6K4HlZhe7KgNnkaNiaAUUG/script_main.xNRutfmy.mjs'
];

// ─── 2. Post Hydration JS ─────────────────────────────────────────────────────────
const POST_HYDRATION_JS_CONTENT = `
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
`;

// ─── 3. Global CSS Theme ─────────────────────────────────────────────────────────
const LUXURY_CSS = `
<style id="priyanshu-theme">
body { background-color: #0A0E27 !important; color: #E0E0E0 !important; }
[style*="cursor: none"] { cursor: auto !important; }
[data-framer-cursor] { display: none !important; }
a[href*="framer.link"], a[href*="framer.com/edit"], a[href*="framer.com/badge"], #framer-badge { display: none !important; }
html { scroll-behavior: smooth; }
</style>
`;

// ─── MAIN PROCESS ──────────────────────────────────────────────────────────────────
async function fetchText(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    return await res.text();
}

async function main() {
    console.log('\n🔄 Step 1: Re-downloading pristine JS files from Framer CDN…');
    for (const url of JS_URLS) {
        const filename = url.split('/').pop();
        let content = await fetchText(url);
        content = content.replace(
            /https:\/\/framerusercontent\.com\/sites\/[a-zA-Z0-9]+\/([a-zA-Z0-9._-]+\.mjs)/g,
            './$1'
        );
        fs.writeFileSync(path.join(JS_DIR, filename), content);
    }

    console.log('\n🔄 Step 2: Re-downloading fresh HTML from Framer…');
    let html = await fetchText('https://priyanshuf1.framer.media/');
    html = html.replace(
        /https:\/\/framerusercontent\.com\/sites\/[a-zA-Z0-9]+\/([a-zA-Z0-9._-]+\.mjs)/g,
        './js/$1'
    );

    console.log('\n🔄 Step 3: Injecting Post Hydration JS & Luxury CSS…');
    fs.writeFileSync(path.join(JS_DIR, 'post-hydration.js'), POST_HYDRATION_JS_CONTENT);
    if (!html.includes('post-hydration.js')) {
        html = html.replace('</head>', '<script defer src="./js/post-hydration.js"></script>\n' + LUXURY_CSS + '\n</head>');
    }
    fs.writeFileSync(path.join(__dirname, 'index.html'), html);

    console.log('\n🔄 Step 4: Running exact string patches for React Hydration sync…');
    execSync('node patch-text.js', { stdio: 'inherit' });

    console.log('\n✨ Done! Site is fully patched, styled, and React-hydration safe.\n');
}

main().catch(err => { console.error('ERROR:', err); process.exit(1); });
