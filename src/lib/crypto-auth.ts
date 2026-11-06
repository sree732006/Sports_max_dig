/**
 * Cryptographic utility for password hashing & verification
 * Uses Web Crypto API (SubtleCrypto SHA-256 with salt) compatible with browser and edge runtime
 */

export async function hashPassword(password: string, existingSalt?: string): Promise<{ hash: string; salt: string }> {
  const encoder = new TextEncoder();
  const salt = existingSalt || Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const data = encoder.encode(password + ":" + salt);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  return { hash: hashHex, salt };
}

export async function verifyPassword(password: string, storedHash: string, salt: string): Promise<boolean> {
  const { hash } = await hashPassword(password, salt);
  return hash === storedHash;
}

