'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'

export function NavbarHome() {
  const { resolvedTheme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/90 backdrop-blur-2xl border-b border-border/50 shadow-sm'
          : 'bg-background/60 backdrop-blur-md'
      )}>
        <div className="container mx-auto px-4 h-16 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 font-extrabold text-lg shrink-0 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
              <Layers className="h-4 w-4 text-white" />
            </div>
            <span className="gradient-text">AnythingForYou</span>
          </Link>
          <nav className="flex items-center gap-1 ml-auto">
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {mounted
                ? resolvedTheme === 'dark'
                  ? <Sun className="h-4 w-4 text-yellow-400" />
                  : <Moon className="h-4 w-4 text-slate-600" />
                : <div className="h-4 w-4" />}
            </button>
          </nav>
        </div>
      </header>
      <div className="h-16" />
    </>
  )
}
