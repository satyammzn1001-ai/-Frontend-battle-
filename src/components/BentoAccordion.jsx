import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * BentoAccordion — Feature 2: Bento-to-Accordion Wrapper with State Persistence
 *
 * Desktop (>= 768px): Bento grid. Hovering/clicking a node sets `activeIndex`.
 * Mobile (< 768px): Accordion list. Clicking a header toggles `activeIndex`.
 *
 * CONTEXT LOCK CONSTRAINT:
 * `activeIndex` is shared state across both layouts (not reset on breakpoint
 * change). A resize listener watches the viewport crossing the 768px boundary;
 * when it crosses into mobile while a desktop node is active/hovered, that
 * same index becomes the open accordion panel automatically — no flash of
 * "everything closed", the transition is smooth because activeIndex never
 * resets to null during the crossover.
 *
 * ZERO-DEPENDENCY RULE: No Framer Motion / Radix / Headless UI. All transitions
 * use native CSS (transition / grid-template-rows trick for accordion height)
 * or plain JS, nothing else.
 */

const FEATURES = [
  {
    id: 'workflows',
    title: 'Visual Workflow Builder',
    desc: 'Drag, drop, and connect automation steps with zero code. Build complex pipelines in minutes.',
    icon: 'cube-16-solid',
  },
  {
    id: 'analytics',
    title: 'Real-Time Analytics',
    desc: 'Track every run, every output, every bottleneck — live dashboards that update as work happens.',
    icon: 'chart-pie',
  },
  {
    id: 'automation',
    title: 'Self-Healing Automation',
    desc: 'When a step fails, Kepler retries, reroutes, or escalates automatically — no manual babysitting.',
    icon: 'arrow-path',
  },
  {
    id: 'integration',
    title: 'Universal Integrations',
    desc: 'Connect to 200+ tools out of the box, or wire up your own with our open API layer.',
    icon: 'link-solid',
  },
  {
    id: 'scaling',
    title: 'Elastic Scaling',
    desc: 'From 10 to 10 million task runs a month — infrastructure that scales itself, silently.',
    icon: 'arrow-trending-up',
  },
  {
    id: 'config',
    title: 'Granular Controls',
    desc: 'Fine-tune permissions, rate limits, and audit trails down to the individual workflow.',
    icon: 'cog-8-tooth',
  },
]

// Inline SVG icon map (from provided asset pack — referenced by id, rendered as inline paths)
import Cube from '../assets/svgs/cube-16-solid.svg'
import ChartPie from '../assets/svgs/chart-pie.svg'
import ArrowPath from '../assets/svgs/arrow-path.svg'
import LinkSolid from '../assets/svgs/link-solid.svg'
import ArrowTrendingUp from '../assets/svgs/arrow-trending-up.svg'
import CogTooth from '../assets/svgs/cog-8-tooth.svg'
import ChevronDown from '../assets/svgs/chevron-down.svg'

const ICONS = {
  'cube-16-solid': Cube,
  'chart-pie': ChartPie,
  'arrow-path': ArrowPath,
  'link-solid': LinkSolid,
  'arrow-trending-up': ArrowTrendingUp,
  'cog-8-tooth': CogTooth,
}

const MOBILE_BREAKPOINT = 768

