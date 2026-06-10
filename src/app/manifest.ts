import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GroupsHub — WhatsApp, Telegram & Discord Groups',
    short_name: 'GroupsHub',
    description: 'Find and join the best WhatsApp groups, Telegram groups, and Discord servers. Browse 10,000+ communities worldwide.',
    start_url: '/',
    display: 'standalone',
    background_color: '#030712',
    theme_color: '#2563eb',
    orientation: 'portrait',
    categories: ['social', 'communication', 'utilities'],
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
      { src: '/favicon.svg', sizes: '192x192', type: 'image/svg+xml' },
      { src: '/favicon.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
    screenshots: [
      {
        src: '/api/og',
        sizes: '1200x630',
        type: 'image/png',
      },
    ],
  }
}
