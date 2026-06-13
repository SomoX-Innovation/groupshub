import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { GroupGrid } from '@/components/groups/GroupGrid'
import { Pagination } from '@/components/browse/Pagination'
import { buildCategoryMetadata } from '@/lib/seo/metadata'
import { categoryPageSchema, categoryFAQSchema, categoryHowToSchema, webPageSchema } from '@/lib/seo/schema-markup'
import type { Metadata } from 'next'
import { PAGE_SIZE } from '@/lib/constants'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

export const dynamicParams = true
export const revalidate = 3600

interface CategoryPageProps {
  params: { category: string }
  searchParams: { page?: string }
}

async function getCategoryData(slug: string) {
  const supabase = createClient()
  const { data } = await supabase.from('categories').select('*').eq('slug', slug).single()
  return data
}

async function getCategoryGroups(categoryId: string, page: number) {
  const supabase = createClient()
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const { data, count } = await supabase
    .from('groups')
    .select('*, categories(*), countries(*)', { count: 'exact' })
    .eq('is_approved', true)
    .eq('category_id', categoryId)
    .eq('platform', 'discord' as const)
    .order('joins_count', { ascending: false })
    .range(from, to)

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
  return buildCategoryMetadata(category.name, 'discord')
}

export default async function DiscordCategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = await getCategoryData(params.category)
  if (!category) notFound()

  const page = parseInt(searchParams.page || '1')
  const { groups, total, totalPages } = await getCategoryGroups(category.id, page)

  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://groupshub.com'
  const schemas = [
    ...categoryPageSchema({
      categoryName: category.name,
      platform: 'discord',
      groups: groups.map((g) => ({ name: g.name, slug: g.slug })),
      categorySlug: params.category,
    }),
    categoryFAQSchema(category.name, 'discord', total),
    categoryHowToSchema(category.name, 'discord'),
    webPageSchema({
      name: `Best ${category.name} Discord Servers`,
      description: `Find and join the best ${category.name.toLowerCase()} Discord servers. Browse ${total}+ active communities — free invite links, no sign-in.`,
      url: `${APP_URL}/groupshub/discord-groups/${params.category}`,
      breadcrumbs: [
        { name: 'Home', url: APP_URL },
        { name: 'Discord Servers', url: `${APP_URL}/groupshub/discord-server-links` },
        { name: category.name, url: `${APP_URL}/groupshub/discord-groups/${params.category}` },
      ],
    }),
  ]

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumb crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Discord Servers', href: '/browse?platform=discord' },
          { name: category.name },
        ]} />
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{category.icon}</span>
            <div>
              <h1 className="text-3xl font-bold">{category.name} Discord Servers</h1>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Discover and join the best {category.name.toLowerCase()} Discord servers.
            Browse {total.toLocaleString()} active communities.
          </p>
          <div className="flex items-center gap-2 mt-4 text-sm">
            <Link href={`/whatsapp-groups/${params.category}`} className="hover:underline text-muted-foreground">WhatsApp</Link>
            <span className="text-muted-foreground">·</span>
            <Link href={`/telegram-groups/${params.category}`} className="hover:underline text-muted-foreground">Telegram</Link>
            <span className="text-muted-foreground">·</span>
            <span className="font-medium" style={{ color: '#5865F2' }}>Discord</span>
          </div>
        </div>
        <div className="quick-answer mb-8 rounded-2xl border border-[#5865F2]/20 bg-[#5865F2]/5 p-4 max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-widest text-[#5865F2] mb-1.5">Quick Answer</div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            To join a <strong className="text-foreground">{category.name} Discord server</strong>: browse the {total.toLocaleString()}+ servers below → click any server → click <strong className="text-foreground">Join</strong> → open Discord → tap <strong className="text-foreground">Accept Invite</strong>. Free, no sign-in required.
          </p>
        </div>
        <GroupGrid groups={groups as any} />
        <Pagination page={page} totalPages={totalPages} />
      </div>
    </>
  )
}