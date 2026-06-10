import { createAdminClient } from '@/lib/supabase/admin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckSquare, Flag, Users } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin Dashboard', robots: { index: false, follow: false } }

export default async function AdminPage() {
  const supabase = createAdminClient()

  const [
    { count: pendingCount },
    { count: reportedCount },
    { count: totalGroups },
  ] = await Promise.all([
    supabase.from('groups').select('id', { count: 'exact', head: true }).eq('is_approved', false),
    supabase.from('reports').select('id', { count: 'exact', head: true }),
    supabase.from('groups').select('id', { count: 'exact', head: true }).eq('is_approved', true),
  ])

  const stats = [
    { title: 'Pending Approval', value: pendingCount || 0, icon: CheckSquare, color: 'text-yellow-500' },
    { title: 'Open Reports', value: reportedCount || 0, icon: Flag, color: 'text-red-500' },
    { title: 'Total Approved', value: totalGroups || 0, icon: Users, color: 'text-green-500' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <span className="text-2xl font-bold">{stat.value.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
