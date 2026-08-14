(function() {
  const styles = `
    .glb-location-section {
      padding: 60px 5%;
      background: var(--bg, #0a0a0a);
      color: white;
      font-family: 'Inter', sans-serif;
      position: relative;
      z-index: 10;
      border-top: 1px solid rgba(255,255,255,0.05);
    }
    .glb-location-container {
      display: flex;
      flex-wrap: wrap;
      gap: 40px;
      max-width: 1200px;
      margin: 0 auto;
      align-items: center;
    }
    .glb-location-text {
      flex: 1;
      min-width: 300px;
    }
    .glb-location-text h2 {
      font-size: 2.5rem;
      margin: 0 0 20px;
      background: linear-gradient(180deg, #FFFFFF 0%, #888888 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -1px;
    }
    .glb-location-text p {
      color: #a0a0a0;
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    .glb-contact-info {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .glb-contact-info li {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 15px;
      color: #fff;
      font-size: 1rem;
    }
    .glb-contact-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #4ade80;
      flex-shrink: 0;
    }
    .glb-map-wrapper {
      flex: 1.5;
      min-width: 320px;
      height: 400px;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.1);
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    .glb-map-wrapper iframe {
      width: 100%;
      height: 100%;
      border: 0;
      filter: invert(90%) hue-rotate(180deg) grayscale(80%) contrast(120%);
    }
  `;

  const html = `
    <div class="glb-location-section">
      <div class="glb-location-container">
        <div class="glb-location-text">
          <h2>Our Location</h2>
          <p>Global Logic Media is headquartered in Lucknow. We are always ready to help you elevate your brand and grow your digital presence.</p>
          <ul class="glb-contact-info">
            <li>
              <div class="glb-contact-icon">📍</div>
              <span>Lucknow, Uttar Pradesh, India</span>
            </li>
            <li>
              <div class="glb-contact-icon">✉️</div>
              <span>hello@globallogicmedia.com</span>
            </li>
            <li>
              <div class="glb-contact-icon">📞</div>
              <span>+91-7570060896</span>
            </li>
          </ul>
        </div>
        <div class="glb-map-wrapper">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113911.36551061921!2d80.87103855!3d26.8485966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </div>
  `;

  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);

  const container = document.createElement('section');
  container.innerHTML = html;

  // Insert right above the custom footer
  let footer = document.querySelector('footer.glb-footer');
  let mainRoot = document.getElementById('main') || document.body;
  
  if (footer && footer.parentNode) {
      footer.parentNode.insertBefore(container, footer);
  } else {
      mainRoot.appendChild(container);
  }
})();
