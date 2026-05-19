import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import OnboardingModal from './components/auth/OnboardingModal'
import AuthGuard from './components/layout/AuthGuard'
import ScrollRestoration from './components/layout/ScrollRestoration'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import CalendarPage from './pages/CalendarPage'
import DevelopersPage from './pages/DevelopersPage'
import SupportResourcesPage from './pages/SupportResourcesPage'
import useAuthStore from './store/useAuthStore'
import useStore, { hydrateForUser } from './store/useStore'
import { startFirestoreSync, stopFirestoreSync } from './lib/firestoreSync'
import { isFirebaseConfigured } from './lib/firebase'
import { AppProvider } from './context/AppContext'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/support" element={<SupportResourcesPage />} />
        <Route path="/developers" element={<DevelopersPage />} />
      </Routes>
    </AnimatePresence>
  )
}

function AuthenticatedApp() {
  const user = useAuthStore((s) => s.user)
  const onboardingComplete = useStore((s) => s.profile?.onboardingComplete)

  useEffect(() => {
    if (!user?.uid) {
      stopFirestoreSync()
      return undefined
    }

    hydrateForUser(user.uid)

    if (!isFirebaseConfigured) return undefined

    const stopSync = startFirestoreSync(user.uid, {
      getState: () => useStore.getState(),
      setState: (partial) => useStore.setState(partial),
      subscribe: useStore.subscribe,
    })

    return () => {
      stopSync()
    }
  }, [user?.uid])

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <AnimatedRoutes />
      {!onboardingComplete && <OnboardingModal />}
    </div>
  )
}

export default function App() {
  const initAuthListener = useAuthStore((s) => s._initAuthListener)

  useEffect(() => {
    const unsubscribe = initAuthListener()
    return () => unsubscribe()
  }, [initAuthListener])

  return (
    <BrowserRouter>
      <AppProvider>
        <ScrollRestoration />
        <AuthGuard>
          <AuthenticatedApp />
        </AuthGuard>
      </AppProvider>
    </BrowserRouter>
  )
}
