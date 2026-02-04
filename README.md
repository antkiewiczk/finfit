# FinFit Blog

A modern blog built with Next.js 16 and React 19, focusing on personal finance and fitness content.

## Features

- Next.js 16 with Turbopack
- React 19 with latest optimizations
- Tailwind CSS 4 for responsive design
- Markdown content management
- Fuzzy search with Fuse.js
- Mobile-responsive with dark mode
- SEO optimized with sitemap
- Category filtering (Finance/Fitness)
- Static Site Generation

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Content**: Markdown with frontmatter
- **Search**: Fuse.js
- **Build**: Turbopack

## Getting Started

```bash
git clone <repository-url>
cd finfit-blog
npm install
npm run dev
```

Open http://localhost:3000 to view.

## Adding Content

Create Markdown files in `content/posts/finance/` or `content/posts/fitness/` with frontmatter:

```markdown
---
title: "Your Article Title"
description: "SEO description"
date: "2026-01-20"
category: "finance" # or "fitness"
tags: ["budgeting", "savings"]
coverImage: "https://images.unsplash.com/photo-1234567890"
---

Your article content in Markdown...
```

## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
npm run type-check   # TypeScript checks
npm run update-unsplash-images  # Update images
```

## Deployment

Deploy to Vercel:

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

1. Visit [vercel.com](https://vercel.com)
2. Click "New Project" 
3. Connect GitHub repository
4. Vercel auto-detects Next.js and deploys

## Live Demo

**https://finfit-swart.vercel.app/**

- 21 blog posts with Unsplash images
- Next.js 16 + React 19
- Mobile responsive
- SEO optimized

## Contributing

1. Fork repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## License

MIT License