export default function GroupDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-muted rounded w-3/4" />
        <div className="flex gap-2">
          <div className="h-6 bg-muted rounded w-24" />
          <div className="h-6 bg-muted rounded w-20" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded" />
          <div className="h-4 bg-muted rounded w-4/5" />
          <div className="h-4 bg-muted rounded w-2/3" />
        </div>
        <div className="h-12 bg-muted rounded w-40" />
      </div>
    </div>
  )
}
