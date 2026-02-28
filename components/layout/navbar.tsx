'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { HealthChainLogo } from '@/components/healthchain-logo'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { name: 'Challenges', href: '/challenges' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Create', href: '/challenges/create' },
  ]

  return (
    <nav className="sticky top-0 z-50 px-3 sm:px-4 py-2">
      <div className="max-w-7xl mx-auto glass px-3 sm:px-4 py-2 flex items-center justify-between gap-2 border-white/5 min-w-0">
        <Link href="/" className="min-w-0 shrink-0">
          <HealthChainLogo />
        </Link>

        <div className="hidden md:flex items-center gap-6 shrink-0">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs font-medium transition-colors whitespace-nowrap ${isActive
                  ? 'text-white border-b border-fuchsia-500 pb-0.5'
                  : 'text-white/70 hover:text-white'
                  }`}
              >
                {link.name}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden h-9 w-9 text-white/80 hover:text-white hover:bg-white/10">
                <Menu className="w-5 h-5" aria-label="Open menu" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-zinc-900 border-white/10">
              <div className="flex flex-col gap-6 pt-8">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-sm font-medium transition-colors ${isActive ? 'text-fuchsia-400' : 'text-white/80 hover:text-white'}`}
                    >
                      {link.name}
                    </Link>
                  )
                })}
              </div>
            </SheetContent>
          </Sheet>
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-wider text-white/50">
            <div className="w-1.5 h-1.5 rounded-full bg-hc-green animate-pulse" />
            <span className="whitespace-nowrap">Monad Testnet</span>
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
