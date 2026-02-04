import { getAllPosts, getCategories } from "@/lib/content";
import BlogCard from "@/components/blog/BlogCard";
import CategoryFilter from "@/components/blog/CategoryFilter";
import Link from "next/link";

export default async function AllPosts() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getCategories(),
  ]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          All Articles
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Browse our complete collection of personal finance and fitness
          articles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="text-center p-6 bg-gradient-to-br from-background to-accent border rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-foreground mb-2">
            {posts.length}
          </div>
          <div className="text-muted-foreground">Total Articles</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-background to-accent border rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-foreground mb-2">
            {categories.find((c) => c.name === "finance")?.count || 0}
          </div>
          <div className="text-muted-foreground">Finance Articles</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-background to-accent border rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-foreground mb-2">
            {categories.find((c) => c.name === "fitness")?.count || 0}
          </div>
          <div className="text-muted-foreground">Fitness Articles</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <CategoryFilter categories={categories} />
        </aside>

        <main className="lg:col-span-3">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                All Articles
              </h2>
              <div className="text-sm text-muted-foreground">
                Showing {posts.length} articles
              </div>
            </div>

            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
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
                  Check back soon for new content about personal finance and
                  fitness!
                </p>
              </div>
            )}
          </section>

          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
