import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { NavbarSwitcher } from '@/components/layout/NavbarSwitcher'
import { FooterSwitcher } from '@/components/layout/FooterSwitcher'
import { Toaster } from '@/components/ui/sonner'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.anythingforyou.xyz'
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'AnythingForYou'

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
    default: `${APP_NAME} — Free Online Tools`,
    template: `%s | ${APP_NAME}`,
  },
  description: `${APP_NAME} is a growing collection of free online tools — a WhatsApp/Telegram/Discord group directory, an AI cover letter generator, a QR code generator, and more.`,
  metadataBase: new URL(APP_URL),
  keywords: [
    'whatsapp group links', 'whatsapp groups to join', 'join whatsapp group',
    'telegram groups', 'telegram group links', 'discord servers',
    'whatsapp group invite link', 'whatsapp group directory', 'telegram group directory',
    'discord server list', 'find whatsapp groups', 'discord community finder',
    'active whatsapp groups', 'best telegram channels', 'public discord servers',
    'free group links', 'group invite links', 'whatsapp community links',
    'free online tools', 'ai cover letter generator', 'qr code generator',
  ],
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: `${APP_NAME} — Free Online Tools`,
    description: `${APP_NAME} is a growing collection of free online tools — group directories, an AI cover letter generator, QR codes, and more.`,
    images: [{ url: `${APP_URL}/api/og`, width: 1200, height: 630, alt: `${APP_NAME} - Free Online Tools` }],
    locale: 'en_US',
    url: APP_URL,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@groupshub',
    title: `${APP_NAME} — Free Online Tools`,
    description: `${APP_NAME} is a growing collection of free online tools — group directories, an AI cover letter generator, QR codes, and more.`,
    images: [`${APP_URL}/api/og`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  },
  alternates: {
    canonical: APP_URL,
    languages: {
      'en': APP_URL,
      'x-default': APP_URL,
    },
  },
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
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QPQ3SNZW5K" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-QPQ3SNZW5K');` }} />
      </head>
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
