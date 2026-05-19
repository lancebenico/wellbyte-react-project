import { createContext, useContext, useMemo } from 'react'
import useAuthStore from '../store/useAuthStore'
import useStore from '../store/useStore'
import { getPreferredDisplayName } from '../utils/getPreferredDisplayName'

const AppContext = createContext(null)

/**
 * React Context API layer for session-facing state (auth user + academic profile).
 * Zustand stores remain the source of truth; this context exposes a stable,
 * composable API for components that should not subscribe to the full store.
 */
export function AppProvider({ children }) {
  const user = useAuthStore((s) => s.user)
  const loading = useAuthStore((s) => s.loading)
  const profile = useStore((s) => s.profile)

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      isAuthenticated: Boolean(user?.uid),
      preferredDisplayName: getPreferredDisplayName(profile, user),
    }),
    [user, profile, loading]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return ctx
}
