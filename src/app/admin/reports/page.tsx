import { createAdminClient } from '@/lib/supabase/admin'
import { dismissReport, banGroup } from '../actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const metadata = { title: 'Reports — Admin', robots: { index: false } }

export default async function ReportsPage() {
  const supabase = createAdminClient()
  const { data: reports } = await supabase
    .from('reports')
    .select('*, groups(id, name, slug, platform, invite_link)')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Reports
        <span className="ml-2 text-sm font-normal text-muted-foreground">({reports?.length || 0} open)</span>
      </h1>

      {!reports || reports.length === 0 ? (
        <p className="text-muted-foreground">No open reports.</p>
      ) : (
        <div className="space-y-3">
          {reports.map((report) => {
            const r = report as any
            const group = r.groups
            return (
              <Card key={r.id}>
                <CardContent className="p-4 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{group?.name || 'Unknown group'}</p>
                      <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full capitalize">
                        {r.reason.replace('_', ' ')}
                      </span>
                    </div>
                    {r.description && <p className="text-xs text-muted-foreground mb-1">{r.description}</p>}
                    {group?.invite_link && (
                      <a
                        href={group.invite_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline truncate block max-w-xs"
                      >
                        {group.invite_link}
                      </a>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      Reported {new Date(r.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <form action={dismissReport.bind(null, r.id)}>
                      <Button size="sm" variant="outline" type="submit">Dismiss</Button>
                    </form>
                    {group && (
                      <form action={banGroup.bind(null, group.id)}>
                        <Button size="sm" variant="destructive" type="submit">Ban Group</Button>
                      </form>
                    )}
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
