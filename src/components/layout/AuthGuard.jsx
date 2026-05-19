import { motion } from 'framer-motion'
import useAuthStore from '../../store/useAuthStore'
import SignInPage from '../../pages/SignInPage'

function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-retro-cream px-4">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        className="text-sm font-medium text-text-secondary"
      >
        Loading…
      </motion.p>
    </div>
  )
}

export default function AuthGuard({ children }) {
  const { user, loading } = useAuthStore()

  if (loading) return <LoadingScreen />
  if (!user) return <SignInPage />
  return children
}
