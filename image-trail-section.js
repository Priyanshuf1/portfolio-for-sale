(function() {
  function decryptToken(encrypted) {
    try {
      return atob(encrypted).split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ 42)).join('');
    } catch(e) {
      return '';
    }
  }

  function inject() {
    // ── Early exit if both sections already built — prevents CSS animation flicker ──
    var existingMarquee = document.getElementById('glm-image-trail-section');
    var existingInsta = document.getElementById('glm-instagram-feed-section');
    if (existingMarquee && existingMarquee.dataset.marqueeBuilt &&
        existingInsta && existingInsta.dataset.elfsightBuilt) {
      return; // Both fully built — nothing to do
    }

    // ── Determine insertion anchor: before location section (map), reviews section, or footer ──
    var mapSec = document.getElementById('glb-location');
    var reviewsSec = document.getElementById('glb-reviews-section');
    var footerEl = document.querySelector('footer.glb-footer') || document.querySelector('footer');
    var insertAnchor = mapSec || reviewsSec || footerEl;
    if (!insertAnchor) return;

    // ── 1. Create or position the Recent Work Marquee Section ─────────────────
    var marqueeSection = document.getElementById('glm-image-trail-section');
    if (!marqueeSection) {
      marqueeSection = document.createElement('section');
      marqueeSection.id = 'glm-image-trail-section';
    }

    // Place marquee right before the anchor only if not already there
    if (marqueeSection.nextSibling !== insertAnchor) {
      insertAnchor.parentNode.insertBefore(marqueeSection, insertAnchor);
    }

    // Only set styles once (avoid resetting CSS animation every interval!)
    if (!marqueeSection.dataset.marqueeBuilt) {
      marqueeSection.style.cssText = [
        'position:relative',
        'width:100%',
        'min-height:75vh',
        'background:transparent !important',
        'display:flex',
        'flex-direction:column',
        'align-items:center',
        'justify-content:center',
        'overflow:hidden',
        'padding:60px 0 40px',
        'z-index:8'
      ].join(';');
    }

    // ── 2. Create or update the Instagram Feed Section ──────────────────────
    var instaSection = document.getElementById('glm-instagram-feed-section');
    if (!instaSection) {
      instaSection = document.createElement('section');
      instaSection.id = 'glm-instagram-feed-section';
      instaSection.className = 'glm-insta-section';
    }

    // Place instagram right after marquee
    if (marqueeSection.nextSibling !== instaSection) {
      marqueeSection.parentNode.insertBefore(instaSection, marqueeSection.nextSibling);
    }

    // Combined Stylesheet for Marquee, Bento Grid, and Story Rings
    const styles = `
<style id="glm-combined-layouts-styles">
  :root {
    --insta-gradient: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  }
  
  /* Marquee Styling */
  .glm-marquee-wrap {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    overflow: hidden;
    position: relative;
    margin-top: 30px;
    mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  }
  .glm-marquee-row {
    display: flex;
    width: max-content;
    gap: 28px;
  }
  .glm-marquee-row.left {
    animation: glmMarqueeLeft 50s linear infinite;
  }
  .glm-marquee-row.right {
    animation: glmMarqueeRight 50s linear infinite;
  }
  .glm-marquee-row:hover {
    animation-play-state: paused;
  }
  .glm-marquee-item {
    width: 290px;
    height: 200px;
    flex-shrink: 0;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(13, 13, 17, 0.75);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    cursor: pointer;
    position: relative;
    transform-style: preserve-3d;
    
    /* Staggered entrance initial state */
    opacity: 0;
    transform: translateY(45px) scale(0.94);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease;
  }
  .glm-marquee-item.animate-in {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  .glm-marquee-item:hover {
    border-color: #FF1744;
    box-shadow: 0 12px 30px rgba(255, 23, 68, 0.25);
  }
  .glm-marquee-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.85;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }
  .glm-marquee-item:hover img {
    opacity: 1;
  }

  @keyframes glmMarqueeLeft {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes glmMarqueeRight {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }

  /* Instagram Bento Section Styling */
  .glm-insta-section {
    position: relative;
    width: 100%;
    background: transparent !important;
    color: #ffffff !important;
    padding: 80px 5% !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    z-index: 10;
  }
  
  .glm-insta-section .elfsight-app-8b61b60e-8e55-4ffb-925d-eb7e70005a40 {
    min-height: 400px;
    display: block;
    width: 100%;
  }

  @media (max-width: 768px) {
    .glm-marquee-wrap {
      margin-top: 15px;
      gap: 16px;
    }
    .glm-marquee-row {
      gap: 16px;
    }
    .glm-marquee-item {
      width: 200px;
      height: 140px;
      border-radius: 12px;
      transform: translateY(30px) scale(0.95);
    }
  }
  
  /* Hide scrollbar helper */
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
`;
    if (!document.getElementById('glm-combined-layouts-styles')) {
      document.head.insertAdjacentHTML('beforeend', styles);
    }

    // ── 3. Populate Marquee Section HTML (Uncoupled from Instagram Check) ─────
    if (!marqueeSection.dataset.marqueeBuilt) {
      marqueeSection.innerHTML = `
        <div style="text-align:center;pointer-events:none;user-select:none;">
          <p style="color:#FF1744;font-size:clamp(12px,1.2vw,16px);letter-spacing:0.4em;text-transform:uppercase;margin-bottom:15px;font-family:sans-serif;font-weight:700;">our clients</p>
          <h2 style="color:#ffffff;font-size:clamp(36px,5vw,64px);font-weight:900;line-height:1.1;font-family:sans-serif;margin:0;">Proven Marketing Results</h2>
        </div>
        <div class="glm-marquee-wrap">
          <div class="glm-marquee-row right" id="marquee-row-2"></div>
        </div>
      `;

      var row2Images = [
        './ss9.png', './ss10.png', './ss11.png', './ss12.png',
        './ss13.png', './ss14.png', './ss15.png', './ss16.png'
      ];

      function fillRow(rowElId, images) {
        var row = document.getElementById(rowElId);
        if (!row) return;
        var doubled = images.concat(images);
        row.innerHTML = doubled.map(src => `
          <div class="glm-marquee-item" onclick="window.glmShowLightbox('${src}')">
            <img src="${src}" alt="Portfolio Proof" loading="lazy">
          </div>
        `).join('');

        // Staggered reveal animation triggers immediately on load
        setTimeout(function() {
          row.querySelectorAll('.glm-marquee-item').forEach(function(item, index) {
            setTimeout(function() {
              item.classList.add('animate-in');
            }, index * 60);
          });
        }, 150);
      }

      fillRow('marquee-row-2', row2Images);

      marqueeSection.dataset.marqueeBuilt = '1';
    }

    // ── 4. Populate Instagram Section with Elfsight Widget ───────────────────
    if (!instaSection.dataset.elfsightBuilt) {
      instaSection.innerHTML = `
        <div style="text-align:center; margin-bottom: 40px;">
          <span style="display:inline-block; padding: 5px 16px; background: rgba(226,0,1,0.1); border: 1px solid rgba(226,0,1,0.3); color: #e20001; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; border-radius: 20px; margin-bottom: 14px;">Instagram</span>
          <h2 style="margin: 0; font-weight: 900; color: #111827; font-size: clamp(1.8rem, 4vw, 2.8rem);">Follow Our Journey</h2>
        </div>
        <div style="max-width: 1100px; margin: 0 auto; min-height: 400px;">
          <div class="elfsight-app-8b61b60e-8e55-4ffb-925d-eb7e70005a40" data-elfsight-app-lazy></div>
        </div>
      `;

      instaSection.dataset.elfsightBuilt = '1';

      if (!document.querySelector('script[src*="elfsight.com"]')) {
        const script = document.createElement('script');
        script.src = "https://static.elfsight.com/platform/platform.js";
        script.async = true;
        document.head.appendChild(script);
      }
    }
  }

  function setupLightbox() {
    const modal = document.getElementById('post-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const modalLink = document.getElementById('modal-link');
    const modalGrid = document.getElementById('modal-grid');
    const modalSidebar = document.getElementById('modal-sidebar');

    window.glmShowLightbox = function(imgSrc, caption, link) {
      modalImg.src = imgSrc;
      
      if (!caption && !link) {
        // It's a marquee recent work proof image - NOT an instagram post
        if (modalSidebar) modalSidebar.style.display = 'none';
        if (modalGrid) {
          modalGrid.classList.remove('md:grid-cols-2');
          modalGrid.classList.add('max-w-3xl'); // Center and size down the image card
        }
      } else {
        // It's an instagram bento feed item
        if (modalSidebar) modalSidebar.style.display = 'flex';
        if (modalGrid) {
          modalGrid.classList.add('md:grid-cols-2');
          modalGrid.classList.remove('max-w-3xl');
        }
        modalCaption.innerText = caption || "Global Logic Media | Digital Marketing Agency in Lucknow | SEO, Web Design & Lead Generation|Global Logic Media | Digital Marketing Agency in Lucknow | SEO, Web Design & Lead Generation|Global Logic Media | Digital Marketing Agency in Lucknow | SEO, Web Design & Lead GenerationCreative Content";
        if (link) {
          modalLink.href = link;
          modalLink.style.display = 'flex';
        } else {
          modalLink.href = "https://www.instagram.com/globallogicmedia/";
          modalLink.style.display = 'flex';
        }
      }
      
      modal.classList.remove('hidden');
      setTimeout(() => modal.classList.add('opacity-100'), 10);
      document.body.style.overflow = 'hidden';
    };

    window.closeModal = function() {
      modal.classList.remove('opacity-100');
      setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }, 300);
    };
  }

  function apply3DTiltEffect() {
    var cards = document.querySelectorAll('.glm-marquee-item, .glass-card');
    cards.forEach(function(card) {
      if (card.dataset.tiltActive) return;
      card.dataset.tiltActive = 'true';

      // Create reflection glare element
      var glare = document.createElement('div');
      glare.style.cssText = [
        'position:absolute',
        'inset:0',
        'background:radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%)',
        'pointer-events:none',
        'opacity:0',
        'transition:opacity 0.3s ease',
        'z-index:5'
      ].join(';');
      card.appendChild(glare);

      card.addEventListener('mousemove', function(e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        
        var xc = rect.width / 2;
        var yc = rect.height / 2;
        
        var rotateY = ((x - xc) / xc) * 10;
        var rotateX = -((y - yc) / yc) * 10;
        
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        glare.style.opacity = '1';
        glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)`;
      });

      card.addEventListener('mouseleave', function() {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
        glare.style.opacity = '0';
      });
    });
  }

  function loadInstagramFeed() {
    const feedContainer = document.getElementById('insta-feed');
    if (!feedContainer) return;

    if (window.firebaseDB) {
      window.firebaseDB.ref("config/instagram_token").once('value')
        .then(snapshot => {
          if (snapshot.exists() && snapshot.val()) {
            var token = decryptToken(snapshot.val());
            if (token) {
              fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${token}`)
                .then(res => {
                  if (!res.ok) throw new Error('API invalid');
                  return res.json();
                })
                .then(data => {
                  if (data.data && data.data.length > 0) {
                    updateBentoFeed(data.data);
                  }
                })
                .catch(() => {});
            }
          }
        })
        .catch(() => {});
    }
  }

  function updateBentoFeed(posts) {
    const items = document.querySelectorAll('#insta-feed > div');
    posts.slice(0, 6).forEach((p, idx) => {
      if (idx >= items.length) return;
      const item = items[idx];
      const img = item.querySelector('img');
      const mediaUrl = p.media_type === 'VIDEO' ? (p.thumbnail_url || p.media_url) : p.media_url;
      const caption = p.caption || 'Global Logic Media | Digital Marketing Agency in Lucknow | SEO, Web Design & Lead Generation|Global Logic Media | Digital Marketing Agency in Lucknow | SEO, Web Design & Lead Generation|Global Logic Media | Digital Marketing Agency in Lucknow | SEO, Web Design & Lead GenerationCreative';
      
      if (img) img.src = mediaUrl;
      
      item.onclick = function() {
        window.glmShowLightbox(mediaUrl, caption, p.permalink);
      };
      
      const desc = item.querySelector('p');
      if (desc) desc.innerText = caption;
    });
  }

  function removeInstagramNavLinks() {
    var instaLinks = document.querySelectorAll('a[href*="instagram.html"]');
    instaLinks.forEach(function(link) {
      link.style.display = 'none';
      link.remove();
    });
  }

  function checkAndInject() {
    var recentWorkEl = document.querySelector('[data-framer-name="about me section"]') || document.getElementById('about-me');
    var projectsEl = document.querySelector('[data-framer-name="Projects"]') || document.querySelector('.framer-1mm21uq') || document.getElementById('projects');
    
    if (!recentWorkEl && !projectsEl) return;
    
    inject();
    removeInstagramNavLinks();
  }

  // Initialize checks
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndInject);
  } else {
    checkAndInject();
  }
  window.addEventListener('load', checkAndInject);
  setInterval(checkAndInject, 1000);
})();
