/**
 * Authentication Context
 *
 * This context provides authentication state and methods throughout the application.
 * To implement, uncomment the code below and integrate with better-auth.
 */

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // TODO: Implement authentication logic with better-auth
  useEffect(() => {
    // Example: Check for existing session on mount
    // const checkSession = async () => {
    //   try {
    //     const session = await auth.getSession();
    //     if (session) {
    //       setUser(session.user);
    //       setIsAuthenticated(true);
    //     }
    //   } catch (error) {
    //     console.error('Session check failed:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // checkSession();

    // For now, just set loading to false
    setLoading(false);
  }, []);

  // Authentication methods (to be implemented)
  const signUp = async (email, password, name) => {
    // TODO: Implement sign up with better-auth
    // try {
    //   const result = await auth.signUp.email({ email, password, name });
    //   setUser(result.user);
    //   setIsAuthenticated(true);
    //   return result;
    // } catch (error) {
    //   console.error('Sign up failed:', error);
    //   throw error;
    // }
    console.log('Sign up not implemented yet');
  };

  const signIn = async (email, password) => {
    // TODO: Implement sign in with better-auth
    // try {
    //   const result = await auth.signIn.email({ email, password });
    //   setUser(result.user);
    //   setIsAuthenticated(true);
    //   return result;
    // } catch (error) {
    //   console.error('Sign in failed:', error);
    //   throw error;
    // }
    console.log('Sign in not implemented yet');
  };

  const signOut = async () => {
    // TODO: Implement sign out with better-auth
    // try {
    //   await auth.signOut();
    //   setUser(null);
    //   setIsAuthenticated(false);
    // } catch (error) {
    //   console.error('Sign out failed:', error);
    //   throw error;
    // }
    console.log('Sign out not implemented yet');
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    signUp,
    signIn,
    signOut,
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

export default AuthContext;
