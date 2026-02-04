import Link from 'next/link'
import Image from 'next/image'
import { addParamsToImage, formatDate } from '@/lib/utils'
import type { PostMetadata } from '@/lib/content'

interface BlogCardProps {
  post: PostMetadata
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group relative bg-background border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-accent/20">
      <Link href={`/blog/${post.slug}`} className="block">
        {post.coverImage && (
          <div className="aspect-video relative overflow-hidden bg-muted">
            <Image
              src={addParamsToImage(post.coverImage)}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              post.category === 'finance' 
                ? 'bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 dark:from-teal-900 dark:to-cyan-900 dark:text-teal-200'
                : 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 dark:from-emerald-900 dark:to-green-900 dark:text-emerald-200'
            }`}>
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </span>
            <time className="text-xs text-muted-foreground">
              {formatDate(post.date)}
            </time>
          </div>

          <h3 className="text-xl font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent-foreground transition-colors">
            {post.title}
          </h3>

          <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
            {post.description}
          </p>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="inline-block px-2 py-1 text-xs bg-muted text-muted-foreground rounded">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{post.readingTime}</span>
            <span className="text-accent-foreground group-hover:translate-x-1 transition-transform">
              Read more →
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}