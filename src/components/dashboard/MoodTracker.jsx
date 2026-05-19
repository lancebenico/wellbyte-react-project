import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import useStore from '../../store/useStore'

import { MOODS } from '../../utils/constants/moods'

function triggerCelebration(color) {
  const colors = [color, '#e8e8e7', '#2383e2', '#c5e0d0', '#d4d4d4']
  confetti({
    particleCount: 55,
    spread: 70,
    origin: { y: 0.72 },
    colors,
    ticks: 100,
    gravity: 0.85,
    scalar: 0.85,
    shapes: ['circle'],
  })
}

function MoodHistory({ entries }) {
  const recent = entries.slice(0, 5)
  if (recent.length === 0) return null

  return (
    <div className="mt-4 pt-4 border-t border-black/[0.06]">
      <p className="text-[11px] font-medium text-text-muted mb-2">Recent</p>
      <div className="space-y-2">
        <AnimatePresence>
          {recent.map((entry, i) => {
            const mood = MOODS.find((m) => m.value === entry.mood)
            const time = new Date(entry.timestamp)
            const noteText = typeof entry.note === 'string' ? entry.note.trim() : ''
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-md border border-black/[0.06] bg-[#fafafa] px-3 py-2"
              >
                <div className="flex items-start justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-base leading-none shrink-0">{mood?.emoji}</span>
                    <span className="text-text-primary font-medium">{mood?.label}</span>
                  </div>
                  <span className="text-text-muted tabular-nums text-[11px] shrink-0">
                    {time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}{' '}
                    {time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                  </span>
                </div>
                {noteText ? (
                  <p
                    className="mt-1.5 text-[13px] leading-snug text-text-secondary border-t border-black/[0.05] pt-1.5"
                    title={noteText}
                  >
                    {noteText}
                  </p>
                ) : null}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function MoodTracker() {
  const { addMoodEntry, moodEntries } = useStore()
  const [selectedMood, setSelectedMood] = useState(null)
  const [note, setNote] = useState('')
  const [justLogged, setJustLogged] = useState(false)
  const noteRef = useRef(null)

  useEffect(() => {
    if (!selectedMood) return
    const id = window.requestAnimationFrame(() => {
      noteRef.current?.focus()
    })
    return () => window.cancelAnimationFrame(id)
  }, [selectedMood])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && selectedMood) {
        setSelectedMood(null)
        setNote('')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedMood])

  const handleMoodSelect = useCallback((mood) => {
    setSelectedMood(mood)
    setJustLogged(false)
  }, [])

  const handleLog = useCallback(() => {
    if (!selectedMood) return
    addMoodEntry({ mood: selectedMood.value, note, label: selectedMood.label })
    triggerCelebration(selectedMood.color)
    setJustLogged(true)
    setSelectedMood(null)
    setNote('')
    setTimeout(() => setJustLogged(false), 3000)
  }, [selectedMood, note, addMoodEntry])

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-text-primary">How are you?</h3>

      <div className="flex items-stretch justify-between gap-1 sm:gap-1.5">
        {MOODS.map((mood) => (
          <motion.button
            key={mood.value}
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 500, damping: 32 }}
            onClick={() => handleMoodSelect(mood)}
            aria-label={`Log mood: ${mood.label}`}
            aria-pressed={selectedMood?.value === mood.value}
            className={`
              relative flex flex-1 min-h-[72px] sm:min-h-0 flex-col items-center justify-center gap-1 py-2.5 px-1 rounded-md border transition-all duration-150
              ${selectedMood?.value === mood.value
                ? `${mood.bg} shadow-[0_1px_3px_rgba(15,15,15,0.06)] ring-1 ring-black/[0.06]`
                : 'bg-white border-transparent hover:border-black/[0.08] hover:bg-[#fafafa]'
              }
            `}
          >
            <span className="text-xl sm:text-2xl leading-none" aria-hidden>{mood.emoji}</span>
            <span className={`text-[9px] sm:text-[10px] font-medium text-center leading-tight ${
              selectedMood?.value === mood.value ? 'text-text-primary' : 'text-text-muted'
            }`}>
              {mood.label}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence initial={false}>
        {selectedMood && (
          <motion.div
            key="note-panel"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2 rounded-md border border-black/[0.1] bg-white p-3 shadow-[0_1px_3px_rgba(15,15,15,0.06)]"
          >
            <div>
              <label htmlFor="mood-note" className="block text-xs font-semibold text-text-primary mb-1">
                Note <span className="font-normal text-text-muted">(optional)</span>
              </label>
              <p id="mood-note-hint" className="text-[11px] text-text-secondary mb-2">
                Anything on your mind — it appears below in Recent after you save.
              </p>
              <textarea
                ref={noteRef}
                id="mood-note"
                aria-describedby="mood-note-hint"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Slept well, stressed about exam…"
                rows={3}
                className="retro-input retro-input-note w-full resize-y min-h-[88px]"
              />
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-0.5">
              <button
                type="button"
                onClick={() => {
                  setSelectedMood(null)
                  setNote('')
                }}
                className="retro-btn text-text-secondary w-full sm:w-auto"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="button"
                onClick={handleLog}
                className="retro-btn retro-btn-pink w-full sm:w-auto text-sm py-2.5"
              >
                Save mood — {selectedMood.emoji} {selectedMood.label}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {justLogged && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            role="status"
            className="text-center py-2 text-sm text-emerald-800 font-medium bg-emerald-50/80 border border-emerald-200/80 rounded-md"
          >
            Mood saved
          </motion.div>
        )}
      </AnimatePresence>

      <MoodHistory entries={moodEntries} />
    </div>
  )
}
