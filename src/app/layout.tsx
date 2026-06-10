import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
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
    default: 'GroupsHub — Find & Join WhatsApp, Telegram & Discord Groups 2025',
    template: '%s | GroupsHub',
  },
  description: 'GroupsHub is the #1 free directory to find and join WhatsApp groups, Telegram groups, and Discord servers. Browse 10,000+ active communities across 195 countries and 50+ categories. No sign-in required.',
  metadataBase: new URL(APP_URL),
  keywords: [
    'whatsapp group links', 'telegram groups', 'discord servers', 'join whatsapp groups',
    'whatsapp group directory', 'telegram group directory', 'discord server list',
    'whatsapp group invite links 2025', 'find telegram groups', 'discord community finder',
    'active whatsapp groups', 'best telegram channels', 'public discord servers',
    'whatsapp groups to join', 'free group directory',
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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-2502916137600124" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2502916137600124"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
