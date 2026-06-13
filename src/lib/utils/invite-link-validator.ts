export const INVITE_PATTERNS = {
  whatsapp: /^https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9_-]{6,}$/,
  telegram: /^https:\/\/t\.me\/(\+|joinchat\/)?[A-Za-z0-9_-]{4,}$/,
  discord: /^https:\/\/(discord\.gg|discord\.com\/invite)\/[A-Za-z0-9_-]{4,}$/,
}

export function validateInviteLink(platform: string, url: string): boolean {
  const pattern = INVITE_PATTERNS[platform as keyof typeof INVITE_PATTERNS]
  if (!pattern) return false
  return pattern.test(url.trim())
}
