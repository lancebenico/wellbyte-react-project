import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toLocalYMD, isTaskOverdue, isDueWithinDays } from '../lib/timeManagement'
import { normalizeItem, migrateStoredItems } from '../lib/items'
import { fetchQuoteForMood, getLatestMoodValue } from '../lib/quotesApi'
import { mergeProfiles } from '../lib/profileMerge'

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

const defaultProfile = {
  displayName: '',
  yearLevel: '',
  semester: '',
  onboardingComplete: false,
}

let currentStorageName = 'wellbyte-storage'

const useStore = create(
  persist(
    (set, get) => ({
      tasks: [],
      moodEntries: [],
      profile: { ...defaultProfile },
      filterStatus: 'all',
      filterPriority: 'all',
      filterDue: 'all',
      filterCategory: 'all',
      pomodoroLog: { dateYmd: '', completedWorkSessions: 0 },
      quote: null,
      quoteLoading: false,

      addTask: (task) =>
        set((state) => ({
          tasks: [
            normalizeItem({
              ...task,
              id: generateId(),
              createdAt: new Date().toISOString(),
            }),
            ...state.tasks,
          ],
        })),

      addTasksFromMilestones: (titles, options = {}) =>
        set((state) => {
          const parent = options.parentTitle?.trim()
          const descPrefix = parent ? `Milestone — ${parent}` : ''
          const newOnes = titles.map((title) =>
            normalizeItem({
              id: generateId(),
              title: title.trim(),
              description: descPrefix,
              category: 'task',
              priority: options.priority ?? 'medium',
              status: 'todo',
              dueDate: options.dueDate ?? null,
              estimatedMinutes: options.estimatedMinutesPerStep ?? null,
              createdAt: new Date().toISOString(),
            })
          )
          return { tasks: [...newOnes, ...state.tasks] }
        }),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? normalizeItem({ ...t, ...updates }) : t
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      toggleTaskStatus: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id
              ? { ...t, status: t.status === 'completed' ? 'todo' : 'completed' }
              : t
          ),
        })),

      setFilterStatus: (status) => set({ filterStatus: status }),
      setFilterPriority: (priority) => set({ filterPriority: priority }),
      setFilterDue: (v) => set({ filterDue: v }),
      setFilterCategory: (v) => set({ filterCategory: v }),

      setProfile: (updates) =>
        set((state) => ({
          profile: {
            ...state.profile,
            ...updates,
            updatedAt: Date.now(),
          },
        })),

      completeOnboarding: (profileUpdates) =>
        set((state) => ({
          profile: {
            ...state.profile,
            ...profileUpdates,
            onboardingComplete: true,
            updatedAt: Date.now(),
          },
        })),

      getFilteredTasks: () => {
        const { tasks, filterStatus, filterPriority, filterDue, filterCategory } = get()
        return tasks.filter((t) => {
          const statusMatch = filterStatus === 'all' || t.status === filterStatus
          const priorityMatch = filterPriority === 'all' || t.priority === filterPriority
          const categoryMatch =
            filterCategory === 'all' || (t.category || 'task') === filterCategory
          if (!statusMatch || !priorityMatch || !categoryMatch) return false
          if (filterDue === 'all') return true
          if (filterDue === 'has_due') return Boolean(t.dueDate)
          if (t.status === 'completed') return false
          if (filterDue === 'overdue') return isTaskOverdue(t)
          if (filterDue === 'week') {
            if (!t.dueDate) return false
            return isDueWithinDays(t, 7, true)
          }
          return true
        })
      },

      incrementPomodoro: () =>
        set((state) => {
          const today = toLocalYMD()
          const log = state.pomodoroLog
          if (!log || log.dateYmd !== today) {
            return { pomodoroLog: { dateYmd: today, completedWorkSessions: 1 } }
          }
          return {
            pomodoroLog: {
              ...log,
              completedWorkSessions: (log.completedWorkSessions || 0) + 1,
            },
          }
        }),

      addMoodEntry: (entry) => {
        set((state) => ({
          moodEntries: [
            { ...entry, id: generateId(), timestamp: new Date().toISOString() },
            ...state.moodEntries,
          ],
        }))
        get().fetchQuote(entry.mood)
      },

      setQuote: (quote) => set({ quote }),
      setQuoteLoading: (loading) => set({ quoteLoading: loading }),

      fetchQuote: async (moodOverride) => {
        set({ quoteLoading: true })
        const mood =
          moodOverride != null && moodOverride !== ''
            ? Number(moodOverride)
            : getLatestMoodValue(get().moodEntries)
        const quote = await fetchQuoteForMood(mood)
        set({ quote, quoteLoading: false })
      },
    }),
    {
      name: currentStorageName,
      partialize: (state) => ({
        tasks: state.tasks,
        moodEntries: state.moodEntries,
        pomodoroLog: state.pomodoroLog,
        profile: state.profile,
      }),
      merge: (persisted, current) => {
        const p = persisted?.state ?? persisted ?? {}
        const tasks = migrateStoredItems(p.tasks ?? current.tasks, p.calendarEvents)
        return {
          ...current,
          ...p,
          tasks: tasks.map(normalizeItem),
          profile: mergeProfiles(current.profile, p.profile),
        }
      },
    }
  )
)

export function hydrateForUser(uid) {
  const name = uid ? `wellbyte-${uid}` : 'wellbyte-storage'
  if (name === currentStorageName) return
  currentStorageName = name

  const raw = localStorage.getItem(name)
  if (raw) {
    try {
      const parsed = JSON.parse(raw)
      const data = parsed?.state ?? {}
      const tasks = migrateStoredItems(data.tasks ?? [], data.calendarEvents)
      useStore.setState({
        tasks: tasks.map(normalizeItem),
        moodEntries: data.moodEntries ?? [],
        pomodoroLog: data.pomodoroLog ?? { dateYmd: '', completedWorkSessions: 0 },
        profile: { ...defaultProfile, ...data.profile },
        filterStatus: 'all',
        filterPriority: 'all',
        filterDue: 'all',
        filterCategory: 'all',
      })
    } catch {
      useStore.setState({
        tasks: [],
        moodEntries: [],
        pomodoroLog: { dateYmd: '', completedWorkSessions: 0 },
        profile: { ...defaultProfile },
        filterStatus: 'all',
        filterPriority: 'all',
        filterDue: 'all',
        filterCategory: 'all',
      })
    }
  } else {
    useStore.setState({
      tasks: [],
      moodEntries: [],
      pomodoroLog: { dateYmd: '', completedWorkSessions: 0 },
      profile: { ...defaultProfile },
      filterStatus: 'all',
      filterPriority: 'all',
      filterDue: 'all',
      filterCategory: 'all',
    })
  }

  useStore.persist.setOptions({ name })
  useStore.persist.rehydrate()
}

export default useStore
