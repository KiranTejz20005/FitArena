// ============================================
// Contract-aligned types (match Solidity structs)
// ============================================

export interface ChainChallenge {
  name: string
  stakeAmount: bigint
  durationDays: bigint
  startTime: bigint
  totalStaked: bigint
  participantCount: bigint
  creator: `0x${string}`
  isActive: boolean
}

export interface ChainParticipant {
  stakedAmount: bigint
  checkInCount: bigint
  hasCompleted: boolean
  rewardClaimed: boolean
}

export interface FormattedChallenge {
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
}

export interface CreateChallengeForm {
  name: string
  stakeAmount: string
  durationDays: string
}

// ============================================
// UI / display types
// ============================================

export type Category = 'Yoga' | 'Cardio' | 'Strength' | 'HIIT' | 'Nutrition' | 'Lifestyle' | 'Mindfulness' | 'All'

/** Display shape for ChallengeCard and list/detail pages */
export interface Challenge {
  id: string
  name: string
  description?: string
  category?: Category
  prizePool: string
  entryFee: string
  reward: string
  participants: number
  daysLeft: number
  progress: number
  iconType?: 'activity' | 'zap' | 'trophy' | 'flame' | 'plus' | 'target'
  gradient?: string
}

export interface Stat {
  label: string
  value: string
  change: string
  iconType: 'zap' | 'wallet' | 'users'
}

export interface LeaderboardEntry {
  name: string
  progress: number
  days: string
  isUser?: boolean
}
