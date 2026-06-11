import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { NavbarSwitcher } from '@/components/layout/NavbarSwitcher'
import { FooterSwitcher } from '@/components/layout/FooterSwitcher'
import { Toaster } from '@/components/ui/sonner'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://groupshub.com'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
  ],
}

export const metadata: Metadata = {
  title: {
    default: 'WhatsApp Group Links, Telegram Groups & Discord Servers — GroupsHub',
    template: '%s | GroupsHub',
  },
  description: 'GroupsHub is the #1 free directory to find and join WhatsApp groups, Telegram groups, and Discord servers. Browse 10,000+ active communities across 195 countries and 50+ categories. No sign-in required.',
  metadataBase: new URL(APP_URL),
  keywords: [
    'whatsapp group links', 'whatsapp groups to join', 'join whatsapp group',
    'telegram groups', 'telegram group links', 'discord servers',
    'whatsapp group invite link', 'whatsapp group directory', 'telegram group directory',
    'discord server list', 'find whatsapp groups', 'discord community finder',
    'active whatsapp groups', 'best telegram channels', 'public discord servers',
    'free group links', 'group invite links', 'whatsapp community links',
  ],
  openGraph: {
    type: 'website',
    siteName: 'GroupsHub',
    title: 'GroupsHub — Find & Join WhatsApp, Telegram & Discord Groups',
    description: 'The #1 free directory to find and join WhatsApp groups, Telegram groups, and Discord servers. 10,000+ active communities worldwide.',
    images: [{ url: `${APP_URL}/api/og`, width: 1200, height: 630, alt: 'GroupsHub - Global Group Directory' }],
    locale: 'en_US',
    url: APP_URL,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@groupshub',
    title: 'GroupsHub — Find & Join WhatsApp, Telegram & Discord Groups',
    description: 'The #1 free directory to find and join WhatsApp groups, Telegram groups & Discord servers. 10,000+ communities worldwide.',
    images: [`${APP_URL}/api/og`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  },
  alternates: { canonical: APP_URL },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  verification: {
    google: 'XcbaCGRHhoXjQCcn2neRUzfbSW5134QpCTjtgYVRLsQ',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavbarSwitcher />
          <main className="flex-1">{children}</main>
          <FooterSwitcher />
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
