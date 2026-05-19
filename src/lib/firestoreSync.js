import { doc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { db, isFirebaseConfigured } from './firebase'
import { migrateStoredItems, normalizeItem } from './items'
import { hasPersistedProfile, mergeProfiles } from './profileMerge'

const SAVE_DEBOUNCE_MS = 900

let unsubscribeSnapshot = null
let unsubscribeStore = null
let currentUid = null
let applyingRemote = false
let saveTimer = null

function userDocRef(uid) {
  return doc(db, 'users', uid)
}

function normalizeRemotePayload(data) {
  if (!data) return null
  const tasks = migrateStoredItems(data.tasks ?? [], data.calendarEvents).map(normalizeItem)
  return {
    tasks,
    moodEntries: Array.isArray(data.moodEntries) ? data.moodEntries : [],
    pomodoroLog: data.pomodoroLog ?? { dateYmd: '', completedWorkSessions: 0 },
    profile: data.profile ?? null,
  }
}

export function isApplyingRemoteSync() {
  return applyingRemote
}

export function getSyncUid() {
  return currentUid
}

export async function saveUserDataToFirestore(uid, state) {
  if (!db || !uid || applyingRemote) return

  await setDoc(
    userDocRef(uid),
    {
      tasks: state.tasks ?? [],
      moodEntries: state.moodEntries ?? [],
      pomodoroLog: state.pomodoroLog ?? { dateYmd: '', completedWorkSessions: 0 },
      profile: state.profile ?? null,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  )
}

function scheduleSave(uid, getState) {
  if (!db || !uid || applyingRemote) return
  clearTimeout(saveTimer)
  saveTimer = setTimeout(() => {
    saveUserDataToFirestore(uid, getState()).catch((err) => {
      console.error('[Wellbyte] Firestore save failed:', err)
    })
  }, SAVE_DEBOUNCE_MS)
}

function applyRemoteData(data, setState, getState) {
  const normalized = normalizeRemotePayload(data)
  if (!normalized) return

  applyingRemote = true
  const local = getState()
  setState({
    ...normalized,
    profile: mergeProfiles(local.profile, normalized.profile),
  })
  applyingRemote = false
}

function hasUserContent(state) {
  return (
    (state.tasks?.length ?? 0) > 0 ||
    (state.moodEntries?.length ?? 0) > 0 ||
    (state.pomodoroLog?.completedWorkSessions ?? 0) > 0 ||
    hasPersistedProfile(state.profile)
  )
}

/** Immediately persist current store to Firestore (e.g. after profile save). */
export function flushFirestoreSave(getState) {
  const uid = currentUid
  if (!db || !uid || applyingRemote) return Promise.resolve()
  clearTimeout(saveTimer)
  saveTimer = null
  return saveUserDataToFirestore(uid, getState())
}

/**
 * Listen to Firestore for the signed-in user and push local edits back to the cloud.
 * Returns a cleanup function (call on sign-out).
 */
export function startFirestoreSync(uid, { getState, setState, subscribe }) {
  if (!db || !isFirebaseConfigured || !uid) {
    return () => {}
  }

  stopFirestoreSync()
  currentUid = uid

  let initialCloudApplied = false

  unsubscribeSnapshot = onSnapshot(
    userDocRef(uid),
    async (snap) => {
      if (!snap.exists()) {
        if (!initialCloudApplied) {
          initialCloudApplied = true
          const local = getState()
          if (hasUserContent(local)) {
            try {
              await saveUserDataToFirestore(uid, local)
            } catch (err) {
              console.error('[Wellbyte] Failed to upload local data to Firestore:', err)
            }
          }
        }
        return
      }

      applyRemoteData(snap.data(), setState, getState)
      if (!initialCloudApplied) initialCloudApplied = true
    },
    (err) => {
      console.error('[Wellbyte] Firestore listener error:', err)
    }
  )

  unsubscribeStore = subscribe((state, prevState) => {
    if (applyingRemote) return
    const changed =
      state.tasks !== prevState.tasks ||
      state.moodEntries !== prevState.moodEntries ||
      state.pomodoroLog !== prevState.pomodoroLog ||
      state.profile !== prevState.profile
    if (changed) scheduleSave(uid, getState)
  })

  return stopFirestoreSync
}

export function stopFirestoreSync() {
  if (unsubscribeSnapshot) {
    unsubscribeSnapshot()
    unsubscribeSnapshot = null
  }
  if (unsubscribeStore) {
    unsubscribeStore()
    unsubscribeStore = null
  }
  currentUid = null
  clearTimeout(saveTimer)
  saveTimer = null
}
