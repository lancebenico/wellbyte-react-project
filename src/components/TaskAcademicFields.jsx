import { TASK_TYPES, TASK_TYPE_BADGE } from '../lib/taskTypes'
import { formatAcademicTerm } from '../lib/courses'
import { requestOpenSettings } from './SettingsModal'

export function AcademicConfigPrompt() {
  return (
    <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-950">
      <p className="font-medium mb-1">Set your year and semester first</p>
      <p className="text-amber-900/90 mb-2">
        Open Settings to choose your academic term so we can list your subjects.
      </p>
      <button
        type="button"
        onClick={requestOpenSettings}
        className="retro-btn retro-btn-pink text-xs py-1 px-2"
      >
        Open Settings
      </button>
    </div>
  )
}

export function TaskTypePicker({ value, onChange, labelClass = 'text-[11px]' }) {
  return (
    <div>
      <span className={`block ${labelClass} text-text-muted font-medium mb-1`}>
        Task Type <span className="text-cics-red">*</span>
      </span>
      <div className="flex flex-wrap gap-1.5">
        {TASK_TYPES.map((opt) => {
          const badge = TASK_TYPE_BADGE[opt.value]
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`px-2 py-1 rounded-md text-xs font-medium border transition-all ${
                value === opt.value
                  ? `${badge.bg} ${badge.text} ${badge.border}`
                  : 'bg-white border-black/[0.08] text-text-muted hover:bg-[#fafafa]'
              }`}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function TaskSubjectSelect({
  subjects,
  value,
  onChange,
  profile,
  selectId = 'task-subject',
  labelClass = 'text-[11px]',
}) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] text-text-muted">Subjects for {formatAcademicTerm(profile)}</p>
      <div>
        <label className={`block ${labelClass} text-text-muted font-medium mb-1`} htmlFor={selectId}>
          Subject <span className="text-cics-red">*</span>
        </label>
        <select
          id={selectId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="retro-input w-full text-xs"
        >
          <option value="">Select subject…</option>
          {subjects.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
