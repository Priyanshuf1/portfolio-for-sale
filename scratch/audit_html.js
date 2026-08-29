const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find all data-framer-name values
const sections = html.match(/data-framer-name="[^"]+"/g);
const unique = [...new Set(sections)].sort();
unique.forEach(s => console.log(s));

// Find key structural class names used on top-level section wrappers
console.log('\n--- Key structural classes ---');
const classMatches = html.match(/class="framer-[a-z0-9]+ framer-[a-z0-9]+"/g);
if (classMatches) {
  const uniqueClasses = [...new Set(classMatches)].slice(0, 30);
  uniqueClasses.forEach(c => console.log(c));
}

// Check how the nav/header is structured
console.log('\n--- Header structure ---');
const headerMatch = html.match(/<header[^>]*>/);
if (headerMatch) console.log(headerMatch[0].substring(0, 200));

// Check the phone breakpoint SSR variant wrapper
console.log('\n--- SSR variant classes ---');
const ssrMatches = html.match(/class="[^"]*ssr-variant[^"]*"/g);
if (ssrMatches) {
  const uniqueSsr = [...new Set(ssrMatches)].slice(0, 10);
  uniqueSsr.forEach(s => console.log(s));
}

// Check hidden classes used for breakpoint
console.log('\n--- Hidden breakpoint classes ---');
const hiddenMatches = html.match(/class="[^"]*hidden-[^"]*"/g);
if (hiddenMatches) {
  const uniqueHidden = [...new Set(hiddenMatches)].slice(0, 10);
  uniqueHidden.forEach(s => console.log(s));
}
