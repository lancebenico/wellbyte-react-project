import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const STORAGE_PREFIX = 'wellbyte:scroll:'

function scrollKey(location) {
  return `${location.pathname}${location.search}`
}

function savePosition(key) {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(
    `${STORAGE_PREFIX}${key}`,
    JSON.stringify({
      x: window.scrollX,
      y: window.scrollY,
    })
  )
}

function readPosition(key) {
  try {
    return JSON.parse(sessionStorage.getItem(`${STORAGE_PREFIX}${key}`) || 'null')
  } catch {
    return null
  }
}

function restorePosition(location, navigationType) {
  const hash = location.hash ? decodeURIComponent(location.hash.slice(1)) : ''

  if (hash) {
    const target = document.getElementById(hash)
    if (target) {
      target.scrollIntoView({ block: 'start' })
      return
    }
  }

  const saved = readPosition(scrollKey(location))
  const shouldRestore = navigationType === 'POP' && saved
  const next = shouldRestore ? saved : { x: 0, y: 0 }

  window.scrollTo({
    left: next.x || 0,
    top: next.y || 0,
    behavior: 'instant',
  })
}

export default function ScrollRestoration() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const currentKeyRef = useRef(scrollKey(location))

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const saveCurrent = () => savePosition(currentKeyRef.current)
    window.addEventListener('pagehide', saveCurrent)
    window.addEventListener('beforeunload', saveCurrent)

    return () => {
      saveCurrent()
      window.removeEventListener('pagehide', saveCurrent)
      window.removeEventListener('beforeunload', saveCurrent)
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto'
      }
    }
  }, [])

  useLayoutEffect(() => {
    const previousKey = currentKeyRef.current
    savePosition(previousKey)

    const nextKey = scrollKey(location)
    currentKeyRef.current = nextKey

    const timers = []
    const restore = () => restorePosition(location, navigationType)

    requestAnimationFrame(restore)
    if (navigationType === 'POP' || location.hash) {
      ;[60, 180, 360].forEach((delay) => {
        timers.push(window.setTimeout(restore, delay))
      })
    }

    return () => {
      savePosition(nextKey)
      timers.forEach(window.clearTimeout)
    }
  }, [location, navigationType])

  return null
}
