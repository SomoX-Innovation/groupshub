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
  title: `WhatsApp Groups Pakistan ${YEAR} — Free Pakistani WhatsApp Group Links`,
  description: `Find and join the best WhatsApp groups in Pakistan in ${YEAR}. Free Pakistani WhatsApp group links for Education, Business, Cricket, News, Jobs, and Islamic groups. Join instantly — no sign-in.`,
  path: '/whatsapp-groups-pakistan',
  keywords: ['whatsapp groups pakistan', 'pakistan whatsapp group link', 'pakistani whatsapp groups', 'pk whatsapp groups', 'whatsapp group links pakistan', 'join whatsapp group pakistan', 'pakistan whatsapp group links 2026'],
  image: `${APP_URL}/api/og?country=Pakistan&title=${encodeURIComponent('WhatsApp Groups Pakistan')}`,
})

const schema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Where can I find WhatsApp groups in Pakistan?', acceptedAnswer: { '@type': 'Answer', text: `GroupsHub lists free Pakistani WhatsApp group invite links in ${YEAR}. Browse Education, Business, Cricket, and Islamic groups. Click Join instantly — no account needed.` } },
    { '@type': 'Question', name: 'What are popular WhatsApp groups in Pakistan?', acceptedAnswer: { '@type': 'Answer', text: 'Popular Pakistani WhatsApp groups cover Cricket, Education, Jobs & Recruitment, Islamic reminders, News, Stock Market, and regional community groups.' } },
    { '@type': 'Question', name: 'How do I join a Pakistan WhatsApp group?', acceptedAnswer: { '@type': 'Answer', text: 'Find a Pakistan WhatsApp group on GroupsHub, click "Join", and you will be redirected to WhatsApp with the invite link. Tap "Join Group" to complete — free, no sign-in required.' } },
  ],
}

async function getGroups() {
  const supabase = createClient()
  const { data } = await supabase.from('groups').select('*, categories(*), countries(*)').eq('is_approved', true).eq('country_code', 'PK').order('joins_count', { ascending: false }).limit(24)
  return data || []
}

export default async function Page() {
  const groups = await getGroups()
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumb crumbs={[{ name: 'Home', href: '/' }, { name: 'WhatsApp Group Links', href: '/whatsapp-group-links' }, { name: 'Pakistan' }]} />
        <div className="mb-8 flex items-center gap-3">
          <span className="text-5xl">🇵🇰</span>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#25D366] mb-1">Free · Updated Daily</div>
            <h1 className="text-3xl sm:text-4xl font-bold">WhatsApp Groups Pakistan {YEAR}</h1>
          </div>
        </div>
        <p className="text-muted-foreground mb-8 max-w-2xl">Find free WhatsApp group links from Pakistan in {YEAR}. Join active Pakistani communities for Education, Cricket, Business, Islamic groups, Jobs, News, and more. No sign-in required.</p>
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">Pakistani WhatsApp Group Links ({groups.length > 0 ? groups.length : '1,000'}+)</h2>
            <Link href="/groups/country/pk" className="text-sm text-[#25D366] hover:underline font-medium">See all Pakistan groups →</Link>
          </div>
          {groups.length > 0 ? <GroupGrid groups={groups as any} /> : <div className="text-center py-10"><Link href="/groups/country/pk" className="px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold">Browse Pakistan Groups</Link></div>}
        </section>
        <section className="mb-10 max-w-3xl">
          <h2 className="text-xl font-bold mb-3">WhatsApp Groups in Pakistan</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">Pakistan has over 50 million WhatsApp users, making it one of the most active WhatsApp markets in South Asia. Pakistani WhatsApp groups cover Cricket (PSL, national team), Islamic reminders and duas, UPSC/CSS exam preparation, jobs and freelancing, and regional community groups across Karachi, Lahore, and Islamabad.</p>
          <p className="text-sm text-muted-foreground leading-relaxed">GroupsHub lists free Pakistani WhatsApp group invite links, verified and updated daily in {YEAR}. Join any group instantly — just click Join and tap Join Group in WhatsApp.</p>
        </section>
        <div className="glass-card rounded-2xl p-6 text-center border border-[#25D366]/20">
          <h2 className="text-lg font-bold mb-2">Have a Pakistani WhatsApp Group?</h2>
          <p className="text-muted-foreground text-sm mb-4">Submit your Pakistan WhatsApp group link free. Reach thousands of people searching for Pakistani groups.</p>
          <Link href="/submit" className="inline-flex px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:opacity-90 transition-opacity">Submit Your Group — Free</Link>
        </div>
      </div>
    </>
  )
}
