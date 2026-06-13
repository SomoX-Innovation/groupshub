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
  title: `WhatsApp Groups Kenya ${YEAR} — Free Kenyan WhatsApp Group Links`,
  description: `Find and join WhatsApp groups in Kenya in ${YEAR}. Free Kenyan WhatsApp group invite links for Business, Jobs, Crypto, Football, Education, and more. Join instantly — no sign-in.`,
  path: '/whatsapp-groups-kenya',
  keywords: ['whatsapp groups kenya', 'kenya whatsapp group links', 'kenyan whatsapp groups', 'ke whatsapp groups', 'whatsapp group link kenya', 'nairobi whatsapp groups', 'join kenya whatsapp group 2026'],
  image: `${APP_URL}/api/og?country=Kenya&title=${encodeURIComponent('WhatsApp Groups Kenya')}`,
})

const schema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Where can I find WhatsApp groups in Kenya?', acceptedAnswer: { '@type': 'Answer', text: `GroupsHub lists free Kenyan WhatsApp group invite links in ${YEAR}. Browse Business, Crypto, Jobs, and Sports groups. Click Join instantly — no account needed.` } },
    { '@type': 'Question', name: 'What are popular WhatsApp groups in Kenya?', acceptedAnswer: { '@type': 'Answer', text: 'Popular Kenyan WhatsApp groups cover Business networking (Nairobi traders), Crypto and M-Pesa investment, Harambee Stars football, Jobs and Recruitment, Education (KCSE prep), and Kenyan News and Politics.' } },
    { '@type': 'Question', name: 'How do I join a Kenya WhatsApp group?', acceptedAnswer: { '@type': 'Answer', text: 'Find a Kenya WhatsApp group on GroupsHub, click "Join", and you are redirected to WhatsApp. Tap "Join Group" — free, no sign-in required.' } },
  ],
}

async function getGroups() {
  const supabase = createClient()
  const { data } = await supabase.from('groups').select('*, categories(*), countries(*)').eq('is_approved', true).eq('country_code', 'KE').order('joins_count', { ascending: false }).limit(24)
  return data || []
}

export default async function Page() {
  const groups = await getGroups()
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumb crumbs={[{ name: 'Home', href: '/' }, { name: 'WhatsApp Group Links', href: '/whatsapp-group-links' }, { name: 'Kenya' }]} />
        <div className="mb-8 flex items-center gap-3">
          <span className="text-5xl">🇰🇪</span>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#25D366] mb-1">Free · Updated Daily</div>
            <h1 className="text-3xl sm:text-4xl font-bold">WhatsApp Groups Kenya {YEAR}</h1>
          </div>
        </div>
        <p className="text-muted-foreground mb-8 max-w-2xl">Find free WhatsApp group links in Kenya in {YEAR}. Join active Kenyan communities for Business, Crypto, Jobs, Football, Education (KCSE), and Nairobi local groups. No sign-in required.</p>
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">Kenyan WhatsApp Group Links ({groups.length > 0 ? groups.length : '500'}+)</h2>
            <Link href="/groups/country/ke" className="text-sm text-[#25D366] hover:underline font-medium">See all Kenya groups →</Link>
          </div>
          {groups.length > 0 ? <GroupGrid groups={groups as any} /> : <div className="text-center py-10"><Link href="/groups/country/ke" className="px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold">Browse Kenya Groups</Link></div>}
        </section>
        <section className="mb-10 max-w-3xl">
          <h2 className="text-xl font-bold mb-3">WhatsApp Groups in Kenya</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">Kenya is one of East Africa's most active WhatsApp markets. Kenyan WhatsApp groups are highly popular for Nairobi and Mombasa business networking, Crypto and M-Pesa investment tips, Harambee Stars football, KCSE and university exam preparation, jobs and freelancing (especially on platforms like Upwork), and community chamas (savings groups).</p>
          <p className="text-sm text-muted-foreground leading-relaxed">GroupsHub lists free Kenyan WhatsApp group invite links, verified and updated daily in {YEAR}.</p>
        </section>
        <div className="glass-card rounded-2xl p-6 text-center border border-[#25D366]/20">
          <h2 className="text-lg font-bold mb-2">Have a Kenya WhatsApp Group?</h2>
          <p className="text-muted-foreground text-sm mb-4">Submit your Kenyan WhatsApp group link free.</p>
          <Link href="/submit" className="inline-flex px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:opacity-90 transition-opacity">Submit Your Group — Free</Link>
        </div>
      </div>
    </>
  )
}
