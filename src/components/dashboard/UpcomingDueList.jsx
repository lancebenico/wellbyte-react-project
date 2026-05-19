import { NavLink } from 'react-router-dom'
import { CalendarDays, ChevronRight } from 'lucide-react'
import useStore from '../../store/useStore'
import {
  isTaskOverdue,
  formatDueChip,
  formatShortDue,
  parseLocalYMD,
} from '../../lib/timeManagement'

export default function UpcomingDueList() {
  const tasks = useStore((s) => s.tasks)

  const open = tasks.filter((t) => t.status !== 'completed' && t.dueDate)
  const overdue = open.filter((t) => isTaskOverdue(t))
  const upcoming = open
    .filter((t) => !isTaskOverdue(t))
    .sort((a, b) => {
      const da = parseLocalYMD(a.dueDate)
      const db = parseLocalYMD(b.dueDate)
      return (da?.getTime() ?? 0) - (db?.getTime() ?? 0)
    })
    .slice(0, 6)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-[#f7f3e8] border border-black/[0.06] flex items-center justify-center">
            <CalendarDays className="w-4 h-4 text-[#7a6220]" aria-hidden />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Upcoming Deadlines</h3>
            <p className="text-[11px] text-text-muted">Open tasks and events with due dates</p>
          </div>
        </div>
        <NavLink
          to="/calendar"
          className="text-[11px] font-semibold text-retro-blue hover:underline flex items-center gap-0.5 shrink-0"
        >
          Calendar
          <ChevronRight className="w-3.5 h-3.5" aria-hidden />
        </NavLink>
      </div>

      {overdue.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-red-700 mb-1.5">Overdue</p>
          <ul className="space-y-1.5">
            {overdue.slice(0, 4).map((t) => (
              <li
                key={t.id}
                className="flex items-start justify-between gap-2 rounded-md border border-red-200 bg-red-50/60 px-2.5 py-2 text-xs"
              >
                <span className="font-medium text-text-primary line-clamp-2">{t.title}</span>
                <span className="text-red-800 font-medium tabular-nums shrink-0">{formatShortDue(t.dueDate)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted mb-1.5">Upcoming</p>
        {upcoming.length === 0 && overdue.length === 0 ? (
          <p className="text-xs text-text-secondary leading-relaxed">
            No deadlines yet. Add a due date when you create a task, or plan blocks in{' '}
            <NavLink to="/calendar" className="text-retro-blue font-medium hover:underline">
              Calendar
            </NavLink>
            .
          </p>
        ) : upcoming.length === 0 ? (
          <p className="text-xs text-text-muted">Nothing else scheduled — nice work catching up.</p>
        ) : (
          <ul className="space-y-1.5">
            {upcoming.map((t) => (
              <li
                key={t.id}
                className="flex items-start justify-between gap-2 rounded-md border border-black/[0.08] bg-white px-2.5 py-2 text-xs"
              >
                <div className="min-w-0">
                  <p className="font-medium text-text-primary truncate">{t.title}</p>
                  <p className="text-[10px] text-text-muted mt-0.5">{formatDueChip(t)}</p>
                </div>
                {t.estimatedMinutes ? (
                  <span className="text-text-muted tabular-nums shrink-0">~{t.estimatedMinutes}m</span>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="text-[11px] text-text-secondary leading-relaxed border-t border-black/[0.06] pt-3">
        Tip: estimate minutes on each task so you can match work to free slots between classes.
      </p>
    </div>
  )
}
