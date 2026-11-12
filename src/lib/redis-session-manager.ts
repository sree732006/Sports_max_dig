import { getRedisClient, closeRedisClient } from "./redis";
import { signJwt, verifyJwt, type JwtPayload } from "./jwt-token";

export interface RedisSessionData {
  sessionId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userRole: string;
  device: string;
  browser: string;
  ipAddress: string;
  location: string;
  createdAt: string;
  lastActiveAt: string;
  ttlSeconds?: number;
  jwtToken?: string;
  jti?: string;
}

const REDIS_SESSION_PREFIX = "sportsvectors:session:";
const REDIS_TOKEN_PREFIX = "sportsvectors:token:";
const REDIS_VISITOR_SESSIONS_KEY = "sportsvectors:visitor-sessions";
const DEFAULT_SESSION_TTL_SECONDS = 8 * 3600; // 8 hours

// In-memory fallback cache when Redis server has no password configured or is offline
const inMemoryFallbackSessions = new Map<string, RedisSessionData>([
  [
    "ses_sm_admin_84920a",
    {
      sessionId: "ses_sm_admin_84920a",
      userId: "user_sm_001",
      userName: "Marcus Vance",
      userEmail: "marcus.vance@sportsvectors-academy.org",
      userRole: "Head Coach",
      device: "MacBook Pro M3",
      browser: "Chrome 124.0",
      ipAddress: "192.168.1.102",
      location: "London, UK",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      lastActiveAt: new Date().toISOString(),
      ttlSeconds: 25200,
    },
  ],
  [
    "ses_sm_analyst_38b1f7",
    {
      sessionId: "ses_sm_analyst_38b1f7",
      userId: "user_sm_003",
      userName: "David Chen",
      userEmail: "david.chen@sportsvectors-academy.org",
      userRole: "Performance Analyst",
      device: "Dell XPS 15",
      browser: "Firefox 125.0",
      ipAddress: "192.168.1.103",
      location: "Toronto, Canada",
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      lastActiveAt: new Date().toISOString(),
      ttlSeconds: 21600,
    },
  ],
]);

/**
 * Stores or updates a session in Redis DB with key pattern `sportsvectors:session:<sessionId>`.
 * Also mirrors to `sportsvectors:token:<jti>` if jwtToken or jti is provided.
 */
export async function setRedisSession(
  session: RedisSessionData,
  ttlSeconds: number = DEFAULT_SESSION_TTL_SECONDS
): Promise<{ success: boolean; mode: "redis" | "memory"; error?: string }> {
  try {
    const client = await getRedisClient();
    const sessionKey = `${REDIS_SESSION_PREFIX}${session.sessionId}`;
    
    // Store as JSON string in Redis
    await client.set(sessionKey, JSON.stringify(session, null, 2), {
      EX: ttlSeconds,
    });

    // Also store by JWT JTI if present
    const jtiKey = session.jti || (session.sessionId.startsWith("jti_") ? session.sessionId : null);
    if (jtiKey) {
      await client.set(`${REDIS_TOKEN_PREFIX}${jtiKey}`, JSON.stringify(session, null, 2), {
        EX: ttlSeconds,
      });
    }

    // Also track in sorted set for chronological index
    await client.zAdd(REDIS_VISITOR_SESSIONS_KEY, {
      score: Date.now(),
      value: session.sessionId,
    });

    return { success: true, mode: "redis" };
  } catch (err: any) {
    console.warn("[Redis Session Store] Falling back to in-memory store:", err?.message || err);
    session.ttlSeconds = ttlSeconds;
    inMemoryFallbackSessions.set(session.sessionId, session);
    if (session.jti) {
      inMemoryFallbackSessions.set(session.jti, session);
    }
    return { success: true, mode: "memory", error: err?.message };
  }
}

/**
 * Creates and stores a fresh JWT Token and Session in Redis DB.
 */
