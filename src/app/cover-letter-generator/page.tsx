import { Suspense } from 'react'
import { CoverLetterGenerator } from '@/components/tools/CoverLetterGenerator'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { COVER_LETTER_PRICING } from '@/lib/dodo/client'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'

export const revalidate = 86400
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://groupshub.com'
const PAGE_URL = `${APP_URL}/cover-letter-generator`
const YEAR = new Date().getFullYear()

export const metadata: Metadata = buildMetadata({
  title: `AI Cover Letter Generator ${YEAR} — Tailored to Your Resume & Job`,
  description: `Generate a tailored, non-generic cover letter from your resume and a job description. Plans from $${(COVER_LETTER_PRICING.basic.amountCents / 100).toFixed(2)}. Sign in with Google to get started.`,
  path: '/cover-letter-generator',
  keywords: [
    'cover letter generator', 'ai cover letter generator', 'cover letter generator',
    'cover letter writer', 'tailored cover letter', 'cover letter maker',
    'ai cover letter writer', 'cover letter generator online',
  ],
  image: `${APP_URL}/api/og?title=${encodeURIComponent('AI Cover Letter Generator')}`,
})

const schemaWebPage = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': PAGE_URL,
  name: `Free AI Cover Letter Generator ${YEAR}`,
  url: PAGE_URL,
  description: 'Free AI cover letter generator tailored to your resume and a job description.',
  inLanguage: 'en-US',
  isPartOf: { '@type': 'WebSite', url: APP_URL, name: 'GroupsHub' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
      { '@type': 'ListItem', position: 2, name: 'Cover Letter Generator', item: PAGE_URL },
    ],
  },
  dateModified: new Date().toISOString(),
}

const schemaWebApplication = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  '@id': `${PAGE_URL}#app`,
  name: 'AI Cover Letter Generator',
  url: PAGE_URL,
  description: 'Generates a tailored, professional cover letter from a resume and job description using AI. Sign in with Google, choose a plan, and pay per letter.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires JavaScript',
  offers: {
    '@type': 'Offer',
    price: (COVER_LETTER_PRICING.basic.amountCents / 100).toFixed(2),
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  featureList: [
    'Tailored to your resume and the job description',
    'Multiple tone options',
    'Multiple length packages',
    'Copy to clipboard',
    'Download as .txt',
  ],
  provider: {
    '@type': 'Organization',
    '@id': `${APP_URL}#org`,
    name: 'GroupsHub',
    url: APP_URL,
  },
}

const faqs = [
  { q: 'Do I need an account?', a: 'Yes — sign in with your Google account, then choose a plan to generate a cover letter.' },
  { q: 'How much does it cost?', a: `Basic ${'$' + (COVER_LETTER_PRICING.basic.amountCents / 100).toFixed(2)}, Standard ${'$' + (COVER_LETTER_PRICING.standard.amountCents / 100).toFixed(2)}, or Premium ${'$' + (COVER_LETTER_PRICING.premium.amountCents / 100).toFixed(2)} — pay once per letter, no subscription.` },
  { q: 'Will the letter sound generic?', a: 'No. It references specific details from your resume and the job description, and avoids stock phrases like "I am excited to apply."' },
  { q: 'Can I edit the result?', a: 'Yes — copy it to your clipboard or download it as a .txt file and edit it anywhere.' },
  { q: 'What information do I need to provide?', a: 'Your resume or background summary, and the job description you are applying to. Company name and specific points are optional.' },
]

const allSchemas = [schemaWebPage, schemaWebApplication]

export default function CoverLetterGeneratorPage() {
  return (
    <>
      {allSchemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Breadcrumb crumbs={[{ name: 'Home', href: '/' }, { name: 'Cover Letter Generator' }]} />

        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
            Sign in with Google · Pay per letter
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">AI Cover Letter Generator {YEAR}</h1>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Paste your resume and a job description — get a tailored, natural-sounding cover letter. No cliches, no generic templates.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-8 mb-12 border border-border">
          <Suspense fallback={<div className="text-sm text-muted-foreground py-8 text-center">Loading…</div>}>
            <CoverLetterGenerator />
          </Suspense>
        </div>

        <section className="mb-12 max-w-2xl">
          <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card rounded-2xl p-5">
                <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
