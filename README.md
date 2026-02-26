# coin-library

A package of cryptocurrency and token icons you can use in apps and sites. Icons are named by coin name (e.g. `bitcoin.png`, `ethereum.png`) and exposed via a small API.

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
const { getPath, getFile, list, count } = require('coin-library');

// Absolute path to the icon file (for server or file system)
const path = getPath('bitcoin');       // e.g. ".../node_modules/coin-library/bitcoin.png"
const ethPath = getPath('ethereum');

// Just the filename (for <img src="..." /> with your own base URL)
const file = getFile('bitcoin');       // "bitcoin.png"

// List all coins
const coins = list();                 // [{ name, file, slug }, ...]
console.log(count());                 // 665
```

### ESM

```js
import { getPath, getFile, list, count } from 'coin-library';

const path = getPath('1inch');
const file = getFile('ethereum');
const all = list();
```

### TypeScript

Types are included. Import as above; `list()` returns `CoinEntry[]` with `name`, `file`, and `slug`.

### In the browser

If you bundle the app (Vite, Webpack, etc.), use `getPath()` or `getFile()` and point your asset pipeline at the returned path so the PNG is copied or referenced. For a simple setup, use `getFile('bitcoin')` and serve the `node_modules/coin-library/*.png` files from your static server at a route like `/icons/`, then use `<img src="/icons/bitcoin.png" />`.

### Name matching

Names are matched **case-insensitive** and by **slug** (spaces become hyphens). Examples:

- `getPath('bitcoin')` → `bitcoin.png`
- `getPath('Bitcoin')` → same
- `getPath('binance coin')` → `binance coin.png` (file has a space)

## API

| Method      | Returns           | Description                          |
|------------|-------------------|--------------------------------------|
| `getPath(name)` | `string \| null` | Absolute filesystem path to the PNG  |
| `getFile(name)` | `string \| null` | Filename only (e.g. `"bitcoin.png"`) |
| `list()`        | `CoinEntry[]`    | All coins (name, file, slug)         |
| `count()`       | `number`         | Number of icons                      |

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
