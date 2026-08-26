const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// We need to find the Projects section block and the "about me section" block
// and swap them so About comes before Projects.

// Strategy: find the opening div of Projects and about me section by their data-framer-name
// and extract full blocks by matching braces/tags.

// Find positions
const projectsStart = html.indexOf('data-framer-name="Projects"');
const aboutStart = html.indexOf('data-framer-name="about me section"');

console.log('Projects pos:', projectsStart);
console.log('About pos:', aboutStart);

if (projectsStart === -1 || aboutStart === -1) {
  console.log('ERROR: Could not find sections!');
  process.exit(1);
}

if (aboutStart < projectsStart) {
  console.log('About is already BEFORE Projects. Nothing to swap.');
  process.exit(0);
}

// Find the opening <div> tag that CONTAINS data-framer-name="Projects"
// Walk backwards from projectsStart to find the opening <div
let projTagStart = projectsStart;
while (projTagStart > 0 && html[projTagStart] !== '<') {
  projTagStart--;
}

// Find the opening <div> tag that CONTAINS data-framer-name="about me section"
let aboutTagStart = aboutStart;
while (aboutTagStart > 0 && html[aboutTagStart] !== '<') {
  aboutTagStart--;
}

console.log('Projects tag start:', projTagStart);
console.log('About tag start:', aboutTagStart);

// Now find the matching closing </div> for each section.
// We count depth: each <div opens +1, each </div> closes -1
function findClosingDiv(html, start) {
  let depth = 0;
  let i = start;
  while (i < html.length) {
    if (html[i] === '<') {
      // Check if opening div
      if (html.substring(i, i+4) === '<div') {
        depth++;
        i += 4;
      } else if (html.substring(i, i+6) === '</div>') {
        depth--;
        if (depth === 0) {
          return i + 6; // end of the closing </div>
        }
        i += 6;
      } else {
        i++;
      }
    } else {
      i++;
    }
  }
  return -1;
}

const projEnd = findClosingDiv(html, projTagStart);
const aboutEnd = findClosingDiv(html, aboutTagStart);

console.log('Projects block:', projTagStart, '->', projEnd);
console.log('About block:', aboutTagStart, '->', aboutEnd);

const projectsBlock = html.substring(projTagStart, projEnd);
const aboutBlock = html.substring(aboutTagStart, aboutEnd);

console.log('Projects block length:', projectsBlock.length);
console.log('About block length:', aboutBlock.length);

// Verify: About should come AFTER Projects in the current HTML
if (aboutTagStart < projTagStart) {
  console.log('About is already before Projects!');
  process.exit(0);
}

// Build new HTML:
// Everything before Projects + About block + content between Projects and About + Projects block + everything after About
const before = html.substring(0, projTagStart);
const between = html.substring(projEnd, aboutTagStart);
const after = html.substring(aboutEnd);

const newHtml = before + aboutBlock + between + projectsBlock + after;

fs.writeFileSync('index.html', newHtml);
console.log('\n✅ SUCCESS: About section moved before Projects section!');
console.log('New order: Hero → Meet Global Logic Media | Digital Marketing Agency in Lucknow | SEO, Web Design & Lead Generation|Global Logic Media | Digital Marketing Agency in Lucknow | SEO, Web Design & Lead Generation|Global Logic Media | Digital Marketing Agency in Lucknow | SEO, Web Design & Lead Generation→ Projects → ...');
