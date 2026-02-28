'use client'

import { useMemo } from 'react'
import { useParticipantCount, useParticipantAt, useParticipant } from '@/hooks/useHealthChain'
import { LeaderboardSidebar } from '@/components/challenges/leaderboard-sidebar'
import { shortenAddress } from '@/lib/utils'
import { DUMMY_CHALLENGE_LEADERBOARD } from '@/lib/mock-data'
import type { LeaderboardEntry } from '@/types'

const MAX_LEADERBOARD = 10

interface ChallengeLeaderboardProps {
  challengeId: number
  durationDays: number
  currentUserAddress: string | undefined
}

export function ChallengeLeaderboard({ challengeId, durationDays, currentUserAddress }: ChallengeLeaderboardProps) {
  const { count } = useParticipantCount(challengeId)
  const a0 = useParticipantAt(challengeId, 0)
  const a1 = useParticipantAt(challengeId, 1)
  const a2 = useParticipantAt(challengeId, 2)
  const a3 = useParticipantAt(challengeId, 3)
  const a4 = useParticipantAt(challengeId, 4)
  const a5 = useParticipantAt(challengeId, 5)
  const a6 = useParticipantAt(challengeId, 6)
  const a7 = useParticipantAt(challengeId, 7)
  const a8 = useParticipantAt(challengeId, 8)
  const a9 = useParticipantAt(challengeId, 9)
  const addrs = [a0.address, a1.address, a2.address, a3.address, a4.address, a5.address, a6.address, a7.address, a8.address, a9.address]
  const p0 = useParticipant(challengeId, addrs[0] ?? undefined)
  const p1 = useParticipant(challengeId, addrs[1] ?? undefined)
  const p2 = useParticipant(challengeId, addrs[2] ?? undefined)
  const p3 = useParticipant(challengeId, addrs[3] ?? undefined)
  const p4 = useParticipant(challengeId, addrs[4] ?? undefined)
  const p5 = useParticipant(challengeId, addrs[5] ?? undefined)
  const p6 = useParticipant(challengeId, addrs[6] ?? undefined)
  const p7 = useParticipant(challengeId, addrs[7] ?? undefined)
  const p8 = useParticipant(challengeId, addrs[8] ?? undefined)
  const p9 = useParticipant(challengeId, addrs[9] ?? undefined)
  const participants = [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9]

  const entries = useMemo((): LeaderboardEntry[] => {
    const list: { address: string; checkInCount: number }[] = []
    const limit = Math.min(count, MAX_LEADERBOARD)
    for (let i = 0; i < limit; i++) {
      const addr = addrs[i]
      const p = participants[i]?.participant
      if (addr && p) {
        list.push({ address: addr, checkInCount: Number(p.checkInCount) })
      }
    }
    list.sort((a, b) => b.checkInCount - a.checkInCount)
    return list.map(({ address, checkInCount }) => ({
      name: shortenAddress(address),
      progress: durationDays > 0 ? Math.round((checkInCount / durationDays) * 100) : 0,
      days: `${checkInCount}/${durationDays}`,
      isUser: currentUserAddress?.toLowerCase() === address.toLowerCase(),
    }))
  }, [count, addrs, participants, durationDays, currentUserAddress])

  const dummyEntries = useMemo((): LeaderboardEntry[] => {
    return DUMMY_CHALLENGE_LEADERBOARD.map((e) => ({
      ...e,
      isUser: e.name === 'You' && !!currentUserAddress,
    }))
  }, [currentUserAddress])

  if (count === 0) {
    return <LeaderboardSidebar entries={dummyEntries} />
  }

  return <LeaderboardSidebar entries={entries} />
}
