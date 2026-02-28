import { formatMON } from '@/lib/utils'
import type { ChainChallenge } from '@/types'
import type { Challenge } from '@/types'

const SECONDS_PER_DAY = 24 * 60 * 60

/** 1-based current day index from challenge start, or 0 if not started, or durationDays+1 if ended */
export function getCurrentDay(startTime: bigint, durationDays: number): number {
  const start = Number(startTime) * 1000
  const now = Date.now()
  if (now < start) return 0
  const elapsedDays = Math.floor((now - start) / (SECONDS_PER_DAY * 1000))
  if (elapsedDays >= durationDays) return durationDays + 1
  return elapsedDays + 1
}

export function formatChallengeFromChain(id: number, raw: ChainChallenge): {
  id: number
  name: string
  stakeAmount: string
  durationDays: number
  startTime: Date
  totalStaked: string
  participantCount: number
  creator: string
  isActive: boolean
  prizePool: string
  daysLeft: number
} {
  const startTime = new Date(Number(raw.startTime) * 1000)
  const durationDays = Number(raw.durationDays)
  const endTime = new Date(startTime.getTime() + durationDays * SECONDS_PER_DAY * 1000)
  const now = new Date()
  const daysLeft = Math.max(0, Math.ceil((endTime.getTime() - now.getTime()) / (SECONDS_PER_DAY * 1000)))

  return {
    id,
    name: raw.name,
    stakeAmount: formatMON(raw.stakeAmount),
    durationDays,
    startTime,
    totalStaked: formatMON(raw.totalStaked),
    participantCount: Number(raw.participantCount),
    creator: raw.creator,
    isActive: raw.isActive,
    prizePool: formatMON(raw.totalStaked),
    daysLeft,
  }
}

export function formatChallengeForCard(
  formatted: {
    id: number
    name: string
    stakeAmount: string
    prizePool: string
    participantCount: number
    daysLeft: number
  },
  progress: number = 0
): Challenge {
  const participantCount = formatted.participantCount
  const rewardEstimate = participantCount > 0 ? `~${formatted.stakeAmount}` : '0 MON'
  return {
    id: String(formatted.id),
    name: formatted.name,
    prizePool: formatted.prizePool,
    entryFee: formatted.stakeAmount,
    reward: rewardEstimate,
    participants: participantCount,
    daysLeft: formatted.daysLeft,
    progress,
    iconType: 'activity',
    gradient: 'from-fuchsia-500/20 to-purple-500/20',
  }
}
