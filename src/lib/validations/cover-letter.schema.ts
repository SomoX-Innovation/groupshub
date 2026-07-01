import { z } from 'zod'

export const TONES = [
  'confident and professional',
  'warm and personable',
  'formal and traditional',
  'enthusiastic and energetic',
] as const

export const LENGTHS = {
  basic: { label: 'Basic (~300 words)', words: 300 },
  standard: { label: 'Standard (~400 words)', words: 400 },
  premium: { label: 'Premium (~500-550 words)', words: 525 },
} as const

export const coverLetterSchema = z.object({
  resume: z.string().trim().min(1, 'Resume / background is required').max(6000, 'Resume must be 6000 characters or fewer'),
  jobDescription: z.string().trim().min(1, 'Job description is required').max(6000, 'Job description must be 6000 characters or fewer'),
  company: z.string().trim().max(200).optional(),
  tone: z.enum(TONES).default('confident and professional'),
  specificPoints: z.string().trim().max(2000).optional(),
  length: z.enum(['basic', 'standard', 'premium']).default('standard'),
})

export type CoverLetterInput = z.infer<typeof coverLetterSchema>
