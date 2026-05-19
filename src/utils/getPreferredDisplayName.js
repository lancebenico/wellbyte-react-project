/** Preferred name from profile (settings/onboarding), then Google display name, then email local-part. */
export function getPreferredDisplayName(profile, authUser, fallback = 'Thomasian') {
  const fromProfile = profile?.displayName?.trim()
  if (fromProfile) return fromProfile

  const fromAuth = authUser?.displayName?.trim()
  if (fromAuth) return fromAuth

  const fromEmail = authUser?.email?.split('@')[0]?.trim()
  if (fromEmail) return fromEmail

  return fallback
}

export function getInitials(name, email) {
  const source = (name || email || '?').trim()
  return source
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
