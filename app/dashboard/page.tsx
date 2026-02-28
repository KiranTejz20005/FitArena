'use client'

import Link from 'next/link'
import { useAccount } from 'wagmi'
import { useAllChallenges } from '@/hooks/useHealthChain'
import { useParticipant } from '@/hooks/useHealthChain'
import { formatChallengeFromChain } from '@/lib/challenge-utils'
import { ArrowLeft, Zap, Target, TrendingUp } from 'lucide-react'

const MAX = 30

export default function DashboardPage() {
  const { address } = useAccount()
  const { challenges, count, isLoading } = useAllChallenges()

  const p0 = useParticipant(0, address ?? undefined)
  const p1 = useParticipant(1, address ?? undefined)
  const p2 = useParticipant(2, address ?? undefined)
  const p3 = useParticipant(3, address ?? undefined)
  const p4 = useParticipant(4, address ?? undefined)
  const p5 = useParticipant(5, address ?? undefined)
  const p6 = useParticipant(6, address ?? undefined)
  const p7 = useParticipant(7, address ?? undefined)
  const p8 = useParticipant(8, address ?? undefined)
  const p9 = useParticipant(9, address ?? undefined)
  const p10 = useParticipant(10, address ?? undefined)
  const p11 = useParticipant(11, address ?? undefined)
  const p12 = useParticipant(12, address ?? undefined)
  const p13 = useParticipant(13, address ?? undefined)
  const p14 = useParticipant(14, address ?? undefined)
  const p15 = useParticipant(15, address ?? undefined)
  const p16 = useParticipant(16, address ?? undefined)
  const p17 = useParticipant(17, address ?? undefined)
  const p18 = useParticipant(18, address ?? undefined)
  const p19 = useParticipant(19, address ?? undefined)
  const p20 = useParticipant(20, address ?? undefined)
  const p21 = useParticipant(21, address ?? undefined)
  const p22 = useParticipant(22, address ?? undefined)
  const p23 = useParticipant(23, address ?? undefined)
  const p24 = useParticipant(24, address ?? undefined)
  const p25 = useParticipant(25, address ?? undefined)
  const p26 = useParticipant(26, address ?? undefined)
  const p27 = useParticipant(27, address ?? undefined)
  const p28 = useParticipant(28, address ?? undefined)
  const p29 = useParticipant(29, address ?? undefined)
  const participants = [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23, p24, p25, p26, p27, p28, p29]

  const myChallenges = challenges
    .map((c, i) => {
      const formatted = formatChallengeFromChain(c.id, c)
      const participant = participants[i]?.participant
      if (!participant || participant.stakedAmount <= 0n) return null
      const progress = formatted.durationDays > 0 ? Math.round((Number(participant.checkInCount) / formatted.durationDays) * 100) : 0
      return {
        id: c.id,
        name: formatted.name,
        progress,
        daysLeft: formatted.daysLeft,
        checkInCount: Number(participant.checkInCount),
        durationDays: formatted.durationDays,
        hasCompleted: participant.hasCompleted,
      }
    })
    .filter(Boolean) as { id: number; name: string; progress: number; daysLeft: number; checkInCount: number; durationDays: number; hasCompleted: boolean }[]

  const stats = [
    { label: 'Active Challenges', value: String(myChallenges.length), icon: Target, color: 'text-fuchsia-400' },
    { label: 'Total Check-ins', value: String(myChallenges.reduce((s, c) => s + c.checkInCount, 0)), icon: Zap, color: 'text-hc-green' },
    { label: 'Challenges Completed', value: String(myChallenges.filter((c) => c.hasCompleted).length), icon: TrendingUp, color: 'text-hc-amber' },
  ]

  return (
    <div className="min-h-screen pb-24">
      <section className="py-12 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2 uppercase italic tracking-tight">Your Dashboard</h1>
          <p className="text-white/50">Track your progress and achievements</p>
        </div>
      </section>

      <section className="py-12 px-6 max-w-7xl mx-auto">
        {!address ? (
          <div className="text-center py-20 text-white/50">
            <p className="text-lg font-bold mb-2">Connect your wallet</p>
            <p className="text-sm">Connect to see your challenges and progress.</p>
          </div>
        ) : isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 rounded-xl bg-white/5 border border-white/10 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {stats.map((stat, idx) => {
                const Icon = stat.icon
                return (
                  <div key={idx} className="glass p-6 border-white/5 hover:border-white/10 transition-colors duration-300 rounded-xl">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-white/50 text-sm font-medium mb-2">{stat.label}</div>
                        <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
                      </div>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                )
              })}
            </div>

            <div>
              <h2 className="text-2xl font-black text-white mb-6 uppercase italic tracking-tight">Active Challenges</h2>
              {myChallenges.length === 0 ? (
                <div className="text-center py-16 text-white/50 glass rounded-xl border border-white/5">
                  <p className="font-bold mb-2">No challenges joined yet</p>
                  <p className="text-sm mb-4">Join a challenge from the Arena to see it here.</p>
                  <Link href="/challenges" className="text-fuchsia-400 hover:underline font-bold">
                    Browse challenges
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {myChallenges.map((challenge) => (
                    <Link key={challenge.id} href={`/challenges/${challenge.id}`}>
                      <div className="glass p-6 border-white/5 hover:border-fuchsia-500/30 rounded-xl transition-colors duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-white">{challenge.name}</h3>
                          <div className="text-right">
                            <div className="text-sm text-white/50">{challenge.daysLeft} days left</div>
                            <div className="text-lg font-bold text-hc-green">{challenge.checkInCount}/{challenge.durationDays} check-ins</div>
                          </div>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-fuchsia-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(100, challenge.progress)}%` }}
                          />
                        </div>
                        <div className="text-sm text-white/50 mt-2">{challenge.progress}% Complete</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  )
}
