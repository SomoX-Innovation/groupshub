import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

export async function GET() {
  try {
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data, error } = await supabase
      .from('countries')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error
    return NextResponse.json(data ?? [])
  } catch (err) {
    console.error('countries route error:', err)
    return NextResponse.json([], { status: 200 })
  }
}
