(function() {
  const styles = `
    .glb-blog-trigger {
      position: fixed;
      top: 30px;
      right: 30px;
      z-index: 9998;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      color: #eaeaea;
      padding: 12px 20px;
      border-radius: 8px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.5px;
      cursor: pointer;
      border: 1px solid rgba(255,255,255,0.1);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .glb-blog-trigger:hover {
      background: rgba(255, 255, 255, 0.15);
      color: #fff;
    }

    /* Drawer Overlay */
    .glb-blog-drawer-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      z-index: 9999;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.4s ease, visibility 0.4s ease;
    }

    .glb-blog-drawer-overlay.active {
      opacity: 1;
      visibility: visible;
    }

    /* Drawer Content */
    .glb-blog-drawer {
      position: absolute;
      top: 0;
      right: -100%;
      width: 100%;
      max-width: 600px;
      height: 100vh;
      background: #0a0a0a;
      border-left: 1px solid rgba(255,255,255,0.1);
      padding: 40px;
      box-sizing: border-box;
      overflow-y: auto;
      transition: right 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      color: #fff;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    
    .glb-blog-drawer-overlay.active .glb-blog-drawer {
      right: 0;
    }

    .glb-blog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    
    .glb-blog-title {
      font-size: 24px;
      font-weight: 700;
      background: linear-gradient(90deg, #fff, #aaa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .glb-blog-close {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      color: #aaa;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 16px;
      transition: all 0.2s ease;
    }
    
    .glb-blog-close:hover {
      background: rgba(255,255,255,0.15);
      color: #fff;
    }
    
    .glb-blog-card {
      background: linear-gradient(180deg, rgba(30,30,30,0.4) 0%, rgba(15,15,15,0.8) 100%);
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 20px;
      transition: transform 0.2s ease, border-color 0.2s ease;
    }
    
    .glb-blog-card:hover {
      transform: translateY(-4px);
      border-color: rgba(255,255,255,0.2);
    }
    
    .glb-blog-card-meta {
      font-size: 12px;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }
    
    .glb-blog-card-title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 12px;
      line-height: 1.4;
    }
    
    .glb-blog-card-excerpt {
      font-size: 15px;
      color: #aaa;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    
    .glb-blog-card-btn {
      display: inline-block;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      border-bottom: 1px solid #fff;
      padding-bottom: 2px;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  const blogHTML = `
    <!-- Top Nav Button -->
    <div class="glb-blog-trigger" id="glbTriggerBlog">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
      Our Blog
    </div>

    <!-- Drawer Overlay -->
    <div class="glb-blog-drawer-overlay" id="glbOverlayBlog">
      <div class="glb-blog-drawer">
        <div class="glb-blog-header">
          <div class="glb-blog-title">Latest Insights</div>
          <div class="glb-blog-close" id="glbCloseBlog">✕</div>
        </div>
        
        <!-- Blog List -->
        <div class="glb-blog-list">
          
          <div class="glb-blog-card">
            <div class="glb-blog-card-meta">Marketing • Aug 12, 2026</div>
            <div class="glb-blog-card-title">How to Leverage Meta Ads for Local Businesses</div>
            <div class="glb-blog-card-excerpt">Discover the exact strategies we use at Global Logic Media to generate high-quality leads using Facebook and Instagram ads for local brick-and-mortar stores.</div>
            <a href="#" class="glb-blog-card-btn">Read Article</a>
          </div>
          
          <div class="glb-blog-card">
            <div class="glb-blog-card-meta">SEO • Aug 05, 2026</div>
            <div class="glb-blog-card-title">The Future of SEO: AI Search & Ranking Factors</div>
            <div class="glb-blog-card-excerpt">Search engines are evolving faster than ever. Learn how to adapt your content strategy to rank higher in an AI-driven search landscape.</div>
            <a href="#" class="glb-blog-card-btn">Read Article</a>
          </div>
          
          <div class="glb-blog-card">
            <div class="glb-blog-card-meta">Design • Jul 28, 2026</div>
            <div class="glb-blog-card-title">Why First Impressions Matter: Web Design Basics</div>
            <div class="glb-blog-card-excerpt">Your website is your digital storefront. We explore the psychological impact of clean UI/UX and fast loading speeds on customer conversion rates.</div>
            <a href="#" class="glb-blog-card-btn">Read Article</a>
          </div>

        </div>
        
        <div style="text-align:center; margin-top: 40px; color: #666; font-size: 13px;">
          Note: To add more blogs, connect your CMS database.
        </div>
      </div>
    </div>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = blogHTML;
  document.body.appendChild(wrapper);

  const trigger = document.getElementById('glbTriggerBlog');
  const overlay = document.getElementById('glbOverlayBlog');
  const closeBtn = document.getElementById('glbCloseBlog');
  const drawer = overlay.querySelector('.glb-blog-drawer');

  function openBlog() {
    overlay.classList.add('active');
  }

  function closeBlog() {
    overlay.classList.remove('active');
  }

  trigger.addEventListener('click', openBlog);
  closeBtn.addEventListener('click', closeBlog);
  overlay.addEventListener('click', (e) => {
    // Only close if clicking the dark overlay, not the drawer itself
    if (e.target === overlay) closeBlog();
  });
})();
