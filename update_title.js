const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/<title>.*?<\/title>/gi, '<title>Portfolio For Sale</title>');
html = html.replace(/<meta property="og:title" content=".*?">/gi, '<meta property="og:title" content="Portfolio For Sale">');
html = html.replace(/<meta name="twitter:title" content=".*?">/gi, '<meta name="twitter:title" content="Portfolio For Sale">');
fs.writeFileSync('index.html', html);
console.log('Title updated.');
