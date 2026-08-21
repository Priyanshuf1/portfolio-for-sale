const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
const logoScript = fs.readFileSync('three-logo-interactive.js', 'utf8');

// Ensure Three.js CDN script is in head
if (!html.includes('three.min.js')) {
  html = html.replace('</head>', '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>\n</head>');
}

// Inline the 3D logo script
const target = '<script src="./three-logo-interactive.js"></script>';
const inlineScript = `<script id="glm-3d-interactive-logo">\n${logoScript}\n</script>\n<script src="./three-logo-interactive.js"></script>`;

if (html.includes(target)) {
  html = html.replace(target, inlineScript);
  fs.writeFileSync('index.html', html);
  console.log('Successfully embedded 3D logo engine into index.html');
} else {
  console.log('Target script tag not found');
}
