import Link from 'next/link'
import { ArrowRight, Grid3X3 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Category } from '@/types/group'

interface CategoriesGridProps {
  categories: Category[]
}

const cardColors = [
  'hover:border-blue-500/30 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)]',
  'hover:border-violet-500/30 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)]',
  'hover:border-emerald-500/30 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]',
  'hover:border-rose-500/30 hover:shadow-[0_8px_30px_rgba(244,63,94,0.15)]',
  'hover:border-amber-500/30 hover:shadow-[0_8px_30px_rgba(245,158,11,0.15)]',
  'hover:border-cyan-500/30 hover:shadow-[0_8px_30px_rgba(6,182,212,0.15)]',
  'hover:border-pink-500/30 hover:shadow-[0_8px_30px_rgba(236,72,153,0.15)]',
  'hover:border-indigo-500/30 hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)]',
]

export function CategoriesGrid({ categories }: CategoriesGridProps) {
  const featured = categories.slice(0, 16)

  return (
    <section className="py-16 bg-muted/20 dark:bg-white/[0.01]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 shrink-0">
              <Grid3X3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Browse by Category</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Explore 50+ interest categories</p>
            </div>
          </div>
          <Link
            href="/browse"
            className="group hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-full border border-border/60 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all duration-200"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {featured.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/browse?category=${cat.slug}`}
              className={cn(
                'glass-card rounded-2xl p-3 flex flex-col items-center gap-2 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 border border-white/10 dark:border-white/[0.07] group animate-fade-in',
                cardColors[i % cardColors.length]
              )}
              style={{ animationDelay: `${(i % 8) * 0.05}s`, animationFillMode: 'both' }}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200 leading-none">
                {cat.icon}
              </span>
              <p className="text-xs font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                {cat.name}
              </p>
              {cat.group_count > 0 && (
                <p className="text-[10px] text-muted-foreground">
                  {cat.group_count >= 1000 ? `${(cat.group_count / 1000).toFixed(1)}k` : cat.group_count}
                </p>
              )}
            </Link>
          ))}
        </div>

        {/* Mobile see all */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 px-6 py-2.5 text-sm font-semibold hover:bg-muted transition-colors"
          >
            View all categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
