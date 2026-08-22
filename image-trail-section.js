(function() {
  function decryptToken(encrypted) {
    try {
      return atob(encrypted).split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ 42)).join('');
    } catch(e) {
      return '';
    }
  }

  function inject() {
    var recentWorkEl = document.querySelector('[data-framer-name="about me section"]') || document.getElementById('about-me');
    var projectsEl = document.querySelector('[data-framer-name="Projects"]') || document.querySelector('.framer-1mm21uq') || document.getElementById('projects');
    
    if (projectsEl) {
      projectsEl.style.display = 'none';
      projectsEl.style.visibility = 'hidden';
      projectsEl.style.height = '0';
      projectsEl.style.overflow = 'hidden';
      projectsEl.style.padding = '0';
      projectsEl.style.margin = '0';
    }

    if (!recentWorkEl && !projectsEl) return;
    var insertTarget = recentWorkEl || projectsEl;

    // Create or update the Instagram Feed Section
    var instaSection = document.getElementById('glm-instagram-feed-section');
    if (!instaSection) {
      instaSection = document.createElement('section');
      instaSection.id = 'glm-instagram-feed-section';
      instaSection.className = 'glm-insta-section';
      insertTarget.parentNode.insertBefore(instaSection, insertTarget.nextSibling);
    }

    // Inject styles and HTML content if not already built
    if (!instaSection.querySelector('#insta-feed')) {
      // Custom Stylesheet for Bento Grid and Story Rings
      const styles = `
<style id="glm-bento-insta-styles">
  :root {
    --insta-gradient: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  }
  .glm-insta-section {
    position: relative;
    width: 100%;
    background-color: #050505 !important;
    color: #ffffff !important;
    padding: 80px 0 !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    z-index: 10;
  }
  .font-heading { font-family: 'Space Grotesk', sans-serif; }
  
  /* Glassmorphism */
  .glass-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }
  .glass-card:hover {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.2);
  }

  /* Story Ring Animation */
  .story-ring {
    position: relative;
    padding: 3px;
    background: var(--insta-gradient);
    border-radius: 22px;
    cursor: pointer;
  }
  .story-inner {
    background: #050505;
    border-radius: 19px;
    padding: 2px;
  }

  /* Bento Grid Customization */
  .bento-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 240px;
    gap: 1.5rem;
  }
  .bento-item-large { grid-column: span 2; grid-row: span 2; }
  .bento-item-tall { grid-row: span 2; }

  @media (max-width: 768px) {
    .bento-grid { grid-template-columns: repeat(2, 1fr); }
    .bento-item-large { grid-column: span 2; grid-row: span 1; }
  }
  
  /* Hide scrollbar helper */
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
`;
      document.head.insertAdjacentHTML('beforeend', styles);

      // Bento Instagram Showcase HTML structure
      instaSection.innerHTML = `
    <!-- BG Gradient Blobs -->
    <div class="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden opacity-30 pointer-events-none">
        <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600 blur-[120px] rounded-full"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600 blur-[120px] rounded-full"></div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-12">
        
        <!-- SECTION: PROFILE HEADER -->
        <header class="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
            <div class="flex items-center gap-8">
                <div class="story-ring group">
                    <div class="story-inner">
                        <img src="./logo.png" class="w-32 h-32 rounded-[17px] object-cover" alt="Profile">
                    </div>
                </div>
                <div>
                    <h1 class="text-4xl font-heading font-bold mb-2 flex items-center gap-2">
                        @globallogicmedia 
                        <i data-lucide="check-circle" class="w-6 h-6 text-blue-400 fill-blue-400/20"></i>
                    </h1>
                    <p class="text-gray-400 text-lg mb-4 max-w-md">Digital Curator & Visual Storyteller. Lucknow's Premier Branding & Performance Agency. ⚡️</p>
                    <div class="flex gap-6 text-sm">
                        <span><b class="text-white">65</b> Posts</span>
                        <span><b class="text-white">12.5k</b> Followers</span>
                    </div>
                </div>
            </div>
            <div class="flex gap-4">
                <a href="https://www.instagram.com/globallogicmedia/" target="_blank" class="bg-white text-black px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-transform flex items-center justify-center">Follow</a>
                <a href="https://www.instagram.com/globallogicmedia/" target="_blank" class="glass-card px-6 py-3 rounded-2xl font-bold flex items-center gap-2">
                    <i data-lucide="send" class="w-4 h-4"></i> Message
                </a>
            </div>
        </header>

        <!-- SECTION: STORIES -->
        <div class="flex gap-8 mb-16 overflow-x-auto pb-4 no-scrollbar">
            <!-- Story Highlight 1 -->
            <div class="flex flex-col items-center gap-3 shrink-0 cursor-pointer group">
                <div class="w-20 h-20 rounded-[24px] border-2 border-zinc-800 p-1 group-hover:border-orange-500 transition-all">
                    <img src="./work1.png" class="w-full h-full object-cover rounded-[18px]">
                </div>
                <span class="text-xs font-medium text-zinc-500 group-hover:text-white transition-colors">Process</span>
            </div>
            <!-- Story Highlight 2 -->
            <div class="flex flex-col items-center gap-3 shrink-0 cursor-pointer group">
                <div class="w-20 h-20 rounded-[24px] border-2 border-zinc-800 p-1 group-hover:border-orange-500 transition-all">
                    <img src="./work2.png" class="w-full h-full object-cover rounded-[18px]">
                </div>
                <span class="text-xs font-medium text-zinc-500 group-hover:text-white transition-colors">Lifestyle</span>
            </div>
            <!-- Story Highlight 3 -->
            <div class="flex flex-col items-center gap-3 shrink-0 cursor-pointer group">
                <div class="w-20 h-20 rounded-[24px] border-2 border-zinc-800 p-1 group-hover:border-orange-500 transition-all">
                    <img src="./work3.png" class="w-full h-full object-cover rounded-[18px]">
                </div>
                <span class="text-xs font-medium text-zinc-500 group-hover:text-white transition-colors">Designs</span>
            </div>
            <!-- Story Highlight 4 -->
            <div class="flex flex-col items-center gap-3 shrink-0 cursor-pointer group">
                <div class="w-20 h-20 rounded-[24px] border-2 border-zinc-800 p-1 group-hover:border-orange-500 transition-all">
                    <img src="./work4.png" class="w-full h-full object-cover rounded-[18px]">
                </div>
                <span class="text-xs font-medium text-zinc-500 group-hover:text-white transition-colors">Vibes</span>
            </div>
        </div>

        <!-- SECTION: BENTO FEED -->
        <div class="bento-grid" id="insta-feed">
            <!-- Large Featured Post -->
            <div class="bento-item-large glass-card rounded-[40px] overflow-hidden group relative cursor-pointer" onclick="window.glmShowLightbox('./work1.png', 'The evolution of digital workspace in 2026. #minimalism #workspace')">
                <img src="./work1.png" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                    <div class="flex gap-4 mb-2">
                        <span class="flex items-center gap-1"><i data-lucide="heart" class="w-5 h-5 fill-white"></i> 2.4k</span>
                        <span class="flex items-center gap-1"><i data-lucide="message-circle" class="w-5 h-5 fill-white"></i> 120</span>
                    </div>
                    <p class="text-sm line-clamp-2">The evolution of digital workspace in 2026. #minimalism #workspace</p>
                </div>
            </div>

            <!-- Tall Post (Reel/Video) -->
            <div class="bento-item-tall glass-card rounded-[40px] overflow-hidden group relative cursor-pointer" onclick="window.glmShowLightbox('./work2.png', 'Vinca Unisex Salon creative visual campaigns.')">
                <div class="absolute top-5 right-5 z-10 bg-black/20 backdrop-blur-md p-2 rounded-full">
                    <i data-lucide="play" class="w-4 h-4 fill-white"></i>
                </div>
                <img src="./work2.png" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            </div>

            <!-- Square Post -->
            <div class="glass-card rounded-[40px] overflow-hidden group relative cursor-pointer" onclick="window.glmShowLightbox('./work3.png', 'Deep ROAS optimization for meta ads setups.')">
                <img src="./work3.png" class="w-full h-full object-cover">
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                    <i data-lucide="instagram" class="w-8 h-8 text-white"></i>
                </div>
            </div>

            <!-- Square Post 2 -->
            <div class="glass-card rounded-[40px] overflow-hidden group relative cursor-pointer" onclick="window.glmShowLightbox('./ss11.png', 'Crisp social media flyer assets for Spicy Affair Lucknow.')">
                <img src="./ss11.png" class="w-full h-full object-cover">
            </div>

            <!-- Square Post 3 -->
            <div class="glass-card rounded-[40px] overflow-hidden group relative cursor-pointer" onclick="window.glmShowLightbox('./ss15.png', 'Bold brand identities built from scratch.')">
                <img src="./ss15.png" class="w-full h-full object-cover">
            </div>
        </div>

        <!-- FOOTER: CTA -->
        <footer class="mt-20 text-center py-10 border-t border-zinc-900">
            <p class="text-zinc-500 mb-4">Want to see more?</p>
            <a href="https://www.instagram.com/globallogicmedia/" target="_blank" class="inline-flex items-center gap-2 text-xl font-heading font-bold hover:text-orange-500 transition-colors">
                VIEW FULL PROFILE <i data-lucide="arrow-up-right" class="w-5 h-5"></i>
            </a>
        </footer>
    </div>

    <!-- LIGHTBOX / MODAL (Hidden by default) -->
    <div id="post-modal" class="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 hidden opacity-0 transition-opacity duration-300">
        <button onclick="window.closeModal()" class="absolute top-10 right-10 text-white hover:rotate-90 transition-transform">
            <i data-lucide="x" class="w-10 h-10"></i>
        </button>
        <div class="max-w-5xl w-full grid md:grid-cols-2 bg-zinc-900 rounded-[30px] overflow-hidden">
            <div class="bg-black flex items-center justify-center">
                <img id="modal-img" src="" class="max-h-[80vh] w-full object-contain">
            </div>
            <div class="p-8 flex flex-col justify-between">
                <div>
                    <div class="flex items-center gap-3 mb-6">
                        <img src="./logo.png" class="w-10 h-10 rounded-full">
                        <span class="font-bold">globallogicmedia</span>
                    </div>
                    <p id="modal-caption" class="text-zinc-300 leading-relaxed"></p>
                </div>
                <div class="pt-6 border-t border-zinc-800">
                    <a id="modal-link" href="https://www.instagram.com/globallogicmedia/" target="_blank" class="w-full bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
                        View Original Post <i data-lucide="external-link" class="w-4 h-4"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
      `;

      if (window.lucide) window.lucide.createIcons();
      setupLightbox();
      loadInstagramFeed();
    }
  }

  function setupLightbox() {
    const modal = document.getElementById('post-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const modalLink = document.getElementById('modal-link');

    window.glmShowLightbox = function(imgSrc, caption, link) {
      modalImg.src = imgSrc;
      modalCaption.innerText = caption || "Global Logic Media Creative Content";
      if (link) {
        modalLink.href = link;
        modalLink.style.display = 'flex';
      } else {
        modalLink.href = "https://www.instagram.com/globallogicmedia/";
        modalLink.style.display = 'flex';
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
    posts.slice(0, 5).forEach((p, idx) => {
      if (idx >= items.length) return;
      const item = items[idx];
      const img = item.querySelector('img');
      const mediaUrl = p.media_type === 'VIDEO' ? (p.thumbnail_url || p.media_url) : p.media_url;
      const caption = p.caption || 'Global Logic Media Creative';
      
      if (img) img.src = mediaUrl;
      
      item.onclick = function() {
        window.glmShowLightbox(mediaUrl, caption, p.permalink);
      };
      
      const desc = item.querySelector('p');
      if (desc) desc.innerText = caption;
    });
  }

  function removeInstagramNavLinks() {
    var instaLinks = document.querySelectorAll('a[href*="instagram.html"], a[href*="instagram"]');
    instaLinks.forEach(function(link) {
      const href = link.getAttribute('href');
      if (href && (href.includes('instagram.html') || href.includes('instagram.com/globallogicmedia'))) {
        link.style.display = 'none';
        link.remove();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      inject();
      removeInstagramNavLinks();
    });
  } else {
    inject();
    removeInstagramNavLinks();
  }
  
  // Re-run check on load just in case Framer loaded late
  window.addEventListener('load', function() {
    inject();
    removeInstagramNavLinks();
  });
})();
