import { createAdminClient } from '@/lib/supabase/admin'
import { deleteGroup, toggleApproval } from '../actions'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PlatformBadge } from '@/components/groups/PlatformBadge'
import { ExternalLink, CheckCircle, XCircle } from 'lucide-react'
import { DeleteGroupButton } from './DeleteGroupButton'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Manage Groups — Admin', robots: { index: false } }
export const dynamic = 'force-dynamic'

interface Props {
  searchParams: { q?: string; status?: string; page?: string }
}

export default async function ManageGroupsPage({ searchParams }: Props) {
  const supabase = createAdminClient()
  const q = searchParams.q?.trim() || ''
  const status = searchParams.status || 'all'
  const page = Math.max(1, parseInt(searchParams.page || '1'))
  const pageSize = 25
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from('groups')
    .select('*, categories(*), countries(*)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (status === 'approved') query = query.eq('is_approved', true)
  else if (status === 'pending') query = query.eq('is_approved', false)
  if (q) query = query.ilike('name', `%${q}%`)

  const { data: groups, count } = await query
  const totalPages = Math.ceil((count || 0) / pageSize)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Manage Groups
          <span className="ml-2 text-sm font-normal text-muted-foreground">({count || 0} total)</span>
        </h1>
      </div>

      {/* Filters */}
      <form method="GET" className="flex flex-wrap gap-3 mb-6">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search by name..."
          className="h-9 rounded-lg border border-input bg-background px-3 text-sm flex-1 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <select
          name="status"
          defaultValue={status}
          className="h-9 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All Status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
        </select>
        <Button type="submit" size="sm">Search</Button>
        <a href="/admin/groups">
          <Button type="button" size="sm" variant="ghost">Reset</Button>
        </a>
      </form>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Group</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Platform</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Category</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Country</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Date</th>
                <th className="text-right px-4 py-3 font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {!groups || groups.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">No groups found.</td>
                </tr>
              ) : (
                groups.map((g: any) => (
                  <tr key={g.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-0.5">
                        <a
                          href={`/groups/${g.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium hover:text-primary flex items-center gap-1 max-w-[220px] truncate"
                        >
                          {g.name}
                          <ExternalLink className="h-3 w-3 flex-shrink-0 opacity-40" />
                        </a>
                        <a
                          href={g.invite_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-primary truncate max-w-[220px]"
                        >
                          {g.invite_link}
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <PlatformBadge platform={g.platform} size="sm" />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {g.categories ? `${g.categories.icon} ${g.categories.name}` : '—'}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {g.countries ? `${g.countries.flag_emoji} ${g.countries.name}` : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={g.is_approved
                          ? 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20'
                          : 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20'}
                      >
                        {g.is_approved ? 'Approved' : 'Pending'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                      {new Date(g.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end">
                        <form action={toggleApproval.bind(null, g.id, g.is_approved)}>
                          <button
                            type="submit"
                            title={g.is_approved ? 'Unapprove' : 'Approve'}
                            className={`p-1.5 rounded-md transition-colors ${g.is_approved
                              ? 'text-yellow-600 hover:bg-yellow-500/10'
                              : 'text-green-600 hover:bg-green-500/10'}`}
                          >
                            {g.is_approved
                              ? <XCircle className="h-4 w-4" />
                              : <CheckCircle className="h-4 w-4" />}
                          </button>
                        </form>
                        <DeleteGroupButton id={g.id} name={g.name} deleteAction={deleteGroup} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm">
          <span className="text-muted-foreground">Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            {page > 1 && (
              <a href={`/admin/groups?q=${q}&status=${status}&page=${page - 1}`}>
                <Button size="sm" variant="outline">Previous</Button>
              </a>
            )}
            {page < totalPages && (
              <a href={`/admin/groups?q=${q}&status=${status}&page=${page + 1}`}>
                <Button size="sm" variant="outline">Next</Button>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
