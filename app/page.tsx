'use client'

import { useState, useMemo } from 'react'
import { HealthChainLogo } from '@/components/healthchain-logo'
import { HeroSection } from '@/components/home/hero'
import { StatCard } from '@/components/home/stat-card'
import { ChallengeCard } from '@/components/challenges/challenge-card'
import { useAllChallenges } from '@/hooks/useHealthChain'
import { formatChallengeFromChain, formatChallengeForCard } from '@/lib/challenge-utils'
import { STATS } from '@/lib/mock-data'

export default function HomePage() {
  const { challenges, count, isLoading } = useAllChallenges()

  const displayChallenges = useMemo(() => {
    const formatted = challenges.map((c) => formatChallengeFromChain(c.id, c))
    return formatted.map((f) => formatChallengeForCard(f))
  }, [challenges])

  const stats = useMemo(
    () => [
      { ...STATS[0], value: String(count), change: 'On chain', iconType: 'zap' as const },
      STATS[1],
      STATS[2],
    ],
    [count]
  )

  return (
    <div className="pb-20">
      <HeroSection />

      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} />
          ))}
        </div>
      </section>

      <section className="px-6 pb-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-black mb-2 italic uppercase tracking-tight">Active Challenges</h2>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="h-48 rounded-xl bg-white/5 border border-white/10 animate-pulse" />
              ))}
            </div>
          ) : displayChallenges.length === 0 ? (
            <div className="text-center py-20 text-white/50">
              <p className="text-lg font-bold mb-2">No challenges yet</p>
              <p className="text-sm">Create the first one from the Create page.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} variant="list" />
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="px-6 py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
          <HealthChainLogo />
          <p className="text-white/30 text-[10px] font-medium uppercase tracking-[0.2em]">
            © 2026 HealthChain. Built on Monad Network.
          </p>
        </div>
      </footer>
    </div>
  )
}
