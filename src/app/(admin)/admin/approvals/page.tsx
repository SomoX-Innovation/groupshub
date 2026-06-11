import { createAdminClient } from '@/lib/supabase/admin'
import { approveGroup, rejectGroup } from '../actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PlatformBadge } from '@/components/groups/PlatformBadge'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Approval Queue — Admin', robots: { index: false } }

export default async function ApprovalsPage() {
  const supabase = createAdminClient()
  const { data: pending } = await supabase
    .from('groups')
    .select('*, categories(*), countries(*)')
    .eq('is_approved', false)
    .order('created_at', { ascending: true })
    .limit(50)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Approval Queue
        <span className="ml-2 text-sm font-normal text-muted-foreground">({pending?.length || 0} pending)</span>
      </h1>

      {!pending || pending.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-medium">All clear! 🎉</p>
          <p className="text-sm mt-1">No pending groups to review.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {pending.map((group) => {
            const g = group as any
            return (
              <Card key={g.id} className="border-border">
                <CardContent className="p-4 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="font-semibold">{g.name}</p>
                      <PlatformBadge platform={g.platform} size="sm" />
                    </div>
                    {g.description && (
                      <p className="text-xs text-muted-foreground line-clamp-1 mb-1">{g.description}</p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                      {g.categories && <span>{g.categories.icon} {g.categories.name}</span>}
                      {g.countries && <span>{g.countries.flag_emoji} {g.countries.name}</span>}
                      <a
                        href={g.invite_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline truncate max-w-xs"
                      >
                        {g.invite_link}
                      </a>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5">
                      Submitted {new Date(g.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <form action={approveGroup.bind(null, g.id)}>
                      <Button size="sm" type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                        Approve
                      </Button>
                    </form>
                    <form action={rejectGroup.bind(null, g.id)}>
                      <Button size="sm" variant="destructive" type="submit">Reject</Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
