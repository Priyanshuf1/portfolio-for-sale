(function() {
  const styles = `
    .glb-location-section {
      padding: 90px 5%;
      background: #ffffff;
      color: #111827;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      position: relative;
      z-index: 10;
      border-top: 1px solid rgba(0,0,0,0.06);
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
      background: #e20001 !important;
      border: 1px solid #e20001 !important;
      color: #ffffff !important;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      border-radius: 20px;
      margin-bottom: 12px;
    }
    .glb-location-header h2 {
      font-size: clamp(1.8rem, 3.5vw, 2.8rem);
      margin: 0 0 12px;
      color: #111827;
      letter-spacing: -0.5px;
      font-weight: 800;
    }
    .glb-location-header p {
      color: #6b7280;
      font-size: 1.05rem;
      max-width: 580px;
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
      background: #ffffff;
      border: 1px solid rgba(0,0,0,0.07);
      border-radius: 16px;
      padding: 20px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .glb-contact-card:hover {
      background: #fafafa;
      border-color: rgba(226, 0, 1, 0.3);
      box-shadow: 0 4px 16px rgba(226,0,1,0.05);
    }
    .glb-contact-card-left { display: flex; align-items: center; gap: 16px; }
    .glb-contact-card-icon {
      width: 48px; height: 48px;
      border-radius: 12px;
      background: rgba(226, 0, 1, 0.07);
      border: 1px solid rgba(226, 0, 1, 0.15);
      display: flex; justify-content: center; align-items: center;
      font-size: 20px; flex-shrink: 0;
    }
    .glb-contact-card-info { display: flex; flex-direction: column; gap: 3px; }
    .glb-contact-card-label {
      font-size: 11px; text-transform: uppercase; letter-spacing: 1px;
      color: #e20001; font-weight: 700;
    }
    .glb-contact-card-val { color: #111827; font-size: 0.95rem; font-weight: 500; line-height: 1.4; }
    .glb-contact-card-action {
      display: inline-flex; align-items: center; justify-content: center; gap: 6px;
      width: 126px; min-width: 126px; height: 38px; box-sizing: border-box;
      background: #e20001 !important;
      border: 1px solid #e20001 !important;
      color: #ffffff !important; border-radius: 8px !important; font-size: 13px; font-weight: 700;
      text-decoration: none; white-space: nowrap; transition: all 0.2s;
      text-align: center;
    }
    .glb-contact-card:hover .glb-contact-card-action {
      background: #c10001 !important; color: #ffffff !important; border-color: #c10001 !important;
    }

    /* Map Box Container */
    .glb-map-container-box {
      position: relative;
      min-height: 460px;
      border-radius: 20px;
      border: 1px solid rgba(226, 0, 1,0.2);
      box-shadow: 0 12px 40px rgba(0,0,0,0.08), 0 0 20px rgba(226, 0, 1,0.06);
      overflow: hidden;
      background: #f9f9f9;
    }

    .glb-map-floating-badge {
      position: absolute; top: 16px; left: 16px; z-index: 5;
      background: rgba(10,14,39,0.92);
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(226, 0, 1,0.35);
      color: #fff; padding: 8px 16px; border-radius: 30px;
      font-size: 13px; font-weight: 600;
      display: flex; align-items: center; gap: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      pointer-events: none;
    }
    .glb-map-dot {
      width: 10px; height: 10px; border-radius: 50%;
      background: #e20001; box-shadow: 0 0 12px #e20001;
      animation: pulseDot 2s infinite;
    }
    @keyframes pulseDot {
      0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(226, 0, 1,0.7); }
      70%  { transform: scale(1);    box-shadow: 0 0 0 10px rgba(226, 0, 1,0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(226, 0, 1,0); }
    }

    /* Live Google Maps Iframe */
    .glb-map-iframe-element {
      width: 100%; height: 100%; min-height: 460px;
      border: 0; display: block;
      position: relative; z-index: 1;
    }

    .glb-map-direct-btn {
      position: absolute; bottom: 16px; right: 16px; z-index: 5;
      background: #e20001 !important;
      background-color: #e20001 !important;
      border: 1px solid #e20001 !important;
      color: #ffffff !important; font-weight: 700; font-size: 12px;
      padding: 8px 16px; border-radius: 20px;
      text-decoration: none; box-shadow: 0 4px 14px rgba(226, 0, 1, 0.3);
      transition: all 0.2s ease;
    }
    .glb-map-direct-btn:hover { background: #a30000 !important; border-color: #a30000 !important; color: #ffffff !important; }
  `;

  // Proper Google Maps Embed URL for Gomti Nagar, Lucknow
  const mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.345929948543!2d80.96551751503878!3d26.844838983185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39995890f8218c79%3A0x2df3c0c62b6e6fca!2sGomti%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh%20226010!5e0!3m2!1sen!2sin!4v1693000000000!5m2!1sen!2sin';

  const html = `
    <div class="glb-location-section">
      <div class="glb-location-inner">
        <div class="glb-location-header">
          <span class="glb-location-badge">OUR OFFICE</span>
          <h2>Visit Our Office</h2>
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
                  <span class="glb-contact-card-val">+91-9208111603</span>
                </div>
              </div>
              <a href="tel:+919208111603" class="glb-contact-card-action">Call Us <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-left:2px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></a>
            </div>
            <div class="glb-contact-card">
              <div class="glb-contact-card-left">
                <div class="glb-contact-card-icon">✉️</div>
                <div class="glb-contact-card-info">
                  <span class="glb-contact-card-label">Email Inquiries</span>
                  <span class="glb-contact-card-val">globallogicmedia06@gmail.com</span>
                </div>
              </div>
              <a href="mailto:globallogicmedia06@gmail.com" class="glb-contact-card-action">Email Us ✉️</a>
            </div>
            <div class="glb-contact-card">
              <div class="glb-contact-card-left">
                <div class="glb-contact-card-icon">🕒</div>
                <div class="glb-contact-card-info">
                  <span class="glb-contact-card-label">Working Hours</span>
                  <span class="glb-contact-card-val">Mon – Sat: 9:00 AM – 7:00 PM IST</span>
                </div>
              </div>
              <span class="glb-contact-card-action">Open Today</span>
            </div>
          </div>

          <div class="glb-map-container-box" id="glbMapBox">
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
