(function() {
  const customCSS = `
    .glb-reviews-native-wrapper {
      width: 100%;
      background: transparent;
      padding: 70px 0;
      box-sizing: border-box;
      position: relative;
      z-index: 10;
      border-top: 1px solid rgba(0,0,0,0.05);
    }
    .glb-reviews-title-wrap {
      text-align: center;
      margin-bottom: 40px;
      padding: 0 20px;
    }
    .glb-reviews-title-wrap h2 {
      font-size: clamp(2.2rem, 5vw, 3.2rem);
      margin: 0 0 10px;
      color: #111827;
      letter-spacing: -1px;
      font-weight: 900;
    }
    .glb-reviews-title-wrap p {
      color: #666;
      font-size: 1.1rem;
      margin: 0;
    }
    .glb-premium-reviews-container {
      width: 100%;
      overflow: hidden;
      padding: 10px 0;
      background: transparent;
      mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
      -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    }
    .glb-marquee-track {
      display: flex;
      gap: 24px;
      width: max-content;
      animation: marquee 30s linear infinite;
    }
    .glb-marquee-track:hover {
      animation-play-state: paused;
    }
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .glb-review-card-premium {
      flex: 0 0 350px;
      background: #FFFDF0;
      border-radius: 16px;
      padding: 28px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 16px;
      border: 1px solid rgba(226, 160, 0, 0.15);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
      white-space: normal;
    }
    .glb-review-header {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .glb-review-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: linear-gradient(135deg, #e20001, #ffc72c);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-weight: 700;
      font-size: 18px;
      flex-shrink: 0;
    }
    .glb-review-meta {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .glb-review-name {
      margin: 0;
      color: #111;
      font-size: 18px;
      font-weight: 600;
    }
    .glb-review-role {
      margin: 0;
      color: #666;
      font-size: 13px;
    }
    .glb-review-divider {
      height: 1px;
      background: rgba(0, 0, 0, 0.08);
      width: 100%;
    }
    .glb-review-text {
      color: #333;
      font-size: 15px;
      line-height: 1.6;
      margin: 0;
      flex-grow: 1;
      font-style: italic;
    }
    .glb-review-footer {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 6px;
    }
    .glb-review-score {
      color: #111;
      font-size: 16px;
      font-weight: 600;
    }
    .glb-review-stars {
      color: #e20001;
      font-size: 16px;
      letter-spacing: 2px;
    }
    /* Hide framer original broken element */
    .framer-1pmfitp {
      display: none !important;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.innerHTML = customCSS;
  document.head.appendChild(styleEl);

    const defaultReviews = [
    { 
      author: "Priya Sharma", 
      text: "Global Logic Media completely transformed our online presence in Lucknow. Our lead generation tripled in just two months with their targeted Google & Meta campaigns!", 
      rating: 5,
      date: "2 weeks ago"
    },
    { 
      author: "Rajesh Agarwal", 
      text: "The web development and design team is truly top-tier. They captured our brand identity perfectly and delivered a blazing fast, modern platform.", 
      rating: 5,
      date: "1 month ago"
    },
    { 
      author: "Vikas Malhotra", 
      text: "Highly recommend Global Logic Media for local SEO services in Lucknow. Our business is finally ranking on page 1 of Google for all competitive keywords.", 
      rating: 5,
      date: "3 weeks ago"
    },
    { 
      author: "Ananya Gupta", 
      text: "Outstanding ROI on our social media ad campaigns. Their marketing strategy is completely data-backed and the results exceeded our expectations.", 
      rating: 5,
      date: "1 month ago"
    },
    { 
      author: "Rohan Verma", 
      text: "Professional, responsive, and innovative team. Best digital marketing partner we've collaborated with. Customer service is unmatched!", 
      rating: 5,
      date: "2 months ago"
    },
    {
      author: "Deepak Mishra",
      text: "From branding to complete SEO dominance, Global Logic Media has been instrumental in scaling our retail business across UP.",
      rating: 5,
      date: "3 weeks ago"
    }
  ];

  async function loadDataAndRender() {
      let allReviews = [...defaultReviews];
      
      try {
          if (window.firebaseDB) {
              const snapshot = await window.firebaseDB.ref("reviews").orderByChild("createdAt").once('value');
              if (snapshot.exists()) {
                  let dbReviews = [];
                  snapshot.forEach(childSnapshot => {
                      const rev = childSnapshot.val();
                      if (rev.status === 'approved' || !rev.status) {
                          dbReviews.push(rev);
                      }
                  });
                  dbReviews.reverse();
                  allReviews = [...dbReviews, ...defaultReviews];
              }
          } else {
              let storedReviews = JSON.parse(localStorage.getItem('glb_reviews')) || [];
              allReviews = [...storedReviews, ...defaultReviews];
          }
      } catch (error) {
          console.error("Error fetching reviews from Firebase:", error);
      }

      const trackContent = allReviews.map(r => {
        const initial = (r.author || 'C').charAt(0).toUpperCase();
        const stars = '★'.repeat(r.rating || 5) + '☆'.repeat(5 - (r.rating || 5));
        return `
          <div class="glb-review-card-premium">
            <div class="glb-review-header">
              <div class="glb-review-avatar">${initial}</div>
              <div class="glb-review-meta">
                <h3 class="glb-review-name">${r.author || 'Client'}</h3>
                <p class="glb-review-role">Verified Client</p>
              </div>
            </div>
            <div class="glb-review-divider"></div>
            <p class="glb-review-text">"${r.text}"</p>
            <div class="glb-review-footer">
              <span class="glb-review-score">${(r.rating || 5).toFixed(1)}</span>
              <div class="glb-review-stars">${stars}</div>
            </div>
          </div>
        `;
      }).join('');

      const html = `
        <div class="glb-reviews-title-wrap" style="text-align:center;">
          <div style="display:inline-flex; align-items:center; gap:8px; background:#ffffff; border:1px solid rgba(0,0,0,0.08); padding:6px 18px; border-radius:30px; box-shadow:0 2px 10px rgba(0,0,0,0.04); margin-bottom:14px;">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/><path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/></svg>
            <span style="font-size:13px; font-weight:700; color:#1f2937;">Google Reviews <span style="color:#f59e0b; margin-left:4px;">5.0 ★★★★★</span></span>
          </div>
          <h2>Client Success Stories</h2>
          <p>What businesses say about working with Global Logic Media</p>
        </div>
        <div class="glb-elfsight-reviews-container" style="max-width: 1240px; margin: 0 auto; min-height: 220px; padding: 0 16px;">
          <!-- Elfsight Google Reviews | Untitled Google Reviews -->
          <div class="elfsight-app-1114eac3-3c77-4bd5-945e-3667c3537f46" data-elfsight-app-lazy></div>
        </div>
        <div class="glb-reviews-cta-wrap" style="text-align: center; margin-top: 36px;">
          <a href="https://g.page/r/CX4AGQkNUj-zECE/review" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display:inline-flex; align-items:center; gap:10px; padding: 14px 30px; font-size: 15px; font-weight: 700; border-radius: 30px; cursor: pointer; text-decoration: none; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(226, 0, 1, 0.25);">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#ffffff" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/><path fill="#ffffff" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/><path fill="#ffffff" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/><path fill="#ffffff" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/></svg>
            Write a Google Review
          </a>
        </div>
      `;
      let container = document.getElementById('glb-reviews-section');
      if (!container) {
          container = document.createElement('section');
          container.id = 'glb-reviews-section';
          container.className = 'glb-reviews-native-wrapper';
      }
      container.innerHTML = html;
      if (!document.querySelector('script[src*="elfsightcdn.com/platform.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://elfsightcdn.com/platform.js';
        script.async = true;
        document.head.appendChild(script);
      }

      function placeReviews() {
          const blogSection = document.querySelector('.glb-home-blogs');
          const locationSection = document.getElementById('glb-location');
          const footer = document.querySelector('footer.glb-footer');
          const body = document.body;

          if (blogSection && blogSection.parentNode) {
              blogSection.parentNode.insertBefore(container, blogSection);
          } else if (locationSection && locationSection.parentNode) {
              locationSection.parentNode.insertBefore(container, locationSection);
          } else if (footer && footer.parentNode) {
              footer.parentNode.insertBefore(container, footer);
          } else {
              body.appendChild(container);
          }
      }

      placeReviews();
      if (window.initHeadingWordReveals) setTimeout(window.initHeadingWordReveals, 60);

            // Aggressive Elfsight Badge & Owner Panel Remover
      function obliterateElfsightBadge() {
        // 1. Query all elements across the entire document
        const targets = document.querySelectorAll('a[href*="elfsight"], [class*="Badge"], [class*="badge"], [class*="branding"], [class*="Branding"], [class*="Watermark"], [class*="watermark"], [class*="Owner"], [class*="owner"], [class*="Toolbar"], [class*="toolbar"], [class*="Admin"], [class*="admin"]');
        targets.forEach(el => {
          const text = (el.innerText || el.textContent || '').trim();
          const href = el.getAttribute('href') || '';
          if (
            text.includes('Free Google') || 
            text.includes('Elfsight') || 
            text.includes('Widget') || 
            text.includes('widget owner') ||
            text.includes('Panel only seen') ||
            text.includes('only seen by') ||
            href.includes('elfsight')
          ) {
            el.style.setProperty('display', 'none', 'important');
            el.style.setProperty('visibility', 'hidden', 'important');
            el.style.setProperty('opacity', '0', 'important');
            el.remove();
          }
        });

        // 2. Deep recursive DOM & ShadowDOM search
        const deepPurge = (root) => {
          if (!root) return;
          const nodes = root.querySelectorAll ? root.querySelectorAll('*') : [];
          nodes.forEach(node => {
            if (node.shadowRoot) deepPurge(node.shadowRoot);
            const txt = (node.innerText || node.textContent || '').trim();
            const cls = (node.className && typeof node.className === 'string') ? node.className : '';
            
            // Check for owner panel text or classes
            if (
              txt.includes('Panel only seen') ||
              txt.includes('widget owner') ||
              txt.includes('only seen by widget owner') ||
              cls.includes('WidgetOwner') ||
              cls.includes('OwnerPanel') ||
              cls.includes('widget-toolbar') ||
              cls.includes('eapps-widget-toolbar')
            ) {
              node.style.setProperty('display', 'none', 'important');
              node.style.setProperty('visibility', 'hidden', 'important');
              node.style.setProperty('opacity', '0', 'important');
              node.remove();
            }

            if (node.tagName === 'A' && (node.href && node.href.includes('elfsight.com') || txt.includes('Free Google'))) {
              node.style.setProperty('display', 'none', 'important');
              node.remove();
            }
          });
        };

        deepPurge(document.body);
      }

      setInterval(obliterateElfsightBadge, 150);

  }

  function init() {
      if (window.firebaseReady) {
          loadDataAndRender();
      } else {
          window.addEventListener('firebaseLoaded', loadDataAndRender);
          setTimeout(loadDataAndRender, 1500);
      }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
