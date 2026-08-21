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
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        console.log('BROWSER LOG:', msg.params.type, msg.params.args.map(a => a.value || a.description || JSON.stringify(a)).join(' '));
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        console.log('BROWSER EXCEPTION:', JSON.stringify(msg.params.exceptionDetails));
      }
      if (msg.id === 10) {
        console.log('Exec result:\n', msg.result.result.value);
      }
    };
    ws.onopen = async () => {
      ws.send(JSON.stringify({ id: 1, method: 'Console.enable' }));
      ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
      
      setTimeout(() => {
        const code = fs.readFileSync('three-logo-interactive.js', 'utf8');
        ws.send(JSON.stringify({
          id: 10,
          method: 'Runtime.evaluate',
          params: {
            expression: `
              (() => {
                try {
                  ${code}
                  return 'Executed without error!';
                } catch(e) {
                  return 'Error: ' + e.stack;
                }
              })()
            `
          }
        }));

        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 11,
            method: 'Runtime.evaluate',
            params: {
              expression: `
                (() => {
                  const canvas = document.getElementById('glb-3d-logo-canvas');
                  return 'Canvas status: ' + (canvas ? canvas.clientWidth + 'x' + canvas.clientHeight : 'null');
                })()
              `
            }
          }));
          
          setTimeout(() => {
            chrome.kill();
            process.exit(0);
          }, 2000);
        }, 3000);
      }, 3000);
    };
  } catch(e) {
    console.error('Error:', e);
    chrome.kill();
    process.exit(1);
  }
}, 2000);
