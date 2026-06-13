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
  title: `WhatsApp Groups USA ${YEAR} — Free American WhatsApp Group Links`,
  description: `Find and join WhatsApp groups in the USA in ${YEAR}. Free American WhatsApp group invite links for Business, Tech, Sports, Education, and local communities. Join instantly — no sign-in.`,
  path: '/whatsapp-groups-usa',
  keywords: ['whatsapp groups usa', 'whatsapp groups united states', 'american whatsapp groups', 'us whatsapp group links', 'whatsapp group usa 2026', 'join whatsapp group usa'],
  image: `${APP_URL}/api/og?country=United+States&title=${encodeURIComponent('WhatsApp Groups USA')}`,
})

const schema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Where can I find WhatsApp groups in the USA?', acceptedAnswer: { '@type': 'Answer', text: `GroupsHub lists free US WhatsApp group invite links in ${YEAR}. Browse Business, Tech, Sports, and local community groups. Click Join instantly.` } },
    { '@type': 'Question', name: 'What are popular WhatsApp groups in the United States?', acceptedAnswer: { '@type': 'Answer', text: 'Popular US WhatsApp groups cover Tech and startup communities, Sports (NFL, NBA, MLB, World Cup), Local neighborhood groups, Business networking, and College student groups.' } },
    { '@type': 'Question', name: 'How do I join a US WhatsApp group?', acceptedAnswer: { '@type': 'Answer', text: 'Find a USA WhatsApp group on GroupsHub, click "Join", and you are redirected to WhatsApp. Tap "Join Group" — free, no sign-in required.' } },
  ],
}

async function getGroups() {
  const supabase = createClient()
  const { data } = await supabase.from('groups').select('*, categories(*), countries(*)').eq('is_approved', true).eq('country_code', 'US').order('joins_count', { ascending: false }).limit(24)
  return data || []
}

export default async function Page() {
  const groups = await getGroups()
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumb crumbs={[{ name: 'Home', href: '/' }, { name: 'WhatsApp Group Links', href: '/whatsapp-group-links' }, { name: 'USA' }]} />
        <div className="mb-8 flex items-center gap-3">
          <span className="text-5xl">🇺🇸</span>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#25D366] mb-1">Free · Updated Daily</div>
            <h1 className="text-3xl sm:text-4xl font-bold">WhatsApp Groups USA {YEAR}</h1>
          </div>
        </div>
        <p className="text-muted-foreground mb-8 max-w-2xl">Find free WhatsApp group links in the United States in {YEAR}. Join active American communities for Business, Tech, Sports, World Cup, Education, and local neighborhoods. No sign-in required.</p>
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">US WhatsApp Group Links ({groups.length > 0 ? groups.length : '1,000'}+)</h2>
            <Link href="/groups/country/us" className="text-sm text-[#25D366] hover:underline font-medium">See all USA groups →</Link>
          </div>
          {groups.length > 0 ? <GroupGrid groups={groups as any} /> : <div className="text-center py-10"><Link href="/groups/country/us" className="px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold">Browse USA Groups</Link></div>}
        </section>
        <section className="mb-10 max-w-3xl">
          <h2 className="text-xl font-bold mb-3">WhatsApp Groups in the United States</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">WhatsApp groups in the USA cover everything from local neighborhood communities and school parent groups to tech startup networking, sports fan clubs (NFL, NBA, World Cup), and college student organizations. As WhatsApp grows in North America, more American communities are moving their conversations there.</p>
          <p className="text-sm text-muted-foreground leading-relaxed">GroupsHub lists free US WhatsApp group invite links, verified and updated daily in {YEAR}.</p>
        </section>
        <div className="glass-card rounded-2xl p-6 text-center border border-[#25D366]/20">
          <h2 className="text-lg font-bold mb-2">Have a US WhatsApp Group?</h2>
          <p className="text-muted-foreground text-sm mb-4">Submit your American WhatsApp group link free.</p>
          <Link href="/submit" className="inline-flex px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:opacity-90 transition-opacity">Submit Your Group — Free</Link>
        </div>
      </div>
    </>
  )
}
