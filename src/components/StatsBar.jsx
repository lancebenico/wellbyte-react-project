import { motion } from 'framer-motion'
import { CheckCircle2, Clock, ListTodo, TrendingUp, AlertTriangle, CalendarClock } from 'lucide-react'
import useStore from '../store/useStore'
import { isTaskOverdue, isDueWithinDays } from '../lib/timeManagement'

export default function StatsBar() {
  const tasks = useStore((s) => s.tasks)
  const moodEntries = useStore((s) => s.moodEntries)

  const total = tasks.length
  const completed = tasks.filter((t) => t.status === 'completed').length
  const inProgress = tasks.filter((t) => t.status === 'in-progress').length
  const avgMood = moodEntries.length > 0
    ? (moodEntries.reduce((sum, e) => sum + e.mood, 0) / moodEntries.length).toFixed(1)
    : '—'

  const open = tasks.filter((t) => t.status !== 'completed')
  const overdue = open.filter((t) => isTaskOverdue(t)).length
  const dueWeek = open.filter((t) => t.dueDate && isDueWithinDays(t, 7, true)).length

  const stats = [
    { label: 'Total items', value: total, icon: ListTodo, wrap: 'bg-[#f0f4f8] text-[#406080]' },
    { label: 'Completed', value: completed, icon: CheckCircle2, wrap: 'bg-[#e8f3ec] text-[#2f6f44]' },
    { label: 'In progress', value: inProgress, icon: Clock, wrap: 'bg-[#f7f3e8] text-[#7a6220]' },
    { label: 'Due (7 days)', value: dueWeek, icon: CalendarClock, wrap: 'bg-sky-50 text-sky-900' },
    { label: 'Overdue', value: overdue, icon: AlertTriangle, wrap: 'bg-red-50 text-red-800' },
    { label: 'Avg mood', value: avgMood, icon: TrendingUp, wrap: 'bg-[#f0f0ef] text-text-secondary' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2 sm:gap-3">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-md border border-black/[0.06] px-3 sm:px-4 py-3 shadow-[0_1px_2px_rgba(15,15,15,0.04)] hover:border-black/[0.09] transition-colors"
        >
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-md flex items-center justify-center shrink-0 ${stat.wrap}`}>
              <stat.icon className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="text-lg sm:text-xl font-semibold tracking-tight text-text-primary tabular-nums leading-none mb-1">
                {stat.value}
              </p>
              <p className="text-[10px] sm:text-[11px] font-medium text-text-muted leading-tight">{stat.label}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
