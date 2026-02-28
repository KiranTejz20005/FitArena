import { Heart } from 'lucide-react'

export function HealthChainLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 group ${className}`}>
      <div className="w-8 h-8 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-fuchsia-500/20 group-hover:scale-110 transition-transform">
        <Heart className="w-5 h-5 fill-current" />
      </div>
      <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
        HealthChain
      </span>
    </div>
  )
}
