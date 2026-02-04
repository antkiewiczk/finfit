import { render, screen, fireEvent } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import CategoryFilter from '../CategoryFilter'
import type { PostMetadata } from '@/lib/content'

const mockCategories = [
  { name: 'finance', count: 5 },
  { name: 'fitness', count: 3 }
]

jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>
  }
})

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

describe('CategoryFilter', () => {
  const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>

  beforeEach(() => {
    mockUsePathname.mockReturnValue('/')
  })

  it('renders category list correctly', () => {
    render(<CategoryFilter categories={mockCategories} />)
    
    expect(screen.getByText('Categories')).toBeInTheDocument()
    expect(screen.getByText('All Posts')).toBeInTheDocument()
    expect(screen.getByText('Finance')).toBeInTheDocument()
    expect(screen.getByText('Fitness')).toBeInTheDocument()
  })

  it('displays correct post counts', () => {
    render(<CategoryFilter categories={mockCategories} />)
    
    expect(screen.getByText('8')).toBeInTheDocument() // All posts
    expect(screen.getByText('5')).toBeInTheDocument() // Finance posts
    expect(screen.getByText('3')).toBeInTheDocument() // Fitness posts
  })

  it('links to correct URLs', () => {
    render(<CategoryFilter categories={mockCategories} />)
    
    expect(screen.getByText('All Posts').closest('a')).toHaveAttribute('href', '/')
    expect(screen.getByText('Finance').closest('a')).toHaveAttribute('href', '/categories/finance')
    expect(screen.getByText('Fitness').closest('a')).toHaveAttribute('href', '/categories/fitness')
  })
})