'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { HealthChainLogo } from '@/components/healthchain-logo'

export function Navbar() {
  const pathname = usePathname()

  const navLinks = [
    { name: 'Challenges', href: '/challenges' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Create', href: '/challenges/create' },
  ]

  return (
    <nav className="sticky top-0 z-50 px-4 py-2">
      <div className="max-w-7xl mx-auto glass px-4 py-2 flex items-center justify-between border-white/5">
        <Link href="/">
          <HealthChainLogo />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs font-medium transition-colors ${isActive
                  ? 'text-white border-b border-fuchsia-500 pb-0.5'
                  : 'text-white/70 hover:text-white'
                  }`}
              >
                {link.name}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-wider text-white/50">
            <div className="w-1.5 h-1.5 rounded-full bg-hc-green animate-pulse" />
            Monad Testnet
          </div>
          <ConnectButton
            chainStatus="icon"
            accountStatus="avatar"
            showBalance={false}
          />
        </div>
      </div>
    </nav>
  )
}
