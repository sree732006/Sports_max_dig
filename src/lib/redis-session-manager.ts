import { getRedisClient, closeRedisClient } from "./redis";

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
}

const REDIS_SESSION_PREFIX = "sportsmax:session:";
const REDIS_VISITOR_SESSIONS_KEY = "sportsmax:visitor-sessions";
const DEFAULT_SESSION_TTL_SECONDS = 8 * 3600; // 8 hours

// In-memory fallback cache when Redis server has no password configured or is offline
const inMemoryFallbackSessions = new Map<string, RedisSessionData>([
  [
    "ses_sm_admin_84920a",
    {
      sessionId: "ses_sm_admin_84920a",
      userId: "user_sm_001",
      userName: "Marcus Vance",
      userEmail: "marcus.vance@sportsmax-academy.org",
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
      userEmail: "david.chen@sportsmax-academy.org",
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
 * Stores or updates a session in Redis DB with key pattern `sportsmax:session:<sessionId>`.
 */
export async function setRedisSession(
  session: RedisSessionData,
  ttlSeconds: number = DEFAULT_SESSION_TTL_SECONDS
): Promise<{ success: boolean; mode: "redis" | "memory"; error?: string }> {
  try {
    const client = await getRedisClient();
    const key = `${REDIS_SESSION_PREFIX}${session.sessionId}`;
    
    // Store as JSON string in Redis
    await client.set(key, JSON.stringify(session, null, 2), {
      EX: ttlSeconds,
    });

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
    return { success: true, mode: "memory", error: err?.message };
  }
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
    const key = `${REDIS_SESSION_PREFIX}${sessionId}`;
    const res = await client.del(key);
    await client.zRem(REDIS_VISITOR_SESSIONS_KEY, sessionId);
    deletedFromRedis = res > 0;
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
    // Scan for all keys matching sportsmax:session:*
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
