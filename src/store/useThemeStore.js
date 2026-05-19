import { create } from 'zustand'
import { persist } from 'zustand/middleware'

function applyTheme(theme) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', theme)
}

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'light',

      setTheme: (theme) => {
        const next = theme === 'dark' ? 'dark' : 'light'
        applyTheme(next)
        set({ theme: next })
      },

      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark'
        applyTheme(next)
        set({ theme: next })
      },
    }),
    {
      name: 'wellbyte-theme',
      onRehydrateStorage: () => (state) => {
        if (state?.theme) applyTheme(state.theme)
      },
    }
  )
)

/** Call once before React mounts to avoid a light flash. */
export default useThemeStore

export function initThemeFromStorage() {
  try {
    const raw = localStorage.getItem('wellbyte-theme')
    if (!raw) return
    const parsed = JSON.parse(raw)
    const theme = parsed?.state?.theme
    if (theme === 'dark' || theme === 'light') applyTheme(theme)
  } catch {
    /* ignore */
  }
}
