import { getPostsByCategory } from '@/lib/content'

export async function GET() {
  try {
    const financePosts = await getPostsByCategory('finance')
    const fitnessPosts = await getPostsByCategory('fitness')
    
    return Response.json({
      finance: {
        count: financePosts.length,
        posts: financePosts.map(p => ({ slug: p.slug, title: p.title, category: p.category }))
      },
      fitness: {
        count: fitnessPosts.length,
        posts: fitnessPosts.map(p => ({ slug: p.slug, title: p.title, category: p.category }))
      }
    })
  } catch (error) {
    console.error('Debug API error:', error)
    return Response.json({ error: 'Failed to load categories' }, { status: 500 })
  }
}