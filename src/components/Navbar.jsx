import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, LayoutDashboard, Calendar, HeartHandshake, Users, LogOut, ChevronDown } from 'lucide-react'
import useAuthStore from '../store/useAuthStore'

const links = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/calendar', label: 'Calendar', icon: Calendar },
  { to: '/support', label: 'Support', icon: HeartHandshake },
  { to: '/developers', label: 'Developers', icon: Users },
]

function UserMenu() {
  const { user, signOut } = useAuthStore()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!user) return null

  const initials = (user.displayName || user.email || '?')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-md hover:bg-black/[0.04] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-retro-blue/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f6f3]"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt=""
            referrerPolicy="no-referrer"
            className="w-8 h-8 rounded-md object-cover border border-black/[0.06]"
          />
        ) : (
          <div className="w-8 h-8 rounded-md bg-[#f0f0ef] border border-black/[0.06] flex items-center justify-center text-xs font-semibold text-text-secondary">
            {initials}
          </div>
        )}
        <span className="text-sm font-medium text-text-primary hidden sm:block max-w-[120px] truncate">
          {user.displayName || user.email}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-full mt-1.5 w-64 retro-window overflow-hidden z-50"
          >
            <div className="px-3 py-3 border-b border-black/[0.06] bg-[#fafafa]">
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-md object-cover border border-black/[0.06]"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-md bg-[#f0f0ef] border border-black/[0.06] flex items-center justify-center text-sm font-semibold text-text-secondary">
                    {initials}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-text-primary truncate">
                    {user.displayName || 'User'}
                  </p>
                  <p className="text-xs text-text-muted truncate">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="p-1">
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  signOut()
                }}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-black/[0.04] transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="border-b border-black/[0.06] bg-[#f7f6f3]/85 backdrop-blur-md supports-[backdrop-filter]:bg-[#f7f6f3]/70">
        <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between gap-4">
          <NavLink
            to="/"
            className="font-semibold text-[15px] tracking-tight text-cics-red-deep truncate min-w-0 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cics-red/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f6f3]"
          >
            WellByte
          </NavLink>

          <div className="flex items-center gap-0.5">
            {links.map((link) => {
              const LinkIcon = link.icon
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cics-red/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f6f3] ${
                      isActive
                        ? 'text-cics-red-dark bg-cics-red-light'
                        : 'text-text-secondary hover:text-cics-red-dark hover:bg-cics-red-light/50'
                    }`
                  }
                >
                  <LinkIcon className="w-4 h-4 opacity-80" aria-hidden />
                  {link.label}
                </NavLink>
              )
            })}
          </div>

          <UserMenu />
        </div>
      </div>
    </motion.nav>
  )
}
