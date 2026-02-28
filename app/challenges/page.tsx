'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ChallengeCard } from '@/components/challenges/challenge-card'
import { useAllChallenges } from '@/hooks/useHealthChain'
import { formatChallengeFromChain, formatChallengeForCard } from '@/lib/challenge-utils'
import { CHALLENGES as DUMMY_CHALLENGES } from '@/lib/mock-data'
import { Search, Filter, Zap } from 'lucide-react'

export default function ChallengesPage() {
  const [search, setSearch] = useState('')
  const { challenges, isLoading } = useAllChallenges()

  const displayChallenges = useMemo(() => {
    if (challenges.length > 0) {
      const formatted = challenges.map((c) => formatChallengeFromChain(c.id, c))
      return formatted.map((f) => formatChallengeForCard(f))
    }
    return DUMMY_CHALLENGES
  }, [challenges])

  const filtered = useMemo(() => {
    if (!search.trim()) return displayChallenges
    const q = search.trim().toLowerCase()
    return displayChallenges.filter((c) => c.name.toLowerCase().includes(q))
  }, [displayChallenges, search])

  return (
    <div className="pb-20 min-w-0">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 min-w-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="max-w-2xl min-w-0">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-hc-green/10 border border-hc-green/20 text-[9px] font-black uppercase tracking-widest text-hc-green mb-3 sm:mb-4">
              <Zap className="w-3 h-3 fill-current shrink-0" />
              {displayChallenges.length} Challenge{displayChallenges.length !== 1 ? 's' : ''} {challenges.length > 0 ? 'on chain' : 'demo'}
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tight mb-3 sm:mb-4">The Arena</h1>
            <p className="text-white/40 text-sm sm:text-base font-medium leading-relaxed">
              Choose your battle. Stake your claim. Prove your sweat.
            </p>
          </div>

          <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl w-full md:w-auto min-w-0">
            <div className="flex-grow flex items-center px-4 gap-3 border-r border-white/5">
              <Search className="w-4 h-4 text-white/20" />
              <input
                type="text"
                placeholder="Find challenges..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-none outline-none text-sm font-bold placeholder:text-white/10 w-full"
              />
            </div>
            <Button variant="ghost" className="h-10 px-4 text-white/40 hover:text-white hover:bg-white/5 rounded-xl">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 rounded-xl bg-white/5 border border-white/10 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-white/50">
            <p className="text-lg font-bold mb-2">No matches for your search</p>
            <p className="text-sm">Try a different search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} variant="grid" />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
