(function() {
  // Styles for the WhatsApp button
  const styles = `
    /* Floating WhatsApp Button */
    .glb-floating-btn {
      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 9998;
      background: #25D366;
      color: #ffffff;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(37,211,102,0.3), inset 0 1px 1px rgba(255,255,255,0.2);
      border: 1px solid rgba(255,255,255,0.1);
      transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
    }
    
    .glb-floating-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(37,211,102,0.45), inset 0 1px 1px rgba(255,255,255,0.3);
      background: #128C7E;
      color: #fff;
    }
  `;

  // Inject Styles
  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  // HTML Structure
  const modalHTML = `
    <!-- Floating Trigger -->
    <a class="glb-floating-btn" id="glbTrigger" href="https://wa.me/message/CDN2NPVITSRHH1" target="_blank" rel="noopener noreferrer">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.004 2c-5.51 0-9.99 4.48-9.99 9.99 0 2.05.62 3.96 1.7 5.56L2 22l4.63-1.36c1.55.93 3.37 1.47 5.37 1.47 5.51 0 9.99-4.48 9.99-9.99S17.514 2 12.004 2zm5.72 14.5c-.24.69-1.22 1.25-1.92 1.39-.48.09-1.1.17-3.23-.71-2.73-1.12-4.48-3.9-4.62-4.08-.13-.19-1.08-1.44-1.08-2.75 0-1.31.68-1.96.93-2.22.25-.26.54-.33.72-.33.18 0 .37.01.53.01.17 0 .4.01.62.53.23.55.78 1.91.85 2.05.07.14.12.31.02.5-.09.19-.14.3-.29.47-.14.17-.3.38-.43.51-.15.15-.3.32-.13.61.17.29.77 1.27 1.65 2.05.88.78 1.62 1.02 1.85 1.14.23.12.36.1.5-.06.13-.16.57-.66.73-.89.15-.23.31-.19.53-.11.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.57-.18 1.26z"/>
      </svg>
    </a>
  `;

  // Inject HTML safely via a wrapper
  const wrapper = document.createElement('div');
  wrapper.innerHTML = modalHTML;
  document.body.appendChild(wrapper);
})();
