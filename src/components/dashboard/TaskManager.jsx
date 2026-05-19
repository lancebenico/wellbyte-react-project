import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Trash2, Check, Circle,
  Flame, ArrowUp, ArrowRight, ArrowDown, X,
} from 'lucide-react'
import SmartBreakdown from './SmartBreakdown'
import useStore from '../../store/useStore'
import { taskItem, filterPill } from '../../lib/animations'
import {
  formatDueChip,
  formatShortDue,
  isPastYMD,
  minDateForNewItem,
} from '../../lib/timeManagement'
import { CATEGORY_LABELS, ITEM_CATEGORIES } from '../../lib/items'
import { getSubjectsForTerm, isAcademicTermConfigured } from '../../lib/courses'
import { TASK_TYPE_BADGE, taskTypeLabel } from '../../lib/taskTypes'
import {
  AcademicConfigPrompt,
  TaskTypePicker,
  TaskSubjectSelect,
} from './TaskAcademicFields'

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'todo', label: 'To do' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'completed', label: 'Done' },
]

const PRIORITY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'high', label: 'High', icon: Flame, color: 'text-red-500' },
  { value: 'medium', label: 'Mid', icon: ArrowUp, color: 'text-amber-500' },
  { value: 'low', label: 'Low', icon: ArrowDown, color: 'text-emerald-500' },
]

const DUE_OPTIONS = [
  { value: 'all', label: 'Any deadline' },
  { value: 'has_due', label: 'Has due date' },
  { value: 'week', label: 'Due in 7 days' },
  { value: 'overdue', label: 'Overdue' },
]

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All types' },
  ...ITEM_CATEGORIES.map((c) => ({ value: c, label: CATEGORY_LABELS[c] })),
]

const PRIORITY_BADGE = {
  high: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: Flame },
  medium: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200', icon: ArrowUp },
  low: { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200', icon: ArrowDown },
}

const STATUS_BADGE = {
  todo: { bg: 'bg-stone-50', text: 'text-stone-600', border: 'border-stone-200' },
  'in-progress': { bg: 'bg-cics-red-light', text: 'text-cics-red-dark', border: 'border-cics-red-muted' },
  completed: { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' },
}

function FilterPills({ options, value, onChange, label }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[11px] text-text-muted font-medium shrink-0">{label}</span>
      {options.map((opt) => (
        <motion.button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          {...filterPill}
          className={`
            relative px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150
            flex items-center gap-1.5 border
            ${value === opt.value
              ? 'bg-text-primary text-white border-text-primary'
              : 'bg-white border-black/[0.08] text-text-secondary hover:border-black/[0.12] hover:bg-[#fafafa]'
            }
          `}
        >
          <span className="relative z-10 flex items-center gap-1.5">
            {opt.icon && <opt.icon className={`w-3 h-3 ${opt.color || ''}`} />}
            {opt.label}
          </span>
        </motion.button>
      ))}
    </div>
  )
}

