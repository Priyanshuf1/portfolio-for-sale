(function() {
  const styles = `
    .glb-location-section {
      padding: 90px 5%;
      background: #0A0E27;
      color: white;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      position: relative;
      z-index: 10;
      border-top: 1px solid rgba(255, 199, 44, 0.15);
    }
    .glb-location-inner {
      max-width: 1240px;
      margin: 0 auto;
    }
    .glb-location-header {
      text-align: center;
      margin-bottom: 60px;
    }
    .glb-location-badge {
      display: inline-block;
      padding: 6px 16px;
      background: rgba(255, 199, 44, 0.1);
      border: 1px solid rgba(255, 199, 44, 0.3);
      color: #FFC72C;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      border-radius: 20px;
      margin-bottom: 12px;
    }
    .glb-location-header h2 {
      font-size: clamp(2.2rem, 4.5vw, 3.2rem);
      margin: 0 0 12px;
      background: linear-gradient(180deg, #FFF2A3 0%, #FFC72C 50%, #D48806 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -1px;
      font-weight: 700;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8));
    }
    .glb-location-header p {
      color: #A1A1AA;
      font-size: 1.1rem;
      max-width: 620px;
      margin: 0 auto;
      line-height: 1.6;
    }
    .glb-location-grid {
      display: grid;
      grid-template-columns: 1fr 1.3fr;
      gap: 36px;
      align-items: stretch;
    }
    @media (max-width: 900px) {
      .glb-location-grid { grid-template-columns: 1fr; }
    }
    .glb-contact-cards-wrap {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .glb-contact-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,199,44,0.15);
      border-radius: 16px;
      padding: 20px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .glb-contact-card:hover {
      background: rgba(255,255,255,0.06);
      border-color: rgba(255,199,44,0.5);
    }
    .glb-contact-card-left { display: flex; align-items: center; gap: 16px; }
    .glb-contact-card-icon {
      width: 48px; height: 48px;
      border-radius: 12px;
      background: rgba(255,199,44,0.12);
      border: 1px solid rgba(255,199,44,0.3);
      display: flex; justify-content: center; align-items: center;
      font-size: 20px; flex-shrink: 0;
    }
    .glb-contact-card-info { display: flex; flex-direction: column; gap: 3px; }
    .glb-contact-card-label {
      font-size: 11px; text-transform: uppercase; letter-spacing: 1px;
      color: #FFC72C; font-weight: 700;
    }
    .glb-contact-card-val { color: #fff; font-size: 0.95rem; font-weight: 500; line-height: 1.4; }
    .glb-contact-card-action {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 8px 16px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.15);
      color: #fff; border-radius: 8px; font-size: 13px; font-weight: 600;
      text-decoration: none; white-space: nowrap; transition: all 0.2s;
    }
    .glb-contact-card:hover .glb-contact-card-action {
      background: linear-gradient(135deg,#FFFFFF 0%,#E2E8F0 45%,#94A3B8 100%);
      color: #0A0E27; border-color: transparent; font-weight: 700;
    }

    /* Map Box Container */
    .glb-map-container-box {
      position: relative;
      min-height: 460px;
      border-radius: 20px;
      border: 1px solid rgba(255,199,44,0.35);
      box-shadow: 0 20px 60px rgba(0,0,0,0.8), 0 0 35px rgba(255,199,44,0.2);
      overflow: hidden;
      background: #0D111A;
    }

    .glb-map-floating-badge {
      position: absolute; top: 16px; left: 16px; z-index: 5;
      background: rgba(10,14,39,0.92);
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255,199,44,0.35);
      color: #fff; padding: 8px 16px; border-radius: 30px;
      font-size: 13px; font-weight: 600;
      display: flex; align-items: center; gap: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      pointer-events: none;
    }
    .glb-map-dot {
      width: 10px; height: 10px; border-radius: 50%;
      background: #FFC72C; box-shadow: 0 0 12px #FFC72C;
      animation: pulseDot 2s infinite;
    }
    @keyframes pulseDot {
      0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255,199,44,0.7); }
      70%  { transform: scale(1);    box-shadow: 0 0 0 10px rgba(255,199,44,0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255,199,44,0); }
    }

    /* Live Google Maps Iframe with dark filter */
    .glb-map-iframe-element {
      width: 100%; height: 100%; min-height: 460px;
      border: 0; display: block;
      position: relative; z-index: 1;
      filter: invert(90%) hue-rotate(180deg) grayscale(70%) contrast(110%);
    }

    .glb-map-direct-btn {
      position: absolute; bottom: 16px; right: 16px; z-index: 5;
      background: rgba(10,14,39,0.92); backdrop-filter: blur(12px);
      border: 1px solid rgba(255,199,44,0.4);
      color: #FFC72C; font-weight: 700; font-size: 12px;
      padding: 8px 16px; border-radius: 20px;
      text-decoration: none; box-shadow: 0 4px 20px rgba(0,0,0,0.6);
      transition: all 0.2s ease;
    }
    .glb-map-direct-btn:hover { background: #FFC72C; color: #0A0E27; box-shadow: 0 0 25px rgba(255,199,44,0.6); }
  `;

  // Official Live Google Maps Embed URL pointing exactly to Gomti Nagar, Lucknow UP
  const mapSrc = 'https://maps.google.com/maps?q=26.8448,80.9683&z=15&output=embed';

  const html = `
    <div class="glb-location-section">
      <div class="glb-location-inner">
        <div class="glb-location-header">
          <span class="glb-location-badge">OUR HEADQUARTERS</span>
          <h2>Visit Our Lucknow Office</h2>
          <p>Have a project in mind or want to discuss growth strategies? Stop by our office or reach out directly.</p>
        </div>
        <div class="glb-location-grid">
          <div class="glb-contact-cards-wrap">
            <div class="glb-contact-card">
              <div class="glb-contact-card-left">
                <div class="glb-contact-card-icon">📍</div>
                <div class="glb-contact-card-info">
                  <span class="glb-contact-card-label">Office Address</span>
                  <span class="glb-contact-card-val">Gomti Nagar, Lucknow, UP 226010, India</span>
                </div>
              </div>
              <a href="https://maps.google.com/?q=26.8448,80.9683" target="_blank" class="glb-contact-card-action" rel="noopener noreferrer">Directions ↗</a>
            </div>
            <div class="glb-contact-card">
              <div class="glb-contact-card-left">
                <div class="glb-contact-card-icon">📞</div>
                <div class="glb-contact-card-info">
                  <span class="glb-contact-card-label">Direct Phone</span>
                  <span class="glb-contact-card-val">+91-7570060896 / +91-9208111603</span>
                </div>
              </div>
              <a href="tel:+917570060896" class="glb-contact-card-action">Call Us 📞</a>
            </div>
            <div class="glb-contact-card">
              <div class="glb-contact-card-left">
                <div class="glb-contact-card-icon">✉️</div>
                <div class="glb-contact-card-info">
                  <span class="glb-contact-card-label">Email Inquiries</span>
                  <span class="glb-contact-card-val">hello@globallogicmedia.com</span>
                </div>
              </div>
              <a href="mailto:hello@globallogicmedia.com" class="glb-contact-card-action">Email Us ✉️</a>
            </div>
            <div class="glb-contact-card">
              <div class="glb-contact-card-left">
                <div class="glb-contact-card-icon">🕒</div>
                <div class="glb-contact-card-info">
                  <span class="glb-contact-card-label">Working Hours</span>
                  <span class="glb-contact-card-val">Mon – Sat: 9:00 AM – 7:00 PM IST</span>
                </div>
              </div>
              <span style="font-size:12px;color:#FFC72C;font-weight:700;">Open Today</span>
            </div>
          </div>

          <div class="glb-map-container-box" id="glbMapBox">
            <div class="glb-map-floating-badge">
              <span class="glb-map-dot"></span>
              <span>Gomti Nagar, Lucknow — Live HQ</span>
            </div>
            <iframe
              class="glb-map-iframe-element"
              src="${mapSrc}"
              allowfullscreen=""
              loading="lazy">
            </iframe>
            <a href="https://maps.google.com/?q=26.8448,80.9683" target="_blank" class="glb-map-direct-btn" rel="noopener noreferrer">
              Open in Google Maps ↗
            </a>
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
  container.className = 'glb-location-section-wrapper';
  container.innerHTML = html;

  function insertLocation() {
    const old = document.getElementById('glb-location');
    if (old) old.remove();

    let footer = document.querySelector('footer.glb-footer');
    let blogSection = document.querySelector('.glb-home-blogs-section-wrapper');

    if (footer && footer.parentNode) {
      footer.parentNode.insertBefore(container, footer);
    } else if (blogSection && blogSection.parentNode) {
      blogSection.parentNode.insertBefore(container, blogSection.nextSibling);
    } else {
      document.body.appendChild(container);
    }

    setTimeout(() => {
      if (typeof window.rabtoApplyTilt === 'function') window.rabtoApplyTilt();
    }, 200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(insertLocation, 300));
  } else {
    setTimeout(insertLocation, 300);
  }
})();
