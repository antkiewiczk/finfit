import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>
  }
})

describe('Footer', () => {
  it('renders all footer sections correctly', () => {
    render(<Footer />)
    
    // Brand section
    expect(screen.getByText('FF')).toBeInTheDocument()
    expect(screen.getByText('FinFit Blog')).toBeInTheDocument()
    expect(screen.getByText('Your trusted source for personal finance and fitness insights. Helping you build wealth and health, one article at a time.')).toBeInTheDocument()
    
    // Categories section
    expect(screen.getByText('Categories')).toBeInTheDocument()
    expect(screen.getByText('Personal Finance')).toBeInTheDocument()
    expect(screen.getByText('Fitness & Health')).toBeInTheDocument()
    
    // Legal section
    expect(screen.getByText('Legal')).toBeInTheDocument()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
    
    // Copyright
    expect(screen.getByText(`© ${new Date().getFullYear()} FinFit Blog. All rights reserved.`)).toBeInTheDocument()
  })

  it('links to correct URLs', () => {
    render(<Footer />)
    
    expect(screen.getByText('FF').closest('a')).toHaveAttribute('href', '/')
    expect(screen.getByText('Personal Finance').closest('a')).toHaveAttribute('href', '/categories/finance')
    expect(screen.getByText('Fitness & Health').closest('a')).toHaveAttribute('href', '/categories/fitness')
    expect(screen.getByText('Privacy Policy').closest('a')).toHaveAttribute('href', '/privacy')
    expect(screen.getByText('Terms of Service').closest('a')).toHaveAttribute('href', '/terms')
  })

  it('uses correct logo text "FF"', () => {
    render(<Footer />)
    
    const logo = screen.getByText('FF')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveClass('bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-100')
  })

  it('displays current year in copyright', () => {
    render(<Footer />)
    
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(`© ${currentYear} FinFit Blog. All rights reserved.`)).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    const { container } = render(<Footer />)
    
    expect(container.querySelector('footer')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})