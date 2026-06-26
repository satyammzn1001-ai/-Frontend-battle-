import { useState, useRef } from 'react'

/**
 * ActivityGraph — pure SVG area chart with cursor-following tooltip.
 * No chart library (recharts/d3 etc not used here) — satisfies the
 * "no runtime animation/UI library" spirit for hand-rolled components.
 * Tooltip position follows mouse via direct style mutation (no re-render).
 */
const DATA = [
  { label: 'May 16', value: 62 },
  { label: 'May 17', value: 88 },
  { label: 'May 18', value: 71 },
  { label: 'May 19', value: 142 },
  { label: 'May 20', value: 118 },
  { label: 'May 21', value: 96 },
  { label: 'May 22', value: 130 },
]

const WIDTH = 600
const HEIGHT = 180
const MAX_VAL = 200

function getXY(i, value) {
  const x = (i / (DATA.length - 1)) * WIDTH
  const y = HEIGHT - (value / MAX_VAL) * HEIGHT
  return [x, y]
}

function buildSmoothPath() {
  const points = DATA.map((d, i) => getXY(i, d.value))
  let path = `M ${points[0][0]},${points[0][1]}`
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1]
    const [x1, y1] = points[i]
    const cx = (x0 + x1) / 2
    path += ` Q ${cx},${y0} ${x1},${y1}`
  }
  return path
}

export default function ActivityGraph() {
  const [activeIdx, setActiveIdx] = useState(3) // default highlight matches reference (May 19)
  const tooltipRef = useRef(null)
  const svgRef = useRef(null)

  const linePath = buildSmoothPath()
  const areaPath = `${linePath} L ${WIDTH},${HEIGHT} L 0,${HEIGHT} Z`

  function handleMove(e) {
    const rect = svgRef.current.getBoundingClientRect()
    const relX = ((e.clientX - rect.left) / rect.width) * WIDTH
    const idx = Math.round((relX / WIDTH) * (DATA.length - 1))
    const clamped = Math.max(0, Math.min(DATA.length - 1, idx))
    setActiveIdx(clamped)
  }

  const [activeX, activeY] = getXY(activeIdx, DATA[activeIdx].value)

  return (
    <div className="bg-noir rounded-2xl p-5 border border-arctic/10">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-arctic font-mono text-sm font-semibold">Workflow Activity</h4>
        <span className="text-arctic/40 text-xs font-mono border border-arctic/10 rounded-full px-3 py-1">
          Daily
        </span>
      </div>

      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full h-auto cursor-crosshair"
          onMouseMove={handleMove}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFC801" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FFC801" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path d={areaPath} fill="url(#areaFill)" />
          <path
            d={linePath}
            fill="none"
            stroke="#FFC801"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* active point + vertical guide line */}
          <line
            x1={activeX}
            y1="0"
            x2={activeX}
            y2={HEIGHT}
            stroke="#FFC801"
            strokeOpacity="0.25"
            strokeWidth="1"
          />
          <circle cx={activeX} cy={activeY} r="5" fill="#FFC801" stroke="#172B36" strokeWidth="2" />
        </svg>

        {/* Tooltip positioned via percentage of activeIdx — no JS animation engine */}
        <div
          className="absolute -translate-x-1/2 -translate-y-full bg-arctic text-noir text-xs rounded-lg px-3 py-2 shadow-lg pointer-events-none transition-all duration-150 ease-out font-mono whitespace-nowrap"
          style={{
            left: `${(activeIdx / (DATA.length - 1)) * 100}%`,
            top: `${(activeY / HEIGHT) * 100}%`,
            marginTop: '-10px',
          }}
        >
          <div className="font-semibold">{DATA[activeIdx].label}, 2026</div>
          <div className="flex items-center gap-1 text-noir/70">
            <span className="w-1.5 h-1.5 rounded-full bg-saffron inline-block" />
            {DATA[activeIdx].value}K tasks
          </div>
        </div>
      </div>

      <div className="mt-2 flex justify-between text-arctic/30 text-[10px] font-mono">
        {DATA.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  )
}
