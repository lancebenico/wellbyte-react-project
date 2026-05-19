import { useEffect } from 'react'
import useThemeStore from '../../store/useThemeStore'

/** Keeps `data-theme` on `<html>` in sync with the persisted store. */
export default function ThemeSync() {
  const theme = useThemeStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return null
}
