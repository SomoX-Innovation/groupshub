import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AnythingForYou — Free Online Tools',
    short_name: 'AnythingForYou',
    description: 'A growing collection of free online tools — a WhatsApp/Telegram/Discord group directory, an AI cover letter generator, a QR code generator, and more.',
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
