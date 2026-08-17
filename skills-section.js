(function() {
  // Rabto Skill Engine: modern-startup-design, cinematic-web-typography & svg-motion-graphics
  
  const styles = `
    .glb-skills-section {
      padding: 90px 5%;
      background: rgba(10, 10, 18, 0.65);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      color: white;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      position: relative;
      z-index: 10;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    .glb-skills-inner {
      max-width: 1240px;
      margin: 0 auto;
    }
    .glb-skills-header {
      text-align: center;
      margin-bottom: 50px;
    }
    .glb-skills-badge {
      display: inline-block;
      padding: 6px 16px;
      background: rgba(139, 92, 246, 0.12);
      border: 1px solid rgba(139, 92, 246, 0.3);
      color: #a78bfa;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      border-radius: 20px;
      margin-bottom: 12px;
    }
    .glb-skills-header h2 {
      font-size: clamp(2.2rem, 4.5vw, 3.2rem);
      margin: 0 0 12px;
      background: linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 40%, #8B5CF6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -1px;
      font-weight: 700;
    }
    .glb-skills-header p {
      color: #888;
      font-size: 1.1rem;
      max-width: 640px;
      margin: 0 auto;
      line-height: 1.6;
    }

    /* Tabs */
    .glb-skills-tabs {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 45px;
      flex-wrap: wrap;
    }
    .glb-skills-tab {
      padding: 10px 22px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #aaa;
      border-radius: 30px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .glb-skills-tab:hover, .glb-skills-tab.active {
      background: #8B5CF6;
      color: #fff;
      border-color: #8B5CF6;
      box-shadow: 0 8px 20px rgba(139, 92, 246, 0.35);
    }

    /* Grid */
    .glb-skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
    }
    .glb-skill-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 18px;
      padding: 26px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      position: relative;
      overflow: hidden;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .glb-skill-card:hover {
      transform: translateY(-6px);
      border-color: rgba(139, 92, 246, 0.4);
      background: rgba(255, 255, 255, 0.05);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(139, 92, 246, 0.15);
    }
    .glb-skill-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .glb-skill-icon {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      background: rgba(139, 92, 246, 0.12);
      border: 1px solid rgba(139, 92, 246, 0.25);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 22px;
    }
    .glb-skill-badge-tag {
      font-size: 11px;
      font-weight: 700;
      color: #4ade80;
      background: rgba(74, 222, 128, 0.12);
      padding: 4px 10px;
      border-radius: 12px;
      border: 1px solid rgba(74, 222, 128, 0.2);
    }
    .glb-skill-title {
      font-size: 1.2rem;
      font-weight: 700;
      margin: 0;
      color: #fff;
    }
    .glb-skill-desc {
      font-size: 14px;
      color: #999;
      line-height: 1.5;
      margin: 0;
      flex-grow: 1;
    }
    /* Progress Bar */
    .glb-skill-progress-wrap {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 4px;
    }
    .glb-skill-progress-label {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-weight: 600;
      color: #aaa;
    }
    .glb-skill-progress-bar {
      width: 100%;
      height: 6px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      overflow: hidden;
    }
    .glb-skill-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #8B5CF6, #4ADE80);
      border-radius: 10px;
      width: 0%;
      transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1);
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
      <div class="glb-skill-card rabto-rainbow-border" data-category="${s.category}">
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
            <span class="glb-skills-badge">✨ OUR CAPABILITIES</span>
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

    // Place section above Reviews or Blog section
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

    // Tab Listeners
    document.querySelectorAll('.glb-skills-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.glb-skills-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderSkills(tab.dataset.filter);
        if (window.rabtoPlayClickSFX) window.rabtoPlayClickSFX(750, 'sine', 0.08);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(injectSkillsSection, 350));
  } else {
    setTimeout(injectSkillsSection, 350);
  }
})();
