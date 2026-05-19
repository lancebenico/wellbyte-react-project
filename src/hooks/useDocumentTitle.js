import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ROUTE_TITLES = {
  '/': 'Home',
  '/dashboard': 'Dashboard',
  '/calendar': 'Calendar',
  '/support': 'Support',
  '/developers': 'Developers',
}

const BASE = 'WellByte'

export default function useDocumentTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    const page = ROUTE_TITLES[pathname] ?? 'WellByte'
    document.title = page === BASE ? `${BASE} — Student Productivity & Wellness` : `${page} — ${BASE}`
  }, [pathname])
}
