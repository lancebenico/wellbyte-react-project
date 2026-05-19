import { TASK_TYPE_BADGE, taskTypeLabel } from '../../../utils/constants/taskTypes'

export default function Badge({ type, label, className = '' }) {
  const resolvedLabel = label ?? (type ? taskTypeLabel(type) : null)
  if (!resolvedLabel) return null

  const badge = type ? TASK_TYPE_BADGE[type] : null
  const colorClass = badge
    ? `${badge.bg} ${badge.text} ${badge.border}`
    : 'bg-cics-red-light text-cics-red-dark border-cics-red/20'

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${colorClass} ${className}`.trim()}
    >
      {resolvedLabel}
    </span>
  )
}
