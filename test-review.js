const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  
  await page.goto('https://portfolio-for-sale.vercel.app', { waitUntil: 'networkidle2' });
  
  console.log("Clicking leave a review...");
  await page.click('#glb-review-trigger');
  
  await page.waitForSelector('#glb-review-form');
  
  await page.type('#glb-review-form input[type="text"]', 'Test User');
  await page.type('#glb-review-form textarea', 'This is a test review.');
  
  console.log("Submitting form...");
  await page.click('#glb-review-form button[type="submit"]');
  
  await new Promise(r => setTimeout(r, 3000));
  
  await browser.close();
})();
