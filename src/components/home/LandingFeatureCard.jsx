import { motion } from 'framer-motion'

export default function LandingFeatureCard({ icon: Icon, title, gradient, image, delay = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex-1 min-h-[220px] sm:min-h-[280px] xl:min-h-[320px] rounded-[1.75rem] overflow-hidden shadow-[0_8px_32px_rgba(74,15,24,0.12)]"
    >
      {image ? (
        <img
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
        />
      ) : null}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} ${image ? 'opacity-60 mix-blend-multiply' : ''}`}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-cics-red-deep/90 via-cics-red-deep/35 to-transparent"
        aria-hidden
      />
      <div className="relative h-full flex flex-col justify-end p-5 sm:p-6">
        <div className="w-11 h-11 rounded-full bg-cics-red flex items-center justify-center border-2 border-white/20 shadow-lg mb-3">
          <Icon className="w-5 h-5 text-white" strokeWidth={2} />
        </div>
        <p className="text-sm sm:text-[15px] font-semibold text-white leading-snug text-balance">
          {title}
        </p>
      </div>
    </motion.article>
  )
}
