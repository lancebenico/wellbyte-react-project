import { useState, useEffect } from 'react'
import { X, Trash2 } from 'lucide-react'
import { pad2, toYMD } from '../../lib/calendarUtils'
import { isPastYMD, minDateForNewItem } from '../../lib/timeManagement'
import { ITEM_CATEGORIES, CATEGORY_LABELS } from '../../lib/items'
import { getSubjectsForTerm, isAcademicTermConfigured } from '../../lib/courses'
import useStore from '../../store/useStore'
import {
  AcademicConfigPrompt,
  TaskTypePicker,
  TaskSubjectSelect,
} from '../dashboard/TaskAcademicFields'

const COLORS = [
  { id: 'blue', label: 'Blue', swatch: 'bg-[#1a73e8]' },
  { id: 'green', label: 'Green', swatch: 'bg-[#188038]' },
  { id: 'red', label: 'Red', swatch: 'bg-[#d93025]' },
  { id: 'yellow', label: 'Yellow', swatch: 'bg-[#f9ab00]' },
  { id: 'purple', label: 'Purple', swatch: 'bg-[#9334e6]' },
  { id: 'orange', label: 'Orange', swatch: 'bg-[#fa903e]' },
  { id: 'gray', label: 'Gray', swatch: 'bg-[#5f6368]' },
]

