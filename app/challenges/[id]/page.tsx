'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import { ProgressCalendar } from '@/components/challenges/progress-calendar'
import { ChallengeProgressCalendar } from '@/components/challenges/challenge-progress-calendar'
import { ChallengeLeaderboard } from '@/components/challenges/challenge-leaderboard'
import { useChallenge, useParticipant, useHealthChain } from '@/hooks/useHealthChain'
import { formatChallengeFromChain, getCurrentDay } from '@/lib/challenge-utils'
import { CHALLENGES as DUMMY_CHALLENGES, DUMMY_QUIT_USERS } from '@/lib/mock-data'
import {
  ArrowLeft,
  Users,
  Trophy,
  Zap,
  Clock,
  Lock,
  Activity,
  Rocket,
  UserMinus,
  TrendingUp,
} from 'lucide-react'
export default function ChallengePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const challengeId = parseInt(id, 10)
  const isInvalidId = Number.isNaN(challengeId) || challengeId < 0

  const { address } = useAccount()
  const { joinChallenge, claimReward, checkIn, isPending, isConfirming, isMonadTestnet } = useHealthChain()
  const { challenge: rawChallenge, isLoading: challengeLoading } = useChallenge(challengeId)
  const { participant, refetch: refetchParticipant } = useParticipant(challengeId, address)

  const [joinError, setJoinError] = useState<string | null>(null)
  const [claimError, setClaimError] = useState<string | null>(null)

  const challenge = rawChallenge
    ? formatChallengeFromChain(challengeId, rawChallenge)
    : null
  const isParticipant = participant && participant.stakedAmount > 0n
  const hasCompleted = participant?.hasCompleted ?? false
  const rewardClaimed = participant?.rewardClaimed ?? false
  const currentDay = challenge && rawChallenge ? getCurrentDay(rawChallenge.startTime, challenge.durationDays) : 0
  const canCheckIn = isParticipant && !hasCompleted && currentDay >= 1 && challenge != null && currentDay <= challenge.durationDays

  const handleJoin = async () => {
    if (!challenge || !address) return
    setJoinError(null)
    try {
      await joinChallenge(challengeId, challenge.stakeAmount)
      refetchParticipant?.()
    } catch (e) {
      setJoinError(e instanceof Error ? e.message : 'Failed to join')
    }
  }

  const handleClaim = async () => {
    if (!address) return
    setClaimError(null)
    try {
      await claimReward(challengeId)
      refetchParticipant?.()
    } catch (e) {
      setClaimError(e instanceof Error ? e.message : 'Failed to claim')
    }
  }

  if (isInvalidId) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 text-center text-white/60">
        <p className="text-lg font-bold">Invalid challenge ID</p>
        <Link href="/challenges" className="text-fuchsia-400 hover:underline mt-4 inline-block">
          Back to challenges
        </Link>
      </div>
    )
  }

  if (challengeLoading || (challengeId >= 0 && !rawChallenge && !challenge)) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="h-96 rounded-xl bg-white/5 border border-white/10 animate-pulse" />
      </div>
    )
  }

  if (!challenge) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 text-center text-white/60">
        <p className="text-lg font-bold">Challenge not found</p>
        <Link href="/challenges" className="text-fuchsia-400 hover:underline mt-4 inline-block">
          Back to challenges
        </Link>
      </div>
    )
  }

  const rewardEstimate = challenge.participantCount > 0 ? `~${challenge.stakeAmount}` : '0 MON'
  const dummyOverlay = DUMMY_CHALLENGES.find((c) => c.id === id)
  const peopleQuit = dummyOverlay?.peopleQuit ?? 0
  const profitIfComplete = dummyOverlay?.profitIfComplete ?? rewardEstimate
  const committed = challenge.participantCount
  const quitDisplay = Math.min(peopleQuit, committed)

  return (
    <div className="pb-28 sm:pb-24 min-w-0">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 min-w-0">
        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/30 mb-6 sm:mb-8 min-w-0 overflow-hidden">
          <Link href="/challenges" className="hover:text-white flex items-center gap-2 shrink-0">
            <ArrowLeft className="w-3 h-3" /> Back
          </Link>
          <span className="w-1 h-1 bg-white/20 rounded-full shrink-0" />
          <Link href="/challenges" className="hover:text-white shrink-0">Challenges</Link>
          <span className="w-1 h-1 bg-white/20 rounded-full shrink-0" />
          <span className="text-white/60 truncate">{challenge.name}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start mb-8 sm:mb-12">
          <div className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl shrink-0">
            <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
          </div>
          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
              <div className="px-2 py-0.5 rounded-full bg-hc-green/10 border border-hc-green/20 text-[9px] font-black uppercase tracking-widest text-hc-green flex items-center gap-1.5">
                <Zap className="w-3 h-3 fill-current" /> Active
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 tracking-tight uppercase italic break-words">{challenge.name}</h1>
            <p className="text-sm sm:text-base text-white/50 max-w-2xl leading-relaxed">
              {challenge.durationDays}-day challenge. Check in every day to complete and split the prize pool.
            </p>
          </div>
          <div className="flex flex-row md:flex-col gap-4 md:text-right w-full md:w-auto shrink-0">
            <div className="border-l-2 md:border-l-0 md:border-r-2 border-fuchsia-500/30 pl-4 md:pl-0 md:pr-4 py-1.5 flex-1">
              <div className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-0.5">Entry Fee</div>
              <div className="text-xl sm:text-2xl font-black tracking-tight">
                {challenge.stakeAmount} <span className="text-xs font-bold text-white/30 uppercase ml-1">MON</span>
              </div>
            </div>
            <div className="border-l-2 md:border-l-0 md:border-r-2 border-hc-green/30 pl-4 md:pl-0 md:pr-4 py-1.5 flex-1">
              <div className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-0.5">Reward</div>
              <div className="text-xl sm:text-2xl font-black tracking-tight text-hc-green">{rewardEstimate}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
          {[
            { label: 'Prize Pool', value: challenge.prizePool, icon: <Trophy className="w-4 h-4 text-fuchsia-400" /> },
            { label: 'Committed', value: committed, suffix: '', icon: <Users className="w-4 h-4 text-rose-400" /> },
            { label: 'Quit', value: quitDisplay, suffix: '', icon: <UserMinus className="w-4 h-4 text-white/50" /> },
            { label: 'Days Left', value: challenge.daysLeft, suffix: 'Days', icon: <Clock className="w-4 h-4 text-hc-green" /> },
          ].map((stat, i) => (
            <div key={i} className="glass p-4 sm:p-6 border-white/5 relative group hover:border-white/10 transition-colors min-w-0">
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                {stat.icon}
              </div>
              <div className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-2 sm:mb-3">{stat.label}</div>
              <div className="text-lg sm:text-2xl font-black tracking-tight break-all">
                {stat.value}
                {stat.suffix && <span className="text-[10px] font-bold text-white/20 ml-1.5">{stat.suffix}</span>}
              </div>
            </div>
          ))}
        </div>

        {(peopleQuit > 0 || profitIfComplete) && (
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
            {peopleQuit > 0 && (
              <div className="flex flex-col gap-2 px-3 sm:px-4 py-3 rounded-xl bg-white/5 border border-white/10 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <UserMinus className="w-4 h-4 text-white/50 shrink-0" />
                  <span className="text-xs sm:text-sm text-white/70"><span className="font-bold text-white">{peopleQuit}</span> quit — their stake stays in the pool</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {DUMMY_QUIT_USERS.slice(0, peopleQuit).map((name, i) => (
                    <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-white/50 border border-white/10">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-hc-green/10 border border-hc-green/20 min-w-0">
              <TrendingUp className="w-4 h-4 text-hc-green shrink-0" />
              <span className="text-xs sm:text-sm text-white/80">Profit if you complete: <span className="font-bold text-hc-green">{profitIfComplete}</span></span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10 items-start">
          <div className="lg:col-span-2 min-w-0">
            {isParticipant ? (
              <ChallengeProgressCalendar
                challengeId={challengeId}
                userAddress={address ?? undefined}
                startTime={rawChallenge!.startTime}
                durationDays={challenge.durationDays}
                onCheckIn={async (day) => { await checkIn(challengeId, day); refetchParticipant?.() }}
                refetch={refetchParticipant}
              />
            ) : (
              <ProgressCalendar
                days={Array.from({ length: Math.min(challenge.durationDays, 31) }, (_, i) => ({
                  day: i + 1,
                  status: 'upcoming' as const,
                }))}
                monthName={challenge.startTime.toLocaleString('default', { month: 'long', year: 'numeric' })}
              />
            )}
          </div>
          <div className="lg:min-w-[280px] w-full">
            <ChallengeLeaderboard
              challengeId={challengeId}
              durationDays={challenge.durationDays}
              currentUserAddress={address ?? undefined}
            />
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-40 px-4 sm:px-6 pb-4 sm:pb-6 pt-8 sm:pt-10 pointer-events-none">
        <div className="max-w-7xl mx-auto glass p-3 sm:p-4 border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 overflow-hidden min-w-0">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-fuchsia-500/50 to-transparent" />

          <div className="min-w-0 w-full sm:w-auto text-center sm:text-left">
            <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mb-0.5">Ready to commit?</div>
            <div className="text-sm sm:text-lg font-black break-words">
              {!isParticipant ? (
                <>
                  Stake <span className="text-fuchsia-400">{challenge.stakeAmount}</span>{' '}
                  <span className="text-white/30 text-xs font-bold lowercase italic">to verify proof of sweat</span>
                </>
              ) : hasCompleted ? (
                rewardClaimed ? (
                  <span className="text-hc-green">Reward claimed</span>
                ) : (
                  <span className="text-hc-green">Complete! Claim your reward</span>
                )
              ) : (
                <span className="text-white/30 text-xs font-bold lowercase italic">
                  Day {participant ? Number(participant.checkInCount) : 0}/{challenge.durationDays} check-ins
                </span>
              )}
            </div>
            {address && !isMonadTestnet && (
              <p className="text-hc-amber text-xs mt-1">Wrong network. Click the button below to switch to Monad Testnet (MON).</p>
            )}
            {(joinError || claimError) && (
              <p className="text-red-400 text-xs mt-1">{joinError ?? claimError}</p>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
            {!address ? (
              <Button disabled className="btn-primary h-11 sm:h-12 px-4 sm:px-8 text-xs sm:text-sm font-black rounded-xl uppercase tracking-widest w-full sm:w-auto">
                Connect wallet to join
              </Button>
            ) : !isParticipant ? (
              <Button
                onClick={handleJoin}
                disabled={isPending || isConfirming}
                className="btn-primary h-11 sm:h-12 px-4 sm:px-8 text-xs sm:text-sm font-black rounded-xl uppercase tracking-widest group w-full sm:w-auto"
              >
                {isPending || isConfirming ? 'Confirm in wallet...' : `Join — Stake ${challenge.stakeAmount}`}
              </Button>
            ) : hasCompleted && !rewardClaimed ? (
              <Button
                onClick={handleClaim}
                disabled={isPending || isConfirming}
                className="btn-primary h-11 sm:h-12 px-4 sm:px-8 text-xs sm:text-sm font-black rounded-xl uppercase tracking-widest w-full sm:w-auto"
              >
                {isPending || isConfirming ? 'Confirming...' : 'Claim Reward'}
              </Button>
            ) : canCheckIn ? (
              <Link href={`/challenges/${id}/check-in`} className="w-full sm:w-auto">
                <Button className="btn-primary h-11 sm:h-12 px-4 sm:px-8 text-xs sm:text-sm font-black rounded-xl uppercase tracking-widest group w-full sm:w-auto">
                  Verify Daily Progress
                  <Rocket className="w-4 h-4 ml-2 sm:ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
                </Button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
