import { Code2, Heart, Sparkles } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import DeveloperCard from '../components/DeveloperCard'

const developers = [
  {
    name: 'Joaquin Adriano',
    initials: 'JA',
    image: '/pictures/adriano.png',
    accentColor: '#9b2335',
    avatarGradient: 'linear-gradient(135deg, #e8c4c8, #6b1524)',
  },
  {
    name: 'Lance Benico',
    initials: 'LB',
    image: '/pictures/benico.jfif',
    accentColor: '#6b1524',
    avatarGradient: 'linear-gradient(135deg, #fdf2f3, #4a0f18)',
  },
  {
    name: 'Kristine Cabanada',
    initials: 'KC',
    image: '/pictures/cabanada.png',
    accentColor: '#9b2335',
    avatarGradient: 'linear-gradient(135deg, #fae8ea, #9b2335)',
  },
  {
    name: 'Warren Chua',
    initials: 'WC',
    image: '/pictures/chua.jpg',
    accentColor: '#4a0f18',
    avatarGradient: 'linear-gradient(135deg, #e8c4c8, #4a0f18)',
  },
]

export default function DevelopersPage() {
  return (
    <PageTransition>
      <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14 sm:mb-16">
            <div className="w-12 h-12 rounded-md bg-cics-red flex items-center justify-center mx-auto mb-6">
              <Code2 className="w-6 h-6 text-white" aria-hidden />
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-cics-red mb-2">
              People
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary mb-4">
              Meet the Team
            </h1>
            <p className="text-[15px] text-text-secondary max-w-2xl mx-auto leading-relaxed">
              The people behind WellByte — focused on student life, well-being, and the spirit of{' '}
              <span className="text-emerald-700 font-medium">UN SDG 3</span> and{' '}
              <span className="text-rose-700 font-medium">SDG 4</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
            {developers.map((dev) => (
              <DeveloperCard key={dev.name} developer={dev} />
            ))}
          </div>

          <div className="retro-window overflow-hidden">
            <div className="retro-titlebar bg-[#fafafa]">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">
                Mission
              </span>
            </div>
            <div className="p-8 sm:p-10 text-center">
              <div className="flex items-center justify-center gap-2 mb-4 text-text-muted">
                <Heart className="w-4 h-4" />
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-3">
                Built With Purpose
              </h2>
              <p className="text-[15px] text-text-secondary max-w-xl mx-auto leading-relaxed">
                WellByte is more than a productivity tool — it is a commitment to student well-being.
                Every feature is designed with the UN Sustainable Development Goals in mind,
                promoting both quality education and good health.
              </p>
              <div className="flex justify-center gap-2 mt-8 flex-wrap">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <Heart className="w-3.5 h-3.5" /> SDG 3 — Good Health
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium bg-cics-red-light text-cics-red-dark border border-cics-red-muted">
                  <Sparkles className="w-3.5 h-3.5" /> SDG 4 — Quality Education
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
