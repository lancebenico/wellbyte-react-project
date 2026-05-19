import { createElement } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Heart, ListTodo, Timer, Sparkles, Shield } from 'lucide-react'

const HIGHLIGHTS = [
  {
    icon: ListTodo,
    title: 'Plan with less friction',
    text: 'Group tasks, deadlines, and school events so your week feels easier to scan before it gets crowded.',
  },
  {
    icon: Heart,
    title: 'Notice how you are doing',
    text: 'Mood check-ins and quotes add a small pause between academic pressure and your next decision.',
  },
  {
    icon: Timer,
    title: 'Protect focused time',
    text: 'Break work into calmer sessions and give rest the same space as requirements and reminders.',
  },
  {
    icon: Shield,
    title: 'Why it matters',
    text: 'A good plan should help you submit on time while still showing up for your classes, projects, friends, and yourself.',
  },
]

export default function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mt-10 sm:mt-14 w-full max-w-6xl mx-auto px-1 sm:px-0"
      aria-labelledby="about-wellbyte-heading"
    >
      <motion.div
        className="relative overflow-hidden rounded-[1.75rem] border border-cics-red/10 bg-white shadow-[0_18px_56px_rgba(74,15,24,0.1)]"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(253,242,243,0)_0%,rgba(253,242,243,0.72)_100%)]"
          aria-hidden
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)]">
          <div className="relative flex min-h-[28rem] flex-col justify-between bg-cics-red-deep px-5 py-7 text-white sm:px-8 sm:py-9 lg:min-h-[33rem] lg:px-10">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(232,196,200,0.16),transparent_46%),linear-gradient(180deg,rgba(107,21,36,0.45),rgba(74,15,24,0))]" />
            <div className="relative">
              <div className="mb-5 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/12 px-4 py-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cics-red-muted" aria-hidden />
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-cics-red-muted">
                  Built for CICS student life
                </span>
              </div>

              <h2
                id="about-wellbyte-heading"
                className="max-w-xl text-[clamp(2rem,5vw,3.15rem)] font-extrabold leading-[1.08] tracking-tight text-white text-balance"
              >
                WellByte helps you turn a busy semester into a rhythm you can actually live with.
              </h2>

              <p className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-white/74 sm:text-base">
                It brings academic planning and wellness habits into one calm space, so deadlines,
                reflections, and focus sessions can support each other instead of competing for your attention.
              </p>
            </div>

            <div className="relative mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                ['01', 'Organize the load'],
                ['02', 'Check in with yourself'],
                ['03', 'Make room to recover'],
              ].map(([number, label]) => (
                <div key={number} className="rounded-xl border border-white/10 bg-white/12 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <p className="text-2xl font-extrabold leading-none text-white">{number}</p>
                  <p className="mt-2 text-[11px] font-bold text-white/70">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-3 bg-white/95 px-4 py-6 sm:px-7 sm:py-8 lg:px-9">
            {HIGHLIGHTS.map(({ icon: Icon, title, text }, i) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * i, duration: 0.35 }}
                className="rounded-2xl border border-cics-red/10 bg-white px-4 py-4 shadow-[0_8px_26px_rgba(74,15,24,0.045)] transition-all duration-200 hover:-translate-y-0.5 hover:border-cics-red/18 hover:shadow-[0_12px_32px_rgba(74,15,24,0.075)] sm:px-5"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cics-red-light text-cics-red">
                    {createElement(Icon, { className: 'w-4 h-4', strokeWidth: 2.25, 'aria-hidden': true })}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-text-primary sm:text-[15px]">{title}</h3>
                    <p className="mt-1.5 text-xs font-medium leading-relaxed text-text-secondary sm:text-sm">
                      {text}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-1 flex items-center gap-3 rounded-2xl border border-cics-red/10 bg-cics-red-light/70 px-4 py-3"
            >
              <Calendar className="w-4 h-4 text-cics-red shrink-0" aria-hidden />
              <p className="text-xs sm:text-sm text-cics-red-dark font-semibold">
                Secure sync with your CICS Google account across devices
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}
