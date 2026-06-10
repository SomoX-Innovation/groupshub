const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://groupshub.com'
const YEAR = new Date().getFullYear()

export function websiteSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'GroupsHub',
      alternateName: 'GroupsHub — WhatsApp Telegram Discord Group Directory',
      url: APP_URL,
      description: 'The #1 free directory to find and join WhatsApp groups, Telegram groups, and Discord servers. Browse 10,000+ active communities worldwide.',
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${APP_URL}/browse?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'GroupsHub',
      url: APP_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${APP_URL}/favicon.svg`,
        width: 512,
        height: 512,
      },
      description: "GroupsHub is the world's largest free directory of WhatsApp groups, Telegram groups, and Discord servers.",
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        url: `${APP_URL}/submit`,
        availableLanguage: 'English',
      },
      sameAs: [
        'https://twitter.com/groupshub',
        'https://facebook.com/groupshub',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I join a WhatsApp group?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Find a WhatsApp group on GroupsHub, click the "Join" button, and you will be taken directly to the WhatsApp invite link. No account needed on GroupsHub.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I find Telegram groups to join?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Browse GroupsHub's Telegram group directory. Filter by category, country, or language to find the best Telegram groups for your interests. Click Join to open directly in Telegram.",
          },
        },
        {
          '@type': 'Question',
          name: 'How do I find Discord servers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Use GroupsHub's Discord server directory to browse public Discord servers by category. Click the Join button to get the instant invite link.",
          },
        },
        {
          '@type': 'Question',
          name: 'Is GroupsHub free to use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, GroupsHub is completely free. You can browse, search, and join any group without creating an account. Adding your own group is also free and requires no sign-in.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I add my WhatsApp, Telegram or Discord group?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Click "Add Group" in the navigation bar. Fill in your group name, invite link, category, and country. Your group will be reviewed and listed on GroupsHub — no account required.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many groups are listed on GroupsHub?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `GroupsHub lists over 10,000 active WhatsApp groups, Telegram groups, and Discord servers across 50+ categories and 195 countries as of ${YEAR}.`,
          },
        },
        {
          '@type': 'Question',
          name: 'Can I search for groups by country?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. GroupsHub has groups from 195 countries. Use the country filter on the Browse page or visit the country-specific pages to find local communities in your region.',
          },
        },
        {
          '@type': 'Question',
          name: 'What categories of groups are available?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'GroupsHub covers 50+ categories including Education, Business, Gaming, Music, Sports, Technology, Entertainment, Health, Finance, Travel, Food, Crypto, and many more.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I get my group featured at the top?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Visit the Pricing page and choose a featured listing plan starting at $2.99 for 7 days. Featured groups appear at the top of search results with a highlighted badge.',
          },
        },
      ],
    },
  ]
}

export function groupSchema(group: {
  name: string
  description?: string | null
  platform: string
  invite_link: string
  slug: string
  created_at: string
  updated_at?: string
  category?: string
  country?: string
  member_count?: number
}) {
  const platformLabel = group.platform.charAt(0).toUpperCase() + group.platform.slice(1)
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${group.name} — ${platformLabel} Group`,
      description: group.description || `Join ${group.name} on ${platformLabel}. Find the invite link and connect with this community on GroupsHub.`,
      url: `${APP_URL}/groups/${group.slug}`,
      datePublished: group.created_at,
      dateModified: group.updated_at || group.created_at,
      publisher: {
        '@type': 'Organization',
        name: 'GroupsHub',
        url: APP_URL,
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
          { '@type': 'ListItem', position: 2, name: 'Browse Groups', item: `${APP_URL}/browse` },
          ...(group.category ? [{ '@type': 'ListItem', position: 3, name: group.category, item: `${APP_URL}/browse?category=${group.category.toLowerCase().replace(/\s+/g, '-')}` }] : []),
          { '@type': 'ListItem', position: group.category ? 4 : 3, name: group.name, item: `${APP_URL}/groups/${group.slug}` },
        ],
      },
      mainEntity: {
        '@type': 'SocialMediaPosting',
        name: group.name,
        headline: `Join ${group.name} — ${platformLabel} Group ${YEAR}`,
        description: group.description || `Join ${group.name} on ${platformLabel}. Get the invite link on GroupsHub.`,
        url: `${APP_URL}/groups/${group.slug}`,
        datePublished: group.created_at,
        dateModified: group.updated_at || group.created_at,
        sharedContent: { '@type': 'WebPage', url: group.invite_link },
        publisher: { '@type': 'Organization', name: 'GroupsHub', url: APP_URL },
        keywords: [
          group.name,
          `${platformLabel} group`,
          `join ${platformLabel} group`,
          group.category ? `${group.category} ${platformLabel} group` : '',
          group.country ? `${platformLabel} groups ${group.country}` : '',
        ].filter(Boolean).join(', '),
        ...(group.category && { about: { '@type': 'Thing', name: group.category } }),
        ...(group.country && { locationCreated: { '@type': 'Place', name: group.country } }),
      },
    },
  ]
}

export function itemListSchema(groups: Array<{ name: string; slug: string }>, title: string, description?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    description: description || `Browse ${groups.length} communities in this collection on GroupsHub`,
    numberOfItems: groups.length,
    itemListElement: groups.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: g.name,
      url: `${APP_URL}/groups/${g.slug}`,
    })),
  }
}

export function breadcrumbSchema(crumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  }
}

export function categoryPageSchema(opts: {
  categoryName: string
  platform: string
  groups: Array<{ name: string; slug: string }>
  categorySlug: string
}) {
  const platformLabel = opts.platform.charAt(0).toUpperCase() + opts.platform.slice(1)
  const title = `Best ${opts.categoryName} ${platformLabel} Groups ${YEAR}`
  return [
    itemListSchema(
      opts.groups,
      title,
      `Browse the best ${opts.categoryName.toLowerCase()} ${platformLabel} groups in ${YEAR}. Join active communities and channels on GroupsHub.`
    ),
    breadcrumbSchema([
      { name: 'Home', url: APP_URL },
      { name: `${platformLabel} Groups`, url: `${APP_URL}/browse?platform=${opts.platform}` },
      { name: opts.categoryName, url: `${APP_URL}/${opts.platform}-groups/${opts.categorySlug}` },
    ]),
  ]
}

export function countryPageSchema(opts: {
  countryName: string
  countryCode: string
  groups: Array<{ name: string; slug: string }>
}) {
  const title = `WhatsApp, Telegram & Discord Groups in ${opts.countryName} ${YEAR}`
  return [
    itemListSchema(
      opts.groups,
      title,
      `Find and join the best WhatsApp groups, Telegram groups, and Discord servers from ${opts.countryName} in ${YEAR}. Active communities on GroupsHub.`
    ),
    breadcrumbSchema([
      { name: 'Home', url: APP_URL },
      { name: 'Browse Groups', url: `${APP_URL}/browse` },
      { name: opts.countryName, url: `${APP_URL}/groups/country/${opts.countryCode.toLowerCase()}` },
    ]),
  ]
}
