import { motion } from 'framer-motion'
import { fadeInUp } from '../../lib/animations'

const VARIANTS = ['pink', 'blue', 'lavender', 'yellow']

export default function BentoCard({ children, className = '', span = '', delay = 0, variant = 'pink', title = '' }) {
  const windowClass = `retro-window retro-window-${VARIANTS.includes(variant) ? variant : 'pink'}`

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      transition={{ delay }}
      layout
      className={`${windowClass} overflow-hidden transition-shadow duration-200 hover:shadow-[0_2px_8px_rgba(15,15,15,0.06)] ${span} ${className}`}
    >
      {title && (
        <div className="retro-titlebar">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">
            {title}
          </span>
        </div>
      )}
      <div className="p-5 sm:p-6">
        {children}
      </div>
    </motion.div>
  )
}
