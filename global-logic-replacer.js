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
        node.nodeValue = 'Welcome to Global Logic Media | Digital Marketing Agency in Lucknow | SEO, Web Design & Lead Generation|Global Logic Media | Digital Marketing Agency in Lucknow | SEO, Web Design & Lead Generation|Global Logic Media | Digital Marketing Agency in Lucknow | SEO, Web Design & Lead Generation— Lucknow\'s premier 360° Digital Marketing & Performance Agency. We specialize in SEO, Google & Meta Ads, Social Media Growth, Custom Web Design, and Lead Generation to help businesses grow smarter, faster, and better.';
      }

      if (val.includes('Computer Engineering student at GESCOE')) {
        node.nodeValue = 'Global Logic Media | Digital Marketing Agency in Lucknow | SEO, Web Design & Lead Generation|Global Logic Media | Digital Marketing Agency in Lucknow | SEO, Web Design & Lead Generation|Global Logic Media | Digital Marketing Agency in Lucknow | SEO, Web Design & Lead Generationis a leading digital marketing and web development agency based in Gomti Nagar, Lucknow. We empower startups, local businesses, and growing enterprises to enhance online visibility, drive high-intent traffic, and maximize ROI through data-driven digital strategies.';
      }

      // Replace timeline/experience items with official stats
      if (val === 'Freelance') {
        node.nodeValue = '7+ Years';
      } else if (val === 'GreenLeaf Co') {
        node.nodeValue = 'Marketing & Dev Experience';
      } else if (val === 'Currently') {
        node.nodeValue = 'Est. 2019';
      } else if (val === 'Brand Designer') {
        node.nodeValue = '100+ Clients';
      } else if (val === 'UrbanFit Studio') {
        node.nodeValue = 'Served Globally & Locally';
      } else if (val === '2023-24') {
        node.nodeValue = 'Trusted Partner';
      } else if (val === 'Package Designer') {
        node.nodeValue = '500+ Projects';
      } else if (val === 'GreenK Studio') {
        node.nodeValue = 'High ROI Campaigns';
      } else if (val === '2020-22') {
        node.nodeValue = 'Successful Delivery';
      }

      // Update phone/contact details in header or footer
      if (val.includes('apriyanshu540@gmail.com')) {
        node.nodeValue = val.replace(/apriyanshu540@gmail.com/g, 'globallogicmedia06@gmail.com');
      }
      if (val.includes('hello@globallogicmedia.com')) {
        node.nodeValue = val.replace(/hello@globallogicmedia.com/g, 'globallogicmedia06@gmail.com');
      }
    }
  }

  // Run on load, DOMContentLoaded, mutation observer, and interval
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceAllMeily);
  } else {
    replaceAllMeily();
  }

  
  // Optimized: Run only during initial page load & early hydration, then disconnect
  let replaceCount = 0;
  const replaceTimer = setInterval(function() {
    replaceAllMeily();
    replaceCount++;
    if (replaceCount >= 4) {
      clearInterval(replaceTimer);
      if (observer) observer.disconnect();
    }
  }, 500);

  const observer = new MutationObserver(function(mutations) {
    if (replaceCount < 4) {
      replaceAllMeily();
    }
  });

  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Safety cleanup: Disconnect completely after 3 seconds
  setTimeout(function() {
    clearInterval(replaceTimer);
    if (observer) observer.disconnect();
  }, 3000);
})();
