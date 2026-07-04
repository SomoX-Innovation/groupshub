import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, ChefHat, Users, CheckCircle2 } from 'lucide-react'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { getAllRecipeSlugs, getRecipeBySlug, recipes } from '@/lib/data/recipes'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'

export const revalidate = 86400
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.anythingforyou.xyz'

export function generateStaticParams() {
  return getAllRecipeSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const recipe = getRecipeBySlug(params.slug)
  if (!recipe) return {}

  return buildMetadata({
    title: `${recipe.title} Recipe — ${recipe.totalTime}`,
    description: recipe.description,
    path: `/recipes/${recipe.slug}`,
    keywords: [recipe.title, recipe.category, recipe.cuisine, 'recipe', `${recipe.title} recipe`],
    image: recipe.image,
    type: 'article',
  })
}

function parseIsoDuration(text: string): string | undefined {
  const match = text.match(/(\d+)\s*(hour|hr|h|minute|min|m)/i)
  if (!match) return undefined
  const value = parseInt(match[1], 10)
  const unit = match[2].toLowerCase()
  return unit.startsWith('h') ? `PT${value}H` : `PT${value}M`
}

export default function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = getRecipeBySlug(params.slug)
  if (!recipe) notFound()

  const pageUrl = `${APP_URL}/recipes/${recipe.slug}`
  const related = recipes.filter((r) => r.slug !== recipe.slug && r.category === recipe.category).slice(0, 3)

  const schemaRecipe = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    image: [recipe.image],
    description: recipe.description,
    recipeCategory: recipe.category,
    recipeCuisine: recipe.cuisine,
    prepTime: parseIsoDuration(recipe.prepTime),
    cookTime: parseIsoDuration(recipe.cookTime),
    totalTime: parseIsoDuration(recipe.totalTime),
    recipeYield: `${recipe.servings} servings`,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text: step,
    })),
    ...(recipe.nutrition && {
      nutrition: {
        '@type': 'NutritionInformation',
        ...(recipe.nutrition.calories && { calories: recipe.nutrition.calories }),
        ...(recipe.nutrition.protein && { proteinContent: recipe.nutrition.protein }),
        ...(recipe.nutrition.carbs && { carbohydrateContent: recipe.nutrition.carbs }),
        ...(recipe.nutrition.fat && { fatContent: recipe.nutrition.fat }),
      },
    }),
    ...(recipe.youtubeVideoId && {
      video: {
        '@type': 'VideoObject',
        name: `How to Make ${recipe.title}`,
        description: recipe.description,
        thumbnailUrl: recipe.image,
        contentUrl: `https://www.youtube.com/watch?v=${recipe.youtubeVideoId}`,
        embedUrl: `https://www.youtube.com/embed/${recipe.youtubeVideoId}`,
        uploadDate: new Date().toISOString(),
      },
    }),
  }

  const schemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
      { '@type': 'ListItem', position: 2, name: 'Recipes', item: `${APP_URL}/recipes` },
      { '@type': 'ListItem', position: 3, name: recipe.title, item: pageUrl },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaRecipe) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumb
          crumbs={[
            { name: 'Home', href: '/' },
            { name: 'Recipes', href: '/recipes' },
            { name: recipe.title },
          ]}
        />

        <div className="mb-6">
          <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary mb-3">
            {recipe.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{recipe.title}</h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">{recipe.description}</p>
        </div>

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 bg-muted">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="glass-card rounded-xl p-4 text-center border border-border">
            <Clock className="h-4 w-4 mx-auto mb-1.5 text-primary" />
            <div className="text-xs text-muted-foreground">Prep Time</div>
            <div className="font-semibold text-sm">{recipe.prepTime}</div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center border border-border">
            <Clock className="h-4 w-4 mx-auto mb-1.5 text-primary" />
            <div className="text-xs text-muted-foreground">Cook Time</div>
            <div className="font-semibold text-sm">{recipe.cookTime}</div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center border border-border">
            <Users className="h-4 w-4 mx-auto mb-1.5 text-primary" />
            <div className="text-xs text-muted-foreground">Servings</div>
            <div className="font-semibold text-sm">{recipe.servings}</div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center border border-border">
            <ChefHat className="h-4 w-4 mx-auto mb-1.5 text-primary" />
            <div className="text-xs text-muted-foreground">Difficulty</div>
            <div className="font-semibold text-sm">{recipe.difficulty}</div>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-[1fr_1.5fr]">
          <section>
            <h2 className="text-xl font-bold mb-4">Ingredients</h2>
            <ul className="space-y-2.5">
              {recipe.ingredients.map((ingredient, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Instructions</h2>
            <ol className="space-y-5">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed pt-0.5">{step}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {recipe.youtubeVideoId && (
          <section className="mt-10">
            <h2 className="text-xl font-bold mb-4">Watch How to Make It</h2>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-muted">
              <iframe
                src={`https://www.youtube.com/embed/${recipe.youtubeVideoId}?rel=0&modestbranding=1&playsinline=1`}
                title={`How to make ${recipe.title}`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </section>
        )}

        {recipe.tips && recipe.tips.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold mb-4">Tips</h2>
            <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
              {recipe.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-bold mb-6">More {recipe.category} Recipes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/recipes/${r.slug}`}
                  className="glass-card rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-all"
                >
                  <div className="relative w-full aspect-[4/3] bg-muted">
                    <Image src={r.image} alt={r.title} fill sizes="33vw" className="object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="font-semibold text-sm">{r.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
