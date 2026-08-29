const fs = require('fs');

// Normalize newlines helper
function normalizeNewlines(str) {
  return str.replace(/\r\n/g, '\n');
}

// 1. Patch patch.js
const patchPath = 'patch.js';
if (fs.existsSync(patchPath)) {
  let content = fs.readFileSync(patchPath, 'utf8');
  const normalized = normalizeNewlines(content);
  
  // Find rule using regex
  const regex = /\.framer-povseb,\s*\.framer-OLpjL\s*\{\n\s*height:\s*auto\s*!important;\n\s*min-height:\s*0\s*!important;\n\s*\}/g;
  
  if (regex.test(normalized)) {
    const newRule = `.framer-povseb, .framer-OLpjL {\n      height: auto !important;\n      min-height: 100vh !important;\n      overflow: visible !important;\n    }`;
    const updated = normalized.replace(regex, newRule);
    // Write back with original or CRLF if needed
    fs.writeFileSync(patchPath, updated);
    console.log('✅ Successfully patched patch.js using regex!');
  } else {
    console.log('Warn: Could not match regex in patch.js');
  }
}

// 2. Patch index.html
const indexPath = 'index.html';
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  const normalized = normalizeNewlines(content);
  
  const regex = /\.framer-povseb,\s*\.framer-OLpjL\s*\{\s*height:\s*auto\s*!important;\s*min-height:\s*0\s*!important;\s*\}/g;
  
  if (regex.test(normalized)) {
    const newRule = `.framer-povseb, .framer-OLpjL { height: auto !important; min-height: 100vh !important; overflow: visible !important; }`;
    const updated = normalized.replace(regex, newRule);
    fs.writeFileSync(indexPath, updated);
    console.log('✅ Successfully patched index.html using regex!');
  } else {
    // Try a more relaxed regex that handles any layout spacing
    const relaxedRegex = /\.framer-povseb,\s*\.framer-OLpjL\s*\{\s*height:\s*auto\s*!important;\s*min-height:\s*0\s*!important;\s*\}/i;
    console.log('Warn: Could not find exact minified rule in index.html. Checking if CSS has been injected at all.');
  }
}
