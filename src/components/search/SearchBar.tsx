'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

interface SearchResult {
  id: string
  name: string
  slug: string
  platform: string
  categories: { name: string; icon: string } | null
}

export function SearchBar({ initialQuery = '' }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [_isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }

    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data)
        setIsOpen(data.length > 0)
      } catch {
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => clearTimeout(debounceRef.current)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setIsOpen(false)
      router.push(`/groupshub/browse?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search groups by name, topic, or category..."
            className="pl-10 pr-10 h-12 text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => results.length > 0 && setIsOpen(true)}
          />
          {query && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => { setQuery(''); setResults([]); setIsOpen(false) }}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border rounded-lg shadow-lg overflow-hidden">
          {results.map((result) => (
            <Link
              key={result.id}
              href={`/groupshub/groups/${result.slug}`}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors"
              onClick={() => { setIsOpen(false); setQuery(result.name) }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{result.name}</p>
                {result.categories && (
                  <p className="text-xs text-muted-foreground">
                    {result.categories.icon} {result.categories.name}
                  </p>
                )}
              </div>
              <span
                className="text-xs text-white px-1.5 py-0.5 rounded capitalize"
                style={{ backgroundColor: { whatsapp: '#25D366', telegram: '#2AABEE', discord: '#5865F2' }[result.platform] || '#6366f1' }}
              >
                {result.platform}
              </span>
            </Link>
          ))}
          <Link
            href={`/groupshub/browse?q=${encodeURIComponent(query)}`}
            className="flex items-center justify-center gap-1 py-2 text-xs text-primary hover:bg-muted transition-colors border-t"
            onClick={() => setIsOpen(false)}
          >
            <Search className="h-3 w-3" />
            See all results for "{query}"
          </Link>
        </div>
      )}
    </div>
  )
}
