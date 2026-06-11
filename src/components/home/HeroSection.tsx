'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { SearchBar } from '@/components/search/SearchBar'
import { Zap, ArrowRight, Plus } from 'lucide-react'

const LiquidEther = dynamic(() => import('@/components/ui/LiquidEther'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-violet-600/15 to-indigo-600/20" />,
})

const platforms = [
  { id: 'whatsapp', label: 'WhatsApp', border: 'border-[#25D366]/40', bg: 'bg-[#25D366]/10 hover:bg-[#25D366]/20', text: 'text-[#25D366]' },
  { id: 'telegram', label: 'Telegram', border: 'border-[#2AABEE]/40', bg: 'bg-[#2AABEE]/10 hover:bg-[#2AABEE]/20', text: 'text-[#2AABEE]' },
  { id: 'discord', label: 'Discord', border: 'border-[#5865F2]/40', bg: 'bg-[#5865F2]/10 hover:bg-[#5865F2]/20', text: 'text-[#5865F2]' },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden noise" style={{ minHeight: '600px' }}>
      {/* LiquidEther WebGL fluid simulation — fills full hero area */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={['#3b82f6', '#8b5cf6', '#06b6d4']}
          mouseForce={20}
          cursorSize={100}
          resolution={0.5}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 z-10 bg-background/60 dark:bg-background/70 backdrop-blur-[1px]" />

      {/* Grid overlay */}
      <div className="hero-grid absolute inset-0 z-10 pointer-events-none" />

      {/* Hero content — sits above WebGL canvas */}
      <div className="relative z-20 container mx-auto px-4 pt-10 pb-16 md:pt-14 md:pb-24">
        {/* Badge */}
        <div className="flex justify-center mb-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm font-medium">
            <Zap className="h-3.5 w-3.5 text-yellow-400" />
            <span className="gradient-text font-semibold">10,000+ Groups Listed</span>
            <span className="text-muted-foreground hidden sm:inline">across 195 countries</span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6 animate-slide-up"
            style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
          >
            Find Your{' '}
            <span className="gradient-text animate-gradient-x bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500">
              Perfect
            </span>
            <br className="hidden sm:block" />{' '}
            Community
          </h1>
          <p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-up"
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          >
            Discover and join thousands of WhatsApp, Telegram & Discord groups.
            Connect with communities that match your interests, worldwide.
          </p>
        </div>

        {/* Search */}
        <div
          className="max-w-2xl mx-auto mb-5 animate-slide-up"
          style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
        >
          <SearchBar />
        </div>

        {/* CTAs */}
        <div
          className="flex items-center justify-center gap-3 mb-8 animate-slide-up"
          style={{ animationDelay: '0.35s', animationFillMode: 'both' }}
        >
          <Link
            href="/groupshub/browse"
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass border border-border/50 text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            Browse Groups
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/groupshub/submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-200"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Your Group
          </Link>
        </div>

        {/* Platform pills */}
        <div
          className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap animate-slide-up"
          style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
        >
          {platforms.map(({ id, label, border, bg, text }) => (
            <Link
              key={id}
              href={`/groupshub/browse?platform=${id}`}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 ${bg} ${border} ${text}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
