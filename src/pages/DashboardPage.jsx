import { motion } from 'framer-motion'
import PageTransition from '../components/ui/PageTransition'
import PageWrapper from '../components/layout/PageWrapper'
import SectionHeader from '../components/common/SectionHeader'
import BentoCard from '../components/BentoCard'
import TaskManager from '../components/TaskManager'
import MoodTracker from '../components/MoodTracker'
import FocusTimer from '../components/FocusTimer'
import UpcomingDueList from '../components/UpcomingDueList'
import WellnessQuote from '../components/WellnessQuote'
import { staggerContainer } from '../lib/animations'
import { PAGE_COPY } from '../utils/constants/pages'

export default function DashboardPage() {
  const copy = PAGE_COPY.dashboard

  return (
    <PageTransition>
      <PageWrapper>
        <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 auto-rows-min w-full min-w-0"
        >
          <BentoCard span="lg:col-span-7" delay={0.1} variant="pink" title="Tasks and Events">
            <TaskManager />
          </BentoCard>

          <BentoCard span="lg:col-span-5" delay={0.14} variant="blue" title="Mood Reflection">
            <MoodTracker />
          </BentoCard>

          <BentoCard span="lg:col-span-4" delay={0.16} variant="lavender" title="Mindful Pomodoro">
            <FocusTimer />
          </BentoCard>

          <BentoCard span="lg:col-span-4" delay={0.18} variant="yellow" title="Upcoming Deadlines">
            <UpcomingDueList />
          </BentoCard>

          <BentoCard span="lg:col-span-4" delay={0.2} variant="pink" title="Wellness Quote">
            <WellnessQuote />
          </BentoCard>
        </motion.div>
      </PageWrapper>
    </PageTransition>
  )
}
