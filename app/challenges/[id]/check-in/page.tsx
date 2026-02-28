'use client'

import { useState, use, useEffect } from 'react'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import { VerificationOptions, SuccessState } from '@/components/challenges/check-in-components'
import { useChallenge, useParticipant, useHealthChain, useHasCheckedIn } from '@/hooks/useHealthChain'
import { formatChallengeFromChain, getCurrentDay } from '@/lib/challenge-utils'
import { ArrowLeft, CheckCircle2, Rocket } from 'lucide-react'

export default function CheckInPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const challengeId = parseInt(id, 10)
  const isInvalidId = Number.isNaN(challengeId) || challengeId < 0

  const { address } = useAccount()
  const { checkIn, isPending, isConfirming, isConfirmed } = useHealthChain()
  const { challenge: rawChallenge, isLoading: challengeLoading } = useChallenge(challengeId)
  const { participant, refetch: refetchParticipant } = useParticipant(challengeId, address)

  const challenge = rawChallenge ? formatChallengeFromChain(challengeId, rawChallenge) : null
  const currentDay = challenge && rawChallenge ? getCurrentDay(rawChallenge.startTime, challenge.durationDays) : 0
  const { hasCheckedIn: alreadyCheckedIn } = useHasCheckedIn(challengeId, address ?? undefined, currentDay >= 1 && currentDay <= (challenge?.durationDays ?? 0) ? currentDay : undefined)

  const [step, setStep] = useState<'options' | 'success'>('options')
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const isParticipant = participant && participant.stakedAmount > 0n
  const hasCompleted = participant?.hasCompleted ?? false
  const canCheckInToday = isParticipant && !hasCompleted && currentDay >= 1 && currentDay <= (challenge?.durationDays ?? 0) && !alreadyCheckedIn

  const handleSubmit = async () => {
    if (!canCheckInToday || currentDay < 1) return
    setError(null)
    try {
      await checkIn(challengeId, currentDay)
      refetchParticipant?.()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Check-in failed')
    }
  }

  useEffect(() => {
    if (isConfirmed) setStep('success')
  }, [isConfirmed])

  if (isInvalidId) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center text-white/60">
        <p className="text-lg font-bold">Invalid challenge ID</p>
        <Link href="/challenges" className="text-fuchsia-400 hover:underline mt-4 inline-block">Back to challenges</Link>
      </div>
    )
  }

  if (challengeLoading || (challengeId >= 0 && !challenge)) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="h-64 rounded-xl bg-white/5 border border-white/10 animate-pulse" />
      </div>
    )
  }

  if (!challenge) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center text-white/60">
        <p className="text-lg font-bold">Challenge not found</p>
        <Link href="/challenges" className="text-fuchsia-400 hover:underline mt-4 inline-block">Back to challenges</Link>
      </div>
    )
  }

  if (!address) {
    return (
      <div className="min-h-screen pb-24">
        <main className="max-w-4xl mx-auto px-6 pt-8">
          <Link href={`/challenges/${id}`} className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-white mb-8">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Challenge
          </Link>
          <p className="text-white/60 text-center py-20">Connect your wallet to check in.</p>
        </main>
      </div>
    )
  }

  if (!isParticipant) {
    return (
      <div className="min-h-screen pb-24">
        <main className="max-w-4xl mx-auto px-6 pt-8">
          <Link href={`/challenges/${id}`} className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-white mb-8">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Challenge
          </Link>
          <p className="text-white/60 text-center py-20">You must join this challenge before checking in.</p>
        </main>
      </div>
    )
  }

  if (hasCompleted) {
    return (
      <div className="min-h-screen pb-24">
        <main className="max-w-4xl mx-auto px-6 pt-8">
          <Link href={`/challenges/${id}`} className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-white mb-8">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Challenge
          </Link>
          <p className="text-white/60 text-center py-20">You have already completed this challenge.</p>
        </main>
      </div>
    )
  }

  if (currentDay < 1 || currentDay > challenge.durationDays) {
    return (
      <div className="min-h-screen pb-24">
        <main className="max-w-4xl mx-auto px-6 pt-8">
          <Link href={`/challenges/${id}`} className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-white mb-8">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Challenge
          </Link>
          <p className="text-white/60 text-center py-20">
            {currentDay < 1 ? 'Challenge has not started yet.' : 'This challenge has ended.'}
          </p>
        </main>
      </div>
    )
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen pb-24">
        <main className="max-w-4xl mx-auto px-6 pt-8">
          <SuccessState challengeName={challenge.name} />
        </main>
      </div>
    )
  }

  const showAlreadyCheckedIn = currentDay >= 1 && currentDay <= challenge.durationDays && alreadyCheckedIn

  return (
    <div className="min-h-screen pb-24">
      <main className="max-w-4xl mx-auto px-6 pt-8">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="mb-12">
            <Link href={`/challenges/${id}`} className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors mb-8">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Challenge
            </Link>
            <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tight mb-4 tracking-tighter">Proof of Sweat</h1>
            <p className="text-white/40 text-base font-medium leading-relaxed">
              Confirm check-in for <span className="text-white font-bold">{challenge.name}</span> — Day {currentDay} of {challenge.durationDays}.
            </p>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-7 h-7 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-fuchsia-400" />
              </div>
              <h2 className="text-lg font-bold uppercase italic tracking-tight">Choose Verification Method</h2>
            </div>
            <VerificationOptions onSelect={setSelectedOption} selectedOption={selectedOption} />
          </div>

          {selectedOption && (
            <div className="glass p-8 border-white/10 border-dashed border-2 text-center mb-12 animate-in fade-in zoom-in-95 duration-500">
              <div className="mb-4 inline-flex p-3 rounded-full bg-white/5 border border-white/10">
                <Rocket className="w-6 h-6 text-white/20" />
              </div>
              <h3 className="text-lg font-bold mb-2">Confirm daily check-in</h3>
              <p className="text-xs text-white/30 mb-6">Recording Day {currentDay} on chain. This will update your progress.</p>
            </div>
          )}
        </div>
      </main>

      {!showAlreadyCheckedIn && (
        <div className="fixed bottom-0 left-0 right-0 z-40 px-6 pb-6 pt-10 pointer-events-none">
          <div className="max-w-4xl mx-auto glass p-4 border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-fuchsia-500/50 to-transparent" />
            <div className="flex items-center gap-5">
              <div className="hidden sm:flex flex-col">
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mb-0.5">Check-ins</div>
                <div className="text-lg font-black">{Number(participant?.checkInCount ?? 0)}/{challenge.durationDays}</div>
              </div>
              <div className="w-[1px] h-8 bg-white/10 hidden sm:block" />
              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mb-0.5">Today</div>
                <div className="text-lg font-black text-hc-green">Day {currentDay}</div>
              </div>
            </div>
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <Button
              onClick={handleSubmit}
              disabled={!selectedOption || isPending || isConfirming || !canCheckInToday}
              className="btn-primary h-12 w-full sm:w-auto px-10 text-sm font-black rounded-xl uppercase tracking-widest disabled:opacity-50 disabled:grayscale transition-all"
            >
              {isPending || isConfirming ? 'Confirm in wallet...' : 'Verify Progress'}
            </Button>
          </div>
        </div>
      )}

      {showAlreadyCheckedIn && (
        <div className="fixed bottom-0 left-0 right-0 z-40 px-6 pb-6 pt-10 pointer-events-none">
          <div className="max-w-4xl mx-auto glass p-4 border-white/10 pointer-events-auto">
            <p className="text-hc-green font-bold text-center">Already checked in for Day {currentDay}. Come back tomorrow!</p>
            <Link href={`/challenges/${id}`} className="block text-center text-fuchsia-400 hover:underline mt-2 text-sm">Back to challenge</Link>
          </div>
        </div>
      )}
    </div>
  )
}
