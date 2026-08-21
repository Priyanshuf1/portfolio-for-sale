const { chromium } = require('playwright');

(async () => {
  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

    console.log('Navigating to live deployment...');
    await page.goto('https://portfolio-for-sale.vercel.app/', { waitUntil: 'networkidle', timeout: 35000 });
    
    await page.waitForTimeout(2000);
    
    await page.evaluate(() => {
      const about = document.querySelector('[data-framer-name="about me section"]');
      if (about) {
        about.scrollIntoView({ behavior: 'instant', block: 'center' });
      } else {
        window.scrollTo(0, 1100);
      }
    });
    
    await page.waitForTimeout(3000);
    
    const screenshotPath = 'C:/Users/apriy/.gemini/antigravity/brain/426e9ab1-db42-4d1a-a9e2-8652eb6e053a/3d_logo_verification.png';
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log('Screenshot saved to:', screenshotPath);
    
    const canvasInfo = await page.evaluate(() => {
      const canvas = document.getElementById('glb-3d-logo-canvas');
      if (!canvas) return { found: false };
      const rect = canvas.getBoundingClientRect();
      return {
        found: true,
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left
      };
    });
    console.log('Canvas info:', JSON.stringify(canvasInfo));
    
    await browser.close();
  } catch (err) {
    console.error('Test error:', err);
  }
})();
