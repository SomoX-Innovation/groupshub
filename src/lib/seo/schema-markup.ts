const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://groupshub.com'

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GroupsHub',
    url: APP_URL,
    description: 'Global directory of WhatsApp, Telegram, and Discord groups.',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${APP_URL}/browse?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function groupSchema(group: {
  name: string
  description?: string | null
  platform: string
  invite_link: string
  slug: string
  created_at: string
  category?: string
  country?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SocialMediaPosting',
    name: group.name,
    description: group.description || `Join ${group.name} on ${group.platform}`,
    url: `${APP_URL}/groups/${group.slug}`,
    datePublished: group.created_at,
    sharedContent: {
      '@type': 'WebPage',
      url: group.invite_link,
    },
    ...(group.category && { about: { '@type': 'Thing', name: group.category } }),
    ...(group.country && { locationCreated: { '@type': 'Place', name: group.country } }),
  }
}

export function itemListSchema(groups: Array<{ name: string; slug: string }>, title: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    itemListElement: groups.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: g.name,
      url: `${APP_URL}/groups/${g.slug}`,
    })),
  }
}
