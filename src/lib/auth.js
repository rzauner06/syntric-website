/**
 * Better Auth Configuration
 *
 * This file contains the configuration for better-auth authentication.
 * To implement authentication, follow these steps:
 *
 * 1. Set up environment variables:
 *    - Create a .env file in the root directory
 *    - Add the following variables:
 *      VITE_AUTH_SECRET=your-secret-key-here
 *      VITE_DATABASE_URL=your-database-url-here
 *
 * 2. Uncomment the configuration below and customize as needed
 *
 * 3. Set up a database (PostgreSQL, MySQL, or SQLite recommended)
 *
 * 4. Run database migrations to create necessary tables
 *
 * 5. Implement auth providers (email/password, Google, GitHub, etc.)
 */

// import { betterAuth } from "better-auth";

// export const auth = betterAuth({
//   // Database configuration
//   database: {
//     provider: "postgres", // or "mysql", "sqlite"
//     url: import.meta.env.VITE_DATABASE_URL,
//   },
//
//   // Email configuration for email/password authentication
//   emailAndPassword: {
//     enabled: true,
//     requireEmailVerification: true,
//   },
//
//   // Social authentication providers
//   socialProviders: {
//     google: {
//       clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
//       clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
//     },
//     github: {
//       clientId: import.meta.env.VITE_GITHUB_CLIENT_ID,
//       clientSecret: import.meta.env.VITE_GITHUB_CLIENT_SECRET,
//     },
//   },
//
//   // Session configuration
//   session: {
//     expiresIn: 60 * 60 * 24 * 7, // 7 days
//     updateAge: 60 * 60 * 24, // 1 day
//   },
//
//   // Advanced options
//   advanced: {
//     generateSessionToken: () => {
//       // Custom session token generation
//       return crypto.randomUUID();
//     },
//   },
// });

/**
 * Usage Example:
 *
 * import { auth } from './lib/auth';
 *
 * // Sign up
 * await auth.signUp.email({
 *   email: 'user@example.com',
 *   password: 'securepassword',
 *   name: 'John Doe',
 * });
 *
 * // Sign in
 * await auth.signIn.email({
 *   email: 'user@example.com',
 *   password: 'securepassword',
 * });
 *
 * // Get current session
 * const session = await auth.getSession();
 *
 * // Sign out
 * await auth.signOut();
 */

export default {};
