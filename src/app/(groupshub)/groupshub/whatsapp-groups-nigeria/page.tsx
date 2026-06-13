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
  title: `WhatsApp Groups Nigeria ${YEAR} — Free Nigerian WhatsApp Group Links`,
  description: `Find and join the best WhatsApp groups in Nigeria in ${YEAR}. Free Nigerian WhatsApp group links for Business, Jobs, Crypto, Entertainment, and more. Join instantly — no sign-in required.`,
  path: '/whatsapp-groups-nigeria',
  keywords: ['whatsapp groups nigeria', 'nigerian whatsapp group link', 'nigeria whatsapp groups', 'ng whatsapp groups', 'whatsapp group links nigeria', 'join nigeria whatsapp group 2026'],
  image: `${APP_URL}/api/og?country=Nigeria&title=${encodeURIComponent('WhatsApp Groups Nigeria')}`,
})

const schema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Where can I find WhatsApp groups in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: `GroupsHub lists free Nigerian WhatsApp group invite links in ${YEAR}. Browse Business, Crypto, Jobs, and Entertainment groups. Click Join instantly.` } },
    { '@type': 'Question', name: 'What are popular WhatsApp groups in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'Popular Nigerian WhatsApp groups cover Business networking, Crypto trading signals, Job vacancies, Nollywood, JAMB/WAEC preparation, and investment groups.' } },
    { '@type': 'Question', name: 'How do I join a Nigerian WhatsApp group?', acceptedAnswer: { '@type': 'Answer', text: 'Find a Nigeria WhatsApp group on GroupsHub, click "Join", and you are redirected to WhatsApp. Tap "Join Group" — free, no sign-in required.' } },
  ],
}

async function getGroups() {
  const supabase = createClient()
  const { data } = await supabase.from('groups').select('*, categories(*), countries(*)').eq('is_approved', true).eq('country_code', 'NG').order('joins_count', { ascending: false }).limit(24)
  return data || []
}

export default async function Page() {
  const groups = await getGroups()
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumb crumbs={[{ name: 'Home', href: '/' }, { name: 'WhatsApp Group Links', href: '/whatsapp-group-links' }, { name: 'Nigeria' }]} />
        <div className="mb-8 flex items-center gap-3">
          <span className="text-5xl">🇳🇬</span>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#25D366] mb-1">Free · Updated Daily</div>
            <h1 className="text-3xl sm:text-4xl font-bold">WhatsApp Groups Nigeria {YEAR}</h1>
          </div>
        </div>
        <p className="text-muted-foreground mb-8 max-w-2xl">Find free WhatsApp group links from Nigeria in {YEAR}. Join active Nigerian communities for Business, Crypto, Jobs, Nollywood, Education, and more. No sign-in required.</p>
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">Nigerian WhatsApp Group Links ({groups.length > 0 ? groups.length : '1,000'}+)</h2>
            <Link href="/groups/country/ng" className="text-sm text-[#25D366] hover:underline font-medium">See all Nigeria groups →</Link>
          </div>
          {groups.length > 0 ? <GroupGrid groups={groups as any} /> : <div className="text-center py-10"><Link href="/groups/country/ng" className="px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold">Browse Nigeria Groups</Link></div>}
        </section>
        <section className="mb-10 max-w-3xl">
          <h2 className="text-xl font-bold mb-3">WhatsApp Groups in Nigeria</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">Nigeria has one of the fastest-growing WhatsApp communities in Africa. Nigerian WhatsApp groups are highly active for business networking, crypto trading signals, JAMB and WAEC exam preparation, Nollywood discussions, job vacancies, real estate investment, and Nigerian news.</p>
          <p className="text-sm text-muted-foreground leading-relaxed">GroupsHub lists free Nigerian WhatsApp group invite links, verified and updated daily in {YEAR}.</p>
        </section>
        <div className="glass-card rounded-2xl p-6 text-center border border-[#25D366]/20">
          <h2 className="text-lg font-bold mb-2">Have a Nigerian WhatsApp Group?</h2>
          <p className="text-muted-foreground text-sm mb-4">Submit your Nigeria WhatsApp group link free.</p>
          <Link href="/submit" className="inline-flex px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:opacity-90 transition-opacity">Submit Your Group — Free</Link>
        </div>
      </div>
    </>
  )
}
