import { Moon, Sun } from 'lucide-react'
import useThemeStore from '../../store/useThemeStore'

export default function ThemeToggleMenuItem({ onAfterToggle, className = '' }) {
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      role="menuitem"
      onClick={() => {
        toggleTheme()
        onAfterToggle?.()
      }}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={
        className ||
        'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-black/[0.04] transition-colors'
      }
    >
      {isDark ? (
        <Sun className="w-4 h-4 shrink-0" aria-hidden />
      ) : (
        <Moon className="w-4 h-4 shrink-0" aria-hidden />
      )}
      {isDark ? 'Light mode' : 'Dark mode'}
    </button>
  )
}
