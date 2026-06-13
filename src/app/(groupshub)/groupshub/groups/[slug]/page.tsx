import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { JoinButton } from '@/components/groups/JoinButton'
import { ReportDialog } from '@/components/groups/ReportDialog'
import { PlatformBadge } from '@/components/groups/PlatformBadge'
import { GroupGrid } from '@/components/groups/GroupGrid'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Eye, Users, Calendar } from 'lucide-react'
import { ShareButton } from '@/components/groups/ShareButton'
import { buildGroupMetadata } from '@/lib/seo/metadata'
import { groupSchema } from '@/lib/seo/schema-markup'
import type { Metadata } from 'next'

export const dynamicParams = true
export const revalidate = 60

interface GroupPageProps {
  params: { slug: string }
}

type GroupFull = {
  id: string; name: string; slug: string; platform: string; invite_link: string
  description: string | null; member_count: number; views: number; joins_count: number
  is_featured: boolean; is_verified: boolean; is_approved: boolean
  featured_until: string | null; category_id: string | null; country_code: string | null
  created_at: string; updated_at: string; tags: string[]
  categories: { id: string; name: string; slug: string; icon: string; color: string } | null
  countries: { code: string; name: string; flag_emoji: string; continent: string } | null
}

async function getGroup(slug: string): Promise<GroupFull | null> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('groups')
    .select('*, categories(*), countries(*)')
    .eq('slug', slug)
    .eq('is_approved', true)
    .single()
  return error ? null : (data as unknown as GroupFull)
}

export async function generateStaticParams() {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('groups')
    .select('slug')
    .eq('is_approved', true)
    .order('views', { ascending: false })
    .limit(1000)
  return (data || []).map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: GroupPageProps): Promise<Metadata> {
  const group = await getGroup(params.slug)
  if (!group) return {}
  return buildGroupMetadata({
    name: group.name,
    platform: group.platform,
    category: (group as any).categories?.name,
    country: (group as any).countries?.name,
    description: group.description,
    slug: group.slug,
  })
}

export default async function GroupPage({ params }: GroupPageProps) {
  const group = await getGroup(params.slug)
  if (!group) notFound()

  const g = group as any

  // Increment views
  const adminSupabase = createAdminClient()
  adminSupabase.from('groups').update({ views: g.views + 1 }).eq('id', g.id).then(() => {})

  // Get related groups
  const { data: related } = await adminSupabase
    .from('groups')
    .select('*, categories(*), countries(*)')
    .eq('is_approved', true)
    .eq('category_id', g.category_id || '')
    .neq('id', g.id)
    .limit(4)

  const groupSchemas = groupSchema({
    name: g.name,
    description: g.description,
    platform: g.platform,
    invite_link: g.invite_link,
    slug: g.slug,
    created_at: g.created_at,
    updated_at: g.updated_at,
    category: g.categories?.name,
    country: g.countries?.name,
  })

  return (
    <>
      {groupSchemas.map((s: unknown, i: number) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <PlatformBadge platform={g.platform} />
              {g.categories && (
                <Badge variant="secondary">
                  {g.categories.icon} {g.categories.name}
                </Badge>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">{g.name}</h1>
            {g.description && (
              <p className="text-muted-foreground text-base leading-relaxed">{g.description}</p>
            )}
          </div>
          {g.countries?.flag_emoji && (
            <span className="text-4xl sm:text-5xl flex-shrink-0" title={g.countries.name}>
              {g.countries.flag_emoji}
            </span>
          )}
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6 flex-wrap">
          {g.countries && (
            <span className="flex items-center gap-1">
              📍 {g.countries.name}
            </span>
          )}
          {g.member_count > 0 && (
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {g.member_count.toLocaleString()} members
            </span>
          )}
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {g.views.toLocaleString()} views
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(g.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
          </span>
        </div>

        {/* Join + Share */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <JoinButton
            groupSlug={g.slug}
            inviteLink={g.invite_link}
            platform={g.platform}
          />
          <ShareButton groupName={g.name} slug={g.slug} />
          <ReportDialog groupId={g.id} />
        </div>

        {/* Tags */}
        {g.tags && g.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {g.tags.map((tag: string) => (
              <Badge key={tag} variant="outline">#{tag}</Badge>
            ))}
          </div>
        )}

        <Separator className="my-8" />

        {/* Related Groups */}
        {related && related.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4">Related Groups</h2>
            <GroupGrid groups={related as any} />
          </section>
        )}
      </div>
    </>
  )
}