import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const supabase = createClient()

  const { data: group, error } = await supabase
    .from('groups')
    .select('id, joins_count, invite_link')
    .eq('slug', params.slug)
    .eq('is_approved', true)
    .single()

  if (error || !group) {
    return NextResponse.json({ error: 'Group not found' }, { status: 404 })
  }

  const adminSupabase = createAdminClient()
  await adminSupabase
    .from('groups')
    .update({ joins_count: group.joins_count + 1 })
    .eq('id', group.id)

  return NextResponse.json({ success: true, invite_link: group.invite_link })
}
