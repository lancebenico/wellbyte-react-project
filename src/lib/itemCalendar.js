import { colorForItem } from './items'

export function itemToCalendarEvent(item) {
  if (!item || item.status === 'completed') return null

  const base = {
    id: item.id,
    itemId: item.id,
    category: item.category || 'task',
    title: item.title,
    description: item.description || '',
    color: colorForItem(item),
  }

  if (item.start && item.end && !item.allDay) {
    return { ...base, allDay: false, start: item.start, end: item.end }
  }

  if (item.allDay && item.startDate) {
    return {
      ...base,
      allDay: true,
      startDate: item.startDate,
      endDate: item.endDate || item.startDate,
    }
  }

  if (item.dueDate) {
    return {
      ...base,
      allDay: true,
      startDate: item.dueDate,
      endDate: item.dueDate,
    }
  }

  return null
}

export function itemsToCalendarEvents(items) {
  if (!Array.isArray(items)) return []
  return items.map(itemToCalendarEvent).filter(Boolean)
}

export function findItemByCalendarEvent(items, calEv) {
  const id = calEv?.itemId || calEv?.id
  return items.find((t) => t.id === id) ?? null
}
