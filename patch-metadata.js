const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let orig = content;
  
  // Replace favicon PNGs
  content = content.replace(/https:\/\/framerusercontent\.com\/assets\/1Fpy3w9PoERri2J1TNuQ85aoJ0Q\.png/g, '/logo.png');
  content = content.replace(/https:\/\/framerusercontent\.com\/images\/1Fpy3w9PoERri2J1TNuQ85aoJ0Q\.png/g, '/logo.png');
  content = content.replace(/1Fpy3w9PoERri2J1TNuQ85aoJ0Q\.png/g, 'logo.png');
  
  // Replace titles
  const targetTitle = 'Global Logic Media | Digital Marketing Agency in Lucknow | SEO, Web Design & Lead Generation';
  content = content.replace(/Portfolite – Framer Portfolio Template/g, targetTitle);
  content = content.replace(/Portfolite \– Framer Portfolio Template/g, targetTitle);
  content = content.replace(/Portfolite - Framer Portfolio Template/g, targetTitle);
  
  if (content !== orig) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated title and favicon metadata in ${filePath}`);
  }
}

// Read all HTML/MJS/JS files in root and js/ folders, excluding runner/helper scripts
const excludeFiles = ['patch-metadata.js', 'patch.js', 'customize.js', 'restore.js', 'rebuild.js', 'verify.js', 'cdp_screenshot.js', 'snap.js', 'snap2.js'];
const rootFiles = fs.readdirSync('.').filter(f => (f.endsWith('.html') || f.endsWith('.js')) && !excludeFiles.includes(f));
rootFiles.forEach(f => replaceInFile(f));

if (fs.existsSync('js')) {
  const jsFiles = fs.readdirSync('js').filter(f => f.endsWith('.js') || f.endsWith('.mjs'));
  jsFiles.forEach(f => replaceInFile(path.join('js', f)));
}
