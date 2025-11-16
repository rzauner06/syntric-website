# BetterAuth Integration Setup

This document describes the authentication setup for the SYNTRIQ website using BetterAuth.

## Overview

The application now includes a complete authentication system powered by [BetterAuth](https://www.better-auth.com/), a modern authentication library for JavaScript applications.

## Architecture

### Backend (Express Server)
- **Location**: `/server`
- **Port**: 3000
- **Endpoints**: `/api/auth/*`
- **Database**: SQLite (`server/auth.db`)

### Frontend (React)
- **Location**: `/src`
- **Auth Client**: `/src/lib/auth-client.js`
- **Context**: `/src/contexts/AuthContext.jsx`
- **Pages**:
  - `/login` - Login page
  - `/register` - Registration page
  - `/profile` - User profile page

## Getting Started

### 1. Environment Setup

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Update the `BETTER_AUTH_SECRET` in `.env` with a secure random string.

### 2. Initialize Database

Run the database initialization script:
```bash
npm run init:db
```

### 3. Start Development Servers

Run both frontend and backend simultaneously:
```bash
npm run dev
```

This uses `concurrently` to run:
- Frontend (Vite): http://localhost:5173
- Backend (Express): http://localhost:3000

## Features

- Email & Password authentication
- User registration and login
- Session management
- User profile viewing
- Sign out functionality

For more details, see the full documentation in the codebase.
