(function() {
  // ====================================================
  // INFINITE AUTO-LOOP CAROUSEL — Replaces cursor trail
  // Dual-track horizontal scrolling marquee
  // Solid black background (hides general site background)
  // ====================================================

  function inject() {
    // ── Find and hide the Framer Recent Works (About Me) section ────────
    var recentWorkEl = document.querySelector('[data-framer-name="about me section"]') || document.getElementById('about-me');
    if (recentWorkEl) {
      recentWorkEl.style.display = 'none';
      recentWorkEl.style.visibility = 'hidden';
      recentWorkEl.style.height = '0';
      recentWorkEl.style.overflow = 'hidden';
      recentWorkEl.style.padding = '0';
      recentWorkEl.style.margin = '0';
    }

    // ── Find and hide the Framer Projects section ──────────────────────
    var projectsEl = document.querySelector('[data-framer-name="Projects"]') || document.querySelector('.framer-1mm21uq') || document.getElementById('projects');
    if (projectsEl) {
      projectsEl.style.display = 'none';
      projectsEl.style.visibility = 'hidden';
      projectsEl.style.height = '0';
      projectsEl.style.overflow = 'hidden';
      projectsEl.style.padding = '0';
      projectsEl.style.margin = '0';
    }

    if (!recentWorkEl && !projectsEl) return;

    var insertTarget = recentWorkEl || projectsEl;

    // If already injected, make sure it's in the DOM at the correct position
    var existingSection = document.getElementById('glm-image-trail-section');
    if (existingSection) {
      if (insertTarget.nextSibling !== existingSection) {
        insertTarget.parentNode.insertBefore(existingSection, insertTarget.nextSibling);
      }
      return;
    }

    // Build the replacement section
    var section = document.createElement('section');
    section.id = 'glm-image-trail-section';
    section.style.cssText = [
      'position:relative',
      'width:100%',
      'min-height:90vh',
      'background:#000000 !important',
      'display:flex',
      'flex-direction:column',
      'align-items:center',
      'justify-content:center',
      'overflow:hidden',
      'padding:80px 0',
      'z-index:8'
    ].join(';');

    // Inject marquee CSS styles
    var style = document.createElement('style');
    style.textContent = `
      .glm-marquee-wrap {
        display: flex;
        flex-direction: column;
        gap: 30px;
        width: 100%;
        overflow: hidden;
        position: relative;
        margin-top: 40px;
      }
      .glm-marquee-row {
        display: flex;
        width: max-content;
        gap: 30px;
      }
      .glm-marquee-row.left {
        animation: glmMarqueeLeft 35s linear infinite;
      }
      .glm-marquee-row.right {
        animation: glmMarqueeRight 35s linear infinite;
      }
      .glm-marquee-row:hover {
        animation-play-state: paused;
      }
      .glm-marquee-item {
        width: 320px;
        height: 220px;
        flex-shrink: 0;
        border-radius: 16px;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.08);
        background: #0d0d11;
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease;
        cursor: pointer;
      }
      .glm-marquee-item:hover {
        transform: scale(1.04) translateY(-5px);
        border-color: #FF1744;
      }
      .glm-marquee-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.85;
        transition: opacity 0.4s ease;
      }
      .glm-marquee-item:hover img {
        opacity: 1;
      }
      @keyframes glmMarqueeLeft {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes glmMarqueeRight {
        0% { transform: translateX(-50%); }
        100% { transform: translateX(0); }
      }
    `;
    document.head.appendChild(style);

    // Overlay text
    var overlay = document.createElement('div');
    overlay.style.cssText = [
      'position:relative',
      'z-index:10',
      'text-align:center',
      'pointer-events:none',
      'user-select:none'
    ].join(';');
    overlay.innerHTML = [
      '<p style="color:#FF1744;font-size:clamp(12px,1.2vw,16px);letter-spacing:0.4em;text-transform:uppercase;margin-bottom:15px;font-family:sans-serif;font-weight:700;">Recent Work</p>',
      '<h2 style="color:#ffffff;font-size:clamp(36px,5vw,64px);font-weight:900;line-height:1.1;font-family:sans-serif;margin:0;">Proven Marketing Results</h2>'
    ].join('');
    section.appendChild(overlay);

    // Build Marquee lists
    var row1Images = [
      './work1.png', './work2.png', './work3.png', './work4.png',
      './ss5.png', './ss6.png', './ss7.png', './ss8.png'
    ];
    var row2Images = [
      './ss9.png', './ss10.png', './ss11.png', './ss12.png',
      './ss13.png', './ss14.png', './ss15.png', './ss16.png'
    ];

    var marqueeWrap = document.createElement('div');
    marqueeWrap.className = 'glm-marquee-wrap';

    // Helper to generate slide HTML (doubled to allow seamless loop)
    function buildRowHTML(images) {
      var doubled = images.concat(images);
      return doubled.map(src => `
        <div class="glm-marquee-item">
          <img src="${src}" alt="Work Proof" loading="lazy">
        </div>
      `).join('');
    }

    // Row 1 (scrolling left)
    var row1 = document.createElement('div');
    row1.className = 'glm-marquee-row left';
    row1.innerHTML = buildRowHTML(row1Images);
    marqueeWrap.appendChild(row1);

    // Row 2 (scrolling right)
    var row2 = document.createElement('div');
    row2.className = 'glm-marquee-row right';
    row2.innerHTML = buildRowHTML(row2Images);
    marqueeWrap.appendChild(row2);

    section.appendChild(marqueeWrap);

    // Insert section after the hidden one
    insertTarget.parentNode.insertBefore(section, insertTarget.nextSibling);

    // Dynamic Navigation Link injection for Instagram page
    injectInstagramNavLink();
  }

  function injectInstagramNavLink() {
    const blogLinks = document.querySelectorAll('a[href*="blog.html"], a[href*="blog"]');
    blogLinks.forEach(blogLink => {
      const parent = blogLink.parentElement;
      if (parent && !parent.querySelector('a[href*="instagram.html"]')) {
        const instaLink = document.createElement('a');
        instaLink.href = './instagram.html';
        instaLink.innerText = 'Instagram';
        instaLink.className = blogLink.className;
        instaLink.style.cssText = blogLink.style.cssText;
        blogLink.parentNode.insertBefore(instaLink, blogLink.nextSibling);
      }
    });
  }

  // Run continuously to survive Framer React hydration and re-renders
  setInterval(inject, 500);

  // Monitor DOM modifications to immediately re-run inject
  var observer = new MutationObserver(inject);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      observer.observe(document.body, { childList: true, subtree: true });
      inject();
    });
  } else {
    observer.observe(document.body, { childList: true, subtree: true });
    inject();
  }

})();
