import { checkRedisHealth, closeRedisClient } from "../src/lib/redis";

async function main() {
  console.log("========================================");
  console.log("   SportsMax Redis Connection Test      ");
  console.log("========================================");

  try {
    const health = await checkRedisHealth();
    console.log("Status:    ", health.status.toUpperCase());
    console.log("Host:      ", health.host);
    console.log("Port:      ", health.port);
    console.log("TLS:       ", health.tls);
    console.log("Timestamp: ", health.timestamp);

    if (health.status === "connected") {
      console.log("PING Reply:", health.ping);
      console.log("----------------------------------------");
      console.log("SUCCESS: Redis Cloud connection verified!");
      await closeRedisClient();
      process.exit(0);
    } else {
      console.error("----------------------------------------");
      console.error("FAILURE: Unable to connect to Redis Cloud.");
      console.error("Error Detail:", health.error);
      console.error("Please ensure REDIS_PASSWORD is set in your .env or environment.");
      await closeRedisClient();
      process.exit(1);
    }
  } catch (error) {
    console.error("Unexpected error during Redis test:", error);
    await closeRedisClient();
    process.exit(1);
  }
}

main();
