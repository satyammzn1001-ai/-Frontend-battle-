// Multi-dimensional pricing matrix
// Structure: tier -> base monthly rate (in USD) -> currency conversion + regional tariff applied at runtime
// This is the SINGLE source of truth — no hardcoded UI prices anywhere else.

export const ANNUAL_DISCOUNT_MULTIPLIER = 0.8 // flat 20% off => pay 80% of (monthly * 12)

// Regional tariff variables (multiplier applied on top of base USD rate before currency symbol formatting)
// These simulate region-specific pricing adjustments (e.g. local market positioning, payment processing costs)
export const CURRENCY_CONFIG = {
  USD: { symbol: '$', rate: 1, tariff: 1.0 },
  INR: { symbol: '₹', rate: 83.0, tariff: 1.08 }, // +8% regional tariff
  EUR: { symbol: '€', rate: 0.92, tariff: 1.04 }, // +4% regional tariff
}

// Base tier rates in USD (monthly)
export const PRICING_MATRIX = {
  starter: {
    label: 'Starter',
    baseMonthlyUSD: 19,
    description: 'For individuals automating their first workflows.',
    features: ['5 active workflows', '10k task runs/mo', 'Email support', 'Community access'],
  },
  pro: {
    label: 'Pro',
    baseMonthlyUSD: 59,
    description: 'For growing teams that need speed and scale.',
    features: ['Unlimited workflows', '250k task runs/mo', 'Priority support', 'Advanced analytics', 'Team roles'],
  },
  enterprise: {
    label: 'Enterprise',
    baseMonthlyUSD: 149,
    description: 'For organizations with mission-critical automation.',
    features: ['Unlimited everything', 'Dedicated infra', '24/7 support + SLA', 'SSO & audit logs', 'Custom integrations'],
  },
}

/**
 * Computes the final displayed price string for a given tier, billing cycle, and currency.
 * Pure function — no side effects, no state. This is what gets called directly
 * inside the isolated DOM update, NOT inside a React render cycle.
 */
export function computePrice(tierKey, billingCycle, currencyKey) {
  const tier = PRICING_MATRIX[tierKey]
  const currency = CURRENCY_CONFIG[currencyKey]

  const baseUSD = tier.baseMonthlyUSD
  const tariffAdjustedUSD = baseUSD * currency.tariff

  let finalAmount
  if (billingCycle === 'annual') {
    // annual: monthly rate * 12 * discount multiplier, then converted, shown as effective monthly
    const annualTotalUSD = tariffAdjustedUSD * 12 * ANNUAL_DISCOUNT_MULTIPLIER
    const effectiveMonthlyUSD = annualTotalUSD / 12
    finalAmount = effectiveMonthlyUSD * currency.rate
  } else {
    finalAmount = tariffAdjustedUSD * currency.rate
  }

  // Round sensibly per currency (INR/whole numbers, USD/EUR to nearest int for clean display)
  const rounded = Math.round(finalAmount)

  return {
    display: `${currency.symbol}${rounded.toLocaleString('en-US')}`,
    perLabel: '/mo',
    billingNote: billingCycle === 'annual' ? 'billed annually' : 'billed monthly',
  }
}
