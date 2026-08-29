const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const targets = [
  'data-framer-name="hero"',
  'data-framer-name="about me section"',
  'data-framer-name="process"',
  'data-framer-name="Services"'
];

targets.forEach(target => {
  console.log(`\n=== Matches for: ${target} ===`);
  let idx = 0;
  let count = 0;
  while ((idx = html.indexOf(target, idx)) !== -1) {
    count++;
    const start = Math.max(0, idx - 120);
    const end = Math.min(html.length, idx + 200);
    console.log(`Match ${count} (idx ${idx}):`);
    console.log(html.substring(start, end).replace(/\n/g, ' '));
    idx += target.length;
  }
});
