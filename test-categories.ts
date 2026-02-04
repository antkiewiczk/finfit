import { getAllPosts, getPostsByCategory } from './lib/content'

async function testCategories() {
  try {
    console.log('Testing getAllPosts...')
    const allPosts = await getAllPosts()
    console.log('All posts found:', allPosts.length)
    allPosts.forEach(post => {
      console.log(`  - ${post.slug} (${post.category}): ${post.title}`)
    })
    
    console.log('\nTesting finance posts...')
    const financePosts = await getPostsByCategory('finance')
    console.log('Finance posts found:', financePosts.length)
    financePosts.forEach(post => {
      console.log(`  - ${post.slug}: ${post.title}`)
    })
    
    console.log('\nTesting fitness posts...')
    const fitnessPosts = await getPostsByCategory('fitness')
    console.log('Fitness posts found:', fitnessPosts.length)
    fitnessPosts.forEach(post => {
      console.log(`  - ${post.slug}: ${post.title}`)
    })
  } catch (error) {
    console.error('Error:', error)
  }
}

testCategories()