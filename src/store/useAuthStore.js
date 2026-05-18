import { create } from 'zustand'
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth, googleProvider, isFirebaseConfigured } from '../lib/firebase'
import { stopFirestoreSync } from '../lib/firestoreSync'

/** UST CICS Google accounts: local part must end with ".cics" before @ (e.g. juan.cics@ust.edu.ph). */
function isAllowedCicsEmail(email) {
  if (!email) return false
  return /^[^@]+\.cics@ust\.edu\.ph$/i.test(email.trim())
}

const AUTH_DOMAIN_ERROR =
  'Only UST CICS Google accounts are allowed. Use an address like yourname.cics@ust.edu.ph.'

let pendingAuthDomainError = null

const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  error: null,
  configured: isFirebaseConfigured,

  signInWithGoogle: async () => {
    if (!auth || !googleProvider) {
      set({ error: 'Firebase is not configured. Add your credentials to a .env file.' })
      return
    }
    set({ error: null })
    try {
      await signInWithPopup(auth, googleProvider)
      /* User / error state is applied in onAuthStateChanged (including domain validation). */
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') return
      set({ error: err.message })
    }
  },

  signOut: async () => {
    if (!auth) return
    try {
      stopFirestoreSync()
      await firebaseSignOut(auth)
      set({ user: null })
    } catch (err) {
      set({ error: err.message })
    }
  },

  _initAuthListener: () => {
    if (!auth) {
      set({ loading: false })
      return () => {}
    }
    try {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const email = firebaseUser.email || ''
          if (!isAllowedCicsEmail(email)) {
            pendingAuthDomainError = AUTH_DOMAIN_ERROR
            try {
              await firebaseSignOut(auth)
            } catch {
              /* ignore */
            }
            return
          }
          set({ user: serializeUser(firebaseUser), loading: false, error: null })
          return
        }
        const domainMsg = pendingAuthDomainError
        pendingAuthDomainError = null
        set({ user: null, loading: false, error: domainMsg })
      })
      return unsubscribe
    } catch {
      set({ loading: false })
      return () => {}
    }
  },
}))

function serializeUser(firebaseUser) {
  return {
    uid: firebaseUser.uid,
    displayName: firebaseUser.displayName,
    email: firebaseUser.email,
    photoURL: firebaseUser.photoURL,
  }
}

export default useAuthStore
