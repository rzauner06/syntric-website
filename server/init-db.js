import Database from "better-sqlite3";
import dotenv from "dotenv";

dotenv.config();

const db = new Database(process.env.DATABASE_URL || "./server/auth.db");

// Create tables based on Better Auth schema
const schema = `
  -- Users table
  CREATE TABLE IF NOT EXISTS user (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    emailVerified INTEGER DEFAULT 0,
    image TEXT,
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL
  );

  -- Sessions table
  CREATE TABLE IF NOT EXISTS session (
    id TEXT PRIMARY KEY,
    expiresAt INTEGER NOT NULL,
    token TEXT UNIQUE NOT NULL,
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL,
    ipAddress TEXT,
    userAgent TEXT,
    userId TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
  );

  -- Accounts table (for different auth providers)
  CREATE TABLE IF NOT EXISTS account (
    id TEXT PRIMARY KEY,
    accountId TEXT NOT NULL,
    providerId TEXT NOT NULL,
    userId TEXT NOT NULL,
    accessToken TEXT,
    refreshToken TEXT,
    idToken TEXT,
    accessTokenExpiresAt INTEGER,
    refreshTokenExpiresAt INTEGER,
    scope TEXT,
    password TEXT,
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
  );

  -- Verification table (for email verification, password reset, etc.)
  CREATE TABLE IF NOT EXISTS verification (
    id TEXT PRIMARY KEY,
    identifier TEXT NOT NULL,
    value TEXT NOT NULL,
    expiresAt INTEGER NOT NULL,
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER
  );

  -- Create indexes for better performance
  CREATE INDEX IF NOT EXISTS idx_session_userId ON session(userId);
  CREATE INDEX IF NOT EXISTS idx_account_userId ON account(userId);
  CREATE INDEX IF NOT EXISTS idx_verification_identifier ON verification(identifier);
`;

try {
  db.exec(schema);
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
  db.close();
}
