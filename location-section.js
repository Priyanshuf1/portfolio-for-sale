(function() {
  const styles = `
    .glb-location-section {
      padding: 80px 5%;
      background: #0a0a0a;
      color: white;
      font-family: 'Inter', sans-serif;
      position: relative;
      z-index: 10;
      border-top: 1px solid rgba(255,255,255,0.05);
    }
    .glb-location-inner {
      max-width: 1200px;
      margin: 0 auto;
    }
    .glb-location-header {
      text-align: center;
      margin-bottom: 50px;
    }
    .glb-location-header h2 {
      font-size: clamp(2rem, 4vw, 3rem);
      margin: 0 0 12px;
      background: linear-gradient(180deg, #FFFFFF 0%, #888888 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -1px;
      font-weight: 700;
    }
    .glb-location-header p {
      color: #888;
      font-size: 1.1rem;
      margin: 0;
    }
    .glb-location-grid {
      display: grid;
      grid-template-columns: 1fr 1.8fr;
      gap: 40px;
      align-items: start;
    }
    @media (max-width: 768px) {
      .glb-location-grid { grid-template-columns: 1fr; }
    }
    .glb-contact-details h3 {
      font-size: 1.3rem;
      margin: 0 0 24px;
      color: white;
      font-weight: 600;
    }
    .glb-contact-item {
      display: flex;
      align-items: flex-start;
      gap: 15px;
      margin-bottom: 20px;
      padding: 16px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 12px;
    }
    .glb-contact-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background: rgba(74,222,128,0.1);
      border: 1px solid rgba(74,222,128,0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      flex-shrink: 0;
    }
    .glb-contact-item-text {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .glb-contact-item-label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #4ade80;
      font-weight: 600;
    }
    .glb-contact-item-value {
      color: rgba(255,255,255,0.85);
      font-size: 0.95rem;
      line-height: 1.4;
    }
    .glb-map-wrapper {
      height: 420px;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.08);
      box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    }
    .glb-map-wrapper iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }
  `;

  const html = `
    <div class="glb-location-section">
      <div class="glb-location-inner">
        <div class="glb-location-header">
          <h2>Find Us Here</h2>
          <p>We're based in the heart of Lucknow, always ready to help you grow.</p>
        </div>
        <div class="glb-location-grid">
          <div class="glb-contact-details">
            <h3>Get In Touch</h3>
            <div class="glb-contact-item">
              <div class="glb-contact-icon">📍</div>
              <div class="glb-contact-item-text">
                <span class="glb-contact-item-label">Address</span>
                <span class="glb-contact-item-value">Gomti Nagar, Lucknow, Uttar Pradesh, India</span>
              </div>
            </div>
            <div class="glb-contact-item">
              <div class="glb-contact-icon">✉️</div>
              <div class="glb-contact-item-text">
                <span class="glb-contact-item-label">Email</span>
                <span class="glb-contact-item-value">hello@globallogicmedia.com</span>
              </div>
            </div>
            <div class="glb-contact-item">
              <div class="glb-contact-icon">📞</div>
              <div class="glb-contact-item-text">
                <span class="glb-contact-item-label">Phone</span>
                <span class="glb-contact-item-value">+91-7570060896</span>
              </div>
            </div>
          </div>
          <div class="glb-map-wrapper">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56957.53322471745!2d80.96827834872362!3d26.844855564452423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd49fc60a843%3A0x92fc72e19b623f6a!2sGomti%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1782382173315!5m2!1sen!2sin"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  `;

  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);

  const container = document.createElement('section');
  container.id = 'glb-location';
  container.innerHTML = html;

  // Insert at VERY BOTTOM, right before the footer or as last child
  function insertLocation() {
    let footer = document.querySelector('footer.glb-footer');
    let blogSection = document.querySelector('.glb-home-blogs');
    let body = document.body;
    
    if (footer && footer.parentNode) {
      footer.parentNode.insertBefore(container, footer);
    } else if (blogSection && blogSection.parentNode) {
      // insert after blog section
      blogSection.parentNode.insertBefore(container, blogSection.nextSibling);
    } else {
      body.appendChild(container);
    }
  }
  
  // Wait for footer and blog section to be injected first
  setTimeout(insertLocation, 500);
})();
