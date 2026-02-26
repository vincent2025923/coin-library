export interface CoinEntry {
  name: string;
  file: string;
  slug: string;
}

/**
 * Get the absolute path to a coin icon by name.
 * @param name - Coin name (e.g. "bitcoin", "ethereum") — case-insensitive
 * @returns Absolute path to the PNG file, or null if not found
 */
export function getPath(name: string): string | null;

/**
 * Get the filename for the coin icon (e.g. "bitcoin.png").
 * @param name - Coin name
 * @returns Filename or null
 */
export function getFile(name: string): string | null;

/**
 * List all available coin entries.
 */
export function list(): CoinEntry[];

/**
 * Total number of coin icons.
 */
export function count(): number;

/** Same shape as CoinEntry; used for bank entries. */
export type BankEntry = CoinEntry;

/**
 * Get the absolute path to a bank icon by name (e.g. "amar-bank", "bca").
 * @param name - Bank name (case-insensitive, slug or name)
 * @returns Absolute path to the PNG file, or null if not found
 */
export function getBankPath(name: string): string | null;

/**
 * Get the relative path/filename for a bank icon.
 * @param name - Bank name
 * @returns Path like "banks/private-banks/amar-bank.png", or null
 */
export function getBankFile(name: string): string | null;

/**
 * List all available bank entries.
 */
export function listBanks(): BankEntry[];

/**
 * Total number of bank icons.
 */
export function countBanks(): number;
