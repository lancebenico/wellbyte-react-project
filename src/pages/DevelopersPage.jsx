import { Code2, Heart, Sparkles } from 'lucide-react'
import PageTransition from '../components/ui/PageTransition'
import PageWrapper from '../components/layout/PageWrapper'
import SectionHeader from '../components/common/SectionHeader'
import DeveloperCard from '../components/DeveloperCard'
import { DEVELOPERS, DEVELOPERS_COPY } from '../utils/constants/developers'

export default function DevelopersPage() {
  return (
    <PageTransition>
      <PageWrapper maxWidth="max-w-5xl" paddingBottom="pb-16 md:pb-20">
        <div className="text-center mb-10 sm:mb-12">
          <div className="w-12 h-12 rounded-md bg-cics-red flex items-center justify-center mx-auto mb-6">
            <Code2 className="w-6 h-6 text-white" aria-hidden />
          </div>
          <SectionHeader
            eyebrow={DEVELOPERS_COPY.eyebrow}
            title={DEVELOPERS_COPY.title}
            align="center"
            className="mb-0"
          />
          <p className="text-[clamp(0.875rem,2vw,0.9375rem)] text-text-secondary max-w-2xl mx-auto leading-relaxed mt-4 px-2">
            The people behind WellByte — focused on student life, well-being, and the spirit of{' '}
            <span className="text-emerald-700 font-medium">UN SDG 3</span> and{' '}
            <span className="text-rose-700 font-medium">SDG 4</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 sm:mb-14 w-full min-w-0">
          {DEVELOPERS.map((dev) => (
            <DeveloperCard key={dev.name} developer={dev} />
          ))}
        </div>

        <div className="retro-window-pink overflow-hidden">
          <div className="retro-titlebar">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cics-red" />
              {DEVELOPERS_COPY.missionTitle}
            </span>
          </div>
          <div className="p-5 sm:p-8">
            <p className="text-sm sm:text-[15px] text-text-secondary leading-relaxed flex items-start gap-2">
              <Heart className="w-4 h-4 text-cics-red shrink-0 mt-0.5" aria-hidden />
              {DEVELOPERS_COPY.missionBody}
            </p>
          </div>
        </div>
      </PageWrapper>
    </PageTransition>
  )
}
