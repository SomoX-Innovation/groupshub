export const INVITE_PATTERNS = {
  whatsapp: /^https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]{20,}$/,
  telegram: /^https:\/\/t\.me\/[A-Za-z0-9_+]{5,}$/,
  discord: /^https:\/\/(discord\.gg|discord\.com\/invite)\/[A-Za-z0-9]{6,10}$/,
}

export function validateInviteLink(platform: string, url: string): boolean {
  const pattern = INVITE_PATTERNS[platform as keyof typeof INVITE_PATTERNS]
  if (!pattern) return false
  return pattern.test(url.trim())
}
