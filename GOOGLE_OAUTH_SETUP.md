# Google OAuth Setup for Sumirayan Design

Follow these steps to enable Google OAuth authentication for your Supabase project.

## Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Go to **APIs & Services → OAuth consent screen**
   - Choose **External** user type
   - Fill in app details:
     - App name: `Sumirayan Design`
     - Support email: your-email@example.com
     - Developer contact: your-email@example.com
   - Add scopes: `email`, `profile`
   - Save

4. Go to **APIs & Services → Credentials → Create Credentials → OAuth client ID**
   - Application type: **Web application**
   - Name: `Sumirayan Design OAuth`
   - Authorized redirect URIs: Add these:
     ```
     https://<YOUR_SUPABASE_PROJECT_REF>.supabase.co/auth/v1/callback
     https://your-domain.com/auth/callback
     http://localhost:3000/auth/callback
     ```
   - Click **Create**
   - Copy **Client ID** and **Client Secret**

## Step 2: Configure Supabase

1. Open your [Supabase Dashboard](https://app.supabase.com)
2. Go to **Authentication → Providers**
3. Find **Google** provider
4. Paste your Google credentials:
   - **Client ID**: Paste here
   - **Client Secret**: Paste here
5. Click **Save**

## Step 3: Configure Your App

Your app already has the OAuth callback handler set up at `/auth/callback`.

The redirect happens automatically:
1. User clicks "Continue with Google"
2. Redirected to Google login
3. Google redirects back to `/auth/callback`
4. Session established and redirected to `/account`

## Step 4: Test Google OAuth

1. Start your dev server: `npm run dev`
2. Go to http://localhost:3000/login or /signup
3. Click "Continue with Google"
4. You should be redirected to Google, then back to your account page
5. Verify you're logged in by checking your email on the account page

## Redirect URIs Explanation

- **Supabase Callback**: `https://<project>.supabase.co/auth/v1/callback` - Managed by Supabase
- **App Callback**: `/auth/callback` - Handled by your Next.js app
- **Localhost**: For local testing

Your app is configured to use the app callback (`/auth/callback`) which is the recommended approach.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Invalid redirect_uri | Ensure the redirect URI in Google Cloud exactly matches what you're using (including https://, no trailing slash) |
| OAuth consent unverified | For testing, you can use the app unverified. For production with many users, request verification in Google Cloud |
| Session not persisting | Check browser cookies are enabled and Supabase client is initialized correctly |
| Blank page on callback | The /auth/callback route is loading - it redirects after establishing session |

## Security Notes

✅ **Already Secure:**
- Google Client Secret is only used server-side (in Google Cloud and Supabase)
- Frontend only sees Client ID (which is public)
- Never put secrets in your Next.js .env or frontend code

✅ **Frontend Environment Variables:**
```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

These are safe to expose (they're public/anon keys with RLS protection).

## For Production Deployment

Replace `http://localhost:3000/auth/callback` with your production domain:
- Add to Google Cloud: `https://sumirayan.design/auth/callback`
- In your Supabase dashboard, update "Site URL" under Authentication → URL Configuration

Then set in production environment:
```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

Done! Your app now supports Google OAuth authentication.
