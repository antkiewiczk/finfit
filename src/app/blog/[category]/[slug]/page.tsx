import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/lib/content";
import { addParamsToImage, formatDate } from "@/lib/utils";
import SocialShare from "@/components/blog/SocialShare";
import Link from "next/link";

interface BlogPostPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => {
    const [category, slug] = post.slug.split("/");
    return {
      category,
      slug,
    };
  });
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const fullSlug = `${category}/${slug}`;
  const post = await getPostBySlug(fullSlug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags.join(", "),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["FinFit Blog"],
      images: post.coverImage ? [post.coverImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { category, slug } = await params;
  const fullSlug = `${category}/${slug}`;
  const post = await getPostBySlug(fullSlug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <nav className="text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2">/</span>
            <a
              href={`/categories/${post.category}`}
              className="hover:text-foreground"
            >
              {post.category}
            </a>
            <span className="mx-2">/</span>
            <span>{post.title}</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                post.category === "finance"
                  ? "bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 dark:from-teal-900 dark:to-cyan-900 dark:text-teal-200"
                  : "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 dark:from-emerald-900 dark:to-green-900 dark:text-emerald-200"
              }`}
            >
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </span>
            <time className="text-sm text-muted-foreground">
              {formatDate(post.date)}
            </time>
            <span className="text-sm text-muted-foreground">
              {post.readingTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {post.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-6">
            {post.description}
          </p>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {post.coverImage && (
          <div className="mb-8 relative aspect-video md:aspect-[21/9] rounded-lg overflow-hidden">
            <Image
              src={addParamsToImage(post.coverImage)}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />
          </div>
        )}

        <div
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="border-t pt-8">
          <div className="flex items-center justify-between mb-8">
            <div className="text-muted-foreground">
              Published on {formatDate(post.date)} • {post.readingTime}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Share this article
            </h3>
            <SocialShare
              url={`https://finfit.blog/blog/${post.slug}`}
              title={post.title}
              description={post.description}
            />
          </div>
        </footer>

        {relatedPosts.length > 0 && (
          <section className="border-t pt-12">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <div
                  key={post.slug}
                  className="bg-background border rounded-lg p-6"
                >
                  <div
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mb-3 ${
                      post.category === "finance"
                        ? "bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 dark:from-teal-900 dark:to-cyan-900 dark:text-teal-200"
                        : "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 dark:from-emerald-900 dark:to-green-900 dark:text-emerald-200"
                    }`}
                  >
                    {post.category}
                  </div>
                  <h4 className="font-semibold text-foreground mb-2 line-clamp-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-accent-foreground transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {post.description}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(post.date)} • {post.readingTime}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
