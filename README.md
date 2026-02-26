# coin-library

A package of cryptocurrency and token icons plus bank icons you can use in apps and sites. Coins are exposed by name (e.g. `bitcoin`, `ethereum`); banks use slug-style names (e.g. `amar-bank`, `bca`). Both use a small, consistent API.

## Installation

**Use locally (no publish):**

```bash
# From your project
npm install C:\Projects\coin-library
# or
npm install /path/to/coin-library
```

**After publishing to npm:**

```bash
npm install coin-library
```

## Usage

### Node / bundlers (CommonJS)

```js
const { getPath, getFile, list, count, getBankPath, getBankFile, listBanks, countBanks } = require('coin-library');

// ---- Coins ----
const path = getPath('bitcoin');       // absolute path to coin icon
const file = getFile('ethereum');      // "ethereum.png"
const coins = list();                 // [{ name, file, slug }, ...]
console.log(count());                 // 659

// ---- Banks ----
const bankPath = getBankPath('amar-bank');   // absolute path to bank icon
const bankFile = getBankFile('bca');          // e.g. "banks/private-banks/bca.png"
const banks = listBanks();                    // [{ name, file, slug }, ...]
console.log(countBanks());                    // 157
```

### ESM

```js
import { getPath, getFile, list, count, getBankPath, getBankFile, listBanks, countBanks } from 'coin-library';

const path = getPath('1inch');
const file = getFile('ethereum');
const all = list();

const bankPath = getBankPath('amar-bank');
const bankFile = getBankFile('bca');
const allBanks = listBanks();
```

### TypeScript

Types are included. Import as above; `list()` returns `CoinEntry[]`, and `listBanks()` returns `BankEntry[]` (same shape: `name`, `file`, `slug`).

### In the browser

If you bundle the app (Vite, Webpack, etc.), use `getPath()` or `getFile()` and point your asset pipeline at the returned path so the PNG is copied or referenced. For a simple setup, use `getFile('bitcoin')` and serve the `node_modules/coin-library/*.png` files from your static server at a route like `/icons/`, then use `<img src="/icons/bitcoin.png" />`.

### Name matching

**Coins:** matched **case-insensitive** and by **slug** (spaces become hyphens). Examples:

- `getPath('bitcoin')` → `bitcoin.png`
- `getPath('Bitcoin')` → same
- `getPath('binance coin')` → `binance coin.png` (file has a space)

**Banks:** use slug-style names (lowercase, hyphens). Examples:

- `getBankPath('amar-bank')` → path to that bank’s PNG
- `getBankPath('BCA')` → same (case-insensitive)
- `getBankFile('bca-digital')` → `"banks/private-banks/bca-digital.png"`

## API

### Coins

| Method           | Returns           | Description                              |
|------------------|-------------------|------------------------------------------|
| `getPath(name)`  | `string \| null`  | Absolute filesystem path to the coin PNG |
| `getFile(name)`  | `string \| null`  | Relative path (e.g. `"icons/bitcoin.png"`) |
| `list()`         | `CoinEntry[]`     | All coins (name, file, slug)             |
| `count()`        | `number`          | Number of coin icons                     |

### Banks

| Method                | Returns           | Description                              |
|-----------------------|-------------------|------------------------------------------|
| `getBankPath(name)`   | `string \| null`  | Absolute filesystem path to the bank PNG |
| `getBankFile(name)`   | `string \| null`  | Relative path (e.g. `"banks/.../amar-bank.png"`) |
| `listBanks()`         | `BankEntry[]`     | All banks (name, file, slug)            |
| `countBanks()`        | `number`          | Number of bank icons                     |

## Rebuilding the manifest

If you add or remove PNG files in the package, regenerate the manifest:

```bash
cd node_modules/coin-library   # or your package path
npm run build:manifest
```

Or from the package source:

```bash
cd /path/to/coin-library
node build-manifest.js
```

## License

MIT
