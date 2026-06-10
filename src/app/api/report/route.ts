import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { reportSchema } from '@/lib/validations/report.schema'
import { hashIp, getIpFromRequest } from '@/lib/utils/ip-hash'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = reportSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const ip = getIpFromRequest(request)
    const ipHash = hashIp(ip)

    const adminSupabase = createAdminClient()

    // Check for duplicate report from same IP for same group
    const { data: existing } = await adminSupabase
      .from('reports')
      .select('id')
      .eq('group_id', parsed.data.group_id)
      .eq('ip_hash', ipHash)
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .single()

    if (existing) {
      return NextResponse.json({ error: 'You have already reported this group today.' }, { status: 409 })
    }

    const { error: reportError } = await adminSupabase.from('reports').insert({
      group_id: parsed.data.group_id,
      reason: parsed.data.reason,
      description: parsed.data.description || null,
      ip_hash: ipHash,
    })

    if (reportError) {
      return NextResponse.json({ error: reportError.message }, { status: 500 })
    }

    // Increment reported_count
    const { data: group } = await adminSupabase
      .from('groups')
      .select('reported_count')
      .eq('id', parsed.data.group_id)
      .single()

    if (group) {
      await adminSupabase
        .from('groups')
        .update({ reported_count: group.reported_count + 1 })
        .eq('id', parsed.data.group_id)
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
