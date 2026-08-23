const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace all instances of Meily in index.html
html = html.replace(/Meet Meily/g, 'Meet Global Logic Media');

html = html.replace(
  /I'm Meily, a passionate Brand Identity &amp; Package Designer based in tokyo\. I specialize in crafting bold visual identities and packaging that captivate and inspire, blending creativity with strategy to elevate brands\./g,
  'Welcome to Global Logic Media — Lucknow\'s premier 360° Digital Marketing &amp; Performance Agency. We specialize in Search Engine Optimization (SEO), Google &amp; Meta Ads, Social Media Growth, Custom Web Design, and Lead Generation to help businesses grow smarter, faster, and better.'
);

html = html.replace(
  /Computer Engineering student at GESCOE, also pursuing Data Science at IIT Madras\. Skilled in C\+\+, Python, and exploring FastAPI\. Self-taught 3D artist passionate about merging technology and creativity\. Eager learner always seeking new challenges in tech and digital art\./g,
  'Global Logic Media is a leading digital marketing and web development agency based in Gomti Nagar, Lucknow. We empower startups, local businesses, and growing enterprises to enhance online visibility, drive high-intent traffic, and maximize ROI through data-driven digital strategies.'
);

html = html.replace(/Working with Meily/g, 'Working with Global Logic Media');
html = html.replace(/Meily's strategic approach/g, 'Global Logic Media\'s strategic approach');
html = html.replace(/Every project Meily touches/g, 'Every campaign Global Logic Media touches');
html = html.replace(/Meily's designs speak/g, 'Global Logic Media\'s results speak');
html = html.replace(/with Meily/g, 'with Global Logic Media');
html = html.replace(/Meily's/g, 'Global Logic Media\'s');
html = html.replace(/Meily/g, 'Global Logic Media');

// Also update the replacements object inside script id="priyanshu-content-patch"
const newReplacementsScript = `
<script id="priyanshu-content-patch">
  const replacements = {
    'Meet Meily': 'Meet Global Logic Media',
    'Meily': 'Global Logic Media',
    'Crafting Unique Brand Identities': 'Grow Smarter, Faster, Better',
    'crafting bold visuals that inspire and elevate brands with thought process.': 'At Global Logic Media, we believe in Simplifying Digitally, Amplifying Results. We offer a diverse range of 360-degree digital marketing solutions.',
    'Brand Identity Design': 'Digital Marketing Agency',
    'Start a Conversation': 'Get Started Today',
    'Helping businesses standout with brand identity packaging that captivates and converts effectively.': 'We empower businesses to enhance online traffic, generate leads, and increase revenue through growth-focused marketing.',
    'Have a project in mind? Let\\\'s build something remarkable together.': 'Ready to grow your business? Let\\\'s build something remarkable together.'
  };

  function replaceText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.textContent;
      for (let key in replacements) {
        if (text.includes(key)) {
          node.textContent = text.replace(new RegExp(key, 'g'), replacements[key]);
        }
      }
    } else {
      for (let child of node.childNodes) {
        replaceText(child);
      }
    }
  }

  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => replaceText(node));
      }
      if (mutation.type === 'characterData') {
         let text = mutation.target.textContent;
         for (let key in replacements) {
           if (text.includes(key)) {
              mutation.target.textContent = text.replace(new RegExp(key, 'g'), replacements[key]);
           }
         }
      }
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    replaceText(document.body);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  });
</script>
`;

// Replace old priyanshu-content-patch script if present
if (html.includes('id="priyanshu-content-patch"')) {
  let startIdx = html.indexOf('<script id="priyanshu-content-patch">');
  let endIdx = html.indexOf('</script>', startIdx) + 9;
  html = html.substring(0, startIdx) + newReplacementsScript + html.substring(endIdx);
} else {
  html = html.replace('</body>', newReplacementsScript + '</body>');
}

fs.writeFileSync('index.html', html);
console.log('Successfully updated index.html with Global Logic Media content!');
