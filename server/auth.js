import { betterAuth } from "better-auth";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false, // Server does not support SSL
  connectionTimeoutMillis: 10000, // 10 second timeout
});

export const auth = betterAuth({
  database: pool,

  // Base URL configuration - REQUIRED for BetterAuth to work properly
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true if you want email verification
  },

  socialProviders: {
    // Add social providers here if needed
    // github: {
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // },
  },

  secret: process.env.BETTER_AUTH_SECRET,

  // Advanced options
  advanced: {
    cookiePrefix: "syntriq",
    useSecureCookies: process.env.NODE_ENV === "production",
  },
});
