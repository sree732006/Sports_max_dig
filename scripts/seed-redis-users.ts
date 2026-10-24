import { getRedisClient, closeRedisClient } from "../src/lib/redis";

export interface SportsMaxUser {
  id: string;
  name: string;
  email: string;
  role: "Athlete" | "Coach" | "Performance Analyst" | "Sports Director" | "Medical Staff";
}

export const FICTIONAL_USERS: SportsMaxUser[] = [
  {
    id: "user_sm_001",
    name: "Marcus Vance",
    email: "marcus.vance@sportsmax-academy.org",
    role: "Athlete",
  },
  {
    id: "user_sm_002",
    name: "Elena Rostova",
    email: "elena.rostova@sportsmax-academy.org",
    role: "Coach",
  },
  {
    id: "user_sm_003",
    name: "David Chen",
    email: "david.chen@sportsmax-academy.org",
    role: "Performance Analyst",
  },
  {
    id: "user_sm_004",
    name: "Amina Diallo",
    email: "amina.diallo@sportsmax-academy.org",
    role: "Athlete",
  },
  {
    id: "user_sm_005",
    name: "Dr. Liam Gallagher",
    email: "liam.gallagher@sportsmax-academy.org",
    role: "Medical Staff",
  },
  {
    id: "user_sm_006",
    name: "Sophia Martinez",
    email: "sophia.martinez@sportsmax-academy.org",
    role: "Sports Director",
  },
  {
    id: "user_sm_007",
    name: "Tariq Al-Mansoor",
    email: "tariq.almansoor@sportsmax-academy.org",
    role: "Athlete",
  },
  {
    id: "user_sm_008",
    name: "Chloe Dupont",
    email: "chloe.dupont@sportsmax-academy.org",
    role: "Coach",
  },
  {
    id: "user_sm_009",
    name: "Lucas Silva",
    email: "lucas.silva@sportsmax-academy.org",
    role: "Athlete",
  },
  {
    id: "user_sm_010",
    name: "Sarah Jenkins",
    email: "sarah.jenkins@sportsmax-academy.org",
    role: "Performance Analyst",
  },
];

async function seedUsers() {
  console.log("========================================");
  console.log("   SportsMax Redis User Seeding Script  ");
  console.log("========================================");

  let client;
  try {
    client = await getRedisClient();
  } catch (err) {
    console.error("Failed to connect to Redis for seeding:", err);
    process.exit(1);
  }

  let insertedCount = 0;
  let skippedCount = 0;

  for (const user of FICTIONAL_USERS) {
    const key = `user:${user.id}`;

    // Check if key already exists so we do not overwrite existing records
    const exists = await client.exists(key);

    if (exists) {
      console.log(`[SKIP] Key '${key}' already exists for user "${user.name}". Preserving existing data.`);
      skippedCount++;
    } else {
      // Store user as a Redis Hash using HSET
      await client.hSet(key, {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: new Date().toISOString(),
      });

      // Maintain an index set of all user IDs for fast querying/listing
      await client.sAdd("sportsmax:users", user.id);

      console.log(`[INSERTED] Created ${key} -> ${user.name} (${user.role})`);
      insertedCount++;
    }
  }

  console.log("----------------------------------------");
  console.log(`Summary: ${insertedCount} inserted, ${skippedCount} skipped (already existed). Total target: ${FICTIONAL_USERS.length}`);
  console.log("========================================");

  await closeRedisClient();
  process.exit(0);
}

seedUsers().catch(async (error) => {
  console.error("Fatal seeding error:", error);
  await closeRedisClient();
  process.exit(1);
});
