import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Crumb {
  name: string
  href?: string
}

export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1
        return (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 opacity-50" />}
            {isLast || !crumb.href ? (
              <span className={isLast ? 'text-foreground font-medium' : ''}>{crumb.name}</span>
            ) : (
              <Link href={crumb.href} className="hover:text-foreground transition-colors hover:underline">
                {crumb.name}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
