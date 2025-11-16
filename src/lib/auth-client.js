import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // Auth server URL
});

// Export hooks for easy access
export const { useSession, signIn, signOut, signUp } = authClient;
