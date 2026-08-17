(function() {
  // === SECURITY CONFIG ===
  const ADMIN_PASSWORD = 'GLM@Admin2025'; // Default admin password

  const styles = `
    /* Admin Nav Link */
    .glb-admin-nav-btn {
      display: inline-block;
      padding: 8px 16px;
      background: transparent;
      color: rgba(255, 255, 255, 0.5);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 6px;
      font-size: 13px;
      font-family: inherit;
      cursor: pointer;
      transition: all 0.2s;
      margin-left: 16px;
      white-space: nowrap;
    }
    .glb-admin-nav-btn:hover {
      color: white;
      border-color: rgba(255,255,255,0.4);
    }

    /* Password Gate */
    .glb-admin-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
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
      max-width: 650px;
      max-height: 90vh;
      overflow-y: auto;
      padding: 35px;
      position: relative;
      color: white;
      font-family: 'Inter', system-ui, sans-serif;
    }
    .glb-admin-close {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: rgba(255,255,255,0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 16px;
      color: #888;
      border: none;
      transition: 0.2s;
    }
    .glb-admin-close:hover { background: rgba(255,255,255,0.15); color: white; }

    /* Password Screen */
    .glb-password-screen {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 20px;
    }
    .glb-password-screen h3 {
      font-size: 1.8rem;
      margin: 0;
      background: linear-gradient(180deg, #fff 0%, #888 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .glb-password-screen p {
      color: #888;
      margin: 0;
    }
    .glb-password-input-wrap {
      width: 100%;
      display: flex;
      gap: 10px;
    }
    .glb-password-input-wrap input {
      flex: 1;
      padding: 14px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px;
      color: white;
      font-size: 16px;
      outline: none;
      transition: border-color 0.2s;
    }
    .glb-password-input-wrap input:focus { border-color: #4ade80; }
    .glb-password-submit {
      padding: 14px 20px;
      background: #4ade80;
      color: #111;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 700;
      font-size: 15px;
      transition: background 0.2s;
    }
    .glb-password-submit:hover { background: #3ac06a; }
    .glb-password-error {
      color: #f87171;
      font-size: 14px;
      display: none;
    }

    /* Admin Dashboard */
    .glb-admin-dashboard { display: none; }
    .glb-admin-dashboard.visible { display: block; }

    .glb-admin-title {
      font-size: 1.6rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 24px;
      color: white;
    }
    .glb-admin-tabs {
      display: flex;
      gap: 4px;
      margin-bottom: 24px;
      background: rgba(255,255,255,0.04);
      border-radius: 10px;
      padding: 4px;
    }
    .glb-admin-tab {
      flex: 1;
      text-align: center;
      padding: 10px;
      color: #888;
      cursor: pointer;
      font-weight: 500;
      border-radius: 8px;
      font-size: 14px;
      transition: 0.2s;
    }
    .glb-admin-tab.active {
      color: white;
      background: rgba(255,255,255,0.08);
    }
    .glb-tab-content { display: none; }
    .glb-tab-content.active { display: block; }

    /* Reviews Management Cards */
    .glb-review-section-header {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #4ade80;
      margin: 20px 0 12px;
      padding-bottom: 6px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .glb-pending-review {
      background: rgba(255,255,255,0.04);
      padding: 16px;
      border-radius: 10px;
      margin-bottom: 14px;
      border: 1px solid rgba(255,255,255,0.08);
    }
    .glb-pending-review strong { color: #fff; }
    .glb-pending-review p { margin: 5px 0; font-size: 14px; color: #ccc; }
    .glb-review-action-btns {
      display: flex;
      gap: 10px;
      margin-top: 12px;
    }
    .glb-approve-btn {
      background: #4ade80; color: #111; border: none;
      padding: 7px 14px; border-radius: 6px; cursor: pointer;
      font-size: 13px; font-weight: 700;
      transition: background 0.2s;
    }
    .glb-approve-btn:hover { background: #3ac06a; }
    .glb-delete-btn {
      background: rgba(248, 113, 113, 0.15);
      color: #f87171;
      border: 1px solid rgba(248, 113, 113, 0.3);
      padding: 7px 14px; border-radius: 6px; cursor: pointer;
      font-size: 13px; font-weight: 600;
      transition: all 0.2s;
    }
    .glb-delete-btn:hover {
      background: #f87171;
      color: #fff;
    }

    /* Blog Form */
    .glb-form-group { margin-bottom: 18px; }
    .glb-form-group label {
      display: block; margin-bottom: 7px; font-size: 12px;
      color: #888; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;
    }
    .glb-form-group input, .glb-form-group textarea, .glb-form-group select {
      width: 100%; padding: 12px 14px; background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff;
      font-size: 15px; font-family: inherit; outline: none; box-sizing: border-box;
      transition: border-color 0.2s;
    }
    .glb-form-group input:focus, .glb-form-group textarea:focus, .glb-form-group select:focus {
      border-color: #4ade80;
    }
    .glb-form-group select option { background: #1a1a1a; }
    .glb-admin-submit {
      width: 100%; padding: 14px; background: #4ade80; color: #111;
      border: none; border-radius: 8px; cursor: pointer; font-weight: 700;
      font-size: 16px; transition: background 0.2s;
    }
    .glb-admin-submit:hover { background: #3ac06a; }
    .glb-admin-submit:disabled { opacity: 0.6; cursor: not-allowed; }
  `;

  const html = `
    <div class="glb-admin-overlay" id="glbOverlayAdmin">
      <div class="glb-admin-content">
        <button class="glb-admin-close" id="glbCloseAdmin">✕</button>

        <!-- Password Gate -->
        <div class="glb-password-screen" id="glbPasswordScreen">
          <div style="font-size:40px;">🔐</div>
          <h3>Admin Access</h3>
          <p>Enter your admin password to continue.</p>
          <div class="glb-password-input-wrap">
            <input type="password" id="glbPasswordInput" placeholder="Enter password..." autocomplete="current-password">
            <button class="glb-password-submit" id="glbPasswordSubmit">Unlock</button>
          </div>
          <span class="glb-password-error" id="glbPasswordError">Incorrect password. Try again.</span>
        </div>

        <!-- Admin Dashboard (shown after auth) -->
        <div class="glb-admin-dashboard" id="glbAdminDashboard">
          <div class="glb-admin-title">Admin Dashboard</div>

          <div class="glb-admin-tabs">
            <div class="glb-admin-tab active" data-tab="blog">📝 Publish Blog</div>
            <div class="glb-admin-tab" data-tab="reviews">⭐ Manage Reviews</div>
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
                <input type="url" id="adminBlogImage" required placeholder="https://images.unsplash.com/...">
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
              <p style="color:#888; text-align:center; padding:20px 0;">Loading reviews...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Inject styles
  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);

  // Inject HTML
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  const overlay = document.getElementById('glbOverlayAdmin');
  const closeBtn = document.getElementById('glbCloseAdmin');
  const passwordScreen = document.getElementById('glbPasswordScreen');
  const dashboard = document.getElementById('glbAdminDashboard');
  const passwordInput = document.getElementById('glbPasswordInput');
  const passwordSubmit = document.getElementById('glbPasswordSubmit');
  const passwordError = document.getElementById('glbPasswordError');

  // --- Add Admin button next to "Contact Us" in navbar ---
  function addAdminNavButton() {
    let contactLink = null;
    document.querySelectorAll('nav a, [data-framer-name="nav links"] a').forEach(a => {
      if (a.textContent.trim().toLowerCase().includes('contact')) contactLink = a;
    });
    
    if (!contactLink) {
      setTimeout(addAdminNavButton, 800);
      return;
    }

    const navContainer = contactLink.closest('nav') || contactLink.closest('[data-framer-name="nav links"]') || contactLink.parentElement;
    
    if (document.getElementById('glbTriggerAdmin')) return;

    const adminBtn = document.createElement('button');
    adminBtn.className = 'glb-admin-nav-btn';
    adminBtn.id = 'glbTriggerAdmin';
    adminBtn.textContent = '⚙ Admin';
    adminBtn.title = 'Admin Panel - Password Protected';
    
    const contactContainer = contactLink.closest('li') || contactLink.parentElement;
    if (contactContainer && contactContainer.parentNode) {
      contactContainer.parentNode.insertBefore(adminBtn, contactContainer.nextSibling);
    } else {
      navContainer.appendChild(adminBtn);
    }

    adminBtn.addEventListener('click', openAdminPanel);
  }

  function openAdminPanel() {
    overlay.classList.add('active');
    if (sessionStorage.getItem('glm_admin_auth') === '1') {
      showDashboard();
    } else {
      passwordScreen.style.display = 'flex';
      dashboard.classList.remove('visible');
      passwordInput.value = '';
      passwordError.style.display = 'none';
      setTimeout(() => passwordInput.focus(), 300);
    }
  }

  window.openAdminPanel = openAdminPanel;

  function showDashboard() {
    passwordScreen.style.display = 'none';
    dashboard.classList.add('visible');
  }

  // Close button
  closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('active'); });

  // Password submit
  function tryPassword() {
    if (passwordInput.value === ADMIN_PASSWORD) {
      sessionStorage.setItem('glm_admin_auth', '1');
      passwordError.style.display = 'none';
      showDashboard();
    } else {
      passwordError.style.display = 'block';
      passwordInput.value = '';
      passwordInput.focus();
    }
  }
  passwordSubmit.addEventListener('click', tryPassword);
  passwordInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') tryPassword(); });

  // --- Tabs ---
  const tabs = document.querySelectorAll('.glb-admin-tab');
  const contents = document.querySelectorAll('.glb-tab-content');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
      if (tab.dataset.tab === 'reviews') fetchAllReviewsForAdmin();
    });
  });

  // --- Fetch All Reviews (Pending & Approved with Delete options) ---
  async function fetchAllReviewsForAdmin() {
    const list = document.getElementById('glbPendingReviewsList');
    if (!window.firebaseDB) {
      list.innerHTML = '<p style="color:#f87171; text-align:center;">Firebase Realtime Database not connected.</p>';
      return;
    }
    try {
      const snapshot = await window.firebaseDB.ref("reviews").once('value');
      let pendingHtml = '';
      let approvedHtml = '';

      if (snapshot.exists()) {
        snapshot.forEach(childSnapshot => {
          const rev = childSnapshot.val();
          const key = childSnapshot.key;
          const stars = '★'.repeat(rev.rating || 5);
          
          if (rev.status === 'pending') {
            pendingHtml += `
              <div class="glb-pending-review" id="review-${key}">
                <p><strong>${rev.author || 'Anonymous'}</strong> &nbsp;•&nbsp; <span style="color:#FFD700">${stars}</span> (${rev.rating || 5}/5)</p>
                <p>"${rev.text}"</p>
                <div class="glb-review-action-btns">
                  <button class="glb-approve-btn" onclick="window.approveReview('${key}')">✓ Approve & Make Live</button>
                  <button class="glb-delete-btn" onclick="window.deleteReview('${key}')">🗑 Delete</button>
                </div>
              </div>
            `;
          } else {
            approvedHtml += `
              <div class="glb-pending-review" id="review-${key}">
                <p><strong>${rev.author || 'Anonymous'}</strong> &nbsp;•&nbsp; <span style="color:#FFD700">${stars}</span> (Live)</p>
                <p>"${rev.text}"</p>
                <div class="glb-review-action-btns">
                  <button class="glb-delete-btn" onclick="window.deleteReview('${key}')">🗑 Delete Review</button>
                </div>
              </div>
            `;
          }
        });
      }

      let finalHtml = '';
      
      finalHtml += `<div class="glb-review-section-header">⏳ Pending Approval</div>`;
      finalHtml += pendingHtml || `<p style="color:#888; font-size:14px; font-style:italic;">No pending reviews.</p>`;
      
      finalHtml += `<div class="glb-review-section-header" style="margin-top:30px;">✅ Approved & Live Reviews</div>`;
      finalHtml += approvedHtml || `<p style="color:#888; font-size:14px; font-style:italic;">No live reviews found in database.</p>`;

      list.innerHTML = finalHtml;
    } catch (e) {
      list.innerHTML = `<p style="color:#f87171; text-align:center;">Error loading reviews: ${e.message}</p>`;
    }
  }

  // --- Approve Review ---
  window.approveReview = async function(key) {
    if (!window.firebaseDB) return;
    const btn = document.querySelector(`#review-${key} .glb-approve-btn`);
    if (btn) { btn.innerText = 'Approving...'; btn.disabled = true; }
    try {
      await window.firebaseDB.ref("reviews/" + key).update({ status: 'approved' });
      alert('✅ Review approved and is now live!');
      fetchAllReviewsForAdmin();
    } catch (e) {
      alert('Error approving review: ' + e.message);
      if (btn) { btn.innerText = '✓ Approve & Make Live'; btn.disabled = false; }
    }
  };

  // --- Delete Review ---
  window.deleteReview = async function(key) {
    if (!window.firebaseDB) return;
    if (!confirm("Are you sure you want to delete this review permanently from the database?")) {
      return;
    }
    
    const card = document.getElementById(`review-${key}`);
    if (card) {
      card.style.opacity = '0.5';
      card.style.pointerEvents = 'none';
    }

    try {
      await window.firebaseDB.ref("reviews/" + key).remove();
      if (card) {
        card.style.opacity = '0';
        card.style.transition = 'opacity 0.3s';
        setTimeout(() => card.remove(), 300);
      }
      alert('🗑️ Review permanently deleted!');
    } catch (e) {
      alert('Error deleting review: ' + e.message);
      if (card) {
        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';
      }
    }
  };

  // --- Blog Form Submit ---
  const form = document.getElementById('glbAdminForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('adminBlogTitle').value.trim();
    const category = document.getElementById('adminBlogCategory').value;
    const image = document.getElementById('adminBlogImage').value.trim();
    const excerpt = document.getElementById('adminBlogExcerpt').value.trim();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.innerText = 'Publishing...';
    submitBtn.disabled = true;

    const newBlog = {
      title, category, image, excerpt,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      createdAt: firebase.database.ServerValue.TIMESTAMP
    };

    try {
      if (window.firebaseDB) {
        await Promise.race([
          window.firebaseDB.ref("blogs").push(newBlog),
          new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout after 8s")), 8000))
        ]);
      } else {
        let stored = JSON.parse(localStorage.getItem('glb_blogs')) || [];
        stored.unshift({...newBlog, createdAt: Date.now()});
        localStorage.setItem('glb_blogs', JSON.stringify(stored));
      }
      alert('✅ Blog published successfully!');
      form.reset();
      overlay.classList.remove('active');
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      submitBtn.innerText = 'Publish to Website';
      submitBtn.disabled = false;
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addAdminNavButton);
  } else {
    addAdminNavButton();
  }
})();
