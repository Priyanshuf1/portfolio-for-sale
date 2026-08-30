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
    var existingMarquee = document.getElementById('projects');
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
    var marqueeSection = document.getElementById('projects');
    if (!marqueeSection) {
      marqueeSection = document.createElement('section');
      marqueeSection.id = 'projects';
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
    width: 260px;
    height: 110px;
    flex-shrink: 0;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.07);
    background: #ffffff;
    cursor: default;
    position: relative;
    transform-style: preserve-3d;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 18px 24px;
    box-sizing: border-box;
    
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
    box-shadow: 0 8px 20px rgba(255, 23, 68, 0.12);
  }
  .glm-marquee-item img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: 0.95;
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

  /* Integrated Instagram Profile Layout */
  #glm-instagram-feed-section .glm-insta-integrated-header {
    max-width: 780px;
    margin: 0 auto 50px;
    display: flex;
    gap: 50px;
    align-items: center;
    padding: 0 20px 40px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    box-sizing: border-box;
  }
  @media (max-width: 640px) {
    #glm-instagram-feed-section .glm-insta-integrated-header {
      flex-direction: column;
      gap: 25px;
      text-align: center;
      padding-bottom: 30px;
    }
  }
  .glm-insta-avatar-col {
    flex-shrink: 0;
  }
  .glm-insta-story-ring {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    padding: 4px;
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 8px 24px rgba(0,0,0,0.06);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .glm-insta-story-ring:hover {
    transform: scale(1.05) rotate(5deg);
  }
  @media (max-width: 640px) {
    .glm-insta-story-ring {
      width: 105px;
      height: 105px;
    }
  }
  .glm-insta-avatar-inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #ffffff;
    border: 3px solid #ffffff;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .glm-insta-avatar-img {
    width: 90%;
    height: auto;
    object-fit: contain;
  }
  .glm-insta-content-col {
    flex-grow: 1;
    text-align: left;
  }
  @media (max-width: 640px) {
    .glm-insta-content-col {
      text-align: center;
      width: 100%;
    }
  }
  .glm-insta-username-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 18px;
  }
  @media (max-width: 640px) {
    .glm-insta-username-row {
      justify-content: center;
      flex-wrap: wrap;
      gap: 12px;
    }
  }
  #glm-instagram-feed-section .glm-insta-username-txt {
    font-size: 26px;
    font-weight: 300;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #111827 !important;
    margin: 0;
    letter-spacing: -0.5px;
  }
  .glm-insta-verified-badge {
    display: inline-flex;
    align-items: center;
  }
  #glm-instagram-feed-section .glm-insta-follow-btn {
    background: #0095f6 !important;
    color: #ffffff !important;
    border: none;
    border-radius: 8px;
    padding: 7px 22px;
    font-size: 14px;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    text-decoration: none;
    transition: background-color 0.2s, transform 0.2s;
    display: inline-block;
    cursor: pointer;
  }
  #glm-instagram-feed-section .glm-insta-follow-btn:hover {
    background: #1877f2 !important;
    transform: translateY(-1px);
  }
  #glm-instagram-feed-section .glm-insta-follow-btn:active {
    transform: translateY(0);
  }
  .glm-insta-stats-row {
    display: flex;
    gap: 30px;
    margin-bottom: 20px;
  }
  @media (max-width: 640px) {
    .glm-insta-stats-row {
      justify-content: center;
      gap: 20px;
    }
  }
  #glm-instagram-feed-section .glm-insta-stat-item {
    font-size: 16px;
    color: #111827 !important;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
  #glm-instagram-feed-section .glm-insta-stat-item b {
    font-weight: 600;
    color: #111827 !important;
  }
  .glm-insta-bio-block {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 14.5px;
    line-height: 1.5;
    text-align: left;
  }
  @media (max-width: 640px) {
    .glm-insta-bio-block {
      text-align: center;
    }
  }
  #glm-instagram-feed-section .glm-insta-bio-name {
    font-weight: 600;
    color: #111827 !important;
  }
  #glm-instagram-feed-section .glm-insta-bio-category {
    color: #8e8e8e !important;
    margin-bottom: 4px;
  }
  #glm-instagram-feed-section .glm-insta-bio-desc {
    color: #262626 !important;
    margin-bottom: 8px;
    line-height: 1.6;
  }
  #glm-instagram-feed-section .glm-insta-bio-link a {
    color: #00376b !important;
    text-decoration: none;
    font-weight: 600;
    display: inline-block;
    transition: opacity 0.2s;
  }
  #glm-instagram-feed-section .glm-insta-bio-link a:hover {
    opacity: 0.8;
    text-decoration: underline;
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
      width: 190px;
      height: 90px;
      border-radius: 12px;
      padding: 10px 16px;
      transform: translateY(30px) scale(0.95);
    }
  }
  
  /* Hide scrollbar helper */
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  /* Mobile Instagram Layout Overrides & Watermark Cleanup */
  @media (max-width: 600px) {
    /* Prevent app wrapper itself from collapsing to zero height */
    .elfsight-app-8b61b60e-8e55-4ffb-925d-eb7e70005a40,
    .elfsight-app-8b61b60e-8e55-4ffb-925d-eb7e70005a40 > div,
    .elfsight-app-8b61b60e-8e55-4ffb-925d-eb7e70005a40 iframe {
      min-height: 480px !important;
      display: block !important;
      height: auto !important;
    }
    /* Force grid/slider containers to flex-wrap and remain visible */
    [class*="SliderViewport"],
    [class*="CarouselViewport"],
    [class*="SliderTrack"],
    [class*="CarouselTrack"],
    [class*="SliderContainer"],
    [class*="CarouselContainer"],
    div[class*="PostsGrid__Container"],
    div[class*="PostsGrid__Grid"],
    [class*="GridContainer"],
    [class*="InstagramFeed__Grid"],
    [class*="eapps-instagram-feed-posts-grid"] {
      display: flex !important;
      flex-wrap: wrap !important;
      overflow: visible !important;
      width: 100% !important;
      height: auto !important;
      min-height: 250px !important;
      transform: none !important;
      transition: none !important;
    }
    /* Force individual slide items to display side-by-side (2 columns) */
    [class*="SliderItem"],
    [class*="CarouselItem"],
    [class*="PostsGrid__Item"],
    [class*="InstagramFeed__PostItem"],
    [class*="PostItem"],
    [class*="GridItem"],
    [class*="eapps-instagram-feed-posts-item"] {
      display: block !important;
      width: 48% !important;
      max-width: 48% !important;
      flex: 0 0 48% !important;
      margin: 1% !important;
      height: auto !important;
      opacity: 1 !important;
      visibility: visible !important;
    }
    /* Hide navigation arrows/dots that might clash */
    [class*="ArrowContainer"],
    [class*="NavigationArrow"],
    [class*="Arrow__Container"],
    [class*="Bullet"],
    [class*="Pagination"] {
      display: none !important;
    }
  }

  /* Force Elfsight free widget badge/logo removal */
  a[href*="elfsight.com"],
  a[class*="eapps-link"],
  [class*="LogoContainer"],
  [class*="Logo__Container"],
  [class*="BadgeContainer"] {
    display: none !important;
    opacity: 0 !important;
    pointer-events: none !important;
    visibility: hidden !important;
    height: 0 !important;
    width: 0 !important;
  }
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
        './brand_b_luxury.jpeg',
        './brand_book_digital.jpeg',
        './brand_cs_ec.jpeg',
        './brand_krazy_cakes.jpeg',
        './brand_kurti_kahaanii.jpeg',
        './brand_om_group.jpeg',
        './brand_tabs19.jpeg',
        './brand_b_luxury2.jpeg',
        './brand_home_archs.png',
        './brand_forever_treasures.png'
      ];

      function fillRow(rowElId, images) {
        var row = document.getElementById(rowElId);
        if (!row) return;
        var doubled = images.concat(images);
        row.innerHTML = doubled.map(src => `
          <div class="glm-marquee-item">
            <img src="${src}" alt="Client Logo" loading="lazy">
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
          <h2 style="margin: 0; font-weight: 900; color: #111827; font-size: clamp(1.8rem, 4vw, 2.8rem); margin-bottom: 30px;">Follow Our Journey</h2>
        </div>

        <!-- Integrated Instagram Profile Header -->
        <div class="glm-insta-integrated-header">
          <div class="glm-insta-avatar-col">
            <div class="glm-insta-story-ring">
              <div class="glm-insta-avatar-inner">
                <img src="./logo_icon.png" alt="Global Logic Media Logo" class="glm-insta-avatar-img">
              </div>
            </div>
          </div>
          <div class="glm-insta-content-col">
            <div class="glm-insta-username-row">
              <h3 class="glm-insta-username-txt">globallogicmedia</h3>
              <span class="glm-insta-verified-badge" title="Verified">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#3897f0"><path d="M12.003 2.001c-5.522 0-9.99 4.47-9.99 9.99 0 5.523 4.468 9.99 9.99 9.99 5.523 0 9.99-4.467 9.99-9.99 0-5.52-4.467-9.99-9.99-9.99zm4.218 8.219l-4.72 4.81a1.004 1.004 0 0 1-1.42 0l-2.29-2.3a1.004 1.004 0 0 1 1.42-1.42l1.58 1.58 4.01-4.09a1.004 1.004 0 0 1 1.42 1.42z"/></svg>
              </span>
              <a href="https://www.instagram.com/globallogicmedia/" target="_blank" rel="noopener noreferrer" class="glm-insta-follow-btn">Follow</a>
            </div>
            <div class="glm-insta-stats-row">
              <span class="glm-insta-stat-item"><b>18</b> posts</span>
              <span class="glm-insta-stat-item"><b>411</b> followers</span>
              <span class="glm-insta-stat-item"><b>49</b> following</span>
            </div>
            <div class="glm-insta-bio-block">
              <div class="glm-insta-bio-name">Global Logic Media</div>
              <div class="glm-insta-bio-category">AI Creator</div>
              <div class="glm-insta-bio-desc">
                📍 Digital Marketing Agency in Lucknow<br>
                🚀 Google Ads | SEO | SMM | Branding<br>
                🔗 100% Result-Driven Growth Strategies
              </div>
              <div class="glm-insta-bio-link">
                <a href="https://drive.google.com/drive/folders/1Ro16MKC8SEwVv6H4O4lFgdC80YhrZRg4" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:4px;"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                  drive.google.com/drive/folders/1Ro16MKC8SEwVv6H4O4lFgdC80YhrZRg4...
                </a>
              </div>
            </div>
          </div>
        </div>

        <div style="max-width: 1100px; margin: 0 auto;">
          <!-- Native Instagram Grid - bypasses Elfsight mobile limitations -->
          <style>
            #glm-native-feed {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 10px;
              padding: 0 10px;
              margin-bottom: 20px;
            }
            @media (max-width: 600px) {
              #glm-native-feed {
                grid-template-columns: repeat(2, 1fr);
                gap: 8px;
                padding: 0 8px;
              }
            }
            .glm-native-post {
              position: relative;
              border-radius: 12px;
              overflow: hidden;
              cursor: pointer;
              aspect-ratio: 1;
              background: #f0f0f0;
              box-shadow: 0 2px 12px rgba(0,0,0,0.08);
              transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            .glm-native-post:hover {
              transform: scale(1.03);
              box-shadow: 0 6px 24px rgba(0,0,0,0.15);
            }
            .glm-native-post img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
              transition: transform 0.3s ease;
            }
            .glm-native-post:hover img {
              transform: scale(1.06);
            }
            .glm-native-post-overlay {
              position: absolute;
              inset: 0;
              background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%);
              opacity: 0;
              transition: opacity 0.25s ease;
              display: flex;
              align-items: flex-end;
              padding: 10px;
            }
            .glm-native-post:hover .glm-native-post-overlay {
              opacity: 1;
            }
            .glm-native-post-overlay span {
              color: white;
              font-size: 11px;
              line-height: 1.3;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .glm-native-post-video-badge {
              position: absolute;
              top: 8px;
              right: 8px;
              background: rgba(0,0,0,0.55);
              border-radius: 50%;
              width: 28px;
              height: 28px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .glm-native-post-video-badge svg {
              width: 14px;
              height: 14px;
              fill: white;
            }
            /* Hidden posts for mobile (beyond 4) */
            @media (max-width: 600px) {
              .glm-native-post.glm-hidden-mobile {
                display: none;
              }
              .glm-native-post.glm-hidden-mobile.glm-revealed {
                display: block;
                animation: glm-fadeIn 0.35s ease;
              }
            }
            @keyframes glm-fadeIn {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
            /* Skeleton loader tiles */
            .glm-native-post.glm-skeleton {
              background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
              background-size: 200% 100%;
              animation: glm-shimmer 1.4s infinite;
            }
            @keyframes glm-shimmer {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
            /* See More / Show Less button */
            #glm-see-more-btn {
              display: none;
              margin: 16px auto 0;
              padding: 12px 32px;
              background: linear-gradient(135deg, #e20001, #ff4444);
              color: white;
              border: none;
              border-radius: 50px;
              font-size: 14px;
              font-weight: 700;
              letter-spacing: 0.5px;
              cursor: pointer;
              box-shadow: 0 4px 16px rgba(226,0,1,0.3);
              transition: transform 0.18s ease, box-shadow 0.18s ease;
            }
            #glm-see-more-btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 8px 24px rgba(226,0,1,0.4);
            }
            #glm-see-more-btn:active {
              transform: translateY(0);
            }
            @media (max-width: 600px) {
              #glm-see-more-btn {
                display: block;
              }
            }
          </style>
          <div id="glm-native-feed">
            <!-- 6 skeleton placeholder tiles shown while posts load -->
            <div class="glm-native-post glm-skeleton" data-index="0"></div>
            <div class="glm-native-post glm-skeleton" data-index="1"></div>
            <div class="glm-native-post glm-skeleton" data-index="2"></div>
            <div class="glm-native-post glm-skeleton glm-hidden-mobile" data-index="3"></div>
            <div class="glm-native-post glm-skeleton glm-hidden-mobile" data-index="4"></div>
            <div class="glm-native-post glm-skeleton glm-hidden-mobile" data-index="5"></div>
          </div>
          <div style="text-align:center;">
            <button id="glm-see-more-btn">📸 See More Posts</button>
          </div>
          <!-- Keep Elfsight as hidden fallback for desktop -->
          <div class="elfsight-app-8b61b60e-8e55-4ffb-925d-eb7e70005a40" style="display:none;"></div>
        </div>
      `;

      instaSection.dataset.elfsightBuilt = '1';

      // Wire up the "See More Posts" button
      setTimeout(function() {
        var seeMoreBtn = document.getElementById('glm-see-more-btn');
        if (seeMoreBtn) {
          var expanded = false;
          seeMoreBtn.addEventListener('click', function() {
            expanded = !expanded;
            var hiddenPosts = document.querySelectorAll('#glm-native-feed .glm-hidden-mobile');
            hiddenPosts.forEach(function(p) {
              if (expanded) {
                p.classList.add('glm-revealed');
              } else {
                p.classList.remove('glm-revealed');
              }
            });
            seeMoreBtn.textContent = expanded ? '▲ Show Less' : '📸 See More Posts';
          });
        }
      }, 100);

      // Load native feed from Instagram API
      setTimeout(loadNativeFeed, 300);

      if (!document.querySelector('script[src*="elfsight.com"]')) {
        const script = document.createElement('script');
        script.src = "https://static.elfsight.com/platform/platform.js";

        script.async = true;
        document.head.appendChild(script);
      }

      // Staggered ScrollTrigger reveal animation for the integrated header elements
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.timeline({
          scrollTrigger: {
            trigger: '.glm-insta-integrated-header',
            start: 'top 85%',
            toggleActions: 'play none play none'
          }
        })
        .fromTo('#glm-instagram-feed-section .glm-insta-story-ring', 
          { scale: 0, rotate: -45, opacity: 0 }, 
          { scale: 1, rotate: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.6)' }
        )
        .fromTo('#glm-instagram-feed-section .glm-insta-username-row > *',
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo('#glm-instagram-feed-section .glm-insta-stat-item',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo('#glm-instagram-feed-section .glm-insta-bio-block > *',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' },
          '-=0.3'
        );
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

  // Populate the native Instagram grid from API data
  function loadNativeFeed() {
    var feed = document.getElementById('glm-native-feed');
    if (!feed) return;

    function renderNativePosts(posts) {
      if (!posts || !posts.length) return;
      var tiles = feed.querySelectorAll('.glm-native-post');
      posts.slice(0, 6).forEach(function(p, i) {
        if (i >= tiles.length) return;
        var tile = tiles[i];
        var imgSrc = p.media_type === 'VIDEO' ? (p.thumbnail_url || p.media_url) : p.media_url;
        var caption = (p.caption || 'Global Logic Media').substring(0, 120);
        var isVideo = p.media_type === 'VIDEO';

        tile.classList.remove('glm-skeleton');
        tile.innerHTML = `
          <img src="${imgSrc}" alt="${caption}" loading="lazy">
          <div class="glm-native-post-overlay"><span>${caption}</span></div>
          ${isVideo ? `<div class="glm-native-post-video-badge"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>` : ''}
        `;
        tile.onclick = function() {
          if (window.glmShowLightbox) window.glmShowLightbox(imgSrc, caption, p.permalink);
          else window.open(p.permalink, '_blank');
        };
      });
    }

    // Try Firebase token → Instagram API
    if (window.firebaseDB) {
      window.firebaseDB.ref('config/instagram_token').once('value')
        .then(function(snap) {
          if (snap.exists() && snap.val()) {
            var token = typeof decryptToken === 'function' ? decryptToken(snap.val()) : snap.val();
            if (token) {
              fetch('https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=' + token)
                .then(function(r) { return r.json(); })
                .then(function(d) { if (d.data) renderNativePosts(d.data); })
                .catch(function() {});
            }
          }
        }).catch(function() {});
    }
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

  // Inject custom layout styles inside the Shadow DOM to force mobile 2-column layout and show exactly 4 posts on load
  function injectShadowDOMStyles() {
    const embedRoot = document.querySelector('.es-embed-root');
    if (embedRoot && embedRoot.shadowRoot) {
      const existingStyle = embedRoot.shadowRoot.getElementById('glm-shadow-mobile-fix');
      if (!existingStyle) {
        const style = document.createElement('style');
        style.id = 'glm-shadow-mobile-fix';
        style.textContent = `
          /* Mobile Overrides */
          @media (max-width: 600px) {
            /* 1. Force the Carousel/Grid layout container to display as flex wrap */
            div[class*="PostsGrid__Container"],
            div[class*="PostsGrid__Grid"],
            [class*="GridContainer"],
            [class*="InstagramFeed__Grid"],
            [class*="eapps-instagram-feed-posts-grid"],
            [class*="SliderViewport"],
            [class*="CarouselViewport"],
            [class*="SliderTrack"],
            [class*="CarouselTrack"],
            [class*="SliderContainer"],
            [class*="CarouselContainer"] {
              display: flex !important;
              flex-wrap: wrap !important;
              overflow: visible !important;
              width: 100% !important;
              height: auto !important;
              min-height: 250px !important;
              transform: none !important;
              transition: none !important;
            }
            
            /* 2. Style individual items to show 2 per row */
            [class*="SliderItem"],
            [class*="CarouselItem"],
            [class*="PostsGrid__Item"],
            [class*="InstagramFeed__PostItem"],
            [class*="PostItem"],
            [class*="GridItem"],
            [class*="posts-item"],
            [class*="eapps-instagram-feed-posts-item"] {
              display: none !important; /* Hide other posts by default */
              width: 47% !important;
              max-width: 47% !important;
              flex: 0 0 47% !important;
              margin: 1.5% 1.5% !important;
              height: auto !important;
              opacity: 1 !important;
              visibility: visible !important;
              box-sizing: border-box !important;
            }
            
            /* 3. Force exactly the first 4 posts to display initially */
            [class*="SliderItem"]:nth-child(1),
            [class*="SliderItem"]:nth-child(2),
            [class*="SliderItem"]:nth-child(3),
            [class*="SliderItem"]:nth-child(4),
            [class*="CarouselItem"]:nth-child(1),
            [class*="CarouselItem"]:nth-child(2),
            [class*="CarouselItem"]:nth-child(3),
            [class*="CarouselItem"]:nth-child(4),
            [class*="PostsGrid__Item"]:nth-child(1),
            [class*="PostsGrid__Item"]:nth-child(2),
            [class*="PostsGrid__Item"]:nth-child(3),
            [class*="PostsGrid__Item"]:nth-child(4),
            [class*="posts-item"]:nth-child(1),
            [class*="posts-item"]:nth-child(2),
            [class*="posts-item"]:nth-child(3),
            [class*="posts-item"]:nth-child(4),
            [class*="eapps-instagram-feed-posts-item"]:nth-child(1),
            [class*="eapps-instagram-feed-posts-item"]:nth-child(2),
            [class*="eapps-instagram-feed-posts-item"]:nth-child(3),
            [class*="eapps-instagram-feed-posts-item"]:nth-child(4) {
              display: block !important;
            }

            /* 4. If expanded, display all items */
            .elfsight-expanded [class*="SliderItem"],
            .elfsight-expanded [class*="CarouselItem"],
            .elfsight-expanded [class*="PostsGrid__Item"],
            .elfsight-expanded [class*="InstagramFeed__PostItem"],
            .elfsight-expanded [class*="PostItem"],
            .elfsight-expanded [class*="GridItem"],
            .elfsight-expanded [class*="posts-item"],
            .elfsight-expanded [class*="eapps-instagram-feed-posts-item"] {
              display: block !important;
            }

            /* Hide slider dots/pagination and arrows */
            [class*="ArrowContainer"],
            [class*="NavigationArrow"],
            [class*="Arrow__Container"],
            [class*="Bullet"],
            [class*="Pagination"] {
              display: none !important;
            }
          }
          
          /* Hide Elfsight watermark container */
          a[href*="elfsight.com"],
          a[class*="eapps-link"],
          [class*="LogoContainer"],
          [class*="Logo__Container"],
          [class*="BadgeContainer"],
          [class*="BrandingContainer"] {
            display: none !important;
            opacity: 0 !important;
            pointer-events: none !important;
            visibility: hidden !important;
            height: 0 !important;
            width: 0 !important;
          }
        `;
        embedRoot.shadowRoot.appendChild(style);
        console.log('[ShadowDOM] Custom layout and watermark rules successfully injected.');
      }
    }
  }

  function checkAndInject() {
    var recentWorkEl = document.querySelector('[data-framer-name="about me section"]') || document.getElementById('about-me');
    var projectsEl = document.querySelector('[data-framer-name="Projects"]') || document.querySelector('.framer-1mm21uq') || document.getElementById('projects');
    
    if (!recentWorkEl && !projectsEl) return;
    
    inject();
    removeInstagramNavLinks();
    injectShadowDOMStyles();
  }

  // Monitor clicks on the "See More Posts" button to toggle the expansion class inside shadow DOM
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[class*="Button__Control"], [class*="ButtonControl"], [class*="load-more"], [class*="LoadMore"], [class*="Button__Container"]');
    if (btn) {
      const root = document.querySelector('.es-embed-root');
      if (root && root.shadowRoot) {
        const container = root.shadowRoot.querySelector('[class*="PostsGrid__Container"], [class*="SliderViewport"], [class*="CarouselViewport"]');
        if (container) {
          container.classList.add('elfsight-expanded');
          console.log('[ShadowDOM] Expanded Instagram feed layout.');
        }
      }
    }
  }, { capture: true });

  // Initialize checks
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndInject);
  } else {
    checkAndInject();
  }
  window.addEventListener('load', checkAndInject);
  setInterval(checkAndInject, 1000);
})();