export async function createJwtSessionInRedis(
  userData: {
    userId: string;
    userName: string;
    userEmail: string;
    userRole: string;
    organization?: string;
    device?: string;
    browser?: string;
    ipAddress?: string;
    location?: string;
  },
  ttlSeconds: number = DEFAULT_SESSION_TTL_SECONDS
): Promise<{
  token: string;
  payload: JwtPayload;
  session: RedisSessionData;
  mode: "redis" | "memory";
}> {
  // 1. Sign JWT Token with HMAC-SHA256
  const { token, payload } = await signJwt(
    {
      sub: userData.userId,
      email: userData.userEmail,
      name: userData.userName,
      role: userData.userRole,
      organization: userData.organization,
      device: userData.device || "Browser Client",
    },
    ttlSeconds
  );

  // 2. Assemble Session Record
  const now = new Date().toISOString();
  const session: RedisSessionData = {
    sessionId: payload.jti,
    jti: payload.jti,
    userId: userData.userId,
    userName: userData.userName,
    userEmail: userData.userEmail,
    userRole: userData.userRole,
    device: userData.device || "Chrome / Web App",
    browser: userData.browser || "V8 Engine",
    ipAddress: userData.ipAddress || "127.0.0.1",
    location: userData.location || "Global Access",
    createdAt: now,
    lastActiveAt: now,
    ttlSeconds,
    jwtToken: token,
  };

  // 3. Store in Redis
  const storeResult = await setRedisSession(session, ttlSeconds);

  return {
    token,
    payload,
    session,
    mode: storeResult.mode,
  };
}

/**
 * Validates a JWT Token against Redis DB.
 * Checks both cryptographic signature and active status in Redis.
 */
export async function verifyJwtSessionInRedis(
  token: string
): Promise<{
  valid: boolean;
  payload?: JwtPayload;
  session?: RedisSessionData;
  error?: string;
}> {
  const jwtResult = await verifyJwt(token);
  if (!jwtResult.valid || !jwtResult.payload) {
    return { valid: false, error: jwtResult.error || "Invalid JWT Signature" };
  }

  const jti = jwtResult.payload.jti;
  const session = await getRedisSession(jti);
  if (!session) {
    return {
      valid: false,
      error: "Session has been revoked or expired in Redis database",
    };
  }

  return {
    valid: true,
    payload: jwtResult.payload,
    session,
  };
}

/**
 * Retrieves a session from Redis by sessionId.
 */
export async function getRedisSession(sessionId: string): Promise<RedisSessionData | null> {
  try {
    const client = await getRedisClient();
    const key = `${REDIS_SESSION_PREFIX}${sessionId}`;
    const raw = await client.get(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return inMemoryFallbackSessions.get(sessionId) || null;
  }
}

/**
 * Deletes / Revokes a session from Redis DB.
 */
export async function revokeRedisSession(sessionId: string): Promise<boolean> {
  let deletedFromRedis = false;
  try {
    const client = await getRedisClient();
    const sessionKey = `${REDIS_SESSION_PREFIX}${sessionId}`;
    const tokenKey = `${REDIS_TOKEN_PREFIX}${sessionId}`;
    const res1 = await client.del(sessionKey);
    const res2 = await client.del(tokenKey);
    await client.zRem(REDIS_VISITOR_SESSIONS_KEY, sessionId);
    deletedFromRedis = res1 > 0 || res2 > 0;
  } catch {
    // Ignore error, delete from memory
  }

  const deletedFromMemory = inMemoryFallbackSessions.delete(sessionId);
  return deletedFromRedis || deletedFromMemory;
}

/**
 * Lists all active sessions in Redis DB.
 */
export async function listActiveRedisSessions(): Promise<{
  sessions: RedisSessionData[];
  mode: "redis" | "memory";
  total: number;
}> {
  try {
    const client = await getRedisClient();
    // Scan for all keys matching sportsvectors:session:*
    const keys = await client.keys(`${REDIS_SESSION_PREFIX}*`);
    const sessions: RedisSessionData[] = [];

    for (const key of keys) {
      const raw = await client.get(key);
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as RedisSessionData;
          const ttl = await client.ttl(key);
          parsed.ttlSeconds = ttl > 0 ? ttl : undefined;
          sessions.push(parsed);
        } catch {
          // ignore corrupted keys
        }
      }
    }

    // Sort by latest active first
    sessions.sort((a, b) => new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime());

    return {
      sessions,
      mode: "redis",
      total: sessions.length,
    };
  } catch (err) {
    const fallbackList = Array.from(inMemoryFallbackSessions.values());
    fallbackList.sort((a, b) => new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime());
    return {
      sessions: fallbackList,
      mode: "memory",
      total: fallbackList.length,
    };
  }
}

