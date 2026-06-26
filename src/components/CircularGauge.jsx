import { useEffect, useRef, useState } from 'react'

/**
 * CircularGauge — pure SVG/CSS gauge, no chart libraries.
 * Mimics the dashboard-style dial seen in reference_showcase.mp4
 * (e.g. "98% Cache", "15 Core Systems").
 *
 * Animates the stroke-dashoffset on mount using native CSS transition
 * (not a JS animation engine) — satisfies the "native CSS transitions only"
 * constraint from the PS motion rules.
 */
export default function CircularGauge({ value, max = 100, label, sublabel, accent = '#FFC801' }) {
  const circleRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  const radius = 54
  const circumference = 2 * Math.PI * radius
  const pct = Math.min(value / max, 1)
  const offset = circumference - pct * circumference

  useEffect(() => {
    // Trigger after mount so the transition actually animates from 0
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-36">
        <svg width="144" height="144" viewBox="0 0 144 144" className="-rotate-90">
          <circle
            cx="72"
            cy="72"
            r={radius}
            fill="none"
            stroke="#ffffff1a"
            strokeWidth="10"
          />
          <circle
            ref={circleRef}
            cx="72"
            cy="72"
            r={radius}
            fill="none"
            stroke={accent}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={mounted ? offset : circumference}
            style={{ transition: 'stroke-dashoffset 900ms cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-2xl font-bold text-arctic">{value}{max === 100 ? '%' : ''}</span>
        </div>
      </div>
      <p className="mt-3 font-mono text-xs uppercase tracking-widest text-arctic/50">{label}</p>
      {sublabel && <p className="text-arctic/30 text-xs mt-0.5">{sublabel}</p>}
    </div>
  )
}
