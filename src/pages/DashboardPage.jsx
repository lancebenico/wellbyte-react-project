import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import BentoCard from '../components/BentoCard'
import TaskManager from '../components/TaskManager'
import MoodTracker from '../components/MoodTracker'
import FocusTimer from '../components/FocusTimer'
import UpcomingDueList from '../components/UpcomingDueList'
import WellnessQuote from '../components/WellnessQuote'
import { staggerContainer } from '../lib/animations'

export default function DashboardPage() {
  return (
    <PageTransition>
      <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-cics-red mb-2">
              Wellness Workspace
            </p>
            <h1 className="text-3xl sm:text-[2rem] font-semibold tracking-tight text-text-primary mb-2">
              Your Wellness and Time Dashboard
            </h1>
            <p className="text-[15px] text-text-secondary max-w-xl leading-relaxed">
              Plan deadlines with care, break large projects into manageable steps, run mindful Pomodoro
              sessions, and reflect on your mood—so you can sustain both excellence and well-being
              throughout the term. Visit Home for your daily summary and quote.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 auto-rows-min"
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

            <BentoCard span="lg:col-span-8" delay={0.17} variant="pink" title="Upcoming Schedule">
              <UpcomingDueList />
            </BentoCard>

            <BentoCard span="lg:col-span-12" delay={0.18} variant="yellow" title="Daily Inspiration">
              <WellnessQuote />
            </BentoCard>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
