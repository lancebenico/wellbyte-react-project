# WellByte

A student productivity and wellbeing app — tasks, a calendar, a mood tracker, a Pomodoro timer and a daily quote, behind a single sign-in.

**Live:** https://wellbyte.vercel.app

Final React project for the College of Information and Computing Sciences, University of Santo Tomas.

---

## Features

| Area | What it does |
| :--- | :--- |
| **Dashboard** | Bento-style overview — tasks, mood, the Pomodoro timer and the day's quote in one view |
| **Tasks** | Create, edit and complete tasks, grouped by academic subject |
| **Calendar** | Month view of scheduled items, with a modal for adding and editing |
| **Mood tracker** | Log how the day went and see it next to your workload |
| **Pomodoro** | Focus timer for study sessions |
| **Daily quotes** | Pulled from the Quotable API |
| **Support resources** | Wellbeing resources for students |
| **Onboarding** | First-run setup for subjects and preferences |

## Stack

- **React 19** with **Vite**
- **Tailwind CSS v4**
- **Zustand** for app and auth state, **React Context** for shared state
- **React Router** for routing
- **Firebase** — Google sign-in (scoped to CICS addresses) and Firestore
- **Framer Motion**, **lucide-react**, **canvas-confetti**

## Running it locally

You need Node 18 or newer.

```bash
npm install
npm run dev
```

The app runs at http://localhost:5173.

### Firebase configuration

Sign-in needs a Firebase project. Create a `.env` in the project root:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Without them `isFirebaseConfigured` stays false and sign-in is disabled — the rest of the app still runs. Never commit `.env`.

## Commands

| Command | What it does |
| :--- | :--- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Produce a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |

## Project layout

```
src/
  components/   Feature folders: layout, dashboard, calendar, home, auth, profile, ui
  pages/        Home, Dashboard, Calendar, Support Resources, Developers, Sign in
  context/      AppContext — shared app state
  store/        Zustand stores (useStore, useAuthStore)
  lib/          Firebase client and the Quotable API client
firestore.rules Firestore security rules
```
# React + Vite
