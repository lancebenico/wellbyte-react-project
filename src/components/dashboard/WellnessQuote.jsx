import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, Quote } from 'lucide-react'
import useStore from '../../store/useStore'
import { moodLabelForQuote } from '../../lib/quotesApi'

export default function WellnessQuote() {
  const { quote, quoteLoading, fetchQuote, moodEntries } = useStore()
  const latestMood = moodEntries[0]?.mood

  useEffect(() => {
    fetchQuote()
  }, [latestMood, fetchQuote])

  return (
    <div className="flex flex-col justify-between h-full min-h-[160px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-[#f0f0ef] border border-black/[0.06] flex items-center justify-center">
            <Quote className="w-4 h-4 text-text-secondary" aria-hidden />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Daily inspiration</h3>
            {(quote?.mood ?? latestMood) && moodLabelForQuote(quote?.mood ?? latestMood) && (
              <p className="text-[10px] text-text-muted mt-0.5">
                For your {moodLabelForQuote(quote?.mood ?? latestMood)} mood
              </p>
            )}
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          type="button"
          onClick={fetchQuote}
          disabled={quoteLoading}
          className="p-2 rounded-md text-text-muted hover:text-text-primary hover:bg-black/[0.04] transition-colors disabled:opacity-45 focus:outline-none focus-visible:ring-2 focus-visible:ring-retro-blue/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f6f3]"
          aria-label="Refresh quote"
        >
          <RefreshCw className={`w-4 h-4 ${quoteLoading ? 'animate-spin' : ''}`} />
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {quoteLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center py-6"
          >
            <div className="w-5 h-5 border-2 border-black/[0.08] border-t-text-primary rounded-full animate-spin" />
          </motion.div>
        ) : quote ? (
          <motion.div
            key={quote.text}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="flex-1 flex flex-col justify-center"
          >
            <blockquote className="quote-gradient text-lg sm:text-xl font-medium leading-snug text-balance mb-3">
              &ldquo;{quote.text}&rdquo;
            </blockquote>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-sm text-text-secondary"
            >
              — {quote.author}
            </motion.p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
