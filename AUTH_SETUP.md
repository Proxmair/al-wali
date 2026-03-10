# Authentication Setup Guide

This guide walks you through setting up the complete authentication system for AL Wali.

## Features

- ✅ Email/Password Authentication with 6-digit OTP codes
- ✅ Google OAuth 2.0 Integration
- ✅ MongoDB Database
- ✅ Session Management with Secure Cookies
- ✅ Protected Routes & Middleware
- ✅ User Account Management
- ✅ Email Notifications

## Prerequisites

1. **Node.js** - v18 or higher
2. **MongoDB** - Cloud database or local instance
3. **Google OAuth Credentials** - From Google Cloud Console
4. **Email Service** - Resend, SendGrid, or SMTP

## Step 1: MongoDB Setup

### Option A: MongoDB Atlas (Cloud - Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new project and cluster
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/database`)
5. Add it to `.env.local`:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/al-wali
```

### Option B: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service:
   ```bash
   # macOS with Homebrew
   brew services start mongodb-community
   
   # Windows
   net start MongoDB
   ```
3. Add to `.env.local`:
   ```
   MONGODB_URI=mongodb://localhost:27017/al-wali
   ```

## Step 2: Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Google+ API
4. Go to "OAuth consent screen" and set it up
5. Create OAuth 2.0 credentials (Web Application)
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/google/callback` (development)
   - `https://yourdomain.com/api/auth/google/callback` (production)
7. Copy the Client ID and Client Secret to `.env.local`:

```
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
```

Also add your Client ID to `.env.local` as a public variable:

```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

## Step 3: Email Service Setup

### Option A: Resend (Recommended)

1. Go to [Resend](https://resend.com)
2. Create an account and get your API key
3. Add to `.env.local`:

```
RESEND_API_KEY=re_your_api_key
```

Then uncomment the Resend code in `lib/email.ts`

### Option B: SMTP (Gmail, Outlook, etc.)

1. Get your SMTP credentials
2. Add to `.env.local`:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@alwali.com
```

## Step 4: JWT Secret

Generate a secure random JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Add to `.env.local`:

```
JWT_SECRET=your-generated-secret-key
```

## Step 5: Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

The required packages are already in `package.json`:
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT tokens
- `swr` - Data fetching hook

## Step 6: Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000`

## API Routes

### Authentication Routes

- **POST** `/api/auth/signup` - Sign up with email and name
- **POST** `/api/auth/login` - Request OTP for login
- **POST** `/api/auth/verify-otp` - Verify OTP and create session
- **POST** `/api/auth/logout` - Logout user
- **GET** `/api/auth/me` - Get current user info
- **GET** `/api/auth/google/callback` - Google OAuth callback

## Auth Pages

- `/auth/signup` - Sign up page with OTP verification
- `/auth/login` - Login page with OTP verification
- `/account` - User account page (protected)
- `/orders` - User orders page (protected)

## Key Files

### Models
- `lib/models/User.ts` - User schema with password hashing
- `lib/models/OTP.ts` - OTP storage for 2-factor auth
- `lib/models/Session.ts` - Session management

### API Routes
- `app/api/auth/*` - All authentication endpoints

### Components
- `components/GoogleAuthButton.tsx` - Google OAuth button
- `components/navbar.tsx` - Updated with auth UI

### Hooks & Utils
- `hooks/useAuth.ts` - Authentication state management
- `lib/auth.ts` - Auth utilities (OTP, JWT, tokens)
- `lib/email.ts` - Email sending utilities
- `lib/api-client.ts` - Authenticated API request helper

### Middleware & Pages
- `middleware.ts` - Route protection
- `app/account/page.tsx` - Protected account page
- `app/orders/page.tsx` - Protected orders page

## Security Features

1. **Password Hashing** - bcryptjs with 10 salt rounds
2. **Secure Sessions** - HTTP-only, Secure, SameSite cookies
3. **CSRF Protection** - Same-site cookies
4. **OTP Expiration** - 10 minutes
5. **Token Expiration** - 7 days
6. **Rate Limiting** - Can be added to API routes

## Testing

### Sign Up Flow
1. Go to `/auth/signup`
2. Enter name and email
3. Check console for OTP (or configured email)
4. Enter 6-digit code
5. Account created successfully

### Login Flow
1. Go to `/auth/login`
2. Enter email
3. Check console for OTP
4. Enter 6-digit code
5. Logged in successfully

### Google OAuth
1. Click "Sign in with Google" button
2. Authenticate with Google account
3. Automatically created/logged in

### Protected Routes
1. Login first
2. Visit `/account` or `/orders`
3. See your account information

## Common Issues

### "MONGODB_URI not set"
- Add `MONGODB_URI` to `.env.local`

### "Google OAuth not configured"
- Add `NEXT_PUBLIC_GOOGLE_CLIENT_ID` to `.env.local`
- Make sure the redirect URI matches in Google Console

### OTP not sending
- For development: Check browser console logs
- For production: Configure email service (Resend or SMTP)

### Session not persisting
- Check if cookies are enabled
- Check if `sessionToken` cookie is set in browser

## Next Steps

1. **Email Integration** - Set up real email service (Resend recommended)
2. **Enhanced Email Templates** - Create branded HTML email templates
3. **Two-Factor Authentication** - Add optional 2FA
4. **Social Login Expansion** - Add GitHub, Discord, etc.
5. **Password Recovery** - Add forgot password flow
6. **Email Verification** - Add email verification on signup
7. **Rate Limiting** - Add to prevent abuse
8. **Audit Logging** - Log authentication events

## Support

For issues or questions:
1. Check `.env.local` for missing variables
2. Check browser console for errors
3. Check server logs in terminal
4. Visit documentation links for each service
