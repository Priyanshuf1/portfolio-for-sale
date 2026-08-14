(function() {
  const styles = `
    .glb-home-blogs {
      padding: 60px 5%;
      background: var(--bg, #0a0a0a);
      color: white;
      font-family: 'Inter', sans-serif;
      position: relative;
      z-index: 10;
    }
    .glb-home-blogs-header {
      text-align: center;
      margin-bottom: 40px;
    }
    .glb-home-blogs-header h2 {
      font-size: 2.5rem;
      margin: 0;
      background: linear-gradient(180deg, #FFFFFF 0%, #888888 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -1px;
    }
    .glb-home-blogs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .glb-home-blog-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      text-decoration: none;
      color: white;
      transition: transform 0.3s, border-color 0.3s;
    }
    .glb-home-blog-card:hover {
      transform: translateY(-5px);
      border-color: rgba(255, 255, 255, 0.2);
    }
    .glb-home-blog-img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .glb-home-blog-content {
      padding: 20px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
    .glb-home-blog-meta {
      display: flex;
      justify-content: space-between;
      color: #888;
      font-size: 13px;
      text-transform: uppercase;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .glb-home-blog-title {
      font-size: 1.2rem;
      margin: 0 0 10px;
      line-height: 1.4;
      font-weight: 600;
    }
    .glb-home-blog-excerpt {
      color: #888;
      font-size: 14px;
      line-height: 1.6;
      margin: 0;
      flex-grow: 1;
    }
    .glb-home-blogs-btn-wrapper {
      text-align: center;
      margin-top: 40px;
    }
    .glb-home-blogs-btn {
      display: inline-block;
      padding: 12px 24px;
      background: transparent;
      color: white;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 8px;
      text-decoration: none;
      font-weight: 500;
      transition: background 0.3s;
    }
    .glb-home-blogs-btn:hover {
      background: rgba(255,255,255,0.1);
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

      // Take only the top 3
      const top3 = allBlogs.slice(0, 3);

      let cardsHtml = top3.map(blog => `
          <a href="./blog.html" class="glb-home-blog-card">
              <img src="\${blog.image}" class="glb-home-blog-img" alt="\${blog.title}">
              <div class="glb-home-blog-content">
                  <div class="glb-home-blog-meta">
                      <span style="color:#4ade80">\${blog.category}</span>
                      <span>\${blog.date}</span>
                  </div>
                  <h3 class="glb-home-blog-title">\${blog.title}</h3>
                  <p class="glb-home-blog-excerpt">\${blog.excerpt}</p>
              </div>
          </a>
      `).join('');

      const html = `
        <div class="glb-home-blogs">
          <div class="glb-home-blogs-header">
            <h2>Latest Insights</h2>
          </div>
          <div class="glb-home-blogs-grid">
            \${cardsHtml}
          </div>
          <div class="glb-home-blogs-btn-wrapper">
            <a href="./blog.html" class="glb-home-blogs-btn">View All Articles</a>
          </div>
        </div>
      `;

      const styleEl = document.createElement('style');
      styleEl.innerHTML = styles;
      document.head.appendChild(styleEl);

      const container = document.createElement('section');
      container.innerHTML = html;

      // Insert right above the custom footer
      let footer = document.querySelector('footer.glb-footer');
      let mainRoot = document.getElementById('main') || document.body;
      if (footer && footer.parentNode) {
          footer.parentNode.insertBefore(container, footer);
      } else {
          mainRoot.appendChild(container);
      }
  }

  if (window.firebaseReady) {
      loadHomeBlogs();
  } else {
      window.addEventListener('firebase-ready', loadHomeBlogs);
      setTimeout(loadHomeBlogs, 3000);
  }

})();
