import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.anythingforyou.xyz'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: ['/browse$', '/'],
        disallow: ['/admin/', '/api/', '/browse?'],
      },
      {
        userAgent: 'Bingbot',
        allow: ['/browse$', '/'],
        disallow: ['/admin/', '/api/', '/browse?'],
      },
      {
        userAgent: '*',
        allow: ['/browse$', '/'],
        disallow: ['/admin/', '/api/', '/browse?'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
