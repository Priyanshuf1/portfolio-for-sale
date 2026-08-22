const fs = require('fs');
const path = require('path');

console.log('=== Patching Three Cards Section Image with Logo ===');

const filesToPatch = [
  'index.html',
  'js/l31sonSvPM96iEFWqw0Ab0nmHNOercM7iLhki8PGTPg.6BnxHPM7.mjs',
  'js/script_main.xNRutfmy.mjs'
];

filesToPatch.forEach(relPath => {
  const filePath = path.join(process.cwd(), relPath);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace center card image (headphone girl / roWFLkzHAotwSx5UxGPxpxMeA) with ./logo.png
  content = content.replace(/https:\/\/framerusercontent\.com\/images\/roWFLkzHAotwSx5UxGPxpxMeA\.[a-zA-Z0-9_\-\?&=.]+/g, './logo.png');
  content = content.replace(/(?<=src="[^"]*)roWFLkzHAotwSx5UxGPxpxMeA\.jpg/g, 'logo.png');
  content = content.replace(/srcset="[^"]*roWFLkzHAotwSx5UxGPxpxMeA[^"]*"/g, 'srcset="./logo.png"');

  fs.writeFileSync(filePath, content);
  console.log(`Updated center card image to logo.png in: ${relPath}`);
});

// Directly replace the center card img tag inside #about-me / features section in index.html
let html = fs.readFileSync('index.html', 'utf8');

// Ensure ambient-particles.js is included in index.html for constellation background
if (!html.includes('ambient-particles.js')) {
  html = html.replace('</body>', '<script src="./ambient-particles.js"></script>\n</body>');
}

fs.writeFileSync('index.html', html);
console.log('=== Three Cards Logo Patch Completed ===');
