import {
  YEAR_LEVEL_OPTIONS,
  semesterOptionsForYear,
  formatAcademicTerm,
} from '../../lib/courses'

export default function AcademicProfileFields({
  displayName,
  onDisplayNameChange,
  yearLevel,
  onYearLevelChange,
  semester,
  onSemesterChange,
  showDisplayName = true,
}) {
  const semOptions = semesterOptionsForYear(yearLevel)

  return (
    <div className="space-y-4">
      {showDisplayName && (
        <div>
          <label className="block text-xs font-semibold text-text-muted mb-1" htmlFor="profile-name">
            Preferred Name
          </label>
          <input
            id="profile-name"
            value={displayName}
            onChange={(e) => onDisplayNameChange(e.target.value)}
            className="retro-input w-full"
            placeholder="How should we greet you?"
          />
        </div>
      )}

      <div>
        <p className="text-xs font-semibold text-text-muted mb-2">Year Level</p>
        <div className="grid grid-cols-2 gap-2">
          {YEAR_LEVEL_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onYearLevelChange(opt.value)
                if (semester === 'summer' && opt.value !== '3') onSemesterChange('')
              }}
              className={`py-2 px-2 rounded-md text-xs font-semibold border transition-colors ${
                yearLevel === opt.value
                  ? 'bg-cics-red text-white border-cics-red-dark'
                  : 'bg-white border-black/[0.08] text-text-secondary hover:bg-cics-red-light/40'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-text-muted mb-2">Semester</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {semOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSemesterChange(opt.value)}
              disabled={!yearLevel}
              className={`py-2 px-2 rounded-md text-xs font-semibold border transition-colors disabled:opacity-40 ${
                semester === opt.value
                  ? 'bg-cics-red text-white border-cics-red-dark'
                  : 'bg-white border-black/[0.08] text-text-secondary hover:bg-cics-red-light/40'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {yearLevel && semester && (
          <p className="text-[11px] text-cics-red-dark mt-2 font-medium">
            Selected: {formatAcademicTerm({ yearLevel, semester })}
          </p>
        )}
      </div>
    </div>
  )
}
