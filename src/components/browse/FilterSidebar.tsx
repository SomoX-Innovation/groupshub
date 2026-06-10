'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PLATFORMS, LANGUAGES } from '@/lib/constants'
import type { Category, Country } from '@/types/group'

interface FilterSidebarProps {
  categories: Category[]
  countries: Country[]
}

export function FilterSidebar({ categories, countries }: FilterSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentPlatform = searchParams.get('platform') || ''
  const currentCategory = searchParams.get('category') || ''
  const currentCountry = searchParams.get('country') || ''
  const currentLanguage = searchParams.get('language') || ''

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page')
    router.push(`${pathname}?${params.toString()}`)
  }

  const clearAll = () => {
    router.push(pathname)
  }

  const hasFilters = currentPlatform || currentCategory || currentCountry || currentLanguage

  return (
    <aside className="w-full space-y-4 sticky top-20">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Filters</h3>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs h-6 px-2">
            Clear all
          </Button>
        )}
      </div>

      <Separator />

      {/* Platform */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Platform</p>
        <div className="flex flex-col gap-1.5">
          {[{ id: '', label: 'All Platforms' }, ...Object.values(PLATFORMS)].map((p) => (
            <button
              key={p.id}
              onClick={() => updateFilter('platform', p.id)}
              className={`text-left text-sm px-2 py-1.5 rounded-md transition-colors ${
                currentPlatform === p.id
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'hover:bg-muted'
              }`}
            >
              {p.id ? `${p.label}` : 'All Platforms'}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Category */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</p>
        <Select value={currentCategory} onValueChange={(v) => updateFilter('category', v === 'all' ? '' : v)}>
          <SelectTrigger className="h-9 text-xs">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent className="max-h-52">
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.slug}>
                {cat.icon} {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Country */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Country</p>
        <Select value={currentCountry} onValueChange={(v) => updateFilter('country', v === 'all' ? '' : v)}>
          <SelectTrigger className="h-9 text-xs">
            <SelectValue placeholder="All countries" />
          </SelectTrigger>
          <SelectContent className="max-h-52">
            <SelectItem value="all">All countries</SelectItem>
            {countries.map((c) => (
              <SelectItem key={c.code} value={c.code}>
                {c.flag_emoji} {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Language */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Language</p>
        <Select value={currentLanguage} onValueChange={(v) => updateFilter('language', v === 'all' ? '' : v)}>
          <SelectTrigger className="h-9 text-xs">
            <SelectValue placeholder="All languages" />
          </SelectTrigger>
          <SelectContent className="max-h-52">
            <SelectItem value="all">All languages</SelectItem>
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </aside>
  )
}
