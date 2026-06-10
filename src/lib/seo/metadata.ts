import type { Metadata } from 'next'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://groupshub.com'
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'GroupsHub'
const YEAR = new Date().getFullYear()

interface BuildMetadataOptions {
  title: string
  description: string
  path?: string
  image?: string
  noIndex?: boolean
  keywords?: string[]
  type?: 'website' | 'article'
  publishedAt?: string
  modifiedAt?: string
}

export function buildMetadata({
  title,
  description,
  path = '',
  image,
  noIndex,
  keywords,
  type = 'website',
  publishedAt,
  modifiedAt,
}: BuildMetadataOptions): Metadata {
  const url = `${APP_URL}${path}`
  const ogImage = image || `${APP_URL}/api/og?title=${encodeURIComponent(title)}`
  const fullTitle = `${title} | ${APP_NAME}`

  return {
    title: fullTitle,
    description,
    keywords,
    metadataBase: new URL(APP_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: APP_NAME,
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
        type: 'image/png',
      }],
      type,
      locale: 'en_US',
      ...(publishedAt && { publishedTime: publishedAt }),
      ...(modifiedAt && { modifiedTime: modifiedAt }),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@groupshub',
      creator: '@groupshub',
      title: fullTitle,
      description,
      images: [{ url: ogImage, alt: title }],
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          nocache: false,
          googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-snippet': -1,
            'max-image-preview': 'large',
            'max-video-preview': -1,
          },
        },
    other: {
      'article:publisher': APP_URL,
    },
  }
}

export function buildGroupMetadata(group: {
  name: string
  platform: string
  category?: string
  country?: string
  description?: string | null
  slug: string
  created_at?: string
  updated_at?: string
}): Metadata {
  const platformLabel = group.platform.charAt(0).toUpperCase() + group.platform.slice(1)

  const title = group.category && group.country
    ? `${group.name} — ${group.category} ${platformLabel} Group in ${group.country} ${YEAR}`
    : group.category
    ? `${group.name} — ${group.category} ${platformLabel} Group ${YEAR}`
    : `${group.name} — ${platformLabel} Group Invite Link ${YEAR}`

  const description = group.description
    ? `${group.description.slice(0, 140)} Join ${group.name} on ${platformLabel}.${group.country ? ` ${group.country} community.` : ''} Free invite link on GroupsHub — no sign-in.`
    : `Join ${group.name} on ${platformLabel} ${YEAR}. ${group.category ? `${group.category} community.` : ''} ${group.country ? `Based in ${group.country}.` : ''} Get the free invite link instantly on GroupsHub.`

  const keywords = [
    group.name,
    `${group.name} ${platformLabel}`,
    `join ${group.name}`,
    `${platformLabel} group invite link`,
    group.category ? `${group.category} ${platformLabel} group` : '',
    group.category ? `${group.category} group link` : '',
    group.country ? `${platformLabel} groups ${group.country}` : '',
    `${platformLabel} group ${YEAR}`,
    `best ${platformLabel} groups`,
    'free group invite',
  ].filter(Boolean) as string[]

  return buildMetadata({
    title,
    description,
    path: `/groups/${group.slug}`,
    image: `${APP_URL}/api/og?slug=${group.slug}&platform=${group.platform}${group.category ? `&category=${encodeURIComponent(group.category)}` : ''}${group.country ? `&country=${encodeURIComponent(group.country)}` : ''}`,
    keywords,
    type: 'article',
    publishedAt: group.created_at,
    modifiedAt: group.updated_at || group.created_at,
  })
}

export function buildCategoryMetadata(category: string, platform: string): Metadata {
  const platformLabel = platform.charAt(0).toUpperCase() + platform.slice(1)
  const catLower = category.toLowerCase()
  const platLower = platform.toLowerCase()

  const title = `Best ${category} ${platformLabel} Groups ${YEAR} — Join Free`
  const description = `Find and join the best ${catLower} ${platLower} groups in ${YEAR}. Browse ${catLower} ${platLower} invite links, active communities and channels. 100% free on GroupsHub — no sign-in required.`

  const keywords = [
    `${catLower} ${platLower} group`,
    `${catLower} ${platLower} group link`,
    `join ${catLower} ${platLower} group`,
    `best ${catLower} ${platLower} groups ${YEAR}`,
    `${platLower} ${catLower} community`,
    `${catLower} ${platLower} invite link`,
    `active ${catLower} ${platLower} groups`,
    `${catLower} group directory`,
    `${platLower} groups for ${catLower}`,
  ]

  return buildMetadata({
    title,
    description,
    path: `/${platform}-groups/${category.toLowerCase().replace(/\s+/g, '-')}`,
    image: `${APP_URL}/api/og?category=${encodeURIComponent(category)}&platform=${platform}`,
    keywords,
  })
}

