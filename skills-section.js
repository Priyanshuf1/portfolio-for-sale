(function() {
  // Skills & Capabilities Showcase - Gold Theme with Liquid Platinum Silver Buttons
  
  const styles = `
    .glb-skills-section {
      padding: 80px 5%;
      background: transparent;
      color: white;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      position: relative;
      z-index: 10;
      border-top: 1px solid rgba(255, 199, 44, 0.15);
    }
    .glb-skills-inner {
      max-width: 1200px;
      margin: 0 auto;
    }
    .glb-skills-header {
      text-align: center;
      margin-bottom: 45px;
    }
    .glb-skills-badge {
      display: inline-block;
      padding: 5px 14px;
      background: rgba(255, 199, 44, 0.1);
      border: 1px solid rgba(255, 199, 44, 0.35);
      color: #FFC72C;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      border-radius: 20px;
      margin-bottom: 14px;
    }
    .glb-skills-header h2 {
      font-size: clamp(2rem, 4vw, 3rem);
      margin: 0 0 10px;
      background: linear-gradient(180deg, #FFF2A3 0%, #FFC72C 50%, #D48806 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -1px;
      font-weight: 700;
    }
    .glb-skills-header p {
      color: #888888;
      font-size: 1.05rem;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .glb-skills-tabs {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }
    .glb-skills-tab {
      padding: 9px 20px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #888888;
      border-radius: 24px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.25s ease;
    }
    .glb-skills-tab:hover {
      color: #ffffff;
      border-color: rgba(255, 255, 255, 0.25);
    }
    .glb-skills-tab.active {
      background: linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 45%, #94A3B8 100%);
      color: #0A0E27;
      border-color: #ffffff;
      box-shadow: 0 4px 20px rgba(255, 255, 255, 0.25);
    }

    .glb-skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
      gap: 22px;
    }
    .glb-skill-card {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      position: relative;
      box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, 0.08), 0 10px 25px rgba(0, 0, 0, 0.4);
      transition: all 0.3s ease;
    }
    .glb-skill-card:hover {
      border-color: rgba(255, 199, 44, 0.4);
      background: rgba(26, 26, 26, 0.9);
      box-shadow: inset 0px 1px 0px 0px rgba(255, 199, 44, 0.2), 0 15px 30px rgba(0, 0, 0, 0.6);
    }
    .glb-skill-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .glb-skill-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(255, 199, 44, 0.1);
      border: 1px solid rgba(255, 199, 44, 0.25);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
    }
    .glb-skill-badge-tag {
      font-size: 11px;
      font-weight: 600;
      color: #FFC72C;
      background: rgba(255, 199, 44, 0.1);
      padding: 3px 9px;
      border-radius: 10px;
      border: 1px solid rgba(255, 199, 44, 0.25);
    }
    .glb-skill-title {
      font-size: 1.15rem;
      font-weight: 600;
      margin: 0;
      color: #ffffff;
    }
    .glb-skill-desc {
      font-size: 13.5px;
      color: #888888;
      line-height: 1.5;
      margin: 0;
      flex-grow: 1;
    }
    
    .glb-skill-progress-wrap {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-top: 2px;
    }
    .glb-skill-progress-label {
      display: flex;
      justify-content: space-between;
      font-size: 11.5px;
      font-weight: 600;
      color: #888888;
    }
    .glb-skill-progress-bar {
      width: 100%;
      height: 5px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 8px;
      overflow: hidden;
    }
    .glb-skill-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #FFC72C, #FFE066);
      border-radius: 8px;
      width: 0%;
      transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
  `;

  const skillsData = [
    { title: "SEO & Search Dominance", category: "marketing", icon: "🚀", badge: "98% Mastery", desc: "Technical audits, keyword strategy, and backlink authority to secure #1 rankings.", level: 98 },
    { title: "High-ROI Meta & Google Ads", category: "marketing", icon: "💰", badge: "4.2x ROAS", desc: "Precision PPC campaigns, audience retargeting, and high-conversion ad copy.", level: 95 },
    { title: "Custom Web Architecture", category: "development", icon: "⚡", badge: "100/100 Speed", desc: "Next.js, Vite React, Framer, and custom ultra-fast web development.", level: 96 },
    { title: "UI/UX & Brand Design", category: "design", icon: "🎨", badge: "Awwwards Standard", desc: "Figma design systems, glassmorphism, 3D interactive layouts, and brand identity.", level: 94 },
    { title: "Social Media Growth", category: "marketing", icon: "📲", badge: "3x Organic Reach", desc: "Viral short-form video strategy, engagement, and multi-channel brand building.", level: 92 },
    { title: "Conversion Optimization", category: "marketing", icon: "📈", badge: "3x Lead Rate", desc: "A/B testing, user journey mapping, and conversion funnel engineering.", level: 95 },
    { title: "Analytics & Tracking", category: "development", icon: "📊", badge: "Data-Driven", desc: "GA4, Google Tag Manager, custom event tracking, and ROI attribution dashboards.", level: 90 },
    { title: "Copywriting & Strategy", category: "design", icon: "✍️", badge: "High Converting", desc: "Persuasive sales copy, landing page messaging, and SEO editorial content.", level: 93 }
  ];

  function renderSkills(filter = "all") {
    const grid = document.getElementById("glbSkillsGrid");
    if (!grid) return;

    const filtered = filter === "all" ? skillsData : skillsData.filter(s => s.category === filter);

    grid.innerHTML = filtered.map(s => `
      <div class="glb-skill-card" data-category="${s.category}">
        <div class="glb-skill-top">
          <div class="glb-skill-icon">${s.icon}</div>
          <span class="glb-skill-badge-tag">${s.badge}</span>
        </div>
        <h3 class="glb-skill-title">${s.title}</h3>
        <p class="glb-skill-desc">${s.desc}</p>
        <div class="glb-skill-progress-wrap">
          <div class="glb-skill-progress-label">
            <span>Proficiency</span>
            <span>${s.level}%</span>
          </div>
          <div class="glb-skill-progress-bar">
            <div class="glb-skill-progress-fill" style="width: ${s.level}%;"></div>
          </div>
        </div>
      </div>
    `).join('');
  }

  function injectSkillsSection() {
    if (document.getElementById('glb-skills-section')) return;

    const html = `
      <div class="glb-skills-section" id="glb-skills-section">
        <div class="glb-skills-inner">
          <div class="glb-skills-header">
            <span class="glb-skills-badge">OUR CAPABILITIES</span>
            <h2>Skills & Digital Expertise</h2>
            <p>High-performance marketing, cutting-edge web engineering, and award-winning design.</p>
          </div>

          <div class="glb-skills-tabs">
            <button class="glb-skills-tab active" data-filter="all">All Skills</button>
            <button class="glb-skills-tab" data-filter="marketing">Digital Marketing</button>
            <button class="glb-skills-tab" data-filter="development">Web Development</button>
            <button class="glb-skills-tab" data-filter="design">UI/UX & Design</button>
          </div>

          <div class="glb-skills-grid" id="glbSkillsGrid"></div>
        </div>
      </div>
    `;

    const styleEl = document.createElement('style');
    styleEl.innerHTML = styles;
    document.head.appendChild(styleEl);

    const container = document.createElement('section');
    container.innerHTML = html;

    let reviewsSec = document.getElementById('glb-reviews-section');
    let blogSec = document.querySelector('.glb-home-blogs-section-wrapper');
    let footer = document.querySelector('footer.glb-footer');
    let body = document.body;

    if (reviewsSec && reviewsSec.parentNode) {
      reviewsSec.parentNode.insertBefore(container.firstElementChild, reviewsSec);
    } else if (blogSec && blogSec.parentNode) {
      blogSec.parentNode.insertBefore(container.firstElementChild, blogSec);
    } else if (footer && footer.parentNode) {
      footer.parentNode.insertBefore(container.firstElementChild, footer);
    } else {
      body.appendChild(container.firstElementChild);
    }

    renderSkills('all');

    document.querySelectorAll('.glb-skills-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.glb-skills-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderSkills(tab.dataset.filter);
        if (window.rabtoPlayClickSFX) window.rabtoPlayClickSFX(750, 'sine', 0.08);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(injectSkillsSection, 300));
  } else {
    setTimeout(injectSkillsSection, 300);
  }
})();
