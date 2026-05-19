# WellByte — Presentation Script  
## System Architecture & APIs

**Audience:** Professor / panel  
**Suggested length:** 8–10 minutes  
**Tip:** Pair each section with one slide (diagram or bullet list). Speak in your own words; this script is a guide, not a script to read word-for-word.

---

## 1. Opening (≈45 seconds)

> Good [morning/afternoon], [Professor’s name].  
>  
> We are [team names], and today we will present **WellByte** — a web application for UST CICS students that combines **task planning**, **calendar scheduling**, **mood tracking**, and **wellness tools** in one place.  
>  
> Our focus for this segment is **how the system is built** — the **architecture** — and the **external APIs** we integrated. We will walk through the layers of the app, how data moves through the system, and which services we connect to over the network.

**[Slide suggestion: Title — WellByte: System Architecture & APIs]**

---

## 2. What WellByte Is (≈1 minute)

> WellByte is a **single-page application**, or SPA, built with **React** and bundled with **Vite**. It runs entirely in the browser after the user loads the site. There is no traditional server-rendered PHP or JSP layer — instead, the browser runs our React code, and we talk to **cloud services** when we need authentication, storage, or third-party content.  
>  
> The main user flows are: sign in with a **UST CICS Google account**, manage **tasks and events** on the dashboard and calendar, log **mood**, use a **Pomodoro timer**, and see a **daily quote** on the home page. All of this is organized into routes like Home, Dashboard, Calendar, Support, and Developers.

**[Slide suggestion: Screenshot of Home or Dashboard + bullet list of features]**

---

## 3. High-Level System Architecture (≈2 minutes)

> At the highest level, WellByte follows a **layered, client-centric architecture**:

| Layer | Role | Technologies |
|-------|------|----------------|
| **Presentation** | Pages, UI components, user interaction | React, React Router, Tailwind CSS, Framer Motion |
| **Application state** | Shared data and actions | Zustand stores, React Context |
| **Business logic** | Rules, validation, helpers | `src/lib/` modules |
| **Persistence (local)** | Fast offline-first storage | Browser `localStorage` (per user) |
| **Persistence (cloud)** | Sync across devices | Firebase Firestore |
| **External services** | Auth and third-party data | Firebase Auth (Google), Quotable API |

> The browser is the **center** of the system. React components **do not** talk to Firestore or Quotable directly from every button click in a scattered way — we route logic through **stores** and **service modules** in `src/lib/`, which keeps the design maintainable and testable.

**[Slide suggestion: Architecture diagram — Browser → React App → (localStorage | Firestore | Quotable | Firebase Auth)]**

### Talking points for the diagram

1. **User** interacts with the **React UI** (presentation layer).  
2. **Zustand** holds tasks, mood entries, profile, and quote state.  
3. **localStorage** saves data immediately under a key like `wellbyte-{userId}`.  
4. **Firestore** syncs the same data to the cloud when the user is signed in.  
5. **Firebase Auth** verifies identity via Google.  
6. **Quotable API** supplies quotes; if it fails, we use **built-in fallback quotes** in our code.

---

## 4. Frontend Structure (≈1.5 minutes)

> Our React project is organized by **responsibility**, not by file type alone:

- **`src/pages/`** — One component per major screen (Home, Dashboard, Calendar, etc.). These compose smaller pieces and connect to stores.  
- **`src/components/`** — Reusable UI grouped by feature: `layout/`, `dashboard/`, `calendar/`, `auth/`, `profile/`, `home/`, `developers/`, and shared `ui/`.  
- **`src/store/`** — Global state: `useAuthStore` for login, `useStore` for app data, `useThemeStore` for light/dark mode.  
- **`src/context/`** — `AppContext` exposes session-facing values (user, profile, display name) via the **React Context API**.  
- **`src/lib/`** — Pure logic: Firebase setup, Firestore sync, quote fetching, task normalization, calendar helpers, date validation.  
- **`src/hooks/`** — Custom hooks such as live clock and document title updates.

> **React Router** handles **client-side routing**. When the user clicks “Dashboard,” we do not reload the whole page — React swaps the page component while the navbar stays mounted. Routes are defined in `App.jsx` inside an `AuthGuard` so only signed-in users see the main app.

**[Slide suggestion: Folder tree or block diagram of src/ layers]**

---

## 5. State Management & Data Flow (≈1.5 minutes)

