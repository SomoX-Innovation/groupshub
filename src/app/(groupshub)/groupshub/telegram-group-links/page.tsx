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
  title: `Telegram Group Links ${YEAR} — Free Invite Links to Join`,
  description: `Find free Telegram group links and channel invite links in ${YEAR}. Browse 10,000+ active Telegram groups across 50+ categories and 195 countries. Join instantly — no sign-in required.`,
  path: '/telegram-group-links',
  keywords: [
    'telegram group link', 'telegram group links', 'telegram group links 2026',
    'telegram group invite link', 'telegram groups to join', 'join telegram group link',
    'telegram channel links', 'active telegram group links', 'telegram group link list',
    'telegram invite link', 'telegram group directory', 'find telegram groups',
    'telegram group links free', 'best telegram groups 2026', 'new telegram group links',
  ],
  image: `${APP_URL}/api/og?title=${encodeURIComponent(`Telegram Group Links ${YEAR}`)}&platform=telegram`,
})

const pageSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Telegram Group Links ${YEAR} — Free Invite Links`,
    description: `Directory of free Telegram group invite links. Browse 10,000+ active Telegram groups across 50+ categories and 195 countries.`,
    url: `${APP_URL}/telegram-group-links`,
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.quick-answer'] },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
        { '@type': 'ListItem', position: 2, name: 'Telegram Group Links', item: `${APP_URL}/telegram-group-links` },
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where can I find free Telegram group links?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `GroupsHub lists 10,000+ free Telegram group invite links in ${YEAR} across 50+ categories including Crypto, Education, Gaming, Business, and more. No sign-in required — click any Telegram group link to join instantly.`,
        },
      },
      {
        '@type': 'Question',
        name: 'How do I join a Telegram group using a link?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Click "Join" on any Telegram group on GroupsHub. You will be redirected to Telegram with the invite link. Tap "Join Group" or "Join Channel" inside the Telegram app. It is completely free.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between a Telegram group and a Telegram channel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Telegram groups support up to 200,000 members and allow all members to send messages. Telegram channels are broadcast-only (only admins post) and support unlimited subscribers. Both use invite links to join.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many people can be in a Telegram group?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Telegram groups support up to 200,000 members — far more than WhatsApp\'s 1,024 limit. Telegram channels have no member limit and can have millions of subscribers.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I get a Telegram group invite link?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To get a Telegram group invite link: open Telegram → tap your group name → Invite Links → Create Invite Link. Share the link anywhere or submit it to GroupsHub for free listing to reach thousands of new members.',
        },
      },
    ],
  },
]

const categories = [
  { name: 'Crypto', slug: 'crypto', emoji: '₿', desc: 'Bitcoin, DeFi, altcoins, NFTs' },
  { name: 'Education', slug: 'education', emoji: '📚', desc: 'Study groups, courses, tutoring' },
  { name: 'Gaming', slug: 'gaming', emoji: '🎮', desc: 'Game channels, esports, reviews' },
  { name: 'Business', slug: 'business', emoji: '💼', desc: 'Jobs, networking, entrepreneurship' },
  { name: 'Technology', slug: 'technology', emoji: '💻', desc: 'Programming, AI, cybersecurity' },
  { name: 'Sports', slug: 'sports', emoji: '⚽', desc: 'Football, cricket, basketball' },
  { name: 'Music', slug: 'music', emoji: '🎵', desc: 'Artists, producers, fans' },
  { name: 'Health', slug: 'health', emoji: '🏥', desc: 'Fitness, nutrition, wellness' },
]

async function getTelegramGroups() {
  const supabase = createClient()
  const { data } = await supabase
    .from('groups')
    .select('*, categories(*), countries(*)')
    .eq('is_approved', true)
    .eq('platform', 'telegram')
    .order('views', { ascending: false })
    .limit(24)
  return data || []
}

export default async function TelegramGroupLinksPage() {
  const groups = await getTelegramGroups()

  return (
    <>
      {pageSchemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumb crumbs={[{ name: 'Home', href: '/' }, { name: 'Telegram Group Links' }]} />

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-5xl">✈️</span>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-[#2AABEE] mb-1">Free · No Sign-in · Updated Daily</div>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight">Telegram Group Links {YEAR}</h1>
            </div>
          </div>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
            Find and join free Telegram group invite links in {YEAR}. Browse 10,000+ active Telegram groups and channels across 50+ categories and 195 countries. Click any link to join instantly — no sign-in required.
          </p>
        </div>

        {/* Quick answer */}
        <div className="quick-answer mb-8 rounded-2xl border border-[#2AABEE]/30 bg-[#2AABEE]/5 p-5">
          <div className="text-xs font-bold uppercase tracking-widest text-[#2AABEE] mb-2">How to Join a Telegram Group</div>
          <ol className="space-y-1.5">
            {['Find a Telegram group below or search by category', 'Click the "Join" button on any group card', 'You are redirected to Telegram with the invite link ready', 'Tap "Join Group" inside Telegram — done, it\'s free'].map((step, i) => (
              <li key={i} className="text-sm flex gap-2.5 items-start">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#2AABEE] text-white text-[10px] font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">Active Telegram Group Links ({groups.length > 0 ? `${groups.length}+` : '10,000+'})</h2>
            <Link href="/browse?platform=telegram" className="text-sm text-[#2AABEE] hover:underline font-medium">See all →</Link>
          </div>
          {groups.length > 0
            ? <GroupGrid groups={groups as any} />
            : <div className="text-center py-12"><Link href="/browse?platform=telegram" className="px-5 py-2.5 rounded-full bg-[#2AABEE] text-white text-sm font-semibold">Browse All Telegram Groups</Link></div>
          }
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-2">Telegram Group Links by Category</h2>
          <p className="text-muted-foreground text-sm mb-5">Find Telegram groups for any topic. Browse the most popular categories below.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/telegram-groups/${cat.slug}`} className="glass-card rounded-2xl p-4 hover:-translate-y-0.5 transition-transform group">
                <div className="text-3xl mb-2">{cat.emoji}</div>
                <div className="font-semibold text-sm mb-1 group-hover:text-[#2AABEE] transition-colors">{cat.name} Telegram Groups</div>
                <div className="text-xs text-muted-foreground">{cat.desc}</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12 max-w-3xl">
          <h2 className="text-xl font-bold mb-4">What Are Telegram Group Links?</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>A <strong className="text-foreground">Telegram group link</strong> (or Telegram invite link) is a unique URL that lets anyone join a Telegram group or channel without needing an admin to add them manually. Telegram group links look like: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">https://t.me/joinchat/XXXXXXXXXX</code> or <code className="bg-muted px-1.5 py-0.5 rounded text-xs">https://t.me/groupname</code>.</p>
            <p>Unlike WhatsApp (which limits groups to 1,024 members), <strong className="text-foreground">Telegram groups support up to 200,000 members</strong> and Telegram channels have no member limit. This makes Telegram the preferred platform for large communities, news channels, crypto signals, and educational courses.</p>
            <p>GroupsHub lists 10,000+ free Telegram group invite links in {YEAR}, reviewed and updated daily. Every link is verified before listing — expired or inactive links are removed. Join any group completely free with no GroupsHub account required.</p>
          </div>
        </section>

        <section className="mb-12 glass-card rounded-2xl p-6 max-w-3xl">
          <h2 className="text-xl font-bold mb-4">How to Get Your Own Telegram Group Link</h2>
          <div className="space-y-3">
            {['Open Telegram and tap your group or channel name', 'Tap Group Info (or Channel Info) → Invite Links', 'Tap Create Invite Link — you can set expiry dates and member limits', 'Copy and share your Telegram invite link anywhere', 'Submit it to GroupsHub for free to reach thousands of new members'].map((step, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2AABEE]/20 text-[#2AABEE] text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                <p className="text-sm text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <Link href="/submit" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2AABEE] text-white text-sm font-semibold hover:opacity-90 transition-opacity">
              Submit Your Telegram Group Link — Free
            </Link>
          </div>
        </section>

        <section className="mb-12 max-w-3xl">
          <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Where can I find free Telegram group links?', a: `GroupsHub lists 10,000+ free Telegram group links in ${YEAR}. Browse by category or country above and click Join on any group.` },
              { q: 'How do I join a Telegram group using a link?', a: 'Click "Join" on any group on GroupsHub. You will be redirected to Telegram. Tap "Join Group" or "Join Channel" to complete — it\'s free.' },
              { q: 'What is the difference between a Telegram group and channel?', a: 'Groups allow all members to send messages (up to 200,000 members). Channels are broadcast-only — only admins post — with unlimited subscribers.' },
              { q: 'Can Telegram group links expire?', a: 'Yes. Admins can set expiry dates on invite links. If a link has expired, click Report on the group page so we can remove or update it.' },
              { q: 'How do I add my Telegram group to GroupsHub?', a: 'Click "Add Group" in the navigation. Paste your Telegram invite link, fill in the details, and submit. Free, no account required, goes live within 24 hours.' },
            ].map((faq, i) => (
              <div key={i} className="glass-card rounded-2xl p-5">
                <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="glass-card rounded-2xl p-8 text-center border border-[#2AABEE]/20">
          <div className="text-4xl mb-3">✈️</div>
          <h2 className="text-xl font-bold mb-2">Have a Telegram Group Link to Share?</h2>
          <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">Submit your Telegram group or channel invite link for free. Reach thousands of people looking to join communities.</p>
          <Link href="/submit" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2AABEE] text-white text-sm font-semibold hover:opacity-90 transition-opacity">
            Submit Your Telegram Group Link — Free
          </Link>
        </div>
      </div>
    </>
  )
}
