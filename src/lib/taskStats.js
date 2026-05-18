import { isTaskOverdue, isDueWithinDays } from './timeManagement'

export function getTaskSummary(tasks) {
  const list = Array.isArray(tasks) ? tasks : []
  const open = list.filter((t) => t.status !== 'completed')
  const tasksOnly = list.filter((t) => (t.category || 'task') === 'task')
  const eventsOnly = list.filter((t) => t.category === 'event')

  return {
    total: list.length,
    open: open.length,
    completed: list.filter((t) => t.status === 'completed').length,
    inProgress: list.filter((t) => t.status === 'in-progress').length,
    todo: list.filter((t) => t.status === 'todo').length,
    overdue: open.filter((t) => isTaskOverdue(t)).length,
    dueThisWeek: open.filter((t) => t.dueDate && isDueWithinDays(t, 7, true)).length,
    tasks: tasksOnly.length,
    events: eventsOnly.length,
  }
}
