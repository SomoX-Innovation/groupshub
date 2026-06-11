import Link from 'next/link'

const platforms = [
  {
    name: 'WhatsApp Groups',
    slug: 'whatsapp',
    color: '#25D366',
    bg: 'bg-[#25D366]/10',
    border: 'border-[#25D366]/20',
    text: 'text-[#25D366]',
    description: 'WhatsApp groups are private communities of up to 1,024 members that share messages, media, and links in real time.',
    useCases: ['Stay connected with family & friends', 'Join niche hobby communities', 'Follow local news & events', 'Collaborate on work projects', 'Learn new skills together'],
    icon: '💬',
  },
  {
    name: 'Telegram Groups',
    slug: 'telegram',
    color: '#2AABEE',
    bg: 'bg-[#2AABEE]/10',
    border: 'border-[#2AABEE]/20',
    text: 'text-[#2AABEE]',
    description: 'Telegram groups support up to 200,000 members, offer public channels, bots, and rich media sharing with no message limits.',
    useCases: ['Follow crypto & finance channels', 'Access breaking news channels', 'Join gaming communities', 'Tech & developer groups', 'Educational courses & resources'],
    icon: '✈️',
  },
  {
    name: 'Discord Servers',
    slug: 'discord',
    color: '#5865F2',
    bg: 'bg-[#5865F2]/10',
    border: 'border-[#5865F2]/20',
    text: 'text-[#5865F2]',
    description: 'Discord servers are organized communities with separate channels, voice chat, roles, and powerful moderation tools.',
    useCases: ['Gaming communities & clans', 'Anime & entertainment fandoms', 'NFT & crypto projects', 'Study & homework help', 'Developer & tech communities'],
    icon: '🎮',
  },
]

const topCategories = [
  { name: 'Education', slug: 'education', emoji: '📚', desc: 'Study groups, tutoring, online courses' },
  { name: 'Business', slug: 'business', emoji: '💼', desc: 'Networking, entrepreneurship, marketing' },
  { name: 'Gaming', slug: 'gaming', emoji: '🎮', desc: 'Game clans, esports, game reviews' },
  { name: 'Technology', slug: 'technology', emoji: '💻', desc: 'Programming, AI, cybersecurity' },
  { name: 'Crypto', slug: 'crypto', emoji: '₿', desc: 'Bitcoin, altcoins, DeFi, NFTs' },
  { name: 'Music', slug: 'music', emoji: '🎵', desc: 'Artists, producers, music fans' },
  { name: 'Sports', slug: 'sports', emoji: '⚽', desc: 'Football, cricket, basketball fans' },
  { name: 'Health', slug: 'health', emoji: '🏥', desc: 'Fitness, nutrition, mental health' },
]

