import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim()
  const platform = searchParams.get('platform')

  if (!q || q.length < 2) {
    return NextResponse.json([])
  }

  const supabase = createClient()

  // Full-text search first, fall back to trigram LIKE
  let query = supabase
    .from('groups')
    .select('id, name, slug, platform, categories(name, icon)')
    .eq('is_approved', true)
    .limit(8)

  if (platform) {
    query = query.eq('platform', platform as 'whatsapp' | 'telegram' | 'discord')
  }

  // Try full-text search
  const { data, error } = await query
    .textSearch('search_vector', q, { type: 'websearch', config: 'english' })

  if (!error && data && data.length > 0) {
    return NextResponse.json(data)
  }

  // Fallback: ILIKE on name
  const { data: likeData } = await supabase
    .from('groups')
    .select('id, name, slug, platform, categories(name, icon)')
    .eq('is_approved', true)
    .ilike('name', `%${q}%`)
    .limit(8)

  return NextResponse.json(likeData || [])
}
