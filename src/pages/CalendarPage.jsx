import { useState, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus, LayoutGrid, Columns2, List } from 'lucide-react'
import PageTransition from '../components/ui/PageTransition'
import PageWrapper from '../components/layout/PageWrapper'
import SectionHeader from '../components/common/SectionHeader'
import { PAGE_COPY } from '../utils/constants/pages'
import ItemModal from '../components/calendar/ItemModal'
import useStore from '../store/useStore'
import { itemsToCalendarEvents, findItemByCalendarEvent } from '../lib/itemCalendar'
import { CATEGORY_LABELS } from '../lib/items'
import {
  monthMatrix,
  toYMD,
  isSameDay,
  startOfDay,
  addDays,
  startOfWeekSunday,
  eventsTouchingDay,
  sortEventsByStart,
  timedSegmentForDay,
  minutesSinceDayStart,
  dayDurationMinutes,
  formatTime,
  formatRangeLabel,
  formatMonthYear,
  formatDayHeader,
  eventColorHex,
  WEEK_START_HOUR,
  WEEK_END_HOUR,
} from '../lib/calendarUtils'

const VIEWS = [
  { id: 'month', label: 'Month', icon: LayoutGrid },
  { id: 'week', label: 'Week', icon: Columns2 },
  { id: 'schedule', label: 'Schedule', icon: List },
]

const PX_PER_MIN = 0.72
const WEEKDAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function addMonths(d, delta) {
  const x = new Date(d)
  x.setMonth(x.getMonth() + delta)
  return x
}

function sortForDayList(a, b) {
  if (a.allDay && !b.allDay) return -1
  if (!a.allDay && b.allDay) return 1
  if (a.allDay && b.allDay) {
    return (a.startDate || '').localeCompare(b.startDate || '')
  }
  return new Date(a.start) - new Date(b.start)
}

function eventTimeLabel(ev) {
  const typeLabel = CATEGORY_LABELS[ev.category] || 'Item'
  if (ev.allDay) return `${typeLabel} · all day`
  return `${typeLabel} · ${formatRangeLabel(new Date(ev.start), new Date(ev.end))}`
}

