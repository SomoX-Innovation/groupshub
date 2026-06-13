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
  title: `WhatsApp Groups Indonesia ${YEAR} — Free Indonesian WhatsApp Group Links`,
  description: `Find and join WhatsApp groups in Indonesia in ${YEAR}. Free Indonesian WhatsApp group invite links for Business, Gaming, Education, Entertainment, and more. Join instantly — no sign-in.`,
  path: '/whatsapp-groups-indonesia',
  keywords: ['whatsapp groups indonesia', 'indonesia whatsapp group links', 'grup whatsapp indonesia', 'id whatsapp groups', 'whatsapp group link indonesia', 'join indonesia whatsapp group 2026', 'link grup whatsapp indonesia'],
  image: `${APP_URL}/api/og?country=Indonesia&title=${encodeURIComponent('WhatsApp Groups Indonesia')}`,
})

const schema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Where can I find WhatsApp groups in Indonesia?', acceptedAnswer: { '@type': 'Answer', text: `GroupsHub lists free Indonesian WhatsApp group invite links in ${YEAR}. Browse Business, Gaming, Education, and Entertainment groups. Click Join instantly — no account needed.` } },
    { '@type': 'Question', name: 'What are popular WhatsApp groups in Indonesia?', acceptedAnswer: { '@type': 'Answer', text: 'Popular Indonesian WhatsApp groups cover Business and UMKM networking, Mobile Gaming (MLBB, Free Fire), Education, K-Pop communities, Islamic groups and pengajian, Football (Liga 1), and Local community (RT/RW) groups.' } },
    { '@type': 'Question', name: 'How do I join an Indonesia WhatsApp group?', acceptedAnswer: { '@type': 'Answer', text: 'Find an Indonesia WhatsApp group on GroupsHub, click "Join", and you are redirected to WhatsApp. Tap "Join Group" — free, no sign-in required.' } },
  ],
}

async function getGroups() {
  const supabase = createClient()
  const { data } = await supabase.from('groups').select('*, categories(*), countries(*)').eq('is_approved', true).eq('country_code', 'ID').order('joins_count', { ascending: false }).limit(24)
  return data || []
}

export default async function Page() {
  const groups = await getGroups()
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumb crumbs={[{ name: 'Home', href: '/' }, { name: 'WhatsApp Group Links', href: '/whatsapp-group-links' }, { name: 'Indonesia' }]} />
        <div className="mb-8 flex items-center gap-3">
          <span className="text-5xl">🇮🇩</span>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#25D366] mb-1">Free · Updated Daily</div>
            <h1 className="text-3xl sm:text-4xl font-bold">WhatsApp Groups Indonesia {YEAR}</h1>
          </div>
        </div>
        <p className="text-muted-foreground mb-8 max-w-2xl">Find free WhatsApp group links in Indonesia in {YEAR}. Join active Indonesian communities for Business (UMKM), Mobile Gaming, Islamic groups, K-Pop, Football (Liga 1), and local RT/RW groups. No sign-in required.</p>
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">Indonesian WhatsApp Group Links ({groups.length > 0 ? groups.length : '500'}+)</h2>
            <Link href="/groups/country/id" className="text-sm text-[#25D366] hover:underline font-medium">See all Indonesia groups →</Link>
          </div>
          {groups.length > 0 ? <GroupGrid groups={groups as any} /> : <div className="text-center py-10"><Link href="/groups/country/id" className="px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold">Browse Indonesia Groups</Link></div>}
        </section>
        <section className="mb-10 max-w-3xl">
          <h2 className="text-xl font-bold mb-3">WhatsApp Groups in Indonesia</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">Indonesia is one of Southeast Asia's largest WhatsApp markets with over 100 million users. Indonesian WhatsApp groups (grup WhatsApp Indonesia) span UMKM (small business) trading networks, Islamic pengajian and religious groups, Mobile Legends and Free Fire gaming communities, K-Pop fan clubs, Liga 1 football fans, local RT/RW neighborhood announcements, and university student groups.</p>
          <p className="text-sm text-muted-foreground leading-relaxed">GroupsHub lists free Indonesian WhatsApp group invite links, verified and updated daily in {YEAR}. Link grup WhatsApp Indonesia gratis — langsung bergabung.</p>
        </section>
        <div className="glass-card rounded-2xl p-6 text-center border border-[#25D366]/20">
          <h2 className="text-lg font-bold mb-2">Have an Indonesia WhatsApp Group?</h2>
          <p className="text-muted-foreground text-sm mb-4">Submit your Indonesian WhatsApp group link free.</p>
          <Link href="/submit" className="inline-flex px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:opacity-90 transition-opacity">Submit Your Group — Free</Link>
        </div>
      </div>
    </>
  )
}
