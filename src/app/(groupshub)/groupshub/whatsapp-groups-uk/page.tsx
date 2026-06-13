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
  title: `WhatsApp Groups UK ${YEAR} — Free British WhatsApp Group Links`,
  description: `Find and join WhatsApp groups in the UK in ${YEAR}. Free British WhatsApp group invite links for Business, Football, Education, News, and local communities. Join instantly — no sign-in.`,
  path: '/whatsapp-groups-uk',
  keywords: ['whatsapp groups uk', 'uk whatsapp group links', 'british whatsapp groups', 'whatsapp group united kingdom', 'whatsapp groups england', 'gb whatsapp groups', 'join uk whatsapp group 2026'],
  image: `${APP_URL}/api/og?country=United+Kingdom&title=${encodeURIComponent('WhatsApp Groups UK')}`,
})

const schema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Where can I find WhatsApp groups in the UK?', acceptedAnswer: { '@type': 'Answer', text: `GroupsHub lists free UK WhatsApp group invite links in ${YEAR}. Browse Business, Football, Education, and local community groups. Click Join instantly — no account needed.` } },
    { '@type': 'Question', name: 'What are popular WhatsApp groups in the United Kingdom?', acceptedAnswer: { '@type': 'Answer', text: 'Popular UK WhatsApp groups cover Premier League Football, Business networking, London community groups, University student groups, News and Politics, and NHS/Healthcare.' } },
    { '@type': 'Question', name: 'How do I join a UK WhatsApp group?', acceptedAnswer: { '@type': 'Answer', text: 'Find a UK WhatsApp group on GroupsHub, click "Join", and you are redirected to WhatsApp. Tap "Join Group" — free, no sign-in required.' } },
  ],
}

async function getGroups() {
  const supabase = createClient()
  const { data } = await supabase.from('groups').select('*, categories(*), countries(*)').eq('is_approved', true).eq('country_code', 'GB').order('joins_count', { ascending: false }).limit(24)
  return data || []
}

export default async function Page() {
  const groups = await getGroups()
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumb crumbs={[{ name: 'Home', href: '/' }, { name: 'WhatsApp Group Links', href: '/whatsapp-group-links' }, { name: 'UK' }]} />
        <div className="mb-8 flex items-center gap-3">
          <span className="text-5xl">🇬🇧</span>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#25D366] mb-1">Free · Updated Daily</div>
            <h1 className="text-3xl sm:text-4xl font-bold">WhatsApp Groups UK {YEAR}</h1>
          </div>
        </div>
        <p className="text-muted-foreground mb-8 max-w-2xl">Find free WhatsApp group links in the United Kingdom in {YEAR}. Join active British communities for Business, Football (Premier League), Education, Local News, and more. No sign-in required.</p>
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">UK WhatsApp Group Links ({groups.length > 0 ? groups.length : '1,000'}+)</h2>
            <Link href="/groups/country/gb" className="text-sm text-[#25D366] hover:underline font-medium">See all UK groups →</Link>
          </div>
          {groups.length > 0 ? <GroupGrid groups={groups as any} /> : <div className="text-center py-10"><Link href="/groups/country/gb" className="px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold">Browse UK Groups</Link></div>}
        </section>
        <section className="mb-10 max-w-3xl">
          <h2 className="text-xl font-bold mb-3">WhatsApp Groups in the United Kingdom</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">UK WhatsApp groups are growing rapidly across every category — from Premier League football fan clubs and local neighborhood watch groups to NHS worker communities, university student societies, business networking in London, and Brexit/UK politics discussions.</p>
          <p className="text-sm text-muted-foreground leading-relaxed">GroupsHub lists free British WhatsApp group invite links, verified and updated daily in {YEAR}.</p>
        </section>
        <div className="glass-card rounded-2xl p-6 text-center border border-[#25D366]/20">
          <h2 className="text-lg font-bold mb-2">Have a UK WhatsApp Group?</h2>
          <p className="text-muted-foreground text-sm mb-4">Submit your British WhatsApp group link free.</p>
          <Link href="/submit" className="inline-flex px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:opacity-90 transition-opacity">Submit Your Group — Free</Link>
        </div>
      </div>
    </>
  )
}
