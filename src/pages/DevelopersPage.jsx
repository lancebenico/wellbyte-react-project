import { Code2, GraduationCap, Heart, UsersRound } from 'lucide-react'
import PageTransition from '../components/ui/layout/PageTransition'
import PageWrapper from '../components/layout/PageWrapper'
import PageHero, { HeroStat } from '../components/ui/layout/PageHero'
import DeveloperCard from '../components/developers/DeveloperCard'
import ProjectSourcesSection from '../components/developers/ProjectSourcesSection'
import { DEVELOPERS } from '../utils/constants/developers'

export default function DevelopersPage() {
  return (
    <PageTransition>
      <PageWrapper maxWidth="max-w-7xl" paddingBottom="pb-16 md:pb-20" className="bg-[#faf9f7]">
        <PageHero
          eyebrow="People behind WellByte"
          title="Meet the team building a kinder way to stay productive."
          subtitle="WellByte was created by CICS students with a shared goal: help classmates manage academic responsibilities while protecting the habits that keep them well."
          icon={Code2}
          placement="center"
          asideLabel="Project pulse"
          asideChildren={
            <>
              <HeroStat icon={UsersRound} value={String(DEVELOPERS.length).padStart(2, '0')} label="Student developers" />
              <HeroStat icon={Heart} value="SDG 3" label="Good Health and Well-being" />
              <HeroStat icon={GraduationCap} value="SDG 4" label="Quality Education" />
            </>
          }
        />

        <div className="grid grid-cols-1 gap-5 mb-10 sm:mb-14 w-full min-w-0 sm:grid-cols-2 xl:grid-cols-4">
          {DEVELOPERS.map((dev) => (
            <DeveloperCard key={dev.name} developer={dev} />
          ))}
        </div>

        <ProjectSourcesSection />
      </PageWrapper>
    </PageTransition>
  )
}
