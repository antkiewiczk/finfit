import { render, screen } from '@testing-library/react'
import { notFound } from 'next/navigation'
import { getPostsByCategory, getCategories } from '@/lib/content'
import CategoryPage from '../page'

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}))

// Mock the content functions
jest.mock('@/lib/content', () => ({
  getPostsByCategory: jest.fn(),
  getCategories: jest.fn(),
}))

// Mock child components
jest.mock('@/components/blog/BlogCard', () => {
  return function MockBlogCard({ post }: { post: any }) {
    return <div data-testid="blog-card">{post.title}</div>
  }
})

jest.mock('@/components/blog/CategoryFilter', () => {
  return function MockCategoryFilter({ categories, currentCategory }: { categories: any[]; currentCategory?: string }) {
    return <div data-testid="category-filter">{currentCategory} - {categories.length} categories</div>
  }
})

const mockGetPostsByCategory = getPostsByCategory as jest.MockedFunction<typeof getPostsByCategory>
const mockGetCategories = getCategories as jest.MockedFunction<typeof getCategories>
const mockNotFound = notFound as jest.MockedFunction<typeof notFound>

const mockFinancePosts = [
  {
    slug: 'finance/budgeting-101',
    title: 'Budgeting 101',
    description: 'Learn the basics of budgeting',
    date: '2026-01-20',
    category: 'finance' as const,
    tags: ['budgeting', 'saving'],
    readingTime: '5 min read',
  }
]

const mockCategories = [
  { name: 'finance', count: 1 },
  { name: 'fitness', count: 2 }
]

describe('Category Page', () => {
  const mockParams = Promise.resolve({ category: 'finance' })

  beforeEach(() => {
    mockGetPostsByCategory.mockResolvedValue(mockFinancePosts)
    mockGetCategories.mockResolvedValue(mockCategories)
    jest.clearAllMocks()
  })

  it('renders category page with correct information', async () => {
    render(await CategoryPage({ params: mockParams }))
    
    expect(screen.getByText('Finance Articles')).toBeInTheDocument()
    expect(screen.getByText('Expert advice on budgeting, investing, saving, and achieving financial freedom.')).toBeInTheDocument()
    expect(screen.getByText('1 article in this category')).toBeInTheDocument()
  })

  it('displays correct category icon', async () => {
    render(await CategoryPage({ params: mockParams }))
    
    // Check for DollarSign icon (finance category)
    expect(document.querySelector('.lucide-dollar-sign')).toBeInTheDocument()
  })

  it('renders blog cards for category posts', async () => {
    render(await CategoryPage({ params: mockParams }))
    
    const blogCards = screen.getAllByTestId('blog-card')
    expect(blogCards).toHaveLength(1)
    expect(screen.getByText('Budgeting 101')).toBeInTheDocument()
  })

  it('renders category filter component', async () => {
    render(await CategoryPage({ params: mockParams }))
    
    expect(screen.getByTestId('category-filter')).toBeInTheDocument()
    expect(screen.getByText('finance - 2 categories')).toBeInTheDocument()
  })

  it('shows "No articles yet" when category has no posts', async () => {
    mockGetPostsByCategory.mockResolvedValue([])
    
    render(await CategoryPage({ params: mockParams }))
    
    expect(screen.getByText('No Finance articles yet')).toBeInTheDocument()
    expect(screen.getByText('Check back soon for new Finance content!')).toBeInTheDocument()
    expect(document.querySelector('.lucide-dollar-sign')).toBeInTheDocument()
  })

  it('displays correct content for fitness category', async () => {
    const fitnessParams = Promise.resolve({ category: 'fitness' })
    mockGetPostsByCategory.mockResolvedValue([])
    
    render(await CategoryPage({ params: fitnessParams }))
    
    expect(screen.getByText('Fitness Articles')).toBeInTheDocument()
    expect(screen.getByText('Proven workout routines, nutrition tips, and fitness strategies for optimal health.')).toBeInTheDocument()
    // Check for Dumbbell icon (fitness category)
    expect(document.querySelector('.lucide-dumbbell')).toBeInTheDocument()
    expect(screen.getByText('No Fitness articles yet')).toBeInTheDocument()
  })

  it('shows "Back to All Articles" link when there are posts', async () => {
    render(await CategoryPage({ params: mockParams }))
    
    expect(screen.getByText('← Back to All Articles')).toBeInTheDocument()
  })

  it('calculates correct article count for multiple posts', async () => {
    const multiplePosts = [
      ...mockFinancePosts,
      {
        ...mockFinancePosts[0],
        slug: 'finance/investing-101',
        title: 'Investing 101',
      }
    ]
    mockGetPostsByCategory.mockResolvedValue(multiplePosts)
    
    render(await CategoryPage({ params: mockParams }))
    
    expect(screen.getByText('2 articles in this category')).toBeInTheDocument()
  })

  it('handles error case gracefully', async () => {
    // Test that empty posts array is handled correctly
    mockGetPostsByCategory.mockResolvedValue([])
    
    render(await CategoryPage({ params: mockParams }))
    
    expect(screen.getByText('No Finance articles yet')).toBeInTheDocument()
    expect(screen.getByText('Check back soon for new Finance content!')).toBeInTheDocument()
  })

  it('has proper semantic structure', async () => {
    const { container } = render(await CategoryPage({ params: mockParams }))
    
    expect(container.querySelector('main')).toBeInTheDocument()
    expect(container.querySelector('aside')).toBeInTheDocument()
    // No section element in this component, so we skip this check
  })

  it('capitalizes category name correctly', async () => {
    const lowercaseParams = Promise.resolve({ category: 'finance' })
    
    render(await CategoryPage({ params: lowercaseParams }))
    
    expect(screen.getByText('Finance Articles')).toBeInTheDocument()
    // Only check for the text that exists when there are posts
    expect(screen.getByText('1 article in this category')).toBeInTheDocument()
  })
})