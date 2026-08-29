const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find Companies section
const companiesPatterns = ['Companies', 'companies', 'Logo'];
companiesPatterns.forEach(name => {
  const idx = html.indexOf(`data-framer-name="${name}"`);
  if (idx > -1) {
    const before = html.substring(Math.max(0, idx - 200), idx);
    const classMatch = before.match(/class="([^"]*framer-[^"]*)"\s*$/);
    console.log(`[${name}] found at ${idx}`);
    if (classMatch) console.log(`  parent class: ${classMatch[1]}`);
    // Get the element's own tag
    const after = html.substring(idx, idx + 300);
    const ownClass = after.match(/class="([^"]*)"/);
    if (ownClass) console.log(`  own class: ${ownClass[1]}`);
  }
});

// Footer
console.log('\n--- Footer ---');
const footerIdx = html.indexOf('data-framer-name="Footer detail"');
if (footerIdx > -1) {
  const chunk = html.substring(footerIdx - 300, footerIdx + 300);
  const classes = chunk.match(/class="framer-[^"]+"/g);
  if (classes) classes.forEach(c => console.log('  ', c));
}

// Process inner structure
console.log('\n--- Process section inner ---');
const processIdx = html.indexOf('data-framer-name="process"');
if (processIdx > -1) {
  const chunk = html.substring(processIdx, processIdx + 5000);
  // Find direct children wrapper classes
  const innerNames = chunk.match(/data-framer-name="[^"]+"/g);
  if (innerNames) [...new Set(innerNames)].slice(0, 20).forEach(n => console.log('  ', n));
}

// Stats inner structure  
console.log('\n--- Stats section inner ---');
const statsIdx = html.indexOf('data-framer-name="Stats"');
if (statsIdx > -1) {
  const chunk = html.substring(statsIdx, statsIdx + 3000);
  const innerNames = chunk.match(/data-framer-name="[^"]+"/g);
  if (innerNames) [...new Set(innerNames)].slice(0, 15).forEach(n => console.log('  ', n));
}

// Services Bento inner
console.log('\n--- Services Bento inner ---');
const bentoIdx = html.indexOf('data-framer-name="Services Bento "');
if (bentoIdx > -1) {
  const chunk = html.substring(bentoIdx, bentoIdx + 3000);
  const innerNames = chunk.match(/data-framer-name="[^"]+"/g);
  if (innerNames) [...new Set(innerNames)].slice(0, 15).forEach(n => console.log('  ', n));
}
