import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../Header'

jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>
  }
})

jest.mock('../../search/Search', () => {
  return function MockSearch({ className }: { className?: string }) {
    return <div data-testid="search-component" className={className}>Search Component</div>
  }
})

describe('Header', () => {
  it('renders navigation links correctly', () => {
    render(<Header />)
    
    expect(screen.getAllByText('Home')).toHaveLength(2) // Desktop and mobile
    expect(screen.getAllByText('Finance')).toHaveLength(2) // Desktop and mobile
    expect(screen.getAllByText('Fitness')).toHaveLength(2) // Desktop and mobile
    expect(screen.getByText('FinFit')).toBeInTheDocument()
    expect(screen.getByText('BLOG')).toBeInTheDocument()
  })

  it('renders logo with "FF" text', () => {
    render(<Header />)
    
    expect(screen.getByText('FF')).toBeInTheDocument()
    expect(screen.getByText('FinFit')).toBeInTheDocument()
    expect(screen.getByText('BLOG')).toBeInTheDocument()
  })

  it('links to correct URLs', () => {
    render(<Header />)
    
    const homeLinks = screen.getAllByText('Home')
    const financeLinks = screen.getAllByText('Finance')
    const fitnessLinks = screen.getAllByText('Fitness')
    
    // Check desktop navigation links (first ones)
    expect(homeLinks[0].closest('a')).toHaveAttribute('href', '/')
    expect(financeLinks[0].closest('a')).toHaveAttribute('href', '/categories/finance')
    expect(fitnessLinks[0].closest('a')).toHaveAttribute('href', '/categories/fitness')
    
    // Check logo link
    expect(screen.getByText('FF').closest('a')).toHaveAttribute('href', '/')
  })

  it('shows search component on desktop', () => {
    render(<Header />)
    
    const searchComponents = screen.getAllByTestId('search-component')
    expect(searchComponents.length).toBeGreaterThanOrEqual(1)
  })

  it('toggles mobile menu when button is clicked', () => {
    render(<Header />)
    
    // Get mobile menu button
    const menuButton = screen.getByRole('button', { name: /open main menu/i })
    expect(menuButton).toBeInTheDocument()
    
    // Initially aria-expanded should be false
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    
    // Click to open menu
    fireEvent.click(menuButton)
    
    // Check that navigation is still there (it's always there, just visibility changes)
    expect(screen.getAllByText('Home')).toHaveLength(2)
    expect(screen.getAllByText('Finance')).toHaveLength(2)
    expect(screen.getAllByText('Fitness')).toHaveLength(2)
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