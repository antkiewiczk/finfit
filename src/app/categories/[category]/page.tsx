import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostsByCategory, getCategories } from '@/lib/content'
import BlogCard from '@/components/blog/BlogCard'
import CategoryFilter from '@/components/blog/CategoryFilter'
import { DollarSign, Dumbbell } from 'lucide-react'

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    category: category.name,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1)
  
  return {
    title: `${categoryName} Articles | FinFit Blog`,
    description: `Explore our ${categoryName} articles and discover expert insights on ${category} topics.`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  console.log('Category requested:', category)
  
  const [posts, allCategories] = await Promise.all([
    getPostsByCategory(category as 'finance' | 'fitness'),
    getCategories()
  ])

  console.log('Posts found for category:', category, posts.length)
  console.log('Posts:', posts)

  if (!posts) {
    notFound()
  }

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1)
  const CategoryIcon = category === 'finance' ? DollarSign : Dumbbell
  const categoryDescription = category === 'finance' 
    ? 'Expert advice on budgeting, investing, saving, and achieving financial freedom.'
    : 'Proven workout routines, nutrition tips, and fitness strategies for optimal health.'

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
       {/* Category Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full">
            <CategoryIcon className="h-16 w-16 text-teal-600" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          {categoryName} Articles
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {categoryDescription}
        </p>
        <div className="text-sm text-muted-foreground mt-4">
          {posts.length} {posts.length === 1 ? 'article' : 'articles'} in this category
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <CategoryFilter categories={allCategories} currentCategory={category} />
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full">
                  <CategoryIcon className="h-16 w-16 text-teal-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No {categoryName} articles yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Check back soon for new {categoryName} content!
              </p>
              <a
                href="/"
                className="inline-flex items-center px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors"
              >
                Browse All Articles
              </a>
            </div>
          )}

          {/* Back to Home */}
          {posts.length > 0 && (
            <div className="text-center mt-12">
              <a
                href="/"
                className="inline-flex items-center px-6 py-3 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                ← Back to All Articles
              </a>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}