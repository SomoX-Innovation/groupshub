import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { GroupGrid } from '@/components/groups/GroupGrid'
import { Pagination } from '@/components/browse/Pagination'
import { buildCountryMetadata } from '@/lib/seo/metadata'
import { countryPageSchema, countryFAQSchema, countryHowToSchema, webPageSchema } from '@/lib/seo/schema-markup'
import type { Metadata } from 'next'
import { PAGE_SIZE } from '@/lib/constants'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

export const dynamicParams = true
export const revalidate = 3600

interface CountryPageProps {
  params: { country: string }
  searchParams: { page?: string }
}

async function getCountryData(code: string) {
  const supabase = createClient()
  const { data } = await supabase
    .from('countries')
    .select('*')
    .eq('code', code.toUpperCase())
    .single()
  return data
}

async function getCountryGroups(countryCode: string, page: number) {
  const supabase = createClient()
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const { data, count } = await supabase
    .from('groups')
    .select('*, categories(*), countries(*)', { count: 'exact' })
    .eq('is_approved', true)
    .eq('country_code', countryCode.toUpperCase())
    .order('joins_count', { ascending: false })
    .range(from, to)

  const groups = (data || []) as Array<{ id: string; name: string; slug: string; [k: string]: unknown }>
  return { groups, total: count || 0, totalPages: Math.ceil((count || 0) / PAGE_SIZE) }
}

export async function generateStaticParams() {
  const supabase = createAdminClient()
  const { data } = await supabase.from('countries').select('code')
  return (data || []).map((c) => ({ country: c.code.toLowerCase() }))
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const country = await getCountryData(params.country)
  if (!country) return {}
  return buildCountryMetadata(country.name, country.code)
}

export default async function CountryPage({ params, searchParams }: CountryPageProps) {
  const country = await getCountryData(params.country)
  if (!country) notFound()

  const page = parseInt(searchParams.page || '1')
  const { groups, total, totalPages } = await getCountryGroups(params.country, page)

  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://groupshub.com'
  const schemas = [
    ...countryPageSchema({
      countryName: country.name,
      countryCode: country.code,
      groups: groups.map((g) => ({ name: g.name, slug: g.slug })),
    }),
    countryFAQSchema(country.name, total),
    countryHowToSchema(country.name),
    webPageSchema({
      name: `WhatsApp, Telegram & Discord Groups in ${country.name}`,
      description: `Find and join ${total}+ WhatsApp groups, Telegram groups, and Discord servers from ${country.name}. Free invite links — no sign-in required.`,
      url: `${APP_URL}/groupshub/groups/country/${params.country}`,
      breadcrumbs: [
        { name: 'Home', url: APP_URL },
        { name: 'Browse', url: `${APP_URL}/groupshub/browse` },
        { name: country.name, url: `${APP_URL}/groupshub/groups/country/${params.country}` },
      ],
    }),
  ]

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumb crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Browse', href: '/browse' },
          { name: country.name },
        ]} />
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-5xl">{country.flag_emoji}</span>
            <div>
              <h1 className="text-3xl font-bold">Groups in {country.name}</h1>
              <p className="text-muted-foreground">{country.continent} • {country.region}</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Find and join WhatsApp, Telegram, and Discord groups from {country.name}.
            Browse {total.toLocaleString()} active communities.
          </p>
        </div>

        {/* Quick Answer — AEO featured snippet + AI engine target */}
        <div className="quick-answer mb-8 rounded-2xl border border-[#25D366]/20 bg-[#25D366]/5 p-4 max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-widest text-[#25D366] mb-1.5">Quick Answer</div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            To find <strong className="text-foreground">WhatsApp groups in {country.name}</strong>: browse the {total.toLocaleString()}+ groups below → click any group → click <strong className="text-foreground">Join</strong> → open WhatsApp → tap <strong className="text-foreground">Join Group</strong>. Free, no sign-in required.
          </p>
        </div>

        <GroupGrid groups={groups as any} />
        <Pagination page={page} totalPages={totalPages} />
      </div>
    </>
  )
}