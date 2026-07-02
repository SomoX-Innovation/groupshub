import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RecipeCard } from '@/components/recipes/RecipeCard'
import { getAllCategories, getRecipesByCategory } from '@/lib/data/recipes'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'

export const revalidate = 86400
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.anythingforyou.xyz'
const YEAR = new Date().getFullYear()

function slugToCategory(slug: string): string | undefined {
  return getAllCategories().find((c) => c.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase())
}

export function generateStaticParams() {
  return getAllCategories().map((category) => ({
    category: category.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = slugToCategory(params.category)
  if (!category) return {}

  const count = getRecipesByCategory(category).length

  return buildMetadata({
    title: `${count} Best ${category} Recipes ${YEAR}`,
    description: `Browse ${count} trending ${category.toLowerCase()} recipes with full ingredients, step-by-step instructions, and photos. Free, no sign-in required.`,
    path: `/recipes/category/${params.category}`,
    keywords: [`${category.toLowerCase()} recipes`, `best ${category.toLowerCase()} recipes`, `easy ${category.toLowerCase()} recipes`, 'trending recipes'],
  })
}

export default function RecipeCategoryPage({ params }: { params: { category: string } }) {
  const category = slugToCategory(params.category)
  if (!category) notFound()

  const categoryRecipes = getRecipesByCategory(category)
  const allCategories = getAllCategories()
  const pageUrl = `${APP_URL}/recipes/category/${params.category}`

  const schemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
      { '@type': 'ListItem', position: 2, name: 'Recipes', item: `${APP_URL}/recipes` },
      { '@type': 'ListItem', position: 3, name: category, item: pageUrl },
    ],
  }

  const schemaItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${category} Recipes`,
    numberOfItems: categoryRecipes.length,
    itemListElement: categoryRecipes.map((recipe, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${APP_URL}/recipes/${recipe.slug}`,
      name: recipe.title,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaItemList) }} />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumb
          crumbs={[
            { name: 'Home', href: '/' },
            { name: 'Recipes', href: '/recipes' },
            { name: category },
          ]}
        />

        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Best {category} Recipes {YEAR}</h1>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {categoryRecipes.length} trending {category.toLowerCase()} recipes with full ingredients, instructions, and photos.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <Link
            href="/recipes"
            className="px-4 py-1.5 rounded-full text-xs font-semibold border border-border hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-colors"
          >
            All Recipes
          </Link>
          {allCategories.map((c) => (
            <Link
              key={c}
              href={`/recipes/category/${c.toLowerCase().replace(/\s+/g, '-')}`}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                c === category
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border hover:border-primary/40 hover:bg-primary/5 hover:text-primary'
              }`}
            >
              {c}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoryRecipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </div>
    </>
  )
}
