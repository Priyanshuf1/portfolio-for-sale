const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ACTIVELY REMOVE three-logo-interactive.js (unused 3D model)
html = html.replace(/<script[^>]+three-logo-interactive\.js[^>]*><\/script>\r?\n?/gi, '');
html = html.replace(/<script id="inline-logo3d-script">[\s\S]*?<\/script>\r?\n?/gi, '');

// Remove the old blog drawer if it exists
html = html.replace('<script src="./blog-section.js"></script>\n', '');

// Hide old Framer Client Reviews and other sections immediately to prevent FOUC delay
html = html.replace(/<style>[\s\S]*?\/\* Hide old testimonials section \*\/[\s\S]*?<\/style>/gi, '');

const hideStyle = `
<style>
  /* Hide old testimonials section */
  #testimonials, section[data-framer-name="testimonials"], .framer-izep5p { display: none !important; }
  /* Instantly hide original template sections to prevent flash of unstyled content */
  [data-framer-name="Projects"],
  .framer-1mm21uq,
  #projects {
    display: none !important;
    opacity: 0 !important;
    height: 0 !important;
    overflow: hidden !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  /* Premium Mobile Layout Fixes */
  @media (max-width: 767px) {
    /* 1. Scale down logo header on mobile to prevent overflow & overlap */
    .framer-1lcme9 {
      width: 150px !important;
      height: 48px !important;
      background-position: left center !important;
    }
    .framer-11n6lfm-container {
      height: 60px !important;
    }
    /* 2. Collapse automatic empty height/spacing from Framer container elements */
    .framer-povseb, .framer-OLpjL {
      height: auto !important;
      min-height: 0 !important;
    }
    /* Hide the Instagram screenshots carousel from the Meet Global Logic Media section */
    #about-me .framer-1ineur-container,
    [data-framer-name="about me section"] .framer-1ineur-container {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      padding: 0 !important;
      margin: 0 !important;
      overflow: hidden !important;
    }
    /* 3. Tighten section spacing to eliminate massive blank page gaps */
    #hero, #about-me, #process, #services, #faq,
    [data-framer-name="hero"],
    [data-framer-name="about me section"],
    [data-framer-name="process"],
    [data-framer-name="Services"],
    [data-framer-name="FAQ's"] {
      min-height: auto !important;
      height: auto !important;
      padding-top: 40px !important;
      padding-bottom: 40px !important;
    }
    /* 4. Fix custom sections spacing */
    #glm-image-trail-section {
      min-height: auto !important;
      padding: 40px 0 20px !important;
    }
    #glm-instagram-feed-section {
      min-height: auto !important;
      padding: 20px 0 40px !important;
    }
  }
</style>\n`;
// Inject RIGHT AFTER <head> tag so it fires before ANY script runs and prevents FOUC
html = html.replace('<head>', '<head>\n' + hideStyle);

// Inject Firebase init before other custom scripts
if (!html.includes('firebase-init.js')) {
    const firebaseScripts = `
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>
<script src="./firebase-init.js"></script>
`;
    html = html.replace('</body>', firebaseScripts + '</body>');
}

if (!html.includes('custom-footer.js')) html = html.replace('</body>', '<script src="./custom-footer.js"></script>\n</body>');
if (!html.includes('book-a-call-modal.js')) html = html.replace('</body>', '<script src="./book-a-call-modal.js"></script>\n</body>');
if (!html.includes('add-review-modal.js')) html = html.replace('</body>', '<script src="./add-review-modal.js"></script>\n</body>');
if (!html.includes('native-sections.js')) html = html.replace('</body>', '<script src="./native-sections.js"></script>\n</body>');
if (!html.includes('blog-section.js')) html = html.replace('</body>', '<script src="./blog-section.js"></script>\n</body>');
if (!html.includes('location-section.js')) html = html.replace('</body>', '<script src="./location-section.js"></script>\n</body>');
if (!html.includes('admin-panel.js')) html = html.replace('</body>', '<script src="./admin-panel.js"></script>\n</body>');
if (!html.includes('ambient-particles.js')) html = html.replace('</body>', '<script src="./ambient-particles.js"></script>\n</body>');
if (!html.includes('audio-system.js')) html = html.replace('</body>', '<script src="./audio-system.js"></script>\n</body>');
if (!html.includes('svg-decorations.js')) html = html.replace('</body>', '<script src="./svg-decorations.js"></script>\n</body>');
if (!html.includes('rabto-fx-engine.js')) html = html.replace('</body>', '<script src="./rabto-fx-engine.js"></script>\n</body>');
if (!html.includes('bg-enhancer.js')) html = html.replace('</body>', '<script src="./bg-enhancer.js"></script>\n</body>');
if (!html.includes('skills-section.js')) html = html.replace('</body>', '<script src="./skills-section.js"></script>\n</body>');
if (!html.includes('global-logic-replacer.js')) html = html.replace('</body>', '<script src="./global-logic-replacer.js"></script>\n</body>');
if (!html.includes('company-details.js')) html = html.replace('</body>', '<script src="./company-details.js"></script>\n</body>');
if (!html.includes('three-bg.js')) html = html.replace('</body>', '<script src="./three-bg.js"></script>\n</body>');
if (!html.includes('three-logo-interactive.js')) html = html.replace('</body>', '<script src="./three-logo-interactive.js"></script>\n</body>');
if (!html.includes('image-trail-section.js')) html = html.replace('</body>', '<script src="./image-trail-section.js"></script>\n</body>');
if (!html.includes('custom-cursor.js')) html = html.replace('</body>', '<script src="./custom-cursor.js"></script>\n</body>');

// Inject Tailwind CSS safely without Preflight reset to prevent breaking Framer styles
if (!html.includes('tailwindcss')) {
    const tailwindScript = `
<script>
  window.tailwind = {
    corePlugins: {
      preflight: false,
    }
  }
</script>
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://unpkg.com/lucide@latest"></script>
`;
    html = html.replace('</head>', tailwindScript + '\n</head>');
}

fs.writeFileSync('index.html', html);
console.log('Appended firebase-init and native sections to index.html');

require('./patch-webflow-expandable-cards.js');
require('./patch-three-cards-logo.js');
