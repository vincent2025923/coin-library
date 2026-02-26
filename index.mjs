import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const manifestPath = path.join(__dirname, 'manifest.json');
const banksManifestPath = path.join(__dirname, 'banks-manifest.json');
let manifest = null;
let banksManifest = null;

function loadManifest() {
  if (manifest) return manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    return manifest;
  } catch (e) {
    return { coins: [], count: 0 };
  }
}

function loadBanksManifest() {
  if (banksManifest) return banksManifest;
  try {
    banksManifest = JSON.parse(fs.readFileSync(banksManifestPath, 'utf8'));
    return banksManifest;
  } catch (e) {
    return { banks: [], count: 0 };
  }
}

function findEntry(list, normalized) {
  return list.find(
    (c) => c.slug === normalized || c.name.toLowerCase() === normalized
  );
}

/**
 * Get the absolute path to a coin icon by name (e.g. "bitcoin", "ethereum").
 * @param {string} name - Coin name (case-insensitive)
 * @returns {string|null} Absolute path to the PNG file, or null if not found
 */
export function getPath(name) {
  if (!name || typeof name !== 'string') return null;
  const normalized = name.trim().toLowerCase();
  const match = findEntry(loadManifest().coins, normalized);
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
  const match = findEntry(loadManifest().coins, normalized);
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

// ---- Banks ----

/**
 * Get the absolute path to a bank icon by name (e.g. "amar-bank", "bca").
 * @param {string} name - Bank name (case-insensitive, slug or name)
 * @returns {string|null} Absolute path to the PNG file, or null if not found
 */
export function getBankPath(name) {
  if (!name || typeof name !== 'string') return null;
  const normalized = name.trim().toLowerCase();
  const match = findEntry(loadBanksManifest().banks, normalized);
  if (!match) return null;
  return path.join(__dirname, match.file);
}

/**
 * Get the relative path/filename for a bank icon (e.g. "banks/private-banks/amar-bank.png").
 * @param {string} name - Bank name
 * @returns {string|null}
 */
export function getBankFile(name) {
  if (!name || typeof name !== 'string') return null;
  const normalized = name.trim().toLowerCase();
  const match = findEntry(loadBanksManifest().banks, normalized);
  return match ? match.file : null;
}

/**
 * List all available bank entries.
 * @returns {{ name: string, file: string, slug: string }[]}
 */
export function listBanks() {
  return loadBanksManifest().banks;
}

/**
 * Total number of bank icons.
 */
export function countBanks() {
  return loadBanksManifest().count;
}
