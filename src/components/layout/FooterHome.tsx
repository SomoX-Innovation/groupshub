import Link from 'next/link'
import { Layers } from 'lucide-react'

const tools = [
  { href: '/groupshub', label: 'GroupsHub', icon: '💬', soon: false },
  { href: '#', label: 'PDF Tools', icon: '📄', soon: true },
  { href: '#', label: 'Image Editor', icon: '🖼️', soon: true },
  { href: '#', label: 'Link Shortener', icon: '🔗', soon: true },
]

export function FooterHome() {
  return (
    <footer className="border-t border-border/50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 font-extrabold text-lg group w-fit">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                <Layers className="h-4 w-4 text-white" />
              </div>
              <span className="gradient-text">AnythingForYou</span>
            </Link>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              A growing collection of free, fast, privacy-friendly online tools. No sign-up required.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Tools</h3>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2">
              {tools.map((t) => (
                <li key={t.label}>
                  <Link
                    href={t.href}
                    className={`flex items-center gap-2 text-xs transition-colors ${
                      t.soon
                        ? 'text-muted-foreground/50 cursor-not-allowed pointer-events-none'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span>{t.icon}</span>
                    <span>{t.label}</span>
                    {t.soon && (
                      <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded-full">Soon</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AnythingForYou. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Free tools, no sign-up required.
          </p>
        </div>
      </div>
    </footer>
  )
}
