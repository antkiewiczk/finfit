import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-6xl mb-4">📄</div>
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Article Not Found
        </h2>
        <p className="text-muted-foreground mb-8">
          The blog post you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/categories/finance"
            className="inline-flex items-center px-6 py-3 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Browse Finance Articles
          </Link>
          <Link
            href="/categories/fitness"
            className="inline-flex items-center px-6 py-3 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Browse Fitness Articles
          </Link>
        </div>
      </div>
    </div>
  )
}