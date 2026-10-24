import { getRedisClient, closeRedisClient } from "../src/lib/redis";
import crypto from "crypto";

export interface SessionData {
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
}

const SAMPLE_SESSIONS: Array<{
  userId: string;
  userName: string;
  userEmail: string;
  userRole: string;
  device: string;
  browser: string;
  ip: string;
  city: string;
}> = [
  {
    userId: "user_sm_001",
    userName: "Marcus Vance",
    userEmail: "marcus.vance@sportsmax-academy.org",
    role: "Athlete",
    device: "iPhone 15 Pro",
    browser: "Mobile Safari 17.4",
    ip: "192.168.1.101",
    city: "New York, USA",
  },
  {
    userId: "user_sm_002",
    userName: "Elena Rostova",
    userEmail: "elena.rostova@sportsmax-academy.org",
    role: "Coach",
    device: "MacBook Pro M3",
    browser: "Chrome 124.0",
    ip: "192.168.1.102",
    city: "London, UK",
  },
  {
    userId: "user_sm_003",
    userName: "David Chen",
    userEmail: "david.chen@sportsmax-academy.org",
    role: "Performance Analyst",
    device: "Dell XPS 15",
    browser: "Firefox 125.0",
    ip: "192.168.1.103",
    city: "Toronto, Canada",
  },
  {
    userId: "user_sm_004",
    userName: "Amina Diallo",
    userEmail: "amina.diallo@sportsmax-academy.org",
    role: "Athlete",
    device: "iPad Pro 12.9",
    browser: "Mobile Safari 17.3",
    ip: "192.168.1.104",
    city: "Paris, France",
  },
  {
    userId: "user_sm_005",
    userName: "Dr. Liam Gallagher",
    userEmail: "liam.gallagher@sportsmax-academy.org",
    role: "Medical Staff",
    device: "ThinkPad X1 Carbon",
    browser: "Edge 123.0",
    ip: "192.168.1.105",
    city: "Dublin, Ireland",
  },
  {
    userId: "user_sm_006",
    userName: "Sophia Martinez",
    userEmail: "sophia.martinez@sportsmax-academy.org",
    role: "Sports Director",
    device: "MacBook Air M2",
    browser: "Chrome 124.0",
    ip: "192.168.1.106",
    city: "Madrid, Spain",
  },
  {
    userId: "user_sm_007",
    userName: "Tariq Al-Mansoor",
    userEmail: "tariq.almansoor@sportsmax-academy.org",
    role: "Athlete",
    device: "Samsung Galaxy S24",
    browser: "Samsung Internet",
    ip: "192.168.1.107",
    city: "Dubai, UAE",
  },
  {
    userId: "user_sm_008",
    userName: "Chloe Dupont",
    userEmail: "chloe.dupont@sportsmax-academy.org",
    role: "Coach",
    device: "iPad Air 5th Gen",
    browser: "Mobile Safari 17.4",
    ip: "192.168.1.108",
    city: "Geneva, Switzerland",
  },
  {
    userId: "user_sm_009",
    userName: "Lucas Silva",
    userEmail: "lucas.silva@sportsmax-academy.org",
    role: "Athlete",
    device: "Google Pixel 8",
    browser: "Chrome Mobile",
    ip: "192.168.1.109",
    city: "São Paulo, Brazil",
  },
  {
    userId: "user_sm_010",
    userName: "Sarah Jenkins",
    userEmail: "sarah.jenkins@sportsmax-academy.org",
    role: "Performance Analyst",
    device: "Custom Gaming Rig",
    browser: "Firefox 125.0",
    ip: "192.168.1.110",
    city: "Sydney, Australia",
  },
];

async function seedSessions() {
  console.log("====================================================");
  console.log("   SportsMax Redis Session Seeding Script           ");
  console.log("   Creates tree structure: sportsmax -> session     ");
  console.log("====================================================");

  let client;
  try {
    client = await getRedisClient();
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
    process.exit(1);
  }

  let sessionCount = 0;
  let visitorCount = 0;
  const now = Date.now();

  for (let i = 0; i < SAMPLE_SESSIONS.length; i++) {
    const item = SAMPLE_SESSIONS[i];
    // Generate deterministic session ID format like ses_099adfc...
    const sessionHex = crypto
      .createHash("sha256")
      .update(`session_${item.userId}_${i}`)
      .digest("hex")
      .substring(0, 24);

    const sessionKey = `sportsmax:session:ses_${sessionHex}`;

    const sessionData: SessionData = {
      sessionId: `ses_${sessionHex}`,
      userId: item.userId,
      userName: item.userName,
      userEmail: item.userEmail,
      userRole: item.role,
      device: item.device,
      browser: item.browser,
      ipAddress: item.ip,
      location: item.city,
      createdAt: new Date(now - (i * 3600 * 1000 + 120000)).toISOString(),
      lastActiveAt: new Date(now - i * 60000).toISOString(),
    };

    // Store as STRING (JSON encoded) matching your screenshot
    await client.set(sessionKey, JSON.stringify(sessionData, null, 2));
    console.log(`[SESSION STRING] Created -> ${sessionKey} (${item.userName})`);
    sessionCount++;

    // Also store visitor session in a SORTED SET for chronological session tracking
    const visitorKey = `sportsmax:visitor-sessions`;
    const score = now - i * 180000;
    const member = `vis_${sessionHex.substring(0, 20)}`;
    await client.zAdd(visitorKey, {
      score,
      value: member,
    });
    visitorCount++;
  }

  console.log("----------------------------------------------------");
  console.log(
    `Summary: ${sessionCount} STRING sessions created under "sportsmax:session:*"`
  );
  console.log(
    `         ${visitorCount} members added to SORTED SET "sportsmax:visitor-sessions"`
  );
  console.log("====================================================");

  await closeRedisClient();
  process.exit(0);
}

seedSessions().catch(async (error) => {
  console.error("Fatal error creating sessions:", error);
  await closeRedisClient();
  process.exit(1);
});
