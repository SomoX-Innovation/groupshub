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
        <script
          async
          type="application/javascript"
          src="https://a.magsrv.com/ad-provider.js"
        />
        <script
          async
          type="application/javascript"
          src="https://a.pemsrv.com/ad-provider.js"
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`} suppressHydrationWarning>
        <script type="application/javascript" dangerouslySetInnerHTML={{ __html: `pn_idzone=5947000;pn_sleep_seconds=0;pn_is_self_hosted=1;pn_soft_ask=0;pn_filename="/worker.js";var customTargeting={'ex_av':'name'};` }} />
        <script async type="application/javascript" src="https://js.wpnsrv.com/pn.php" />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script type="application/javascript" src="/popmagic.js" />
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
        <ins className="eas6a97888e2" data-zoneid="5946976" suppressHydrationWarning />
        <ins className="eas6a97888e6" data-zoneid="5946982" suppressHydrationWarning />
        <ins className="eas6a97888e17" data-zoneid="5946984" suppressHydrationWarning />
        <ins className="eas6a97888e35" data-zoneid="5946986" suppressHydrationWarning />
        <ins className="eas6a97888e10" data-zoneid="5946988" suppressHydrationWarning />
        <ins className="eas6a97888e14" data-zoneid="5946992" suppressHydrationWarning />
        <ins className="eas6a97888e33" data-zoneid="5946996" suppressHydrationWarning />
        <ins className="eas6a97888e31" data-zoneid="5946998" suppressHydrationWarning />
        <script dangerouslySetInnerHTML={{ __html: '(AdProvider = window.AdProvider || []).push({"serve": {}});' }} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
