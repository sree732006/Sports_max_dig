/**
 * JSON Web Token (JWT) Standard Implementation (RFC 7519)
 * 
 * Implements standard JWT encoding, signing, and verification using HMAC-SHA256 (HS256).
 * Designed for full universal compatibility (Browser Web Crypto API & Node.js runtime).
 * 
 * Token Structure:
 *   <base64url(Header)>.<base64url(Payload)>.<base64url(HMAC-SHA256-Signature)>
 */

export interface JwtHeader {
  alg: "HS256";
  typ: "JWT";
}

export interface JwtPayload {
  sub: string;            // Subject (User ID)
  email: string;          // User Email
  name?: string;           // Display Name
  role?: string;          // Role (Coach, Athlete, Director, Admin, etc.)
  organization?: string;  // Academy / School / Club
  jti: string;            // JWT Unique ID (Session ID)
  iat: number;            // Issued At (Unix timestamp seconds)
  exp: number;            // Expiration Time (Unix timestamp seconds)
  iss?: string;           // Issuer ("sportsvectors-auth-service")
  aud?: string;           // Audience ("sportsvectors-api")
  device?: string;        // Client Device Info
  [key: string]: any;
}

export interface JwtVerificationResult {
  valid: boolean;
  payload?: JwtPayload;
  error?: string;
}

// Server & Fallback Secret
export const JWT_SECRET =
  (typeof process !== "undefined" && process.env?.["JWT_SECRET"]) ||
  "sportsvectors_enterprise_jwt_secret_hmac_sha256_key_2026";

/**
 * Base64URL string helpers (RFC 7515)
 */
export function base64UrlEncode(str: string): string {
  // Support both Browser (btoa) and Node.js Buffer
  if (typeof btoa !== "undefined") {
    const encoded = btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );
    return encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  return Buffer.from(str, "utf-8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  if (typeof atob !== "undefined") {
    const decoded = atob(base64);
    try {
      return decodeURIComponent(
        decoded
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
    } catch {
      return decoded;
    }
  }
  return Buffer.from(base64, "base64").toString("utf-8");
}

/**
 * HMAC-SHA256 signature generator compatible with Web Crypto API and Node.js crypto
 */
export async function hmacSha256(data: string, secret: string): Promise<string> {
  // 1. Try Node.js crypto if in server runtime
  if (typeof process !== "undefined" && process.versions?.node) {
    try {
      const crypto = await import("crypto");
      return crypto
        .createHmac("sha256", secret)
        .update(data)
        .digest("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    } catch {
      // Fall through to Web Crypto API
    }
  }

  // 2. Web Crypto API (Browser or Edge Runtime)
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const messageData = encoder.encode(data);

    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData);
    const bytes = new Uint8Array(signature);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  throw new Error("No cryptographic provider available for HMAC-SHA256");
}

/**
 * Sign a new JWT Token with Header, Payload, and HMAC-SHA256 signature
 */
export async function signJwt(
  payloadData: Omit<JwtPayload, "iat" | "exp" | "jti"> & {
    jti?: string;
    iat?: number;
    exp?: number;
  },
  expiresInSeconds: number = 8 * 3600, // 8 hours default
  secret: string = JWT_SECRET
): Promise<{ token: string; payload: JwtPayload }> {
  const header: JwtHeader = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const jti =
    payloadData.jti ||
    `jti_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`;

  const payload: JwtPayload = {
    ...payloadData,
    iss: "sportsvectors-auth-service",
    aud: "sportsvectors-api",
    jti,
    iat: payloadData.iat ?? now,
    exp: payloadData.exp ?? now + expiresInSeconds,
  };

  const headerEncoded = base64UrlEncode(JSON.stringify(header));
  const payloadEncoded = base64UrlEncode(JSON.stringify(payload));
  const signature = await hmacSha256(`${headerEncoded}.${payloadEncoded}`, secret);

  const token = `${headerEncoded}.${payloadEncoded}.${signature}`;
  return { token, payload };
}

/**
 * Verify and decode a JWT Token
 */
export async function verifyJwt(
  token: string,
  secret: string = JWT_SECRET
): Promise<JwtVerificationResult> {
  if (!token || typeof token !== "string") {
    return { valid: false, error: "Missing or invalid token string" };
  }

  const parts = token.trim().split(".");
  if (parts.length !== 3) {
    return { valid: false, error: "Malformed JWT token structure (expected 3 parts)" };
  }

  const [headerB64, payloadB64, signatureB64] = parts;

  // Verify Header
  try {
    const header: JwtHeader = JSON.parse(base64UrlDecode(headerB64));
    if (header.alg !== "HS256" || header.typ !== "JWT") {
      return { valid: false, error: "Unsupported JWT algorithm or token type" };
    }
  } catch {
    return { valid: false, error: "Failed to parse JWT header" };
  }

  // Verify HMAC-SHA256 Signature
  const expectedSignature = await hmacSha256(`${headerB64}.${payloadB64}`, secret);
  if (signatureB64 !== expectedSignature) {
    return { valid: false, error: "Invalid JWT signature: token was tampered with" };
  }

  // Parse and Validate Payload
  let payload: JwtPayload;
  try {
    payload = JSON.parse(base64UrlDecode(payloadB64));
  } catch {
    return { valid: false, error: "Failed to parse JWT payload JSON" };
  }

  // Expiration Check
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && now > payload.exp) {
    return { valid: false, error: "JWT token has expired" };
  }

  return { valid: true, payload };
}

