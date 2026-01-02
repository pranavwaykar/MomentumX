# MomentumX

MomentumX is a problem-first collaboration platform. It helps entrepreneurs, developers, designers, and product thinkers move from ideas to execution by enforcing structure: problems are proposed, teams are formed with defined roles, and progress is tracked until MVP.

## Features
- Idea Proposal: Guided multi-step form with validations and preview
- Discovery: Card-based problem browsing with domain filters
- Team Formation: Join teams, see open roles, and view team details
- Progress & Lifecycle: Visual team progress indicators and stages
- Theming & Design System: Dark/light mode, reusable components, Tailwind-based styles
- Authentication: Firebase email/password and Google sign-in (frontend-only)

## Tech Stack
- Next.js 16 App Router
- React 19
- Tailwind (via @tailwindcss/postcss) and SCSS utilities
- Zustand for local state
- Firebase Authentication (client-side)

## Getting Started
1. Install dependencies

```bash
npm install
```

2. Configure environment variables

Create a `.env` file:
```
NEXT_PUBLIC_FIREBASE_API_KEY="..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="..."
NEXT_PUBLIC_FIREBASE_PROJECT_ID="..."
NEXT_PUBLIC_FIREBASE_APP_ID="..."
```

3. Run the dev server

```bash
npm run dev
```

Visit http://localhost:3000

## Key Pages
- `/` Home
- `/discovery` Problem discovery
- `/problems/new` Idea proposal (stepper)
- `/teams` Teams list (derived from problems with members)
- `/teams/[id]` Team detailed view
- `/auth/sign-in` Sign in (email/password + Google)
- `/auth/sign-up` Sign up (email/password)

## Structure Highlights
- App layout: `src/app/layout.tsx` (Theme + Auth providers)
- Navbar: `src/components/organisms/navbar.tsx`
- Problem form: `src/components/organisms/problem-form/*`
- Discovery: `src/app/discovery/page.tsx`
- Teams: `src/app/teams/page.tsx` and `src/app/teams/[id]/page.tsx`
- Auth: `src/app/auth/sign-in/page.tsx`, `src/app/auth/sign-up/page.tsx`
- Firebase setup: `src/lib/firebase.ts`

## Notes
- This is a frontend-only demo. Firebase Auth is used purely on the client.
- Mock problem data lives in `src/lib/mock-data.ts`. Replace with an API when available.
- The design system uses composable atoms and molecules. Button supports `asChild` to avoid invalid nesting with links.

## License
MIT