const topCountries = [
  { name: 'India', code: 'IN', flag: '🇮🇳' },
  { name: 'Nigeria', code: 'NG', flag: '🇳🇬' },
  { name: 'United States', code: 'US', flag: '🇺🇸' },
  { name: 'Pakistan', code: 'PK', flag: '🇵🇰' },
  { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
  { name: 'South Africa', code: 'ZA', flag: '🇿🇦' },
  { name: 'Indonesia', code: 'ID', flag: '🇮🇩' },
  { name: 'Ghana', code: 'GH', flag: '🇬🇭' },
  { name: 'Kenya', code: 'KE', flag: '🇰🇪' },
  { name: 'Brazil', code: 'BR', flag: '🇧🇷' },
  { name: 'Philippines', code: 'PH', flag: '🇵🇭' },
  { name: 'Bangladesh', code: 'BD', flag: '🇧🇩' },
]

const faqs = [
  {
    q: 'How do I join a WhatsApp group from GroupsHub?',
    a: 'Click on any WhatsApp group listing, then click the green "Join" button. You\'ll be redirected to WhatsApp with the invite link pre-filled. Tap "Join Group" in WhatsApp to complete. No account needed on GroupsHub.',
  },
  {
    q: 'Are all the group links active and working?',
    a: 'GroupsHub reviews every submitted group and monitors links for activity. Groups with expired or broken links are flagged and removed. You can also report any broken link using the "Report" button on any group page.',
  },
  {
    q: 'How do I add my group to GroupsHub?',
    a: 'Click "Add Group" in the top navigation. Fill in your group name, paste your invite link, choose a category and country, and submit. No account or sign-in is required. Groups are reviewed and typically go live within 24 hours.',
  },
  {
    q: 'What is the difference between WhatsApp groups and Telegram groups?',
    a: 'WhatsApp groups have a 1,024 member limit and are end-to-end encrypted. Telegram groups support up to 200,000 members, can be public or private, and offer more features like bots, file sharing up to 2GB, and no message limits. Discord servers are community-focused with separate channels, voice chat, and roles.',
  },
  {
    q: 'Can I search for groups by country?',
    a: 'Yes. Use the country filter on the Browse page to find groups from any of the 195 countries listed on GroupsHub. You can also combine country + platform + category filters to narrow down results.',
  },
  {
    q: 'Is GroupsHub free to use?',
    a: 'Yes, browsing and joining groups on GroupsHub is completely free with no sign-in required. Submitting your group is also free. A paid "Featured" option is available to promote your group to the top of listings.',
  },
]

export function SeoContent() {
  return (
    <div className="border-t border-border/50">
      {/* Platform deep-dives */}
      <section className="py-16 bg-muted/20 dark:bg-white/[0.01]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Find Groups on Every Platform
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              GroupsHub is the only directory covering WhatsApp, Telegram, and Discord — all in one place. Browse by platform to find communities that work best for you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {platforms.map((p) => (
              <div key={p.slug} className={`glass-card rounded-2xl p-6 border ${p.border}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{p.icon}</span>
                  <h3 className={`text-lg font-bold ${p.text}`}>{p.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.description}</p>
                <ul className="space-y-1.5 mb-5">
                  {p.useCases.map((uc) => (
                    <li key={uc} className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-current opacity-50 flex-shrink-0" />
                      {uc}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/browse?platform=${p.slug}`}
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold ${p.text} hover:underline`}
                >
                  Browse {p.name} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top categories with cross-platform links */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Popular Group Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From education and business to gaming and crypto — find active communities in every interest area across all three platforms.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {topCategories.map((cat) => (
              <div key={cat.slug} className="glass-card rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{cat.emoji}</span>
                  <span className="font-semibold text-sm">{cat.name}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{cat.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  <Link href={`/whatsapp-groups/${cat.slug}`} className="text-[10px] font-medium text-[#25D366] hover:underline">WhatsApp</Link>
                  <span className="text-[10px] text-muted-foreground">·</span>
                  <Link href={`/telegram-groups/${cat.slug}`} className="text-[10px] font-medium text-[#2AABEE] hover:underline">Telegram</Link>
                  <span className="text-[10px] text-muted-foreground">·</span>
                  <Link href={`/discord-groups/${cat.slug}`} className="text-[10px] font-medium text-[#5865F2] hover:underline">Discord</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top countries */}
      <section className="py-16 bg-muted/20 dark:bg-white/[0.01]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Groups from Around the World</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              GroupsHub lists active communities from 195 countries. Find local WhatsApp groups, Telegram channels, and Discord servers near you.
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {topCountries.map((c) => (
              <Link
                key={c.code}
                href={`/groupshub/groups/country/${c.code.toLowerCase()}`}
                className="glass-card rounded-xl p-3 text-center hover:-translate-y-0.5 transition-transform group"
              >
                <div className="text-2xl mb-1">{c.flag}</div>
                <div className="text-xs font-medium group-hover:text-primary transition-colors leading-tight">{c.name}</div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/groupshub/browse" className="text-sm text-primary hover:underline font-medium">
              Browse all 195 countries →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about finding and joining groups on GroupsHub.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card rounded-2xl p-5">
                <h3 className="font-semibold text-sm mb-2 text-foreground">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / submit section */}
      <section className="py-16 bg-muted/20 dark:bg-white/[0.01]">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Have a Group to Share?</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Submit your WhatsApp group, Telegram channel, or Discord server for free. Reach thousands of people actively looking to join communities like yours. No sign-in required.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/groupshub/submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-200"
            >
              Add Your Group — Free
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-border/50 text-sm font-semibold hover:-translate-y-0.5 transition-transform"
            >
              Get Featured
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
