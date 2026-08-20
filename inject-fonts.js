const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Inject Syne & Plus Jakarta Sans Google Fonts into <head>
if (!html.includes('family=Syne')) {
  const fontLink = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Plus+Jakarta+Sans:wght@700;800;900&display=swap" rel="stylesheet">\n`;
  html = html.replace('</head>', fontLink + '</head>');
}

fs.writeFileSync('index.html', html);
console.log('Successfully injected Syne & Plus Jakarta Sans fonts into index.html');
