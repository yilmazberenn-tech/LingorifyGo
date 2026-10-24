# Lingorify

LingorifyGo is a responsive English vocabulary-learning app built with Next.js, React, and TypeScript. Users can create email-and-password accounts on `/login`; user records are stored in Supabase and `/dashboard` requires an authenticated session.

## Supabase accounts

1. Copy `.env.example` to `.env.local`.
2. Set `SUPABASE_URL` and `SUPABASE_SECRET_KEY` using the server-side values from your Supabase/Vercel project. Never expose the secret key in client code or commit it.
3. The table definition is in [`supabase/schema.sql`](./supabase/schema.sql). It has already been applied to the Supabase project configured in the current `.env.local`; run it in the SQL Editor when setting up a different project.
4. Generate a stable session secret with `node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"` and set it as `NEXTAUTH_SECRET` in `.env.local`. Set `NEXTAUTH_URL=http://localhost:3000`, then run `npm run dev`.
5. Visit `/login` and choose **Create an account**. Signup stores the user’s first and last names, age, normalized email, bcrypt password hash, and creation time in Supabase. The table has Row Level Security enabled with no public policies; the server-only Supabase secret key is used by the signup and login handlers.

Passwords are stored as bcrypt hashes, never as plain text. Configure the same Supabase URL and secret key as server-side environment variables in Vercel before deploying.

For Vercel, add `NEXTAUTH_SECRET` to the project’s Production environment (and Preview/Development if used) with the same stable generated value. Set `NEXTAUTH_URL` to the site’s canonical HTTPS URL, not `http://localhost:3000`, then redeploy. A missing session secret is treated as a configuration error rather than silently deriving a host-dependent key.

## Requirements

- Node.js 24 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Validate and build

```bash
npm run lint
npm run typecheck
npm run build
```

## GitHub

The repository includes a GitHub Actions workflow that runs linting, TypeScript checks, and a production build on pushes and pull requests to `main`.

To publish this project, create an empty repository on GitHub, then connect it and push:

```bash
git add .
git commit -m "Initial project setup"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the example URL with your GitHub repository URL. GitHub Actions will run automatically after the push.