> We use **two complementary patterns** for state:

**Zustand (primary data store)**  
- `useStore` — tasks, mood entries, academic profile, Pomodoro log, daily quote.  
- `useAuthStore` — current user, loading, sign-in/sign-out.  
- `useThemeStore` — light/dark theme, persisted in `localStorage`.  
- Zustand’s **persist middleware** writes tasks, mood, and profile to **localStorage** automatically.

**React Context (`AppContext`)**  
- Wraps the app and provides `user`, `profile`, and `preferredDisplayName` to components like the navbar and home page without every component importing both stores.

> **Typical CRUD flow for a task:**  
> 1. User submits a form in `TaskManager` or `ItemModal`.  
> 2. Component calls `addTask` or `updateTask` on `useStore`.  
> 3. Zustand updates in-memory state and persists to **localStorage**.  
> 4. `firestoreSync` detects the change and **debounces** a write to Firestore (~900 ms).  
> 5. On another device, Firestore’s **real-time listener** pushes updates back; we **merge** profile data carefully so local edits are not lost.

**[Slide suggestion: Sequence diagram — User → Component → Zustand → localStorage → Firestore]**

---

## 6. Authentication Architecture (≈1 minute)

> Authentication is handled by **Firebase Authentication** with **Google** as the provider.

**Flow in plain language:**  
1. User clicks “Sign in with Google” on `SignInPage`.  
2. We call `signInWithPopup` from the Firebase SDK — Google’s login window opens.  
3. Firebase returns a user object (UID, email, display name, photo).  
4. Our `onAuthStateChanged` listener runs on every app load.  
5. We **validate** the email: only addresses matching `*.cics@ust.edu.ph` are allowed.  
6. If invalid, we sign the user out and show an error.  
7. If valid, `AuthGuard` renders the main app; otherwise it shows the sign-in page.

> We do **not** implement our own password database. Google and Firebase handle credentials; we only enforce the **CICS email rule** in the client after login.

**[Slide suggestion: Auth flow diagram — SignIn → Firebase → Google → AuthGuard → App]**

---

## 7. APIs Used in the Project (≈2.5 minutes)

> WellByte integrates **three external API/service areas**. I will describe each one: what it does, how we call it, and what happens if it fails.

---

### API 1 — Firebase Authentication (Google OAuth)

| Item | Detail |
|------|--------|
| **Provider** | Google via Firebase Auth |
| **Purpose** | Secure sign-in for UST CICS students |
| **Configuration** | `src/lib/firebase.js` — API keys from `.env` (`VITE_FIREBASE_*`) |
| **How we call it** | Firebase JS SDK: `signInWithPopup`, `onAuthStateChanged`, `signOut` |
| **Data we receive** | `uid`, `email`, `displayName`, `photoURL` |
| **Failure handling** | Popup closed → no error shown; wrong domain → sign out + message; missing config → sign-in page explains setup |

> **Why Firebase:** It gives us industry-standard OAuth without building our own auth server, and it pairs naturally with Firestore for the same user ID.

---

### API 2 — Cloud Firestore (Firebase)

| Item | Detail |
|------|--------|
| **Type** | NoSQL document database (REST/WebSocket via Firebase SDK) |
| **Purpose** | Cloud backup and sync of user data across browsers/devices |
| **Document path** | `users/{uid}` — one document per signed-in user |
| **Fields stored** | `tasks`, `moodEntries`, `pomodoroLog`, `profile`, `updatedAt` |
| **How we call it** | `setDoc` (write), `onSnapshot` (real-time read) in `src/lib/firestoreSync.js` |
| **Sync strategy** | **Listen** on login; **debounced push** on local edits; **merge** profile when remote arrives |
| **Failure handling** | App still works from localStorage; errors logged to console; profile save can show sync warning |

> **Important design choice:** Local storage is **first** for speed; Firestore is **second** for sync. The user can use the app offline with last-known data; when online, changes reconcile.

**Example spoken line:**  
> “When a student adds a task, it appears instantly from Zustand and localStorage. About a second later, we push the same JSON document to Firestore under their user ID. If they open WellByte on another laptop, the snapshot listener downloads that document and merges it into the store.”

---

### API 3 — Quotable API (External REST API)

