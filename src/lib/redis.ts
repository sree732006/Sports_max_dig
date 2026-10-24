import { createClient, type RedisClientType } from "redis";
import dotenv from "dotenv";

// Load local environment variables if available
dotenv.config();
dotenv.config({ path: ".env.local", override: false });

export interface RedisHealthCheckResult {
  status: "connected" | "error";
  ping?: string;
  host: string;
  port: number;
  tls: boolean;
  timestamp: string;
  error?: string;
}

let redisClient: RedisClientType | null = null;
let isConnecting = false;

/**
 * Resolves Redis connection options from server-side environment variables.
 * Credentials are kept strictly on the server and never exposed to the client.
 */
export function getRedisConfig() {
  const host = process.env["REDIS_HOST"] || "size-comfortable-excellent-59896.db.redis.io";
  const port = parseInt(process.env["REDIS_PORT"] || "19940", 10);
  const username = process.env["REDIS_USERNAME"] || "default";
  const password = process.env["REDIS_PASSWORD"] || "";
  const tls = process.env["REDIS_TLS"] === "true";

  return {
    host,
    port,
    username,
    password,
    tls,
  };
}

/**
 * Returns a singleton instance of the official Redis client.
 * Handles automatic reconnects and connection error logging.
 */
export async function getRedisClient(): Promise<RedisClientType> {
  if (redisClient && redisClient.isOpen) {
    return redisClient;
  }

  if (redisClient && isConnecting) {
    // Wait briefly if connection is already in progress
    await new Promise((resolve) => setTimeout(resolve, 150));
    if (redisClient.isOpen) return redisClient;
  }

  const config = getRedisConfig();

  if (!config.password) {
    console.warn(
      "[Redis] Warning: REDIS_PASSWORD is not set in environment variables. Connection may fail if authentication is enabled."
    );
  }

  const socketOptions = {
    host: config.host,
    port: config.port,
    connectTimeout: 10000,
    reconnectStrategy: (retries: number) => {
      if (retries > 3) {
        return new Error("Redis reconnection limit reached");
      }
      return Math.min(retries * 200, 1000);
    },
    ...(config.tls ? { tls: true as const } : {}),
  };

  // Construct official redis connection options
  const client: RedisClientType = createClient({
    username: config.username,
    password: config.password,
    socket: socketOptions,
  });

  client.on("error", (err) => {
    console.error("[Redis Client Error]:", err?.message || err);
  });

  client.on("connect", () => {
    console.log(`[Redis] Connected to ${config.host}:${config.port}`);
  });

  client.on("reconnecting", () => {
    console.warn("[Redis] Attempting reconnection...");
  });

  try {
    isConnecting = true;
    await client.connect();
    redisClient = client;
    return redisClient;
  } catch (error) {
    console.error("[Redis] Failed to connect to Redis instance:", error instanceof Error ? error.message : error);
    throw error;
  } finally {
    isConnecting = false;
  }
}

/**
 * Health check helper executing a standard PING against Redis.
 * Safely sanitizes response so credentials are never returned.
 */
export async function checkRedisHealth(): Promise<RedisHealthCheckResult> {
  const config = getRedisConfig();
  const timestamp = new Date().toISOString();

  try {
    const client = await getRedisClient();
    const pingResponse = await client.ping();

    return {
      status: "connected",
      ping: pingResponse,
      host: config.host,
      port: config.port,
      tls: config.tls,
      timestamp,
    };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown Redis connection error";
    return {
      status: "error",
      host: config.host,
      port: config.port,
      tls: config.tls,
      timestamp,
      error: errorMessage,
    };
  }
}

/**
 * Disconnects the Redis client if active (useful for scripts and process exit).
 */
export async function closeRedisClient(): Promise<void> {
  if (redisClient && redisClient.isOpen) {
    await redisClient.quit();
    redisClient = null;
  }
}
