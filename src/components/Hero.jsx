import ActivityGraph from './ActivityGraph'
import CountUp from './CountUp'
import ArrowTrendingUp from '../assets/svgs/arrow-trending-up.svg'
import ChartPie from '../assets/svgs/chart-pie.svg'
import CogTooth from '../assets/svgs/cog-8-tooth.svg'
import LinkSolid from '../assets/svgs/link-solid.svg'
import ArrowPath from '../assets/svgs/arrow-path.svg'

const MINI_STATS = [
  { icon: ArrowTrendingUp, value: 8.4, decimals: 1, suffix: 'M', label: 'Tasks Automated', delta: '+12.5%' },
  { icon: ChartPie, value: 344, suffix: '', label: 'Active Workflows', delta: '+8.3%' },
  { icon: CogTooth, value: 98, suffix: '%', label: 'Cache Hit Rate', delta: '+2.1%' },
  { icon: LinkSolid, value: 99, suffix: '%', label: 'SLA Uptime', delta: '+1.8%' },
]

const TRUST_BADGES = [
  { icon: CogTooth, title: 'Secure', sub: 'Enterprise-grade' },
  { icon: ArrowPath, title: 'Fast', sub: 'Built for speed' },
  { icon: ChartPie, title: 'AI-Powered', sub: 'Learns & adapts' },
  { icon: LinkSolid, title: '99.9% Uptime', sub: 'Always reliable' },
]

function spotlightMove(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  e.currentTarget.style.setProperty('--mx', `${x}%`)
  e.currentTarget.style.setProperty('--my', `${y}%`)
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #FFC801, #FF9932)' }}
      />

      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left relative z-10 animate-fade-in-up">
          <span className="inline-block px-3 py-1 rounded-full bg-mint text-nocturnal text-xs font-semibold font-mono mb-4">
            Now with self-healing workflows
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-noir leading-tight font-mono">
            Automate Everything.<br />
            <span className="text-saffron">Babysit Nothing.</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-noir/70 max-w-xl mx-auto md:mx-0">
            Kepler AI turns your messiest workflows into clean, self-running pipelines —
            powered by adaptive automation that learns as your business scales.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#pricing"
              onMouseMove={spotlightMove}
              className="spotlight-card relative bg-forsythia text-noir px-6 py-3 rounded-lg font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-150 ease-out"
            >
              Start Free Trial
            </a>
            <a
              href="#features"
              className="border border-noir/20 text-noir px-6 py-3 rounded-lg font-semibold hover:bg-noir/5 transition-colors duration-150 ease-out"
            >
              See How It Works
            </a>
          </div>

          {/* Trust badges row */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TRUST_BADGES.map((b) => (
              <div
                key={b.title}
                onMouseMove={spotlightMove}
                className="spotlight-card relative bg-white border border-noir/10 rounded-xl px-3.5 py-3 text-left
                           transition-all duration-200 ease-out hover:-translate-y-1 hover:border-noir/25 hover:shadow-md"
              >
                <div className="w-7 h-7 rounded-md bg-mint flex items-center justify-center mb-2">
                  <img src={b.icon} alt="" className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs font-semibold text-noir font-mono whitespace-nowrap">{b.title}</p>
                <p className="text-[11px] text-noir/50 mt-0.5">{b.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard card */}
        <div className="flex-1 w-full relative z-10">
          <div className="bg-noir rounded-2xl p-5 border border-arctic/10 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
                <span className="text-arctic text-sm font-semibold font-mono">Live System Overview</span>
              </div>
              <span className="text-arctic/40 text-xs font-mono border border-arctic/10 rounded-full px-3 py-1">
                Last 7 days
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {MINI_STATS.map((s) => (
                <div
                  key={s.label}
                  onMouseMove={spotlightMove}
                  className="spotlight-card spotlight-dark relative bg-arctic/5 rounded-xl p-3 border border-arctic/5 transition-transform duration-200 ease-out hover:-translate-y-0.5"
                >
                  <img src={s.icon} alt="" className="w-4 h-4 invert opacity-70" />
                  <p className="mt-2 text-arctic font-mono text-lg font-bold">
                    <CountUp target={s.value} decimals={s.decimals || 0} suffix={s.suffix} />
                  </p>
                  <p className="text-arctic/40 text-[11px]">{s.label}</p>
                  <p className="text-green-400 text-[10px] font-mono mt-0.5">↑ {s.delta}</p>
                </div>
              ))}
            </div>

            <ActivityGraph />
          </div>
        </div>
      </div>
    </section>
  )
}
