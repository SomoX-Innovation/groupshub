import Link from 'next/link'
import { Globe2 } from 'lucide-react'

const whatsappCategories = [
  { href: '/whatsapp-groups/education', label: 'Education WhatsApp Groups' },
  { href: '/whatsapp-groups/business', label: 'Business WhatsApp Groups' },
  { href: '/whatsapp-groups/gaming', label: 'Gaming WhatsApp Groups' },
  { href: '/whatsapp-groups/technology', label: 'Tech WhatsApp Groups' },
  { href: '/whatsapp-groups/music', label: 'Music WhatsApp Groups' },
  { href: '/whatsapp-groups/sports', label: 'Sports WhatsApp Groups' },
  { href: '/whatsapp-groups/crypto', label: 'Crypto WhatsApp Groups' },
  { href: '/whatsapp-groups/health', label: 'Health WhatsApp Groups' },
]

const telegramCategories = [
  { href: '/telegram-groups/education', label: 'Education Telegram Groups' },
  { href: '/telegram-groups/business', label: 'Business Telegram Groups' },
  { href: '/telegram-groups/crypto', label: 'Crypto Telegram Groups' },
  { href: '/telegram-groups/technology', label: 'Tech Telegram Groups' },
  { href: '/telegram-groups/gaming', label: 'Gaming Telegram Groups' },
  { href: '/telegram-groups/news', label: 'News Telegram Channels' },
  { href: '/telegram-groups/music', label: 'Music Telegram Groups' },
  { href: '/telegram-groups/sports', label: 'Sports Telegram Groups' },
]

const discordCategories = [
  { href: '/discord-groups/gaming', label: 'Gaming Discord Servers' },
  { href: '/discord-groups/technology', label: 'Tech Discord Servers' },
  { href: '/discord-groups/anime', label: 'Anime Discord Servers' },
  { href: '/discord-groups/music', label: 'Music Discord Servers' },
  { href: '/discord-groups/crypto', label: 'Crypto Discord Servers' },
  { href: '/discord-groups/education', label: 'Education Discord Servers' },
  { href: '/discord-groups/art', label: 'Art Discord Servers' },
  { href: '/discord-groups/sports', label: 'Sports Discord Servers' },
]

const countryLinks = [
  { href: '/groups/country/in', label: 'India Groups' },
  { href: '/groups/country/ng', label: 'Nigeria Groups' },
  { href: '/groups/country/us', label: 'USA Groups' },
  { href: '/groups/country/pk', label: 'Pakistan Groups' },
  { href: '/groups/country/gb', label: 'UK Groups' },
  { href: '/groups/country/za', label: 'South Africa Groups' },
  { href: '/groups/country/id', label: 'Indonesia Groups' },
  { href: '/groups/country/gh', label: 'Ghana Groups' },
  { href: '/groups/country/ke', label: 'Kenya Groups' },
  { href: '/groups/country/ph', label: 'Philippines Groups' },
]

const quickLinks = [
  { href: '/browse', label: 'Browse All Groups' },
  { href: '/browse?platform=whatsapp', label: 'WhatsApp Groups' },
  { href: '/browse?platform=telegram', label: 'Telegram Groups' },
  { href: '/browse?platform=discord', label: 'Discord Servers' },
  { href: '/submit', label: 'Add Your Group' },
  { href: '/pricing', label: 'Get Featured' },
]

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-14">

        {/* Main link matrix */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">

          {/* Brand + quick links */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 font-extrabold text-lg group w-fit">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                <Globe2 className="h-4 w-4 text-white" />
              </div>
              <span className="gradient-text">GroupsHub</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              The global directory for WhatsApp groups, Telegram groups, and Discord servers. Find and join 10,000+ active communities worldwide.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              10,000+ groups · 195 countries
            </div>
            <ul className="space-y-1.5 pt-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp Groups */}
          <div className="space-y-3">
            <h3 className="font-semibold text-xs uppercase tracking-wider text-[#25D366]">WhatsApp</h3>
            <ul className="space-y-2">
              {whatsappCategories.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors leading-relaxed">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Telegram Groups */}
          <div className="space-y-3">
            <h3 className="font-semibold text-xs uppercase tracking-wider text-[#2AABEE]">Telegram</h3>
            <ul className="space-y-2">
              {telegramCategories.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors leading-relaxed">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Discord Servers */}
          <div className="space-y-3">
            <h3 className="font-semibold text-xs uppercase tracking-wider text-[#5865F2]">Discord</h3>
            <ul className="space-y-2">
              {discordCategories.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors leading-relaxed">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Countries */}
          <div className="space-y-3">
            <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">By Country</h3>
            <ul className="space-y-2">
              {countryLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/browse" className="text-xs text-primary hover:underline">
                  All 195 countries →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} GroupsHub. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground text-center">
            Find & join WhatsApp groups, Telegram groups & Discord servers — free, no sign-in required.
          </p>
        </div>
      </div>
    </footer>
  )
}
