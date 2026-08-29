(function() {
  // Styles for the modal and button
  const styles = `
    /* Floating Button */
    .glb-floating-btn {
      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 9998;
      background: linear-gradient(135deg, #111, #333);
      color: #eaeaea;
      padding: 16px 28px;
      border-radius: 30px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 0.5px;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.1);
      transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .glb-floating-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.2);
      background: linear-gradient(135deg, #222, #444);
      color: #fff;
    }

    /* Modal Overlay */
    .glb-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.4s ease, visibility 0.4s ease;
    }

    .glb-modal-overlay.active {
      opacity: 1;
      visibility: visible;
    }

    /* Modal Content Box */
    .glb-modal-content {
      background: linear-gradient(180deg, #1e1e1e 0%, #0f0f0f 100%) !important;
      border: 1px solid rgba(200, 200, 200, 0.15);
      border-radius: 24px;
      width: 90%;
      max-width: 600px;
      padding: 40px;
      color: #f0f0f0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      box-shadow: 0 20px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1);
      transform: translateY(30px) scale(0.95);
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }

    .glb-modal-overlay.active .glb-modal-content {
      transform: translateY(0) scale(1);
    }

    /* Close Button */
    .glb-modal-close {
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
    .glb-modal-close:hover {
      background: rgba(255,255,255,0.15);
      color: #fff;
    }

    /* Typography inside Modal */
    .glb-modal-title {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
      background: linear-gradient(90deg, #fff, #aaa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .glb-modal-subtitle {
      font-size: 15px;
      color: #888;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 24px;
    }

    .glb-modal-text {
      font-size: 16px;
      line-height: 1.6;
      color: #ccc;
      margin-bottom: 20px;
    }
    
    .glb-modal-text strong {
      color: #fff;
      font-weight: 600;
    }
    
    .glb-modal-divider {
      height: 1px;
      background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
      margin: 24px 0;
    }
    
    .glb-modal-cta {
      display: inline-block;
      margin-top: 10px;
      background: #fff;
      color: #000;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .glb-modal-cta:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(255,255,255,0.1);
    }
  `;

  // Inject Styles
  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  // HTML Structure
  const modalHTML = `
    <!-- Floating Trigger -->
    <div class="glb-floating-btn" id="glbTrigger">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 16v-4"></path>
        <path d="M12 8h.01"></path>
      </svg>
      About Us
    </div>

    <!-- Modal Overlay -->
    <div class="glb-modal-overlay" id="glbOverlay">
      <div class="glb-modal-content">
        <div class="glb-modal-close" id="glbClose">✕</div>
        
        <div class="glb-modal-subtitle">Grow • Connect • Engage</div>
        <div class="glb-modal-title">GlobalLogic Media</div>
        
        <div class="glb-modal-divider"></div>
        
        <div class="glb-modal-text">
          At <strong>GlobalLogic Media</strong>, we believe in <em>Simplifying Digitally, Amplifying Results</em>. As the leading Digital Marketing Agency in Lucknow, our mission is to help businesses of all sizes establish a strong online presence and achieve measurable success.
        </div>
        
        <div class="glb-modal-text">
          We offer a diverse range of 360-degree digital marketing solutions including <strong>SEO, Pay-Per-Click Advertising, Meta Ads, Social Media Marketing, and Website Design</strong>. We empower businesses to enhance online traffic, generate leads, and increase revenue through growth-focused marketing strategies.
        </div>
        
        <a href="mailto:hello@globallogicmedia.com" class="glb-modal-cta">Get Started Today</a>
      </div>
    </div>
  `;

  // Inject HTML safely via a wrapper
  const wrapper = document.createElement('div');
  wrapper.innerHTML = modalHTML;
  document.body.appendChild(wrapper);

  // Logic
  const trigger = document.getElementById('glbTrigger');
  const overlay = document.getElementById('glbOverlay');
  const closeBtn = document.getElementById('glbClose');

  function openModal() {
    overlay.classList.add('active');
  }

  function closeModal() {
    overlay.classList.remove('active');
  }

  trigger.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
})();
