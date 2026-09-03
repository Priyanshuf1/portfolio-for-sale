(function() {
  // Skills & Capabilities Showcase - Category Wise with Sliding Motion
  let activeSkillsTimeline = null;
  
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
      background: #e20001 !important;
      border: 1px solid #e20001 !important;
      color: #ffffff !important;
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
      margin-bottom: 50px;
      flex-wrap: wrap;
      position: sticky;
      top: 90px;
      z-index: 20;
    }
    .glb-skills-tab {
      padding: 9px 20px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(0, 0, 0, 0.08);
      color: #4b5563;
      border-radius: 24px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.25s ease;
      box-shadow: 0 2px 8px rgba(0,0,0,0.02);
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

    .glb-skills-category-group {
      margin-bottom: 60px;
      width: 100%;
    }
    .glb-skills-category-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 28px;
    }
    .glb-skills-category-title {
      font-size: clamp(1.25rem, 4vw, 1.65rem);
      font-weight: 800;
      color: #111827;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .glb-skills-category-line {
      flex-grow: 1;
      height: 1px;
      background: rgba(226, 0, 1, 0.15);
    }

    .glb-skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
      gap: 24px;
      width: 100%;
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
      transition: border-color 0.3s ease, background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    }
    .glb-skill-card:hover {
      border-color: rgba(226, 0, 1, 0.25);
      background: #FFF9E6;
      transform: translateY(-4px);
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

    @media (max-width: 768px) {
      .glb-skills-tabs {
        top: 70px;
      }
      .glb-skills-category-group {
        margin-bottom: 40px;
      }
      .glb-skills-grid {
        gap: 16px;
      }
    }
  `;

  const skillsData = [
    { title: "SEO", category: "skills", icon: "🚀", badge: "98% Mastery", desc: "Technical audits, keyword strategy, and backlink authority to secure #1 search engine rankings.", level: 98 },
    { title: "Meta and Google Ads", category: "skills", icon: "💰", badge: "4.2x ROAS", desc: "Precision PPC campaigns, audience retargeting, and high-conversion ad copy on Google & Meta.", level: 95 },
    { title: "Social Media Marketing", category: "skills", icon: "📲", badge: "3x Organic Reach", desc: "Viral short-form video strategy, engagement, and multi-channel brand building.", level: 92 },
    { title: "Website Design & Development", category: "skills", icon: "⚡", badge: "100/100 Speed", desc: "Next.js, Vite React, Framer, and custom ultra-fast web development.", level: 96 },
    { title: "UI/UX Design", category: "skills", icon: "🎨", badge: "Premium Standard", desc: "Figma design systems, glassmorphism, 3D interactive layouts, and user experience.", level: 94 },
    { title: "Shoot & Editing", category: "skills", icon: "🎬", badge: "Production Pro", desc: "Professional commercial shoots, post-production video editing, sound design, and color grading.", level: 94 },
    { title: "Graphic Design", category: "skills", icon: "💎", badge: "Visual Expert", desc: "Eye-catching social creatives, vector assets, company branding, and marketing collateral.", level: 93 },
    { title: "App Development", category: "skills", icon: "📱", badge: "iOS & Android", desc: "Cross-platform mobile apps using React Native, Flutter, and high-performance native integrations.", level: 91 }
  ];

  function initSkillsStackingAnimation() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const section = document.getElementById('glb-skills-section');
    if (!section) return;

    // Clean up any existing ScrollTriggers inside our capabilities section
    ScrollTrigger.getAll().forEach(t => {
      if (t.trigger && (t.trigger.tagName === 'H2' || (t.trigger.classList && t.trigger.classList.contains('glm-word-reveal')))) return;
      if (t.trigger === section || (t.trigger && t.trigger.closest && t.trigger.closest('#glb-skills-section') && t.trigger.tagName !== 'H2')) {
        t.kill(true);
      }
    });

    const groups = section.querySelectorAll('.glb-skills-category-group');
    groups.forEach(group => {
      const headerTitle = group.querySelector('.glb-skills-category-title');
      const headerLine = group.querySelector('.glb-skills-category-line');
      const cards = Array.from(group.querySelectorAll('.glb-skill-card'));

      // Slide in category title if present
      if (headerTitle) {
        gsap.fromTo(headerTitle,
          { opacity: 0, x: -35 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerTitle,
              start: 'top 92%',
              toggleActions: 'play none play none'
            }
          }
        );
      }

      // Grow category line if present
      if (headerLine && headerTitle) {
        gsap.fromTo(headerLine,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerTitle,
              start: 'top 92%',
              toggleActions: 'play none play none'
            }
          }
        );
      }

      // Stagger and slide cards in from alternate directions (left vs right)
      cards.forEach((card, index) => {
        const fill = card.querySelector('.glb-skill-progress-fill');
        const pct = card.querySelector('.glb-skill-percent');
        const level = parseInt(pct ? pct.dataset.level : 0);

        gsap.set(fill, { width: '0%' });
        if (pct) pct.textContent = '0%';

        let countObj = { val: 0 };
        const slideDirection = index % 2 === 0 ? -30 : 30; // Alternate left/right slide

        gsap.fromTo(card,
          { opacity: 0, y: 35, x: slideDirection },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              toggleActions: 'play none play none',
              onEnter: () => {
                // Animate progress bar fill
                gsap.to(fill, { width: `${level}%`, duration: 1.1, ease: 'power2.out' });
                // Count up text percentage
                gsap.fromTo(countObj, { val: 0 }, {
                  val: level,
                  duration: 1.1,
                  ease: 'power2.out',
                  onUpdate: () => {
                    if (pct) pct.textContent = Math.round(countObj.val) + '%';
                  }
                });
              },
              onLeaveBack: () => {
                gsap.set(fill, { width: '0%' });
                if (pct) pct.textContent = '0%';
                countObj.val = 0;
              }
            }
          }
        );
      });
    });

    ScrollTrigger.refresh();
  }

  function renderSkills() {
    const grid = document.getElementById("glbSkillsGrid");
    if (!grid) return;

    let html = `
      <div class="glb-skills-category-group" id="skills-cat-all">
        <div class="glb-skills-grid">
          ${skillsData.map(s => `
            <div class="glb-skill-card" data-category="skills">
              <div class="glb-skill-top">
                <div class="glb-skill-icon">${s.icon}</div>
                <span class="glb-skill-badge-tag">${s.badge}</span>
              </div>
              <h3 class="glb-skill-title">${s.title}</h3>
              <p class="glb-skill-desc">${s.desc}</p>
              <div class="glb-skill-progress-wrap">
                <div class="glb-skill-progress-label">
                  <span>Proficiency</span>
                  <span class="glb-skill-percent" data-level="${s.level}">0%</span>
                </div>
                <div class="glb-skill-progress-bar">
                  <div class="glb-skill-progress-fill" style="width: 0%;" data-level="${s.level}"></div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    grid.innerHTML = html;

    // Trigger animations
    setTimeout(initSkillsStackingAnimation, 60);
  }

  function injectSkillsSection() {
    const html = `
      <div class="glb-skills-section" id="glb-skills-section">
        <div class="glb-skills-inner">
          <div class="glb-skills-header" style="margin-bottom: 50px;">
            <h2 class="h2-fluid" style="margin:0;">Our Services</h2>
          </div>

          <div id="glbSkillsGrid"></div>
        </div>
      </div>
    `;

    let container = document.getElementById('glb-skills-section');
    if (!container) {
      container = document.createElement('section');
      container.id = 'glb-skills-section';
      container.className = 'glb-skills-section';
      container.innerHTML = html;

      const styleEl = document.createElement('style');
      styleEl.innerHTML = styles;
      document.head.appendChild(styleEl);

      renderSkills();
    } else {
      const grid = document.getElementById('glbSkillsGrid');
      if (grid && grid.children.length === 0) {
        renderSkills();
      }
    }

    // Always position it before #why-choose-us (or #glb-company-details-wrapper)
    const whyUs = document.getElementById('why-choose-us') || document.getElementById('glb-company-details-wrapper');
    const reviewsSec = document.getElementById('glb-reviews-section');
    const blogSec = document.querySelector('.glb-home-blogs-section-wrapper');
    const footer = document.querySelector('footer.glb-footer');

    if (whyUs && whyUs.parentNode) {
      if (container.nextElementSibling !== whyUs) {
        whyUs.parentNode.insertBefore(container, whyUs);
      }
    } else if (reviewsSec && reviewsSec.parentNode) {
      if (container.nextElementSibling !== reviewsSec) {
        reviewsSec.parentNode.insertBefore(container, reviewsSec);
      }
    } else if (blogSec && blogSec.parentNode) {
      if (container.nextElementSibling !== blogSec) {
        blogSec.parentNode.insertBefore(container, blogSec);
      }
    } else if (footer && footer.parentNode) {
      if (container.nextElementSibling !== footer) {
        footer.parentNode.insertBefore(container, footer);
      }
    } else if (!container.parentNode) {
      document.body.appendChild(container);
    }
    if (window.initHeadingWordReveals) setTimeout(window.initHeadingWordReveals, 120);
    if (window.initHeadingWordReveals) window.initHeadingWordReveals();
  }

  // Initial and recurring check
  injectSkillsSection();
  let _skillsTimerCount = 0;
  const _skillsTimer = setInterval(function() {
    injectSkillsSection();
    _skillsTimerCount++;
    if (document.getElementById('glb-skills-section') || _skillsTimerCount > 10) {
      clearInterval(_skillsTimer);
    }
  }, 500);

  // Refresh layout on resize
  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    initSkillsStackingAnimation();
  }, { passive: true });
})();
