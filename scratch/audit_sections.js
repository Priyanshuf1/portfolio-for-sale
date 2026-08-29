const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find major section wrappers with their classes
const sections = [
  'hero', 'about me section', 'Projects', 'process', 
  'Services', 'testimonials', 'Stats', "FAQ's", 'Overlay', 'Footer'
];

sections.forEach(name => {
  // Find the element with this data-framer-name
  const regex = new RegExp(`data-framer-name="${name}"[^>]*class="([^"]*)"`, 'i');
  const match = html.match(regex);
  if (match) {
    console.log(`[${name}] class="${match[1]}"`);
  } else {
    // Try reversed order (class before data-framer-name)
    const regex2 = new RegExp(`class="([^"]*)"[^>]*data-framer-name="${name}"`, 'i');
    const match2 = html.match(regex2);
    if (match2) {
      console.log(`[${name}] class="${match2[1]}"`);
    } else {
      console.log(`[${name}] NOT FOUND`);
    }
  }
});

// Find the Companies/logos marquee wrapper
console.log('\n--- Companies marquee ---');
const companiesMatch = html.match(/data-framer-name="Companies"[^>]*class="([^"]*)"/);
if (companiesMatch) console.log('Companies class:', companiesMatch[1]);

// Find the process section inner layout
console.log('\n--- Process inner layout ---');
const processIdx = html.indexOf('data-framer-name="process"');
if (processIdx > -1) {
  const processChunk = html.substring(processIdx, processIdx + 2000);
  const innerClasses = processChunk.match(/class="framer-[a-z0-9]+/g);
  if (innerClasses) {
    console.log('Process inner classes:', [...new Set(innerClasses)].join(', '));
  }
}

// Find about section inner layout
console.log('\n--- About inner layout ---');
const aboutIdx = html.indexOf('data-framer-name="about me section"');
if (aboutIdx > -1) {
  const aboutChunk = html.substring(aboutIdx, aboutIdx + 2000);
  const innerClasses = aboutChunk.match(/class="framer-[a-z0-9]+/g);
  if (innerClasses) {
    console.log('About inner classes:', [...new Set(innerClasses)].join(', '));
  }
}
