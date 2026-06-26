import { useRef, useImperativeHandle, forwardRef } from 'react'
import { computePrice } from '../data/pricingMatrix'

/**
 * IsolatedPriceText
 *
 * This component renders ONCE and never re-renders from parent state changes.
 * It exposes an `update(billingCycle, currencyKey)` method via ref that the
 * parent calls directly. That method mutates the DOM text node in place
 * using refs — completely bypassing React's render cycle for this update path.
 *
 * Why: PS requires that changing currency/billing must NOT trigger a re-render
 * of the parent or surrounding layout. If we used `useState` at the pricing-card
 * level (or higher) and passed currency down as a prop, React would re-render
 * every card + every child on each toggle. Direct DOM text mutation via ref
 * sidesteps the React reconciler entirely for this specific update.
 */
const IsolatedPriceText = forwardRef(function IsolatedPriceText(
  { tierKey, initialBilling = 'monthly', initialCurrency = 'USD' },
  ref
) {
  const amountRef = useRef(null)
  const noteRef = useRef(null)

  // Initial computed values (used only on first paint — never read again after mount)
  const initial = computePrice(tierKey, initialBilling, initialCurrency)

  useImperativeHandle(ref, () => ({
    update(billingCycle, currencyKey) {
      const { display, billingNote } = computePrice(tierKey, billingCycle, currencyKey)
      // Direct text node mutation — no setState, no re-render, no VDOM diff.
      if (amountRef.current) amountRef.current.textContent = display
      if (noteRef.current) noteRef.current.textContent = billingNote
    },
  }))

  return (
    <div className="flex items-baseline gap-2">
      <span ref={amountRef} className="font-mono text-4xl font-bold text-noir">
        {initial.display}
      </span>
      <span className="text-sm text-noir/60">
        {initial.perLabel} <span ref={noteRef}>{initial.billingNote}</span>
      </span>
    </div>
  )
})

export default IsolatedPriceText
