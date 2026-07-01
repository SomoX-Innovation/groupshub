const WINDOW_MS = 60 * 60 * 1000 // 1 hour
const MAX_REQUESTS = 5

const hits = new Map<string, { count: number; resetAt: number }>()

// Periodically clear stale entries so the map doesn't grow unbounded on a long-lived server.
function sweep() {
  const now = Date.now()
  hits.forEach((entry, key) => {
    if (entry.resetAt <= now) hits.delete(key)
  })
}

export function checkRateLimit(key: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const entry = hits.get(key)

  if (!entry || entry.resetAt <= now) {
    sweep()
    const resetAt = now + WINDOW_MS
    hits.set(key, { count: 1, resetAt })
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetAt }
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count += 1
  return { allowed: true, remaining: MAX_REQUESTS - entry.count, resetAt: entry.resetAt }
}
