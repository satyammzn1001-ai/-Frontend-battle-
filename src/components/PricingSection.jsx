import { useRef } from 'react'
import { PRICING_MATRIX, CURRENCY_CONFIG } from '../data/pricingMatrix'
import IsolatedPriceText from './IsolatedPriceText'

/**
 * PricingSection — Feature 1: Matrix-Driven Pricing & Performance-Isolated Currency Switcher
 *
 * KEY ARCHITECTURE DECISION:
 * Billing cycle and currency are NOT stored in React state at this level.
 * They live in a plain mutable ref object. Toggling them calls `.update()`
 * directly on each IsolatedPriceText instance via refs collected in priceRefs.
 * This means clicking a currency button or the billing toggle causes ZERO
 * re-renders of PricingSection, its pricing cards, or any sibling layout.
 *
 * Only the active-state styling on the toggle/currency buttons themselves
 * needs to visually update — that's done via direct className/style manipulation
 * on the buttons too (see updateButtonStyles), not via setState.
 */
export default function PricingSection() {
  // Mutable state container — intentionally NOT useState to avoid re-renders
  const configRef = useRef({ billing: 'monthly', currency: 'USD' })

  // Refs to each tier's IsolatedPriceText instance
  const priceRefs = useRef({})

  // Refs to toggle/currency buttons for direct style updates
  const billingBtnRefs = useRef({})
  const currencyBtnRefs = useRef({})

  function applyUpdate() {
    const { billing, currency } = configRef.current
    Object.keys(PRICING_MATRIX).forEach((tierKey) => {
      priceRefs.current[tierKey]?.update(billing, currency)
    })

    // Update billing toggle visual state directly (no re-render)
    Object.entries(billingBtnRefs.current).forEach(([key, el]) => {
      if (!el) return
      el.classList.toggle('bg-forsythia', key === billing)
      el.classList.toggle('text-noir', key === billing)
      el.classList.toggle('text-arctic', key !== billing)
    })

    // Update currency button visual state directly (no re-render)
    Object.entries(currencyBtnRefs.current).forEach(([key, el]) => {
      if (!el) return
      el.classList.toggle('bg-nocturnal', key === currency)
      el.classList.toggle('text-arctic', key === currency)
      el.classList.toggle('text-noir/60', key !== currency)
    })
  }

  function setBilling(cycle) {
    configRef.current.billing = cycle
    applyUpdate()
  }

  function setCurrency(curr) {
    configRef.current.currency = curr
    applyUpdate()
  }

  return (
    <section id="pricing" className="py-16 md:py-24 bg-arctic">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-noir font-mono">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-3 text-noir/70">
            Choose the plan that scales with your automation needs.
          </p>
        </div>

        {/* Controls: billing toggle + currency switcher */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Billing cycle toggle */}
          <div className="inline-flex bg-noir/10 rounded-full p-1">
            {['monthly', 'annual'].map((cycle) => (
              <button
                key={cycle}
                ref={(el) => (billingBtnRefs.current[cycle] = el)}
                onClick={() => setBilling(cycle)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-150 ease-out ${
                  cycle === 'monthly' ? 'bg-forsythia text-noir' : 'text-arctic'
                }`}
              >
                {cycle === 'monthly' ? 'Monthly' : 'Annual (save 20%)'}
              </button>
            ))}
          </div>

          {/* Currency switcher */}
          <div className="inline-flex bg-white rounded-full p-1 border border-noir/10">
           {Object.entries(CURRENCY_CONFIG).map(([curr, cfg]) => (
  <button
    key={curr}
    ref={(el) => (currencyBtnRefs.current[curr] = el)}
    onClick={() => setCurrency(curr)}
    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-150 ease-out ${
      curr === 'USD' ? 'bg-nocturnal text-arctic' : 'text-noir/60'
    }`}
  >
    <span className="font-mono">{cfg.symbol}</span>
    {curr}
  </button>
))}
          </div>
        </div>

        {/* Pricing cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(PRICING_MATRIX).map(([tierKey, tier]) => (
            <div
              key={tierKey}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = ((e.clientX - rect.left) / rect.width) * 100
                const y = ((e.clientY - rect.top) / rect.height) * 100
                e.currentTarget.style.setProperty('--mx', `${x}%`)
                e.currentTarget.style.setProperty('--my', `${y}%`)
              }}
              className={`spotlight-card rounded-2xl p-8 border transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl ${
                tierKey === 'pro'
                  ? 'spotlight-dark bg-noir text-arctic border-noir scale-105 shadow-lg'
                  : 'bg-white text-noir border-noir/10'
              }`}
            >
              <h3 className="font-mono text-lg font-bold">{tier.label}</h3>
              <p className={`mt-2 text-sm ${tierKey === 'pro' ? 'text-arctic/70' : 'text-noir/60'}`}>
                {tier.description}
              </p>

              <div className="mt-6">
                <IsolatedPriceText
                  ref={(el) => (priceRefs.current[tierKey] = el)}
                  tierKey={tierKey}
                  initialBilling="monthly"
                  initialCurrency="USD"
                />
              </div>

              <ul className="mt-6 space-y-3 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className={tierKey === 'pro' ? 'text-forsythia' : 'text-saffron'}>●</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`relative z-10 mt-8 w-full py-3 rounded-lg font-semibold transition-all duration-150 ease-out hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] ${
                  tierKey === 'pro' ? 'bg-forsythia text-noir' : 'bg-noir text-arctic'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
