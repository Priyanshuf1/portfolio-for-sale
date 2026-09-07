(function() {
  const customCSS = `
    .glb-reviews-native-wrapper {
      width: 100%;
      background: transparent;
      padding: 70px 0;
      box-sizing: border-box;
      position: relative;
      z-index: 10;
    }
    .glb-reviews-title-wrap {
      text-align: center;
      margin-bottom: 36px;
      padding: 0 20px;
    }
    .glb-google-badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #ffffff;
      border: 1px solid rgba(0,0,0,0.08);
      padding: 7px 18px;
      border-radius: 30px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      margin-bottom: 14px;
    }
    .glb-reviews-title-wrap h2 {
      font-size: clamp(2.2rem, 5vw, 3.2rem);
      margin: 0 0 10px;
      color: #111827;
      letter-spacing: -1px;
      font-weight: 800;
    }
    .glb-reviews-title-wrap p {
      color: #64748b;
      font-size: 1.1rem;
      margin: 0;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    .glb-premium-reviews-container {
      width: 100%;
      overflow: hidden;
      padding: 14px 0 24px;
      background: transparent;
      mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
      -webkit-mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
    }
    .glb-marquee-track {
      display: flex;
      gap: 22px;
      width: max-content;
      animation: glb-marquee 45s linear infinite;
    }
    .glb-marquee-track:hover {
      animation-play-state: paused;
    }
    @keyframes glb-marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .glb-review-card-premium {
      flex: 0 0 360px;
      width: 360px;
      background: #ffffff;
      border-radius: 18px;
      padding: 24px 26px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 14px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.04);
      white-space: normal;
      transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .glb-review-card-premium:hover {
      transform: translateY(-4px);
      border-color: rgba(226, 0, 1, 0.25);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.09), 0 0 15px rgba(226, 0, 1, 0.05);
    }
    .glb-review-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .glb-review-avatar-wrap {
      width: 46px;
      height: 46px;
      position: relative;
      flex-shrink: 0;
    }
    .glb-review-avatar-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      display: block;
      border: 1.5px solid rgba(0,0,0,0.06);
    }
    .glb-review-avatar-fallback {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: linear-gradient(135deg, #e20001, #ffc72c);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-weight: 700;
      font-size: 18px;
      text-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
    .glb-review-meta {
      display: flex;
      flex-direction: column;
      gap: 3px;
      flex-grow: 1;
      min-width: 0;
    }
    .glb-review-name-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
    }
    .glb-review-name {
      margin: 0;
      color: #111827;
      font-size: 15.5px;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .glb-review-sub-row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: #64748b;
    }
    .glb-review-divider {
      height: 1px;
      background: rgba(0, 0, 0, 0.06);
      width: 100%;
    }
    .glb-review-text {
      color: #334155;
      font-size: 14px;
      line-height: 1.6;
      margin: 0;
      flex-grow: 1;
    }
    .glb-review-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
      padding-top: 4px;
    }
    .glb-review-stars {
      color: #f59e0b;
      font-size: 15px;
      letter-spacing: 2px;
    }
    .glb-review-rating-num {
      color: #374151;
      font-size: 13px;
      font-weight: 700;
    }
    .glb-reviews-cta-wrap {
      text-align: center;
      margin-top: 36px;
    }
    .glb-google-review-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: #e20001;
      color: #ffffff !important;
      padding: 13px 28px;
      font-size: 14.5px;
      font-weight: 700;
      border-radius: 30px;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 4px 16px rgba(226, 0, 1, 0.28);
    }
    .glb-google-review-btn:hover {
      background: #b80001;
      transform: translateY(-2px);
      box-shadow: 0 8px 22px rgba(226, 0, 1, 0.38);
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
      author: "Shiv Nirmal",
      avatar: "./images/reviews/shiv.png",
      rating: 5,
      date: "2 days ago",
      text: "Outstanding video editing and promotion service! The editing quality, transitions, effects, music, and overall presentation were excellent. The promotional content was creative, engaging, and professionally designed. The work was completed on time and perfectly matched our requirements."
    },
    {
      author: "Ayushi Vaishnav",
      avatar: "./images/reviews/ayushi.png",
      rating: 5,
      date: "2 days ago",
      text: "Really happy with the digital marketing services. The team understood our business requirements properly and created a practical strategy instead of just focusing on posting content. Communication and reporting have also been very smooth"
    },
    {
      author: "Zoya Hashmi",
      avatar: "./images/reviews/zoya.png",
      rating: 5,
      date: "2 days ago",
      text: "Working with them gave us a much better understanding of how digital marketing should actually be planned. They explain things patiently and the suggestions are practical rather than just being sales-focused."
    },
    {
      author: "Ankur Verma",
      avatar: "./images/reviews/ankur_v.png",
      rating: 5,
      date: "2 days ago",
      text: "Their content marketing approach is different from what we had experienced before. They focus on creating content around the audience and business goals instead of simply making promotional posts. The content quality and consistency have been excellent."
    },
    {
      author: "Viskhakha",
      avatar: "./images/reviews/vishakha.png",
      rating: 5,
      date: "2 days ago",
      text: "The social media marketing has been handled really well. The content looks professional, the posting is consistent, and the team actually focuses on audience engagement and brand growth. Overall, a good experience."
    },
    {
      author: "Pragati Jaiswal",
      avatar: "./images/reviews/pragati.png",
      rating: 5,
      date: "2 days ago",
      text: "We hired them for SEO services and have seen a noticeable improvement in our website visibility. Their keyword research, on-page SEO and content strategy are well planned. Good option if you're looking for a professional SEO agency."
    },
    {
      author: "Priyanshu Pro",
      avatar: "./images/reviews/priyanshu_pro.png",
      rating: 5,
      date: "2 days ago",
      text: "Global Logic Media completely transformed our online presence in Lucknow. Our lead generation tripled in just two months with their targeted Google & Meta campaigns!"
    },
    {
      author: "Janesh Narayan",
      avatar: "./images/reviews/janesh.png",
      rating: 5,
      date: "3 days ago",
      text: "If you're looking for a reliable digital services partner in Lucknow who actually delivers results and treats your business like their own, this team is highly recommended!"
    },
    {
      author: "Rajlaxmi Maharana",
      avatar: "./images/reviews/rajlaxmi.png",
      rating: 5,
      date: "2 days ago",
      text: "Exceptional branding, design aesthetics, and strategy from start to finish. Highly professional team!"
    }
  ];

  async function loadDataAndRender() {
      let allReviews = [...defaultReviews];
      
      try {
          if (window.firebaseDB) {
              const snapshot = await window.firebaseDB.ref("reviews").orderByChild("createdAt").once("value");
              if (snapshot.exists()) {
                  let dbReviews = [];
                  snapshot.forEach(childSnapshot => {
                      const rev = childSnapshot.val();
                      if (rev.status === "approved" || !rev.status) {
                          dbReviews.push(rev);
                      }
                  });
                  dbReviews.reverse();
                  allReviews = [...dbReviews, ...defaultReviews];
              }
          } else {
              let storedReviews = JSON.parse(localStorage.getItem("glb_reviews")) || [];
              allReviews = [...storedReviews, ...defaultReviews];
          }
      } catch (error) {
          console.error("Error fetching reviews from Firebase:", error);
      }

      const renderCard = (r) => {
        const initial = (r.author || "C").charAt(0).toUpperCase();
        const stars = "★".repeat(r.rating || 5);
        const avatarHtml = r.avatar ? `
          <img src="${r.avatar}" alt="${r.author}" class="glb-review-avatar-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          <div class="glb-review-avatar-fallback" style="display:none;">${initial}</div>
        ` : `
          <div class="glb-review-avatar-fallback">${initial}</div>
        `;

        return `
          <div class="glb-review-card-premium">
            <div class="glb-review-header">
              <div class="glb-review-avatar-wrap">
                ${avatarHtml}
              </div>
              <div class="glb-review-meta">
                <div class="glb-review-name-row">
                  <h3 class="glb-review-name">${r.author || 'Client'}</h3>
                  <svg width="15" height="15" viewBox="0 0 24 24" style="flex-shrink:0;"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/><path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/></svg>
                </div>
                <div class="glb-review-sub-row">
                  <span>Verified Google Review</span>
                  <span>•</span>
                  <span>${r.date || 'Recent'}</span>
                </div>
              </div>
            </div>
            <div class="glb-review-divider"></div>
            <p class="glb-review-text">"${r.text}"</p>
            <div class="glb-review-footer">
              <div class="glb-review-stars">${stars}</div>
              <span class="glb-review-rating-num">5.0 ★</span>
            </div>
          </div>
        `;
      };

      const baseCards = allReviews.map(renderCard).join('');
      // Duplicate cards to ensure seamless infinite looping marquee
      const trackCards = baseCards + baseCards;

      const html = `
        <div class="glb-reviews-title-wrap">
          <div class="glb-google-badge-pill">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/><path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/></svg>
            <span style="font-size:13.5px; font-weight:700; color:#1f2937;">Google Reviews <span style="color:#f59e0b; margin-left:4px;">5.0 ★★★★★</span></span>
          </div>
          <h2>Client Success Stories</h2>
          <p>What businesses say about working with Global Logic Media</p>
        </div>
        <div class="glb-premium-reviews-container">
          <div class="glb-marquee-track">
            ${trackCards}
          </div>
        </div>
        <div class="glb-reviews-cta-wrap">
          <a href="https://maps.app.goo.gl/tF9Fe3ttDe85xfBFA" target="_blank" rel="noopener noreferrer" class="glb-google-review-btn">
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
          setTimeout(loadDataAndRender, 1000);
      }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
