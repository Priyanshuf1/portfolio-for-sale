(function() {
  const styles = `
    /* Common Native Container */
    .glb-native-section {
      width: 100%;
      background: #0a0a0a;
      padding: 80px 20px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      box-sizing: border-box;
      position: relative;
      z-index: 100;
    }
    
    .glb-section-title {
      font-size: 42px;
      font-weight: 800;
      text-align: center;
      margin-bottom: 60px;
      color: #fff;
      letter-spacing: -1px;
      background: linear-gradient(90deg, #fff, #999);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* Marquee Reviews */
    .glb-marquee-wrapper {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      position: relative;
      padding: 20px 0;
      /* Faded edges */
      mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
      -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    }
    
    .glb-marquee-track {
      display: inline-flex;
      gap: 30px;
      animation: marquee 35s linear infinite;
    }
    
    .glb-marquee-track:hover {
      animation-play-state: paused;
    }
    
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    
    .glb-review-card {
      width: 350px;
      height: auto;
      white-space: normal;
      background: linear-gradient(135deg, rgba(30,30,30,0.8) 0%, rgba(15,15,15,0.95) 100%);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px;
      padding: 30px;
      color: #eaeaea;
      box-sizing: border-box;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer;
    }
    
    .glb-review-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2);
    }
    
    .glb-review-stars {
      color: #ffd700;
      font-size: 20px;
      margin-bottom: 12px;
    }
    
    .glb-review-text {
      font-size: 15px;
      line-height: 1.6;
      color: #aaa;
      margin-bottom: 20px;
      font-style: italic;
    }
    
    .glb-review-author {
      font-weight: 600;
      font-size: 16px;
      color: #fff;
    }

    /* Native Blog Grid */
    .glb-blog-grid {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 40px;
    }
    
    .glb-blog-card-native {
      background: rgba(20,20,20,0.8);
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
    }
    
    .glb-blog-card-native:hover {
      transform: translateY(-8px) scale(1.02);
      border-color: rgba(255,255,255,0.2);
      box-shadow: 0 15px 30px rgba(0,0,0,0.6);
    }
    
    .glb-blog-image {
      width: 100%;
      height: 200px;
      background-size: cover;
      background-position: center;
      background-color: #222;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    
    .glb-blog-content {
      padding: 24px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
    
    .glb-blog-meta {
      font-size: 12px;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 12px;
    }
    
    .glb-blog-title {
      font-size: 22px;
      font-weight: 700;
      color: #fff;
      margin-bottom: 16px;
      line-height: 1.3;
    }
    
    .glb-blog-excerpt {
      font-size: 15px;
      color: #aaa;
      line-height: 1.6;
      margin-bottom: 24px;
      flex-grow: 1;
    }
    
    .glb-blog-btn {
      align-self: flex-start;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      border-bottom: 1px solid #fff;
      padding-bottom: 2px;
      transition: color 0.2s, border-color 0.2s;
    }
    
    .glb-blog-btn:hover {
      color: #aaa;
      border-color: #aaa;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  // Reviews Data
  const defaultReviews = [
    { author: "Sarah Jenkins", text: "Global Logic Media completely transformed our online presence. Our lead generation has 3x'd in just two months!", rating: 5 },
    { author: "Michael Chen", text: "The web design team is top-tier. They captured our brand perfectly and built a blazing fast site.", rating: 5 },
    { author: "Jessica Robles", text: "Highly recommend for SEO. We are finally ranking on page 1 of Google for our main keywords.", rating: 4 },
    { author: "David Wallace", text: "Amazing ROI on Meta Ads. Their strategy is data-driven and the results speak for themselves.", rating: 5 },
    { author: "Amanda Smith", text: "Professional, responsive, and incredibly talented. Best marketing agency we've ever hired.", rating: 5 }
  ];

  // Default Reviews and Blogs remain as fallbacks
  const defaultReviews = [
    { author: "Sarah Jenkins", text: "Global Logic Media completely transformed our online presence. Our lead generation has 3x'd in just two months!", rating: 5 },
    { author: "Michael Chen", text: "The web design team is top-tier. They captured our brand perfectly and built a blazing fast site.", rating: 5 },
    { author: "Jessica Robles", text: "Highly recommend for SEO. We are finally ranking on page 1 of Google for our main keywords.", rating: 4 },
    { author: "David Wallace", text: "Amazing ROI on Meta Ads. Their strategy is data-driven and the results speak for themselves.", rating: 5 },
    { author: "Amanda Smith", text: "Professional, responsive, and incredibly talented. Best marketing agency we've ever hired.", rating: 5 }
  ];

  const defaultBlogs = [
    { 
      title: "How to Leverage Meta Ads for Local Businesses", 
      excerpt: "Discover the exact strategies we use at Global Logic Media to generate high-quality leads using Facebook and Instagram ads for local brick-and-mortar stores.", 
      category: "Marketing", date: "Aug 12, 2026", 
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
    },
    { 
      title: "The Future of SEO: AI Search & Ranking Factors", 
      excerpt: "Search engines are evolving faster than ever. Learn how to adapt your content strategy to rank higher in an AI-driven search landscape.", 
      category: "SEO", date: "Aug 05, 2026", 
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
    },
    { 
      title: "Why First Impressions Matter: Web Design Basics", 
      excerpt: "Your website is your digital storefront. We explore the psychological impact of clean UI/UX and fast loading speeds on customer conversion rates.", 
      category: "Design", date: "Jul 28, 2026", 
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
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
                  // Reverse to get descending order
                  dbReviews.reverse();
                  allReviews = [...dbReviews, ...defaultReviews];
              }
          } else {
              // Fallback to local storage if Firebase fails
              let storedReviews = JSON.parse(localStorage.getItem('glb_reviews')) || [];
              allReviews = [...storedReviews, ...defaultReviews];
          }
      } catch (error) {
          console.error("Error fetching data from Firebase:", error);
      }

      const trackContent = allReviews.map(r => `
        <div class="glb-review-card-premium">
          <div class="glb-review-header">
            <div class="glb-review-avatar"></div>
            <div class="glb-review-meta">
              <h3 class="glb-review-name">${r.author}</h3>
              <p class="glb-review-role">Verified Client</p>
            </div>
          </div>
          <div class="glb-review-divider"></div>
          <p class="glb-review-text">"${r.text}"</p>
          <div class="glb-review-footer">
            <span class="glb-review-score">${(r.rating || 5).toFixed(1)}</span>
            <div class="glb-review-stars">${'★'.repeat(r.rating || 5)}${'☆'.repeat(5-(r.rating || 5))}</div>
          </div>
        </div>
      `).join('');

      const customCSS = `
        .glb-premium-reviews-container {
          width: 100%;
          overflow: hidden;
          padding: 20px 0;
          background: transparent;
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
          background: linear-gradient(180deg, #111111 0%, rgba(17,17,17,0.4) 100%);
          border-radius: 16px;
          padding: 30px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 20px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .glb-review-header {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .glb-review-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #333;
          flex-shrink: 0;
        }
        .glb-review-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .glb-review-name {
          margin: 0;
          color: #fff;
          font-size: 20px;
          font-weight: 600;
        }
        .glb-review-role {
          margin: 0;
          color: rgba(255,255,255,0.5);
          font-size: 14px;
        }
        .glb-review-divider {
          height: 1px;
          background: rgba(255,255,255,0.1);
          width: 100%;
        }
        .glb-review-text {
          color: rgba(255,255,255,0.7);
          font-size: 16px;
          line-height: 1.6;
          margin: 0;
          flex-grow: 1;
        }
        .glb-review-footer {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 10px;
        }
        .glb-review-score {
          color: #fff;
          font-size: 18px;
          font-weight: 600;
        }
        .glb-review-stars {
          color: #FFD700;
          font-size: 18px;
          letter-spacing: 2px;
        }
      `;
      
      const styleEl = document.createElement('style');
      styleEl.innerHTML = customCSS;
      document.head.appendChild(styleEl);

      const html = `
        <div class="glb-premium-reviews-container">
          <div class="glb-marquee-track">
            ${trackContent}
            ${trackContent}
          </div>
        </div>
      `;

      const framerTarget = document.querySelector('.framer-1pmfitp');
      if (framerTarget) {
          framerTarget.innerHTML = html;
      } else {
          console.error("Could not find the original reviews container (.framer-1pmfitp)");
      }
  }

  function init() {
      if (window.firebaseReady) {
          loadDataAndRender();
      } else {
          window.addEventListener('firebaseLoaded', loadDataAndRender);
          // Fallback if event never fires
          setTimeout(() => {
              if (!document.querySelector('.glb-marquee-wrapper')) loadDataAndRender();
          }, 2000);
      }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
