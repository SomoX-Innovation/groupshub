import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { PAGE_SIZE } from '@/lib/constants'
import { submitGroupSchema } from '@/lib/validations/group.schema'
import { hashIp, getIpFromRequest } from '@/lib/utils/ip-hash'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
  const platform = searchParams.get('platform')
  const category = searchParams.get('category')
  const country = searchParams.get('country')
  const language = searchParams.get('language')
  const sort = searchParams.get('sort') || 'newest'
  const q = searchParams.get('q')

  const supabase = createClient()
  let query = supabase
    .from('groups')
    .select('*, categories(*), countries(*)', { count: 'exact' })
    .eq('is_approved', true)

  if (platform) query = query.eq('platform', platform as 'whatsapp' | 'telegram' | 'discord')
  if (country) query = query.eq('country_code', country.toUpperCase())
  if (language) query = query.eq('language_code', language)
  if (category) {
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', category)
      .single()
    if (cat) query = query.eq('category_id', cat.id)
  }

  if (q) {
    query = query.textSearch('search_vector', q, { type: 'websearch', config: 'english' })
  }

  if (sort === 'trending') {
    query = query.order('views', { ascending: false }).order('joins_count', { ascending: false })
  } else if (sort === 'most-joined') {
    query = query.order('joins_count', { ascending: false })
  } else {
    query = query.order('created_at', { ascending: false })
  }

  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1
  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    groups: data,
    total: count || 0,
    page,
    totalPages: Math.ceil((count || 0) / PAGE_SIZE),
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = submitGroupSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const { website, recaptcha_token, tags, ...groupData } = parsed.data

    // Honeypot check
    if (website) {
      return NextResponse.json({ error: 'Bot detected' }, { status: 400 })
    }

    // reCAPTCHA verification
    if (recaptcha_token && process.env.RECAPTCHA_SECRET_KEY) {
      const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha_token}`,
      })
      const recaptchaData = await recaptchaRes.json()
      if (!recaptchaData.success || recaptchaData.score < 0.5) {
        return NextResponse.json({ error: 'Submission rejected. Please try again.' }, { status: 400 })
      }
    }

    const ip = getIpFromRequest(request)
    const ipHash = hashIp(ip)

    const adminSupabase = createAdminClient()

    // Rate limiting: 3 submissions per hour per IP
    const windowStart = new Date()
    windowStart.setMinutes(0, 0, 0)

    const { data: rateLimit } = await adminSupabase
      .from('rate_limits')
      .select('count')
      .eq('ip_hash', ipHash)
      .eq('action', 'submit')
      .gte('window_start', windowStart.toISOString())
      .single()

    if (rateLimit && rateLimit.count >= 3) {
      return NextResponse.json({ error: 'Too many submissions. Please wait an hour.' }, { status: 429 })
    }

    // Duplicate invite link check
    const supabase = createClient()
    const { data: existing } = await supabase
      .from('groups')
      .select('id, slug')
      .eq('invite_link', groupData.invite_link)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'This invite link is already listed.', existing_slug: existing.slug },
        { status: 409 }
      )
    }

    // Insert group (auto-approved so it appears immediately on the site)
    const { data: newGroup, error: insertError } = await adminSupabase
      .from('groups')
      .insert({
        name: groupData.name,
        platform: groupData.platform,
        invite_link: groupData.invite_link,
        category_id: groupData.category_id,
        country_code: groupData.country_code,
        language_code: groupData.language_code,
        description: groupData.description || null,
        tags: tags ?? [],
        submitter_ip_hash: ipHash,
        is_approved: true,
      })
      .select('id, slug')
      .single()

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    // Update rate limit
    await adminSupabase.from('rate_limits').upsert({
      ip_hash: ipHash,
      action: 'submit',
      window_start: windowStart.toISOString(),
      count: (rateLimit?.count || 0) + 1,
    }, { onConflict: 'ip_hash,action,window_start' })

    return NextResponse.json(
      { message: 'Group submitted for review', id: newGroup.id, slug: newGroup.slug },
      { status: 201 }
    )
  } catch (err) {
    console.error('[POST /api/groups]', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
