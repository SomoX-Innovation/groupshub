'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Search, Moon, Sun, Menu, X, Globe2, Plus, Layers } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const isHome = pathname === '/'
  const isGroupsHub = pathname.startsWith('/groupshub')

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  useEffect(() => { setMobileOpen(false) }, [pathname])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) router.push(`/groupshub/browse?q=${encodeURIComponent(searchQuery.trim())}`)
  }

  const ThemeToggle = ({ className }: { className?: string }) => (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className={cn('w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors', className)}
      aria-label="Toggle theme"
    >
      {mounted
        ? resolvedTheme === 'dark'
          ? <Sun className="h-4 w-4 text-yellow-400" />
          : <Moon className="h-4 w-4 text-slate-600" />
        : <div className="h-4 w-4" />}
    </button>
  )

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/90 backdrop-blur-2xl border-b border-border/50 shadow-sm'
          : 'bg-background/60 backdrop-blur-md'
      )}>
        <div className="container mx-auto px-4 h-16 flex items-center gap-3">

          {/* ── HOME PAGE NAVBAR ── */}
          {isHome && (
            <>
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 font-extrabold text-lg shrink-0 group">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <Layers className="h-4 w-4 text-white" />
                </div>
                <span className="gradient-text">AnythingForYou</span>
              </Link>

              {/* Desktop */}
              <nav className="hidden md:flex items-center gap-1 ml-auto">
                <ThemeToggle />
              </nav>

              {/* Mobile */}
              <div className="flex md:hidden items-center gap-2 ml-auto">
                <ThemeToggle />
              </div>
            </>
          )}

          {/* ── GROUPSHUB / ALL OTHER PAGES NAVBAR ── */}
          {!isHome && (
            <>
              {/* Logo — links back to groupshub if inside it, else home */}
              <Link
                href={isGroupsHub ? '/groupshub' : '/'}
                className="flex items-center gap-2 font-extrabold text-lg shrink-0 group"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <Globe2 className="h-4 w-4 text-white" />
                </div>
                <span className="gradient-text">{isGroupsHub ? 'GroupsHub' : 'AnythingForYou'}</span>
              </Link>

              {/* Desktop Search — only on groupshub pages */}
              {isGroupsHub && (
                <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm mx-auto">
                  <div className="relative w-full group input-glow rounded-xl transition-all">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="search"
                      placeholder="Search 10,000+ groups..."
                      className="w-full h-10 pl-10 pr-4 rounded-xl bg-muted/50 border border-border/50 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:bg-background focus:border-primary/40 transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </form>
              )}

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1 ml-auto">
                {isGroupsHub && (
                  <>
                    <Link
                      href="/"
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground/60 hover:text-muted-foreground hover:bg-muted transition-all duration-200"
                    >
                      ← All Tools
                    </Link>
                    <Link
                      href="/groupshub/browse"
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-muted',
                        pathname.startsWith('/groupshub/browse')
                          ? 'text-foreground bg-muted'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      Browse
                    </Link>
                    <Link
                      href="/groupshub/submit"
                      className="ml-1 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-600 hover:to-violet-700 hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add Group
                    </Link>
                  </>
                )}
                <ThemeToggle className="ml-1" />
              </nav>

              {/* Mobile controls */}
              <div className="flex md:hidden items-center gap-2 ml-auto">
                {isGroupsHub && (
                  <Link
                    href="/groupshub/submit"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200"
                  >
                    <Plus className="h-3 w-3" />
                    Add Group
                  </Link>
                )}
                <ThemeToggle />
                <button
                  onClick={() => setMobileOpen((o) => !o)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
                  aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                >
                  {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </>
          )}

        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-40 md:hidden transition-all duration-300',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div className={cn(
          'absolute top-16 inset-x-0 bg-background/95 backdrop-blur-2xl border-b border-border/50 px-4 py-4 space-y-3 transition-transform duration-300 shadow-lg',
          mobileOpen ? 'translate-y-0' : '-translate-y-3'
        )}>
          {isGroupsHub ? (
            <>
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search groups..."
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-muted/60 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              <Link
                href="/groupshub/browse"
                className="flex items-center h-11 px-4 rounded-xl text-sm font-medium transition-all hover:bg-muted text-foreground"
              >
                Browse Groups
              </Link>
              <Link
                href="/groupshub/submit"
                className="flex items-center justify-center gap-2 h-11 px-4 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-md shadow-blue-500/20 hover:from-blue-600 hover:to-violet-700 transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
                Add Group — No Sign-in Required
              </Link>
              <Link
                href="/"
                className="flex items-center h-10 px-4 rounded-xl text-xs font-medium text-muted-foreground hover:bg-muted transition-all"
              >
                ← Back to All Tools
              </Link>
            </>
          ) : null}
        </div>
      </div>

      {/* Fixed header spacer */}
      <div className="h-16" />
    </>
  )
}
