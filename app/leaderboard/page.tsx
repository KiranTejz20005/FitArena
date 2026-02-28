'use client'

import Link from 'next/link'
import { useAllChallenges } from '@/hooks/useHealthChain'
import { formatChallengeFromChain, formatChallengeForCard } from '@/lib/challenge-utils'
import { LEADERBOARD as DUMMY_LEADERBOARD } from '@/lib/mock-data'
import { CHALLENGES as DUMMY_CHALLENGES } from '@/lib/mock-data'
import { LeaderboardSidebar } from '@/components/challenges/leaderboard-sidebar'
import { ArrowLeft, Crown, Trophy } from 'lucide-react'

export default function LeaderboardPage() {
  const { challenges, isLoading } = useAllChallenges()
  const displayChallenges =
    challenges.length > 0
      ? challenges.map((c) => formatChallengeForCard(formatChallengeFromChain(c.id, c)))
      : DUMMY_CHALLENGES

  return (
    <div className="min-h-screen pb-24 min-w-0">
      <section className="py-8 sm:py-12 px-4 sm:px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto min-w-0">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4 sm:mb-6">
            <ArrowLeft className="w-4 h-4 shrink-0" />
            Back
          </Link>
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase italic tracking-tight">Leaderboard</h1>
            <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-hc-amber shrink-0" />
          </div>
          <p className="text-white/50 text-sm sm:text-base">Top performers and per-challenge rankings.</p>
        </div>
      </section>

      <section className="py-8 sm:py-12 px-4 sm:px-6 max-w-7xl mx-auto min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-black uppercase italic tracking-tight text-white">Challenges</h2>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-20 rounded-xl bg-white/5 border border-white/10 animate-pulse" />
                ))}
              </div>
            ) : displayChallenges.length === 0 ? (
              <div className="text-center py-20 text-white/50 glass rounded-xl border border-white/5">
                <Trophy className="w-12 h-12 mx-auto mb-4 text-white/20" />
                <p className="font-bold mb-2">No challenges yet</p>
                <p className="text-sm">Create or join challenges to see leaderboards.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {displayChallenges.map((challenge) => (
                  <Link key={challenge.id} href={`/challenges/${challenge.id}`}>
                    <div className="glass p-4 sm:p-6 border-white/5 hover:border-fuchsia-500/30 rounded-xl transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 min-w-0">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg font-bold text-white truncate">{challenge.name}</h3>
                        <p className="text-xs sm:text-sm text-white/50">{challenge.participants} participants · {challenge.prizePool} pool</p>
                      </div>
                      <span className="text-fuchsia-400 font-bold text-xs sm:text-sm uppercase tracking-widest shrink-0">View leaderboard</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-black uppercase italic tracking-tight text-white mb-4 sm:mb-6">Top performers</h2>
            <LeaderboardSidebar entries={DUMMY_LEADERBOARD} />
          </div>
        </div>
      </section>
    </div>
  )
}
