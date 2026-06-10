import type { Metadata } from 'next'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://groupshub.com'
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'GroupsHub'

interface BuildMetadataOptions {
  title: string
  description: string
  path?: string
  image?: string
  noIndex?: boolean
}

export function buildMetadata({ title, description, path = '', image, noIndex }: BuildMetadataOptions): Metadata {
  const url = `${APP_URL}${path}`
  const ogImage = image || `${APP_URL}/api/og?title=${encodeURIComponent(title)}`

  return {
    title: `${title} | ${APP_NAME}`,
    description,
    metadataBase: new URL(APP_URL),
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${APP_NAME}`,
      description,
      url,
      siteName: APP_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${APP_NAME}`,
      description,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  }
}

export function buildGroupMetadata(group: {
  name: string
  platform: string
  category?: string
  country?: string
  description?: string | null
  slug: string
}): Metadata {
  const platformLabel = group.platform.charAt(0).toUpperCase() + group.platform.slice(1)
  const title = group.category && group.country
    ? `${group.name} — ${group.category} ${platformLabel} Group in ${group.country}`
    : `${group.name} — ${platformLabel} Group`
  const description = group.description ||
    `Join ${group.name} on ${platformLabel}. ${group.category ? `Category: ${group.category}.` : ''} ${group.country ? `Country: ${group.country}.` : ''} Find and join the best ${platformLabel} groups on GroupsHub.`

  return buildMetadata({
    title,
    description,
    path: `/groups/${group.slug}`,
    image: `${APP_URL}/api/og?slug=${group.slug}&platform=${group.platform}`,
  })
}

export function buildCategoryMetadata(category: string, platform: string, year: number = new Date().getFullYear()): Metadata {
  const platformLabel = platform.charAt(0).toUpperCase() + platform.slice(1)
  const title = `Best ${category} ${platformLabel} Groups ${year} — Join Free`
  const description = `Discover and join the best ${category} ${platformLabel} groups. Browse our curated list of active ${category.toLowerCase()} communities on ${platformLabel}. Updated ${year}.`
  return buildMetadata({ title, description, path: `/${platform}-groups/${category.toLowerCase().replace(/\s+/g, '-')}` })
}

export function buildCountryMetadata(country: string, countryCode: string): Metadata {
  const title = `WhatsApp, Telegram & Discord Groups in ${country}`
  const description = `Find and join the best WhatsApp, Telegram, and Discord groups from ${country}. Browse active communities, chat groups, and channels from ${country} on GroupsHub.`
  return buildMetadata({ title, description, path: `/groups/country/${countryCode.toLowerCase()}` })
}
