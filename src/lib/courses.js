/** CICS curriculum keyed by year + semester (e.g. 1Y1S, 3YSUM). */

export const YEAR_LEVEL_OPTIONS = [
  { value: '1', label: '1st Year' },
  { value: '2', label: '2nd Year' },
  { value: '3', label: '3rd Year' },
  { value: '4', label: '4th Year' },
]

export const SEMESTER_OPTIONS = [
  { value: '1', label: '1st Sem' },
  { value: '2', label: '2nd Sem' },
  { value: 'summer', label: 'Summer Term' },
]

export const COURSE_LIST_BY_TERM = {
  '1Y1S': [
    'VALUES EDUCATION',
    'INTRODUCTION TO COMPUTING',
    'COMPUTER PROGRAMMING I (FUNDAMENTALS OF PROGRAMMING - IMPERATIVE)',
    'CHRISTIAN VISION OF THE HUMAN PERSON',
    'PHYSICAL ACTIVITIES TOWARD HEALTH AND FITNESS 1: MOVEMENT COMPETENCY TRAINING',
    'UNDERSTANDING THE SELF',
    'MATHEMATICS IN THE MODERN WORLD',
    'ART APPRECIATION',
    'SCIENCE, TECHNOLOGY, AND SOCIETY',
  ],
  '1Y2S': [
    'DISCRETE STRUCTURES',
    'COMPUTER PROGRAMMING II (INTERMEDIATE PROGRAMMING - OBJECT-ORIENTED)',
    'IT FUNDAMENTALS',
    'HUMAN-COMPUTER INTERACTION',
    'ENTREPRENEURIAL MIND',
    'CHRISTIAN VISION OF MARRIAGE AND FAMILY',
    'PHYSICAL ACTIVITIES TOWARD HEALTH AND FITNESS 2: EXERCISE-BASED FITNESS ACTIVITIES',
    'PURPOSIVE COMMUNICATION',
    'ETHICS',
  ],
  '2Y1S': [
    'INTRODUCTION TO DATA SCIENCE AND ANALYTICS',
    'DATA STRUCTURES AND ALGORITHMS',
    'INFORMATION MANAGEMENT',
    'APPLICATIONS DEVELOPMENT AND EMERGING TECHNOLOGIES 1 (WEB-FRONT-END)',
    'DATA COMMUNICATIONS & NETWORKING I',
    'DATA COMMUNICATIONS & NETWORKING I (LAB)',
    'CHRISTIAN VISION OF THE CHURCH IN SOCIETY',
    'PHYSICAL ACTIVITIES TOWARD HEALTH AND FITNESS IN DANCE AND RECREATIONAL ACTIVITIES',
  ],
  '2Y2S': [
    'APPLICATIONS DEVELOPMENT AND EMERGING TECHNOLOGIES 2 (ENTERPRISE-BACK-END)',
    'COMPUTER ARCHITECTURE, ORGANIZATION AND LOGIC',
    'COMPUTER ARCHITECTURE, ORGANIZATION AND LOGIC (LAB)',
    'DATA COMMUNICATIONS & NETWORKING II',
    'DATA COMMUNICATIONS & NETWORKING II (LAB)',
    'LIVING THE CHRISTIAN VISION IN THE CONTEMPORARY WORLD',
    'PHYSICAL ACTIVITIES TOWARD HEALTH AND FITNESS IN SPORTS, MARTIAL ARTS, OUTDOOR AND ADVENTURES ACTIVITIES',
    'THE CONTEMPORARY WORLD',
    'READINGS IN PHILIPPINE HISTORY',
    'PANIMULANG PAGSASALIN',
  ],
  '3Y1S': [
    'SOFTWARE ENGINEERING I',
    'APPLICATIONS DEVELOPMENT AND EMERGING TECHNOLOGIES 3 (MOBILE PROGRAMMING)',
    'OPERATING SYSTEMS',
    'SOCIAL AND PROFESSIONAL PRACTICE',
    'ALTERNATIVE OPERATING SYSTEM',
    'NETWORK ADMINISTRATION',
    'NETWORK ADMINISTRATION (LAB)',
    'PROFESSIONAL ELECTIVE 1 (SPECIALIZATION) - ASP.NET',
    'LIFE AND WORKS OF RIZAL',
  ],
  '3Y2S': [
    'SOFTWARE ENGINEERING II',
    'QUANTITATIVE MODELS',
    'SYSTEM ADMINISTRATION',
    'SYSTEM ADMINISTRATION (LAB)',
    'PROFESSIONAL ELECTIVE 2 (SPECIALIZATION) - REACT JS',
    'COMPUTER SECURITY AND INFORMATION ASSURANCE',
    'ELECTIVE III',
  ],
  '3YSUM': [
    'IT CAPSTONE PROJECT I',
  ],
  '4Y1S': [
    'TECHNOPRENEURSHIP',
    'SYSTEM INTEGRATION AND ARCHITECTURE',
    'IT CAPSTONE PROJECT II',
    'PROFESSIONAL ELECTIVE 3 (SPECIALIZATION) - LARAVEL',
    'FREE ELECTIVE',
  ],
  '4Y2S': [
    'EMERGING TECHNOLOGIES',
    'PRACTICUM (500)',
    'FIELD TRIP & SEMINARS',
    'PROFESSIONAL ELECTIVE 4 (SPECIALIZATION) - FLUTTER',
  ],
}

export function getTermKey(yearLevel, semester) {
  if (!yearLevel || !semester) return null
  if (semester === 'summer') return `${yearLevel}YSUM`
  return `${yearLevel}Y${semester}S`
}

export function getSubjectsForTerm(yearLevel, semester) {
  const key = getTermKey(yearLevel, semester)
  if (!key) return []
  return COURSE_LIST_BY_TERM[key] ?? []
}

export function isAcademicTermConfigured(profile) {
  if (!profile?.yearLevel || !profile?.semester) return false
  if (profile.semester === 'summer' && profile.yearLevel !== '3') return false
  return true
}

export function formatAcademicTerm(profile) {
  if (!isAcademicTermConfigured(profile)) return null
  const year = YEAR_LEVEL_OPTIONS.find((y) => y.value === profile.yearLevel)?.label ?? ''
  const sem = SEMESTER_OPTIONS.find((s) => s.value === profile.semester)?.label ?? ''
  return `${year} · ${sem}`
}

/** Summer term only applies to 3rd Year in this curriculum. */
export function semesterOptionsForYear(yearLevel) {
  if (yearLevel === '3') return SEMESTER_OPTIONS
  return SEMESTER_OPTIONS.filter((s) => s.value !== 'summer')
}
