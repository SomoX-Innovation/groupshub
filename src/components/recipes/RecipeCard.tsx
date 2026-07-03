import Link from 'next/link'
import Image from 'next/image'
import { Clock, ChefHat, Play } from 'lucide-react'
import type { Recipe } from '@/lib/data/recipes'

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="group glass-card rounded-2xl overflow-hidden border border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-sm text-foreground">
          {recipe.category}
        </span>
        {recipe.youtubeVideoId && (
          <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center">
            <Play className="h-3.5 w-3.5 text-primary fill-primary" />
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h2 className="font-bold text-lg leading-snug mb-1.5 group-hover:text-primary transition-colors">
          {recipe.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {recipe.description}
        </p>
        <div className="mt-auto flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {recipe.totalTime}
          </span>
          <span className="flex items-center gap-1.5">
            <ChefHat className="h-3.5 w-3.5" />
            {recipe.difficulty}
          </span>
        </div>
      </div>
    </Link>
  )
}
