import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { HeroSection } from '@/components/home/HeroSection'
import { StatsBar } from '@/components/home/StatsBar'
import { TrendingGroups } from '@/components/home/TrendingGroups'
import { GroupsByContinent } from '@/components/home/GroupsByContinent'
import { CategoriesGrid } from '@/components/home/CategoriesGrid'
import { GroupGridSkeleton } from '@/components/groups/GroupCardSkeleton'
import type { Metadata } from 'next'
import { websiteSchema } from '@/lib/seo/schema-markup'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'GroupsHub — Find & Join WhatsApp Groups, Telegram Groups & Discord Servers 2025',
  description: 'Find and join the best WhatsApp group links, Telegram groups, and Discord servers in 2025. Browse 10,000+ active communities across 195 countries and 50+ categories. Free, no sign-in required.',
  alternates: { canonical: process.env.NEXT_PUBLIC_APP_URL || 'https://groupshub.com' },
  openGraph: {
    title: 'GroupsHub — #1 Free WhatsApp, Telegram & Discord Group Directory',
    description: 'Join WhatsApp groups, Telegram channels and Discord servers instantly. 10,000+ verified active communities in 50+ categories and 195 countries.',
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

export default async function HomePage() {
  const [trending, categories, continentGroups] = await Promise.all([
    getTrendingGroups(),
    getCategories(),
    getGroupsByContinent(),
  ])

  const schema = websiteSchema()

  return (
    <>
      {schema.map((s, i) => (
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
    </>
  )
}
