import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import readingTime from 'reading-time'

export interface Post {
  slug: string
  title: string
  description: string
  date: string
  category: 'finance' | 'fitness'
  tags: string[]
  content: string
  readingTime: string
  coverImage?: string
}

export interface PostMetadata {
  slug: string
  title: string
  description: string
  date: string
  category: 'finance' | 'fitness'
  tags: string[]
  readingTime: string
  coverImage?: string
}

const postsDirectory = path.join(process.cwd(), 'content', 'posts')

function getPostSlugs(category?: string): string[] {
  const categoryPath = category ? path.join(postsDirectory, category) : postsDirectory
  
  if (!fs.existsSync(categoryPath)) {
    return []
  }

  const slugs: string[] = []
  
  function findFilesRecursively(dir: string, basePath: string = ''): void {
    const items = fs.readdirSync(dir)
    
    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        // Recursively search subdirectories
        const relativePath = basePath ? path.join(basePath, item) : item
        findFilesRecursively(fullPath, relativePath)
      } else if (item.endsWith('.md')) {
        // Found a markdown file
        const relativePath = path.relative(postsDirectory, fullPath)
        const slug = relativePath.replace('.md', '')
        slugs.push(slug)
      }
    }
  }
  
  findFilesRecursively(categoryPath)
  return slugs
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, `${realSlug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(content)

    const readingStats = readingTime(content)
    const category = realSlug.includes('/') ? realSlug.split('/')[0] as 'finance' | 'fitness' : 'finance'

    return {
      slug: realSlug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      category,
      tags: data.tags || [],
      content: processedContent.toString(),
      readingTime: readingStats.text,
      coverImage: data.coverImage
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export async function getAllPosts(): Promise<PostMetadata[]> {
  const slugs = getPostSlugs()
  const posts: PostMetadata[] = []

  for (const slug of slugs) {
    const post = await getPostBySlug(slug)
    if (post) {
      posts.push({
        slug: post.slug,
        title: post.title,
        description: post.description,
        date: post.date,
        category: post.category,
        tags: post.tags,
        readingTime: post.readingTime,
        coverImage: post.coverImage
      })
    }
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostsByCategory(category: 'finance' | 'fitness'): Promise<PostMetadata[]> {
  const posts = await getAllPosts()
  return posts.filter(post => post.category === category)
}

export async function getCategories(): Promise<{ name: string; count: number }[]> {
  const posts = await getAllPosts()
  const categories = ['finance', 'fitness']
  
  return categories.map(category => ({
    name: category,
    count: posts.filter(post => post.category === category).length
  }))
}

export async function getRelatedPosts(currentPost: Post, limit = 3): Promise<PostMetadata[]> {
  const posts = await getAllPosts()
  const currentTags = currentPost.tags

  const relatedPosts = posts
    .filter(post => post.slug !== currentPost.slug)
    .filter(post => 
      post.category === currentPost.category ||
      post.tags.some(tag => currentTags.includes(tag))
    )
    .sort((a, b) => {
      const aScore = (a.category === currentPost.category ? 2 : 0) + 
                   a.tags.filter(tag => currentTags.includes(tag)).length
      const bScore = (b.category === currentPost.category ? 2 : 0) + 
                   b.tags.filter(tag => currentTags.includes(tag)).length
      return bScore - aScore
    })
    .slice(0, limit)

  return relatedPosts
}