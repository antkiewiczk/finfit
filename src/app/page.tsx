import { getAllPosts, getCategories } from '@/lib/content'
import BlogCard from '@/components/blog/BlogCard'
import CategoryFilter from '@/components/blog/CategoryFilter'

export default async function Home() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getCategories()
  ])

  const featuredPosts = posts.slice(0, 6)
  const totalPosts = posts.length

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Personal Finance & Fitness Insights
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Your trusted resource for building wealth and health. Expert advice on budgeting, 
          investing, workouts, and nutrition to help you live your best life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="text-center p-6 bg-gradient-to-br from-background to-accent border rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-foreground mb-2">{totalPosts}</div>
          <div className="text-muted-foreground">Articles Published</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-background to-accent border rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-foreground mb-2">
            {categories.find(c => c.name === 'finance')?.count || 0}
          </div>
          <div className="text-muted-foreground">Finance Articles</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-background to-accent border rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-foreground mb-2">
            {categories.find(c => c.name === 'fitness')?.count || 0}
          </div>
          <div className="text-muted-foreground">Fitness Articles</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <CategoryFilter categories={categories} />
        </aside>

        <main className="lg:col-span-3">
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Featured Articles</h2>
              <div className="text-sm text-muted-foreground">
                Showing {featuredPosts.length} of {totalPosts} articles
              </div>
            </div>

            {featuredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No articles yet
                </h3>
                <p className="text-muted-foreground">
                  Check back soon for new content about personal finance and fitness!
                </p>
              </div>
            )}
          </section>

          {totalPosts > 6 && (
            <div className="text-center">
              <a
                href="/all-posts"
                className="inline-flex items-center px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors"
              >
                View All Articles ({totalPosts - 6} more)
              </a>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}