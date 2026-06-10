import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { GroupGrid } from '@/components/groups/GroupGrid'
import { FilterSidebar } from '@/components/browse/FilterSidebar'
import { Pagination } from '@/components/browse/Pagination'
import { SortDropdown } from '@/components/browse/SortDropdown'
import { SearchBar } from '@/components/search/SearchBar'
import type { Metadata } from 'next'
import type { GroupFilters } from '@/types/group'
import { PAGE_SIZE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Browse Groups — Find WhatsApp, Telegram & Discord Communities',
  description: 'Browse thousands of WhatsApp, Telegram, and Discord groups. Filter by platform, category, country, and language.',
}

async function getGroups(filters: GroupFilters) {
  const supabase = createClient()
  const page = filters.page || 1
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let query = supabase
    .from('groups')
    .select('*, categories(*), countries(*)', { count: 'exact' })
    .eq('is_approved', true)

  if (filters.platform) query = query.eq('platform', filters.platform)
  if (filters.country) query = query.eq('country_code', filters.country.toUpperCase())
  if (filters.language) query = query.eq('language_code', filters.language)

  if (filters.category) {
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', filters.category)
      .single()
    if (cat) query = query.eq('category_id', cat.id)
  }

  if (filters.q) {
    query = query.textSearch('search_vector', filters.q, { type: 'websearch', config: 'english' })
  }

  if (filters.sort === 'trending') {
    query = query.order('views', { ascending: false }).order('joins_count', { ascending: false })
  } else if (filters.sort === 'most-joined') {
    query = query.order('joins_count', { ascending: false })
  } else {
    query = query.order('created_at', { ascending: false })
  }

  const { data, count } = await query.range(from, to)
  return { groups: data || [], total: count || 0, totalPages: Math.ceil((count || 0) / PAGE_SIZE) }
}

async function getFilterData() {
  const supabase = createClient()
  const [{ data: categories }, { data: countries }] = await Promise.all([
    supabase.from('categories').select('*').order('group_count', { ascending: false }),
    supabase.from('countries').select('*').order('name'),
  ])
  return { categories: categories || [], countries: countries || [] }
}

interface BrowsePageProps {
  searchParams: {
    platform?: string
    category?: string
    country?: string
    language?: string
    sort?: string
    page?: string
    q?: string
  }
}

export default async function BrowsePage({ searchParams }: BrowsePageProps) {
  const filters: GroupFilters = {
    platform: searchParams.platform as 'whatsapp' | 'telegram' | 'discord' | undefined,
    category: searchParams.category,
    country: searchParams.country,
    language: searchParams.language,
    sort: (searchParams.sort as any) || 'newest',
    page: parseInt(searchParams.page || '1'),
    q: searchParams.q,
  }

  const [{ groups, total, totalPages }, { categories, countries }] = await Promise.all([
    getGroups(filters),
    getFilterData(),
  ])

  const title = filters.q
    ? `Results for "${filters.q}"`
    : filters.platform
    ? `${filters.platform.charAt(0).toUpperCase() + filters.platform.slice(1)} Groups`
    : 'Browse All Groups'

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mobile search */}
      <div className="mb-4 md:hidden">
        <SearchBar initialQuery={filters.q} />
      </div>

      <div className="flex gap-6 lg:gap-8">
        {/* Sidebar */}
        <aside className="hidden md:block w-60 lg:w-64 flex-shrink-0">
          <Suspense fallback={null}>
            <FilterSidebar categories={categories} countries={countries} />
          </Suspense>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
            <div>
              <h1 className="text-xl font-bold">{title}</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {total.toLocaleString()} group{total !== 1 ? 's' : ''} found
              </p>
            </div>
            <Suspense fallback={null}>
              <SortDropdown />
            </Suspense>
          </div>

          <GroupGrid groups={groups as any} />

          <Suspense fallback={null}>
            <Pagination page={filters.page || 1} totalPages={totalPages} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
