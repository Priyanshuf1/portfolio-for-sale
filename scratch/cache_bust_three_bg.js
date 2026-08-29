const fs = require('fs');

const path = 'index.html';
if (fs.existsSync(path)) {
  let content = fs.readFileSync(path, 'utf8');
  
  // Find all instances of three-bg.js in index.html and update the query parameter to cache bust it
  const regex = /three-bg\.js\?v=\d+/gi;
  const newVersion = 'three-bg.js?v=' + Date.now();
  
  if (content.match(regex)) {
    content = content.replace(regex, newVersion);
    fs.writeFileSync(path, content);
    console.log('✅ Successfully cache-busted three-bg.js in index.html to:', newVersion);
  } else {
    // If no query parameter exists, append one
    content = content.replace('three-bg.js', newVersion);
    fs.writeFileSync(path, content);
    console.log('✅ Appended cache-busting query parameter to three-bg.js in index.html:', newVersion);
  }
} else {
  console.log('Error: index.html not found.');
}
