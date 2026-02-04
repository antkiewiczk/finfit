import fs from 'fs'
import path from 'path'

// Simple test to see if the category page params are working
console.log('Current working directory:', process.cwd())
console.log('Posts directory:', path.join(process.cwd(), 'content', 'posts'))

// Check if files exist
const postsDir = path.join(process.cwd(), 'content', 'posts')
const financePost = path.join(postsDir, 'finance', 'budgeting-tips-2026.md')
const fitnessPost = path.join(postsDir, 'fitness', 'build-muscle-home.md')

console.log('Finance post exists:', fs.existsSync(financePost))
console.log('Fitness post exists:', fs.existsSync(fitnessPost))

if (fs.existsSync(financePost)) {
  const content = fs.readFileSync(financePost, 'utf8')
  const lines = content.split('\n').slice(0, 10)
  console.log('Finance post preview:', lines)
}