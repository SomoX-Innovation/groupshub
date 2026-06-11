import { GroupCardSkeleton } from '@/components/groups/GroupCardSkeleton'

export default function BrowseLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex gap-6">
        <div className="hidden lg:block w-64 shrink-0">
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-8 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <GroupCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
