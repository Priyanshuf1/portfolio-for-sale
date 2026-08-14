const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const observerScript = `
<script id="priyanshu-content-patch">
  const replacements = {
    'Crafting Unique Brand Identities': 'Grow Smarter Faster Better',
    'crafting bold visuals that inspire and elevate brands with thought process.': 'At GlobalLogic Media, we believe in Simplifying Digitally, Amplifying Results. We offer a diverse range of 360-degree digital marketing solutions.',
    'Brand Identity Design': 'Digital Marketing Agency',
    'Start a Conversation': 'Get Started Today',
    'Helping businesses standout with brand identity packaging that captivates and converts effectively.': 'We empower businesses to enhance online traffic, generate leads, and increase revenue through growth-focused marketing.',
    'Have a project in mind? Let\\'s build something remarkable together.': 'Ready to grow your business? Let\\'s build something remarkable together.',
    'priyanshu@creative.dev': '+91-7570060896 | hello@globallogicmedia.com',
    'Creative Director & Lead Designer': 'Leading Digital Marketing Agency in Lucknow',
    'What services do you provide?': 'What digital marketing services do you provide?',
    'I specialize in brand identity and package design, with experience in web design, UI/UX, and to create brand experiences.': 'We specialize in SEO, Google Ads, Meta Ads, Social Media Marketing, and Website Design to help businesses grow online.'
  };

  function replaceText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.textContent.trim();
      if (text) {
        for (let key in replacements) {
          if (text === key || text.includes(key)) {
            node.textContent = node.textContent.replace(key, replacements[key]);
          }
        }
      }
    } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
      for (let child of node.childNodes) {
        replaceText(child);
      }
    }
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length) {
        mutation.addedNodes.forEach(node => {
           if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
              replaceText(node);
           }
        });
      }
      if (mutation.type === 'characterData') {
         let text = mutation.target.textContent.trim();
         for (let key in replacements) {
           if (text === key || text.includes(key)) {
              mutation.target.textContent = mutation.target.textContent.replace(key, replacements[key]);
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

// Remove previous patch if it exists
html = html.replace(/<script id="priyanshu-content-patch">[\s\S]*?<\/script>/, '');
html = html.replace('</body>', observerScript + '\n</body>');
fs.writeFileSync('index.html', html);
console.log('Content patch injected successfully!');
