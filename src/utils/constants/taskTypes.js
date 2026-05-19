export const TASK_TYPES = [
  { value: 'quiz', label: 'Quiz' },
  { value: 'exam', label: 'Exam' },
  { value: 'activity', label: 'Activity' },
  { value: 'group-work', label: 'Group Work' },
]

export const TASK_TYPE_BADGE = {
  quiz: { bg: 'bg-violet-50', text: 'text-violet-800', border: 'border-violet-200' },
  exam: { bg: 'bg-red-50', text: 'text-red-800', border: 'border-red-200' },
  activity: { bg: 'bg-sky-50', text: 'text-sky-800', border: 'border-sky-200' },
  'group-work': { bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-200' },
}

export function taskTypeLabel(value) {
  return TASK_TYPES.find((t) => t.value === value)?.label ?? null
}

export function isValidTaskType(value) {
  return TASK_TYPES.some((t) => t.value === value)
}
