import { MessageCircle, Send, Hash } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PlatformId } from '@/lib/constants'

const platformConfig = {
  whatsapp: { label: 'WhatsApp', color: '#25D366', Icon: MessageCircle },
  telegram: { label: 'Telegram', color: '#2AABEE', Icon: Send },
  discord: { label: 'Discord', color: '#5865F2', Icon: Hash },
}

interface PlatformBadgeProps {
  platform: string
  size?: 'sm' | 'md'
  className?: string
}

export function PlatformBadge({ platform, size = 'md', className }: PlatformBadgeProps) {
  const config = platformConfig[platform as PlatformId]
  if (!config) return null
  const { label, color, Icon } = config

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-white font-medium',
        size === 'sm' ? 'text-xs' : 'text-sm',
        className
      )}
      style={{ backgroundColor: color }}
    >
      <Icon className={size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
      {label}
    </span>
  )
}
