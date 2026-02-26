import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const manifestPath = path.join(__dirname, 'manifest.json');
let manifest = null;

function loadManifest() {
  if (manifest) return manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    return manifest;
  } catch (e) {
    return { coins: [], count: 0 };
  }
}

/**
 * Get the absolute path to a coin icon by name (e.g. "bitcoin", "ethereum").
 * @param {string} name - Coin name (case-insensitive)
 * @returns {string|null} Absolute path to the PNG file, or null if not found
 */
export function getPath(name) {
  if (!name || typeof name !== 'string') return null;
  const normalized = name.trim().toLowerCase();
  const coins = loadManifest().coins;
  const match = coins.find(
    (c) => c.slug === normalized || c.name.toLowerCase() === normalized
  );
  if (!match) return null;
  return path.join(__dirname, match.file);
}

/**
 * Get the filename for use in img src (e.g. "bitcoin.png").
 * @param {string} name - Coin name
 * @returns {string|null}
 */
export function getFile(name) {
  if (!name || typeof name !== 'string') return null;
  const normalized = name.trim().toLowerCase();
  const coins = loadManifest().coins;
  const match = coins.find(
    (c) => c.slug === normalized || c.name.toLowerCase() === normalized
  );
  return match ? match.file : null;
}

/**
 * List all available coins.
 * @returns {{ name: string, file: string, slug: string }[]}
 */
export function list() {
  return loadManifest().coins;
}

/**
 * Total number of coin icons.
 */
export function count() {
  return loadManifest().count;
}
