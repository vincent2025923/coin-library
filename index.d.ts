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
