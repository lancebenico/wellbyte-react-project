import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, Timer, Droplets, StretchHorizontal, Eye, Activity } from 'lucide-react'
import useStore from '../../store/useStore'
import { toLocalYMD } from '../../lib/timeManagement'

const WORK_SEC = 25 * 60
const BREAK_SEC = 5 * 60

const WELLNESS_TIPS = [
  {
    title: 'Hydrate',
    body: 'Drink a full glass of water before your next focus block.',
    icon: Droplets,
  },
  {
    title: 'Stretch',
    body: 'Stand up and do a gentle 2-minute neck, shoulder, and wrist stretch.',
    icon: StretchHorizontal,
  },
  {
    title: 'Eyes',
    body: 'Follow the 20-20-20 rule: look 20 feet away for 20 seconds to rest your eyes.',
    icon: Eye,
  },
  {
    title: 'Breathe',
    body: 'Take four slow breaths — in through the nose, longer exhale through the mouth.',
    icon: Activity,
  },
  {
    title: 'Posture',
    body: 'Roll your shoulders back, unclench your jaw, and reset your chair height.',
    icon: StretchHorizontal,
  },
  {
    title: 'Micro-walk',
    body: 'Walk to another room or window for one minute — light movement helps focus.',
    icon: StretchHorizontal,
  },
]

function formatClock(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function pickBreakTip() {
  return WELLNESS_TIPS[Math.floor(Math.random() * WELLNESS_TIPS.length)]
}

export default function FocusTimer() {
  const incrementPomodoro = useStore((s) => s.incrementPomodoro)
  const pomodoroLog = useStore((s) => s.pomodoroLog)

  const [phase, setPhase] = useState('idle')
  const [secondsLeft, setSecondsLeft] = useState(WORK_SEC)
  const [running, setRunning] = useState(false)
  const [breakTip, setBreakTip] = useState(null)
  const phaseRef = useRef(phase)

  useEffect(() => {
    phaseRef.current = phase
    if (phase === 'break') {
      setBreakTip(pickBreakTip())
    } else {
      setBreakTip(null)
    }
  }, [phase])

  useEffect(() => {
    if (!running) return undefined
    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s > 1) return s - 1
        const ph = phaseRef.current
        if (ph === 'work') {
          incrementPomodoro()
          phaseRef.current = 'break'
          setPhase('break')
          return BREAK_SEC
        }
        if (ph === 'break') {
          phaseRef.current = 'idle'
          setPhase('idle')
          setRunning(false)
          return WORK_SEC
        }
        return WORK_SEC
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [running, incrementPomodoro])

  const today = toLocalYMD()
  const completedToday =
    pomodoroLog?.dateYmd === today ? pomodoroLog.completedWorkSessions || 0 : 0

  const label =
    phase === 'work' ? 'Focus (25 min)' : phase === 'break' ? 'Mindful break (5 min)' : 'Mindful Pomodoro'

  const startWork = () => {
    phaseRef.current = 'work'
    setPhase('work')
    setSecondsLeft(WORK_SEC)
    setRunning(true)
  }

  const resetAll = () => {
    setRunning(false)
    phaseRef.current = 'idle'
    setPhase('idle')
    setSecondsLeft(WORK_SEC)
  }

  const togglePause = () => {
    if (phase === 'idle') {
      startWork()
      return
    }
    setRunning((r) => !r)
  }

  const skipBreak = () => {
    if (phase !== 'break') return
    phaseRef.current = 'idle'
    setPhase('idle')
    setSecondsLeft(WORK_SEC)
    setRunning(false)
  }

  const pct =
    phase === 'work'
      ? 1 - secondsLeft / WORK_SEC
      : phase === 'break'
        ? 1 - secondsLeft / BREAK_SEC
        : 0

  const TipIcon = breakTip?.icon

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-md bg-[#f0f4f8] border border-black/[0.06] flex items-center justify-center">
          <Timer className="w-4 h-4 text-[#406080]" aria-hidden />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-text-primary">Mindful Pomodoro</h3>
          <p className="text-[11px] text-text-muted">25 min focus · 5 min wellness break</p>
        </div>
      </div>

      {phase === 'break' && breakTip && TipIcon && (
        <div className="rounded-lg border border-emerald-200/80 bg-emerald-50/70 px-3 py-3 flex gap-3">
          <div className="w-9 h-9 rounded-md bg-white border border-emerald-200 flex items-center justify-center shrink-0">
            <TipIcon className="w-4 h-4 text-emerald-800" aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-emerald-900">{breakTip.title}</p>
            <p className="text-[11px] text-emerald-900/90 leading-snug mt-0.5">{breakTip.body}</p>
          </div>
        </div>
      )}

      <div className="relative mx-auto w-40 h-40">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100" aria-hidden>
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${pct * 264} 264`}
            className={`transition-[stroke-dasharray] duration-300 ${phase === 'break' ? 'text-emerald-700' : 'text-text-primary'}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold tabular-nums text-text-primary">{formatClock(secondsLeft)}</span>
          <span className="text-[10px] font-medium text-text-muted mt-0.5 text-center px-2">{label}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={togglePause}
          className="retro-btn retro-btn-pink flex items-center gap-1.5 text-xs py-2 px-3"
        >
          {phase === 'idle' ? (
            <>
              <Play className="w-3.5 h-3.5" />
              Start focus
            </>
          ) : running ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              Resume
            </>
          )}
        </button>
        <button type="button" onClick={resetAll} className="retro-btn text-xs py-2 px-3 flex items-center gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
        {phase === 'break' && (
          <button type="button" onClick={skipBreak} className="retro-btn text-xs py-2 px-3">
            Skip break
          </button>
        )}
      </div>

      <p className="text-center text-[11px] text-text-secondary">
        Completed today: <span className="font-semibold text-text-primary tabular-nums">{completedToday}</span>{' '}
        focus blocks
      </p>
    </div>
  )
}
