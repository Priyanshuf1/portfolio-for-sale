const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

if (html.includes('priyanshu-safe-patch')) {
  console.log('Already patched');
  process.exit(0);
}

// ONLY CSS — zero JS, zero DOM manipulation = zero hydration risk
const safeCSS = [
  '<style id="priyanshu-safe-patch">',
  '/* Hide Made in Framer badge and Get Template button */',
  'a[href*="framer.link"],',
  'a[href*="framer.com/edit"],',
  'a[href*="framer.com/badge"],',
  '#framer-badge,',
  '[class*="framer-badge"],',
  '[data-framer-badge] {',
  '  display: none !important;',
  '  visibility: hidden !important;',
  '  pointer-events: none !important;',
  '}',
  '/* Hide the fixed bottom bar that renders Made in Framer */',
  '.framer-DvMIA .framer-phxu8k-container {',
  '  display: none !important;',
  '}',
  '</style>'
].join('\n');

html = html.replace('</head>', safeCSS + '\n</head>');
fs.writeFileSync('index.html', html);
console.log('Done — CSS-only patch applied. No JS injected. No hydration risk.');
