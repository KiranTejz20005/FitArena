'use client'

import Link from 'next/link'
import { useAllChallenges } from '@/hooks/useHealthChain'
import { formatChallengeFromChain, formatChallengeForCard } from '@/lib/challenge-utils'
import { ArrowLeft, Crown, Trophy } from 'lucide-react'

export default function LeaderboardPage() {
  const { challenges, isLoading } = useAllChallenges()
  const displayChallenges = challenges.map((c) => formatChallengeForCard(formatChallengeFromChain(c.id, c)))

  return (
    <div className="min-h-screen pb-24">
      <section className="py-12 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tight">Leaderboard</h1>
            <Crown className="w-8 h-8 text-hc-amber" />
          </div>
          <p className="text-white/50">View rankings per challenge. Open a challenge to see its leaderboard.</p>
        </div>
      </section>

      <section className="py-12 px-6 max-w-4xl mx-auto">
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
                <div className="glass p-6 border-white/5 hover:border-fuchsia-500/30 rounded-xl transition-colors flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">{challenge.name}</h3>
                    <p className="text-sm text-white/50">{challenge.participants} participants · {challenge.prizePool} pool</p>
                  </div>
                  <span className="text-fuchsia-400 font-bold text-sm uppercase tracking-widest">View leaderboard</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
