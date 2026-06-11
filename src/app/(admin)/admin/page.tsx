import { createAdminClient } from '@/lib/supabase/admin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckSquare, Flag, Users, TrendingUp } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin Dashboard', robots: { index: false, follow: false } }

export default async function AdminPage() {
  const supabase = createAdminClient()

  const [
    { count: pendingCount },
    { count: reportedCount },
    { count: totalGroups },
    { count: todayCount },
  ] = await Promise.all([
    supabase.from('groups').select('id', { count: 'exact', head: true }).eq('is_approved', false),
    supabase.from('reports').select('id', { count: 'exact', head: true }),
    supabase.from('groups').select('id', { count: 'exact', head: true }).eq('is_approved', true),
    supabase.from('groups').select('id', { count: 'exact', head: true })
      .eq('is_approved', true)
      .gte('created_at', new Date(Date.now() - 86400000).toISOString()),
  ])

  const stats = [
    { title: 'Total Groups', value: totalGroups || 0, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Added Today', value: todayCount || 0, icon: TrendingUp, color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { title: 'Pending Approval', value: pendingCount || 0, icon: CheckSquare, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { title: 'Open Reports', value: reportedCount || 0, icon: Flag, color: 'text-red-500', bg: 'bg-red-500/10' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <span className="text-2xl font-bold">{stat.value.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
