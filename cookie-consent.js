(function() {
  // Check if user already made a cookie consent choice
  if (localStorage.getItem('glb_cookie_consent_v2')) {
    return;
  }

  const styles = `
    .glb-cookie-banner-wrap {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(30px);
      width: min(540px, calc(100vw - 32px));
      z-index: 99995;
      background: rgba(18, 18, 22, 0.95);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      color: #f3f4f6;
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 20px;
      padding: 24px 28px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(226, 0, 1, 0.2);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.4s;
      pointer-events: none;
    }

    .glb-cookie-banner-wrap.active {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(0);
      pointer-events: auto;
    }

    .glb-cookie-close {
      position: absolute;
      top: 16px;
      right: 18px;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #9ca3af;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 14px;
      line-height: 1;
      transition: all 0.2s ease;
    }

    .glb-cookie-close:hover {
      background: rgba(255, 255, 255, 0.15);
      color: #ffffff;
    }

    .glb-cookie-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }

    .glb-cookie-icon {
      font-size: 22px;
      line-height: 1;
    }

    .glb-cookie-title {
      font-size: 17px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.2px;
    }

    .glb-cookie-desc {
      font-size: 13.5px;
      line-height: 1.55;
      color: #d1d5db;
      margin-bottom: 20px;
    }

    .glb-cookie-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .glb-cookie-btn-accept {
      background: #e20001 !important;
      color: #ffffff !important;
      border: 1px solid #e20001 !important;
      padding: 10px 24px;
      border-radius: 9999px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.25s ease;
      box-shadow: 0 4px 15px rgba(226, 0, 1, 0.35);
    }

    .glb-cookie-btn-accept:hover {
      background: #c10001 !important;
      border-color: #c10001 !important;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(226, 0, 1, 0.5);
    }

    .glb-cookie-btn-decline {
      background: rgba(255, 255, 255, 0.05) !important;
      color: #e5e7eb !important;
      border: 1px solid rgba(255, 255, 255, 0.18) !important;
      padding: 10px 20px;
      border-radius: 9999px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.25s ease;
    }

    .glb-cookie-btn-decline:hover {
      background: rgba(255, 255, 255, 0.12) !important;
      color: #ffffff !important;
      border-color: rgba(255, 255, 255, 0.35) !important;
    }

    @media (max-width: 640px) {
      .glb-cookie-banner-wrap {
        bottom: 16px;
        padding: 20px 20px;
        width: calc(100vw - 24px);
      }
      .glb-cookie-actions {
        width: 100%;
        gap: 10px;
      }
      .glb-cookie-btn-accept,
      .glb-cookie-btn-decline {
        flex: 1;
        text-align: center;
        padding: 10px 14px;
        font-size: 13px;
      }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  const bannerHTML = `
    <div class="glb-cookie-banner-wrap" id="glbCookieBanner" role="dialog" aria-modal="false" aria-label="Cookie consent banner">
      <button class="glb-cookie-close" id="glbCookieClose" title="Dismiss">✕</button>
      <div class="glb-cookie-header">
        <span class="glb-cookie-icon">🍪</span>
        <div class="glb-cookie-title">Cookies & Privacy Preferences</div>
      </div>
      <div class="glb-cookie-desc">
        We use cookies to elevate your browsing experience, analyze traffic flow, and deliver tailored digital marketing experiences. By clicking "Accept All", you agree to our cookie policy.
      </div>
      <div class="glb-cookie-actions">
        <button class="glb-cookie-btn-accept" id="glbCookieAccept">Accept All</button>
        <button class="glb-cookie-btn-decline" id="glbCookieDecline">Necessary Only</button>
      </div>
    </div>
  `;

  function initBanner() {
    // Check again before mounting
    if (localStorage.getItem('glb_cookie_consent_v2')) {
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.id = 'glbCookieContainer';
    wrapper.innerHTML = bannerHTML;
    document.body.appendChild(wrapper);

    const banner = document.getElementById('glbCookieBanner');
    const acceptBtn = document.getElementById('glbCookieAccept');
    const declineBtn = document.getElementById('glbCookieDecline');
    const closeBtn = document.getElementById('glbCookieClose');

    // Reveal banner smoothly after 1.5 seconds
    setTimeout(() => {
      if (banner) {
        banner.classList.add('active');
      }
    }, 1500);

    function dismissBanner(choice) {
      if (choice) {
        localStorage.setItem('glb_cookie_consent_v2', choice);
      }
      if (banner) {
        banner.classList.remove('active');
        setTimeout(() => {
          wrapper.remove();
        }, 400);
      }
    }

    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => dismissBanner('accepted'));
    }
    if (declineBtn) {
      declineBtn.addEventListener('click', () => dismissBanner('declined'));
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', () => dismissBanner('dismissed'));
    }
  }

  // Allow reopening consent settings manually if needed
  window.showCookieConsent = function() {
    localStorage.removeItem('glb_cookie_consent_v2');
    localStorage.removeItem('glb_cookie_consent');
    localStorage.removeItem('cookieConsent');
    const existing = document.getElementById('glbCookieContainer');
    if (existing) existing.remove();
    initBanner();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBanner);
  } else {
    initBanner();
  }
})();