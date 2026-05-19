/** Merge local and remote profile; newer `updatedAt` wins field-level conflicts. */
export function mergeProfiles(local, remote) {
  const l = local && typeof local === 'object' ? local : {}
  const r = remote && typeof remote === 'object' ? remote : {}
  const lts = l.updatedAt ?? 0
  const rts = r.updatedAt ?? 0
  const newer = lts >= rts ? l : r
  const older = lts >= rts ? r : l

  return {
    displayName:
      newer.displayName?.trim() ||
      older.displayName?.trim() ||
      l.displayName?.trim() ||
      r.displayName?.trim() ||
      '',
    yearLevel: newer.yearLevel || older.yearLevel || l.yearLevel || r.yearLevel || '',
    semester: newer.semester || older.semester || l.semester || r.semester || '',
    onboardingComplete: Boolean(l.onboardingComplete || r.onboardingComplete),
    updatedAt: Math.max(lts, rts),
  }
}

export function hasPersistedProfile(profile) {
  if (!profile) return false
  return Boolean(
    profile.onboardingComplete ||
      profile.displayName?.trim() ||
      (profile.yearLevel && profile.semester)
  )
}
