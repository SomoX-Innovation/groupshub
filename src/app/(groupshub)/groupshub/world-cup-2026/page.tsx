import { createClient } from '@/lib/supabase/server'
import { GroupGrid } from '@/components/groups/GroupGrid'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import Link from 'next/link'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import { breadcrumbSchema } from '@/lib/seo/schema-markup'

export const revalidate = 180

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://groupshub.com'

export const metadata: Metadata = buildMetadata({
  title: 'FIFA World Cup 2026 WhatsApp & Telegram Groups — USA, Canada, Mexico',
  description:
    'Join the best FIFA World Cup 2026 WhatsApp groups and Telegram channels. Live USA vs Paraguay discussions, match scores, predictions, and USMNT fan communities. Free invite links — no sign-in required.',
  path: '/world-cup-2026',
  keywords: [
    'world cup 2026 whatsapp group',
    'fifa world cup 2026 groups',
    'world cup groups whatsapp',
    'usa vs paraguay whatsapp group',
    'usmnt fan group',
    'world cup 2026 telegram group',
    'world cup fan group link',
    'football groups whatsapp 2026',
    'world cup predictions group',
    'usa world cup group chat',
    'fifa 2026 telegram channel',
    'usa vs paraguay telegram',
    'world cup usa schedule',
    'group d world cup 2026',
    'usmnt schedule',
    'where to watch world cup 2026',
  ],
  image: `${APP_URL}/api/og?title=${encodeURIComponent('FIFA World Cup 2026 Fan Groups')}&category=Sports`,
})

const wcFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Where can I find FIFA World Cup 2026 WhatsApp groups?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GroupsHub lists free WhatsApp groups and Telegram channels dedicated to FIFA World Cup 2026 including USA vs Paraguay fan groups and USMNT communities. Browse this page and click "Join" on any group for the free invite link — no account required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where can I find USA vs Paraguay WhatsApp or Telegram groups?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GroupsHub has USMNT and World Cup fan groups where members are discussing USA vs Paraguay live. Browse the groups on this page and click Join to get into the conversation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is the USA vs Paraguay World Cup 2026 game being played?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The USA vs Paraguay FIFA World Cup 2026 Group D match is being played at SoFi Stadium in Inglewood, Los Angeles, California.',
      },
    },
    {
      '@type': 'Question',
      name: 'What group is USA in for World Cup 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The United States men\'s national soccer team (USMNT) is in Group D of FIFA World Cup 2026. Join a USA World Cup WhatsApp group on GroupsHub to follow every Group D match live with other fans.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is FIFA World Cup 2026 being held?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FIFA World Cup 2026 is hosted across 16 cities in three countries: the United States, Canada, and Mexico. It is the largest World Cup ever with 48 teams and 104 matches.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where can I watch World Cup 2026 for free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In the USA, FIFA World Cup 2026 matches are available for free on Tubi. Fox and Telemundo also broadcast matches. Join a World Cup Telegram group on GroupsHub for links shared by fans.',
      },
    },
  ],
}

const wcBreadcrumb = breadcrumbSchema([
  { name: 'Home', url: APP_URL },
  { name: 'Sports Groups', url: `${APP_URL}/whatsapp-groups/sports` },
  { name: 'FIFA World Cup 2026 Groups', url: `${APP_URL}/world-cup-2026` },
])

const SPORTS_CATEGORY_SLUGS = ['sports', 'football', 'soccer', 'sports-betting']

async function getWorldCupGroups() {
  const supabase = createClient()

  const { data: searchResults } = await supabase
    .from('groups')
    .select('*, categories(*), countries(*)')
    .eq('is_approved', true)
    .or('name.ilike.%world cup%,name.ilike.%football%,name.ilike.%soccer%,name.ilike.%fifa%,name.ilike.%usmnt%,description.ilike.%world cup%,description.ilike.%fifa%')
    .order('joins_count', { ascending: false })
    .limit(24)

  if (searchResults && searchResults.length >= 6) return searchResults

  const { data: catData } = await supabase
    .from('categories')
    .select('id')
    .in('slug', SPORTS_CATEGORY_SLUGS)

  if (!catData || catData.length === 0) return searchResults || []

  const catIds = catData.map((c) => c.id)
  const { data: sportsGroups } = await supabase
    .from('groups')
    .select('*, categories(*), countries(*)')
    .eq('is_approved', true)
    .in('category_id', catIds)
    .order('joins_count', { ascending: false })
    .limit(24)

  return sportsGroups || []
}

