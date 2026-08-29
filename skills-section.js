(function() {
  // Skills & Capabilities Showcase - Warm Light Theme
  
  const styles = `
    .glb-skills-section {
      padding: 80px 5%;
      background: transparent;
      color: #111827;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      position: relative;
      z-index: 10;
      border-top: 1px solid rgba(226, 0, 1, 0.1);
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
      background: rgba(226, 0, 1, 0.05);
      border: 1px solid rgba(226, 0, 1, 0.2);
      color: #e20001;
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
      color: #111827;
      letter-spacing: -1px;
      font-weight: 700;
    }
    .glb-skills-header p {
      color: #4b5563;
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
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.08);
      color: #4b5563;
      border-radius: 24px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.25s ease;
    }
    .glb-skills-tab:hover {
      color: #e20001;
      border-color: rgba(226, 0, 1, 0.2);
    }
    .glb-skills-tab.active {
      background: #e20001;
      color: #ffffff;
      border-color: #e20001;
      box-shadow: 0 4px 15px rgba(226, 0, 1, 0.2);
    }

    .glb-skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
      gap: 22px;
    }
    .glb-skill-card {
      background: #FFFDF0;
      border: 1px solid rgba(226, 160, 0, 0.12);
      border-radius: 16px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      position: relative;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
      transition: all 0.3s ease;
    }
    .glb-skill-card:hover {
      border-color: rgba(226, 0, 1, 0.25);
      background: #FFF9E6;
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(226, 0, 1, 0.05);
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
      background: rgba(226, 0, 1, 0.05);
      border: 1px solid rgba(226, 0, 1, 0.15);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
    }
    .glb-skill-badge-tag {
      font-size: 11px;
      font-weight: 600;
      color: #e20001;
      background: rgba(226, 0, 1, 0.05);
      padding: 3px 9px;
      border-radius: 10px;
      border: 1px solid rgba(226, 0, 1, 0.15);
    }
    .glb-skill-title {
      font-size: 1.15rem;
      font-weight: 600;
      margin: 0;
      color: #111827;
    }
    .glb-skill-desc {
      font-size: 13.5px;
      color: #4b5563;
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
      color: #6b7280;
    }
    .glb-skill-progress-bar {
      width: 100%;
      height: 5px;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 8px;
      overflow: hidden;
    }
    .glb-skill-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #e20001, #ff4d4d);
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
    { title: "Copywriting & Strategy", category: "design", icon: "✍️", badge: "High Converting", desc: "Persuasive sales copy, landing page messaging, and SEO editorial content.", level: 93 },
    
    // Additional Max UI/UX Skills
    { title: "Figma Design Systems", category: "design", icon: "💎", badge: "Pro Components", desc: "Reusable component libraries, variables, advanced auto-layout, and clickable high-fi prototypes.", level: 97 },
    { title: "Motion Physics & GSAP", category: "design", icon: "🎬", badge: "60fps Smoothness", desc: "Custom cubic-bezier transitions, Lenis scroll integration, and fluid GSAP choreographies.", level: 94 },
    { title: "User Research & Audit", category: "design", icon: "🔍", badge: "Heuristics Expert", desc: "Heatmaps, click maps, user journeys, behavioral heuristics, and usability testing.", level: 91 },
    { title: "Growth Funnel Engineering", category: "marketing", icon: "🎯", badge: "High Convert", desc: "High-speed landing page architecture, CRM automations, lead captures, and A/B split-tests.", level: 96 }
  ];

  function initSkillsStackingAnimation() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const section = document.getElementById('glb-skills-section');
    if (!section) return;

    const grid = document.getElementById('glbSkillsGrid');
    const cards = section.querySelectorAll('.glb-skill-card');
    if (!cards.length) return;

    const isDesktop = window.innerWidth > 900;

    // Clean up any existing ScrollTrigger for this section/grid
    ScrollTrigger.getAll().forEach(t => {
      if (t.trigger === section || t.vars.trigger === section) {
        t.kill(true);
      }
    });

    if (!isDesktop) {
      section.classList.remove('stack-active');
      grid.style.height = '';
      cards.forEach(card => {
        gsap.set(card, { clearProps: 'all' });
      });
      return;
    }

    section.classList.add('stack-active');

    // Set height of the stack block to hold cards
    const cardHeight = 280;
    grid.style.height = `${cardHeight}px`;

    // Position all cards directly on top of each other
    cards.forEach((card, idx) => {
      gsap.set(card, {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: `${cardHeight}px`,
        margin: '0 auto',
        zIndex: idx + 10,
        transformOrigin: 'center bottom'
      });
    });

    // Create the GSAP ScrollTrigger timeline to pin and stack cards sequentially
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 90px', // Pin offset to clear header
        end: () => `+=${cards.length * 300}`,
        pin: true,
        scrub: 0.5,
        invalidateOnRefresh: true
      }
    });

    // Animate each card stacking on top of the previous
    cards.forEach((card, idx) => {
      if (idx === 0) {
        gsap.set(card, { yPercent: 0, opacity: 1, scale: 1 });
        return;
      }

      // Initial state of incoming card
      gsap.set(card, { yPercent: 120, opacity: 0.1, scale: 0.95 });

      // Slide in current card
      tl.to(card, {
        yPercent: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power1.out'
      });

      // Stagger animation for background cards (push up and scale down)
      for (let j = 0; j < idx; j++) {
        const behind = cards[j];
        const depth = idx - j;
        tl.to(behind, {
          y: -depth * 14,
          scale: 1 - depth * 0.035,
          opacity: Math.max(0.45, 1 - depth * 0.15),
          duration: 1,
          ease: 'power1.out'
        }, '<');
      }

      // Brief pause where card stays active
      tl.to({}, { duration: 0.35 });
    });
  }

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

    // Trigger card stacking calculations
    setTimeout(initSkillsStackingAnimation, 60);
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

    // Refresh layout on resize to adapt between grid and stack modes
    window.addEventListener('resize', initSkillsStackingAnimation, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(injectSkillsSection, 300));
  } else {
    setTimeout(injectSkillsSection, 300);
  }
})();
