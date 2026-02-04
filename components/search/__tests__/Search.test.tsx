import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import Search from '../Search'

const mockPosts = [
  {
    slug: 'finance/test-post',
    title: 'Test Finance Post',
    description: 'A test post about finance',
    date: '2026-01-20',
    category: 'finance' as const,
    tags: ['budgeting', 'saving'],
    readingTime: '5 min read',
  },
  {
    slug: 'fitness/test-workout',
    title: 'Test Workout Post',
    description: 'A test post about fitness',
    date: '2026-01-21',
    category: 'fitness' as const,
    tags: ['exercise', 'health'],
    readingTime: '3 min read',
  }
]

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

global.fetch = jest.fn()

describe('Search', () => {
  const mockPush = jest.fn()
  const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
    } as any)
    
    jest.clearAllMocks()
  })

  it('renders search input correctly', () => {
    render(<Search />)
    
    expect(screen.getByPlaceholderText('Search articles...')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('shows loading spinner while searching', async () => {
    const mockFetch = (global.fetch as jest.Mock).mockImplementation(() =>
      new Promise(resolve => setTimeout(() => resolve({
        json: () => Promise.resolve({ posts: mockPosts })
      }), 100))
    )

    render(<Search />)
    
    const input = screen.getByPlaceholderText('Search articles...')
    await userEvent.type(input, 'test')
    
    // Wait for dropdown to open and loading to show
    await waitFor(() => {
      expect(screen.getByText('Searching...')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.queryByText('Searching...')).not.toBeInTheDocument()
    })

    mockFetch.mockRestore()
  })

  it('displays search results', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({ posts: mockPosts })
    })

    render(<Search />)
    
    const input = screen.getByPlaceholderText('Search articles...')
    await userEvent.type(input, 'test')
    
    await waitFor(() => {
      expect(screen.getByText('Test Finance Post')).toBeInTheDocument()
      expect(screen.getByText('Test Workout Post')).toBeInTheDocument()
      expect(screen.getByText('A test post about finance')).toBeInTheDocument()
      expect(screen.getByText('A test post about fitness')).toBeInTheDocument()
    })
  })

  it('shows no results message when no posts found', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({ posts: [] })
    })

    render(<Search />)
    
    const input = screen.getByPlaceholderText('Search articles...')
    await userEvent.type(input, 'nonexistent')
    
    await waitFor(() => {
      expect(screen.getByText('No articles found for "nonexistent"')).toBeInTheDocument()
    })
  })

  it('navigates to post when result is clicked', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({ posts: mockPosts })
    })

    render(<Search />)
    
    const input = screen.getByPlaceholderText('Search articles...')
    await userEvent.type(input, 'test')
    
    await waitFor(() => {
      expect(screen.getByText('Test Finance Post')).toBeInTheDocument()
    })
    
    await userEvent.click(screen.getByText('Test Finance Post'))
    
    expect(mockPush).toHaveBeenCalledWith('/blog/finance/test-post')
  })

  it('clears search after clicking result', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({ posts: mockPosts })
    })

    render(<Search />)
    
    const input = screen.getByPlaceholderText('Search articles...')
    await userEvent.type(input, 'test')
    
    await waitFor(() => {
      expect(screen.getByText('Test Finance Post')).toBeInTheDocument()
    })
    
    await userEvent.click(screen.getByText('Test Finance Post'))
    
    expect(input).toHaveValue('')
  })

  it('closes dropdown when clicking outside', async () => {
    render(<Search />)
    
    const input = screen.getByPlaceholderText('Search articles...')
    await userEvent.type(input, 'test')
    
    // Dropdown should be open
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    
    // Click outside
    fireEvent.mouseDown(document.body)
    
    // Dropdown should close (results should disappear)
    await waitFor(() => {
      expect(screen.queryByText('Test Finance Post')).not.toBeInTheDocument()
    })
  })

  it('debounces search requests', async () => {
    const mockFetch = (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({ posts: [] })
    })

    render(<Search />)
    
    const input = screen.getByPlaceholderText('Search articles...')
    await userEvent.type(input, 'test', { delay: 10 })
    
    // Should only call fetch once after debounce
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/search?q=test')
    )

    mockFetch.mockRestore()
  })
})