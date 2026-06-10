import { z } from 'zod'

export const reportSchema = z.object({
  group_id: z.string().uuid(),
  reason: z.enum(['spam', 'inappropriate', 'broken_link', 'wrong_category', 'other'] as const),
  description: z.string().max(500).optional(),
})

export type ReportInput = z.infer<typeof reportSchema>
