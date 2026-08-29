const fs = require('fs');

// 1. Remove the height collapse rule from patch.js
const patchPath = 'patch.js';
if (fs.existsSync(patchPath)) {
  let patchContent = fs.readFileSync(patchPath, 'utf8');
  
  const targetOldRule = `    .framer-povseb, .framer-OLpjL {
      height: auto !important;
      min-height: 0 !important;
    }`;

  const targetNewRule = `    /* Reverted to prevent top-level container collapse and clipping on mobile */
    .framer-povseb, .framer-OLpjL {
      height: auto !important;
      min-height: 100vh !important;
      overflow: visible !important;
    }`;

  if (patchContent.includes(targetOldRule)) {
    patchContent = patchContent.replace(targetOldRule, targetNewRule);
    fs.writeFileSync(patchPath, patchContent);
    console.log('✅ Successfully patched patch.js to prevent povseb/OLpjL height collapse');
  } else {
    console.log('Warn: Could not find target rule in patch.js');
  }
}

// 2. Also replace this rule inside index.html directly
const indexPath = 'index.html';
if (fs.existsSync(indexPath)) {
  let indexContent = fs.readFileSync(indexPath, 'utf8');

  // Find the exact rule in the stylesheet block
  const oldIndexRule = `.framer-povseb, .framer-OLpjL {       height: auto !important;       min-height: 0 !important;     }`;
  const oldIndexRuleAlt = `.framer-povseb, .framer-OLpjL {\n      height: auto !important;\n      min-height: 0 !important;\n    }`;
  const oldIndexRuleMin = `.framer-povseb, .framer-OLpjL{height:auto !important;min-height:0 !important;}`;

  const newIndexRule = `.framer-povseb, .framer-OLpjL { height: auto !important; min-height: 100vh !important; overflow: visible !important; }`;

  let replaced = false;
  if (indexContent.includes('.framer-povseb, .framer-OLpjL')) {
    // Replace using regex that matches whitespaces/newlines flexibly
    indexContent = indexContent.replace(/\.framer-povseb,\s*\.framer-OLpjL\s*\{\s*height:\s*auto\s*!important;\s*min-height:\s*0\s*!important;\s*\}/g, newIndexRule);
    indexContent = indexContent.replace(/\.framer-povseb,\s*\.framer-OLpjL\s*\{\s*height:\s*auto\s*!important;\s*min-height:\s*0\s*!important;\s*\}/gi, newIndexRule);
    fs.writeFileSync(indexPath, indexContent);
    console.log('✅ Successfully updated index.html stylesheet to prevent povseb/OLpjL height collapse');
  } else {
    console.log('Warn: Could not find povseb selector in index.html');
  }
}
