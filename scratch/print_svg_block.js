const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const lines = html.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('viewBox="0 0 340 120"')) {
    console.log(`Line ${idx + 1}: ${line}`);
    // Print next 5 lines
    for (let i = 1; i <= 8; i++) {
      console.log(`Line ${idx + 1 + i}: ${lines[idx + i]}`);
    }
  }
});
