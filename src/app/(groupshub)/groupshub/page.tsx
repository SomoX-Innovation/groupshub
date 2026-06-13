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
  title: 'WhatsApp Group Links & Telegram Groups — Free Invite Links 2026 | GroupsHub',
  description: 'Find free WhatsApp group links, Telegram group links, and Discord server invite links in 2026. Browse 10,000+ active communities across 195 countries and 50+ categories. Join instantly — no sign-in required.',
  alternates: { canonical: APP_URL },
  keywords: [
    'whatsapp group links', 'whatsapp group link', 'whatsapp group links 2026',
    'whatsapp group invite link', 'whatsapp groups to join', 'join whatsapp group',
    'free whatsapp group links', 'active whatsapp group links', 'whatsapp group directory',
    'telegram group links', 'telegram groups', 'discord server invite links',
    'discord servers to join', 'group invite links', 'find whatsapp groups',
  ],
  openGraph: {
    title: 'WhatsApp Group Links & Telegram Groups — Free Invite Links | GroupsHub',
    description: 'Browse 10,000+ free WhatsApp group links, Telegram group links, and Discord server invite links. 195 countries, 50+ categories. Join instantly — no sign-in.',
    images: [{ url: `${APP_URL}/api/og`, width: 1200, height: 630, alt: 'GroupsHub — WhatsApp Group Links, Telegram Groups & Discord Servers' }],
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
