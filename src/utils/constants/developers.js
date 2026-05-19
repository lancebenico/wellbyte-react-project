import { DEVELOPER_IMAGE_PATHS } from './assets'

export const DEVELOPERS = [
  {
    name: 'Joaquin Adriano',
    initials: 'JA',
    image: DEVELOPER_IMAGE_PATHS.adriano,
    accentColor: '#9b2335',
    avatarGradient: 'linear-gradient(135deg, #e8c4c8, #6b1524)',
    description: 'Helped with backend and frontend development.',
    photoSource: 'Original team photograph — WellByte project assets (public/pictures/adriano.png)',
  },
  {
    name: 'Lance Benico',
    initials: 'LB',
    image: DEVELOPER_IMAGE_PATHS.benico,
    accentColor: '#6b1524',
    avatarGradient: 'linear-gradient(135deg, #fdf2f3, #4a0f18)',
    description: 'Worked on coding and project documentation.',
    photoSource: 'Original team photograph — WellByte project assets (public/pictures/benico.jfif)',
  },
  {
    name: 'Kristine Cabanada',
    initials: 'KC',
    image: DEVELOPER_IMAGE_PATHS.cabanada,
    accentColor: '#9b2335',
    avatarGradient: 'linear-gradient(135deg, #fae8ea, #9b2335)',
    description: 'Designed the UI, helped with backend, and created presentations.',
    photoSource: 'Original team photograph — WellByte project assets (public/pictures/cabanada.png)',
  },
  {
    name: 'Warren Chua',
    initials: 'WC',
    image: DEVELOPER_IMAGE_PATHS.chua,
    accentColor: '#4a0f18',
    avatarGradient: 'linear-gradient(135deg, #e8c4c8, #4a0f18)',
    description: 'Contributed to backend development and made diagrams.',
    photoSource: 'Original team photograph — WellByte project assets (public/pictures/chua.jpg)',
  },
]

/** External libraries, APIs, and assets used in WellByte (for Developers page attribution). */
export const PROJECT_SOURCES = [
  {
    name: 'React',
    url: 'https://react.dev/',
    purpose: 'Component-based UI framework',
  },
  {
    name: 'React Router',
    url: 'https://reactrouter.com/',
    purpose: 'Client-side routing',
  },
  {
    name: 'Tailwind CSS',
    url: 'https://tailwindcss.com/',
    purpose: 'Responsive layout and styling (CSS framework)',
  },
  {
    name: 'Zustand',
    url: 'https://zustand.docs.pmnd.rs/',
    purpose: 'Application state management (tasks, mood, profile)',
  },
  {
    name: 'Quotable API',
    url: 'https://github.com/lukePeavey/quotable',
    purpose: 'Daily wellness quotes (external REST API)',
  },
  {
    name: 'Firebase Auth & Firestore',
    url: 'https://firebase.google.com/',
    purpose: 'Google sign-in and cloud data sync',
  },
  {
    name: 'Framer Motion',
    url: 'https://www.framer.com/motion/',
    purpose: 'Page and UI animations',
  },
  {
    name: 'Lucide React',
    url: 'https://lucide.dev/',
    purpose: 'Icon set',
  },
]

export const DEVELOPERS_COPY = {
  eyebrow: 'People',
  title: 'Meet the Team',
  subtitle:
    'The people behind WellByte — focused on student life, well-being, and the spirit of UN SDGs 3 and 4.',
  missionTitle: 'Built With Purpose',
  missionBody:
    'WellByte is more than a productivity tool — it is a commitment to student well-being. Every feature is designed with the UN Sustainable Development Goals in mind, promoting both quality education and good health.',
}
