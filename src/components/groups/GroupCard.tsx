import Link from 'next/link'
import { Users, Eye } from 'lucide-react'
import { PlatformBadge } from './PlatformBadge'
import { cn } from '@/lib/utils'
import type { GroupWithCategory } from '@/types/group'

const platformGlow: Record<string, string> = {
  whatsapp: 'hover:shadow-[0_8px_30px_rgba(37,211,102,0.2)] hover:border-[#25D366]/30',
  telegram: 'hover:shadow-[0_8px_30px_rgba(42,171,238,0.2)] hover:border-[#2AABEE]/30',
  discord: 'hover:shadow-[0_8px_30px_rgba(88,101,242,0.2)] hover:border-[#5865F2]/30',
}

const platformAccent: Record<string, string> = {
  whatsapp: 'from-[#25D366]/20 to-transparent',
  telegram: 'from-[#2AABEE]/20 to-transparent',
  discord: 'from-[#5865F2]/20 to-transparent',
}

interface GroupCardProps {
  group: GroupWithCategory
  variant?: 'default' | 'compact'
}

export function GroupCard({ group, variant = 'default' }: GroupCardProps) {
  const glow = platformGlow[group.platform] ?? ''
  const accent = platformAccent[group.platform] ?? ''

  return (
    <Link href={`/groups/${group.slug}`} className="block h-full">
      <div className={cn(
        'glass-card rounded-2xl p-4 flex flex-col h-full gap-2.5 cursor-pointer transition-all duration-300 hover:-translate-y-1 border border-border/50 dark:border-white/[0.07] group relative overflow-hidden',
        glow
      )}>
        {/* Platform accent gradient top strip */}
        <div className={cn('absolute top-0 left-0 right-0 h-px bg-gradient-to-r', accent)} />

        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors min-w-0 flex-1 pr-4">
            {group.name}
          </h3>
          {group.countries?.flag_emoji && (
            <span className="text-xl flex-shrink-0 leading-none" title={group.countries.name}>
              {group.countries.flag_emoji}
            </span>
          )}
        </div>

        {/* Description */}
        {variant === 'default' && group.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 flex-1 leading-relaxed">
            {group.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-1">
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            <PlatformBadge platform={group.platform} size="sm" />
            {group.categories && (
              <span className="inline-flex items-center gap-0.5 text-xs bg-muted/70 rounded-full px-2 py-0.5 font-medium truncate max-w-[110px]">
                {group.categories.icon} {group.categories.name}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground flex-shrink-0">
            {group.member_count > 0 && (
              <span className="flex items-center gap-0.5">
                <Users className="h-3 w-3" />
                {group.member_count >= 1000
                  ? `${(group.member_count / 1000).toFixed(1)}k`
                  : group.member_count}
              </span>
            )}
            <span className="flex items-center gap-0.5">
              <Eye className="h-3 w-3" />
              {group.views >= 1000
                ? `${(group.views / 1000).toFixed(1)}k`
                : group.views}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
