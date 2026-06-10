import { createHash } from 'crypto'

export function hashIp(ip: string): string {
  return createHash('sha256').update(ip + (process.env.IP_SALT || 'groupshub-salt')).digest('hex').slice(0, 32)
}

export function getIpFromRequest(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const real = req.headers.get('x-real-ip')
  if (forwarded) return forwarded.split(',')[0].trim()
  if (real) return real.trim()
  return '127.0.0.1'
}
