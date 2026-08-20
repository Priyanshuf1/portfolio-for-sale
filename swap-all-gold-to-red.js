const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

// Replace CSS variables
html = html.replace(/--gold:\s*#FFC72C;/g, '--gold: #FF1744;');
html = html.replace(/--gold-light:\s*#FFE066;/g, '--gold-light: #FF5252;');

// Replace all #FFC72C with #FF1744
html = html.replace(/#FFC72C/g, '#FF1744');
html = html.replace(/#ffc72c/g, '#FF1744');

// Replace all rgb(255, 199, 44) with rgb(255, 23, 68)
html = html.replace(/255,\s*199,\s*44/g, '255, 23, 68');

// Replace gradient text fills
html = html.replace(/linear-gradient\(120deg,\s*#FFC72C[\s\S]*?\)/g, 'linear-gradient(120deg, #FF1744 20%, #FFFFFF 40%, #FFFFFF 60%, #FF1744 80%)');

fs.writeFileSync('index.html', html);
console.log('Successfully updated index.html gold colors to Brand Red #FF1744');

// 2. Update bg-enhancer.js
let bgScript = fs.readFileSync('bg-enhancer.js', 'utf8');
bgScript = bgScript.replace(/#FFC72C/g, '#FF1744');
bgScript = bgScript.replace(/255,\s*199,\s*44/g, '255, 23, 68');
fs.writeFileSync('bg-enhancer.js', bgScript);
console.log('Successfully updated bg-enhancer.js gold colors to Brand Red #FF1744');

// 3. Update ambient-particles.js
let particleScript = fs.readFileSync('ambient-particles.js', 'utf8');
particleScript = particleScript.replace(/255,\s*199,\s*44/g, '255, 23, 68');
fs.writeFileSync('ambient-particles.js', particleScript);
console.log('Successfully updated ambient-particles.js gold colors to Brand Red #FF1744');

// 4. Update custom-footer.js
let footerScript = fs.readFileSync('custom-footer.js', 'utf8');
footerScript = footerScript.replace(/255,\s*199,\s*44/g, '255, 23, 68');
fs.writeFileSync('custom-footer.js', footerScript);
console.log('Successfully updated custom-footer.js gold colors to Brand Red #FF1744');