export default async function WorldCup2026Page() {
  const groups = await getWorldCupGroups()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(wcFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(wcBreadcrumb) }} />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumb crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Sports Groups', href: '/whatsapp-groups/sports' },
          { name: 'FIFA World Cup 2026' },
        ]} />

        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-5xl">⚽</span>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold mb-1.5">
                🔴 Live Now
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                FIFA World Cup 2026 Fan Groups
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
            Join the most active FIFA World Cup 2026 fan groups on WhatsApp and Telegram. Live match discussions, USA vs Paraguay reactions, USMNT updates, and predictions — all free, no sign-in required.
          </p>
        </div>

        {/* Live match banner: USA vs Paraguay */}
        <div className="mb-10 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-red-500">Live Match</span>
          </div>
          <div className="flex items-center justify-center gap-4 sm:gap-8 mb-4">
            <div className="text-center">
              <div className="text-4xl mb-1">🇺🇸</div>
              <div className="font-bold text-sm">USA</div>
              <div className="text-xs text-muted-foreground">USMNT</div>
            </div>
            <div className="text-center px-4">
              <div className="text-2xl font-black text-muted-foreground">VS</div>
              <div className="text-xs text-muted-foreground mt-1">Group D · SoFi Stadium, LA</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-1">🇵🇾</div>
              <div className="font-bold text-sm">Paraguay</div>
              <div className="text-xs text-muted-foreground">La Albirroja</div>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mb-4">
            Join a fan group below to discuss USA vs Paraguay live with thousands of other supporters.
            Watch free on <strong>Tubi</strong> or <strong>Fox Sports</strong>.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link href="/whatsapp-groups/sports" className="px-4 py-2 rounded-full bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors">
              Join WhatsApp Fan Groups
            </Link>
            <Link href="/telegram-groups/sports" className="px-4 py-2 rounded-full bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 transition-colors">
              Join Telegram Channels
            </Link>
          </div>
        </div>

        {/* Groups */}
        {groups.length > 0 ? (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-5">
              Active World Cup 2026 Groups ({groups.length})
            </h2>
            <GroupGrid groups={groups as any} />
          </section>
        ) : (
          <div className="glass-card rounded-2xl p-10 text-center mb-12">
            <div className="text-5xl mb-4">⚽</div>
            <h2 className="text-xl font-bold mb-2">World Cup Groups Coming Soon</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              No dedicated World Cup groups listed yet — browse all sports groups or submit your own fan community now.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/whatsapp-groups/sports" className="px-5 py-2.5 rounded-full bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors">
                Browse Sports Groups
              </Link>
              <Link href="/submit" className="px-5 py-2.5 rounded-full border border-border text-sm font-semibold hover:bg-muted transition-colors">
                Submit Your Fan Group
              </Link>
            </div>
          </div>
        )}

        {/* USMNT key players section — targets "balogun", "mckennie", "pulisic", etc. */}
        <section className="mb-12 glass-card rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-2">USMNT at World Cup 2026</h2>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            The United States men&apos;s national soccer team (USMNT) is in <strong>Group D</strong> of FIFA World Cup 2026.
            Key players include <strong>Folarin Balogun</strong>, <strong>Weston McKennie</strong>, <strong>Christian Pulisic</strong>,
            <strong> Chris Richards</strong>, and <strong>Timothy Tillman</strong>. Matt Freese starts in goal.
            Join a USA fan WhatsApp group to follow every Group D match together.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {[
              { name: 'Folarin Balogun', role: 'Forward', flag: '🇺🇸' },
              { name: 'Weston McKennie', role: 'Midfielder', flag: '🇺🇸' },
              { name: 'Christian Pulisic', role: 'Midfielder', flag: '🇺🇸' },
              { name: 'Timothy Tillman', role: 'Midfielder', flag: '🇺🇸' },
            ].map((p) => (
              <div key={p.name} className="rounded-xl bg-muted/40 p-3 text-center">
                <div className="text-2xl mb-1">{p.flag}</div>
                <div className="text-xs font-semibold leading-tight">{p.name}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{p.role}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            {[
              { label: 'Group', value: 'D' },
              { label: 'Stadium', value: 'SoFi Stadium' },
              { label: 'Location', value: 'Los Angeles, CA' },
              { label: 'Opponent', value: 'Paraguay' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-muted/40 p-3">
                <div className="font-bold text-base">{s.value}</div>
                <div className="text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Paraguay section — targets "paraguay soccer", "miguel almiron", "gustavo gomez" */}
        <section className="mb-12 glass-card rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-2">Paraguay at World Cup 2026</h2>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            Paraguay (La Albirroja) qualified for FIFA World Cup 2026 after a strong CONMEBOL campaign.
            Key players include <strong>Miguel Almirón</strong>, <strong>Gustavo Gómez</strong>,
            <strong> Damián Bobadilla</strong>, and <strong>Junior Alonso</strong>.
            Find Paraguay fan WhatsApp and Telegram groups on GroupsHub.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Paraguay groups', 'South America groups', 'Football groups'].map((label, i) => {
              const hrefs = ['/groups/country/py', '/browse?continent=south-america', '/whatsapp-groups/sports']
              return (
                <Link key={label} href={hrefs[i]} className="px-3 py-1.5 rounded-full border border-border/60 text-xs font-medium hover:bg-muted transition-colors">
                  {label} →
                </Link>
              )
            })}
          </div>
        </section>

        {/* Platform cards */}
        <section className="mb-12 grid md:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-3">💬 WhatsApp World Cup Groups</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              WhatsApp World Cup groups are perfect for real-time match reactions with friends and fans. Share goal alerts, memes, player ratings, and post-match breakdowns with up to 1,024 members per group.
            </p>
            <ul className="space-y-1.5 mb-4">
              {['Live goal & score alerts', 'Match predictions & polls', 'USA vs Paraguay reactions', 'Country-specific fan groups', 'Fantasy football leagues'].map((item) => (
                <li key={item} className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/whatsapp-groups/sports" className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
              Browse WhatsApp Sports Groups →
            </Link>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-3">✈️ Telegram World Cup Channels</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Telegram World Cup channels support unlimited members and broadcast match streams, clips, and stats. Join channels for live USMNT commentary and fan debates during every Group D match.
            </p>
            <ul className="space-y-1.5 mb-4">
              {['Unlimited member channels', 'Match stream links', 'Stats & xG analysis', 'Bot-powered live scores', 'USMNT news & updates'].map((item) => (
                <li key={item} className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-sky-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/telegram-groups/sports" className="text-sm font-semibold text-sky-500 hover:underline">
              Browse Telegram Sports Groups →
            </Link>
          </div>
        </section>

        {/* World Cup 2026 quick facts */}
        <section className="mb-12 glass-card rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-5">FIFA World Cup 2026 — Key Facts</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            {[
              { label: 'Teams', value: '48', icon: '🏆' },
              { label: 'Matches', value: '104', icon: '⚽' },
              { label: 'Host Countries', value: '3', icon: '🌎' },
              { label: 'Host Cities', value: '16', icon: '🏟️' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-xl bg-muted/40">
                <div className="text-3xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            FIFA World Cup 2026 is the largest football tournament in history, hosted across the United States, Canada, and Mexico.
            With 48 national teams in 16 cities including Los Angeles, Houston, New York, Toronto, and Mexico City,
            it is the first World Cup co-hosted by three nations. The USA, Canada, and Mexico qualified automatically as co-hosts.
          </p>
        </section>

        {/* FAQ */}
        <section className="mb-12 max-w-3xl">
          <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Where can I find USA vs Paraguay WhatsApp or Telegram groups?',
                a: 'GroupsHub lists USMNT and World Cup fan groups where members are discussing USA vs Paraguay live. Browse the groups on this page and click Join to get into the conversation instantly.',
              },
              {
                q: 'Where is the USA vs Paraguay World Cup 2026 game being played?',
                a: 'The USA vs Paraguay FIFA World Cup 2026 Group D match is being played at SoFi Stadium in Inglewood, Los Angeles, California.',
              },
              {
                q: 'What group is USA in for World Cup 2026?',
                a: 'The USMNT is in Group D of FIFA World Cup 2026. Join a USA World Cup WhatsApp group on GroupsHub to follow every Group D match with other fans.',
              },
              {
                q: 'Where can I watch World Cup 2026 for free?',
                a: 'In the USA, FIFA World Cup 2026 matches are available for free on Tubi. Fox Sports and Telemundo also broadcast matches. Join a World Cup Telegram group on GroupsHub for stream links shared by fans.',
              },
              {
                q: 'Who are the USMNT key players at World Cup 2026?',
                a: 'The USMNT key players include Folarin Balogun (forward), Christian Pulisic (midfielder), Weston McKennie (midfielder), Timothy Tillman, Chris Richards (defender), and goalkeeper Matt Freese.',
              },
              {
                q: 'Can I submit my own World Cup fan group?',
                a: 'Yes. Click "Add Group" in the navigation or visit the Submit page. Paste your WhatsApp or Telegram invite link, select Sports as the category, and submit. Groups go live within 24 hours. No account required.',
              },
            ].map((faq, i) => (
              <div key={i} className="glass-card rounded-2xl p-5">
                <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="glass-card rounded-2xl p-8 text-center border border-emerald-500/20">
          <div className="text-3xl mb-3">⚽</div>
          <h2 className="text-xl font-bold mb-2">Have a World Cup Fan Group?</h2>
          <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">
            Submit your World Cup 2026 WhatsApp group or Telegram channel for free. Reach thousands of fans searching for communities right now.
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors"
          >
            Submit Your Fan Group — Free
          </Link>
        </div>
      </div>
    </>
  )
}
