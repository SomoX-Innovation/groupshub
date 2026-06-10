import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: {
    default: 'GroupsHub — Global WhatsApp, Telegram & Discord Group Directory',
    template: '%s | GroupsHub',
  },
  description: 'Find and join the best WhatsApp, Telegram, and Discord groups worldwide. Browse 10,000+ communities across 195 countries and 50+ categories.',
  metadataBase: new URL(APP_URL),
  openGraph: {
    type: 'website',
    siteName: 'GroupsHub',
    title: 'GroupsHub — Global Group Directory',
    description: 'Find and join the best WhatsApp, Telegram, and Discord groups worldwide.',
    images: [{ url: `${APP_URL}/api/og`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GroupsHub — Global Group Directory',
    description: 'Find and join the best WhatsApp, Telegram, and Discord groups worldwide.',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
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
