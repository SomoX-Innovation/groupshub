import { GroupCard } from './GroupCard'
import type { GroupWithCategory } from '@/types/group'

interface GroupGridProps {
  groups: GroupWithCategory[]
  variant?: 'default' | 'compact'
}

export function GroupGrid({ groups, variant = 'default' }: GroupGridProps) {
  if (!groups || groups.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-lg font-medium">No groups found</p>
        <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} variant={variant} />
      ))}
    </div>
  )
}
