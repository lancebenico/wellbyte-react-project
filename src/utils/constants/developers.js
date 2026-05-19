import { DEVELOPER_IMAGE_PATHS } from './assets'

export const DEVELOPERS = [
  {
    name: 'Joaquin Adriano',
    initials: 'JA',
    image: DEVELOPER_IMAGE_PATHS.adriano,
    description: 'Helped with backend and frontend development.',
  },
  {
    name: 'Lance Benico',
    initials: 'LB',
    image: DEVELOPER_IMAGE_PATHS.benico,
    description: 'Worked on coding and project documentation.',
  },
  {
    name: 'Kristine Cabanada',
    initials: 'KC',
    image: DEVELOPER_IMAGE_PATHS.cabanada,
    description: 'Designed the UI, helped with backend, and created presentations.',
  },
  {
    name: 'Warren Chua',
    initials: 'WC',
    image: DEVELOPER_IMAGE_PATHS.chua,
    description: 'Contributed to backend development and made diagrams.',
  },
]

/** Professional references for institutional and campus imagery used in WellByte. */
export const PROFESSIONAL_IMAGE_REFERENCES = [
  {
    name: 'University of Santo Tomas',
    url: 'https://www.ust.edu.ph/',
  },
  {
    name: 'UST College of Information and Computing Sciences',
    url: 'https://www.ust.edu.ph/information-and-computing-sciences/',
  },
  {
    name: 'The Varsitarian (Facebook)',
    url: 'https://www.facebook.com/varsitarian',
  },
  {
    name: 'UST ICSSC (Facebook)',
    url: 'https://www.facebook.com/usticssc',
  },
]

/** Libraries and APIs referenced in WellByte. */
export const PROJECT_TECH_REFERENCES = [
  {
    name: 'Lucide React',
    url: 'https://lucide.dev/',
    purpose: 'Icon set used across navigation, dashboard, and UI components',
  },
  {
    name: 'Quotable API',
    url: 'https://github.com/lukePeavey/quotable',
    purpose: 'External REST API for mood-aligned daily quotes on Home and Dashboard',
  },
]
