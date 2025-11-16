/**
 * Authentication Context
 *
 * This context provides authentication state and methods throughout the application.
 * Integrated with better-auth for robust authentication.
 */

import { createContext, useContext } from 'react';
import { authClient } from '../lib/auth-client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // BetterAuth handles session management internally via hooks
  // We'll provide the client and helper methods through context

  const signUp = async (email, password, name) => {
    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name,
      });
      return result;
    } catch (error) {
      console.error('Sign up failed:', error);
      throw error;
    }
  };

  const signIn = async (email, password) => {
    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });
      return result;
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      console.error('Sign out failed:', error);
      throw error;
    }
  };

  const value = {
    signUp,
    signIn,
    signOut,
    // Expose the auth client for advanced usage
    authClient,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Re-export useSession hook from better-auth for convenience
export const useSession = () => {
  return authClient.useSession();
};

export default AuthContext;
