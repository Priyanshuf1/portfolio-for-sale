const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetUrl = 'https://portfolio-for-sale.vercel.app/';
const outputPath = 'C:/Users/apriy/.gemini/antigravity/brain/426e9ab1-db42-4d1a-a9e2-8652eb6e053a/screenshot_live.png';

async function run() {
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--window-size=1440,900',
    '--no-sandbox'
  ]);

  console.log('Started headless Chrome...');
  await new Promise(r => setTimeout(r, 2000));

  http.get('http://127.0.0.1:9222/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', async () => {
      const tabs = JSON.parse(data);
      const wsUrl = tabs[0].webSocketDebuggerUrl;
      console.log('WS URL:', wsUrl);

      const ws = new WebSocket(wsUrl);
      let id = 1;
      const callbacks = new Map();

      ws.addEventListener('message', (event) => {
        const res = JSON.parse(event.data);
        if (res.id && callbacks.has(res.id)) {
          callbacks.get(res.id)(res.result);
          callbacks.delete(res.id);
        }
      });

      const send = (method, params = {}) => new Promise((resolve) => {
        const reqId = id++;
        callbacks.set(reqId, resolve);
        ws.send(JSON.stringify({ id: reqId, method, params }));
      });

      ws.addEventListener('open', async () => {
        console.log('Navigating to', targetUrl);
        await send('Page.enable');
        await send('Page.navigate', { url: targetUrl });
        await new Promise(r => setTimeout(r, 4500));

        // Scroll to About section and trigger mouse move
        console.log('Scrolling to About section...');
        await send('Runtime.evaluate', {
          expression: `
            const about = document.querySelector('[data-framer-name="about me section"]');
            if (about) {
              about.scrollIntoView({ behavior: 'instant', block: 'center' });
            } else {
              window.scrollTo(0, 1100);
            }
          `
        });
        await new Promise(r => setTimeout(r, 3000));

        console.log('Capturing screenshot...');
        const { data: base64Data } = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(outputPath, Buffer.from(base64Data, 'base64'));
        console.log('Saved screenshot to:', outputPath);

        ws.close();
        chrome.kill();
        process.exit(0);
      });
    });
  }).on('error', (e) => {
    console.error('HTTP error:', e);
    chrome.kill();
  });
}

run();
