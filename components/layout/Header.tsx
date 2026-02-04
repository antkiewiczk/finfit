'use client'

import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import Search from '@/components/search/Search'
import Logo from './Logo'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-foreground hover:text-foreground/80 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/categories/finance" 
              className="text-foreground hover:text-foreground/80 transition-colors"
            >
              Finance
            </Link>
            <Link 
              href="/categories/fitness" 
              className="text-foreground hover:text-foreground/80 transition-colors"
            >
              Fitness
            </Link>
          </nav>

          <div className="hidden md:block w-64">
            <Search />
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className={cn(
          "md:hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}>
          <nav className="py-2 space-y-1">
            <div className="px-3 py-2">
              <Search />
            </div>
            <Link 
              href="/" 
              className="block px-3 py-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/categories/finance" 
              className="block px-3 py-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Finance
            </Link>
            <Link 
              href="/categories/fitness" 
              className="block px-3 py-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Fitness
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}