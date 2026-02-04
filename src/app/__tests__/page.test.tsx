import { render, screen } from '@testing-library/react'
import { getAllPosts, getCategories } from '@/lib/content'
import Home from '../page'

// Mock the content functions
jest.mock('@/lib/content', () => ({
  getAllPosts: jest.fn(),
  getCategories: jest.fn(),
}))

// Mock child components
jest.mock('@/components/blog/BlogCard', () => {
  return function MockBlogCard({ post }: { post: any }) {
    return <div data-testid="blog-card">{post.title}</div>
  }
})

jest.mock('@/components/blog/CategoryFilter', () => {
  return function MockCategoryFilter({ categories }: { categories: any[] }) {
    return <div data-testid="category-filter">{categories.length} categories</div>
  }
})

const mockGetAllPosts = getAllPosts as jest.MockedFunction<typeof getAllPosts>
const mockGetCategories = getCategories as jest.MockedFunction<typeof getCategories>

const mockPosts = [
  {
    slug: 'finance/budgeting-101',
    title: 'Budgeting 101',
    description: 'Learn the basics of budgeting',
    date: '2026-01-20',
    category: 'finance' as const,
    tags: ['budgeting', 'saving'],
    readingTime: '5 min read',
  },
  {
    slug: 'fitness/home-workout',
    title: 'Home Workout Guide',
    description: 'Effective exercises you can do at home',
    date: '2026-01-21',
    category: 'fitness' as const,
    tags: ['exercise', 'health'],
    readingTime: '3 min read',
  }
]

const mockCategories = [
  { name: 'finance', count: 1 },
  { name: 'fitness', count: 1 }
]

describe('Home Page', () => {
  beforeEach(() => {
    mockGetAllPosts.mockResolvedValue(mockPosts)
    mockGetCategories.mockResolvedValue(mockCategories)
  })

  it('renders the main heading and description', async () => {
    const { container } = render(await Home())
    
    expect(screen.getByText('Personal Finance & Fitness Insights')).toBeInTheDocument()
    expect(screen.getByText('Your trusted resource for building wealth and health. Expert advice on budgeting, investing, workouts, and nutrition to help you live your best life.')).toBeInTheDocument()
  })

  it('displays correct statistics', async () => {
    render(await Home())
    
    const ones = screen.getAllByText('1')
    expect(ones).toHaveLength(2) // Finance and Fitness articles
    expect(screen.getByText('2')).toBeInTheDocument() // Total articles
  })

  it('shows featured articles section', async () => {
    render(await Home())
    
    expect(screen.getByText('Featured Articles')).toBeInTheDocument()
    expect(screen.getByText('Showing 2 of 2 articles')).toBeInTheDocument()
  })

  it('renders blog cards for featured posts', async () => {
    render(await Home())
    
    const blogCards = screen.getAllByTestId('blog-card')
    expect(blogCards).toHaveLength(2)
    expect(screen.getByText('Budgeting 101')).toBeInTheDocument()
  })

  it('renders category filter component', async () => {
    render(await Home())
    
    expect(screen.getByTestId('category-filter')).toBeInTheDocument()
    expect(screen.getByText('2 categories')).toBeInTheDocument()
  })

  it('displays "View All Articles" link when more than 6 posts', async () => {
    const manyPosts = Array.from({ length: 8 }, (_, i) => ({
      ...mockPosts[0],
      slug: `finance/post-${i}`,
      title: `Post ${i}`,
    }))
    mockGetAllPosts.mockResolvedValue(manyPosts)
    
    render(await Home())
    
    expect(screen.getByText('View All Articles (2 more)')).toBeInTheDocument()
  })

  it('shows "No articles yet" when there are no posts', async () => {
    mockGetAllPosts.mockResolvedValue([])
    mockGetCategories.mockResolvedValue([])
    
    render(await Home())
    
    expect(screen.getByText('No articles yet')).toBeInTheDocument()
    expect(screen.getByText('Check back soon for new content about personal finance and fitness!')).toBeInTheDocument()
  })

  it('calculates category counts correctly', async () => {
    const categoriesWithCounts = [
      { name: 'finance', count: 5 },
      { name: 'fitness', count: 3 }
    ]
    mockGetCategories.mockResolvedValue(categoriesWithCounts)
    
    render(await Home())
    
    expect(screen.getByText('5')).toBeInTheDocument() // Finance articles
    expect(screen.getByText('3')).toBeInTheDocument() // Fitness articles
  })

  it('limits featured posts to 6 when there are more posts', async () => {
    const manyPosts = Array.from({ length: 10 }, (_, i) => ({
      ...mockPosts[0],
      slug: `finance/post-${i}`,
      title: `Post ${i}`,
    }))
    mockGetAllPosts.mockResolvedValue(manyPosts)
    
    render(await Home())
    
    expect(screen.getByText('Showing 6 of 10 articles')).toBeInTheDocument()
  })

  it('has proper semantic structure', async () => {
    const { container } = render(await Home())
    
    expect(container.querySelector('main')).toBeInTheDocument()
    expect(container.querySelector('aside')).toBeInTheDocument()
    expect(container.querySelector('section')).toBeInTheDocument()
  })
})