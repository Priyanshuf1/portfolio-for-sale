const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--user-data-dir=' + os.tmpdir() + '\\chrome-test-' + Date.now(),
  '--window-size=1440,900',
  '--no-sandbox',
  '--disable-gpu',
  'https://portfolio-for-sale.vercel.app/'
]);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://127.0.0.1:9222/json/list');
    const tabs = await listRes.json();
    const target = tabs.find(t => t.url.includes('portfolio-for-sale')) || tabs[0];

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    const urls = [];
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.method === 'Network.requestWillBeSent') {
        urls.push(msg.params.request.url);
      }
    };
    ws.onopen = async () => {
      ws.send(JSON.stringify({ id: 1, method: 'Network.enable' }));
      
      setTimeout(() => {
        console.log('ALL NETWORK REQUESTS:\n', urls.join('\n'));
        chrome.kill();
        process.exit(0);
      }, 7000);
    };
  } catch(e) {
    console.error('Error:', e);
    chrome.kill();
    process.exit(1);
  }
}, 2000);
