import Link from 'next/link'
import { Globe2 } from 'lucide-react'

const platformLinks = [
  { href: '/browse?platform=whatsapp', label: 'WhatsApp Groups', dot: 'bg-[#25D366]' },
  { href: '/browse?platform=telegram', label: 'Telegram Groups', dot: 'bg-[#2AABEE]' },
  { href: '/browse?platform=discord', label: 'Discord Groups', dot: 'bg-[#5865F2]' },
]

const categoryLinks = [
  { href: '/whatsapp-groups/education', label: 'Education' },
  { href: '/whatsapp-groups/business', label: 'Business' },
  { href: '/whatsapp-groups/gaming', label: 'Gaming' },
  { href: '/whatsapp-groups/technology', label: 'Technology' },
  { href: '/whatsapp-groups/music', label: 'Music' },
  { href: '/whatsapp-groups/sports', label: 'Sports' },
]

const quickLinks = [
  { href: '/browse', label: 'Browse Groups' },
  { href: '/submit', label: 'Submit Group' },
]

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-extrabold text-lg group w-fit">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                <Globe2 className="h-4 w-4 text-white" />
              </div>
              <span className="gradient-text">GroupsHub</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The global directory for WhatsApp, Telegram & Discord groups. Discover and share communities worldwide.
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                10,000+ groups live
              </span>
            </div>
          </div>

          {/* Platforms */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-foreground">Platforms</h3>
            <ul className="space-y-2.5">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${link.dot} group-hover:scale-125 transition-transform`} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-foreground">Popular Categories</h3>
            <ul className="space-y-2.5">
              {categoryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-foreground">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} GroupsHub. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              10,000+ Groups · 195 Countries · 50+ Categories
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
