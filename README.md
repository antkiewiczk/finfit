# FinFit Blog

A modern, high-performance blog built with Next.js 16 and React 19, focusing on personal finance and fitness content.

## Features

- **Next.js 16** with Turbopack for lightning-fast builds
- **React 19** with the latest features and optimizations
- **Tailwind CSS 4** for modern, responsive design
- **File-based Markdown** content management
- **Fuzzy search** powered by Fuse.js
- **Mobile-responsive** design with dark mode support
- **SEO optimized** with sitemap and robots.txt
- **Category filtering** for Finance and Fitness content
- **Social sharing** with next-share
- **Static Site Generation** for optimal performance
- **Tag system** for content organization

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Content**: Markdown with frontmatter
- **Search**: Fuse.js (client-side)
- **Sharing**: next-share
- **Build**: Turbopack (default in Next.js 16)

## 📁 Project Structure

```
├── src/app/                 # Next.js App Router
│   ├── layout.tsx           # Root layout with SEO
│   ├── page.tsx            # Homepage
│   ├── blog/[slug]/        # Dynamic blog posts
│   ├── categories/[category]/# Category pages
│   ├── api/search/          # Search API
│   ├── sitemap.ts          # Auto-generated sitemap
│   └── robots.ts           # SEO robots.txt
├── components/              # Reusable React components
│   ├── layout/             # Header, Footer
│   ├── blog/               # Blog-specific components
│   ├── search/             # Search components
│   └── ui/                # UI components
├── lib/                   # Utility functions
│   ├── content.ts          # Markdown processing
│   ├── search.ts           # Search functionality
│   └── utils.ts           # Helper functions
├── content/posts/          # Blog content
│   ├── finance/           # Finance articles
│   └── fitness/           # Fitness articles
└── public/               # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd finfit-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Adding Content

### Creating a Blog Post

1. **Create a new Markdown file** in `content/posts/finance/` or `content/posts/fitness/`
2. **Add frontmatter** at the top:

   ```markdown
   ---
   title: "Your Article Title"
   description: "A brief description for SEO and previews"
   date: "2026-01-20"
   category: "finance" # or "fitness"
   tags: ["budgeting", "savings", "money"]
   coverImage: "/images/posts/finance/your-image.webp"
   ---
   
   Your article content in Markdown...
   ```

3. **Write your content** using Markdown syntax
4. **Add images** to `public/images/posts/[category]/`
5. **Test locally** by running `npm run dev`

### Frontmatter Fields

- `title`: Article title (required)
- `description`: SEO description and preview text (required)
- `date`: Publication date in YYYY-MM-DD format (required)
- `category`: "finance" or "fitness" (required)
- `tags`: Array of topic tags (optional)
- `coverImage`: Path to cover image (optional)

## Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run type-check    # Run TypeScript checks
npm run preview      # Build and preview production
```

## Image Management

### Using Unsplash Images
The blog uses direct Unsplash CDN URLs for all images - no local storage or API keys needed!

#### How It Works
1. **Direct CDN URLs**: Each blog post uses a direct Unsplash image URL
2. **Automatic optimization**: Next.js Image component handles resizing and format conversion
3. **No setup required**: No API keys, no local storage, no caching needed

#### Available Scripts
```bash
# Update all blog posts with Unsplash URLs
npm run update-unsplash-images

# Get a list of Unsplash URLs for all posts
npm run get-unsplash-urls
```

#### Adding Images to New Posts
Simply add a `coverImage` field to your frontmatter with any Unsplash URL:
```markdown
---
title: "Your Article"
coverImage: "https://images.unsplash.com/photo-1234567890"
---
```

#### Image Optimization
- **Next.js Image component**: Automatic optimization and resizing
- **Responsive images**: Multiple sizes generated automatically
- **WebP/AVIF support**: Modern formats for better performance
- **Lazy loading**: Images load as needed
- **CDN caching**: Unsplash handles image delivery and caching

### Colors and Theme
Edit `src/app/globals.css` to customize:
- CSS variables for colors
- Theme configurations
- Typography styles

### Layout Components

Modify components in `components/layout/`:
- `Header.tsx`: Navigation and search
- `Footer.tsx`: Footer links and information

### Blog Styling

Update components in `components/blog/`:
- `BlogCard.tsx`: Post card appearance
- `CategoryFilter.tsx`: Sidebar styling

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Connect your GitHub repository
   - Vercel will auto-detect Next.js

3. **Deploy**
   - Vercel will build and deploy automatically
   - Your site will be live at `your-project.vercel.app`

### Custom Domain Setup

1. **Purchase a domain** from a registrar like Cloudflare, Namecheap, or Porkbun

2. **Add domain in Vercel**
   - Go to Project Settings → Domains
   - Add your custom domain

3. **Configure DNS**
   - **Apex domain (yourblog.com)**:
     ```
     Type: A
     Name: @
     Value: 76.76.19.19
     Type: AAAA
     Name: @
     Value: 2606:4700:4700::19
     ```
   
   - **Subdomain (www.yourblog.com)**:
     ```
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

4. **Verify SSL** (Vercel handles this automatically)

### Image Setup
Images are already configured! All blog posts use direct Unsplash CDN URLs.
No additional setup needed for deployment.

## SEO Features

- **Automatic sitemap** at `/sitemap.xml`
- **Robots.txt** at `/robots.txt`
- **Dynamic meta tags** for each post
- **Open Graph** and Twitter Card support
- **Structured data** for articles
- **Canonical URLs** for SEO

## Performance

- **Static Site Generation** for blog posts
- **Image optimization** with Next.js Image component
- **Code splitting** with Next.js
- **Turbopack** for faster builds
- **Core Web Vitals** optimization

## Testing

```bash
npm run lint         # Code quality
npm run type-check    # Type checking
npm run build        # Production build test
```

## Content Guidelines

### Finance Topics
- Budgeting and saving strategies
- Investment tips and advice
- Financial planning and retirement
- Debt management
- Tax optimization
- Side hustles and income streams

### Fitness Topics
- Workout routines (home and gym)
- Nutrition and meal planning
- Weight loss and muscle building
- Mental health and wellness
- Injury prevention and recovery

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions:
- Check existing [GitHub Issues](https://github.com/your-username/finfit-blog/issues)
- Create a new issue with detailed description
- Include steps to reproduce any bugs

---

Built with Next.js 16, React 19, and modern web technologies.