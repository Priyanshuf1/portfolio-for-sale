(function() {
  const footerStyles = `
    .glb-footer, footer {
      background: #ffffff !important;
      color: #374151;
      padding: 60px 20px 40px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      border-top: 1px solid rgba(226, 0, 1, 0.15) !important;
      position: relative;
      left: 0;
      width: 100%;
      z-index: 9997;
      box-sizing: border-box;
      opacity: 1;
      margin-top: 60px;
    }
    
    .glb-footer-container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 40px;
    }
    
    .glb-footer-col {
      display: flex;
      flex-direction: column;
    }
    
    .glb-footer-logo-text {
      font-size: 28px;
      font-weight: 900;
      color: #e20001 !important;
      margin-bottom: 12px;
      letter-spacing: -0.5px;
      background: none !important;
      -webkit-background-clip: initial !important;
      -webkit-text-fill-color: #e20001 !important;
    }
    
    .glb-footer-socials {
      display: flex;
      gap: 12px;
      margin-top: 15px;
    }
    
    .glb-footer-socials a {
      color: #ffffff !important;
      background: #e20001 !important;
      border: 1px solid #e20001 !important;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    
    .glb-footer-socials a:hover {
      background: #a30000 !important;
      color: #ffffff !important;
      border-color: #a30000 !important;
      transform: translateY(-2px);
    }
    
    .glb-footer-heading {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #111827;
      margin-bottom: 20px;
    }
    
    .glb-footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .glb-footer-links li a {
      color: #4b5563;
      text-decoration: none;
      font-size: 15px;
      transition: color 0.2s ease;
    }
    
    .glb-footer-links li a:hover {
      color: #e20001;
    }
    
    .glb-footer-contact-item {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
      align-items: flex-start;
      color: #4b5563;
      font-size: 15px;
      line-height: 1.5;
    }
    
    .glb-footer-contact-item svg {
      flex-shrink: 0;
      color: #e20001;
      margin-top: 2px;
    }
    
    .glb-footer-bottom {
      max-width: 1200px;
      margin: 40px auto 0;
      padding-top: 20px;
      border-top: 1px solid rgba(0,0,0,0.06);
      text-align: center;
      color: #6b7280;
      font-size: 13px;
    }
    
    @media (max-width: 768px) {
      .glb-footer-container {
        grid-template-columns: 1fr;
      }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = footerStyles;
  document.head.appendChild(styleEl);

  const footerHTML = `
    <div class="glb-footer-container">
      <div class="glb-footer-col">
        <div class="glb-footer-logo-text">Global Logic Media</div>
        <div style="color:#4b5563; font-size:14px; margin-bottom: 10px;">Digital Marketing Agency</div>
        <div class="glb-footer-socials">
          <a href="https://www.facebook.com/globallogicmedia" target="_blank" aria-label="Facebook" rel="noopener noreferrer"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
          <a href="https://www.instagram.com/globallogicmedia" target="_blank" aria-label="Instagram" rel="noopener noreferrer"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
          <a href="https://www.linkedin.com/company/globallogicmedia" target="_blank" aria-label="LinkedIn" rel="noopener noreferrer"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2" fill="#ffffff"></circle></svg></a>
          <a href="https://www.youtube.com/@globallogicmedia" target="_blank" aria-label="YouTube" rel="noopener noreferrer"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#ffffff" stroke="none"></polygon></svg></a>
          <a href="https://wa.me/message/CDN2NPVITSRHH1" target="_blank" aria-label="WhatsApp" rel="noopener noreferrer"><svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.45 1.03 2.62.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.53.61.19 1.16.16 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.18-.48-.3"/></svg></a>
        </div>
      </div>
      
      <div class="glb-footer-col">
        <div class="glb-footer-heading">QUICK LINKS</div>
        <ul class="glb-footer-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#glb-skills-section">Service</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Terms & Conditions</a></li>
        </ul>
      </div>

      <div class="glb-footer-col">
        <div class="glb-footer-heading">SOLUTIONS</div>
        <ul class="glb-footer-links">
          <li><a href="#">SEO</a></li>
          <li><a href="#">PAY PER CLICK</a></li>
          <li><a href="#">META ADS</a></li>
          <li><a href="#">WEB DESIGN</a></li>
          <li><a href="#">SMM</a></li>
          <li><a href="#">GRAPHIC DESIGNING</a></li>
        </ul>
      </div>

      <div class="glb-footer-col">
        <div class="glb-footer-heading">Contact</div>
        <div class="glb-footer-contact-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          Gomti nagar lucknow 226010
        </div>
        <div class="glb-footer-contact-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          <a href="mailto:globallogicmedia06@gmail.com" style="color:#111827; text-decoration:none; font-weight:500;">globallogicmedia06@gmail.com</a>
        </div>
        <div class="glb-footer-contact-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          <a href="tel:+919208111603" style="color:#111827; text-decoration:none; font-weight:500;">+91-9208111603</a>
        </div>
      </div>
    </div>
    
    <div class="glb-footer-bottom">
      &copy; ${new Date().getFullYear()} Global Logic Media. All rights reserved.
    </div>
  `;

  const footer = document.createElement('footer');
  footer.className = 'glb-footer';
  footer.innerHTML = footerHTML;

  function appendFooter() {
     document.body.appendChild(footer);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', appendFooter);
  } else {
    appendFooter();
  }
})();
