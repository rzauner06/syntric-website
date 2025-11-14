# Authentication Setup Guide

This project is prepared for user authentication using [better-auth](https://www.better-auth.com/). Follow this guide to implement authentication.

## Current Setup

The following files have been created and are ready for implementation:

- `src/lib/auth.js` - Auth configuration
- `src/contexts/AuthContext.jsx` - Auth context provider
- `src/components/ProtectedRoute.jsx` - Protected route wrapper
- `src/pages/SignInPage.jsx` - Sign-in page template

## Implementation Steps

### 1. Database Setup

Better-auth requires a database to store user data and sessions. Choose one:

**PostgreSQL (Recommended for production)**
```bash
npm install pg
```

**MySQL**
```bash
npm install mysql2
```

**SQLite (Good for development)**
```bash
npm install better-sqlite3
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
# Auth Configuration
VITE_AUTH_SECRET=your-secret-key-here-min-32-chars
VITE_DATABASE_URL=postgresql://user:password@localhost:5432/syntric

# Optional: Social Auth Providers
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_GOOGLE_CLIENT_SECRET=your-google-client-secret
VITE_GITHUB_CLIENT_ID=your-github-client-id
VITE_GITHUB_CLIENT_SECRET=your-github-client-secret
```

**Generate a secure secret:**
```bash
openssl rand -base64 32
```

### 3. Uncomment Auth Configuration

In `src/lib/auth.js`, uncomment the better-auth configuration and adjust as needed:

```javascript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: {
    provider: "postgres",
    url: import.meta.env.VITE_DATABASE_URL,
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  // ... other configuration
});
```

### 4. Run Database Migrations

Better-auth will automatically create the necessary database tables:

```bash
npm run dev
```

The first time you start the app, better-auth will set up the database schema.

### 5. Update AuthContext

In `src/contexts/AuthContext.jsx`, uncomment the auth implementation code and replace TODOs with actual better-auth calls.

### 6. Add Auth Provider to App

Update `src/App.jsx` to wrap your app with the AuthProvider:

```javascript
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          {/* ... routes */}
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
```

### 7. Add Auth Routes

Add sign-in and sign-up routes to `src/App.jsx`:

```javascript
import SignInPage from './pages/SignInPage';
// Create SignUpPage similarly to SignInPage

<Route path="/signin" element={<SignInPage />} />
<Route path="/signup" element={<SignUpPage />} />
```

### 8. Protect Routes

Wrap any routes that require authentication with `ProtectedRoute`:

```javascript
import ProtectedRoute from './components/ProtectedRoute';

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

### 9. Add Navigation Links

Update navigation components to include sign-in/sign-up buttons:

```javascript
<Link to="/signin">
  <button>Sign In</button>
</Link>

// Or show user menu if authenticated:
{isAuthenticated ? (
  <UserMenu user={user} />
) : (
  <Link to="/signin">Sign In</Link>
)}
```

## Features to Implement

### Email/Password Authentication
- User registration with email verification
- Password reset functionality
- Profile management

### Social Authentication
- Google OAuth
- GitHub OAuth
- Add more providers as needed

### Session Management
- Automatic session refresh
- Remember me functionality
- Multi-device session management

### User Roles & Permissions
- Admin dashboard
- Role-based access control
- Permission management

## Additional Resources

- [Better Auth Documentation](https://www.better-auth.com/docs)
- [Better Auth GitHub](https://github.com/better-auth/better-auth)
- [Example Implementations](https://www.better-auth.com/docs/examples)

## Security Best Practices

1. **Use HTTPS in production** - Never send credentials over HTTP
2. **Validate input** - Sanitize all user inputs on both client and server
3. **Rate limiting** - Implement rate limiting for auth endpoints
4. **Strong passwords** - Enforce password strength requirements
5. **Email verification** - Verify email addresses before activation
6. **Session security** - Use secure, httpOnly cookies
7. **Regular updates** - Keep better-auth and dependencies updated

## Support

If you encounter issues during implementation:
1. Check the [Better Auth documentation](https://www.better-auth.com/docs)
2. Review the code comments in the prepared files
3. Check the Better Auth Discord community

## Next Steps

After implementing basic authentication:

1. Add user dashboard/profile page
2. Implement password reset flow
3. Add email verification
4. Set up social OAuth providers
5. Add role-based access control
6. Implement user settings page
7. Add account deletion functionality

---

**Note:** This setup is prepared but not implemented. All code is commented out and ready for activation when you're ready to add user accounts.
