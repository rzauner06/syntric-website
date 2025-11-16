import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

async function testConnection() {
  console.log("🔍 Testing PostgreSQL connection...");
  console.log("Database URL:", process.env.DATABASE_URL.replace(/:[^:@]+@/, ':***@'));

  const configs = [
    {
      name: "With SSL (rejectUnauthorized: false)",
      config: {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 5000,
      }
    },
    {
      name: "Without SSL",
      config: {
        connectionString: process.env.DATABASE_URL,
        ssl: false,
        connectionTimeoutMillis: 5000,
      }
    },
    {
      name: "Direct parameters with SSL",
      config: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 5000,
      }
    },
    {
      name: "Direct parameters without SSL",
      config: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: false,
        connectionTimeoutMillis: 5000,
      }
    }
  ];

  for (const { name, config } of configs) {
    console.log(`\n📡 Attempting: ${name}`);
    const pool = new Pool(config);

    try {
      const result = await pool.query('SELECT NOW() as current_time, version()');
      console.log(`✅ SUCCESS with ${name}`);
      console.log(`   Time: ${result.rows[0].current_time}`);
      console.log(`   Version: ${result.rows[0].version.substring(0, 50)}...`);
      await pool.end();
      console.log("\n🎉 Found working configuration!");
      return;
    } catch (error) {
      console.log(`❌ FAILED with ${name}`);
      console.log(`   Error: ${error.message}`);
      await pool.end().catch(() => {});
    }
  }

  console.log("\n❌ All connection attempts failed.");
  console.log("\nPossible issues:");
  console.log("1. Firewall blocking port 5432");
  console.log("2. PostgreSQL server not accepting remote connections");
  console.log("3. IP address might be restricted");
  console.log("4. Network connectivity issues");
}

testConnection();
