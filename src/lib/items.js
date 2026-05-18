import { toYMD } from './calendarUtils'

export const ITEM_CATEGORIES = ['task', 'event']

export const CATEGORY_LABELS = {
  task: 'Task',
  event: 'Event',
}

const PRIORITY_COLORS = {
  high: 'red',
  medium: 'orange',
  low: 'green',
}

export function colorForItem(item) {
  if (item?.color) return item.color
  return PRIORITY_COLORS[item?.priority] ?? 'blue'
}

export function normalizeItem(raw) {
  const category = ITEM_CATEGORIES.includes(raw?.category) ? raw.category : 'task'
  return {
    id: raw.id,
    title: raw.title?.trim() || '',
    description: raw.description?.trim() || '',
    category,
    priority: raw.priority || 'medium',
    status: raw.status || 'todo',
    dueDate: raw.dueDate || null,
    estimatedMinutes:
      raw.estimatedMinutes != null && raw.estimatedMinutes !== ''
        ? Number(raw.estimatedMinutes)
        : null,
    allDay: !!raw.allDay,
    startDate: raw.startDate || null,
    endDate: raw.endDate || null,
    start: raw.start || null,
    end: raw.end || null,
    color: raw.color || (category === 'event' ? 'blue' : null),
    createdAt: raw.createdAt || new Date().toISOString(),
  }
}

export function calendarEventToItem(ev) {
  const dueDate = ev.allDay
    ? ev.startDate || null
    : ev.start
      ? toYMD(new Date(ev.start))
      : null
  return normalizeItem({
    id: ev.id,
    title: ev.title,
    description: ev.description || '',
    category: 'event',
    dueDate,
    allDay: !!ev.allDay,
    startDate: ev.startDate || null,
    endDate: ev.endDate || null,
    start: ev.start || null,
    end: ev.end || null,
    color: ev.color || 'blue',
    status: 'todo',
    estimatedMinutes: null,
    createdAt: new Date().toISOString(),
  })
}

/** Merge legacy calendarEvents into tasks once. */
export function migrateStoredItems(tasks, calendarEvents) {
  const normalized = (tasks || []).map((t) =>
    normalizeItem({ ...t, category: t.category || 'task' })
  )
  const ids = new Set(normalized.map((t) => t.id))
  const fromCalendar = (calendarEvents || [])
    .filter((ev) => ev?.id && !ids.has(ev.id))
    .map(calendarEventToItem)
  return [...fromCalendar, ...normalized]
}