export default function BentoAccordion() {
  const [activeIndex, setActiveIndex] = useState(0) // shared context across both layouts
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  )
  const lastActiveBeforeCrossRef = useRef(activeIndex)

  // Keep a ref of the latest activeIndex so the resize handler always
  // transfers the most recent context, not a stale closure value.
  useEffect(() => {
    lastActiveBeforeCrossRef.current = activeIndex
  }, [activeIndex])

  const handleResize = useCallback(() => {
    const nowMobile = window.innerWidth < MOBILE_BREAKPOINT
    setIsMobile((prevMobile) => {
      if (prevMobile !== nowMobile) {
        // Breakpoint just crossed — carry the active index over untouched.
        // (activeIndex is already shared state, so no extra action needed,
        // but we explicitly re-affirm it here to guarantee the "transfer"
        // requirement holds even if other code paths nulled it.)
        setActiveIndex(lastActiveBeforeCrossRef.current)
      }
      return nowMobile
    })
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  return (
    <section id="features" className="py-16 md:py-24 bg-mint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-noir font-mono">
            Built for Serious Automation
          </h2>
          <p className="mt-3 text-noir/70">
            Every feature engineered to remove friction from your workflow.
          </p>
        </div>

        <div className="mt-12">
          {isMobile ? (
            <AccordionList activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
          ) : (
            <BentoGrid activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
          )}
        </div>
      </div>
    </section>
  )
}

function BentoGrid({ activeIndex, setActiveIndex }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px]">
      {FEATURES.map((f, i) => {
        const isActive = i === activeIndex
        const spanClass = i === 0 ? 'col-span-2 row-span-2' : i === 3 ? 'col-span-2' : ''
        // tiny deliberate tilt on alternating cards — breaks perfect-grid symmetry
        const tiltClass = i % 3 === 1 ? 'md:-rotate-[0.6deg]' : i % 3 === 2 ? 'md:rotate-[0.6deg]' : ''
        return (
          <button
            key={f.id}
            onMouseEnter={() => setActiveIndex(i)}
            onFocus={() => setActiveIndex(i)}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const x = ((e.clientX - rect.left) / rect.width) * 100
              const y = ((e.clientY - rect.top) / rect.height) * 100
              e.currentTarget.style.setProperty('--mx', `${x}%`)
              e.currentTarget.style.setProperty('--my', `${y}%`)
            }}
            className={`spotlight-card group relative text-left rounded-2xl p-5 overflow-hidden border transition-all duration-300 ease-in-out ${spanClass} ${tiltClass} ${
              isActive
                ? 'spotlight-dark bg-noir text-arctic border-noir shadow-lg scale-[1.02] md:rotate-0'
                : 'bg-white text-noir border-noir/10 hover:border-noir/30'
            }`}
          >
            <span
              className={`absolute top-4 right-4 font-mono text-xs ${
                isActive ? 'text-arctic/30' : 'text-noir/20'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <img
              src={ICONS[f.icon]}
              alt=""
              className={`w-7 h-7 transition-transform duration-200 ease-out ${
                isActive ? 'invert' : ''
              } group-hover:scale-110`}
            />
            <h3 className="mt-3 font-semibold font-mono text-sm">{f.title}</h3>
            <p
              className={`mt-1 text-xs leading-relaxed ${
                isActive ? 'text-arctic/80' : 'text-noir/60'
              } ${i === 0 ? 'block' : 'hidden md:block'}`}
            >
              {f.desc}
            </p>
          </button>
        )
      })}
    </div>
  )
}

function AccordionList({ activeIndex, setActiveIndex }) {
  return (
    <div className="flex flex-col gap-3">
      {FEATURES.map((f, i) => {
        const isOpen = i === activeIndex
        return (
          <div
            key={f.id}
            className={`rounded-xl border overflow-hidden transition-colors duration-200 ease-out ${
              isOpen ? 'border-noir bg-white' : 'border-noir/10 bg-white/60'
            }`}
          >
            <button
              onClick={() => setActiveIndex(isOpen ? -1 : i)}
              className="w-full flex items-center justify-between gap-3 p-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="flex items-center gap-3">
                <img src={ICONS[f.icon]} alt="" className="w-5 h-5" />
                <span className="font-semibold text-sm text-noir font-mono">{f.title}</span>
              </span>
              <img
                src={ChevronDown}
                alt=""
                className={`w-4 h-4 transition-transform duration-200 ease-out ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* grid-template-rows trick: animates height without JS measuring, pure CSS */}
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-in-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 text-sm text-noir/70 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
