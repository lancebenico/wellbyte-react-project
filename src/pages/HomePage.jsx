import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, GraduationCap, Quote, RefreshCw } from 'lucide-react'
import PageTransition from '../components/ui/PageTransition'
import PageWrapper from '../components/layout/PageWrapper'
import InstitutionLogos from '../components/InstitutionLogos'
import LandingFeatureCard from '../components/LandingFeatureCard'
import AboutSection from '../components/ui/AboutSection'
import useAuthStore from '../store/useAuthStore'
import useStore from '../store/useStore'
import { getPreferredDisplayName } from '../utils/getPreferredDisplayName'
import { getTaskSummary } from '../lib/taskStats'
import { moodLabelForQuote } from '../lib/quotesApi'
import useLiveClock from '../hooks/useLiveClock'
import { HOME_FEATURE_CARDS, HOME_COPY } from '../utils/constants/homePage'

function StatPill({ label, value }) {
  return (
    <div className="rounded-xl border border-cics-red/12 bg-white px-3 py-2.5 text-center shadow-sm">
      <p className="text-lg font-semibold tabular-nums text-cics-red-deep leading-none">{value}</p>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted mt-1">{label}</p>
    </div>
  )
}

export default function HomePage() {
  const user = useAuthStore((s) => s.user)
  const profile = useStore((s) => s.profile)
  const tasks = useStore((s) => s.tasks)
  const { quote, quoteLoading, fetchQuote, moodEntries } = useStore()
  const { dateLabel, timeLabel } = useLiveClock()
  const summary = getTaskSummary(tasks)
  const latestMood = moodEntries[0]?.mood

  const displayName = getPreferredDisplayName(profile, user)

  useEffect(() => {
    fetchQuote()
  }, [latestMood, fetchQuote])

  return (
    <PageTransition>
      <PageWrapper maxWidth="max-w-[min(1400px,100%)]" paddingTop="pt-14 sm:pt-16" paddingBottom="pb-10 sm:pb-12" className="bg-[#faf9f7]">
        <div className="w-full py-6 sm:py-10 min-w-0">
          {/* Main portal grid — mirrors Thomasian Freshmen layout */}
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(320px,440px)_minmax(0,1fr)] gap-5 xl:gap-6 items-stretch">
            {/* Left feature column */}
            <div className="hidden xl:flex flex-col gap-5">
              {HOME_FEATURE_CARDS.left.map((card, i) => (
                <LandingFeatureCard key={card.title} {...card} delay={0.05 + i * 0.08} />
              ))}
            </div>

            {/* Center column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center order-first xl:order-none"
            >
              <InstitutionLogos className="mb-6" size="md" />

              <div className="w-full max-w-md rounded-[1.75rem] bg-cics-red-deep px-6 py-5 shadow-[0_12px_40px_rgba(74,15,24,0.25)] mb-6">
                <p className="text-xl sm:text-2xl font-bold tracking-tight text-cics-red-muted uppercase">
                  {HOME_COPY.brandLine1}
                </p>
                <p className="text-2xl sm:text-[1.75rem] font-bold tracking-tight text-white uppercase mt-0.5">
                  {HOME_COPY.brandLine2}
                </p>
              </div>

              <h1 className="text-[clamp(1.125rem,3vw,1.5rem)] font-bold text-text-primary leading-snug max-w-md mb-3 text-balance">
                {HOME_COPY.welcomePrefix} {displayName}.
              </h1>

              <p className="text-[clamp(0.8125rem,2vw,0.9375rem)] text-text-secondary leading-relaxed max-w-md mb-5">
                {HOME_COPY.portalDescription}
              </p>

              <div className="w-full max-w-md rounded-2xl border border-cics-red/15 bg-cics-red-light/50 px-4 py-3 mb-5 text-left">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-cics-red-dark mb-1">
                  {HOME_COPY.todayLabel}
                </p>
                <p className="text-sm font-medium text-text-primary">{dateLabel}</p>
                <p className="text-base font-semibold tabular-nums text-cics-red mt-0.5">{timeLabel}</p>
              </div>

              {/* Quote of the Day */}
              <div className="w-full max-w-md rounded-2xl border border-cics-red/12 bg-white p-4 mb-5 text-left shadow-sm">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-cics-red flex items-center justify-center">
                      <Quote className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xs font-bold uppercase tracking-wide text-cics-red-dark">
                        {HOME_COPY.quoteTitle}
                      </h2>
                      {(quote?.mood ?? latestMood) && moodLabelForQuote(quote?.mood ?? latestMood) && (
                        <p className="text-[10px] text-text-muted mt-0.5">
                          For your {moodLabelForQuote(quote?.mood ?? latestMood)} mood
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={fetchQuote}
                    disabled={quoteLoading}
                    className="p-1.5 rounded-full text-cics-red hover:bg-cics-red-light transition-colors disabled:opacity-50"
                    aria-label="Refresh quote"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${quoteLoading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
                {quoteLoading && !quote ? (
                  <div className="py-4 flex justify-center">
                    <div className="w-5 h-5 border-2 border-cics-red/25 border-t-cics-red rounded-full animate-spin" />
                  </div>
                ) : quote ? (
                  <blockquote>
                    <p className="text-sm font-medium text-text-primary leading-relaxed">
                      &ldquo;{quote.text}&rdquo;
                    </p>
                    <footer className="text-xs text-cics-red-dark font-semibold mt-2">
                      — {quote.author}
                    </footer>
                  </blockquote>
                ) : (
                  <p className="text-xs text-text-muted">Unable to load a quote. Please try again.</p>
                )}
              </div>

              {/* Task summary */}
              <div className="w-full max-w-md mb-6">
                <h2 className="text-xs font-bold uppercase tracking-wide text-cics-red-dark mb-3">
                  {HOME_COPY.taskSummaryTitle}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <StatPill label="Total Items" value={summary.total} />
                  <StatPill label="Open" value={summary.open} />
                  <StatPill label="Completed" value={summary.completed} />
                  <StatPill label="In Progress" value={summary.inProgress} />
                  <StatPill label="Tasks" value={summary.tasks} />
                  <StatPill label="Events" value={summary.events} />
                  <StatPill label="Due This Week" value={summary.dueThisWeek} />
                  <StatPill label="Overdue" value={summary.overdue} />
                </div>
              </div>

              <Link
                to="/dashboard"
                className="group w-full max-w-md inline-flex items-center justify-between gap-3 rounded-full bg-cics-red px-6 py-4 text-base font-bold text-white shadow-[0_8px_24px_rgba(155,35,53,0.35)] hover:bg-cics-red-dark transition-colors"
              >
                <span>{HOME_COPY.dashboardCta}</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-cics-red-deep shrink-0 group-hover:scale-105 transition-transform">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>

              <div className="flex items-center justify-center gap-2 mt-6 max-w-md">
                <div className="w-9 h-9 rounded-full bg-cics-red flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs sm:text-sm text-text-secondary text-left leading-relaxed">
                  {HOME_COPY.footerNote}{' '}
                  <em className="font-semibold text-cics-red not-italic">{HOME_COPY.footerEmphasis}</em>.
                </p>
              </div>

              <Link
                to="/calendar"
                className="mt-4 text-sm font-semibold text-cics-red hover:text-cics-red-dark inline-flex items-center gap-1"
              >
                <Calendar className="w-4 h-4" />
                {HOME_COPY.calendarLink}
              </Link>
            </motion.div>

            {/* Right feature column */}
            <div className="hidden xl:flex flex-col gap-5">
              {HOME_FEATURE_CARDS.right.map((card, i) => (
                <LandingFeatureCard key={card.title} {...card} delay={0.1 + i * 0.08} />
              ))}
            </div>
          </div>

          {/* Mobile / tablet feature cards */}
          <div className="xl:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 max-w-2xl mx-auto">
            {[...HOME_FEATURE_CARDS.left, ...HOME_FEATURE_CARDS.right].map((card, i) => (
              <LandingFeatureCard key={card.title} {...card} delay={0.15 + i * 0.05} />
            ))}
          </div>

          <AboutSection />
        </div>
      </PageWrapper>
    </PageTransition>
  )
}
