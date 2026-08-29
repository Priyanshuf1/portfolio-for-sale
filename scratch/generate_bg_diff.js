const fs = require('fs');

const baseline = fs.readFileSync('scratch/after_live.html', 'utf8');
const after = fs.readFileSync('scratch/after_bg_fix.html', 'utf8');

const key = 'three-bg.js?v=';
const baselineIdx = baseline.indexOf(key);
const afterIdx = after.indexOf(key);

if (baselineIdx !== -1 && afterIdx !== -1) {
  console.log('--- BASELINE HTML TAG ---');
  console.log(baseline.substring(baselineIdx - 20, baselineIdx + 60));
  console.log('\n--- AFTER HTML TAG ---');
  console.log(after.substring(afterIdx - 20, afterIdx + 60));
} else {
  console.log('Error locating three-bg script tags in HTML.');
}