function timeFromDate(d) {
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`
}

export default function ItemModal({ open, onClose, item, anchorDate, onSave, onDelete }) {
  const profile = useStore((s) => s.profile)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('task')
  const [subject, setSubject] = useState('')
  const [taskType, setTaskType] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('medium')
  const [status, setStatus] = useState('todo')
  const [timed, setTimed] = useState(false)
  const [allDay, setAllDay] = useState(true)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [day, setDay] = useState('')
  const [timeStart, setTimeStart] = useState('09:00')
  const [timeEnd, setTimeEnd] = useState('10:00')
  const [color, setColor] = useState('blue')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => {
      setError('')
      if (item) {
        setTitle(item.title ?? '')
        setDescription(item.description ?? '')
        setCategory(item.category === 'event' ? 'event' : 'task')
        setSubject(item.subject ?? '')
        setTaskType(item.taskType ?? '')
        setDueDate(item.dueDate ?? '')
        setPriority(item.priority ?? 'medium')
        setStatus(item.status ?? 'todo')
        setColor(item.color ?? 'blue')

        const hasTimed = Boolean(item.start && item.end && !item.allDay)
        setTimed(hasTimed)
        setAllDay(!!item.allDay || (!hasTimed && Boolean(item.startDate)))

        if (item.allDay && item.startDate) {
          setStartDate(item.startDate)
          setEndDate(item.endDate || item.startDate)
        } else if (hasTimed) {
          const s = new Date(item.start)
          const e = new Date(item.end)
          setDay(toYMD(s))
          setTimeStart(timeFromDate(s))
          setTimeEnd(timeFromDate(e))
          setStartDate(toYMD(s))
          setEndDate(toYMD(e))
        } else {
          const ymd = item.dueDate || toYMD(anchorDate ?? new Date())
          setStartDate(ymd)
          setEndDate(ymd)
          setDay(ymd)
        }
      } else {
        const ymd = toYMD(anchorDate ?? new Date())
        setTitle('')
        setDescription('')
        setCategory('task')
        setSubject('')
        setTaskType('')
        setDueDate(ymd)
        setPriority('medium')
        setStatus('todo')
        setTimed(false)
        setAllDay(true)
        setStartDate(ymd)
        setEndDate(ymd)
        setDay(ymd)
        setTimeStart('09:00')
        setTimeEnd('10:00')
        setColor('blue')
      }
    }, 0)
    return () => window.clearTimeout(t)
  }, [open, item, anchorDate])

  if (!open) return null

  const isNewItem = !item
  const minDueDate = isNewItem ? minDateForNewItem() : undefined

  const academicReady = isAcademicTermConfigured(profile)
  const subjects =
    category === 'task' && academicReady
      ? getSubjectsForTerm(profile.yearLevel, profile.semester)
      : []

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('Add a title.')
      return
    }

    if (category === 'task') {
      if (!academicReady) {
        setError('Configure your year and semester in Settings before adding a task.')
        return
      }
      if (!subject) {
        setError('Please select a subject.')
        return
      }
      if (!taskType) {
        setError('Please select a task type.')
        return
      }
    }

    if (isNewItem && dueDate && isPastYMD(dueDate)) {
      setError('Due date cannot be in the past.')
      return
    }

    const patch = {
      title: title.trim(),
      description: description.trim(),
      category,
      subject: category === 'task' ? subject : null,
      taskType: category === 'task' ? taskType : null,
      dueDate: dueDate || null,
      priority,
      status,
      color: category === 'event' ? color : null,
      allDay: false,
      startDate: null,
      endDate: null,
      start: null,
      end: null,
    }

    if (category === 'event' && timed) {
      if (!day) {
        setError('Choose a date for this event.')
        return
      }
      if (isNewItem && isPastYMD(day)) {
        setError('Event date cannot be in the past.')
        return
      }
      const [sh, sm] = timeStart.split(':').map(Number)
      const [eh, em] = timeEnd.split(':').map(Number)
      const start = new Date(day)
      start.setHours(sh, sm, 0, 0)
      const end = new Date(day)
      end.setHours(eh, em, 0, 0)
      if (end.getTime() <= start.getTime()) {
        setError('End time must be after start time.')
        return
      }
      patch.allDay = false
      patch.start = start.toISOString()
      patch.end = end.toISOString()
      patch.dueDate = patch.dueDate || day
    } else if (category === 'event' && allDay) {
      const start = startDate || dueDate
      const end = endDate || start
      if (!start || !end) {
        setError('Choose start and end dates.')
        return
      }
      if (isNewItem && (isPastYMD(start) || isPastYMD(end))) {
        setError('Event dates cannot be in the past.')
        return
      }
      if (start > end) {
        setError('End date must be on or after start date.')
        return
      }
      patch.allDay = true
      patch.startDate = start
      patch.endDate = end
      patch.dueDate = patch.dueDate || start
    } else if (!dueDate) {
      setError('Choose a due date to show this on the calendar and dashboard.')
      return
    }

    onSave(patch)
    onClose()
  }

  const handleDelete = () => {
    if (item?.id && onDelete) {
      onDelete(item.id)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div className="relative w-full sm:max-w-md max-h-[92vh] overflow-y-auto retro-window rounded-t-lg sm:rounded-lg shadow-lg">
        <div className="sticky top-0 z-[1] flex items-center justify-between gap-2 px-4 py-3 border-b border-black/[0.06] bg-white">
          <h2 className="text-base font-semibold text-text-primary">
            {item ? 'Edit item' : 'New item'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-md text-text-muted hover:bg-black/[0.05] hover:text-text-primary"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1" htmlFor="item-title">
              Name
            </label>
            <input
              id="item-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="retro-input w-full"
              placeholder="What is this?"
              autoFocus
            />
          </div>

          <div>
            <p className="text-xs font-semibold text-text-muted mb-2">Type</p>
            <div className="flex rounded-md border border-black/[0.1] p-0.5 bg-[#fafafa]">
              {ITEM_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setCategory(cat)
                    setError('')
                  }}
                  className={`flex-1 py-2 text-xs font-semibold rounded transition-colors ${
                    category === cat
                      ? 'bg-white shadow-sm text-text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1" htmlFor="item-due">
              Due date
            </label>
            <input
              id="item-due"
              type="date"
              value={dueDate}
              min={minDueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="retro-input w-full"
            />
            <p className="text-[10px] text-text-muted mt-1">
              Shown on the calendar and dashboard schedule.
            </p>
          </div>

          {category === 'task' && (
            <div className="space-y-3">
              {!academicReady ? (
                <AcademicConfigPrompt />
              ) : (
                <>
                  <TaskSubjectSelect
                    subjects={subjects}
                    value={subject}
                    onChange={setSubject}
                    profile={profile}
                    selectId="calendar-task-subject"
                    labelClass="text-xs"
                  />
                  <TaskTypePicker
                    value={taskType}
                    onChange={setTaskType}
                    labelClass="text-xs"
                  />
                </>
              )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-text-muted mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="retro-input w-full text-sm"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-muted mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="retro-input w-full text-sm"
                >
                  <option value="todo">To do</option>
                  <option value="in-progress">In progress</option>
                  <option value="completed">Done</option>
                </select>
              </div>
            </div>
            </div>
          )}

          {category === 'event' && (
            <div className="space-y-3 rounded-md border border-black/[0.08] bg-[#fafafa] p-3">
              <p className="text-xs font-semibold text-text-muted">Event schedule</p>
              <div className="flex items-center gap-2">
                <input
                  id="item-timed"
                  type="checkbox"
                  checked={timed}
                  onChange={(e) => setTimed(e.target.checked)}
                  className="rounded border-black/[0.2]"
                />
                <label htmlFor="item-timed" className="text-sm font-medium text-text-primary">
                  Specific time
                </label>
              </div>
              {timed ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-text-muted mb-1">Date</label>
                    <input
                      type="date"
                      value={day}
                      min={minDueDate}
                      onChange={(e) => {
                        setDay(e.target.value)
                        if (!dueDate) setDueDate(e.target.value)
                      }}
                      className="retro-input w-full"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-text-muted mb-1">Starts</label>
                      <input
                        type="time"
                        value={timeStart}
                        onChange={(e) => setTimeStart(e.target.value)}
                        className="retro-input w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text-muted mb-1">Ends</label>
                      <input
                        type="time"
                        value={timeEnd}
                        onChange={(e) => setTimeEnd(e.target.value)}
                        className="retro-input w-full"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      id="item-allday"
                      type="checkbox"
                      checked={allDay}
                      onChange={(e) => setAllDay(e.target.checked)}
                      className="rounded border-black/[0.2]"
                    />
                    <label htmlFor="item-allday" className="text-sm font-medium text-text-primary">
                      Multi-day (all day)
                    </label>
                  </div>
                  {allDay && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-text-muted mb-1">Starts</label>
                        <input
                          type="date"
                          value={startDate}
                          min={minDueDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="retro-input w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-text-muted mb-1">Ends</label>
                        <input
                          type="date"
                          value={endDate}
                          min={minDueDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="retro-input w-full"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1" htmlFor="item-desc">
              Notes
            </label>
            <textarea
              id="item-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="retro-input retro-input-note w-full resize-y min-h-[72px]"
              placeholder="Description, links, location…"
            />
          </div>

          {category === 'event' && (
            <div>
              <p className="text-xs font-semibold text-text-muted mb-2">Color</p>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    title={c.label}
                    onClick={() => setColor(c.id)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${
                      color === c.id ? 'border-text-primary scale-110' : 'border-transparent hover:scale-105'
                    }`}
                  >
                    <span className={`block w-full h-full rounded-full ${c.swatch}`} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t border-black/[0.06]">
            {item?.id ? (
              <button
                type="button"
                onClick={handleDelete}
                className="retro-btn text-red-700 border-red-200 hover:bg-red-50 flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            ) : (
              <span />
            )}
            <div className="flex gap-2 sm:justify-end">
              <button type="button" onClick={onClose} className="retro-btn text-text-secondary">
                Cancel
              </button>
              <button type="submit" className="retro-btn retro-btn-pink">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
