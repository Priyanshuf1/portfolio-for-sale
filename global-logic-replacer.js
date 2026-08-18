(function() {
  function replaceAllMeily() {
    const walker = document.createTreeWalker(document.body || document.documentElement, NodeFilter.SHOW_TEXT);
    let node;
    while (node = walker.nextNode()) {
      let val = node.nodeValue;
      if (!val) continue;

      if (val.includes('Meet Meily')) {
        node.nodeValue = val.replace(/Meet Meily/g, 'Meet Global Logic Media');
      } else if (val.includes('Meily')) {
        node.nodeValue = val.replace(/Meily/g, 'Global Logic Media');
      }

      if (val.includes('Brand Identity & Package Designer based in tokyo') || val.includes('crafting bold visual identities and packaging')) {
        node.nodeValue = 'Welcome to Global Logic Media — Lucknow\'s premier 360° Digital Marketing & Performance Agency. We specialize in SEO, Google & Meta Ads, Social Media Growth, Custom Web Design, and Lead Generation to help businesses grow smarter, faster, and better.';
      }

      if (val.includes('Computer Engineering student at GESCOE')) {
        node.nodeValue = 'Global Logic Media is a leading digital marketing and web development agency based in Gomti Nagar, Lucknow. We empower startups, local businesses, and growing enterprises to enhance online visibility, drive high-intent traffic, and maximize ROI through data-driven digital strategies.';
      }
    }
  }

  // Run on load, DOMContentLoaded, mutation observer, and interval
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceAllMeily);
  } else {
    replaceAllMeily();
  }

  const observer = new MutationObserver(replaceAllMeily);
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  setInterval(replaceAllMeily, 300);
})();
