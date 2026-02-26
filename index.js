'use strict';

const path = require('path');
const fs = require('fs');

const root = __dirname;
const manifestPath = path.join(root, 'manifest.json');
const banksManifestPath = path.join(root, 'banks-manifest.json');
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

// ---- Coins ----

/**
 * Get the absolute path to a coin icon by name (e.g. "bitcoin", "ethereum").
 * @param {string} name - Coin name (case-insensitive, matches filename without .png)
 * @returns {string|null} Absolute path to the PNG file, or null if not found
 */
function getPath(name) {
  if (!name || typeof name !== 'string') return null;
  const normalized = name.trim().toLowerCase();
  const match = findEntry(loadManifest().coins, normalized);
  if (!match) return null;
  return path.join(root, match.file);
}

/**
 * Get the public URL or path for use in img src (relative to package root).
 * @param {string} name - Coin name
 * @returns {string|null} Relative path like "bitcoin.png", or null
 */
function getFile(name) {
  if (!name || typeof name !== 'string') return null;
  const normalized = name.trim().toLowerCase();
  const match = findEntry(loadManifest().coins, normalized);
  return match ? match.file : null;
}

/**
 * List all available coin names/slugs.
 * @returns {{ name: string, file: string, slug: string }[]}
 */
function list() {
  return loadManifest().coins;
}

/**
 * Total number of coin icons.
 */
function count() {
  return loadManifest().count;
}

// ---- Banks ----

/**
 * Get the absolute path to a bank icon by name (e.g. "chase", "bank-of-america").
 * @param {string} name - Bank name (case-insensitive)
 * @returns {string|null} Absolute path to the PNG file, or null if not found
 */
function getBankPath(name) {
  if (!name || typeof name !== 'string') return null;
  const normalized = name.trim().toLowerCase();
  const match = findEntry(loadBanksManifest().banks, normalized);
  if (!match) return null;
  return path.join(root, match.file);
}

/**
 * Get the relative path/filename for a bank icon (e.g. "banks/chase.png").
 * @param {string} name - Bank name
 * @returns {string|null}
 */
function getBankFile(name) {
  if (!name || typeof name !== 'string') return null;
  const normalized = name.trim().toLowerCase();
  const match = findEntry(loadBanksManifest().banks, normalized);
  return match ? match.file : null;
}

/**
 * List all available bank entries.
 * @returns {{ name: string, file: string, slug: string }[]}
 */
function listBanks() {
  return loadBanksManifest().banks;
}

/**
 * Total number of bank icons.
 */
function countBanks() {
  return loadBanksManifest().count;
}

module.exports = {
  getPath,
  getFile,
  list,
  count,
  getBankPath,
  getBankFile,
  listBanks,
  countBanks,
};
