import { MetadataRoute } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://groupshub.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createAdminClient()

  const [{ data: groups }, { data: categories }, { data: countries }] = await Promise.all([
    supabase
      .from('groups')
      .select('slug, updated_at')
      .eq('is_approved', true)
      .order('views', { ascending: false })
      .limit(10000),
    supabase.from('categories').select('slug, name'),
    supabase.from('countries').select('code'),
  ])

  const now = new Date()

  // Core static routes — highest priority
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                                                       lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE_URL}/browse`,                                           lastModified: now, changeFrequency: 'hourly',  priority: 0.9 },
    { url: `${BASE_URL}/submit`,                                           lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/pricing`,                                          lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    // Trending / how-to content pages
    { url: `${BASE_URL}/world-cup-2026`,                                   lastModified: now, changeFrequency: 'hourly',  priority: 0.92 },
    { url: `${BASE_URL}/how-to-merge-whatsapp-groups`,                     lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/how-to-transfer-whatsapp-to-new-phone`,            lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
  ]

  // Platform landing pages — canonical SEO targets (dedicated routes, not filter params)
  const platformRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/browse`, lastModified: now, changeFrequency: 'hourly', priority: 0.95 },
  ]

  // Individual group pages
  const groupRoutes: MetadataRoute.Sitemap = (groups || []).map((g) => ({
    url: `${BASE_URL}/groups/${g.slug}`,
    lastModified: g.updated_at ? new Date(g.updated_at) : now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Category pages — all 3 platforms × all categories
  // These are the highest-value SEO pages (e.g. "best gaming whatsapp groups")
  const categoryRoutes: MetadataRoute.Sitemap = (categories || []).flatMap((c) => [
    { url: `${BASE_URL}/whatsapp-groups/${c.slug}`,  lastModified: now, changeFrequency: 'daily' as const, priority: 0.88 },
    { url: `${BASE_URL}/telegram-groups/${c.slug}`,  lastModified: now, changeFrequency: 'daily' as const, priority: 0.88 },
    { url: `${BASE_URL}/discord-groups/${c.slug}`,   lastModified: now, changeFrequency: 'daily' as const, priority: 0.88 },
  ])

  // Country pages — canonical dedicated routes only (no filter param variants)
  const countryRoutes: MetadataRoute.Sitemap = (countries || []).map((c) => ({
    url: `${BASE_URL}/groups/country/${c.code.toLowerCase()}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.78,
  }))

  return [...staticRoutes, ...platformRoutes, ...groupRoutes, ...categoryRoutes, ...countryRoutes]
}
