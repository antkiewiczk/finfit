import { NextRequest, NextResponse } from 'next/server'
import { searchPosts } from '@/lib/search'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''

  try {
    const posts = await searchPosts(query)
    
    return NextResponse.json({
      success: true,
      posts,
      query,
      count: posts.length
    })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to search posts',
        posts: [],
        query,
        count: 0
      },
      { status: 500 }
    )
  }
}