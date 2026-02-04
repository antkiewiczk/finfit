import Link from 'next/link'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <Logo />
            </Link>
            <p className="text-muted-foreground max-w-md">
              Your trusted source for personal finance and fitness insights. 
              Helping you build wealth and health, one article at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/categories/finance" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Personal Finance
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories/fitness" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Fitness & Health
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/privacy" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} FinFit Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}