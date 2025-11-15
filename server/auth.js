import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import dotenv from "dotenv";

dotenv.config();

export const auth = betterAuth({
  database: new Database(process.env.DATABASE_URL || "./server/auth.db"),

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
