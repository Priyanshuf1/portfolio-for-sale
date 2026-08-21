const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove all old scripts from body and head to prevent duplicates
html = html.replace(/<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/three\.js\/r128\/three\.min\.js"><\/script>/g, '');
html = html.replace(/<script src="\.\/three-logo-interactive\.js" defer><\/script>/g, '');
html = html.replace(/<script src="\.\/three-logo-interactive\.js"><\/script>/g, '');
html = html.replace(/<script src="\.\/three-bg\.js"><\/script>/g, '');
html = html.replace(/<script src="\.\/three-bg\.js" defer><\/script>/g, '');

// Clean up injected code from previous embeds
html = html.replace(/<script id="glm-3d-interactive-logo">[\s\S]*?<\/script>/g, '');

// 2. Put Three.js and three-bg.js directly into <head>
const headTags = `
	<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
	<script src="./three-bg.js" defer></script>
</head>`;

if (html.includes('</head>')) {
  html = html.replace('</head>', headTags);
}

fs.writeFileSync('index.html', html);
console.log('Successfully moved unified three-bg.js to <head>');
