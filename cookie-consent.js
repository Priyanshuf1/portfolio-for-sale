(function() {
  // Check if user already accepted or declined cookies
  if (localStorage.getItem('cookieConsent')) return;

  const styles = `
    .glb-cookie-banner {
      position: fixed;
      bottom: 24px;
      left: 24px;
      max-width: 400px;
      width: calc(100% - 48px);
      background: #ffffff;
      color: #1f2937;
      border: 1px solid rgba(226, 0, 1, 0.25);
      border-radius: 20px;
      padding: 20px 24px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
      z-index: 99999;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0;
      transform: translateY(20px);
    }
    .glb-cookie-banner.active {
      opacity: 1;
      transform: translateY(0);
    }
    .glb-cookie-title {
      font-size: 16px;
      font-weight: 800;
      color: #111827;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .glb-cookie-text {
      font-size: 13px;
      line-height: 1.5;
      color: #4b5563;
      margin-bottom: 16px;
    }
    .glb-cookie-actions {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .glb-cookie-accept-btn {
      background: #e20001 !important;
      color: #ffffff !important;
      border: 1px solid #e20001 !important;
      padding: 9px 20px;
      border-radius: 30px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .glb-cookie-accept-btn:hover {
      background: #c10001 !important;
      border-color: #c10001 !important;
    }
    .glb-cookie-decline-btn {
      background: transparent !important;
      color: #6b7280 !important;
      border: 1px solid #d1d5db !important;
      padding: 9px 16px;
      border-radius: 30px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .glb-cookie-decline-btn:hover {
      color: #111827 !important;
      border-color: #9ca3af !important;
    }
    @media (max-width: 768px) {
      .glb-cookie-banner {
        bottom: 16px;
        left: 16px;
        width: calc(100% - 32px);
        padding: 18px;
      }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  const bannerHTML = `
    <div class="glb-cookie-banner" id="glbCookieBanner">
      <div class="glb-cookie-title">
        <span>🍪</span> Cookie Policy & Privacy
      </div>
      <div class="glb-cookie-text">
        We use cookies to enhance your browsing experience, analyze site traffic, and optimize performance. By clicking "Accept All", you agree to our privacy policy and cookie usage.
      </div>
      <div class="glb-cookie-actions">
        <button class="glb-cookie-accept-btn" id="glbAcceptCookies">Accept All</button>
        <button class="glb-cookie-decline-btn" id="glbDeclineCookies">Decline</button>
      </div>
    </div>
  `;

  function initCookieBanner() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = bannerHTML;
    document.body.appendChild(wrapper);

    const banner = document.getElementById('glbCookieBanner');
    const acceptBtn = document.getElementById('glbAcceptCookies');
    const declineBtn = document.getElementById('glbDeclineCookies');

    // Display banner after 1 second
    setTimeout(() => {
      if (banner) banner.classList.add('active');
    }, 1000);

    function closeBanner(status) {
      localStorage.setItem('cookieConsent', status);
      if (banner) {
        banner.classList.remove('active');
        setTimeout(() => banner.remove(), 400);
      }
    }

    if (acceptBtn) acceptBtn.addEventListener('click', () => closeBanner('accepted'));
    if (declineBtn) declineBtn.addEventListener('click', () => closeBanner('declined'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieBanner);
  } else {
    initCookieBanner();
  }
})();
