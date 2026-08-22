(function() {
  // ====================================================
  // RECENT WORK MARQUEE & INSTAGRAM EMBEDDED FEED
  // - Transparent background for Recent Work marquee (shows site 3D mesh)
  // - Seamless lightbox zoom with (X) button on image tap
  // - Embedded stylish auto-scrolling Instagram feed section below Recent Work
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

    // ── 1. Create or update the Recent Work Marquee Section ─────────────────
    var section = document.getElementById('glm-image-trail-section');
    if (!section) {
      section = document.createElement('section');
      section.id = 'glm-image-trail-section';
      insertTarget.parentNode.insertBefore(section, insertTarget.nextSibling);
    }

    // Update section styling to be TRANSPARENT to show the three-bg canvas
    section.style.cssText = [
      'position:relative',
      'width:100%',
      'min-height:75vh',
      'background:transparent !important', // Transparent background as requested
      'display:flex',
      'flex-direction:column',
      'align-items:center',
      'justify-content:center',
      'overflow:hidden',
      'padding:60px 0 40px',
      'z-index:8'
    ].join(';');

    // Inject marquee CSS styles
    var style = document.getElementById('glm-marquee-styles');
    if (!style) {
      style = document.createElement('style');
      style.id = 'glm-marquee-styles';
      style.textContent = `
        .glm-marquee-wrap {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
          overflow: hidden;
          position: relative;
          margin-top: 30px;
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
        .glm-marquee-row {
          display: flex;
          width: max-content;
          gap: 24px;
        }
        .glm-marquee-row.left {
          animation: glmMarqueeLeft 40s linear infinite;
        }
        .glm-marquee-row.right {
          animation: glmMarqueeRight 40s linear infinite;
        }
        .glm-marquee-row:hover {
          animation-play-state: paused;
        }
        .glm-marquee-item {
          width: 290px;
          height: 200px;
          flex-shrink: 0;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(13, 13, 17, 0.75); /* Dark semi-transparent background to stand out over grid */
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease;
          cursor: pointer;
        }
        .glm-marquee-item:hover {
          transform: scale(1.05) translateY(-5px);
          border-color: #FF1744;
          box-shadow: 0 12px 30px rgba(255, 23, 68, 0.2);
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
        
        /* Instagram Section Styling */
        .glm-insta-section {
          position: relative;
          width: 100%;
          min-height: 70vh;
          background: transparent !important;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 60px 0 80px;
          z-index: 8;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .glm-insta-header {
          display: flex;
          align-items: center;
          gap: 30px;
          margin-bottom: 30px;
          padding: 0 20px;
          width: 100%;
          max-width: 1200px;
          justify-content: space-between;
        }
        .glm-insta-profile {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .glm-insta-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: 2.5px solid #FF1744;
          padding: 2px;
          object-fit: cover;
        }
        .glm-insta-meta h4 {
          color: #fff;
          font-size: 1.15rem;
          margin: 0;
          font-weight: 700;
        }
        .glm-insta-meta p {
          color: #8A8F98;
          font-size: 0.88rem;
          margin: 4px 0 0;
        }
        .glm-insta-row {
          display: flex;
          width: max-content;
          gap: 24px;
          animation: glmMarqueeLeft 45s linear infinite;
        }
        .glm-insta-row:hover {
          animation-play-state: paused;
        }
        .glm-insta-card {
          width: 260px;
          aspect-ratio: 1;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(15,15,20,0.8);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .glm-insta-card:hover {
          transform: scale(1.03);
        }
        .glm-insta-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .glm-insta-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.82);
          opacity: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
          text-align: center;
          transition: opacity 0.3s ease;
        }
        .glm-insta-card:hover .glm-insta-overlay {
          opacity: 1;
        }
        .glm-insta-caption {
          font-size: 0.82rem;
          color: #fff;
          line-height: 1.5;
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .glm-insta-link {
          color: #FF1744;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          text-decoration: none;
          border-bottom: 1.5px solid #FF1744;
          padding-bottom: 1px;
        }

        /* Token Configuration Trigger */
        .glm-token-trigger {
          color: rgba(255,255,255,0.25);
          font-size: 0.8rem;
          cursor: pointer;
          transition: color 0.3s;
          text-decoration: underline;
        }
        .glm-token-trigger:hover {
          color: #FF1744;
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
    }

    // Build Recent Work content if section is empty
    if (!section.querySelector('.glm-marquee-wrap')) {
      section.innerHTML = `
        <div style="text-align:center;pointer-events:none;user-select:none;">
          <p style="color:#FF1744;font-size:clamp(12px,1.2vw,16px);letter-spacing:0.4em;text-transform:uppercase;margin-bottom:15px;font-family:sans-serif;font-weight:700;">Recent Work</p>
          <h2 style="color:#ffffff;font-size:clamp(36px,5vw,64px);font-weight:900;line-height:1.1;font-family:sans-serif;margin:0;">Proven Marketing Results</h2>
        </div>
        <div class="glm-marquee-wrap">
          <div class="glm-marquee-row left" id="marquee-row-1"></div>
          <div class="glm-marquee-row right" id="marquee-row-2"></div>
        </div>
      `;

      var row1Images = [
        './work1.png', './work2.png', './work3.png', './work4.png',
        './ss5.png', './ss6.png', './ss7.png', './ss8.png'
      ];
      var row2Images = [
        './ss9.png', './ss10.png', './ss11.png', './ss12.png',
        './ss13.png', './ss14.png', './ss15.png', './ss16.png'
      ];

      function fillRow(rowElId, images) {
        var row = document.getElementById(rowElId);
        if (!row) return;
        var doubled = images.concat(images);
        row.innerHTML = doubled.map(src => `
          <div class="glm-marquee-item" onclick="window.glmShowLightbox('${src}')">
            <img src="${src}" alt="Portfolio Proof" loading="lazy">
          </div>
        `).join('');
      }

      fillRow('marquee-row-1', row1Images);
      fillRow('marquee-row-2', row2Images);
    }

    // ── 2. Create or update the Instagram Feed Section ──────────────────────
    var instaSection = document.getElementById('glm-instagram-feed-section');
    if (!instaSection) {
      instaSection = document.createElement('section');
      instaSection.id = 'glm-instagram-feed-section';
      instaSection.className = 'glm-insta-section';
      section.parentNode.insertBefore(instaSection, section.nextSibling);
    }

    // Populate Instagram feed content if empty
    if (!instaSection.querySelector('.glm-insta-header')) {
      instaSection.innerHTML = `
        <div class="glm-insta-header">
          <div class="glm-insta-profile">
            <img src="./logo.png" alt="Profile" class="glm-insta-avatar">
            <div class="glm-insta-meta">
              <h4>globallogicmedia</h4>
              <p>Lucknow's Premier Branding & Performance Agency</p>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:20px;">
            <span class="glm-token-trigger" onclick="window.glmPromptToken()">Config API</span>
            <a href="https://instagram.com/globallogicmedia" target="_blank" rel="noopener" class="instagram-btn" style="background:#FF1744;color:#fff;text-decoration:none;padding:8px 20px;border-radius:20px;font-size:0.85rem;font-weight:700;">Follow</a>
          </div>
        </div>
        <div class="glm-marquee-wrap">
          <div class="glm-insta-row" id="insta-feed-row"></div>
        </div>
      `;

      loadInstagramFeed();
    }

    // ── 3. Lightbox Setup ───────────────────────────────────────────────────
    setupLightbox();

    // ── 4. Inject Dynamic Header Links ──────────────────────────────────────
    injectInstagramNavLink();
  }

  function setupLightbox() {
    var lightbox = document.getElementById('glm-lightbox');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.id = 'glm-lightbox';
      lightbox.style.cssText = [
        'position:fixed',
        'inset:0',
        'background:rgba(0,0,0,0.92)',
        'display:flex',
        'align-items:center',
        'justify-content:center',
        'z-index:9999',
        'opacity:0',
        'pointer-events:none',
        'transition:opacity 0.4s ease',
        'backdrop-filter:blur(10px)',
        '-webkit-backdrop-filter:blur(10px)'
      ].join(';');
      lightbox.innerHTML = `
        <button id="glm-lightbox-close" style="position:absolute;top:30px;right:40px;background:none;border:none;color:#fff;font-size:42px;cursor:pointer;font-weight:200;transition:transform 0.3s ease;">&times;</button>
        <img id="glm-lightbox-img" style="max-width:90%;max-height:85vh;object-fit:contain;border-radius:12px;transform:scale(0.95);transition:transform 0.4s cubic-bezier(0.16,1,0.3,1);box-shadow:0 25px 60px rgba(0,0,0,0.8);">
      `;
      document.body.appendChild(lightbox);

      // Close handlers
      var closeBtn = document.getElementById('glm-lightbox-close');
      var closeLightbox = function() {
        lightbox.style.opacity = '0';
        lightbox.style.pointerEvents = 'none';
        document.getElementById('glm-lightbox-img').style.transform = 'scale(0.95)';
      };

      closeBtn.addEventListener('click', closeLightbox);
      lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
      });
      window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
      });

      window.glmShowLightbox = function(src) {
        var img = document.getElementById('glm-lightbox-img');
        img.src = src;
        lightbox.style.opacity = '1';
        lightbox.style.pointerEvents = 'auto';
        img.style.transform = 'scale(1)';
      };
    }
  }

  function loadInstagramFeed() {
    var row = document.getElementById('insta-feed-row');
    if (!row) return;

    // Stylish placeholder posts to show instantly (representing GLM portfolio & creatives)
    var defaultPosts = [
      { src: './work1.png', cap: 'Empowering B Luxury Salon with an organic, conversion-optimized marketing push!' },
      { src: './work2.png', cap: 'Elegant creative visuals and brand photography for Vinca Unisex Salon.' },
      { src: './work3.png', cap: 'Behind the numbers: Deep ROAS optimization on our meta ads setups.' },
      { src: './ss11.png', cap: 'Crisp social media flyer assets for Spicy Affair Lucknow.' },
      { src: './ss15.png', cap: 'Bold brand identities built from scratch: Krazy 4 Cakes by Muskan.' },
      { src: './ss16.png', cap: 'Are you ready to write your digital story? Connect with GLM today!' }
    ];

    var token = localStorage.getItem('glm_instagram_token');
    if (token) {
      // Dynamic API fetch if token is present
      fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${token}`)
        .then(res => {
          if (!res.ok) throw new Error('API invalid');
          return res.json();
        })
        .then(data => {
          if (data.data && data.data.length > 0) {
            renderInstaData(data.data.map(item => ({
              src: item.media_type === 'VIDEO' ? (item.thumbnail_url || item.media_url) : item.media_url,
              cap: item.caption || 'Global Logic Media Creative',
              link: item.permalink
            })));
          } else {
            renderInstaData(defaultPosts);
          }
        })
        .catch(() => {
          renderInstaData(defaultPosts);
        });
    } else {
      renderInstaData(defaultPosts);
    }

    function renderInstaData(posts) {
      // Double the array to make seamless auto-scrolling loop
      var doubled = posts.concat(posts);
      row.innerHTML = doubled.map(p => `
        <div class="glm-insta-card" onclick="window.glmShowLightbox('${p.src}')">
          <img src="${p.src}" alt="Instagram Post" loading="lazy">
          <div class="glm-insta-overlay">
            <p class="glm-insta-caption">${p.cap}</p>
            <a href="${p.link || 'https://instagram.com/globallogicmedia'}" target="_blank" rel="noopener" class="glm-insta-link" onclick="event.stopPropagation();">Instagram</a>
          </div>
        </div>
      `).join('');
    }
  }

  // Token Prompt utility
  window.glmPromptToken = function() {
    var current = localStorage.getItem('glm_instagram_token') || '';
    var token = prompt('Enter your Instagram Basic Display API Access Token:', current);
    if (token !== null) {
      if (token.trim() === '') {
        localStorage.removeItem('glm_instagram_token');
        alert('Access Token cleared. Reverting to placeholders.');
      } else {
        localStorage.setItem('glm_instagram_token', token.trim());
        alert('Instagram Token saved successfully! Fetching feed...');
      }
      loadInstagramFeed();
    }
  };

  function injectInstagramNavLink() {
    var blogLinks = document.querySelectorAll('a[href*="blog.html"], a[href*="blog"]');
    blogLinks.forEach(blogLink => {
      var parent = blogLink.parentElement;
      if (parent && !parent.querySelector('a[href*="instagram.html"]')) {
        var instaLink = document.createElement('a');
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
