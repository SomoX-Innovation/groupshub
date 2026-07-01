import DodoPayments from 'dodopayments'

export const COVER_LETTER_PRICING = {
  basic: { label: 'Basic', words: '~300 words', amountCents: 299, envVar: 'DODO_PRODUCT_ID_BASIC' },
  standard: { label: 'Standard', words: '~400 words', amountCents: 499, envVar: 'DODO_PRODUCT_ID_STANDARD' },
  premium: { label: 'Premium', words: '~500-550 words', amountCents: 799, envVar: 'DODO_PRODUCT_ID_PREMIUM' },
} as const

export type CoverLetterTier = keyof typeof COVER_LETTER_PRICING

export function getDodoProductId(tier: CoverLetterTier): string | null {
  return process.env[COVER_LETTER_PRICING[tier].envVar] || null
}

let cachedClient: DodoPayments | null = null

export function getDodoClient(): DodoPayments {
  if (cachedClient) return cachedClient

  const bearerToken = process.env.DODO_PAYMENTS_API_KEY
  if (!bearerToken) {
    throw new Error('DODO_PAYMENTS_API_KEY is not set')
  }

  cachedClient = new DodoPayments({
    bearerToken,
    environment: process.env.DODO_PAYMENTS_ENVIRONMENT === 'live_mode' ? 'live_mode' : 'test_mode',
  })
  return cachedClient
}
