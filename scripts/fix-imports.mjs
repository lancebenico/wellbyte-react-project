import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = path.join(root, 'src')

/** @param {string} dir */
function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name)
    if (name.isDirectory()) walk(p, files)
    else if (/\.(jsx?|tsx?)$/.test(name.name)) files.push(p)
  }
  return files
}

const importReplacements = [
  // Pages & App — component paths
  ["from '../components/ui/PageTransition'", "from '../components/ui/layout/PageTransition'"],
  ["from '../components/PageHero'", "from '../components/ui/layout/PageHero'"],
  ["from '../components/PageTransition'", "from '../components/ui/layout/PageTransition'"],
  ["from '../components/TaskManager'", "from '../components/dashboard/TaskManager'"],
  ["from '../components/MoodTracker'", "from '../components/dashboard/MoodTracker'"],
  ["from '../components/FocusTimer'", "from '../components/dashboard/FocusTimer'"],
  ["from '../components/UpcomingDueList'", "from '../components/dashboard/UpcomingDueList'"],
  ["from '../components/WellnessQuote'", "from '../components/dashboard/WellnessQuote'"],
  ["from '../components/BentoCard'", "from '../components/dashboard/BentoCard'"],
  ["from '../components/DeveloperCard'", "from '../components/developers/DeveloperCard'"],
  ["from '../components/LandingFeatureCard'", "from '../components/home/LandingFeatureCard'"],
  ["from '../components/InstitutionLogos'", "from '../components/home/InstitutionLogos'"],
  ["from '../components/ui/AboutSection'", "from '../components/home/AboutSection'"],
  ["from './components/OnboardingModal'", "from './components/auth/OnboardingModal'"],
  ["from './components/ScrollRestoration'", "from './components/layout/ScrollRestoration'"],
  // App relative
  ["from './components/OnboardingModal'", "from './components/auth/OnboardingModal'"],
]

const componentCrossRefs = [
  // dashboard
  [/from '\.\/SettingsModal'/g, "from '../profile/SettingsModal'"],
  // auth
  [/from '\.\/AcademicProfileFields'/g, "from '../profile/AcademicProfileFields'"],
  // calendar
  [/from '\.\.\/TaskAcademicFields'/g, "from '../dashboard/TaskAcademicFields'"],
  // layout Navbar (in layout folder)
  [/from '\.\.\/SettingsModal'/g, "from '../../profile/SettingsModal'"],
]

const depth2Folders = ['dashboard', 'profile', 'home', 'developers', 'auth', 'calendar', 'layout']
const depth3Folders = ['ui/buttons', 'ui/inputs', 'ui/feedback', 'ui/data-display', 'ui/layout']

for (const file of walk(src)) {
  let content = fs.readFileSync(file, 'utf8')
  let changed = false

  for (const [a, b] of importReplacements) {
    if (content.includes(a)) {
      content = content.split(a).join(b)
      changed = true
    }
  }

  const rel = path.relative(path.join(src, 'components'), file)
  const parts = rel.split(path.sep)
  const folder = parts[0]

  if (depth2Folders.includes(folder) && parts.length >= 2) {
    const before = content
    content = content
      .replace(/from '\.\.\/store\//g, "from '../../store/")
      .replace(/from '\.\.\/lib\//g, "from '../../lib/")
      .replace(/from '\.\.\/utils\//g, "from '../../utils/")
      .replace(/from '\.\.\/pages\//g, "from '../../pages/")
      .replace(/from '\.\.\/assets\//g, "from '../../assets/")
    if (content !== before) changed = true

    for (const [re, rep] of componentCrossRefs) {
      if (re.test(content)) {
        content = content.replace(re, rep)
        changed = true
      }
    }
  }

  if (folder === 'ui' && depth3Folders.some((d) => rel.startsWith(d))) {
    const before = content
    content = content
      .replace(/from '\.\.\/\.\.\/utils\//g, "from '../../../utils/")
      .replace(/from '\.\.\/\.\.\/lib\//g, "from '../../../lib/")
    if (content !== before) changed = true
  }

  if (changed) fs.writeFileSync(file, content)
}

console.log('Import paths updated.')
