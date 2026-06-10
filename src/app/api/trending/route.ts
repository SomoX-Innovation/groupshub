import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { unstable_cache } from 'next/cache'

const getTrendingCached = unstable_cache(
  async () => {
    const supabase = createClient()
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

    const { data, error } = await supabase
      .from('groups')
      .select('*, categories(*), countries(*)')
      .eq('is_approved', true)
      .gte('created_at', sevenDaysAgo)
      .order('views', { ascending: false })
      .order('joins_count', { ascending: false })
      .limit(12)

    if (error || !data || data.length < 4) {
      // Fallback: all-time trending
      const { data: fallback } = await supabase
        .from('groups')
        .select('*, categories(*), countries(*)')
        .eq('is_approved', true)
        .order('views', { ascending: false })
        .order('joins_count', { ascending: false })
        .limit(12)
      return fallback || []
    }

    return data
  },
  ['trending'],
  { revalidate: 600, tags: ['trending'] }
)

export async function GET() {
  try {
    const data = await getTrendingCached()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch trending groups' }, { status: 500 })
  }
}
