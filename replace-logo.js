const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remove old logo patch if exists
html = html.replace(/<style id="priyanshu-logo-patch">[\s\S]*?<\/style>/, '');

const logoCSS = `<style id="priyanshu-logo-patch">
/* ── Replace Logo with uploaded image ── */
.framer-1lcme9 svg {
  display: none !important;
}
.framer-1lcme9 {
  background: url('/logo.png') no-repeat left center / contain !important;
  width: 180px !important;
  height: 60px !important;
  display: block !important;
}
</style>`;

html = html.replace('</head>', logoCSS + '\n</head>');
fs.writeFileSync('index.html', html);
console.log('Logo replaced via CSS safely!');
