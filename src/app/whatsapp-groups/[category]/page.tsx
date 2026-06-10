import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { GroupGrid } from '@/components/groups/GroupGrid'
import { Pagination } from '@/components/browse/Pagination'
import { buildCategoryMetadata } from '@/lib/seo/metadata'
import { itemListSchema } from '@/lib/seo/schema-markup'
import type { Metadata } from 'next'
import { PAGE_SIZE } from '@/lib/constants'
import Link from 'next/link'

export const dynamicParams = true
export const revalidate = 3600

interface CategoryPageProps {
  params: { category: string }
  searchParams: { page?: string; platform?: string }
}

async function getCategoryData(slug: string) {
  const supabase = createClient()
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()
  return data
}

async function getCategoryGroups(categoryId: string, platform: string | undefined, page: number) {
  const supabase = createClient()
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let query = supabase
    .from('groups')
    .select('*, categories(*), countries(*)', { count: 'exact' })
    .eq('is_approved', true)
    .eq('category_id', categoryId)

  if (platform) query = query.eq('platform', platform as 'whatsapp' | 'telegram' | 'discord')

  query = query.order('joins_count', { ascending: false })

  const { data, count } = await query.range(from, to)
  const groups = (data || []) as Array<{ id: string; name: string; slug: string; [k: string]: unknown }>
  return { groups, total: count || 0, totalPages: Math.ceil((count || 0) / PAGE_SIZE) }
}

export async function generateStaticParams() {
  const supabase = createAdminClient()
  const { data } = await supabase.from('categories').select('slug')
  return (data || []).map((c) => ({ category: c.slug }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await getCategoryData(params.category)
  if (!category) return {}
  return buildCategoryMetadata(category.name, 'whatsapp')
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = await getCategoryData(params.category)
  if (!category) notFound()

  const page = parseInt(searchParams.page || '1')
  const platform = searchParams.platform

  const { groups, total, totalPages } = await getCategoryGroups(category.id, platform, page)

  const platformLinks = [
    { platform: 'whatsapp', label: 'WhatsApp', color: '#25D366' },
    { platform: 'telegram', label: 'Telegram', color: '#2AABEE' },
    { platform: 'discord', label: 'Discord', color: '#5865F2' },
  ]

  const schema = itemListSchema(
    groups.map((g) => ({ name: g.name, slug: g.slug })),
    `${category.name} Groups`
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{category.icon}</span>
            <h1 className="text-3xl font-bold">{category.name} Groups</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Discover and join the best {category.name.toLowerCase()} communities on WhatsApp, Telegram, and Discord.
            Browse {total.toLocaleString()} active groups from around the world.
          </p>

          {/* Platform filter */}
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <Link
              href={`/whatsapp-groups/${params.category}`}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${!platform ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            >
              All Platforms
            </Link>
            {platformLinks.map((pl) => (
              <Link
                key={pl.platform}
                href={`/whatsapp-groups/${params.category}?platform=${pl.platform}`}
                className={`px-3 py-1 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90 ${platform === pl.platform ? 'opacity-100' : 'opacity-70'}`}
                style={{ backgroundColor: pl.color }}
              >
                {pl.label}
              </Link>
            ))}
          </div>
        </div>

        <GroupGrid groups={groups as any} />
        <Pagination page={page} totalPages={totalPages} />
      </div>
    </>
  )
}
