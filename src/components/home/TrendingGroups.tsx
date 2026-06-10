import Link from 'next/link'
import { TrendingUp, ArrowRight } from 'lucide-react'
import { GroupCard } from '@/components/groups/GroupCard'
import type { GroupWithCategory } from '@/types/group'

interface TrendingGroupsProps {
  groups: GroupWithCategory[]
}

export function TrendingGroups({ groups }: TrendingGroupsProps) {
  if (!groups || groups.length === 0) return null

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/30 shrink-0">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Trending Now</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Most viewed this week</p>
            </div>
          </div>
          <Link
            href="/browse?sort=trending"
            className="group hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-full border border-border/60 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all duration-200"
          >
            See all
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {groups.slice(0, 8).map((group, i) => (
            <div
              key={group.id}
              className="animate-slide-up"
              style={{ animationDelay: `${i * 0.06}s`, animationFillMode: 'both' }}
            >
              <GroupCard group={group} />
            </div>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/browse?sort=trending"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 px-6 py-2.5 text-sm font-semibold hover:bg-muted transition-colors"
          >
            See all trending groups <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
