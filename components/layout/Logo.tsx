import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
        <div className="relative bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400 rounded-lg p-2">
          <div className="text-white font-bold text-xl tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-100">
              FF
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
          FinFit
        </span>
        <span className="text-xs text-muted-foreground font-medium tracking-wider">
          BLOG
        </span>
      </div>
    </div>
  )
}