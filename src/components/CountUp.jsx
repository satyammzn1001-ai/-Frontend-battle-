import { useEffect, useRef, useState } from 'react'

/**
 * CountUp — animates a number from 0 to target on mount/visibility.
 * Uses requestAnimationFrame directly (native, no animation library),
 * satisfying the "no runtime animation engines" constraint.
 */
export default function CountUp({ target, suffix = '', duration = 900, decimals = 0 }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true
            const start = performance.now()
            function tick(now) {
              const elapsed = now - start
              const progress = Math.min(elapsed / duration, 1)
              // ease-out cubic
              const eased = 1 - Math.pow(1 - progress, 3)
              setValue(target * eased)
              if (progress < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          }
        })
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return (
    <span ref={ref} className="font-mono">
      {decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-US')}
      {suffix}
    </span>
  )
}
