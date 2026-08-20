const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace ambientGlow animation with shiny red glow
html = html.replace(
  /@keyframes ambientGlow \{[\s\S]*?\}/g,
  `@keyframes ambientGlow {
  0%, 100% { background: radial-gradient(circle, rgba(255, 23, 68, 0.35) 0%, rgba(5, 5, 7, 0) 65%); }
  50% { background: radial-gradient(circle, rgba(213, 0, 0, 0.55) 0%, rgba(5, 5, 7, 0) 75%); }
}`
);

fs.writeFileSync('index.html', html);
console.log('Successfully updated ambientGlow to Shiny Red in index.html');
