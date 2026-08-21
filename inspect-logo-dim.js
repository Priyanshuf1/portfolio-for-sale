const fs = require('fs');

// We can read PNG header to get width and height!
// PNG starts with 8-byte signature: 137 80 78 71 13 10 26 10
// Then comes IHDR chunk which starts with length (4 bytes), type (4 bytes: "IHDR"), width (4 bytes), height (4 bytes)
const buffer = fs.readFileSync('logo.png');

if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
  const width = buffer.readInt32BE(16);
  const height = buffer.readInt32BE(20);
  console.log(`PNG logo.png: width=${width}, height=${height}, aspect=${width/height}`);
} else {
  console.log('Not a valid PNG file!');
}
