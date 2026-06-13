import Link from 'next/link'
import dynamic from 'next/dynamic'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AnythingForYou — Free Online Tools',
  description: 'A growing collection of free, fast online tools. Group directories, PDF tools, image editors and more — no sign-up required.',
}

const LiquidEther = dynamic(() => import('@/components/ui/LiquidEther'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-transparent" />,
})

const tools = [
  {
    id: 'groupshub',
    name: 'GroupsHub — Group Directory',
    description: 'Find and join WhatsApp groups, Telegram groups, and Discord servers. Browse 10,000+ active communities across 195 countries and 50+ categories.',
    href: '/groupshub',
    icon: '💬',
    available: true,
    badge: 'Live',
    stats: '10,000+ groups',
  },
  {
    id: 'pdf-tools',
    name: 'PDF Tools',
    description: 'Convert, merge, split, and compress PDF files online. No installation needed.',
    href: '#',
    icon: '📄',
    available: false,
    badge: 'Coming Soon',
    stats: null,
  },
  {
    id: 'image-editor',
    name: 'Image Editor',
    description: 'Resize, crop, compress and convert images online. Supports PNG, JPG, WebP, and SVG.',
    href: '#',
    icon: '🖼️',
    available: false,
    badge: 'Coming Soon',
    stats: null,
  },
  {
    id: 'link-shortener',
    name: 'Link Shortener',
    description: 'Shorten long URLs and track clicks with a detailed analytics dashboard.',
    href: '#',
    icon: '🔗',
    available: false,
    badge: 'Coming Soon',
    stats: null,
  },
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes for WhatsApp group links, Telegram groups, Discord servers, and any URL. Free, no watermark.',
    href: '/qr-code-generator',
    icon: '⬛',
    available: true,
    badge: 'Free Tool',
    stats: 'No sign-in needed',
  },
  {
    id: 'color-palette',
    name: 'Color Palette Tool',
    description: 'Pick colors, generate palettes, and convert between HEX, RGB, HSL and more.',
    href: '#',
    icon: '🎨',
    available: false,
    badge: 'Coming Soon',
    stats: null,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4" style={{ minHeight: '400px' }}>
        {/* LiquidEther WebGL fluid background */}
        <div className="absolute inset-0 z-0">
          <LiquidEther
            colors={['#3b82f6', '#8b5cf6', '#a855f7']}
            mouseForce={20}
            cursorSize={120}
            resolution={0.5}
            autoDemo={true}
            autoSpeed={0.4}
            autoIntensity={2.0}
            autoResumeDelay={2000}
            autoRampDuration={0.8}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        {/* Overlay to keep text readable */}
        <div className="absolute inset-0 z-10 bg-background/70 backdrop-blur-[1px]" />
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Free tools, no sign-up required
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
            <span className="gradient-text">Anything</span>
            <span className="text-foreground">ForYou</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A growing collection of free, fast, privacy-friendly online tools.
            Start with GroupsHub — and more tools are on the way.
          </p>
        </div>
      </section>

      {/* Tools grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className={`group relative bg-card rounded-2xl border flex flex-col transition-all duration-200 ${
                tool.available
                  ? 'border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5'
                  : 'border-border/50 opacity-60'
              }`}
            >
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-5">
                  <div className="text-4xl">{tool.icon}</div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        tool.available
                          ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {tool.badge}
                    </span>
                    {tool.stats && (
                      <span className="text-xs text-muted-foreground">{tool.stats}</span>
                    )}
                  </div>
                </div>
                <h2 className="text-foreground font-bold text-lg mb-2 leading-snug">{tool.name}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{tool.description}</p>
              </div>
              <div className="px-6 pb-6">
                {tool.available ? (
                  <Link
                    href={tool.href}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200"
                  >
                    Open Tool
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                ) : (
                  <div className="w-full py-2.5 rounded-xl bg-muted text-muted-foreground font-semibold text-sm text-center cursor-not-allowed">
                    Coming Soon
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
