(function() {
  const styles = `
    .glb-admin-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9998;
      background: #4ade80;
      color: #111;
      border: none;
      padding: 12px 20px;
      font-size: 14px;
      font-weight: 700;
      border-radius: 8px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      transition: all 0.3s ease;
    }
    
    .glb-admin-btn:hover {
      background: #3ac06a;
      transform: translateY(-2px);
    }
    
    .glb-admin-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(12px);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.4s ease, visibility 0.4s ease;
    }

    .glb-admin-overlay.active {
      opacity: 1;
      visibility: visible;
    }

    .glb-admin-content {
      background: #111;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 20px;
      width: 90%;
      max-width: 600px;
      padding: 40px;
      color: #fff;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      box-shadow: 0 20px 40px rgba(0,0,0,0.8);
      transform: translateY(20px);
      transition: transform 0.4s ease;
      position: relative;
    }
    
    .glb-admin-overlay.active .glb-admin-content {
      transform: translateY(0);
    }
    
    .glb-admin-close {
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      color: #aaa;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 16px;
      transition: all 0.2s ease;
    }
    
    .glb-admin-close:hover {
      background: rgba(255,255,255,0.15);
      color: #fff;
    }

    .glb-admin-title {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 20px;
      text-align: center;
      color: white;
    }
    
    .glb-admin-tabs {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding-bottom: 10px;
    }
    
    .glb-admin-tab {
      flex: 1;
      text-align: center;
      padding: 8px;
      color: #a0a0a0;
      cursor: pointer;
      font-weight: 500;
      transition: 0.2s;
    }
    
    .glb-admin-tab.active {
      color: white;
      border-bottom: 2px solid #4ade80;
    }
    
    .glb-tab-content {
      display: none;
    }
    
    .glb-tab-content.active {
      display: block;
    }
    
    .glb-pending-review {
      background: rgba(255,255,255,0.05);
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 15px;
      border: 1px solid rgba(255,255,255,0.1);
    }
    
    .glb-pending-review p { margin: 5px 0; font-size: 14px; }
    
    .glb-approve-btn {
      background: #4ade80; color: #111; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: 600; margin-top: 10px;
    }

    .glb-form-group {
      margin-bottom: 20px;
    }
    
    .glb-form-group label {
      display: block;
      margin-bottom: 8px;
      font-size: 13px;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .glb-form-group input, .glb-form-group textarea, .glb-form-group select {
      width: 100%;
      padding: 14px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px;
      color: #fff;
      font-family: inherit;
      font-size: 15px;
      outline: none;
      box-sizing: border-box;
    }
    
    .glb-form-group input:focus, .glb-form-group textarea:focus {
      border-color: #4ade80;
    }
    
    .glb-admin-submit {
      width: 100%;
      background: #4ade80;
      color: #000;
      padding: 14px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    
    .glb-admin-submit:hover {
      transform: translateY(-2px);
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  const html = `
    <!-- Floating Admin Trigger -->
    <div class="glb-admin-btn" id="glbTriggerAdmin">
      Admin
    </div>

    <!-- Admin Overlay -->
    <div class="glb-admin-overlay" id="glbOverlayAdmin">
      <div class="glb-admin-content">
        <div class="glb-admin-close" id="glbCloseAdmin">✕</div>
        <div class="glb-admin-title">Admin Dashboard</div>
        
        <div class="glb-admin-tabs">
          <div class="glb-admin-tab active" data-tab="blog">Publish Blog</div>
          <div class="glb-admin-tab" data-tab="reviews">Approve Reviews</div>
        </div>

        <div class="glb-tab-content active" id="tab-blog">
          <form id="glbAdminForm">
            <div class="glb-form-group">
              <label>Blog Title</label>
              <input type="text" id="adminBlogTitle" required placeholder="Enter title...">
            </div>
            <div class="glb-form-group">
              <label>Category</label>
              <select id="adminBlogCategory">
                <option value="Marketing">Marketing</option>
                <option value="SEO">SEO</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
              </select>
            </div>
            <div class="glb-form-group">
              <label>Cover Image URL</label>
              <input type="url" id="adminBlogImage" required placeholder="https://unsplash.com/...">
            </div>
            <div class="glb-form-group">
              <label>Excerpt / Content</label>
              <textarea id="adminBlogExcerpt" rows="4" required placeholder="Write your blog content here..."></textarea>
            </div>
            <button type="submit" class="glb-admin-submit">Publish to Website</button>
          </form>
        </div>

        <div class="glb-tab-content" id="tab-reviews">
          <div id="glbPendingReviewsList">
            <p style="color:#a0a0a0; text-align:center;">Loading pending reviews...</p>
          </div>
        </div>
      </div>
    </div>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  const trigger = document.getElementById('glbTriggerAdmin');
  const overlay = document.getElementById('glbOverlayAdmin');
  const closeBtn = document.getElementById('glbCloseAdmin');
  const form = document.getElementById('glbAdminForm');

  trigger.addEventListener('click', () => overlay.classList.add('active'));
  closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
  
  const tabs = document.querySelectorAll('.glb-admin-tab');
  const contents = document.querySelectorAll('.glb-tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
      
      if(tab.dataset.tab === 'reviews') {
        fetchPendingReviews();
      }
    });
  });

  async function fetchPendingReviews() {
    const list = document.getElementById('glbPendingReviewsList');
    if(!window.firebaseDB) {
      list.innerHTML = '<p style="color:red;">Firebase not connected.</p>';
      return;
    }
    
    try {
      const snapshot = await window.firebaseDB.ref("reviews").once('value');
      let html = '';
      if (snapshot.exists()) {
          snapshot.forEach(childSnapshot => {
              const rev = childSnapshot.val();
              const key = childSnapshot.key;
              if (rev.status === 'pending') {
                  html += `
                    <div class="glb-pending-review" id="review-${key}">
                      <p><strong>${rev.author}</strong> (${rev.rating} stars)</p>
                      <p>"${rev.text}"</p>
                      <button class="glb-approve-btn" onclick="window.approveReview('${key}')">Approve Review</button>
                    </div>
                  `;
              }
          });
      }
      if(html === '') html = '<p style="color:#a0a0a0; text-align:center;">No pending reviews.</p>';
      list.innerHTML = html;
    } catch(e) {
      list.innerHTML = '<p style="color:red;">Error fetching reviews.</p>';
    }
  }

  window.approveReview = async function(key) {
    if(!window.firebaseDB) return;
    const btn = document.querySelector(`#review-${key} .glb-approve-btn`);
    btn.innerText = 'Approving...';
    try {
      await window.firebaseDB.ref("reviews/" + key).update({ status: 'approved' });
      document.getElementById(`review-${key}`).style.display = 'none';
      alert("Review approved and is now live!");
    } catch(e) {
      alert("Error approving: " + e.message);
      btn.innerText = 'Approve Review';
    }
  };

  form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Publishing...';
      submitBtn.disabled = true;

      try {
        const newBlog = {
            title: document.getElementById('adminBlogTitle').value,
            category: document.getElementById('adminBlogCategory').value,
            image: document.getElementById('adminBlogImage').value,
            excerpt: document.getElementById('adminBlogExcerpt').value,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            createdAt: firebase.database.ServerValue.TIMESTAMP
        };
        
        if (window.firebaseDB) {
          const addPromise = window.firebaseDB.ref("blogs").push(newBlog);
          const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout: Database connection failed. Please ensure you clicked 'Create Database' in Firebase Realtime Database.")), 8000));
          await Promise.race([addPromise, timeoutPromise]);
        } else {
          // Fallback
          let storedBlogs = JSON.parse(localStorage.getItem('glb_blogs')) || [];
          storedBlogs.unshift(newBlog);
          localStorage.setItem('glb_blogs', JSON.stringify(storedBlogs));
        }
        
        overlay.classList.remove('active');
        form.reset();
        
        // Reload to show the new blog in the native section
        setTimeout(() => {
            window.location.reload();
        }, 500);
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Database Error: " + error.message);
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
  });
})();
