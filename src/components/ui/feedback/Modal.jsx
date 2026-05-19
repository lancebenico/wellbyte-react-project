import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Modal({
  open,
  onClose,
  children,
  className = '',
  overlayClassName = '',
  zIndex = 'z-[70]',
  closeOnOverlay = true,
}) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 ${zIndex} flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-[2px] overflow-y-auto ${overlayClassName}`.trim()}
          onClick={closeOnOverlay ? onClose : undefined}
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`w-full max-w-lg max-h-[min(90vh,720px)] overflow-y-auto ${className}`.trim()}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
