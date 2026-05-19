/** Local calendar-day helpers for task deadlines */

export function pad2(n) {
  return String(n).padStart(2, '0')
}

export function toLocalYMD(d = new Date()) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
}

export function localYmdPlus(daysFromToday) {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + daysFromToday)
  return toLocalYMD(d)
}

export function parseLocalYMD(s) {
  if (!s || typeof s !== 'string') return null
  const [y, m, day] = s.split('-').map(Number)
  if (!y || !m || !day) return null
  return new Date(y, m - 1, day, 0, 0, 0, 0)
}

export function startOfLocalToday() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

export function daysFromToday(ymd) {
  const t = parseLocalYMD(ymd)
  if (!t) return null
  const today = startOfLocalToday()
  return Math.round((t.getTime() - today.getTime()) / 86400000)
}

/** True when YMD is strictly before today (local calendar). */
export function isPastYMD(ymd) {
  const d = daysFromToday(ymd)
  return d !== null && d < 0
}

/** `min` attribute for HTML date inputs on new items. */
export function minDateForNewItem() {
  return toLocalYMD()
}

export function isTaskOverdue(task) {
  if (!task?.dueDate || task.status === 'completed') return false
  const due = parseLocalYMD(task.dueDate)
  if (!due) return false
  return due < startOfLocalToday()
}

export function isDueWithinDays(task, n, inclusiveToday = true) {
  if (!task?.dueDate || task.status === 'completed') return false
  const due = parseLocalYMD(task.dueDate)
  if (!due) return false
  const today = startOfLocalToday()
  const end = new Date(today)
  end.setDate(end.getDate() + n)
  if (inclusiveToday && due < today) return false
  return due >= today && due <= end
}

export function formatDueChip(task) {
  if (!task?.dueDate || task.status === 'completed') return null
  const d = daysFromToday(task.dueDate)
  if (d === null) return null
  if (d < 0) return `${Math.abs(d)}d overdue`
  if (d === 0) return 'Due today'
  if (d === 1) return 'Due tomorrow'
  return `Due in ${d}d`
}

export function formatShortDue(ymd) {
  const t = parseLocalYMD(ymd)
  if (!t) return ''
  return t.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}
