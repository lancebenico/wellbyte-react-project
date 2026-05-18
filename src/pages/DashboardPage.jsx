import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import BentoCard from '../components/BentoCard'
import StatsBar from '../components/StatsBar'
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-muted mb-2">
              Overview
            </p>
            <h1 className="text-3xl sm:text-[2rem] font-semibold tracking-tight text-text-primary mb-2">
              Wellness & time dashboard
            </h1>
            <p className="text-[15px] text-text-secondary max-w-xl leading-relaxed">
              Plan deadlines, break big projects into steps, run mindful Pomodoro blocks, and track mood — without burning
              out.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.08 }}
            className="mb-8"
          >
            <StatsBar />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 auto-rows-min"
          >
            <BentoCard span="lg:col-span-7" delay={0.1} variant="pink" title="Tasks & events">
              <TaskManager />
            </BentoCard>

            <BentoCard span="lg:col-span-5" delay={0.14} variant="blue" title="Mood">
              <MoodTracker />
            </BentoCard>

            <BentoCard span="lg:col-span-4" delay={0.16} variant="lavender" title="Mindful Pomodoro">
              <FocusTimer />
            </BentoCard>

            <BentoCard span="lg:col-span-8" delay={0.17} variant="pink" title="Schedule">
              <UpcomingDueList />
            </BentoCard>

            <BentoCard span="lg:col-span-12" delay={0.18} variant="yellow" title="Daily quote">
              <WellnessQuote />
            </BentoCard>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
