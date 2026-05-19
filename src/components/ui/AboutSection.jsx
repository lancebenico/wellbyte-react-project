import { motion } from 'framer-motion'
import { Calendar, Heart, ListTodo, Timer, Sparkles, Shield } from 'lucide-react'
import { HOME_COPY } from '../../utils/constants/homePage'

const HIGHLIGHTS = [
  { icon: ListTodo, label: 'Tasks & events' },
  { icon: Calendar, label: 'Academic calendar' },
  { icon: Heart, label: 'Mood reflection' },
  { icon: Timer, label: 'Focus sessions' },
]

export default function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mt-12 sm:mt-16 w-full max-w-4xl mx-auto px-1 sm:px-0"
      aria-labelledby="about-wellbyte-heading"
    >
      <motion.div
        className="relative overflow-hidden rounded-[1.75rem] border border-cics-red/20 shadow-[0_16px_48px_rgba(155,35,53,0.12)]"
        style={{
          background:
            'linear-gradient(145deg, #fdf2f3 0%, #ffffff 42%, #fae8ea 100%)',
        }}
      >
        {/* Decorative shapes */}
        <div
          className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-cics-red/10 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-cics-red-muted/40 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cics-red-deep via-cics-red to-cics-red-muted"
          aria-hidden
        />

        <div className="relative border-l-4 border-cics-red sm:border-l-[5px]">
          <div className="px-5 py-8 sm:px-10 sm:py-10 text-center">
            <motion.div
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cics-red/10 border border-cics-red/15 px-4 py-1.5 mb-5"
              aria-hidden
            >
              <Sparkles className="w-3.5 h-3.5 text-cics-red" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-cics-red-dark">
                Our mission
              </span>
            </motion.div>

            <h2
              id="about-wellbyte-heading"
              className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold uppercase tracking-[0.06em] text-cics-red-deep leading-tight mb-3"
            >
              {HOME_COPY.aboutTitle.replace('WellByte', '').trim() || 'About'}{' '}
              <span className="text-cics-red">WellByte</span>
            </h2>

            <p className="text-[clamp(0.875rem,2.2vw,1rem)] text-cics-red-dark/90 font-medium max-w-xl mx-auto mb-8 leading-relaxed">
              Built for UST CICS students — organize your term, protect your well-being, and thrive
              with intention.
            </p>

            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-8 max-w-2xl mx-auto">
              {HIGHLIGHTS.map(({ icon: Icon, label }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * i, duration: 0.35 }}
                  className="flex flex-col items-center gap-2 rounded-xl bg-white/80 border border-cics-red/12 px-2 py-3 sm:py-4 shadow-sm backdrop-blur-sm"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cics-red text-white shadow-md shadow-cics-red/25">
                    <Icon className="w-4 h-4" strokeWidth={2.25} aria-hidden />
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-cics-red-deep text-center leading-tight">
                    {label}
                  </span>
                </motion.li>
              ))}
            </ul>

            <div className="space-y-4 text-left max-w-2xl mx-auto">
              {HOME_COPY.aboutParagraphs.map((paragraph, i) => (
                <motion.div
                  key={paragraph.slice(0, 40)}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -12 : 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12 + i * 0.08, duration: 0.4 }}
                  className="rounded-xl bg-white/90 border border-cics-red/10 px-4 py-4 sm:px-5 sm:py-5 shadow-sm"
                >
                  <p className="text-sm sm:text-[15px] text-text-secondary leading-relaxed">{paragraph}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-cics-red-deep/5 border border-cics-red/15 px-4 py-2.5"
            >
              <Shield className="w-4 h-4 text-cics-red shrink-0" aria-hidden />
              <p className="text-xs sm:text-sm text-cics-red-dark font-medium">
                Secure sync with your CICS Google account across devices
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}
