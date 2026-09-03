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
    
    
    .glb-footer-socials a svg.glb-footer-wa-svg path {
      fill: #ffffff !important;
      stroke: none !important;
    }
    .glb-footer-contact-item,
    .glb-footer-contact-item a,
    .glb-footer-contact-link {
      color: #4b5563 !important;
      font-size: 15px !important;
      font-weight: 400 !important;
      text-decoration: none !important;
      line-height: 1.5 !important;
      transition: color 0.2s ease;
    }
    .glb-footer-contact-item a:hover {
      color: #e20001 !important;
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
          <a href="https://wa.me/message/CDN2NPVITSRHH1" target="_blank" aria-label="WhatsApp" rel="noopener noreferrer"><svg class="glb-footer-wa-svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#ffffff" stroke="none" d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.477-.15-.678.151-.2.301-.778.979-.954 1.18-.176.2-.352.226-.653.076-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.5-1.787-1.676-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.352.452-.527.15-.175.2-.301.301-.502.101-.2.05-.376-.025-.527-.075-.15-.678-1.632-.93-2.235-.244-.588-.493-.509-.677-.518h-.578c-.2 0-.527.075-.803.376s-1.054 1.029-1.054 2.511c0 1.482 1.079 2.913 1.23 3.114.15.2 2.124 3.243 5.145 4.549.719.311 1.28.497 1.718.636.722.23 1.379.197 1.9.12.58-.087 1.78-.727 2.031-1.43.25-.703.25-1.304.175-1.43-.075-.126-.276-.201-.577-.351z"/><path fill="#ffffff" stroke="none" d="M12.004 2C6.479 2 2 6.48 2 12.006c0 1.83.498 3.547 1.365 5.023L2 22l5.143-1.348A9.96 9.96 0 0 0 12.004 22c5.524 0 10.003-4.478 10.003-10.004S17.528 2 12.004 2zm0 18.283c-1.605 0-3.114-.46-4.397-1.253l-.316-.194-3.262.856.871-3.18-.21-.334a8.243 8.243 0 0 1-1.267-4.172c0-4.57 3.717-8.288 8.281-8.288 4.564 0 8.281 3.718 8.281 8.288 0 4.57-3.717 8.287-8.281 8.287z"/></svg></a>
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
          <li><a href="#">SOCIAL MEDIA MARKETING</a></li>
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
          <a href="mailto:globallogicmedia06@gmail.com" class="glb-footer-contact-link">globallogicmedia06@gmail.com</a>
        </div>
        <div class="glb-footer-contact-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          <a href="tel:+919208111603" class="glb-footer-contact-link">+91-9208111603</a>
        </div>
      </div>
    </div>
    
    <div class="glb-footer-bottom">
      &copy; 2025 Global Logic Media. All rights reserved.
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
