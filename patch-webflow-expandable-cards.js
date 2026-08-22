const fs = require('fs');
const path = require('path');

console.log('=== Patching Recent Works Expandable Cards & Uploaded Images ===');

const filesToPatch = [
  'index.html',
  'js/l31sonSvPM96iEFWqw0Ab0nmHNOercM7iLhki8PGTPg.6BnxHPM7.mjs',
  'js/script_main.xNRutfmy.mjs'
];

filesToPatch.forEach(relPath => {
  const filePath = path.join(process.cwd(), relPath);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Recent Works project card Framer image hashes with work1.png through work4.png
  content = content.replace(/https:\/\/framerusercontent\.com\/images\/(bed888CTflXNK3KFX1R7VhRMtE|GkhJfmw17Q5eehve51WR25Ijjnk|RYRvZnstUexQMOl8zRyrvDfDT0)\.[a-zA-Z0-9_\-\?&=.]+/g, './work1.png');
  content = content.replace(/https:\/\/framerusercontent\.com\/images\/(JGI1jOpxUUfW0IRfPmx7eMGhc|En1SV0rP485Zf5WOrpnHl3Nz658)\.[a-zA-Z0-9_\-\?&=.]+/g, './work2.png');
  content = content.replace(/https:\/\/framerusercontent\.com\/images\/(fsFDlU7CKq0E96MXMN9fUXrNw|W7bXB4tsou7l5mHYU8sze3sBeg)\.[a-zA-Z0-9_\-\?&=.]+/g, './work3.png');
  content = content.replace(/https:\/\/framerusercontent\.com\/images\/(jlIAaI4caPj3oVLaxetMd2RvY|MM7F7DNjn9gGQjHqbiowegENsRY)\.[a-zA-Z0-9_\-\?&=.]+/g, './work4.png');

  // Disable Behance redirection links on project cards
  content = content.replace(/https:\/\/www\.behance\.net[^"'\s`<>)]*/g, 'javascript:void(0)');
  content = content.replace(/target="_blank"/g, 'target="_self"');
  content = content.replace(/View Casestudy/g, '');
  content = content.replace(/View Project/g, '');

  fs.writeFileSync(filePath, content);
  console.log(`Successfully patched: ${relPath}`);
});

// Update carousel img tags directly in index.html
let html = fs.readFileSync('index.html', 'utf8');
const carouselStart = html.indexOf('aria-roledescription="carousel"');
if (carouselStart !== -1) {
  const carouselEnd = html.indexOf('</section>', carouselStart);
  let carouselHtml = html.substring(carouselStart, carouselEnd);

  const workImgs = ['./work1.png', './work2.png', './work3.png', './work4.png'];

  let count = 0;
  carouselHtml = carouselHtml.replace(/<img[^>]+>/g, (imgTag) => {
    const targetSrc = workImgs[count % workImgs.length];
    count++;
    let newTag = imgTag.replace(/src="[^"]*"/, `src="${targetSrc}"`);
    newTag = newTag.replace(/srcset="[^"]*"/, `srcset="${targetSrc}"`);
    return newTag;
  });

  html = html.substring(0, carouselStart) + carouselHtml + html.substring(carouselEnd);
  fs.writeFileSync('index.html', html);
  console.log('Updated index.html carousel images directly to work1-4.png');
}

// Inject Webflow Expandable Cards Animation CSS into index.html
html = fs.readFileSync('index.html', 'utf8');

const expandableStyle = `
<style>
/* Hide View Casestudy / View Project overlays */
[data-framer-name="View Project"],
[data-framer-name="View Casestudy"],
.framer-s7w4jd,
.framer-1i72ip {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
}

/* Webflow Expandable Cards Animation for Recent Works */
.framer--carousel,
.framer-eDUaF,
[data-framer-name="Projects Carousel"],
[data-framer-name="projects"] .framer-1a77k26 {
  display: flex !important;
  flex-direction: row !important;
  gap: 16px !important;
  align-items: center !important;
  justify-content: center !important;
  overflow-x: auto !important;
  padding: 24px 10px !important;
  scroll-behavior: smooth !important;
}

/* Base Card Style */
.framer--carousel > *,
.framer-eDUaF > *,
[data-framer-name="Projects Carousel"] > *,
[data-framer-name="projects"] .framer-1a77k26 > * {
  flex: 1 1 210px !important;
  min-width: 180px !important;
  height: 460px !important;
  border-radius: 20px !important;
  overflow: hidden !important;
  background-color: #0b0a10 !important;
  border: 1px solid rgba(255, 199, 44, 0.25) !important;
  transition: flex 0.5s cubic-bezier(0.25, 1, 0.5, 1), 
              transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), 
              filter 0.5s cubic-bezier(0.25, 1, 0.5, 1), 
              opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1),
              box-shadow 0.5s cubic-bezier(0.25, 1, 0.5, 1) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6) !important;
  position: relative !important;
  cursor: pointer !important;
}

/* Hovered Card Expands */
.framer--carousel > *:hover,
.framer-eDUaF > *:hover,
[data-framer-name="Projects Carousel"] > *:hover,
[data-framer-name="projects"] .framer-1a77k26 > *:hover {
  flex: 2.8 1 380px !important;
  transform: translateY(-8px) scale(1.02) !important;
  filter: brightness(1.1) !important;
  z-index: 10 !important;
  border-color: rgba(255, 199, 44, 0.8) !important;
  box-shadow: 0 20px 45px rgba(255, 199, 44, 0.35) !important;
}

/* Non-Hovered Cards Shrink & Dim */
.framer--carousel:hover > *:not(:hover),
.framer-eDUaF:hover > *:not(:hover),
[data-framer-name="Projects Carousel"]:hover > *:not(:hover),
[data-framer-name="projects"] .framer-1a77k26:hover > *:not(:hover) {
  flex: 0.65 1 130px !important;
  opacity: 0.45 !important;
  filter: brightness(0.5) grayscale(40%) !important;
}

/* Image Perfect Sizing inside Card */
.framer--carousel img,
.framer-eDUaF img,
[data-framer-name="Projects Carousel"] img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: top center !important;
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1) !important;
}

.framer--carousel > *:hover img,
.framer-eDUaF > *:hover img,
[data-framer-name="Projects Carousel"] > *:hover img {
  transform: scale(1.05) !important;
}
</style>
`;

if (!html.includes('/* Webflow Expandable Cards Animation for Recent Works */')) {
  html = html.replace('</head>', expandableStyle + '</head>');
} else {
  html = html.replace(/<style>[\s\S]*?\/\* Hide View Casestudy [\s\S]*?<\/style>/, expandableStyle);
}

fs.writeFileSync('index.html', html);
console.log('=== Recent Works Expandable Cards & Images Patch Completed ===');
