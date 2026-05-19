import { useState, useEffect } from 'react'
import { X, Settings } from 'lucide-react'
import useStore from '../store/useStore'
import AcademicProfileFields from './AcademicProfileFields'
import { isAcademicTermConfigured } from '../lib/courses'

export const OPEN_SETTINGS_EVENT = 'wellbyte:open-settings'

export function requestOpenSettings() {
  window.dispatchEvent(new CustomEvent(OPEN_SETTINGS_EVENT))
}

export default function SettingsModal({ open, onClose }) {
  const profile = useStore((s) => s.profile)
  const setProfile = useStore((s) => s.setProfile)
  const [displayName, setDisplayName] = useState('')
  const [yearLevel, setYearLevel] = useState('')
  const [semester, setSemester] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    setDisplayName(profile.displayName || '')
    setYearLevel(profile.yearLevel || '')
    setSemester(profile.semester || '')
    setError('')
  }, [open, profile])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!displayName.trim()) {
      setError('Please enter your preferred name.')
      return
    }
    if (!isAcademicTermConfigured({ yearLevel, semester })) {
      setError('Please select your year level and semester.')
      return
    }
    setProfile({
      displayName: displayName.trim(),
      yearLevel,
      semester,
    })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div className="w-full max-w-md max-h-[92vh] overflow-y-auto retro-window rounded-xl shadow-xl">
        <div className="px-5 py-4 border-b border-black/[0.06] bg-cics-red-light/50 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-cics-red flex items-center justify-center shrink-0">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 id="settings-title" className="text-base font-bold text-text-primary">
                Academic Settings
              </h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Update your name, year level, and semester for subject lists.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-black/[0.06] transition-colors"
            aria-label="Close settings"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <AcademicProfileFields
            displayName={displayName}
            onDisplayNameChange={setDisplayName}
            yearLevel={yearLevel}
            onYearLevelChange={setYearLevel}
            semester={semester}
            onSemesterChange={setSemester}
          />

          {error && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={onClose} className="retro-btn text-text-secondary">
              Cancel
            </button>
            <button type="submit" className="retro-btn retro-btn-pink font-semibold">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