export default function CalendarPage() {
  const tasks = useStore((s) => s.tasks)
  const addTask = useStore((s) => s.addTask)
  const updateTask = useStore((s) => s.updateTask)
  const deleteTask = useStore((s) => s.deleteTask)

  const [view, setView] = useState('month')
  const [cursor, setCursor] = useState(() => new Date())
  const [selectedDay, setSelectedDay] = useState(() => startOfDay(new Date()))
  const [agendaStart, setAgendaStart] = useState(() => startOfDay(new Date()))
  const [modal, setModal] = useState({ open: false, item: null })

  const displayEvents = useMemo(() => itemsToCalendarEvents(tasks), [tasks])

  const weekDays = useMemo(() => {
    const start = startOfWeekSunday(cursor)
    return Array.from({ length: 7 }, (_, i) => addDays(start, i))
  }, [cursor])

  const monthCells = useMemo(
    () => monthMatrix(cursor.getFullYear(), cursor.getMonth()),
    [cursor]
  )

  const title = useMemo(() => {
    if (view === 'week') {
      const a = weekDays[0]
      const b = weekDays[6]
      const sameMonth = a.getMonth() === b.getMonth()
      if (sameMonth) {
        return `${a.toLocaleDateString(undefined, { month: 'long' })} ${a.getDate()} – ${b.getDate()}, ${a.getFullYear()}`
      }
      return `${formatDayHeader(a)} – ${formatDayHeader(b)}`
    }
    if (view === 'schedule') {
      return 'Upcoming events'
    }
    return formatMonthYear(cursor)
  }, [view, cursor, weekDays])

  const goToday = () => {
    const t = new Date()
    setCursor(t)
    setSelectedDay(startOfDay(t))
    setAgendaStart(startOfDay(t))
  }

  const goPrev = () => {
    if (view === 'month') setCursor((c) => addMonths(c, -1))
    else if (view === 'week') setCursor((c) => addDays(c, -7))
    else setAgendaStart((d) => addDays(d, -14))
  }

  const goNext = () => {
    if (view === 'month') setCursor((c) => addMonths(c, 1))
    else if (view === 'week') setCursor((c) => addDays(c, 7))
    else setAgendaStart((d) => addDays(d, 14))
  }

  const openCreate = (day) => {
    setSelectedDay(startOfDay(day))
    setModal({ open: true, item: null })
  }

  const openEdit = (calEv) => {
    const item = findItemByCalendarEvent(tasks, calEv)
    setModal({ open: true, item: item ?? null })
  }

  const handleSave = (patch) => {
    if (modal.item?.id) {
      updateTask(modal.item.id, patch)
    } else {
      addTask(patch)
    }
  }

  const colHeight = dayDurationMinutes(WEEK_START_HOUR, WEEK_END_HOUR) * PX_PER_MIN

  const agendaBlocks = useMemo(() => {
    const out = []
    for (let i = 0; i < 42; i += 1) {
      const d = addDays(agendaStart, i)
      const evs = eventsTouchingDay(displayEvents, d).sort(sortForDayList)
      if (evs.length) out.push({ date: d, events: evs })
    }
    return out
  }, [displayEvents, agendaStart])

  const selectedDayEvents = useMemo(
    () => eventsTouchingDay(displayEvents, selectedDay).sort(sortForDayList),
    [displayEvents, selectedDay]
  )

  return (
    <PageTransition>
      <PageWrapper>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 w-full min-w-0">
          <div className="min-w-0 flex-1">
            <SectionHeader
              eyebrow={PAGE_COPY.calendar.eyebrow}
              title={
                <span className="flex items-center gap-2 flex-wrap">
                  <CalendarIcon className="w-7 h-7 text-cics-red shrink-0" aria-hidden />
                  {title}
                </span>
              }
              subtitle={PAGE_COPY.calendar.subtitle}
              className="mb-0"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button type="button" onClick={goToday} className="retro-btn text-xs py-2">
                Today
              </button>
              <div className="flex items-center rounded-md border border-black/[0.1] overflow-hidden">
                <button
                  type="button"
                  onClick={goPrev}
                  className="p-2 hover:bg-black/[0.04] text-text-secondary"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="p-2 hover:bg-black/[0.04] text-text-secondary border-l border-black/[0.08]"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex rounded-md border border-black/[0.1] p-0.5 bg-[#fafafa]">
                {VIEWS.map((v) => {
                  const TabIcon = v.icon
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setView(v.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition-colors ${
                        view === v.id ? 'bg-white shadow-sm text-text-primary' : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <TabIcon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{v.label}</span>
                    </button>
                  )
                })}
              </div>
              <button
                type="button"
                onClick={() => openCreate(selectedDay)}
                className="retro-btn retro-btn-pink flex items-center gap-1.5 text-xs py-2"
              >
                <Plus className="w-4 h-4" />
                Add item
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <div className="flex-1 min-w-0">
              {view === 'month' && (
                <div className="retro-window overflow-hidden">
                  <div className="grid grid-cols-7 border-b border-black/[0.06] bg-[#fafafa] text-center text-[11px] font-semibold uppercase tracking-wide text-text-muted py-2">
                    {WEEKDAY_HEADERS.map((d) => (
                      <div key={d}>{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 divide-x divide-y divide-black/[0.06] bg-white">
                    {monthCells.map((cell, idx) => {
                      const inMonth = cell.getMonth() === cursor.getMonth()
                      const isToday = isSameDay(cell, new Date())
                      const isSelected = isSameDay(cell, selectedDay)
                      const dayEvents = eventsTouchingDay(displayEvents, cell)
                      return (
                        <button
                          key={`${toYMD(cell)}-${idx}`}
                          type="button"
                          onClick={() => setSelectedDay(startOfDay(cell))}
                          onDoubleClick={() => openCreate(cell)}
                          className={`min-h-[100px] sm:min-h-[112px] p-1.5 text-left transition-colors hover:bg-black/[0.02] ${
                            inMonth ? 'bg-white' : 'bg-[#fafafa]'
                          } ${isSelected ? 'ring-2 ring-inset ring-cics-red/40 bg-cics-red-light/30' : ''}`}
                        >
                          <div
                            className={`text-xs font-semibold mb-1 w-7 h-7 flex items-center justify-center rounded-full ${
                              isToday ? 'bg-cics-red text-white' : inMonth ? 'text-text-primary' : 'text-text-muted'
                            }`}
                          >
                            {cell.getDate()}
                          </div>
                          <div className="space-y-0.5">
                            {sortEventsByStart(dayEvents)
                              .slice(0, 3)
                              .map((ev) => (
                                <div
                                  key={ev.id}
                                  role="button"
                                  tabIndex={0}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    openEdit(ev)
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault()
                                      e.stopPropagation()
                                      openEdit(ev)
                                    }
                                  }}
                                  className="truncate rounded px-1 py-0.5 text-[10px] sm:text-[11px] font-medium text-text-primary border-l-[3px] bg-black/[0.02] cursor-pointer hover:bg-black/[0.05]"
                                  style={{ borderLeftColor: eventColorHex(ev.color) }}
                                >
                                  {ev.title}
                                </div>
                              ))}
                            {dayEvents.length > 3 && (
                              <p className="text-[10px] text-text-muted pl-0.5">+{dayEvents.length - 3} more</p>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {view === 'week' && (
                <div className="retro-window overflow-hidden flex flex-col max-h-[min(78vh,820px)]">
                  <div className="flex border-b border-black/[0.06] bg-[#fafafa] shrink-0">
                    <div className="w-12 sm:w-14 shrink-0" />
                    {weekDays.map((d) => {
                      const isToday = isSameDay(d, new Date())
                      return (
                        <button
                          key={toYMD(d)}
                          type="button"
                          onClick={() => setSelectedDay(startOfDay(d))}
                          className={`flex-1 py-2 text-center border-l border-black/[0.06] min-w-0 hover:bg-black/[0.03] ${
                            isToday ? 'bg-cics-red-light/60' : ''
                          }`}
                        >
                          <div className="text-[10px] font-semibold uppercase text-text-muted truncate">
                            {d.toLocaleDateString(undefined, { weekday: 'short' })}
                          </div>
                          <div
                            className={`text-sm font-semibold tabular-nums inline-flex items-center justify-center w-8 h-8 rounded-full mx-auto mt-0.5 ${
                              isToday ? 'bg-cics-red text-white' : 'text-text-primary'
                            }`}
                          >
                            {d.getDate()}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                  <div className="flex flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
                    <div
                      className="w-12 sm:w-14 shrink-0 border-r border-black/[0.06] text-[10px] text-text-muted text-right pr-1 pt-1 select-none bg-white"
                      style={{ height: colHeight + 40 }}
                    >
                      {Array.from({ length: WEEK_END_HOUR - WEEK_START_HOUR }, (_, i) => {
                        const hour = WEEK_START_HOUR + i
                        let label
                        if (hour === 0) label = '12 am'
                        else if (hour < 12) label = `${hour} am`
                        else if (hour === 12) label = '12 pm'
                        else label = `${hour - 12} pm`
                        return (
                          <div
                            key={hour}
                            style={{ height: 60 * PX_PER_MIN }}
                            className="relative -top-1.5"
                          >
                            {label}
                          </div>
                        )
                      })}
                    </div>
                    <div className="flex flex-1 min-w-0 divide-x divide-black/[0.06]">
                      {weekDays.map((d) => {
                        const allDays = displayEvents.filter((ev) => ev.allDay && eventsTouchingDay([ev], d).length)
                        const timed = displayEvents.filter((ev) => !ev.allDay && eventsTouchingDay([ev], d).length)
                        return (
                          <div
                            key={toYMD(d)}
                            className="flex-1 min-w-0 relative bg-white"
                            style={{ height: colHeight + 40 }}
                          >
                            <div className="absolute top-0 left-0 right-0 z-[1] flex flex-col gap-0.5 px-0.5 pt-1 min-h-[36px] border-b border-black/[0.05] bg-[#fafafa]/95">
                              {allDays.map((ev) => (
                                <button
                                  key={ev.id}
                                  type="button"
                                  onClick={() => openEdit(ev)}
                                  className="truncate text-left text-[10px] font-medium px-1 py-0.5 rounded border-l-[3px] bg-white border border-black/[0.06] hover:bg-black/[0.03]"
                                  style={{ borderLeftColor: eventColorHex(ev.color) }}
                                >
                                  {ev.title}
                                </button>
                              ))}
                            </div>
                            <div
                              className="absolute left-0 right-0 top-[40px]"
                              style={{ height: colHeight }}
                            >
                              {Array.from({ length: (WEEK_END_HOUR - WEEK_START_HOUR) * 2 }, (_, i) => (
                                <div
                                  key={i}
                                  className={`border-t ${i % 2 === 0 ? 'border-black/[0.07]' : 'border-black/[0.03]'}`}
                                  style={{ height: 30 * PX_PER_MIN }}
                                />
                              ))}
                              {timed.map((ev) => {
                                const seg = timedSegmentForDay(ev, d)
                                if (!seg) return null
                                const startMin = minutesSinceDayStart(seg.clipStart, WEEK_START_HOUR)
                                const endMin = minutesSinceDayStart(seg.clipEnd, WEEK_START_HOUR)
                                if (endMin <= 0 || startMin >= dayDurationMinutes(WEEK_START_HOUR, WEEK_END_HOUR)) return null
                                const top = Math.max(0, startMin) * PX_PER_MIN
                                const h = Math.max((endMin - Math.max(0, startMin)) * PX_PER_MIN, 18)
                                return (
                                  <button
                                    key={ev.id}
                                    type="button"
                                    onClick={() => openEdit(ev)}
                                    className="absolute left-0.5 right-0.5 rounded px-1 py-0.5 text-left text-[10px] font-medium text-white shadow-sm overflow-hidden hover:brightness-95 z-[2]"
                                    style={{
                                      top,
                                      height: h,
                                      backgroundColor: eventColorHex(ev.color),
                                    }}
                                    title={ev.title}
                                  >
                                    <span className="line-clamp-2">{ev.title}</span>
                                    <span className="block opacity-90 text-[9px] font-normal">
                                      {formatTime(new Date(ev.start))}
                                    </span>
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {view === 'schedule' && (
                <div className="retro-window overflow-hidden divide-y divide-black/[0.06]">
                  {agendaBlocks.length === 0 ? (
                    <div className="p-10 text-center text-text-secondary text-sm">
                      No items in this range. Use Add item or set a due date when creating.
                    </div>
                  ) : (
                    agendaBlocks.map(({ date, events }) => (
                      <div key={toYMD(date)} className="flex gap-4 p-4 sm:p-5">
                        <div className="w-14 shrink-0 text-center">
                          <div className="text-[11px] font-semibold uppercase text-text-muted">
                            {date.toLocaleDateString(undefined, { weekday: 'short' })}
                          </div>
                          <div className="text-2xl font-semibold text-text-primary tabular-nums leading-tight">
                            {date.getDate()}
                          </div>
                        </div>
                        <div className="flex-1 space-y-2 min-w-0">
                          {events.map((ev) => (
                            <button
                              key={ev.id}
                              type="button"
                              onClick={() => openEdit(ev)}
                              className="w-full text-left rounded-md border border-black/[0.08] px-3 py-2.5 hover:bg-[#fafafa] transition-colors"
                            >
                              <div className="flex items-start gap-2">
                                <span
                                  className="w-1 self-stretch rounded-full shrink-0 mt-0.5"
                                  style={{ backgroundColor: eventColorHex(ev.color) }}
                                />
                                <div className="min-w-0">
                                  <p className="font-semibold text-sm text-text-primary truncate">{ev.title}</p>
                                  <p className="text-xs text-text-muted mt-0.5">{eventTimeLabel(ev)}</p>
                                  {ev.description ? (
                                    <p className="text-xs text-text-secondary mt-1 line-clamp-2">{ev.description}</p>
                                  ) : null}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <aside className="w-full lg:w-72 shrink-0 retro-window overflow-hidden lg:sticky lg:top-24 self-start">
              <div className="px-3 py-2 border-b border-black/[0.06] bg-[#fafafa]">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">Selected day</p>
                <p className="text-sm font-semibold text-text-primary">{formatDayHeader(selectedDay)}</p>
              </div>
              <div className="p-3 space-y-2 max-h-[360px] overflow-y-auto">
                {selectedDayEvents.length === 0 ? (
                  <p className="text-xs text-text-muted py-2">
                    Nothing scheduled. Use Add item below.
                  </p>
                ) : (
                  selectedDayEvents.map((ev) => (
                    <button
                      key={ev.id}
                      type="button"
                      onClick={() => openEdit(ev)}
                      className="w-full text-left rounded-md border border-black/[0.08] px-2.5 py-2 hover:bg-[#fafafa] transition-colors"
                    >
                      <div className="flex gap-2">
                        <span
                          className="w-1 rounded-full shrink-0"
                          style={{ backgroundColor: eventColorHex(ev.color) }}
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-text-primary truncate">{ev.title}</p>
                          <p className="text-[11px] text-text-muted">{eventTimeLabel(ev)}</p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
              <div className="p-3 border-t border-black/[0.06]">
                <button
                  type="button"
                  onClick={() => openCreate(selectedDay)}
                  className="retro-btn retro-btn-pink w-full text-xs py-2 flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Add item
                </button>
              </div>
            </aside>
          </div>

        <AnimatePresence>
          {modal.open && (
            <ItemModal
              open={modal.open}
              onClose={() => setModal({ open: false, item: null })}
              item={modal.item}
              anchorDate={selectedDay}
              onSave={handleSave}
              onDelete={modal.item?.id ? deleteTask : undefined}
            />
          )}
        </AnimatePresence>
      </PageWrapper>
    </PageTransition>
  )
}
