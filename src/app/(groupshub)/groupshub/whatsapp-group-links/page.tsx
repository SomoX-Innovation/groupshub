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
  title: `WhatsApp Group Links ${YEAR} — Free Invite Links to Join`,
  description: `Find free WhatsApp group links in ${YEAR}. Browse 10,000+ active WhatsApp group invite links across 50+ categories and 195 countries. Join instantly — no sign-in required. Updated daily.`,
  path: '/whatsapp-group-links',
  keywords: [
    'whatsapp group link',
    'whatsapp group links',
    'whatsapp group links 2026',
    'whatsapp group invite link',
    'whatsapp groups to join',
    'join whatsapp group link',
    'whatsapp group link free',
    'active whatsapp group links',
    'whatsapp group link list',
    'whatsapp group links today',
    'new whatsapp group links',
    'whatsapp group links free join',
    'whatsapp invite link',
    'whatsapp group directory',
    'find whatsapp group link',
  ],
  image: `${APP_URL}/api/og?title=${encodeURIComponent(`WhatsApp Group Links ${YEAR}`)}&platform=whatsapp`,
})

const pageSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `WhatsApp Group Links ${YEAR} — Free Invite Links`,
    description: `Directory of free WhatsApp group invite links. Browse 10,000+ active WhatsApp groups across 50+ categories and 195 countries.`,
    url: `${APP_URL}/whatsapp-group-links`,
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.quick-answer'] },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
        { '@type': 'ListItem', position: 2, name: 'WhatsApp Group Links', item: `${APP_URL}/whatsapp-group-links` },
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where can I find free WhatsApp group links?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `GroupsHub is the largest free directory of WhatsApp group links in ${YEAR}. Browse 10,000+ active WhatsApp group invite links across 50+ categories including Education, Business, Gaming, Crypto, Sports, and more. No sign-in required — click any group link to join instantly.`,
        },
      },
      {
        '@type': 'Question',
        name: 'How do I join a WhatsApp group using a link?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To join a WhatsApp group using a link: 1) Find a group on GroupsHub. 2) Click the "Join" button. 3) You will be redirected to WhatsApp with the invite link pre-filled. 4) Tap "Join Group" inside WhatsApp. You are in — it\'s completely free.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are WhatsApp group links safe to join?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every WhatsApp group link on GroupsHub is reviewed by our team before being listed. Groups with spam, adult content, or broken links are removed. You can also report any group using the Report button on its page.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I get a WhatsApp group link for my own group?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To get a WhatsApp group invite link: open WhatsApp → tap your group → Group Info → Invite to Group via Link → Copy Link. You can then share this link anywhere or submit it to GroupsHub for free listing.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many WhatsApp group links are on GroupsHub?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `GroupsHub lists over 10,000 active WhatsApp group invite links as of ${YEAR}, across 50+ categories and 195 countries. New groups are added and reviewed daily.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Can a WhatsApp group link expire?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. WhatsApp group admins can reset or revoke an invite link at any time. If a link on GroupsHub has expired, click the "Report" button on the group page so we can remove or update it.',
        },
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Join a WhatsApp Group Using a Link',
    totalTime: 'PT1M',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Find a WhatsApp group link', text: `Browse GroupsHub's directory of ${10000}+ free WhatsApp group links. Filter by category or country to find the right community.` },
      { '@type': 'HowToStep', position: 2, name: 'Click Join', text: 'Click the green "Join" button on any group listing. No GroupsHub account needed.' },
      { '@type': 'HowToStep', position: 3, name: 'Open in WhatsApp', text: 'You will be redirected to WhatsApp with the invite link. Tap "Join Group" to complete.' },
    ],
  },
]

const categories = [
  { name: 'Education', slug: 'education', emoji: '📚', desc: 'Study groups, tutoring, courses' },
  { name: 'Business', slug: 'business', emoji: '💼', desc: 'Networking, jobs, entrepreneurship' },
  { name: 'Gaming', slug: 'gaming', emoji: '🎮', desc: 'Game clans, esports, reviews' },
  { name: 'Crypto', slug: 'crypto', emoji: '₿', desc: 'Bitcoin, DeFi, altcoins, NFTs' },
  { name: 'Sports', slug: 'sports', emoji: '⚽', desc: 'Football, cricket, basketball' },
  { name: 'Technology', slug: 'technology', emoji: '💻', desc: 'Programming, AI, cybersecurity' },
  { name: 'Music', slug: 'music', emoji: '🎵', desc: 'Artists, producers, fans' },
  { name: 'Health', slug: 'health', emoji: '🏥', desc: 'Fitness, nutrition, wellness' },
]

async function getLatestWhatsAppGroups() {
  const supabase = createClient()
  const { data } = await supabase
    .from('groups')
    .select('*, categories(*), countries(*)')
    .eq('is_approved', true)
    .eq('platform', 'whatsapp')
    .order('views', { ascending: false })
    .order('joins_count', { ascending: false })
    .limit(24)
  return data || []
}

export default async function WhatsAppGroupLinksPage() {
  const groups = await getLatestWhatsAppGroups()

  return (
    <>
      {pageSchemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumb crumbs={[
          { name: 'Home', href: '/' },
          { name: 'WhatsApp Group Links' },
        ]} />

        {/* H1 — exact keyword match */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-5xl">💬</span>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-[#25D366] mb-1">Free · No Sign-in · Updated Daily</div>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                WhatsApp Group Links {YEAR}
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
            Find and join free WhatsApp group invite links in {YEAR}. Browse 10,000+ active WhatsApp group links across 50+ categories and 195 countries. Click any link to join instantly — no GroupsHub account required.
          </p>
        </div>

        {/* Quick answer box — what Google surfaces in featured snippets */}
        <div className="quick-answer mb-8 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/5 p-5">
          <div className="text-xs font-bold uppercase tracking-widest text-[#25D366] mb-2">How to Join a WhatsApp Group Link</div>
          <ol className="space-y-1.5">
            {[
              'Find a WhatsApp group link below or use the search bar',
              'Click the green "Join" button on any group',
              'You are redirected to WhatsApp with the invite link ready',
              'Tap "Join Group" inside WhatsApp — done',
            ].map((step, i) => (
              <li key={i} className="text-sm flex gap-2.5 items-start">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#25D366] text-white text-[10px] font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Active WhatsApp Group Links */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">Active WhatsApp Group Links ({groups.length > 0 ? `${groups.length}+` : '10,000+'})</h2>
            <Link href="/browse?platform=whatsapp" className="text-sm text-[#25D366] hover:underline font-medium">
              See all WhatsApp groups →
            </Link>
          </div>
          {groups.length > 0
            ? <GroupGrid groups={groups as any} />
            : (
              <div className="text-center py-12 text-muted-foreground">
                <p className="mb-4">Loading WhatsApp group links...</p>
                <Link href="/browse?platform=whatsapp" className="px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold">Browse All WhatsApp Groups</Link>
              </div>
            )
          }
        </section>

        {/* WhatsApp Group Links by Category */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-2">WhatsApp Group Links by Category</h2>
          <p className="text-muted-foreground text-sm mb-5">
            Find WhatsApp group links for any interest. Browse the most popular categories below.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/whatsapp-groups/${cat.slug}`}
                className="glass-card rounded-2xl p-4 hover:-translate-y-0.5 transition-transform group"
              >
                <div className="text-3xl mb-2">{cat.emoji}</div>
                <div className="font-semibold text-sm mb-1 group-hover:text-[#25D366] transition-colors">
                  {cat.name} WhatsApp Groups
                </div>
                <div className="text-xs text-muted-foreground">{cat.desc}</div>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/whatsapp-groups/education" className="text-sm text-[#25D366] hover:underline font-medium">
              Browse all 50+ WhatsApp group categories →
            </Link>
          </div>
        </section>

        {/* What are WhatsApp group links — body content for keyword depth */}
        <section className="mb-12 max-w-3xl">
          <h2 className="text-xl font-bold mb-4">What Are WhatsApp Group Links?</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              A <strong className="text-foreground">WhatsApp group link</strong> (also called a WhatsApp group invite link) is a unique URL that lets anyone join a WhatsApp group without needing to be added by an admin. When you click a WhatsApp group link, it opens WhatsApp directly and prompts you to join the group.
            </p>
            <p>
              WhatsApp group links look like: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">https://chat.whatsapp.com/XXXXXXXXXX</code>. Each link is unique to a specific group. Group admins can generate, share, reset, or revoke these links at any time from Group Info → Invite to Group via Link.
            </p>
            <p>
              GroupsHub is the largest free directory of WhatsApp group links in {YEAR}, with 10,000+ active invite links reviewed and updated daily. Every WhatsApp group link is verified before listing — broken or expired links are removed. You can join any group completely free, with no GroupsHub account required.
            </p>
          </div>
        </section>

        {/* How to get your own WhatsApp group link */}
        <section className="mb-12 glass-card rounded-2xl p-6 max-w-3xl">
          <h2 className="text-xl font-bold mb-4">How to Get a WhatsApp Group Invite Link</h2>
          <p className="text-sm text-muted-foreground mb-5">
            If you are a group admin and want to share your own WhatsApp group link, here is how to find it:
          </p>
          <div className="space-y-3">
            {[
              { step: '1', text: 'Open WhatsApp and tap on your group name at the top' },
              { step: '2', text: 'Tap Group Info → Invite to Group via Link' },
              { step: '3', text: 'Tap Copy Link to copy your unique WhatsApp group invite link' },
              { step: '4', text: 'Share the link anywhere — or submit it to GroupsHub for free to reach thousands of people' },
            ].map((item) => (
              <div key={item.step} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#25D366]/20 text-[#25D366] text-xs font-bold flex items-center justify-center mt-0.5">
                  {item.step}
                </span>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Submit Your WhatsApp Group Link — Free
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12 max-w-3xl">
          <h2 className="text-xl font-bold mb-6">Frequently Asked Questions About WhatsApp Group Links</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Where can I find free WhatsApp group links?',
                a: `GroupsHub is the largest free directory of WhatsApp group links in ${YEAR}. Browse 10,000+ active WhatsApp group invite links across 50+ categories including Education, Business, Gaming, Crypto, Sports, and more. No sign-in required.`,
              },
              {
                q: 'How do I join a WhatsApp group using a link?',
                a: 'Click the "Join" button on any group on GroupsHub. You will be redirected to WhatsApp with the invite link. Tap "Join Group" inside WhatsApp. It\'s free and takes under 30 seconds.',
              },
              {
                q: 'Are WhatsApp group links safe?',
                a: 'Every WhatsApp group link on GroupsHub is reviewed before listing. Groups with spam, adult content, or harmful material are removed. You can also report any group using the Report button on its page.',
              },
              {
                q: 'Can a WhatsApp group link expire?',
                a: 'Yes. WhatsApp group admins can reset or revoke invite links at any time. If a link has expired, the "Join" button will show an error in WhatsApp. Click "Report" on the group page so we can remove it.',
              },
              {
                q: 'How do I add my own WhatsApp group link to GroupsHub?',
                a: 'Click "Add Group" in the top navigation or visit the Submit page. Paste your WhatsApp group invite link, fill in the group name, category, and country, and submit. It\'s free, takes 2 minutes, and no account is needed. Groups go live within 24 hours.',
              },
              {
                q: 'How many people can be in a WhatsApp group?',
                a: 'WhatsApp groups support up to 1,024 members. If a group has reached its limit, the invite link will show a "Group Full" message when you try to join.',
              },
            ].map((faq, i) => (
              <div key={i} className="glass-card rounded-2xl p-5">
                <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-links to Telegram and Discord */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Also Looking For…</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/browse?platform=telegram" className="glass-card rounded-2xl p-5 hover:-translate-y-0.5 transition-transform group">
              <div className="text-2xl mb-2">✈️</div>
              <div className="font-bold mb-1 group-hover:text-[#2AABEE] transition-colors">Telegram Group Links</div>
              <div className="text-xs text-muted-foreground">Browse free Telegram group links and channel invite links across 50+ categories.</div>
            </Link>
            <Link href="/browse?platform=discord" className="glass-card rounded-2xl p-5 hover:-translate-y-0.5 transition-transform group">
              <div className="text-2xl mb-2">🎮</div>
              <div className="font-bold mb-1 group-hover:text-[#5865F2] transition-colors">Discord Server Links</div>
              <div className="text-xs text-muted-foreground">Browse free Discord server invite links across gaming, tech, anime, and more.</div>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <div className="glass-card rounded-2xl p-8 text-center border border-[#25D366]/20">
          <div className="text-4xl mb-3">💬</div>
          <h2 className="text-xl font-bold mb-2">Have a WhatsApp Group Link to Share?</h2>
          <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">
            Submit your WhatsApp group invite link for free. Reach thousands of people actively searching for groups to join.
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Submit Your WhatsApp Group Link — Free
          </Link>
        </div>
      </div>
    </>
  )
}
