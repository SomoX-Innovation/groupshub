import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RecipeCard } from '@/components/recipes/RecipeCard'
import { recipes, getAllCategories } from '@/lib/data/recipes'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'

export const revalidate = 86400
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.anythingforyou.xyz'
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'AnythingForYou'
const PAGE_URL = `${APP_URL}/recipes`
const YEAR = new Date().getFullYear()

export const metadata: Metadata = buildMetadata({
  title: `${recipes.length} Trending Recipes ${YEAR} — Easy, Viral & Popular Recipes`,
  description: `Cook the ${recipes.length} most trending recipes of ${YEAR} — viral dishes, easy weeknight dinners, and popular international recipes. Full ingredients, step-by-step instructions, and photos. Free, no sign-in.`,
  path: '/recipes',
  keywords: [
    'trending recipes', 'viral recipes', 'recipes 2026', 'popular recipes', 'easy recipes',
    'dinner recipes', 'recipe ideas', 'cooking recipes', 'quick recipes', 'homemade recipes',
    'best recipes this week', 'what to cook today',
  ],
  image: `${APP_URL}/api/og?title=${encodeURIComponent('Trending Recipes')}`,
})

const categories = getAllCategories()

const schemaWebPage = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': PAGE_URL,
  name: `${recipes.length} Trending Recipes ${YEAR}`,
  url: PAGE_URL,
  description: `The ${recipes.length} most trending recipes of ${YEAR}, with full ingredients, instructions, and photos.`,
  inLanguage: 'en-US',
  isPartOf: { '@type': 'WebSite', url: APP_URL, name: APP_NAME },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
      { '@type': 'ListItem', position: 2, name: 'Recipes', item: PAGE_URL },
    ],
  },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.quick-answer', 'h2'],
  },
  dateModified: new Date().toISOString(),
}

const schemaItemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `Trending Recipes ${YEAR}`,
  description: `The ${recipes.length} most trending recipes, ranked by popularity.`,
  numberOfItems: recipes.length,
  itemListElement: recipes.map((recipe, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${APP_URL}/recipes/${recipe.slug}`,
    name: recipe.title,
  })),
}

const faqs = [
  { q: 'Are these recipes really free?', a: 'Yes — every recipe is completely free to view, no account or sign-in required.' },
  { q: 'What makes a recipe "trending"?', a: 'These are dishes currently popular in search trends, food media, and social platforms like TikTok — from viral mashups to comfort-food classics everyone searches for.' },
  { q: 'Can I filter recipes by category?', a: 'Yes — use the category chips above the recipe grid to filter by Dinner, Dessert, Breakfast, Snack, and more.' },
  { q: 'Do the recipes include nutrition information?', a: 'Most recipes include approximate calories, protein, carbs, and fat per serving alongside the ingredients and instructions.' },
]

export default function RecipesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaItemList) }} />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumb crumbs={[{ name: 'Home', href: '/' }, { name: 'Recipes' }]} />

        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
            Free · No Sign-in · Trending {YEAR}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{recipes.length} Trending Recipes {YEAR}</h1>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            The most popular recipes people are cooking right now — viral dishes, easy dinners, and international favorites. Full ingredients, step-by-step instructions, and photos.
          </p>
        </div>

        <div className="quick-answer mb-8 rounded-2xl border border-primary/20 bg-primary/5 p-5 max-w-2xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Quick Answer</div>
          <p className="text-sm leading-relaxed">
            The most <strong>trending recipes right now</strong> include viral dishes like spicy tuna crispy rice and birria tacos, easy weeknight staples like baked feta pasta, and popular high-protein options like cottage cheese breakfast bowls. Browse all {recipes.length} below — each has full ingredients, instructions, and timing.
          </p>
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/recipes/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-1.5 rounded-full text-xs font-semibold border border-border hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        )}

        {recipes.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center border border-border max-w-md mx-auto">
            <div className="text-4xl mb-3">🍳</div>
            <p className="text-muted-foreground text-sm">
              No recipes yet — check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        )}

        <section className="max-w-2xl mx-auto">
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