| Item | Detail |
|------|--------|
| **Base URL** | `https://api.quotable.io` |
| **Endpoint used** | `GET /quotes/random?tags={tag1|tag2|tag3}` |
| **Purpose** | Mood-aligned inspirational quotes on Home and Dashboard |
| **Implementation** | `src/lib/quotesApi.js` — native `fetch()` |
| **Logic** | Map mood (1–5) → tag set → request random quote → display `content` and `author` |
| **Failure handling** | If network fails or API is down → **curated fallback quotes** in code (`MOOD_FALLBACKS`) |

**Example spoken line:**  
> “This is our required **third-party REST API**. We use the browser’s Fetch API — no extra axios dependency. The quote changes when the user logs a new mood or clicks refresh. If Quotable is unavailable, the user still sees a quote from our local fallback list, so the feature never appears broken.”

**[Slide suggestion: Table of three APIs — Auth | Firestore | Quotable — with columns: Purpose, Method, Fallback]**

---

## 8. Internal “APIs” (Not External, but Worth Mentioning)

> If the professor asks about APIs beyond HTTP services:

- **`normalizeItem()`** in `src/lib/items.js` — internal contract for task/event shape (CRUD consistency).  
- **`fetchQuoteForMood()`** — abstraction over Quotable + fallbacks; components only call `useStore().fetchQuote()`.  
- **`startFirestoreSync()`** — single entry point for cloud sync; `App.jsx` wires it once per login.

> This is **modular design**: UI depends on stores and lib functions, not on raw Firebase or fetch URLs scattered in components.

---

## 9. Security & Validation (≈45 seconds)

> Briefly on quality and safety:
- **Auth:** CICS email pattern enforced after Google sign-in.  
- **Firestore:** Data scoped per `uid`; rules should restrict reads/writes to `request.auth.uid` (mention your `firestore.rules` if deployed).  
- **Input validation:** Past due dates blocked on new tasks/events; required fields on forms; academic profile required before subject-based tasks.  
- **Secrets:** Firebase keys in `.env`, not committed to Git.

---

## 10. Closing (≈45 seconds)

> To summarize: WellByte is a **React SPA** with a clear **layered architecture** — UI, state, business logic, local persistence, and cloud sync. We use **Firebase Auth** for Google sign-in, **Firestore** for user data sync, and the **Quotable REST API** for daily quotes, with local fallbacks for resilience.  
>  
> This design keeps the app **fast** (local-first), **portable** (sync across devices), and **maintainable** (logic centralized in `src/lib` and stores).  
>  
> Thank you. We are happy to take questions on the architecture, APIs, or any part of the demo.

**[Slide suggestion: Summary bullets + “Questions?”]**

---

## Appendix A — Likely Professor Questions & Short Answers

**Q: Why Zustand instead of Redux?**  
> Zustand is lighter and fits our SPA size. We also use React Context for session display state to meet Context API requirements.

**Q: Why localStorage and Firestore?**  
> localStorage gives instant saves and offline use; Firestore adds multi-device sync without us running our own backend.

**Q: Is Quotable the only external REST API?**  
> Yes for public HTTP content. Firebase uses its own SDK (not plain REST from our code), but it is still an external cloud API/service.

**Q: What happens offline?**  
> Tasks and mood work from localStorage. Quotes use fallbacks if fetch fails. Firestore sync resumes when online.

**Q: How do you prevent non-CICS users?**  
> Regex on email after Firebase login; invalid users are signed out immediately.

---

## Appendix B — Suggested Slide Order (10 slides)

1. Title — WellByte  
2. Problem & features  
3. High-level architecture diagram  
4. Frontend folder structure  
5. State management (Zustand + Context)  
6. Data flow / CRUD sequence  
7. Firebase Auth flow  
8. Firestore sync  
9. Quotable API + fallbacks  
10. Summary & Q&A  

---

## Appendix C — One-Paragraph Version (if time is only 3 minutes)

> WellByte is a React single-page app for UST CICS students. The presentation layer uses pages and reusable components with React Router for navigation. Application state lives in Zustand stores with React Context for session info, and business rules sit in `src/lib`. User data is saved first to localStorage for speed, then synced to Firebase Firestore per user ID. Sign-in uses Firebase Authentication with Google, restricted to CICS emails. Daily quotes come from the Quotable.io REST API via fetch, with local fallbacks if the API is unavailable. Together, this is a client-heavy, cloud-backed architecture without a custom backend server.
