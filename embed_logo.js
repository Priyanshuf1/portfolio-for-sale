const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove duplicate scripts from body if any
html = html.replace(/<script id="glm-3d-interactive-logo">[\s\S]*?<\/script>/g, '');
html = html.replace(/<script src="\.\/three-logo-interactive\.js"><\/script>/g, '');
html = html.replace(/<script src="\/three-logo-interactive\.js"><\/script>/g, '');

// 2. Put Three.js and three-logo-interactive.js directly into <head>
const headTags = `
	<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
	<script src="./three-logo-interactive.js" defer></script>
</head>`;

if (html.includes('</head>')) {
  // Replace the closing head tag with headTags
  html = html.replace('</head>', headTags);
}

fs.writeFileSync('index.html', html);
console.log('Successfully moved 3D logo script to <head>');
