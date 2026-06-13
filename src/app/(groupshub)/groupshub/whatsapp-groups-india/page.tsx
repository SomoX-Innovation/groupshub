import { createClient } from '@/lib/supabase/server'
import { GroupGrid } from '@/components/groups/GroupGrid'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import Link from 'next/link'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'

export const revalidate = 600
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://groupshub.com'
const YEAR = new Date().getFullYear()

export const metadata: Metadata = buildMetadata({
  title: `WhatsApp Groups India ${YEAR} — Free Indian WhatsApp Group Links`,
  description: `Find and join the best WhatsApp groups in India in ${YEAR}. Browse free Indian WhatsApp group links for Education, Business, Cricket, Bollywood, Jobs, and more. Join instantly — no sign-in.`,
  path: '/whatsapp-groups-india',
  keywords: [
    'whatsapp groups india', 'india whatsapp group link', 'indian whatsapp groups',
    'whatsapp group india', 'india whatsapp groups links', 'whatsapp group links india',
    'join whatsapp group india', 'indian whatsapp group links 2026',
    'whatsapp group link india free', 'india whatsapp community',
  ],
  image: `${APP_URL}/api/og?country=India&title=${encodeURIComponent('WhatsApp Groups India')}`,
})

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Where can I find WhatsApp groups in India?', acceptedAnswer: { '@type': 'Answer', text: `GroupsHub lists free WhatsApp group invite links from India in ${YEAR}. Browse Education, Business, Cricket, Bollywood, and more. Click Join to get the invite link instantly — no account needed.` } },
    { '@type': 'Question', name: 'What are the most popular WhatsApp groups in India?', acceptedAnswer: { '@type': 'Answer', text: 'The most popular Indian WhatsApp groups cover Cricket, Bollywood, Education, Jobs & Recruitment, Stock Market, News, and Religious communities. Browse GroupsHub to find the most active Indian WhatsApp groups.' } },
    { '@type': 'Question', name: 'How do I join an Indian WhatsApp group?', acceptedAnswer: { '@type': 'Answer', text: 'Find an Indian WhatsApp group on GroupsHub, click the "Join" button, and you will be redirected to WhatsApp with the invite link. Tap "Join Group" in WhatsApp to complete. Free — no sign-in required.' } },
  ],
}

const indianCategories = [
  { name: 'Education', slug: 'education', emoji: '📚' },
  { name: 'Business', slug: 'business', emoji: '💼' },
  { name: 'Sports', slug: 'sports', emoji: '🏏' },
  { name: 'Technology', slug: 'technology', emoji: '💻' },
  { name: 'Crypto', slug: 'crypto', emoji: '₿' },
  { name: 'Music', slug: 'music', emoji: '🎵' },
  { name: 'Health', slug: 'health', emoji: '🏥' },
  { name: 'Gaming', slug: 'gaming', emoji: '🎮' },
]

async function getIndiaGroups() {
  const supabase = createClient()
  const { data } = await supabase
    .from('groups')
    .select('*, categories(*), countries(*)')
    .eq('is_approved', true)
    .eq('country_code', 'IN')
    .order('joins_count', { ascending: false })
    .limit(24)
  return data || []
}

export default async function WhatsAppGroupsIndiaPage() {
  const groups = await getIndiaGroups()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumb crumbs={[{ name: 'Home', href: '/' }, { name: 'WhatsApp Group Links', href: '/whatsapp-group-links' }, { name: 'India' }]} />

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-5xl">🇮🇳</span>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-[#25D366] mb-1">Free · Updated Daily</div>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight">WhatsApp Groups India {YEAR}</h1>
            </div>
          </div>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
            Find and join free WhatsApp group links from India in {YEAR}. Browse active Indian WhatsApp groups for Education, Business, Cricket, Bollywood, Jobs, Stock Market, and more. No sign-in required.
          </p>
        </div>

        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">Indian WhatsApp Group Links ({groups.length > 0 ? groups.length : '1,000'}+)</h2>
            <Link href="/groups/country/in" className="text-sm text-[#25D366] hover:underline font-medium">See all India groups →</Link>
          </div>
          {groups.length > 0
            ? <GroupGrid groups={groups as any} />
            : <div className="text-center py-10"><Link href="/groups/country/in" className="px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold">Browse India Groups</Link></div>}
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Indian WhatsApp Groups by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {indianCategories.map((cat) => (
              <Link key={cat.slug} href={`/whatsapp-groups/${cat.slug}`} className="glass-card rounded-xl p-4 hover:-translate-y-0.5 transition-transform group text-center">
                <div className="text-3xl mb-2">{cat.emoji}</div>
                <div className="font-semibold text-xs group-hover:text-[#25D366] transition-colors">{cat.name}</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-10 max-w-3xl">
          <h2 className="text-xl font-bold mb-4">WhatsApp Groups in India — Overview</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">India is the world&apos;s largest WhatsApp market with over 500 million users. Indian WhatsApp groups span every topic imaginable — from IIT/NEET preparation and CA study groups to cricket fan clubs, Bollywood discussions, stock market tips, regional news, and religious communities.</p>
          <p className="text-sm text-muted-foreground leading-relaxed">GroupsHub lists free Indian WhatsApp group invite links in {YEAR}, verified and updated daily. Join any India WhatsApp group instantly — just click Join, open WhatsApp, and tap Join Group. No GroupsHub account needed.</p>
        </section>

        <div className="glass-card rounded-2xl p-6 text-center border border-[#25D366]/20">
          <h2 className="text-lg font-bold mb-2">Have an Indian WhatsApp Group?</h2>
          <p className="text-muted-foreground text-sm mb-4">Submit your India WhatsApp group link free. Reach thousands of people searching for Indian groups.</p>
          <Link href="/submit" className="inline-flex px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:opacity-90 transition-opacity">Submit Your Group — Free</Link>
        </div>
      </div>
    </>
  )
}
