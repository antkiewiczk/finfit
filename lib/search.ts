import Fuse from 'fuse.js'
import { PostMetadata } from './content'

interface SearchResult {
  item: PostMetadata
  refIndex: number
  score?: number
}

export async function searchPosts(query: string): Promise<PostMetadata[]> {
  if (!query.trim()) {
    return []
  }

  const posts = await getAllPosts()
  
  const fuse = new Fuse(posts, {
    keys: [
      {
        name: 'title',
        weight: 0.4
      },
      {
        name: 'description',
        weight: 0.3
      },
      {
        name: 'tags',
        weight: 0.2
      },
      {
        name: 'category',
        weight: 0.1
      }
    ],
    threshold: 0.4,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
    ignoreLocation: true,
    shouldSort: true,
    findAllMatches: true
  })

  const results = fuse.search(query) as SearchResult[]
  
  return results.map(result => ({
    ...result.item,
    score: result.score
  }))
}

async function getAllPosts(): Promise<PostMetadata[]> {
  // Import dynamically to avoid circular dependencies
  const { getAllPosts: getPosts } = await import('./content')
  return getPosts()
}