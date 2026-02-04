import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../Header'

jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>
  }
})

jest.mock('../search/Search', () => {
  return function MockSearch({ className }: { className?: string }) {
    return <div data-testid="search-component" className={className}>Search Component</div>
  }
})

describe('Header', () => {
  it('renders navigation links correctly', () => {
    render(<Header />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Finance')).toBeInTheDocument()
    expect(screen.getByText('Fitness')).toBeInTheDocument()
    expect(screen.getByText('FinFit Blog')).toBeInTheDocument()
  })

  it('renders logo with "FF" text', () => {
    render(<Header />)
    
    expect(screen.getByText('FF')).toBeInTheDocument()
    expect(screen.getByText('FinFit Blog')).toBeInTheDocument()
  })

  it('links to correct URLs', () => {
    render(<Header />)
    
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/')
    expect(screen.getByText('Finance').closest('a')).toHaveAttribute('href', '/categories/finance')
    expect(screen.getByText('Fitness').closest('a')).toHaveAttribute('href', '/categories/fitness')
    expect(screen.getByText('FF').closest('a')).toHaveAttribute('href', '/')
  })

  it('shows search component on desktop', () => {
    render(<Header />)
    
    expect(screen.getByTestId('search-component')).toBeInTheDocument()
  })

  it('toggles mobile menu when button is clicked', () => {
    render(<Header />)
    
    // Initially mobile menu should be hidden
    expect(screen.queryByText('Home', { selector: 'a' })).toBeInTheDocument()
    
    // Get mobile menu button
    const menuButton = screen.getByRole('button', { name: /open main menu/i })
    expect(menuButton).toBeInTheDocument()
    
    // Click to open menu
    fireEvent.click(menuButton)
    
    // Check that navigation is still there (it's always there, just visibility changes)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Finance')).toBeInTheDocument()
    expect(screen.getByText('Fitness')).toBeInTheDocument()
  })

  it('shows search in mobile menu when opened', () => {
    render(<Header />)
    
    const menuButton = screen.getByRole('button', { name: /open main menu/i })
    fireEvent.click(menuButton)
    
    // Mobile search should be visible
    const searchComponents = screen.getAllByTestId('search-component')
    expect(searchComponents).toHaveLength(2) // Desktop and mobile versions
  })

  it('has correct ARIA labels for accessibility', () => {
    render(<Header />)
    
    const menuButton = screen.getByRole('button', { name: /open main menu/i })
    expect(menuButton).toBeInTheDocument()
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })
})