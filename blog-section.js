(function() {
  const styles = `
    .glb-home-blogs {
      padding: 80px 5%;
      background: transparent;
      color: #111111;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      position: relative;
      z-index: 10;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
    }
    .glb-home-blogs-header {
      text-align: center;
      margin-bottom: 50px;
    }
    .glb-home-blogs-badge {
      display: inline-block;
      padding: 6px 14px;
      background: rgba(226, 0, 1, 0.06);
      border: 1px solid rgba(226, 0, 1, 0.25);
      color: #e20001;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      border-radius: 20px;
      margin-bottom: 12px;
    }
    .glb-home-blogs-header h2 {
      font-size: clamp(2rem, 4vw, 3rem);
      margin: 0 0 10px;
      background: linear-gradient(180deg, #111111 0%, #444444 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -1px;
      font-weight: 700;
    }
    .glb-home-blogs-header p {
      color: #666;
      font-size: 1.1rem;
      margin: 0;
    }
    .glb-home-blogs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 28px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .glb-home-blog-card {
      background: #FFFDF0;
      border: 1px solid rgba(226, 160, 0, 0.15);
      border-radius: 18px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      text-decoration: none;
      color: #333333;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .glb-home-blog-card:hover {
      border-color: rgba(226, 160, 0, 0.4);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.03);
    }
    .glb-home-blog-img-wrap {
      width: 100%;
      height: 210px;
      overflow: hidden;
      position: relative;
    }
    .glb-home-blog-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .glb-home-blog-card:hover .glb-home-blog-img {
      transform: scale(1.06);
    }
    .glb-home-blog-content {
      padding: 24px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
    .glb-home-blog-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #888;
      font-size: 12px;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.5px;
      margin-bottom: 12px;
    }
    .glb-home-blog-category {
      color: #e20001;
      background: rgba(226, 0, 1, 0.06);
      padding: 3px 10px;
      border-radius: 12px;
    }
    .glb-home-blog-title {
      font-size: 1.25rem;
      margin: 0 0 12px;
      line-height: 1.4;
      font-weight: 600;
      color: #111111;
    }
    .glb-home-blog-excerpt {
      color: #555555;
      font-size: 14px;
      line-height: 1.6;
      margin: 0 0 20px;
      flex-grow: 1;
    }
    .glb-home-blog-read {
      color: #e20001;
      font-size: 14px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: color 0.2s;
    }
    .glb-home-blog-card:hover .glb-home-blog-read {
      color: #a30000;
    }
    .glb-home-blogs-btn-wrapper {
      text-align: center;
      margin-top: 50px;
    }
    .glb-home-blogs-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 16px 36px;
      background: #FFFDF0;
      color: #111;
      border: 1px solid rgba(226, 0, 1, 0.25);
      border-radius: 30px;
      text-decoration: none;
      font-weight: 700;
      font-size: 16px;
      transition: all 0.3s ease;
    }
    .glb-home-blogs-btn:hover {
      background: #e20001;
      color: #fff;
      border-color: #e20001;
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(226, 0, 1, 0.2);
    }
  `;

  const defaultBlogs = [
      { 
        title: "10 Reasons Why You Need a Premium Website", 
        excerpt: "A website is no longer just a digital business card. Learn how premium design converts visitors into high-paying clients automatically.", 
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

  async function loadHomeBlogs() {
      let allBlogs = [...defaultBlogs];
      
      try {
          if (window.firebaseDB) {
              const snapshot = await window.firebaseDB.ref("blogs").orderByChild("createdAt").limitToLast(3).once('value');
              if (snapshot.exists()) {
                  let dbBlogs = [];
                  snapshot.forEach(child => dbBlogs.push(child.val()));
                  dbBlogs.reverse();
                  allBlogs = [...dbBlogs, ...defaultBlogs];
              }
          } else {
              let storedBlogs = JSON.parse(localStorage.getItem('glb_blogs')) || [];
              allBlogs = [...storedBlogs, ...defaultBlogs];
          }
      } catch (e) {
          console.error("Error fetching blogs for home:", e);
      }

      // Take top 3 unique blogs
      const top3 = allBlogs.slice(0, 3);

      let cardsHtml = top3.map(blog => `
          <a href="./blog.html" class="glb-home-blog-card">
              <div class="glb-home-blog-img-wrap">
                  <img src="${blog.image}" class="glb-home-blog-img" alt="${blog.title}">
              </div>
              <div class="glb-home-blog-content">
                  <div class="glb-home-blog-meta">
                      <span class="glb-home-blog-category">${blog.category}</span>
                      <span>${blog.date}</span>
                  </div>
                  <h3 class="glb-home-blog-title">${blog.title}</h3>
                  <p class="glb-home-blog-excerpt">${blog.excerpt}</p>
                  <span class="glb-home-blog-read">Read Article →</span>
              </div>
          </a>
      `).join('');

      const html = `
        <div class="glb-home-blogs">
          <div class="glb-home-blogs-header">
            <span class="glb-home-blogs-badge">OUR JOURNAL</span>
            <h2>Latest Insights & Strategy</h2>
            <p>Industry trends, growth tactics, and digital marketing insights from our team</p>
          </div>
          <div class="glb-home-blogs-grid">
            ${cardsHtml}
          </div>
          <div class="glb-home-blogs-btn-wrapper">
            <a href="./blog.html" class="glb-home-blogs-btn">View All Articles &rarr;</a>
          </div>
        </div>
      `;

      const styleEl = document.createElement('style');
      styleEl.innerHTML = styles;
      document.head.appendChild(styleEl);

      const container = document.createElement('section');
      container.className = 'glb-home-blogs-section-wrapper';
      container.innerHTML = html;

      // Insert right above location section or custom footer
      let locationSec = document.getElementById('glb-location');
      let footer = document.querySelector('footer.glb-footer');
      let mainRoot = document.body;

      if (locationSec && locationSec.parentNode) {
          locationSec.parentNode.insertBefore(container, locationSec);
      } else if (footer && footer.parentNode) {
          footer.parentNode.insertBefore(container, footer);
      } else {
          mainRoot.appendChild(container);
      }
  }

  if (window.firebaseReady) {
      loadHomeBlogs();
  } else {
      window.addEventListener('firebaseLoaded', loadHomeBlogs);
      setTimeout(loadHomeBlogs, 1500);
  }

})();
