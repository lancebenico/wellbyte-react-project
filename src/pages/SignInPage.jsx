import { motion } from 'framer-motion'
import { Shield, BookOpen, Heart, AlertTriangle, Sparkles, GraduationCap } from 'lucide-react'
import useAuthStore from '../store/useAuthStore'
import InstitutionLogos from '../components/home/InstitutionLogos'

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
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-cics-red" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="currentColor" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" opacity="0.7" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor" opacity="0.45" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor" opacity="0.9" />
    </svg>
  )
}

export default function SignInPage() {
  const { signInWithGoogle, error, configured } = useAuthStore()

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#faf9f7]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-cics-red-deep" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-52 h-20 bg-cics-red-light/60" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(232,196,200,0.22),transparent_28rem)]" aria-hidden />

      <div className="relative flex min-h-screen items-center justify-center px-3 py-6 sm:px-4 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-6xl"
        >
          <div className="overflow-hidden rounded-[1.5rem] border border-cics-red/10 bg-white shadow-[0_22px_70px_rgba(74,15,24,0.14)] sm:rounded-[2rem]">
            <div className="grid grid-cols-1 lg:min-h-[min(760px,calc(100vh-4rem))] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,0.82fr)]">
              <section className="relative flex min-w-0 flex-col justify-between bg-cics-red-deep px-4 py-6 text-white sm:px-8 lg:px-10">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(232,196,200,0.18),transparent_45%),radial-gradient(circle_at_100%_0%,rgba(155,35,53,0.7),transparent_40%)]" />
                <div className="relative">
                  <div className="mb-6 rounded-[1.25rem] border border-cics-red/10 bg-white px-3 py-4 shadow-[0_16px_44px_rgba(15,15,15,0.12)] sm:mb-8 sm:rounded-[1.5rem] sm:px-5">
                    <InstitutionLogos size="md" />
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/12 px-4 py-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-cics-red-muted" aria-hidden />
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-cics-red-muted">
                      University of Santo Tomas
                    </span>
                  </div>

                  <h1 className="mt-5 max-w-2xl text-[clamp(2.25rem,12vw,4.6rem)] font-extrabold uppercase leading-[0.96] tracking-tight text-white text-balance">
                    WellByte
                  </h1>
                  <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-white/74">
                    Your productivity and wellness companion for CICS student life. Plan your work,
                    protect your focus, and keep wellness visible through SDG 3 and SDG 4.
                  </p>
                </div>

                <div className="relative mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {features.map((feature) => (
                    <div key={feature.title} className="rounded-2xl border border-white/10 bg-white/12 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-cics-red">
                        <feature.icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                      </div>
                      <p className="text-sm font-bold text-white">{feature.title}</p>
                      <p className="mt-1.5 text-xs font-medium leading-relaxed text-white/66">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="flex min-w-0 flex-col justify-center bg-[#faf9f7] px-4 py-6 sm:px-8 lg:px-10">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                  className="mb-6"
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-cics-red">
                    Secure access
                  </p>
                  <h2 className="mt-2 text-[clamp(1.75rem,8vw,2.25rem)] font-extrabold tracking-tight text-text-primary">
                    Welcome back, Thomasian
                  </h2>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-text-secondary">
                    Sign in with your UST CICS Google Workspace account to continue to your dashboard.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 }}
                  className="retro-window retro-window-pink overflow-hidden shadow-[0_10px_36px_rgba(74,15,24,0.08)]"
                >
                  <div className="retro-titlebar flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-cics-red" aria-hidden />
                    <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-cics-red-dark">
                      Sign in
                    </span>
                  </div>

                  <div className="p-4 sm:p-6 bg-white">
                    {!configured && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 flex items-start gap-3 p-4 rounded-xl bg-cics-red-light border border-cics-red/15"
                >
                  <AlertTriangle className="w-5 h-5 text-cics-red flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-cics-red-deep mb-1">Firebase not configured</p>
                    <p className="text-xs text-cics-red-dark/90 leading-relaxed">
                      Copy <code className="px-1 py-0.5 rounded bg-white text-cics-red-deep text-[11px] font-mono">.env.example</code> to{' '}
                      <code className="px-1 py-0.5 rounded bg-white text-cics-red-deep text-[11px] font-mono">.env</code> and add your
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
                        min-h-11 py-3 text-sm font-semibold bg-white border-cics-red/20
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
                        className="mt-4 text-sm text-cics-red-dark text-center bg-cics-red-light border border-cics-red/15 rounded-xl px-4 py-2.5 font-medium"
                      >
                        {error}
                      </motion.p>
                    )}

                    <div className="mt-5 flex items-center gap-3">
                      <div className="flex-1 h-px bg-cics-red/15" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-cics-red-dark/70">
                        CICS account only
                      </span>
                      <div className="flex-1 h-px bg-cics-red/15" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.32 }}
                  className="mt-5 flex flex-wrap gap-2"
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cics-red/15 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-cics-red-dark">
                    <Sparkles className="w-3 h-3 text-cics-red" aria-hidden />
                    SDG 3 · Good Health
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cics-red/15 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-cics-red-dark">
                    <Sparkles className="w-3 h-3 text-cics-red" aria-hidden />
                    SDG 4 · Quality Education
                  </span>
                </motion.div>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
