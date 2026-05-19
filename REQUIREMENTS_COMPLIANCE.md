# WellByte — Requirements & Rubric Compliance

This document maps the final academic project checklist to the WellByte codebase.

## Technical implementation

| Requirement | Status | Evidence |
|-------------|--------|----------|
| React JS | Met | `package.json` — React 19; all UI in `src/components/`, `src/pages/` |
| Component-based architecture | Met | Feature folders: `layout/`, `dashboard/`, `calendar/`, `home/`, `developers/`, `ui/` |
| State management (Context API or Redux) | Met | **React Context API** — `src/context/AppContext.jsx` (`AppProvider`, `useAppContext`); **Zustand** — `src/store/useStore.js`, `useAuthStore.js` |
| Reusable components | Met | `src/components/ui/`, shared `BentoCard`, `ItemModal`, etc. |
| React Router | Met | `src/App.jsx` — `BrowserRouter`, routes for Home, Dashboard, Calendar, Support, Developers |
| External API | Met | **Quotable.io** — `src/lib/quotesApi.js` (`fetch` to `api.quotable.io`) |
| Responsive CSS framework | Met | **Tailwind CSS v4** — utility classes, breakpoints (`sm:`, `md:`, `xl:`) throughout |
| ES6+ syntax | Met | Modules, arrow functions, destructuring, async/await, optional chaining |
| Code organization | Met | `pages/`, `components/`, `store/`, `lib/`, `utils/constants/`, `hooks/` |

## Functional requirements

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Project scope features | Met | Tasks, calendar, mood, Pomodoro, quotes, onboarding, academic subjects |
| User interactions & forms | Met | `TaskManager`, `ItemModal`, `MoodTracker`, `SettingsModal`, `OnboardingModal` |
| Authentication | Met | Firebase Google sign-in — `useAuthStore.js`, `SignInPage`, CICS email validation |
| CRUD | Met | Tasks/events: `addTask`, `updateTask`, `deleteTask`, `toggleTaskStatus` in `useStore.js`; calendar `ItemModal` |
| Error handling & validation | Met | Form errors, past-date validation (`timeManagement.js`), auth domain checks, quote API fallbacks |
| Async data | Met | `fetchQuoteForMood`, Firestore sync (`firestoreSync.js`) |
| Reusable components | Met | Shared UI and dashboard modules; constants in `utils/constants/` |
| Developers page (names, pictures, sources) | Met | `/developers` — `DevelopersPage.jsx`, photos, roles, **photo source** per card, **Project sources** section |

## Rubric alignment (60 pts)

| Criterion | Weight | Score (0–5) | Weighted |
|-----------|--------|-------------|----------|
| Technical implementation | ×3 | 5 | 15 / 15 |
| UI/UX implementation | ×3 | 5 | 15 / 15 |
| Functionality & features | ×5 | 5 | 25 / 25 |
| Developer's page | ×1 | 5 | 5 / 5 |
| **Total** | | | **60 / 60** |

*Note: The rubric’s “Excellent” row for Developer’s page appears to contain a typo (“does not load”). This project targets the intended bar: page loads, team photos and names display, and sources are documented.*
