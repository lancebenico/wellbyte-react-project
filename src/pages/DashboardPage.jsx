import { createElement } from 'react'
import { CalendarCheck, CheckCircle2, Clock3, HeartPulse, ListChecks } from 'lucide-react'
import PageTransition from '../components/ui/layout/PageTransition'
import PageWrapper from '../components/layout/PageWrapper'
import PageHero, { HeroStat } from '../components/ui/layout/PageHero'
import BentoCard from '../components/dashboard/BentoCard'
import TaskManager from '../components/dashboard/TaskManager'
import MoodTracker from '../components/dashboard/MoodTracker'
import FocusTimer from '../components/dashboard/FocusTimer'
import UpcomingDueList from '../components/dashboard/UpcomingDueList'
import WellnessQuote from '../components/dashboard/WellnessQuote'
import { PAGE_COPY } from '../utils/constants/pages'
import useStore from '../store/useStore'
import { getTaskSummary } from '../lib/taskStats'

export default function DashboardPage() {
  const copy = PAGE_COPY.dashboard
  const tasks = useStore((s) => s.tasks)
  const summary = getTaskSummary(tasks)

  return (
    <PageTransition>
      <PageWrapper maxWidth="max-w-7xl" className="bg-[#faf9f7]">
        <PageHero
          eyebrow={copy.eyebrow}
          title="Your calmer command center for tasks, mood, and focus."
          subtitle="Plan deadlines, break large projects into manageable steps, run mindful Pomodoro sessions, and reflect on your mood in one organized place."
          icon={HeartPulse}
          placement="center"
          asideLabel="Today's rhythm"
          asideChildren={
            <>
              <HeroStat icon={CalendarCheck} value={summary.dueThisWeek} label="Due in 7 days" />
              <div className="rounded-xl border border-white/10 bg-white/12 p-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <div className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-cics-red">
                    <ListChecks className="h-4 w-4" aria-hidden />
                  </span>
                  <p className="text-sm font-semibold leading-snug text-white/88">
                    Check what is due, choose one clear next step, then log your mood before the day runs ahead of you.
                  </p>
                </div>
              </div>
            </>
          }
        />

        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
          {[
            { label: 'Total items', value: summary.total, icon: ListChecks },
            { label: 'Completed', value: summary.completed, icon: CheckCircle2 },
            { label: 'In progress', value: summary.inProgress, icon: Clock3 },
            { label: 'Due soon', value: summary.dueThisWeek, icon: CalendarCheck },
            { label: 'Overdue', value: summary.overdue, icon: HeartPulse },
          ].map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl border border-cics-red/8 bg-white px-4 py-3 shadow-[0_10px_30px_rgba(74,15,24,0.05)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cics-red-light text-cics-red">
                  {createElement(Icon, { className: 'h-4 w-4', 'aria-hidden': true })}
                </span>
                <div>
                  <p className="text-xl font-bold leading-none text-text-primary tabular-nums">{value}</p>
                  <p className="mt-1 text-[11px] font-semibold text-text-muted">{label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 auto-rows-min w-full min-w-0">
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
        </div>
      </PageWrapper>
    </PageTransition>
  )
}
