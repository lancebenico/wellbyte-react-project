import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, ChevronDown, Settings, Menu, X } from 'lucide-react'
import useAuthStore from '../../store/useAuthStore'
import { useAppContext } from '../../context/AppContext'
import SettingsModal, { OPEN_SETTINGS_EVENT } from '../profile/SettingsModal'
import { NAV_LINKS } from '../../utils/constants/navigation'
import { getInitials } from '../../utils/getPreferredDisplayName'

function UserMenu({ onOpenSettings, layout = 'dropdown' }) {
  const { user, signOut } = useAuthStore()
  const { preferredDisplayName } = useAppContext()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  const preferredName = preferredDisplayName || 'User'
  const initials = getInitials(preferredName, user?.email)

  useEffect(() => {
    if (layout !== 'dropdown') return undefined
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [layout])

  useEffect(() => {
    if (!open || layout !== 'dropdown') return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, layout])

  if (!user) return null

  if (layout === 'stacked') {
    return (
      <div className="space-y-1 w-full">
        <div className="flex items-center gap-3 px-2.5 py-3 rounded-lg bg-white border border-black/[0.06] shadow-sm">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt=""
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-md object-cover border border-black/[0.06] shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-md bg-[#f0f0ef] border border-black/[0.06] flex items-center justify-center text-sm font-semibold text-text-secondary shrink-0">
              {initials}
            </div>
          )}
          <div className="min-w-0 flex-1 text-left">
            <p className="text-sm font-semibold text-text-primary truncate">{preferredName}</p>
            <p className="text-xs text-text-muted truncate">{user.email}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenSettings}
          className="w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-md text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-cics-red-light/60 transition-colors"
        >
          <Settings className="w-4 h-4 shrink-0" />
          Settings
        </button>
        <button
          type="button"
          onClick={() => signOut()}
          className="w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-md text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-cics-red-light/60 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sign out
        </button>
      </div>
    )
  }

  return (
    <div className="relative shrink-0" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex min-w-0 items-center gap-1.5 xl:gap-2.5 pl-1 pr-1.5 xl:pr-2 py-1 rounded-md hover:bg-black/[0.04] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-retro-blue/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f6f3]"
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
        <span className="text-sm font-medium text-text-primary hidden xl:block max-w-[120px] truncate">
          {preferredName}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-full mt-1.5 w-[min(16rem,calc(100vw-1.5rem))] retro-window overflow-hidden z-[70]"
          >
            <div className="px-3 py-3 border-b border-black/[0.06] bg-[#fafafa]">
              <div className="flex items-center gap-3 min-w-0">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-md object-cover border border-black/[0.06] shrink-0"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-md bg-[#f0f0ef] border border-black/[0.06] flex items-center justify-center text-sm font-semibold text-text-secondary shrink-0">
                    {initials}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-text-primary truncate">{preferredName}</p>
                  <p className="text-xs text-text-muted truncate">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="p-1">
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  onOpenSettings()
                }}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-black/[0.04] transition-colors"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
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

function NavLinkItem({ link, onNavigate, compactNav = false }) {
  const LinkIcon = link.icon
  return (
    <NavLink
      to={link.to}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex min-w-0 items-center gap-2 px-2.5 md:px-3 py-2 md:py-1.5 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cics-red/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f6f3] ${
          isActive
            ? 'text-cics-red-dark bg-cics-red-light'
            : 'text-text-secondary hover:text-cics-red-dark hover:bg-cics-red-light/50'
        }`
      }
    >
      <LinkIcon className="w-4 h-4 opacity-80 shrink-0" aria-hidden />
      {onNavigate ? (
        <span>{link.label}</span>
      ) : compactNav ? (
        <>
          <span className="hidden xl:inline truncate">{link.label}</span>
          <span className="xl:hidden sr-only">{link.label}</span>
        </>
      ) : (
        <span>{link.label}</span>
      )}
    </NavLink>
  )
}

export default function Navbar() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setSettingsOpen(true)
    window.addEventListener(OPEN_SETTINGS_EVENT, handler)
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, handler)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [mobileOpen])

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <motion.nav
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 w-full"
      >
        <div className="border-b border-black/[0.06] bg-[#f7f6f3]/85 backdrop-blur-md supports-[backdrop-filter]:bg-[#f7f6f3]/70">
          <div className="mx-auto max-w-7xl w-full px-3 sm:px-4 h-14 flex items-center justify-between gap-2 sm:gap-4 min-w-0">
            <NavLink
              to="/"
              className="shrink-0 max-w-[9rem] font-semibold text-[clamp(0.875rem,2.5vw,0.9375rem)] tracking-tight text-cics-red-deep truncate rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cics-red/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f6f3]"
            >
              WellByte
            </NavLink>

            <div className="hidden md:flex items-center gap-0.5 xl:gap-1 flex-1 justify-center min-w-0">
              {NAV_LINKS.map((link) => (
                <NavLinkItem key={link.to} link={link} compactNav />
              ))}
            </div>

            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <div className="hidden md:block">
                <UserMenu onOpenSettings={() => setSettingsOpen(true)} layout="dropdown" />
              </div>

              <button
                type="button"
                className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-text-secondary hover:text-cics-red-dark hover:bg-cics-red-light/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cics-red/35"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-drawer"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                id="mobile-nav-drawer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-x-0 top-14 md:hidden border-t border-black/[0.06] bg-[#f7f6f3]/98 shadow-[0_20px_50px_rgba(74,15,24,0.12)]"
              >
                <div className="mx-auto flex max-h-[calc(100vh-3.5rem)] w-full max-w-lg flex-col gap-1 overflow-y-auto overflow-x-hidden px-3 py-3">
                  {NAV_LINKS.map((link) => (
                    <NavLinkItem key={link.to} link={link} onNavigate={closeMobile} />
                  ))}
                  <div className="pt-3 mt-2 border-t border-black/[0.06]">
                    <UserMenu
                      layout="stacked"
                      onOpenSettings={() => {
                        setSettingsOpen(true)
                        closeMobile()
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  )
}
