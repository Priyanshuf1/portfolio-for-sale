(function() {
  const styles = `
    /* ── Why Choose Us & Team Sections Styling ── */
    .glb-additional-details {
      color: white;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      background: transparent;
      position: relative;
      z-index: 10;
    }
    
    /* Why Choose Us Section */
    .glb-why-us-section {
      padding: 90px 5%;
      border-top: 1px solid rgba(226, 0, 1, 0.15);
    }
    .glb-why-us-inner {
      max-width: 1200px;
      margin: 0 auto;
    }
    .glb-why-us-header {
      text-align: center;
      margin-bottom: 55px;
    }
    .glb-why-us-badge {
      display: inline-block;
      padding: 6px 16px;
      background: rgba(226, 0, 1, 0.1);
      border: 1px solid rgba(226, 0, 1, 0.35);
      color: #e20001;
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      border-radius: 20px;
      margin-bottom: 14px;
    }
    .glb-why-us-header h2 {
      font-size: clamp(2.3rem, 5vw, 3.5rem) !important;
      margin: 0 0 10px;
      color: #e20001 !important;
      background: none !important;
      -webkit-text-fill-color: #e20001 !important;
      letter-spacing: -1px;
      font-weight: 900;
    }
    .glb-why-us-header p {
      color: #888888;
      font-size: 1.05rem;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .glb-comparison-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 36px;
      align-items: stretch;
    }
    @media (max-width: 850px) {
      .glb-comparison-grid {
        grid-template-columns: 1fr;
        gap: 28px;
      }
    }
    
    .glb-comparison-card {
      background: transparent;
      border-radius: 20px;
      padding: 36px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 24px;
      position: relative;
      transition: all 0.35s ease;
    }
    
    .glb-comparison-card.others {
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(255, 255, 255, 0.01);
    }
    .glb-comparison-card.others:hover {
      border-color: rgba(255, 255, 255, 0.15);
    }
    
    .glb-comparison-card.glm {
      border: 1px solid rgba(226, 0, 1, 0.25);
      background: rgba(226, 0, 1, 0.02);
      box-shadow: inset 0 0 25px rgba(226, 0, 1, 0.03);
    }
    .glb-comparison-card.glm:hover {
      border-color: rgba(226, 0, 1, 0.6);
      background: rgba(226, 0, 1, 0.04);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(226, 0, 1, 0.08);
    }
    
    .glb-comp-title {
      font-size: 1.4rem;
      font-weight: 700;
      margin: 0;
    }
    .glb-comparison-card.others .glb-comp-title {
      color: #aaa;
    }
    .glb-comparison-card.glm .glb-comp-title {
      background: linear-gradient(180deg, #ff9999 0%, #e20001 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .glb-comp-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .glb-comp-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      font-size: 14.5px;
      line-height: 1.5;
    }
    
    .glb-comparison-card.others .glb-comp-item {
      color: #777;
    }
    .glb-comparison-card.glm .glb-comp-item {
      color: #ddd;
    }
    
    .glb-comp-icon {
      font-size: 16px;
      flex-shrink: 0;
      margin-top: 2px;
    }
    .glb-comparison-card.others .glb-comp-icon {
      color: #ef4444;
    }
    .glb-comparison-card.glm .glb-comp-icon {
      color: #22c55e;
    }

    /* Team Section */
    .glb-team-section {
      padding: 90px 5%;
      border-top: 1px solid rgba(226, 0, 1, 0.15);
    }
    .glb-team-inner {
      max-width: 1200px;
      margin: 0 auto;
    }
    .glb-team-header {
      text-align: center;
      margin-bottom: 55px;
    }
    .glb-team-badge {
      display: inline-block;
      padding: 6px 16px;
      background: #e20001 !important;
      border: 1px solid #e20001 !important;
      color: #ffffff !important;
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      border-radius: 20px;
      margin-bottom: 14px;
    }
    .glb-team-header h2 {
      font-size: clamp(2.3rem, 5vw, 3.5rem) !important;
      margin: 0 0 10px;
      color: #e20001 !important;
      background: none !important;
      -webkit-text-fill-color: #e20001 !important;
      letter-spacing: -1px;
      font-weight: 900;
    }
    .glb-team-header p {
      color: #888888;
      font-size: 1.05rem;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }
    
    .glb-team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 24px;
    }
    
    .glb-team-card {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      padding: 24px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .glb-team-card:hover {
      border-color: rgba(226, 0, 1, 0.45);
      background: rgba(226, 0, 1, 0.02);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.7), 0 0 20px rgba(226, 0, 1, 0.1);
      transform: translateY(-4px);
    }
    
    .glb-team-img-wrap {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.1);
      padding: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.35s ease;
      background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(226, 0, 1,0.05));
    }
    .glb-team-card:hover .glb-team-img-wrap {
      border-color: #e20001;
      box-shadow: 0 0 20px rgba(226, 0, 1, 0.3);
    }
    .glb-team-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
    
    .glb-team-meta {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .glb-team-name {
      font-size: 1.2rem;
      font-weight: 600;
      color: #ffffff;
      margin: 0;
    }
    
    .glb-team-role {
      font-size: 12px;
      font-weight: 700;
      color: #e20001;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .glb-team-desc {
      font-size: 13.5px;
      color: #888888;
      line-height: 1.5;
      margin: 0;
    }

    @media (max-width: 768px) {
      .glb-why-us-section, .glb-team-section {
        padding: 40px 16px;
      }
      .glb-why-us-header, .glb-team-header {
        margin-bottom: 30px;
      }
      .glb-comparison-card {
        padding: 24px;
      }
      .glb-team-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
    }
  `;

  const comparisonData = {
    others: [
      "Outsource your work to third parties.",
      "Offer fixed, generic packages for everyone.",
      "Focus on quick profits rather than client satisfaction.",
      "Use basic templates with no proper customization.",
      "Rely on untrained or entry-level staff.",
      "Lack regular communication with clients.",
      "No clear performance tracking or accountability.",
      "May charge hidden fees and restrict access to your data."
    ],
    glm: [
      "We have an in-house team—no outsourcing.",
      "Personalized plans designed to help you grow.",
      "Certified as a trusted Google Partner.",
      "Expert team with top-notch skill in every service.",
      "Personalized solutions instead of a \"one-size-fits-all\" approach.",
      "Clear transparency to track your growth.",
      "No Hidden Charges - Your data is always yours.",
      "We handle your marketing so you can focus on your business."
    ]
  };

  const teamData = [
    {
      name: "Ankur Verma",
      role: "Founder",
      image: "https://globallogicmedia.com/wp-content/uploads/2026/06/Ankur-Verma.png", // real profile image or fallback
      desc: "Visionary founder of Global Logic Media, driving digital marketing excellence, growth strategies, and high-impact campaigns globally."
    },
    {
      name: "Durgesh Choudary",
      role: "Co-Founder & SEO Lead",
      image: "https://globallogicmedia.com/wp-content/uploads/2025/08/cropped-Untitled-design-2.png", // Fallback placeholder
      desc: "Enhances online visibility through advanced SEO and Local SEO strategies, driving consistent traffic and high-intent leads."
    },
    {
      name: "Vishal Kumar",
      role: "Graphic Designer",
      image: "https://globallogicmedia.com/wp-content/uploads/2026/06/84f31190-fe7b-43c7-84e2-d9184d941b06.png",
      desc: "Crafts engaging visual assets, social media creative content, and premium branding layouts that capture target audiences."
    },
    {
      name: "Agrima Gupta",
      role: "Social Media Manager",
      image: "https://globallogicmedia.com/wp-content/uploads/2026/06/8709b1f3-6719-438c-8fe5-00e17ebaa399.png",
      desc: "Leads multi-channel social media profiles, curation, scheduling, and strategic engagement plans to skyrocket brand presence."
    },
    {
      name: "Aman",
      role: "Social Media Manager",
      image: "https://globallogicmedia.com/wp-content/uploads/2025/08/Teacher-1.jpg",
      desc: "Specializes in video layouts and brand awareness content generation to build high-reach, loyal online communities."
    }
  ];

  function injectCompanyDetails() {
    if (document.getElementById('glb-company-details-wrapper')) return;

    // Create container
    const wrapper = document.createElement('div');
    wrapper.id = 'glb-company-details-wrapper';
    wrapper.className = 'glb-additional-details';

    // Build comparison HTML
    const compOthersHtml = comparisonData.others.map(item => `
      <li class="glb-comp-item">
        <span class="glb-comp-icon">✖</span>
        <span>${item}</span>
      </li>
    `).join('');

    const compGlmHtml = comparisonData.glm.map(item => `
      <li class="glb-comp-item">
        <span class="glb-comp-icon">✔</span>
        <span>${item}</span>
      </li>
    `).join('');

    // Build team cards HTML (Using real image rendering with premium Unsplash fallback headshots)
    const teamCardsHtml = teamData.map(member => {
      const initials = member.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().substring(0, 2);
      const gradients = {
        "Ankur Verma": "linear-gradient(135deg, #FF9900, #FF5E62)",
        "Durgesh Choudary": "linear-gradient(135deg, #FF416C, #FF4B2B)",
        "Vishal Kumar": "linear-gradient(135deg, #4776E6, #8E54E9)",
        "Agrima Gupta": "linear-gradient(135deg, #f12711, #f5af19)",
        "Aman": "linear-gradient(135deg, #11998e, #38ef7d)"
      };
      const grad = gradients[member.name] || "linear-gradient(135deg, #e20001, #e20001)";
      
      const unsplashFallbacks = {
        "Ankur Verma": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256&h=256",
        "Durgesh Choudary": "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256&h=256",
        "Vishal Kumar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256",
        "Agrima Gupta": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256",
        "Aman": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256&h=256"
      };
      const fallbackImg = unsplashFallbacks[member.name] || "";

      const imgContent = `
        <img src="${member.image}" 
             alt="${member.name}" 
             style="width:100%; height:100%; object-fit:cover; border-radius:50%; display:block;"
             onerror="this.onerror=null; this.src='${fallbackImg}';" />
      `;

      return `
        <div class="glb-team-card">
          <div class="glb-team-img-wrap">
            ${imgContent}
          </div>
          <div class="glb-team-meta">
            <h3 class="glb-team-name">${member.name}</h3>
            <span class="glb-team-role">${member.role}</span>
          </div>
          <p class="glb-team-desc">${member.desc}</p>
        </div>
      `;
    }).join('');

    wrapper.innerHTML = `
      <!-- Why Choose Us / Comparison Section -->
      <section class="glb-why-us-section" id="why-choose-us">
        <div class="glb-why-us-inner">
          <div class="glb-why-us-header">
            <span class="glb-why-us-badge">The Advantage</span>
            <h2>Why Choose Us?</h2>
            <p>See how Global Logic Media | Digital Marketing Agency in Lucknow | SEO, Web Design & Lead Generation|Global Logic Media | Digital Marketing Agency in Lucknow | SEO, Web Design & Lead Generation|Global Logic Media | Digital Marketing Agency in Lucknow | SEO, Web Design & Lead Generationstacks up against generic marketing agencies and why we are trusted by Lucknow's leading companies.</p>
          </div>
          
          <div class="glb-comparison-grid">
            <div class="glb-comparison-card others">
              <h3 class="glb-comp-title">Other Agencies</h3>
              <ul class="glb-comp-list">
                ${compOthersHtml}
              </ul>
            </div>
            
            <div class="glb-comparison-card glm">
              <h3 class="glb-comp-title">Global Logic Media</h3>
              <ul class="glb-comp-list">
                ${compGlmHtml}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Meet Our Team Section -->
      <section class="glb-team-section" id="our-team">
        <div class="glb-team-inner">
          <div class="glb-team-header">
            <span class="glb-team-badge">OUR TEAM</span>
            <h2>Meet The Minds</h2>
            <p>Our dedicated Lucknow-based team of marketers, developers, and visual designers working together to grow your brand.</p>
          </div>
          
          <div class="glb-team-grid">
            ${teamCardsHtml}
          </div>
        </div>
      </section>
    `;

    // Find insertion point - right above #glb-reviews-section (Marquee) or FAQ section
    const target = document.getElementById('glb-reviews-section') || document.getElementById('faq');
    if (target && target.parentNode) {
      target.parentNode.insertBefore(wrapper, target);
    } else {
      document.body.appendChild(wrapper);
    }
  }

  // Inject styles once
  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);

  // Poll to ensure sections are always present in the DOM (surviving React hydration wipes)
  setInterval(injectCompanyDetails, 600);
})();
