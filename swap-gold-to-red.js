const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace scrollbar thumb gold color with Brand Red
html = html.replace(/::-webkit-scrollbar-thumb\s*\{\s*background:\s*#FFC72C;/g, '::-webkit-scrollbar-thumb      { background: #FF1744;');

// Replace selection background gold color with Brand Red
html = html.replace(/::selection\s*\{\s*background:\s*rgba\(255,\s*199,\s*44,\s*\.3\);/g, '::selection { background: rgba(255, 23, 68, .35);');

// Replace ambientGlow keyframes with Brand Red radial aura
html = html.replace(
  /@keyframes ambientGlow \{[\s\S]*?\}/g,
  `@keyframes ambientGlow {
  0%, 100% { background: radial-gradient(circle, rgba(255, 23, 68, 0.25) 0%, rgba(10, 14, 39, 0) 65%); }
  50% { background: radial-gradient(circle, rgba(255, 23, 68, 0.45) 0%, rgba(10, 14, 39, 0) 75%); }
}`
);

fs.writeFileSync('index.html', html);
console.log('Successfully swapped all gold CSS accents to Brand Red in index.html');
