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
      transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
    }
    .glb-contact-card:hover {
      background: rgba(255,255,255,0.06);
      border-color: rgba(255,199,44,0.5);
      transform: translateX(4px);
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

    /* Map Box — 3D tilt wrapper */
    .glb-map-tilt-wrapper {
      position: relative;
      min-height: 460px;
      border-radius: 20px;
      transform-style: preserve-3d;
      transition: transform 0.15s cubic-bezier(0.2,0,0.2,1), box-shadow 0.3s ease;
      border: 1px solid rgba(255,199,44,0.35);
      box-shadow: 0 20px 60px rgba(0,0,0,0.8), 0 0 35px rgba(255,199,44,0.2);
      overflow: hidden;
    }
    .glb-map-tilt-wrapper:hover {
      border-color: rgba(255,199,44,0.7) !important;
      box-shadow: 0 25px 70px rgba(0,0,0,0.9), 0 0 50px rgba(255,199,44,0.4) !important;
    }

    /* Spotlight glare overlay — pointer-events none so iframe still gets clicks */
    .glb-map-spotlight {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      background: radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(255,199,44,0.12), transparent 45%);
      border-radius: inherit;
      z-index: 3;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
    .glb-map-tilt-wrapper:hover .glb-map-spotlight { opacity: 1; }

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

    /* The actual iframe fills the whole box */
    .glb-map-iframe-element {
      width: 100%; height: 100%; min-height: 460px;
      border: 0; display: block;
      position: relative; z-index: 1;
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

  // Use OpenStreetMap (never blocked, no API key needed, free forever)
  const osmSrc = 'https://www.openstreetmap.org/export/embed.html?bbox=80.9182%2C26.8148%2C81.0182%2C26.8748&layer=mapnik&marker=26.8448%2C80.9683';

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

          <div class="glb-map-tilt-wrapper" id="glbMapTilt">
            <div class="glb-map-spotlight" id="glbMapSpotlight"></div>
            <div class="glb-map-floating-badge">
              <span class="glb-map-dot"></span>
              <span>Gomti Nagar, Lucknow — Live HQ</span>
            </div>
            <iframe
              class="glb-map-iframe-element"
              src="${osmSrc}"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
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

  function init3DTilt() {
    const box = document.getElementById('glbMapTilt');
    const spotlight = document.getElementById('glbMapSpotlight');
    if (!box) return;

    // 3D tilt on the wrapper — pointer still passes through to iframe inside
    box.addEventListener('mousemove', (e) => {
      const r = box.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const cx = r.width / 2, cy = r.height / 2;
      const rx = ((y - cy) / cy) * -6;
      const ry = ((x - cx) / cx) * 6;
      box.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.015,1.015,1.015)`;
      if (spotlight) {
        spotlight.style.setProperty('--mx', `${x}px`);
        spotlight.style.setProperty('--my', `${y}px`);
      }
    });

    box.addEventListener('mouseleave', () => {
      box.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    });
  }

  function insertLocation() {
    // Remove old instance if any
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

    setTimeout(init3DTilt, 200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(insertLocation, 300));
  } else {
    setTimeout(insertLocation, 300);
  }
})();
