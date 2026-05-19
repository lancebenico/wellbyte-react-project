import { useState, useEffect } from 'react'
import { GraduationCap } from 'lucide-react'
import useAuthStore from '../../store/useAuthStore'
import useStore from '../../store/useStore'
import AcademicProfileFields from '../profile/AcademicProfileFields'
import { isAcademicTermConfigured } from '../../lib/courses'

export default function OnboardingModal() {
  const authUser = useAuthStore((s) => s.user)
  const completeOnboarding = useStore((s) => s.completeOnboarding)
  const [displayName, setDisplayName] = useState('')
  const [yearLevel, setYearLevel] = useState('')
  const [semester, setSemester] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fromAuth = authUser?.displayName?.trim()
    if (fromAuth) setDisplayName(fromAuth)
  }, [authUser?.displayName])

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
    setError('')
    completeOnboarding({
      displayName: displayName.trim(),
      yearLevel,
      semester,
    })
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
      <div className="w-full max-w-md max-h-[92vh] overflow-y-auto retro-window rounded-xl shadow-xl">
        <div className="px-5 py-4 border-b border-black/[0.06] bg-cics-red-light/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cics-red flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-text-primary">Welcome to WellByte</h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Tell us a little about yourself so we can tailor your subjects and schedule.
              </p>
            </div>
          </div>
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

          <button type="submit" className="retro-btn retro-btn-pink w-full py-2.5 font-semibold">
            Continue to WellByte
          </button>
        </form>
      </div>
    </div>
  )
}
