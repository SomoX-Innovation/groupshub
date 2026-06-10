import { z } from 'zod'
import { validateInviteLink } from '@/lib/utils/invite-link-validator'

export const submitGroupSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(100, 'Name too long'),
  platform: z.enum(['whatsapp', 'telegram', 'discord'] as const),
  invite_link: z.string().url('Must be a valid URL').refine(
    (url) => url.startsWith('https://'),
    'Link must use HTTPS'
  ),
  category_id: z.string().uuid('Select a category'),
  country_code: z.string().length(2, 'Select a country'),
  language_code: z.string().min(2).max(2).optional(),
  description: z.string().max(300, 'Description max 300 characters').optional(),
  website: z.string().max(0, 'Bot detected').optional(),
  recaptcha_token: z.string().optional(),
}).refine(
  (data) => validateInviteLink(data.platform, data.invite_link),
  { message: 'Invalid invite link format for selected platform', path: ['invite_link'] }
)

export type SubmitGroupInput = z.infer<typeof submitGroupSchema>
