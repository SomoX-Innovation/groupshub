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
  title: `WhatsApp Groups Ghana ${YEAR} — Free Ghanaian WhatsApp Group Links`,
  description: `Find and join WhatsApp groups in Ghana in ${YEAR}. Free Ghanaian WhatsApp group invite links for Business, Jobs, Entertainment, Education, and more. Join instantly — no sign-in.`,
  path: '/whatsapp-groups-ghana',
  keywords: ['whatsapp groups ghana', 'ghana whatsapp group links', 'ghanaian whatsapp groups', 'gh whatsapp groups', 'whatsapp group link ghana', 'join ghana whatsapp group 2026'],
  image: `${APP_URL}/api/og?country=Ghana&title=${encodeURIComponent('WhatsApp Groups Ghana')}`,
})

const schema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Where can I find WhatsApp groups in Ghana?', acceptedAnswer: { '@type': 'Answer', text: `GroupsHub lists free Ghanaian WhatsApp group invite links in ${YEAR}. Browse Business, Jobs, Entertainment, and Education groups. Click Join instantly — no account needed.` } },
    { '@type': 'Question', name: 'What are popular WhatsApp groups in Ghana?', acceptedAnswer: { '@type': 'Answer', text: 'Popular Ghanaian WhatsApp groups cover Business and Trade, Jobs and Recruitment, Ghanaian Music (Afrobeats, Highlife), Education, Football (Black Stars), Crypto and Investment, and News.' } },
    { '@type': 'Question', name: 'How do I join a Ghana WhatsApp group?', acceptedAnswer: { '@type': 'Answer', text: 'Find a Ghana WhatsApp group on GroupsHub, click "Join", and you are redirected to WhatsApp. Tap "Join Group" — free, no sign-in required.' } },
  ],
}

async function getGroups() {
  const supabase = createClient()
  const { data } = await supabase.from('groups').select('*, categories(*), countries(*)').eq('is_approved', true).eq('country_code', 'GH').order('joins_count', { ascending: false }).limit(24)
  return data || []
}

export default async function Page() {
  const groups = await getGroups()
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumb crumbs={[{ name: 'Home', href: '/' }, { name: 'WhatsApp Group Links', href: '/whatsapp-group-links' }, { name: 'Ghana' }]} />
        <div className="mb-8 flex items-center gap-3">
          <span className="text-5xl">🇬🇭</span>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#25D366] mb-1">Free · Updated Daily</div>
            <h1 className="text-3xl sm:text-4xl font-bold">WhatsApp Groups Ghana {YEAR}</h1>
          </div>
        </div>
        <p className="text-muted-foreground mb-8 max-w-2xl">Find free WhatsApp group links in Ghana in {YEAR}. Join active Ghanaian communities for Business, Jobs, Afrobeats Music, Football, Education, and more. No sign-in required.</p>
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">Ghanaian WhatsApp Group Links ({groups.length > 0 ? groups.length : '500'}+)</h2>
            <Link href="/groups/country/gh" className="text-sm text-[#25D366] hover:underline font-medium">See all Ghana groups →</Link>
          </div>
          {groups.length > 0 ? <GroupGrid groups={groups as any} /> : <div className="text-center py-10"><Link href="/groups/country/gh" className="px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold">Browse Ghana Groups</Link></div>}
        </section>
        <section className="mb-10 max-w-3xl">
          <h2 className="text-xl font-bold mb-3">WhatsApp Groups in Ghana</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">Ghana has a vibrant WhatsApp community culture. Popular Ghanaian WhatsApp groups span Business and Trade networks (especially Accra and Kumasi traders), Jobs and Recruitment, Ghanaian Music (Afrobeats and Highlife), Black Stars football discussions, Crypto and Mobile Money investment, Education (WASSCE prep), and local community groups.</p>
          <p className="text-sm text-muted-foreground leading-relaxed">GroupsHub lists free Ghana WhatsApp group invite links, verified and updated daily in {YEAR}.</p>
        </section>
        <div className="glass-card rounded-2xl p-6 text-center border border-[#25D366]/20">
          <h2 className="text-lg font-bold mb-2">Have a Ghana WhatsApp Group?</h2>
          <p className="text-muted-foreground text-sm mb-4">Submit your Ghanaian WhatsApp group link free.</p>
          <Link href="/submit" className="inline-flex px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:opacity-90 transition-opacity">Submit Your Group — Free</Link>
        </div>
      </div>
    </>
  )
}
