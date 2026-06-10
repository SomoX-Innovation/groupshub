import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const supabase = createClient()

  const { data: group, error } = await supabase
    .from('groups')
    .select('*, categories(*), countries(*)')
    .eq('slug', params.slug)
    .eq('is_approved', true)
    .single()

  if (error || !group) {
    return NextResponse.json({ error: 'Group not found' }, { status: 404 })
  }

  const g = group as unknown as { id: string; views: number }

  // Increment views counter (fire-and-forget)
  const adminSupabase = createAdminClient()
  adminSupabase
    .from('groups')
    .update({ views: g.views + 1 })
    .eq('id', g.id)
    .then(() => {})

  return NextResponse.json(group)
}
