import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { HeroSection } from '@/components/home/HeroSection'
import { StatsBar } from '@/components/home/StatsBar'
import { TrendingGroups } from '@/components/home/TrendingGroups'
import { GroupsByContinent } from '@/components/home/GroupsByContinent'
import { CategoriesGrid } from '@/components/home/CategoriesGrid'
import { SeoContent } from '@/components/home/SeoContent'
import { GroupGridSkeleton } from '@/components/groups/GroupCardSkeleton'
import type { Metadata } from 'next'
import { websiteSchema, howToJoinSchema, directoryDatasetSchema } from '@/lib/seo/schema-markup'

export const revalidate = 600

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://groupshub.com'

export const metadata: Metadata = {
  title: 'WhatsApp Group Links, Telegram Groups & Discord Servers 2026 — GroupsHub',
  description: 'Find and join the best WhatsApp group links, Telegram groups, and Discord servers in 2026. Browse 10,000+ active communities across 195 countries and 50+ categories. Free — no sign-in required.',
  alternates: { canonical: APP_URL },
  keywords: [
    'whatsapp group links 2026', 'whatsapp groups to join', 'telegram group links',
    'discord servers to join', 'join whatsapp group', 'whatsapp group invite link',
    'telegram groups list', 'discord server list', 'whatsapp group directory',
    'find whatsapp groups', 'active whatsapp groups', 'best telegram channels 2026',
    'public discord servers', 'free group links', 'group link directory',
  ],
  openGraph: {
    title: 'WhatsApp Group Links, Telegram Groups & Discord Servers — GroupsHub',
    description: 'Join WhatsApp groups, Telegram channels and Discord servers instantly. 10,000+ active communities in 50+ categories and 195 countries. Free, no sign-in.',
    images: [{ url: `${APP_URL}/api/og`, width: 1200, height: 630, alt: 'GroupsHub — WhatsApp Telegram Discord Group Directory' }],
  },
}

async function getTrendingGroups() {
  const supabase = createClient()
  const { data } = await supabase
    .from('groups')
    .select('*, categories(*), countries(*)')
    .eq('is_approved', true)
    .order('views', { ascending: false })
    .order('joins_count', { ascending: false })
    .limit(8)

  return data || []
}

async function getCategories() {
  const supabase = createClient()
  const { data } = await supabase
    .from('categories')
    .select('*')
    .order('group_count', { ascending: false })
  return data || []
}

async function getGroupsByContinent() {
  const supabase = createClient()
  const { data } = await supabase
    .from('groups')
    .select('*, categories(*), countries(*)')
    .eq('is_approved', true)
    .order('views', { ascending: false })
    .limit(40)
  return data || []
}

async function getDirectoryStats() {
  const supabase = createClient()
  const [{ count: groupCount }, { count: countryCount }] = await Promise.all([
    supabase.from('groups').select('*', { count: 'exact', head: true }).eq('is_approved', true),
    supabase.from('countries').select('*', { count: 'exact', head: true }),
  ])
  return { groupCount: groupCount || 10000, countryCount: countryCount || 195 }
}

export default async function HomePage() {
  const [trending, categories, continentGroups, stats] = await Promise.all([
    getTrendingGroups(),
    getCategories(),
    getGroupsByContinent(),
    getDirectoryStats(),
  ])

  const allSchemas = [
    ...websiteSchema(),
    howToJoinSchema('whatsapp'),
    howToJoinSchema('telegram'),
    howToJoinSchema('discord'),
    directoryDatasetSchema(stats.groupCount, categories.length || 50, stats.countryCount),
  ]

  return (
    <>
      {allSchemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <HeroSection />
      <StatsBar />
      <Suspense fallback={<div className="py-12"><div className="container mx-auto px-4"><GroupGridSkeleton count={8} /></div></div>}>
        <TrendingGroups groups={trending as any} />
      </Suspense>
      <Suspense fallback={null}>
        <GroupsByContinent groups={continentGroups as any} />
      </Suspense>
      <CategoriesGrid categories={categories} />
      <SeoContent />
    </>
  )
}
