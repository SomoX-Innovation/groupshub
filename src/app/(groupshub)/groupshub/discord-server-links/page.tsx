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
  title: `Discord Server Links ${YEAR} — Free Invite Links to Join`,
  description: `Find free Discord server invite links in ${YEAR}. Browse 10,000+ active Discord servers across 50+ categories including Gaming, Anime, Tech, Crypto, and more. Join instantly — no sign-in required.`,
  path: '/discord-server-links',
  keywords: [
    'discord server links', 'discord server link', 'discord invite links', 'discord server links 2026',
    'discord servers to join', 'free discord server links', 'discord invite link', 'public discord servers',
    'discord server list', 'discord server directory', 'find discord servers', 'best discord servers 2026',
    'discord gaming servers', 'discord community links', 'join discord server link',
  ],
  image: `${APP_URL}/api/og?title=${encodeURIComponent(`Discord Server Links ${YEAR}`)}&platform=discord`,
})

const pageSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Discord Server Links ${YEAR} — Free Invite Links`,
    description: `Directory of free Discord server invite links. Browse active Discord communities across gaming, anime, tech, crypto, and 50+ more categories.`,
    url: `${APP_URL}/discord-server-links`,
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.quick-answer'] },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
        { '@type': 'ListItem', position: 2, name: 'Discord Server Links', item: `${APP_URL}/discord-server-links` },
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where can I find free Discord server links?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `GroupsHub lists free Discord server invite links in ${YEAR} across 50+ categories including Gaming, Anime, Technology, Crypto, Music, and more. Click any server link to join instantly — no GroupsHub account needed.`,
        },
      },
      {
        '@type': 'Question',
        name: 'How do I join a Discord server using an invite link?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Click "Join" on any Discord server on GroupsHub. You will be redirected to Discord with the invite link. Click "Accept Invite" inside the Discord app or website. It is completely free.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do Discord invite links expire?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Discord invite links can be set to expire (by time or number of uses) or to never expire. If a link on GroupsHub has expired, click the Report button on the server page and we will remove it.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I create a Discord server invite link?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Open Discord → click your server name → Invite People → click "Edit invite link" to set options → Copy Link. Submit your Discord server invite link to GroupsHub for free to reach thousands of new members.',
        },
      },
    ],
  },
]

const categories = [
  { name: 'Gaming', slug: 'gaming', emoji: '🎮', desc: 'Game servers, clans, esports' },
  { name: 'Technology', slug: 'technology', emoji: '💻', desc: 'Programming, AI, dev communities' },
  { name: 'Crypto', slug: 'crypto', emoji: '₿', desc: 'Bitcoin, NFTs, DeFi projects' },
  { name: 'Education', slug: 'education', emoji: '📚', desc: 'Study servers, tutoring, courses' },
  { name: 'Music', slug: 'music', emoji: '🎵', desc: 'Artists, producers, music fans' },
  { name: 'Business', slug: 'business', emoji: '💼', desc: 'Networking, freelance, startups' },
  { name: 'Sports', slug: 'sports', emoji: '⚽', desc: 'Football, basketball, esports' },
  { name: 'Health', slug: 'health', emoji: '🏥', desc: 'Fitness, wellness, mental health' },
]

async function getDiscordServers() {
  const supabase = createClient()
  const { data } = await supabase
    .from('groups')
    .select('*, categories(*), countries(*)')
    .eq('is_approved', true)
    .eq('platform', 'discord')
    .order('views', { ascending: false })
    .limit(24)
  return data || []
}

export default async function DiscordServerLinksPage() {
  const servers = await getDiscordServers()

  return (
    <>
      {pageSchemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumb crumbs={[{ name: 'Home', href: '/' }, { name: 'Discord Server Links' }]} />

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-5xl">🎮</span>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-[#5865F2] mb-1">Free · No Sign-in · Updated Daily</div>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight">Discord Server Links {YEAR}</h1>
            </div>
          </div>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
            Find and join free Discord server invite links in {YEAR}. Browse active Discord communities for Gaming, Tech, Crypto, Anime, and 50+ more categories. Click any link to join instantly.
          </p>
        </div>

        <div className="quick-answer mb-8 rounded-2xl border border-[#5865F2]/30 bg-[#5865F2]/5 p-5">
          <div className="text-xs font-bold uppercase tracking-widest text-[#5865F2] mb-2">How to Join a Discord Server</div>
          <ol className="space-y-1.5">
            {['Find a Discord server below or search by category', 'Click the "Join" button on any server listing', 'You are redirected to Discord with the invite link ready', 'Click "Accept Invite" in Discord — done, it\'s free'].map((step, i) => (
              <li key={i} className="text-sm flex gap-2.5 items-start">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#5865F2] text-white text-[10px] font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">Active Discord Server Links ({servers.length > 0 ? `${servers.length}+` : '10,000+'})</h2>
            <Link href="/browse?platform=discord" className="text-sm text-[#5865F2] hover:underline font-medium">See all →</Link>
          </div>
          {servers.length > 0
            ? <GroupGrid groups={servers as any} />
            : <div className="text-center py-12"><Link href="/browse?platform=discord" className="px-5 py-2.5 rounded-full bg-[#5865F2] text-white text-sm font-semibold">Browse All Discord Servers</Link></div>
          }
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-2">Discord Server Links by Category</h2>
          <p className="text-muted-foreground text-sm mb-5">Find Discord servers for any interest — Gaming, Tech, Crypto, and 50+ more.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/discord-groups/${cat.slug}`} className="glass-card rounded-2xl p-4 hover:-translate-y-0.5 transition-transform group">
                <div className="text-3xl mb-2">{cat.emoji}</div>
                <div className="font-semibold text-sm mb-1 group-hover:text-[#5865F2] transition-colors">{cat.name} Discord Servers</div>
                <div className="text-xs text-muted-foreground">{cat.desc}</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12 max-w-3xl">
          <h2 className="text-xl font-bold mb-4">What Are Discord Server Links?</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>A <strong className="text-foreground">Discord server link</strong> (or Discord invite link) is a unique URL that lets anyone join a Discord server instantly. Discord invite links look like: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">https://discord.gg/XXXXXXXX</code>. Server admins can create, share, and revoke these links at any time.</p>
            <p>Unlike WhatsApp or Telegram, <strong className="text-foreground">Discord servers have separate channels</strong> for text, voice, video, and forums — making them ideal for organized communities like gaming clans, developer groups, NFT projects, and study servers. Members can be assigned roles and permissions.</p>
            <p>GroupsHub lists free Discord server invite links in {YEAR} across 50+ categories. Every link is verified before listing — expired invites are removed. Join any server for free with no GroupsHub account required.</p>
          </div>
        </section>

        <section className="mb-12 max-w-3xl">
          <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Where can I find free Discord server links?', a: `GroupsHub lists free Discord server invite links in ${YEAR} across 50+ categories. Browse the servers above and click Join on any listing.` },
              { q: 'How do I join a Discord server using an invite link?', a: 'Click "Join" on GroupsHub → you are redirected to Discord → click "Accept Invite". Free, takes under 10 seconds.' },
              { q: 'Do Discord invite links expire?', a: 'Links can expire by time or use count depending on what the admin set. If a link is expired, click Report on the server page.' },
              { q: 'How do I add my Discord server to GroupsHub?', a: 'Click "Add Group" in the navigation, paste your Discord invite link, and submit. Free, no account required, live within 24 hours.' },
            ].map((faq, i) => (
              <div key={i} className="glass-card rounded-2xl p-5">
                <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="glass-card rounded-2xl p-8 text-center border border-[#5865F2]/20">
          <div className="text-4xl mb-3">🎮</div>
          <h2 className="text-xl font-bold mb-2">Have a Discord Server Link to Share?</h2>
          <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">Submit your Discord server invite link for free. Reach thousands of people looking for communities to join.</p>
          <Link href="/submit" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5865F2] text-white text-sm font-semibold hover:opacity-90 transition-opacity">
            Submit Your Discord Server — Free
          </Link>
        </div>
      </div>
    </>
  )
}