function AddTaskForm({ onClose }) {
  const addTask = useStore((s) => s.addTask)
  const profile = useStore((s) => s.profile)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('task')
  const [subject, setSubject] = useState('')
  const [taskType, setTaskType] = useState('')
  const [priority, setPriority] = useState('medium')
  const [status, setStatus] = useState('todo')
  const [dueDate, setDueDate] = useState('')
  const [estimatedMinutes, setEstimatedMinutes] = useState('')
  const [formError, setFormError] = useState('')

  const academicReady = isAcademicTermConfigured(profile)
  const subjects =
    category === 'task' && academicReady
      ? getSubjectsForTerm(profile.yearLevel, profile.semester)
      : []

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    if (category === 'task') {
      if (!academicReady) {
        setFormError('Configure your year and semester in Settings before adding a task.')
        return
      }
      if (!subject) {
        setFormError('Please select a subject.')
        return
      }
      if (!taskType) {
        setFormError('Please select a task type.')
        return
      }
    }
    if (dueDate && isPastYMD(dueDate)) {
      setFormError('Due date cannot be in the past.')
      return
    }
    setFormError('')
    const est =
      estimatedMinutes === '' || Number.isNaN(Number(estimatedMinutes))
        ? null
        : Math.max(0, Math.round(Number(estimatedMinutes)))
    addTask({
      title: title.trim(),
      description: description.trim(),
      category,
      subject: category === 'task' ? subject : null,
      taskType: category === 'task' ? taskType : null,
      priority,
      status,
      dueDate: dueDate || null,
      estimatedMinutes: est,
    })
    onClose()
  }

  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25 }}
      onSubmit={handleSubmit}
      className="overflow-hidden"
    >
      <div className="rounded-md border border-black/[0.08] bg-[#fafafa] p-4 mb-4 space-y-3">
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="retro-input w-full"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="retro-input w-full"
        />
        <div>
          <span className="block text-[11px] text-text-muted font-medium mb-1">Type</span>
          <div className="flex rounded-md border border-black/[0.08] p-0.5 bg-white">
            {ITEM_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setCategory(cat)
                  setFormError('')
                }}
                className={`flex-1 py-1.5 text-xs font-medium rounded transition-colors ${
                  category === cat
                    ? 'bg-text-primary text-white'
                    : 'text-text-secondary hover:bg-[#fafafa]'
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>

        {category === 'task' && (
          <>
            {!academicReady ? (
              <AcademicConfigPrompt />
            ) : (
              <>
                <TaskSubjectSelect
                  subjects={subjects}
                  value={subject}
                  onChange={setSubject}
                  profile={profile}
                />
                <TaskTypePicker value={taskType} onChange={setTaskType} />
              </>
            )}
          </>
        )}

        {formError && (
          <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-md px-2.5 py-2">
            {formError}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <span className="block text-[11px] text-text-muted font-medium mb-1">Due date (optional)</span>
            <input
              type="date"
              value={dueDate}
              min={minDateForNewItem()}
              onChange={(e) => setDueDate(e.target.value)}
              className="retro-input w-full"
            />
          </div>
          <div>
            <span className="block text-[11px] text-text-muted font-medium mb-1">Estimate (minutes)</span>
            <input
              type="number"
              min={0}
              step={5}
              value={estimatedMinutes}
              onChange={(e) => setEstimatedMinutes(e.target.value)}
              placeholder="e.g. 45"
              className="retro-input w-full"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-text-muted font-medium">Priority</span>
            {['low', 'medium', 'high'].map((p) => {
              const cfg = PRIORITY_BADGE[p]
              return (
                <motion.button
                  key={p}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPriority(p)}
                  className={`px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 border transition-all ${
                    priority === p ? `${cfg.bg} ${cfg.text} ${cfg.border}` : 'bg-white border-black/[0.08] text-text-muted'
                  }`}
                >
                  <cfg.icon className="w-3 h-3" /> {p}
                </motion.button>
              )
            })}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-text-muted font-medium">Status</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="retro-input py-1 px-2 text-xs"
            >
              <option value="todo">To do</option>
              <option value="in-progress">In progress</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <motion.button type="button" whileTap={{ scale: 0.98 }} onClick={onClose} className="retro-btn text-text-secondary">
            Cancel
          </motion.button>
          <motion.button type="submit" whileTap={{ scale: 0.98 }} className="retro-btn retro-btn-purple">
            Add item
          </motion.button>
        </div>
      </div>
    </motion.form>
  )
}

function TaskCard({ task }) {
  const { toggleTaskStatus, deleteTask, updateTask } = useStore()
  const profile = useStore((s) => s.profile)
  const priority = PRIORITY_BADGE[task.priority]
  const status = STATUS_BADGE[task.status]
  const isCompleted = task.status === 'completed'
  const dueLabel = !isCompleted && task.dueDate ? formatDueChip(task) : null
  const isTask = (task.category || 'task') === 'task'
  const academicReady = isAcademicTermConfigured(profile)
  const subjects = isTask && academicReady
    ? getSubjectsForTerm(profile.yearLevel, profile.semester)
    : []
  const typeBadge = task.taskType ? TASK_TYPE_BADGE[task.taskType] : null
  const typeLabel = taskTypeLabel(task.taskType)

  return (
    <motion.div
      variants={taskItem}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
      className="overflow-hidden"
    >
      <div className={`
        bg-white rounded-md border border-black/[0.08] p-3.5 sm:p-4 group transition-all duration-150
        hover:border-black/[0.12] hover:shadow-[0_1px_4px_rgba(15,15,15,0.05)]
        ${isCompleted ? 'opacity-55' : ''}
      `}>
        <div className="flex items-start gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={() => toggleTaskStatus(task.id)}
            className={`
              mt-0.5 w-[18px] h-[18px] rounded border flex items-center justify-center flex-shrink-0 transition-all
              ${isCompleted
                ? 'bg-emerald-600 border-emerald-600'
                : 'border-black/[0.15] bg-white hover:border-black/[0.25]'
              }
            `}
          >
            {isCompleted && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
          </motion.button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h4 className={`text-sm font-medium ${isCompleted ? 'line-through text-text-muted' : 'text-text-primary'}`}>
                {task.title}
              </h4>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded border text-[10px] font-medium bg-indigo-50 text-indigo-800 border-indigo-200">
                  {CATEGORY_LABELS[task.category] || 'Task'}
                </span>
                {isTask && typeBadge && typeLabel && (
                  <span
                    className={`px-1.5 py-0.5 rounded border text-[10px] font-semibold ${typeBadge.bg} ${typeBadge.text} ${typeBadge.border}`}
                  >
                    {typeLabel}
                  </span>
                )}
                {isTask && (
                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-[10px] font-medium ${priority.bg} ${priority.text} ${priority.border}`}>
                    <priority.icon className="w-2.5 h-2.5" />
                    {task.priority}
                  </span>
                )}
                <span className={`px-1.5 py-0.5 rounded border text-[10px] font-medium ${status.bg} ${status.text} ${status.border}`}>
                  {task.status}
                </span>
                {dueLabel && (
                  <span
                    className={`px-1.5 py-0.5 rounded border text-[10px] font-medium ${
                      dueLabel.includes('overdue')
                        ? 'bg-red-50 text-red-800 border-red-200'
                        : dueLabel.includes('today')
                          ? 'bg-amber-50 text-amber-900 border-amber-200'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {dueLabel}
                  </span>
                )}
                {task.estimatedMinutes != null && task.estimatedMinutes > 0 && (
                  <span className="px-1.5 py-0.5 rounded border text-[10px] font-medium bg-stone-50 text-stone-700 border-stone-200">
                    ~{task.estimatedMinutes}m
                  </span>
                )}
              </div>
            </div>

            {isTask && task.subject && (
              <p className="text-[11px] text-cics-red-dark font-medium mt-0.5 leading-snug">{task.subject}</p>
            )}

            {task.description && (
              <p className="text-xs text-text-secondary leading-relaxed mt-1">{task.description}</p>
            )}

            {!isCompleted && (
              <details className="mt-2 group/plan">
                <summary className="text-[11px] font-medium text-text-muted cursor-pointer list-none flex items-center gap-1 [&::-webkit-details-marker]:hidden">
                  <span className="group-open/plan:rotate-90 transition-transform inline-block">▸</span>
                  {isTask ? 'Edit task' : 'Plan time'}
                </summary>
                <div className="mt-2 space-y-3">
                  {isTask && (
                    <>
                      {!academicReady ? (
                        <AcademicConfigPrompt />
                      ) : (
                        <>
                          <label className="flex flex-col gap-0.5 text-[10px] font-medium text-text-muted">
                            Subject
                            <select
                              value={task.subject || ''}
                              onChange={(e) =>
                                updateTask(task.id, { subject: e.target.value || null })
                              }
                              className="retro-input text-xs py-1"
                            >
                              <option value="">Select subject…</option>
                              {subjects.map((name) => (
                                <option key={name} value={name}>
                                  {name}
                                </option>
                              ))}
                            </select>
                          </label>
                          <TaskTypePicker
                            value={task.taskType || ''}
                            onChange={(v) => updateTask(task.id, { taskType: v || null })}
                          />
                        </>
                      )}
                    </>
                  )}
                <div className="flex flex-wrap gap-3 items-end">
                  <label className="flex flex-col gap-0.5 text-[10px] font-medium text-text-muted">
                    Due
                    <input
                      type="date"
                      value={task.dueDate || ''}
                      onChange={(e) => updateTask(task.id, { dueDate: e.target.value || null })}
                      className="retro-input text-xs py-1"
                    />
                  </label>
                  <label className="flex flex-col gap-0.5 text-[10px] font-medium text-text-muted">
                    Est. minutes
                    <input
                      type="number"
                      min={0}
                      step={5}
                      value={task.estimatedMinutes ?? ''}
                      onChange={(e) => {
                        const v = e.target.value
                        updateTask(task.id, {
                          estimatedMinutes: v === '' ? null : Math.max(0, Math.round(Number(v))),
                        })
                      }}
                      className="retro-input text-xs py-1 w-24"
                      placeholder="—"
                    />
                  </label>
                  {task.dueDate && (
                    <span className="text-[10px] text-text-muted pb-1">{formatShortDue(task.dueDate)}</span>
                  )}
                </div>
                </div>
              </details>
            )}
          </div>

          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            {!isCompleted && task.status === 'todo' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => updateTask(task.id, { status: 'in-progress' })}
                className="p-1.5 rounded-md text-text-muted hover:text-cics-red hover:bg-cics-red-light transition-colors"
                title="Start task"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => deleteTask(task.id)}
              className="p-1.5 rounded-md text-text-muted hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function TaskManager() {
  const [showAddForm, setShowAddForm] = useState(false)
  const {
    tasks,
    filterStatus, filterPriority, filterDue, filterCategory,
    setFilterStatus, setFilterPriority, setFilterDue, setFilterCategory,
    getFilteredTasks,
  } = useStore()

  const filteredTasks = getFilteredTasks()
  const hasAnyTasks = tasks.length > 0
  const emptyHint = hasAnyTasks
    ? 'No tasks match these filters. Try setting Status and Priority to All.'
    : 'No tasks yet. Use New task above to add one.'

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Tasks & events</h3>
        <div className="flex flex-wrap items-center gap-2">
          <SmartBreakdown />
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="retro-btn retro-btn-pink flex items-center gap-1.5 text-xs"
          >
            {showAddForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            {showAddForm ? 'Close' : 'New item'}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showAddForm && <AddTaskForm onClose={() => setShowAddForm(false)} />}
      </AnimatePresence>

      <div className="space-y-2">
        <FilterPills options={STATUS_OPTIONS} value={filterStatus} onChange={setFilterStatus} label="Status" />
        <FilterPills options={PRIORITY_OPTIONS} value={filterPriority} onChange={setFilterPriority} label="Priority" />
        <FilterPills options={DUE_OPTIONS} value={filterDue} onChange={setFilterDue} label="Deadline" />
        <FilterPills options={CATEGORY_OPTIONS} value={filterCategory} onChange={setFilterCategory} label="Type" />
      </div>

      <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
        <AnimatePresence mode="popLayout">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10 px-2 text-text-secondary text-sm max-w-xs mx-auto leading-relaxed"
            >
              <Circle className="w-7 h-7 mx-auto mb-2 text-text-muted opacity-40" aria-hidden />
              {emptyHint}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
