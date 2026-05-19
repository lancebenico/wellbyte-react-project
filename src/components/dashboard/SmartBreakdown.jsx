import { useState, useMemo } from 'react'
import { Sparkles, X, CheckSquare, Square } from 'lucide-react'
import { suggestMilestones } from '../../lib/smartBreakdown'
import useStore from '../../store/useStore'

export default function SmartBreakdown() {
  const addTasksFromMilestones = useStore((s) => s.addTasksFromMilestones)
  const [open, setOpen] = useState(false)
  const [projectTitle, setProjectTitle] = useState('')
  const [milestones, setMilestones] = useState([])
  const [selected, setSelected] = useState(() => new Set())

  const hint = useMemo(() => {
    if (!projectTitle.trim()) return null
    const { matched } = suggestMilestones(projectTitle)
    if (matched === 'pattern') return 'Matched a project type — tweak milestones below, then add to your list.'
    if (matched === 'generic') return 'Using a general plan — edit steps to match your project.'
    return null
  }, [projectTitle])

  const runSuggest = () => {
    const { milestones: m } = suggestMilestones(projectTitle)
    setMilestones(m)
    setSelected(new Set(m.map((_, i) => i)))
  }

  const toggle = (i) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const updateLine = (i, text) => {
    setMilestones((prev) => prev.map((line, j) => (j === i ? text : line)))
  }

  const addLine = () => {
    setMilestones((prev) => {
      const next = [...prev, 'New step']
      setSelected((sel) => {
        const n = new Set(sel)
        n.add(next.length - 1)
        return n
      })
      return next
    })
  }

  const removeLine = (i) => {
    setMilestones((prev) => prev.filter((_, j) => j !== i))
    setSelected((prev) => {
      const next = new Set()
      prev.forEach((j) => {
        if (j < i) next.add(j)
        if (j > i) next.add(j - 1)
      })
      return next
    })
  }

  const handleAdd = () => {
    const titles = milestones.filter((_, i) => selected.has(i)).map((m) => m.trim()).filter(Boolean)
    if (!titles.length) return
    addTasksFromMilestones(titles, {
      parentTitle: projectTitle.trim() || 'Project',
    })
    setOpen(false)
    setProjectTitle('')
    setMilestones([])
    setSelected(new Set())
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="retro-btn text-xs py-2 px-2.5 flex items-center gap-1.5 border-dashed border-black/[0.15]"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        Smart breakdown
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-[55] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <button type="button" className="absolute inset-0 bg-black/25" aria-label="Close" onClick={() => setOpen(false)} />
      <div className="relative w-full sm:max-w-lg max-h-[90vh] overflow-y-auto retro-window rounded-t-lg sm:rounded-lg shadow-lg bg-white">
        <div className="sticky top-0 flex items-center justify-between gap-2 px-4 py-3 border-b border-black/[0.06] bg-white z-[1]">
          <div>
            <h2 className="text-base font-semibold text-text-primary">Smart task breakdown</h2>
            <p className="text-[11px] text-text-muted">Turn one big project into smaller milestones</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="p-2 rounded-md text-text-muted hover:bg-black/[0.05]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label htmlFor="project-title" className="block text-xs font-semibold text-text-muted mb-1">
              Major project or assignment
            </label>
            <input
              id="project-title"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder='e.g. "10-page history paper" or "CS final project"'
              className="retro-input w-full"
            />
          </div>

          <button type="button" onClick={runSuggest} className="retro-btn retro-btn-blue w-full text-sm py-2.5">
            Suggest milestones
          </button>

          {hint && <p className="text-xs text-text-secondary leading-relaxed">{hint}</p>}

          {milestones.length > 0 && (
            <>
              <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wide">Suggested steps</p>
              <ul className="space-y-2">
                {milestones.map((line, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <button
                      type="button"
                      onClick={() => toggle(i)}
                      className="mt-1.5 text-text-muted hover:text-text-primary"
                      aria-pressed={selected.has(i)}
                      aria-label={selected.has(i) ? 'Deselect' : 'Select'}
                    >
                      {selected.has(i) ? (
                        <CheckSquare className="w-4 h-4 text-text-primary" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                    <input
                      value={line}
                      onChange={(e) => updateLine(i, e.target.value)}
                      className="retro-input flex-1 text-sm py-1.5"
                    />
                    <button
                      type="button"
                      onClick={() => removeLine(i)}
                      className="retro-btn text-xs py-1 px-2 text-text-muted shrink-0"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={addLine} className="retro-btn text-xs w-full">
                + Add step
              </button>
              <button type="button" onClick={handleAdd} className="retro-btn retro-btn-pink w-full text-sm py-2.5">
                Add selected as tasks
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
