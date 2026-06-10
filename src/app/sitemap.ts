import { MetadataRoute } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://groupshub.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createAdminClient()

  const [{ data: groups }, { data: categories }, { data: countries }] = await Promise.all([
    supabase.from('groups').select('slug, updated_at').eq('is_approved', true).order('created_at', { ascending: false }).limit(5000),
    supabase.from('categories').select('slug'),
    supabase.from('countries').select('code'),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/browse`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${BASE_URL}/submit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  const groupRoutes: MetadataRoute.Sitemap = (groups || []).map((g) => ({
    url: `${BASE_URL}/groups/${g.slug}`,
    lastModified: g.updated_at ? new Date(g.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const categoryRoutes: MetadataRoute.Sitemap = (categories || []).flatMap((c) => [
    { url: `${BASE_URL}/whatsapp-groups/${c.slug}`, changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${BASE_URL}/telegram-groups/${c.slug}`, changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${BASE_URL}/discord-groups/${c.slug}`, changeFrequency: 'daily' as const, priority: 0.8 },
  ])

  const countryRoutes: MetadataRoute.Sitemap = (countries || []).map((c) => ({
    url: `${BASE_URL}/groups/country/${c.code.toLowerCase()}`,
    changeFrequency: 'daily',
    priority: 0.75,
  }))

  return [...staticRoutes, ...groupRoutes, ...categoryRoutes, ...countryRoutes]
}
