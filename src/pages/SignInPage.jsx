import { motion } from 'framer-motion'
import { Shield, BookOpen, Heart, AlertTriangle, Sparkles, GraduationCap } from 'lucide-react'
import useAuthStore from '../store/useAuthStore'
import InstitutionLogos from '../components/InstitutionLogos'

const features = [
  {
    icon: BookOpen,
    title: 'Track your tasks',
    description: 'Organize assignments, goals, and daily habits in one calm view.',
  },
  {
    icon: Heart,
    title: 'Prioritize wellness',
    description: 'Log mood over time and take breaks with the Pomodoro timer.',
  },
  {
    icon: Shield,
    title: 'Private & secure',
    description: 'Your data stays yours, synced to your UST CICS Google account.',
  },
]

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

export default function SignInPage() {
  const { signInWithGoogle, error, configured } = useAuthStore()

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#faf9f7]">
      {/* Background accents */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cics-red/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-cics-red-muted/40 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 h-48 w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cics-red-light/60 blur-2xl"
        aria-hidden
      />

      <div className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <InstitutionLogos className="mb-8" size="md" />

          {/* Brand banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="rounded-2xl bg-cics-red-deep px-6 py-5 text-center shadow-[0_12px_40px_rgba(74,15,24,0.22)] mb-6"
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-cics-red-muted">
              University of Santo Tomas
            </p>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">WellByte</p>
            <p className="text-xs text-white/75 mt-2 font-medium">
              College of Information and Computing Sciences
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="text-center mb-6"
          >
            <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight mb-2">
              Welcome back, Thomasian
            </h1>
            <p className="text-sm text-text-secondary leading-relaxed max-w-sm mx-auto">
              Your productivity and wellness companion — clear, calm, and focused. Framed around the spirit
              of UN SDGs 3 and 4.
            </p>
          </motion.div>

          {/* Sign-in card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="retro-window retro-window-pink overflow-hidden mb-6 shadow-[0_8px_30px_rgba(74,15,24,0.08)]"
          >
            <div className="retro-titlebar flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-cics-red" aria-hidden />
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-cics-red-dark">
                Sign in
              </span>
            </div>

            <div className="p-5 sm:p-6 bg-white">
              <div className="rounded-xl border border-cics-red/12 bg-cics-red-light/60 px-3.5 py-3 mb-5">
                <p className="text-xs text-cics-red-dark leading-relaxed text-center">
                  Sign-in is limited to{' '}
                  <span className="font-mono font-semibold text-cics-red-deep">*.cics@ust.edu.ph</span>{' '}
                  UST CICS Google Workspace accounts.
                </p>
              </div>

              {!configured && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200"
                >
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-900 mb-1">Firebase not configured</p>
                    <p className="text-xs text-amber-800/90 leading-relaxed">
                      Copy <code className="px-1 py-0.5 rounded bg-amber-100/80 text-amber-900 text-[11px] font-mono">.env.example</code> to{' '}
                      <code className="px-1 py-0.5 rounded bg-amber-100/80 text-amber-900 text-[11px] font-mono">.env</code> and add your
                      Firebase project credentials, then restart the dev server.
                    </p>
                  </div>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: configured ? 1.01 : 1 }}
                whileTap={{ scale: configured ? 0.99 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                onClick={signInWithGoogle}
                disabled={!configured}
                className="
                  retro-btn w-full flex items-center justify-center gap-3
                  py-3 text-sm font-semibold bg-white border-cics-red/20
                  hover:border-cics-red/35 hover:bg-cics-red-light/30
                  disabled:opacity-40 disabled:cursor-not-allowed
                "
              >
                <GoogleIcon />
                Continue with Google
              </motion.button>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-sm text-red-800 text-center bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 font-medium"
                >
                  {error}
                </motion.p>
              )}

              <div className="mt-5 flex items-center gap-3">
                <div className="flex-1 h-px bg-cics-red/15" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-cics-red-dark/70">
                  Secure access
                </span>
                <div className="flex-1 h-px bg-cics-red/15" />
              </div>
            </div>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.22 }}
            className="space-y-2.5 mb-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 + i * 0.06 }}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-cics-red/10 shadow-sm hover:border-cics-red/25 hover:shadow-[0_4px_16px_rgba(74,15,24,0.06)] transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-cics-red flex items-center justify-center flex-shrink-0 shadow-sm">
                  <feature.icon className="w-4 h-4 text-white" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-cics-red-deep">{feature.title}</p>
                  <p className="text-xs text-text-secondary leading-relaxed mt-0.5">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* SDG footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.38 }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cics-red/15 bg-cics-red-light/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-cics-red-dark">
              <Sparkles className="w-3 h-3 text-cics-red" aria-hidden />
              SDG 3 · Good Health
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cics-red/15 bg-cics-red-light/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-cics-red-dark">
              <Sparkles className="w-3 h-3 text-cics-red" aria-hidden />
              SDG 4 · Quality Education
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
