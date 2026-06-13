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
  title: `WhatsApp Groups Philippines ${YEAR} — Free Filipino WhatsApp Group Links`,
  description: `Find and join WhatsApp groups in the Philippines in ${YEAR}. Free Filipino WhatsApp group invite links for OFW, Business, Gaming, Education, and more. Join instantly — no sign-in.`,
  path: '/whatsapp-groups-philippines',
  keywords: ['whatsapp groups philippines', 'philippines whatsapp group links', 'filipino whatsapp groups', 'ph whatsapp groups', 'whatsapp group link philippines', 'ofw whatsapp groups', 'join philippines whatsapp group 2026'],
  image: `${APP_URL}/api/og?country=Philippines&title=${encodeURIComponent('WhatsApp Groups Philippines')}`,
})

const schema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Where can I find WhatsApp groups in the Philippines?', acceptedAnswer: { '@type': 'Answer', text: `GroupsHub lists free Filipino WhatsApp group invite links in ${YEAR}. Browse OFW, Business, Gaming, Education, and Entertainment groups. Click Join instantly — no account needed.` } },
    { '@type': 'Question', name: 'What are popular WhatsApp groups in the Philippines?', acceptedAnswer: { '@type': 'Answer', text: 'Popular Filipino WhatsApp groups cover OFW communities, BPO and Call Center workers, Gaming (Mobile Legends, MLBB), Business and Networking, Education (board exam reviewers), News, and local Barangay groups.' } },
    { '@type': 'Question', name: 'How do I join a Philippines WhatsApp group?', acceptedAnswer: { '@type': 'Answer', text: 'Find a Philippines WhatsApp group on GroupsHub, click "Join", and you are redirected to WhatsApp. Tap "Join Group" — free, no sign-in required.' } },
  ],
}

async function getGroups() {
  const supabase = createClient()
  const { data } = await supabase.from('groups').select('*, categories(*), countries(*)').eq('is_approved', true).eq('country_code', 'PH').order('joins_count', { ascending: false }).limit(24)
  return data || []
}

export default async function Page() {
  const groups = await getGroups()
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumb crumbs={[{ name: 'Home', href: '/' }, { name: 'WhatsApp Group Links', href: '/whatsapp-group-links' }, { name: 'Philippines' }]} />
        <div className="mb-8 flex items-center gap-3">
          <span className="text-5xl">🇵🇭</span>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#25D366] mb-1">Free · Updated Daily</div>
            <h1 className="text-3xl sm:text-4xl font-bold">WhatsApp Groups Philippines {YEAR}</h1>
          </div>
        </div>
        <p className="text-muted-foreground mb-8 max-w-2xl">Find free WhatsApp group links in the Philippines in {YEAR}. Join active Filipino communities for OFW networking, Business, Gaming, BPO workers, Education, and local Barangay groups. No sign-in required.</p>
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">Filipino WhatsApp Group Links ({groups.length > 0 ? groups.length : '500'}+)</h2>
            <Link href="/groups/country/ph" className="text-sm text-[#25D366] hover:underline font-medium">See all Philippines groups →</Link>
          </div>
          {groups.length > 0 ? <GroupGrid groups={groups as any} /> : <div className="text-center py-10"><Link href="/groups/country/ph" className="px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold">Browse Philippines Groups</Link></div>}
        </section>
        <section className="mb-10 max-w-3xl">
          <h2 className="text-xl font-bold mb-3">WhatsApp Groups in the Philippines</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">The Philippines has millions of active WhatsApp users, particularly OFW (Overseas Filipino Workers) communities staying connected across the globe. Popular Filipino WhatsApp groups cover BPO and call center communities, Mobile Legends and gaming, board exam review groups (Nursing, Engineering, CPA), local Barangay announcements, business and MLM networks, and news and entertainment.</p>
          <p className="text-sm text-muted-foreground leading-relaxed">GroupsHub lists free Filipino WhatsApp group invite links, verified and updated daily in {YEAR}.</p>
        </section>
        <div className="glass-card rounded-2xl p-6 text-center border border-[#25D366]/20">
          <h2 className="text-lg font-bold mb-2">Have a Philippines WhatsApp Group?</h2>
          <p className="text-muted-foreground text-sm mb-4">Submit your Filipino WhatsApp group link free.</p>
          <Link href="/submit" className="inline-flex px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:opacity-90 transition-opacity">Submit Your Group — Free</Link>
        </div>
      </div>
    </>
  )
}