export function buildBrowseMetadata(opts: {
  platform?: string
  category?: string
  country?: string
  q?: string
}): Metadata {
  const { platform, category, country, q } = opts

  if (q) {
    return buildMetadata({
      title: `"${q}" Group Results ${YEAR}`,
      description: `Search results for "${q}" groups on GroupsHub. Find and join WhatsApp, Telegram and Discord communities matching your search.`,
      path: `/browse?q=${encodeURIComponent(q)}`,
      noIndex: true, // search results shouldn't be indexed
    })
  }

  const platformLabel = platform
    ? platform.charAt(0).toUpperCase() + platform.slice(1)
    : null

  if (platformLabel && category) {
    const title = `${category} ${platformLabel} Groups ${YEAR}`
    return buildMetadata({
      title,
      description: `Browse ${category.toLowerCase()} ${platformLabel.toLowerCase()} groups. Find active ${category.toLowerCase()} communities and get free invite links on GroupsHub.`,
      path: `/browse?platform=${platform}&category=${category}`,
      keywords: [`${category} ${platformLabel} group`, `join ${category} ${platformLabel}`, `${platformLabel} groups`],
    })
  }

  if (platformLabel && country) {
    const title = `${platformLabel} Groups in ${country} ${YEAR}`
    return buildMetadata({
      title,
      description: `Find and join ${platformLabel} groups from ${country}. Browse active ${country} ${platformLabel.toLowerCase()} communities on GroupsHub.`,
      path: `/browse?platform=${platform}&country=${country}`,
      keywords: [`${platformLabel} groups ${country}`, `${country} ${platformLabel} community`],
    })
  }

  if (platformLabel) {
    const title = `${platformLabel} Groups ${YEAR} — Browse & Join Free`
    const descriptions: Record<string, string> = {
      WhatsApp: `Browse and join the best WhatsApp groups in ${YEAR}. Find active WhatsApp group invite links across 50+ categories and 195 countries. Free on GroupsHub.`,
      Telegram: `Browse and join the best Telegram groups and channels in ${YEAR}. Find active Telegram invite links across 50+ categories and 195 countries. Free on GroupsHub.`,
      Discord: `Browse and join the best Discord servers in ${YEAR}. Find active Discord invite links across 50+ categories and 195 countries. Free on GroupsHub.`,
    }
    return buildMetadata({
      title,
      description: descriptions[platformLabel] || `Browse ${platformLabel} groups on GroupsHub.`,
      path: `/browse?platform=${platform}`,
      image: `${APP_URL}/api/og?platform=${platform}&title=${encodeURIComponent(title)}`,
      keywords: [
        `${platformLabel.toLowerCase()} groups`,
        `join ${platformLabel.toLowerCase()} group`,
        `${platformLabel.toLowerCase()} group links`,
        `best ${platformLabel.toLowerCase()} groups ${YEAR}`,
        `${platformLabel.toLowerCase()} group directory`,
        `${platformLabel.toLowerCase()} invite links`,
      ],
    })
  }

  return buildMetadata({
    title: `Browse WhatsApp, Telegram & Discord Groups ${YEAR}`,
    description: `Browse and join 10,000+ WhatsApp groups, Telegram groups, and Discord servers in ${YEAR}. Filter by platform, category, country and language. Free on GroupsHub.`,
    path: '/browse',
    keywords: [
      'whatsapp groups', 'telegram groups', 'discord servers',
      'group directory', 'join groups online', 'free group links',
      `best groups ${YEAR}`, 'active communities',
    ],
  })
}

export function buildCountryMetadata(country: string, countryCode: string): Metadata {
  const title = `WhatsApp, Telegram & Discord Groups in ${country} ${YEAR}`
  const description = `Find and join the best WhatsApp groups, Telegram groups, and Discord servers from ${country} in ${YEAR}. Browse active ${country} communities and get free invite links on GroupsHub.`
  const keywords = [
    `whatsapp groups ${country}`,
    `telegram groups ${country}`,
    `discord servers ${country}`,
    `join whatsapp group ${country}`,
    `${country} group links`,
    `${country} telegram channels`,
    `${country} discord server`,
    `${country} online communities ${YEAR}`,
    `groups in ${country}`,
  ]
  return buildMetadata({
    title,
    description,
    path: `/groups/country/${countryCode.toLowerCase()}`,
    image: `${APP_URL}/api/og?country=${encodeURIComponent(country)}&title=${encodeURIComponent(title)}`,
    keywords,
  })
}

export function buildSubmitMetadata(): Metadata {
  return buildMetadata({
    title: `Add Your Group — Submit Free ${YEAR}`,
    description: `Submit your WhatsApp group, Telegram group, or Discord server to GroupsHub for free. No sign-in required. Reach thousands of people looking to join communities in ${YEAR}.`,
    path: '/submit',
    keywords: [
      'add whatsapp group', 'submit telegram group', 'list discord server',
      'promote whatsapp group', 'grow telegram channel', 'discord server listing',
      'free group submission', 'group directory listing',
    ],
  })
}

export function buildPricingMetadata(): Metadata {
  return buildMetadata({
    title: `Featured Listings & Pricing — Promote Your Group ${YEAR}`,
    description: `Get your WhatsApp group, Telegram group, or Discord server featured at the top of GroupsHub. Plans from $2.99 for 7 days. Reach thousands of users looking to join communities.`,
    path: '/pricing',
    keywords: [
      'feature whatsapp group', 'promote telegram group', 'discord server promotion',
      'group advertising', 'featured group listing', 'get more members',
    ],
  })
}
