const fs = require('fs');
const path = require('path');

const root = __dirname;

// Coins: PNGs in icons/
const iconsDir = path.join(root, 'icons');
const coinFiles = (fs.existsSync(iconsDir) ? fs.readdirSync(iconsDir) : [])
  .filter((f) => f.endsWith('.png'))
  .map((f) => {
    const name = f.slice(0, -4);
    return { name, file: `icons/${f}`, slug: name.toLowerCase().replace(/\s+/g, '-') };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(
  path.join(root, 'manifest.json'),
  JSON.stringify({ coins: coinFiles, count: coinFiles.length }, null, 2),
  'utf8'
);
console.log(`Generated manifest with ${coinFiles.length} coins`);

// Banks: PNGs in banks/ (and subdirs), slug-style filenames (e.g. amar-bank.png)
const banksDir = path.join(root, 'banks');
let bankFiles = [];
if (fs.existsSync(banksDir)) {
  function walkBanks(dir, subPath) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const list = [];
    for (const e of entries) {
      const full = path.join(dir, e.name);
      const rel = subPath ? `${subPath}/${e.name}` : e.name;
      if (e.isDirectory()) {
        list.push(...walkBanks(full, rel));
      } else if (e.isFile() && e.name.toLowerCase().endsWith('.png')) {
        const name = e.name.slice(0, -4);
        list.push({ name, file: `banks/${rel}`, slug: name.toLowerCase().replace(/\s+/g, '-') });
      }
    }
    return list;
  }
  bankFiles = walkBanks(banksDir, '').sort((a, b) => a.name.localeCompare(b.name));
}

fs.writeFileSync(
  path.join(root, 'banks-manifest.json'),
  JSON.stringify({ banks: bankFiles, count: bankFiles.length }, null, 2),
  'utf8'
);
console.log(`Generated banks-manifest with ${bankFiles.length} banks`);
