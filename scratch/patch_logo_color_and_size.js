const fs = require('fs');

const path = 'index.html';
if (fs.existsSync(path)) {
  let content = fs.readFileSync(path, 'utf8');

  // 1. Replace White SVG text colors with Premium Charcoal and Brand Red + add width/height attributes
  const oldTextLine1 = `'<text x="110" y="42" font-family="Inter, sans-serif" font-weight="900" font-size="34" fill="#FFFFFF" letter-spacing="-0.5">GLOBAL</text>',`;
  const oldTextLine2 = `'<text x="110" y="76" font-family="Inter, sans-serif" font-weight="900" font-size="34" fill="#FFFFFF" letter-spacing="-0.5">LOGIC</text>',`;
  const oldTextLine3 = `'<text x="110" y="110" font-family="Inter, sans-serif" font-weight="900" font-size="34" fill="#FFFFFF" letter-spacing="-0.5">MEDIA</text>',`;

  const newTextLine1 = `'<text x="110" y="42" font-family="Inter, sans-serif" font-weight="900" font-size="34" fill="#111827" letter-spacing="-0.5">GLOBAL</text>',`;
  const newTextLine2 = `'<text x="110" y="76" font-family="Inter, sans-serif" font-weight="900" font-size="34" fill="#111827" letter-spacing="-0.5">LOGIC</text>',`;
  const newTextLine3 = `'<text x="110" y="110" font-family="Inter, sans-serif" font-weight="900" font-size="34" fill="#e20001" letter-spacing="-0.5">MEDIA</text>',`;

  // Also replace <svg> tag line to set attributes
  const oldSvgTag = `'<svg viewBox="0 0 340 120" style="height: 48px; width: auto;" xmlns="http://www.w3.org/2000/svg">',`;
  const newSvgTag = `'<svg viewBox="0 0 340 120" width="160" height="56" style="height: 40px; width: auto; display: block;" xmlns="http://www.w3.org/2000/svg">',`;

  if (content.includes(oldTextLine1)) {
    content = content.replace(oldTextLine1, newTextLine1);
    content = content.replace(oldTextLine2, newTextLine2);
    content = content.replace(oldTextLine3, newTextLine3);
    content = content.replace(oldSvgTag, newSvgTag);
    console.log('✅ Successfully replaced SVG text colors and tags in index.html');
  } else {
    console.log('Error: Could not locate old SVG text lines in index.html');
  }

  // 2. Also inject specific SVG sizes into glb-mobile-responsive CSS block
  // Let's locate glb-mobile-responsive style block and add svg selector
  const oldCssNav = `  /* ── 1. NAV BAR ── */
  /* Constrain logo size */
  html body .framer-1lcme9,
  html body [data-framer-name="Logo"] {
    width: auto !important;
    max-width: 160px !important;
    height: 40px !important;
  }
  html body .framer-1lcme9 img,
  html body [data-framer-name="Logo"] img {
    height: 36px !important;
    width: auto !important;
    max-width: 160px !important;
    object-fit: contain !important;
  }`;

  const newCssNav = `  /* ── 1. NAV BAR ── */
  /* Constrain logo size */
  html body .framer-1lcme9,
  html body [data-framer-name="Logo"] {
    width: 160px !important;
    max-width: 160px !important;
    height: 40px !important;
    display: flex !important;
    align-items: center !important;
  }
  html body .framer-1lcme9 img,
  html body [data-framer-name="Logo"] img,
  html body .framer-1lcme9 svg,
  html body [data-framer-name="Logo"] svg {
    height: 36px !important;
    width: 160px !important;
    max-width: 160px !important;
    object-fit: contain !important;
    display: block !important;
  }`;

  if (content.includes(oldCssNav)) {
    content = content.replace(oldCssNav, newCssNav);
    console.log('✅ Successfully updated CSS selectors for navbar SVG/Image on mobile');
  } else {
    console.log('Error: Could not locate old CSS Nav block in index.html');
  }

  fs.writeFileSync(path, content);
} else {
  console.log('Error: index.html not found.');
}
