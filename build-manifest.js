const fs = require('fs');
const path = require('path');

const root = __dirname;

// Coins: PNGs in package root
const coinFiles = fs.readdirSync(root)
  .filter((f) => f.endsWith('.png'))
  .map((f) => {
    const name = f.slice(0, -4);
    return { name, file: f, slug: name.toLowerCase().replace(/\s+/g, '-') };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(
  path.join(root, 'manifest.json'),
  JSON.stringify({ coins: coinFiles, count: coinFiles.length }, null, 2),
  'utf8'
);
console.log(`Generated manifest with ${coinFiles.length} coins`);

// Banks: PNGs in banks/
const banksDir = path.join(root, 'banks');
let bankFiles = [];
if (fs.existsSync(banksDir)) {
  bankFiles = fs.readdirSync(banksDir)
    .filter((f) => f.endsWith('.png'))
    .map((f) => {
      const name = f.slice(0, -4);
      return { name, file: `banks/${f}`, slug: name.toLowerCase().replace(/\s+/g, '-') };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

fs.writeFileSync(
  path.join(root, 'banks-manifest.json'),
  JSON.stringify({ banks: bankFiles, count: bankFiles.length }, null, 2),
  'utf8'
);
console.log(`Generated banks-manifest with ${bankFiles.length} banks`);
