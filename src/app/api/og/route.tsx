import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const PLATFORM_COLORS: Record<string, string> = {
  whatsapp: '#25D366',
  telegram: '#2AABEE',
  discord: '#5865F2',
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name') || 'GroupsHub'
  const platform = searchParams.get('platform') || 'whatsapp'
  const category = searchParams.get('category') || ''
  const country = searchParams.get('country') || ''

  const color = PLATFORM_COLORS[platform] || '#6366f1'
  const platformLabel = platform.charAt(0).toUpperCase() + platform.slice(1)

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          background: `linear-gradient(135deg, ${color}22 0%, #0f172a 60%)`,
          backgroundColor: '#0f172a',
          padding: '64px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Platform badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: color,
            color: 'white',
            padding: '6px 16px',
            borderRadius: '999px',
            fontSize: '18px',
            fontWeight: '700',
            marginBottom: '24px',
          }}
        >
          {platformLabel}
        </div>

        {/* Group name */}
        <div
          style={{
            fontSize: name.length > 40 ? '48px' : '64px',
            fontWeight: '800',
            color: 'white',
            lineHeight: 1.1,
            marginBottom: '24px',
            maxWidth: '900px',
          }}
        >
          {name}
        </div>

        {/* Meta row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#94a3b8', fontSize: '22px' }}>
          {category && <span>{category}</span>}
          {category && country && <span>•</span>}
          {country && <span>{country}</span>}
        </div>

        {/* Brand */}
        <div
          style={{
            position: 'absolute',
            top: '48px',
            right: '64px',
            fontSize: '28px',
            fontWeight: '800',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ color }}>●</span> GroupsHub
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
