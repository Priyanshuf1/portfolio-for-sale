const fs = require('fs');

const baseline = fs.readFileSync('scratch/baseline_live.html', 'utf8');
const after = fs.readFileSync('scratch/after_live.html', 'utf8');

// We know we injected the CSS block right before </head>
// Let's locate the index of </head> in both and print the surrounding lines in both.
const headCloseTag = '</head>';

const baselineIdx = baseline.indexOf(headCloseTag);
const afterIdx = after.indexOf(headCloseTag);

if (baselineIdx === -1 || afterIdx === -1) {
  console.log('Error: </head> tag not found.');
  process.exit(1);
}

const baselineSlice = baseline.substring(Math.max(0, baselineIdx - 300), baselineIdx + 50);
const afterSlice = after.substring(Math.max(0, afterIdx - 500), afterIdx + 50);

console.log('--- BASELINE HTML SURROUNDING </head> ---');
console.log(baselineSlice);
console.log('\n--- AFTER HTML SURROUNDING </head> ---');
console.log(afterSlice);

// Let's also do a search for the start of the style block to verify where it begins and ends.
const styleStartTag = '<style id="glb-mobile-responsive">';
const startIdx = after.indexOf(styleStartTag);
if (startIdx !== -1) {
  console.log('\n--- INJECTED MOBILE RESPONSIVE CSS PREVIEW ---');
  console.log(after.substring(startIdx, startIdx + 800) + '\n... [truncated] ...\n' + after.substring(afterIdx - 100, afterIdx));
} else {
  console.log('Error: <style id="glb-mobile-responsive"> not found.');
}
