'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { DollarSign, Dumbbell, Folder } from 'lucide-react'

interface CategoryFilterProps {
  categories: { name: string; count: number }[]
  currentCategory?: string
}

export default function CategoryFilter({ categories, currentCategory }: CategoryFilterProps) {
  const pathname = usePathname()

  return (
    <div className="bg-background border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Categories</h2>
      
      <div className="space-y-2">
        <Link
          href="/"
          className={cn(
            "flex items-center justify-between px-3 py-2 rounded-md transition-colors",
            !currentCategory && pathname === "/"
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground text-foreground"
          )}
        >
            <span className="flex items-center">
              <Folder className="mr-2 h-4 w-4 text-muted-foreground" />
              All Posts
            </span>
          <span className="text-sm text-muted-foreground">
            {categories.reduce((sum, cat) => sum + cat.count, 0)}
          </span>
        </Link>

        {categories.map((category) => {
          const isActive = currentCategory === category.name
          const Icon = category.name === 'finance' ? DollarSign : Dumbbell
          const label = category.name.charAt(0).toUpperCase() + category.name.slice(1)
          
          return (
            <Link
              key={category.name}
              href={`/categories/${category.name}`}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-md transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground text-foreground"
              )}
            >
              <span className="flex items-center">
                <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
                {label}
              </span>
              <span className="text-sm text-muted-foreground">
                {category.count}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}