/** Local-date helpers (no date-fns). Week starts Sunday to match common calendar UIs. */

export function pad2(n) {
  return String(n).padStart(2, '0')
}

export function toYMD(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
}

export function parseYMD(s) {
  const [y, m, day] = s.split('-').map(Number)
  return new Date(y, m - 1, day, 0, 0, 0, 0)
}

export function addDays(d, n) {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}

export function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0)
}

/** Sunday = 0 … Saturday = 6 */
export function startOfWeekSunday(d) {
  const s = startOfDay(d)
  const day = s.getDay()
  return addDays(s, -day)
}

export function monthMatrix(year, monthIndex) {
  const first = new Date(year, monthIndex, 1)
  const gridStart = startOfWeekSunday(first)
  const cells = []
  for (let i = 0; i < 42; i += 1) {
    cells.push(addDays(gridStart, i))
  }
  return cells
}

export function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function isInRange(d, startInclusive, endInclusive) {
  const t = startOfDay(d).getTime()
  return t >= startOfDay(startInclusive).getTime() && t <= startOfDay(endInclusive).getTime()
}

export function eventsTouchingDay(events, day) {
  const d0 = startOfDay(day).getTime()
  const d1 = addDays(startOfDay(day), 1).getTime()

  return events.filter((ev) => {
    if (ev.allDay) {
      const s = parseYMD(ev.startDate).getTime()
      const e = addDays(parseYMD(ev.endDate), 1).getTime()
      return s < d1 && e > d0
    }
    const s = new Date(ev.start).getTime()
    const e = new Date(ev.end).getTime()
    return s < d1 && e > d0
  })
}

export function sortEventsByStart(events) {
  return [...events].sort((a, b) => {
    const ta = a.allDay ? parseYMD(a.startDate).getTime() : new Date(a.start).getTime()
    const tb = b.allDay ? parseYMD(b.startDate).getTime() : new Date(b.start).getTime()
    return ta - tb
  })
}

export const WEEK_START_HOUR = 6
export const WEEK_END_HOUR = 22
export const SLOT_MINUTES = 30
export const SLOTS_PER_HOUR = 60 / SLOT_MINUTES

export function minutesSinceDayStart(date, dayStartHour = WEEK_START_HOUR) {
  const h = date.getHours()
  const m = date.getMinutes()
  return (h - dayStartHour) * 60 + m
}

export function dayDurationMinutes(dayStartHour = WEEK_START_HOUR, dayEndHour = WEEK_END_HOUR) {
  return (dayEndHour - dayStartHour) * 60
}

/** Clip timed event to a single calendar day for week column layout */
export function timedSegmentForDay(ev, day) {
  const d0 = startOfDay(day)
  const d1 = addDays(d0, 1)
  const es = new Date(ev.start)
  const ee = new Date(ev.end)
  const clipStart = es < d0 ? d0 : es
  const clipEnd = ee > d1 ? d1 : ee
  if (clipEnd <= clipStart) return null
  return { clipStart, clipEnd }
}

export function formatTime(d) {
  return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
}

export function formatRangeLabel(start, end) {
  return `${formatTime(start)} – ${formatTime(end)}`
}

export const EVENT_COLOR_HEX = {
  blue: '#9b2335',
  green: '#188038',
  red: '#d93025',
  yellow: '#f9ab00',
  purple: '#9334e6',
  orange: '#fa903e',
  gray: '#5f6368',
}

export function eventColorHex(color) {
  return EVENT_COLOR_HEX[color] ?? EVENT_COLOR_HEX.blue
}

export function formatMonthYear(d) {
  return d.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
}

export function formatWeekdayShort(d) {
  return d.toLocaleDateString(undefined, { weekday: 'short' })
}

export function formatDayHeader(d) {
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
}
