import CountUp from './CountUp'

function spotlightMove(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  e.currentTarget.style.setProperty('--mx', `${x}%`)
  e.currentTarget.style.setProperty('--my', `${y}%`)
}

const STATS = [
  { label: 'Total Queries', value: 151, suffix: 'K', delta: '+15.3%' },
  { label: 'Active Nodes', value: 114, suffix: '', delta: '+6.7%' },
  { label: 'Net Growth', value: 82, suffix: '%', delta: '+11.2%' },
  { label: 'Avg Response', value: 1.2, decimals: 1, suffix: 's', delta: '-18.4%' },
]

export default function LiveStats() {
  return (
    <section className="bg-noir py-16 md:py-24 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center gap-2 text-saffron font-mono text-xs uppercase tracking-widest mb-3">
          <span>// 2026</span>
          <span className="text-arctic/30">LIVE SYSTEM METRICS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-arctic font-mono max-w-lg">
          Infrastructure that proves itself in real time.
        </h2>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              onMouseMove={spotlightMove}
              className="spotlight-card spotlight-dark relative bg-arctic/[0.03] border border-arctic/10 rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-arctic/20"
            >
              <span className="font-mono text-3xl font-bold text-arctic">
                <CountUp target={s.value} decimals={s.decimals || 0} suffix={s.suffix} />
              </span>
              <p className="mt-2 font-mono text-xs uppercase tracking-widest text-arctic/40">
                {s.label}
              </p>
              <p
                className={`mt-1 text-xs font-mono ${
                  s.delta.startsWith('-') ? 'text-saffron' : 'text-green-400'
                }`}
              >
                {s.delta.startsWith('-') ? '↓' : '↑'} {s.delta.replace('-', '')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
