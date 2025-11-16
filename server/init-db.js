import pg from "pg";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from project root
dotenv.config({ path: join(__dirname, '..', '.env') });

const { Pool } = pg;

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false, // Server does not support SSL
  connectionTimeoutMillis: 10000, // 10 second timeout
});

// Create tables based on Better Auth schema for PostgreSQL
const schema = `
  -- Users table
  CREATE TABLE IF NOT EXISTS "user" (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    "emailVerified" BOOLEAN DEFAULT false,
    image TEXT,
    "createdAt" BIGINT NOT NULL,
    "updatedAt" BIGINT NOT NULL
  );

  -- Sessions table
  CREATE TABLE IF NOT EXISTS session (
    id TEXT PRIMARY KEY,
    "expiresAt" BIGINT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    "createdAt" BIGINT NOT NULL,
    "updatedAt" BIGINT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE
  );

  -- Accounts table (for different auth providers)
  CREATE TABLE IF NOT EXISTS account (
    id TEXT PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" BIGINT,
    "refreshTokenExpiresAt" BIGINT,
    scope TEXT,
    password TEXT,
    "createdAt" BIGINT NOT NULL,
    "updatedAt" BIGINT NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE
  );

  -- Verification table (for email verification, password reset, etc.)
  CREATE TABLE IF NOT EXISTS verification (
    id TEXT PRIMARY KEY,
    identifier TEXT NOT NULL,
    value TEXT NOT NULL,
    "expiresAt" BIGINT NOT NULL,
    "createdAt" BIGINT NOT NULL,
    "updatedAt" BIGINT
  );

  -- Create indexes for better performance
  CREATE INDEX IF NOT EXISTS idx_session_userId ON session("userId");
  CREATE INDEX IF NOT EXISTS idx_account_userId ON account("userId");
  CREATE INDEX IF NOT EXISTS idx_verification_identifier ON verification(identifier);
`;

async function initDatabase() {
  try {
    // Test connection
    await pool.query('SELECT NOW()');
    console.log("✅ Database connection successful!");

    // Execute schema
    await pool.query(schema);
    console.log("✅ Database initialized successfully!");
    console.log("📊 Tables created:");
    console.log("  - user");
    console.log("  - session");
    console.log("  - account");
    console.log("  - verification");
  } catch (error) {
    console.error("❌ Error initializing database:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initDatabase();
