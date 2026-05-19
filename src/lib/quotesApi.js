/** Mood-aligned quote fetching (Quotable.io + curated fallbacks). */

const QUOTABLE_BASE = 'https://api.quotable.io'

/** Quotable tag sets per mood value (1 = Rough … 5 = Amazing). */
export const MOOD_QUOTE_TAGS = {
  5: ['happiness', 'success', 'inspirational'],
  4: ['happiness', 'friendship', 'life'],
  3: ['wisdom', 'life', 'motivational'],
  2: ['hope', 'wisdom', 'inspirational'],
  1: ['hope', 'inspirational', 'courage'],
}

const DEFAULT_TAGS = ['wisdom', 'life', 'happiness']

const MOOD_FALLBACKS = {
  5: [
    { text: 'Happiness is not something ready-made. It comes from your own actions.', author: 'Dalai Lama' },
    { text: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
    { text: 'Joy is the simplest form of gratitude.', author: 'Karl Barth' },
  ],
  4: [
    { text: 'Well-being is attained little by little, and is no little thing itself.', author: 'Zeno of Citium' },
    { text: 'Education is the most powerful weapon which you can use to change the world.', author: 'Nelson Mandela' },
    { text: 'A calm mind brings inner strength and self-confidence.', author: 'Dalai Lama' },
  ],
  3: [
    { text: 'The mind is everything. What you think you become.', author: 'Buddha' },
    { text: 'It does not matter how slowly you go as long as you do not stop.', author: 'Confucius' },
    { text: 'Small steps every day still move you forward.', author: 'Unknown' },
  ],
  2: [
    { text: 'You are braver than you believe, stronger than you seem, and smarter than you think.', author: 'A.A. Milne' },
    { text: 'This too shall pass.', author: 'Persian proverb' },
    { text: 'Rest when you need to. Progress is not only speed.', author: 'Unknown' },
  ],
  1: [
    { text: 'Sometimes the bravest thing you can do is ask for help.', author: 'Unknown' },
    { text: 'You have survived every hard day so far. That is worth honoring.', author: 'Unknown' },
    { text: 'Healing is not linear. Be gentle with yourself today.', author: 'Unknown' },
  ],
}

const DEFAULT_FALLBACKS = [
  { text: 'Take care of your body. It is the only place you have to live.', author: 'Jim Rohn' },
  { text: 'Well-being is attained little by little, and is no little thing itself.', author: 'Zeno of Citium' },
  { text: 'The mind is everything. What you think you become.', author: 'Buddha' },
]

export function getLatestMoodValue(moodEntries) {
  const latest = moodEntries?.[0]
  if (!latest || typeof latest.mood !== 'number') return null
  const value = latest.mood
  return value >= 1 && value <= 5 ? value : null
}

export function tagsForMood(moodValue) {
  if (moodValue && MOOD_QUOTE_TAGS[moodValue]) return MOOD_QUOTE_TAGS[moodValue]
  return DEFAULT_TAGS
}

function pickFallback(moodValue) {
  const pool =
    moodValue && MOOD_FALLBACKS[moodValue] ? MOOD_FALLBACKS[moodValue] : DEFAULT_FALLBACKS
  return pool[Math.floor(Math.random() * pool.length)]
}

function normalizeQuotablePayload(data) {
  if (!data) return null
  const item = Array.isArray(data) ? data[0] : data
  if (!item?.content) return null
  return { text: item.content, author: item.author || 'Unknown' }
}

/**
 * Fetch a quote aligned to the user's mood (or default tags if unset).
 * @returns {Promise<{ text: string, author: string, mood: number | null }>}
 */
export async function fetchQuoteForMood(moodValue) {
  const tags = tagsForMood(moodValue)
  const tagQuery = tags.join('|')

  try {
    const res = await fetch(`${QUOTABLE_BASE}/quotes/random?tags=${encodeURIComponent(tagQuery)}`)
    if (res.ok) {
      const data = await res.json()
      const quote = normalizeQuotablePayload(data)
      if (quote) return { ...quote, mood: moodValue ?? null }
    }
    throw new Error('Quotable unavailable')
  } catch {
    const fallback = pickFallback(moodValue)
    return { ...fallback, mood: moodValue ?? null }
  }
}

export function moodLabelForQuote(moodValue) {
  const labels = {
    5: 'Amazing',
    4: 'Good',
    3: 'Okay',
    2: 'Low',
    1: 'Rough',
  }
  return moodValue ? labels[moodValue] : null
}
