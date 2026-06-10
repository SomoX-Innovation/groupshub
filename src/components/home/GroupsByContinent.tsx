'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Globe2, ArrowRight } from 'lucide-react'
import { GroupCard } from '@/components/groups/GroupCard'
import { cn } from '@/lib/utils'
import type { GroupWithCategory } from '@/types/group'

const CONTINENTS = [
  { id: 'north-america', label: 'Americas', emoji: '🌎' },
  { id: 'europe', label: 'Europe', emoji: '🌍' },
  { id: 'asia', label: 'Asia', emoji: '🌏' },
  { id: 'africa', label: 'Africa', emoji: '🌍' },
  { id: 'oceania', label: 'Oceania', emoji: '🌏' },
]

interface GroupsByContinentProps {
  groups: GroupWithCategory[]
}

export function GroupsByContinent({ groups }: GroupsByContinentProps) {
  const groupsByContinent: Record<string, GroupWithCategory[]> = {}
  for (const cont of CONTINENTS) {
    groupsByContinent[cont.id] = groups.filter((g) => g.countries?.continent === cont.id)
  }

  const defaultTab = CONTINENTS.find((c) => groupsByContinent[c.id]?.length > 0)?.id ?? 'asia'
  const [active, setActive] = useState(defaultTab)

  if (!groups || groups.length === 0) return null

  const shown = groupsByContinent[active] || []

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Globe2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Groups by Region</h2>
              <p className="text-sm text-muted-foreground">Communities from around the world</p>
            </div>
          </div>
          <Link
            href="/browse"
            className="group hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Browse all
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Tab pills */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          {CONTINENTS.map((cont) => {
            const count = groupsByContinent[cont.id]?.length ?? 0
            return (
              <button
                key={cont.id}
                onClick={() => setActive(cont.id)}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                  active === cont.id
                    ? 'glass-card gradient-text border border-primary/20 shadow-lg shadow-primary/10'
                    : 'glass hover:glass-card text-muted-foreground hover:text-foreground border border-transparent'
                )}
              >
                <span>{cont.emoji}</span>
                <span>{cont.label}</span>
                {count > 0 && (
                  <span className={cn(
                    'text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center',
                    active === cont.id ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                  )}>
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Groups grid */}
        {shown.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {shown.slice(0, 8).map((group, i) => (
              <div
                key={group.id}
                className="animate-fade-in"
                style={{ animationDelay: `${i * 0.05}s`, animationFillMode: 'both' }}
              >
                <GroupCard group={group} />
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-12 text-center">
            <p className="text-4xl mb-3">🌍</p>
            <p className="text-muted-foreground">No groups from this region yet.</p>
            <Link
              href="/submit"
              className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-primary hover:underline"
            >
              Submit the first one! <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
