const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

function findOccurrences(target) {
  console.log(`\n--- Occurrences of ${target} ---`);
  let idx = 0;
  let count = 0;
  while ((idx = html.indexOf(target, idx)) !== -1) {
    count++;
    const start = Math.max(0, idx - 150);
    const end = Math.min(html.length, idx + 250);
    console.log(`Match ${count} (index ${idx}):`);
    console.log(html.substring(start, end).replace(/\n/g, ' '));
    idx += target.length;
  }
}

findOccurrences('data-framer-name="hero"');
findOccurrences('data-framer-name="about me section"');
findOccurrences('data-framer-name="process"');
findOccurrences('data-framer-name="Services"');
