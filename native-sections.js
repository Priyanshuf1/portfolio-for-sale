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
    { author: "Sarah Jenkins", text: "Global Logic Media | Digital Marketing Agency in Lucknow | SEO, Web Design & Lead Generation|Global Logic Media | Digital Marketing Agency in Lucknow | SEO, Web Design & Lead Generation|Global Logic Media | Digital Marketing Agency in Lucknow | SEO, Web Design & Lead Generationcompletely transformed our online presence. Our lead generation has 3x'd in just two months!", rating: 5 },
    { author: "Michael Chen", text: "The web design team is top-tier. They captured our brand perfectly and built a blazing fast site.", rating: 5 },
    { author: "Jessica Robles", text: "Highly recommend for SEO. We are finally ranking on page 1 of Google for our main keywords.", rating: 4 },
    { author: "David Wallace", text: "Amazing ROI on Meta Ads. Their strategy is data-driven and the results speak for themselves.", rating: 5 },
    { author: "Amanda Smith", text: "Professional, responsive, and incredibly talented. Best marketing agency we've ever hired.", rating: 5 }
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
        <div class="glb-reviews-title-wrap">
          <h2>Client Success Stories</h2>
          <p>What businesses say about working with Global Logic Media</p>
        </div>
        <div class="glb-premium-reviews-container">
          <div class="glb-marquee-track">
            ${trackContent}
            ${trackContent}
          </div>
        </div>
        <div class="glb-reviews-cta-wrap" style="text-align: center; margin-top: 30px;">
          <button id="glbTriggerReview" class="btn-primary" style="padding: 12px 28px; font-size: 15px; font-weight: 700; border-radius: 25px; cursor: pointer; transition: all 0.3s ease;">
            Leave a Review
          </button>
        </div>
      `;

      let container = document.getElementById('glb-reviews-section');
      if (!container) {
          container = document.createElement('section');
          container.id = 'glb-reviews-section';
          container.className = 'glb-reviews-native-wrapper';
      }
      container.innerHTML = html;

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
